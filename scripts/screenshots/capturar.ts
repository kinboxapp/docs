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
 * `passos`, borra os seletores de `mascarar`, recorta o seletor `alvo` e salva o WebP em `arquivo`.
 */
import { mkdir } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { chromium, type BrowserContext, type Page } from 'playwright'
import { DOCS_WORKSPACE_NAME, WEB_URL, credentials } from './staging'

type Passo =
  | { esperar: string }
  | { clicar: string }
  | { digitar: { seletor: string; texto: string } }
  | { tecla: string }
  | { pausa: number }

type Item = {
  id: string
  url: string
  passos?: Passo[]
  /** Seletor do recorte. Uma lista recorta o retângulo que cobre todos eles. */
  alvo: string | string[]
  mascarar?: string[]
  arquivo: string
  paginas?: string[]
  /** Workspace onde o print é tirado. Padrão: o workspace de documentação. Outro workspace só para telas que ele não tem (ex.: WhatsApp), sempre com `mascarar`. */
  workspace?: string
}

const RAIZ = resolve(import.meta.dir, '../..')
const SESSAO = join(homedir(), '.cache/kinbox-docs-screenshots/sessao.json')
const VIEWPORT = { width: 1440, height: 900 }
const QUALIDADE_WEBP = 0.9

/** CSS que estabiliza o print: sem animação, sem cursor piscando, sem widgets flutuantes. */
const CSS_ESTAVEL = `
  *, *::before, *::after { transition: none !important; animation: none !important; caret-color: transparent !important; }
  #kinbox-widget, .Toastify, .ant-message, .ant-notification { display: none !important; }
  /* Sem animação, os modais do antd ficariam presos no estado inicial da entrada (invisíveis) */
  .ant-zoom-appear, .ant-zoom-appear-prepare, .ant-zoom-enter, .ant-zoom-enter-prepare,
  .ant-fade-appear, .ant-fade-appear-prepare, .ant-fade-enter, .ant-fade-enter-prepare { opacity: 1 !important; transform: none !important; }
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
  if ('esperar' in passo) await page.locator(passo.esperar).first().waitFor({ state: 'visible', timeout: 30_000 })
  else if ('clicar' in passo) await page.locator(passo.clicar).first().click({ timeout: 30_000 })
  else if ('digitar' in passo) await page.locator(passo.digitar.seletor).first().fill(passo.digitar.texto)
  else if ('tecla' in passo) await page.keyboard.press(passo.tecla)
  else if ('pausa' in passo) await page.waitForTimeout(passo.pausa)
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
    const el = page.locator(seletor).first()
    await el.waitFor({ state: 'visible', timeout: 30_000 })
    const caixa = await el.boundingBox()
    if (!caixa) throw new Error(`Alvo sem área visível: ${seletor}`)
    caixas.push(caixa)
  }
  const x = Math.max(0, Math.min(...caixas.map((c) => c.x)))
  const y = Math.max(0, Math.min(...caixas.map((c) => c.y)))
  const direita = Math.min(VIEWPORT.width, Math.max(...caixas.map((c) => c.x + c.width)))
  const baixo = Math.min(VIEWPORT.height, Math.max(...caixas.map((c) => c.y + c.height)))
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
  await garantirWorkspace(page, item.workspace || DOCS_WORKSPACE_NAME)
  await page.goto(WEB_URL + item.url, { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.addStyleTag({ content: CSS_ESTAVEL })
  for (const passo of item.passos || []) await executarPasso(page, passo)

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
      const { destino, bytes } = await capturar(page, conversor, item)
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
