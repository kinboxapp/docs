/**
 * Tira os prints da central de ajuda no staging, a partir do `manifesto.yml`.
 *
 * Uso:
 *   bun scripts/screenshots/capturar.ts              # todos os itens
 *   bun scripts/screenshots/capturar.ts --ids a,b    # só os ids listados
 *   bun scripts/screenshots/capturar.ts --headed     # mostra o navegador
 *   bun scripts/screenshots/capturar.ts --explorar /settings/channels [--workspace Kinbox] [--clicar <seletor>]
 *     abre a tela, executa o clique (opcional) e salva print e HTML em ~/.cache/kinbox-docs-screenshots/explorar.*,
 *     para achar seletores antes de escrever o item do manifesto
 *
 * Faz login no staging web, entra no workspace de documentação, abre a `url` de cada item, executa os
 * `passos`, cobre com tarja os seletores de `mascarar`, recorta o seletor `alvo` e salva o WebP em `arquivo`.
 */
import { mkdir } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { chromium, type BrowserContext, type Page } from 'playwright'
import { API_V3, DOCS_WORKSPACE_NAME, WEB_URL, WIDGET_URL, client, credentials, findDocsWorkspace, login } from './staging'

type Passo =
  | { esperar: string }
  | { clicar: string }
  | { digitar: { seletor: string; texto: string } }
  | { tecla: string }
  | { pausa: number }
  /** Passa o mouse sobre o elemento (mostra o que só aparece no hover) */
  | { passar: string }
  /** Arrasta `de` até `para`; `x`/`y` (px) soltam num ponto dentro de `para` (ex.: área vazia do fluxograma) */
  | { arrastar: { de: string; para: string; x?: number; y?: number } }
  /** Troca o texto do elemento antes do print (ex.: código de instalação do staging pelo formato de produção, com dados fictícios) */
  | { trocarTexto: { seletor: string; texto: string } }
  /** Envia um arquivo fictício (caminho relativo a `scripts/screenshots/`) num `input[type=file]` */
  | { enviar: { seletor: string; arquivo: string } }

type Item = {
  id: string
  url: string
  passos?: Passo[]
  /** Seletor do recorte. Uma lista recorta o retângulo que cobre todos eles. */
  alvo: string | string[]
  mascarar?: string[]
  /** Seletores escondidos (display: none) antes do print: elementos que o cliente não vê (ex.: menu Admin da conta de teste, selo de staging). */
  esconder?: string[]
  arquivo: string
  paginas?: string[]
  /** Largura da janela (px) só para este item, para telas largas demais. Padrão: 1440. Abaixo de 768 o app usa o layout antigo. */
  largura?: number
  /** Altura da janela (px) só para este item, para modais altos que passam da tela. Padrão: 900. */
  altura?: number
  /** Workspace onde o print é tirado. Padrão: o workspace de documentação. Outro workspace só para telas que ele não tem (ex.: WhatsApp), sempre com `mascarar`. */
  workspace?: string
  /**
   * Abre o site de teste (página fictícia que a própria captura serve em SITE_TESTE: o HTML não sai da máquina, mas o
   * script e as configurações do chat vêm do staging) com o código
   * de instalação do widget de nome `widget` do workspace de documentação, em vez de uma tela do app.
   * Seletores que começam com `widget>> ` procuram dentro do chat (iframe do widget).
   */
  site?: { widget: string }
}

/**
 * Domínio reservado para exemplos. O HTML do site de teste é servido localmente pela captura nesse endereço (nenhum
 * site real é aberto); o script e as configurações do chat vêm do staging.
 */
const SITE_TESTE = 'https://www.example.com'
const PREFIXO_WIDGET = 'widget>> '

/** Página fictícia da loja de exemplo, com o código de instalação do widget antes de </body>. */
const paginaDeTeste = (codigo: string) => `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>Loja Exemplo</title>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; color: #1f2937; background: #f8fafc; }
  header { background: #fff; border-bottom: 1px solid #e5e7eb; padding: 20px 48px; font-weight: 700; font-size: 22px; }
  main { padding: 40px 48px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1100px; }
  .produto { background: #fff; border-radius: 12px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
  .foto { height: 160px; border-radius: 8px; background: #e2e8f0; margin-bottom: 12px; }
  .linha { height: 12px; border-radius: 6px; background: #e5e7eb; margin: 8px 0; }
</style></head>
<body>
<header>Loja Exemplo</header>
<main>${'<div class="produto"><div class="foto"></div><div class="linha" style="width:80%"></div><div class="linha" style="width:50%"></div></div>'.repeat(6)}</main>
${codigo}
</body></html>`

/** Código de instalação do widget, igual ao que a tela do widget mostra no staging. */
async function codigoDoWidget(nome: string) {
  const ws = findDocsWorkspace(await login())
  if (!ws) throw new Error(`Workspace "${DOCS_WORKSPACE_NAME}" não encontrado. Rode o seed antes.`)
  const api = client(ws.token)
  const canais = await api.v0('GET', '/integrations/channel')
  const canal = (Array.isArray(canais) ? canais : canais?.data || []).find((c: any) => String(c.channelId) === '10' && c.description === nome)
  const widgets = await api.v3('GET', '/widget')
  const widget = canal && (widgets?.data || []).find((w: any) => String(w.channelId) === String(canal.id))
  if (!widget) throw new Error(`Widget "${nome}" não encontrado no workspace de documentação. Rode o seed antes.`)
  const licenca = `${widget.id}:${ws.workspaceId}`
  return `<script type="text/javascript">;(function(){window.__kb=window.__kb||{},window.__kb.license="${licenca}",window.__kb.apiUrl="${API_V3}",window.__kb.widgetUrl="${WIDGET_URL}";var e=document.createElement("script");e.type="module",e.async=!0,e.src="${WIDGET_URL}/widget.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();</script>`
}

/** Localiza o seletor na página ou, com o prefixo `widget>> `, dentro do chat do site de teste. */
function localizar(page: Page, seletor: string) {
  if (seletor.startsWith(PREFIXO_WIDGET)) {
    return page.frameLocator('.kinbox-widget-container iframe').locator(seletor.slice(PREFIXO_WIDGET.length))
  }
  return page.locator(seletor)
}

const RAIZ = resolve(import.meta.dir, '../..')
const SESSAO = join(homedir(), '.cache/kinbox-docs-screenshots/sessao.json')
const VIEWPORT = { width: 1440, height: 900 }
const QUALIDADE_WEBP = 0.9

/** CSS que estabiliza o print: sem animação, sem cursor piscando, sem widgets flutuantes. */
const CSS_ESTAVEL = `
  *, *::before, *::after { transition: none !important; animation: none !important; caret-color: transparent !important; }
  #kinbox-widget, .Toastify, .ant-message, .ant-notification { display: none !important; }
  /* Selo "Staging" arrastável do canto inferior esquerdo: só existe no staging */
  .react-draggable:has(.fa-vial) { display: none !important; }
  /* Sem animação, os modais do antd ficariam presos no estado inicial da entrada (invisíveis) */
  .ant-zoom-appear, .ant-zoom-appear-prepare, .ant-zoom-enter, .ant-zoom-enter-prepare,
  .ant-fade-appear, .ant-fade-appear-prepare, .ant-fade-enter, .ant-fade-enter-prepare,
  /* Menus (dropdown) e listas de seleção entram com slide */
  .ant-slide-up-appear, .ant-slide-up-appear-prepare, .ant-slide-up-enter, .ant-slide-up-enter-prepare,
  .ant-slide-down-appear, .ant-slide-down-appear-prepare, .ant-slide-down-enter, .ant-slide-down-enter-prepare { opacity: 1 !important; transform: none !important; }
  /* ...e, sem animação, também não terminam de sair: some com eles na saída */
  .ant-slide-up-leave, .ant-slide-down-leave, .ant-zoom-leave, .ant-fade-leave, .ant-select-dropdown-hidden { display: none !important; }
  .ant-modal-wrap:has(.ant-zoom-leave) { display: none !important; }
  /* Fundo branco atrás de modais: os cantos arredondados do recorte não mostram a tela de trás */
  .ant-modal-mask { background: #fff !important; }
`

function argumentos() {
  const args = process.argv.slice(2)
  const i = args.indexOf('--ids')
  const ids = i >= 0 ? (args[i + 1] || '').split(',').map((s) => s.trim()).filter(Boolean) : []
  const valor = (flag: string) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined)
  return { ids, headed: args.includes('--headed'), explorar: valor('--explorar'), workspace: valor('--workspace'), clicar: valor('--clicar') }
}

async function lerManifesto(): Promise<Item[]> {
  const texto = await Bun.file(join(import.meta.dir, 'manifesto.yml')).text()
  const itens = Bun.YAML.parse(texto) as Item[]
  if (!Array.isArray(itens)) throw new Error('manifesto.yml deve ser uma lista de itens')
  for (const item of itens) {
    for (const campo of ['id', 'url', 'alvo', 'arquivo'] as const) {
      if (!item[campo]) throw new Error(`Item ${item.id || '?'} sem o campo "${campo}"`)
    }
    if (!/^images\/ajuda\/[^/]+\/[^/]+\.webp$/.test(item.arquivo)) {
      throw new Error(`Item ${item.id}: "arquivo" deve seguir images/ajuda/<secao>/<nome>.webp`)
    }
    if (item.workspace && item.workspace !== DOCS_WORKSPACE_NAME && !item.mascarar?.length) {
      throw new Error(`Item ${item.id}: print fora do workspace de documentação precisa de "mascarar"`)
    }
  }
  return itens
}

/** Nome do workspace ativo no front (o que ele guarda no localStorage). */
async function workspaceAtivo(page: Page) {
  return page.evaluate(() => {
    try {
      return JSON.parse(localStorage.getItem('workspace') || 'null')?.workspace as string | undefined
    } catch {
      return undefined
    }
  })
}

const escaparRegex = (texto: string) => texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Entra num workspace (por padrão, o de documentação) pela tela de escolha de ambiente. */
async function escolherWorkspace(page: Page, nome = DOCS_WORKSPACE_NAME) {
  if (!page.url().includes('/select-workspace')) await page.goto(`${WEB_URL}/select-workspace`)
  const card = page.locator('.wsp-card', { has: page.locator('.wsp-name', { hasText: new RegExp(`^${escaparRegex(nome)}$`) }) })
  await card.first().click({ timeout: 30_000 })
  await page.waitForURL((u) => !u.pathname.startsWith('/select-workspace'), { timeout: 30_000 })
}

/** Login pelo formulário do staging web. A sessão fica em cache fora do repositório. */
async function garantirSessao(context: BrowserContext) {
  const page = await context.newPage()
  await page.goto(`${WEB_URL}/`, { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle').catch(() => {})

  if (page.url().includes('/auth')) {
    const { email, password } = await credentials()
    await page.goto(`${WEB_URL}/auth/login`)
    await page.locator('input[name="email"]').fill(email)
    await page.locator('input[name="password"]').fill(password)
    await page.locator('button[type="submit"]').click()
    await page.waitForURL((u) => !u.pathname.startsWith('/auth'), { timeout: 30_000 })
  }

  if ((await workspaceAtivo(page)) !== DOCS_WORKSPACE_NAME) await escolherWorkspace(page)
  if ((await workspaceAtivo(page)) !== DOCS_WORKSPACE_NAME) {
    throw new Error(`Não consegui entrar no workspace "${DOCS_WORKSPACE_NAME}". Rode o seed antes.`)
  }

  await mkdir(dirname(SESSAO), { recursive: true })
  await context.storageState({ path: SESSAO })
  await page.close()
}

async function executarPasso(page: Page, passo: Passo) {
  if ('esperar' in passo) await localizar(page, passo.esperar).first().waitFor({ state: 'visible', timeout: 30_000 })
  else if ('clicar' in passo) await localizar(page, passo.clicar).first().click({ timeout: 30_000 })
  else if ('digitar' in passo) await localizar(page, passo.digitar.seletor).first().fill(passo.digitar.texto)
  else if ('tecla' in passo) await page.keyboard.press(passo.tecla)
  else if ('pausa' in passo) await page.waitForTimeout(passo.pausa)
  else if ('passar' in passo) await localizar(page, passo.passar).first().hover({ timeout: 30_000, force: true })
  else if ('arrastar' in passo) {
    const { de, para, x, y } = passo.arrastar
    const posicao = x !== undefined && y !== undefined ? { targetPosition: { x, y } } : {}
    await page.locator(de).first().dragTo(page.locator(para).first(), { timeout: 30_000, ...posicao })
  }
  else if ('trocarTexto' in passo) {
    const total = await localizar(page, passo.trocarTexto.seletor).evaluateAll((els, texto) => {
      // Em campo de formulário, troca o texto de exemplo (placeholder); nos outros elementos, o texto.
      for (const el of els) {
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) el.placeholder = texto
        else el.textContent = texto
      }
      return els.length
    }, passo.trocarTexto.texto)
    if (!total) throw new Error(`trocarTexto: o seletor não achou nenhum elemento: ${passo.trocarTexto.seletor}`)
  }
  else if ('enviar' in passo) {
    await page.locator(passo.enviar.seletor).first().setInputFiles(resolve(import.meta.dir, passo.enviar.arquivo), { timeout: 30_000 })
  }
  else throw new Error(`Passo desconhecido: ${JSON.stringify(passo)}`)
}

/** Converte PNG em WebP com o próprio Chromium, sem dependência nativa. */
async function pngParaWebp(conversor: Page, png: Buffer) {
  const base64 = await conversor.evaluate(
    async ({ dados, qualidade }) => {
      const bytes = Uint8Array.from(atob(dados), (c) => c.charCodeAt(0))
      const bitmap = await createImageBitmap(new Blob([bytes], { type: 'image/png' }))
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
      canvas.getContext('2d')!.drawImage(bitmap, 0, 0)
      const blob = await canvas.convertToBlob({ type: 'image/webp', quality: qualidade })
      if (blob.type !== 'image/webp') throw new Error('O navegador não gerou WebP')
      const saida = new Uint8Array(await blob.arrayBuffer())
      let binario = ''
      for (let i = 0; i < saida.length; i += 0x8000) binario += String.fromCharCode(...saida.subarray(i, i + 0x8000))
      return btoa(binario)
    },
    { dados: png.toString('base64'), qualidade: QUALIDADE_WEBP },
  )
  return Buffer.from(base64, 'base64')
}

/** Retângulo que cobre todos os seletores do alvo, limitado à viewport. */
async function recorte(page: Page, alvo: string | string[]) {
  const caixas = []
  for (const seletor of Array.isArray(alvo) ? alvo : [alvo]) {
    const el = localizar(page, seletor).first()
    await el.waitFor({ state: 'visible', timeout: 30_000 })
    const caixa = await el.boundingBox()
    if (!caixa) throw new Error(`Alvo sem área visível: ${seletor}`)
    caixas.push(caixa)
  }
  const x = Math.max(0, Math.min(...caixas.map((c) => c.x)))
  const y = Math.max(0, Math.min(...caixas.map((c) => c.y)))
  const direita = Math.min(page.viewportSize()?.width || VIEWPORT.width, Math.max(...caixas.map((c) => c.x + c.width)))
  const baixo = Math.min(page.viewportSize()?.height || VIEWPORT.height, Math.max(...caixas.map((c) => c.y + c.height)))
  return { x, y, width: direita - x, height: baixo - y }
}

/** Garante que a aba está no workspace do item antes de abrir a `url`. */
async function garantirWorkspace(page: Page, nome: string) {
  if (!page.url().startsWith(WEB_URL)) await page.goto(`${WEB_URL}/`, { waitUntil: 'domcontentloaded' })
  if ((await workspaceAtivo(page)) === nome) return
  await escolherWorkspace(page, nome)
  if ((await workspaceAtivo(page)) !== nome) throw new Error(`Não consegui entrar no workspace "${nome}"`)
}

async function capturar(page: Page, conversor: Page, item: Item) {
  await page.setViewportSize({ width: item.largura || VIEWPORT.width, height: item.altura || VIEWPORT.height })
  if (item.site) {
    const html = paginaDeTeste(await codigoDoWidget(item.site.widget))
    await page.route(`${SITE_TESTE}/**`, (rota) => rota.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: html }))
    await page.goto(SITE_TESTE + item.url, { waitUntil: 'domcontentloaded' })
  } else {
    await garantirWorkspace(page, item.workspace || DOCS_WORKSPACE_NAME)
    await page.goto(WEB_URL + item.url, { waitUntil: 'domcontentloaded' })
  }
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.addStyleTag({ content: CSS_ESTAVEL })
  for (const passo of item.passos || []) await executarPasso(page, passo)

  // Elementos que o cliente nunca vê (só da conta de teste ou do staging) somem do print em vez de levar tarja
  for (const seletor of item.esconder || []) {
    await page.locator(seletor).evaluateAll((els) => {
      for (const el of els) (el as HTMLElement).style.setProperty('display', 'none', 'important')
    })
  }

  // Tarja sólida (opaca) por cima de cada elemento: borrão pode ser revertido ou deixar o texto legível.
  // Seletor que não acha nada faz o item falhar, para um dado real não sair no print por engano.
  for (const seletor of item.mascarar || []) {
    const total = await page.locator(seletor).evaluateAll((els) => {
      for (const el of els) {
        const r = (el as HTMLElement).getBoundingClientRect()
        const tarja = document.createElement('div')
        tarja.setAttribute('data-tarja', '')
        Object.assign(tarja.style, {
          position: 'fixed', left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`,
          background: '#a1a1aa', borderRadius: '6px', zIndex: '2147483647', pointerEvents: 'none',
        })
        document.body.appendChild(tarja)
      }
      return els.length
    })
    if (!total) throw new Error(`mascarar: o seletor não achou nenhum elemento: ${seletor}`)
  }

  // Tira o foco de campos com autofocus, que sairiam com a borda de foco no print
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur?.())

  const png = await page.screenshot({ clip: await recorte(page, item.alvo), animations: 'disabled', caret: 'hide' })
  const webp = await pngParaWebp(conversor, png)
  const destino = join(RAIZ, item.arquivo)
  await mkdir(dirname(destino), { recursive: true })
  await Bun.write(destino, webp)
  return { destino, bytes: webp.length }
}

const { ids, headed, explorar, workspace, clicar } = argumentos()
const manifesto = explorar ? [] : await lerManifesto()
const itens = ids.length ? manifesto.filter((i) => ids.includes(i.id)) : manifesto
const faltando = ids.filter((id) => !manifesto.some((i) => i.id === id))
if (faltando.length) throw new Error(`Ids fora do manifesto: ${faltando.join(', ')}`)

const browser = await chromium.launch({ headless: !headed })
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 2,
  locale: 'pt-BR',
  timezoneId: 'America/Sao_Paulo',
  colorScheme: 'light',
  storageState: (await Bun.file(SESSAO).exists()) ? SESSAO : undefined,
})

let falhas = 0
try {
  await garantirSessao(context)
  const page = await context.newPage()
  const conversor = await context.newPage()
  if (explorar) {
    await garantirWorkspace(page, workspace || DOCS_WORKSPACE_NAME)
    await page.goto(WEB_URL + explorar, { waitUntil: 'domcontentloaded' })
    await page.waitForLoadState('networkidle').catch(() => {})
    await page.addStyleTag({ content: CSS_ESTAVEL })
    if (clicar) await executarPasso(page, { clicar })
    await page.waitForTimeout(1500)
    const base = join(homedir(), '.cache/kinbox-docs-screenshots/explorar')
    await page.screenshot({ path: `${base}.png` })
    await Bun.write(`${base}.html`, await page.content())
    console.log(`Tela salva em ${base}.png e ${base}.html (fora do repositório: pode ter dado real)`)
  }
  for (const item of itens) {
    try {
      const { destino, bytes } = await capturar(page, conversor, item).finally(() =>
        item.site ? page.unroute(`${SITE_TESTE}/**`).catch(() => {}) : undefined,
      )
      console.log(`✓ ${item.id} → ${destino.replace(RAIZ + '/', '')} (${Math.round(bytes / 1024)} KB)`)
    } catch (e) {
      falhas++
      console.error(`✗ ${item.id}: ${(e as Error).message}`)
      await page.screenshot({ path: join(homedir(), `.cache/kinbox-docs-screenshots/erro-${item.id}.png`) }).catch(() => {})
    }
  }
} finally {
  await browser.close()
}
if (falhas) process.exitCode = 1
