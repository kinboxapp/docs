/**
 * Preparos da captura: estados temporários que um item precisa no staging e que o seed não deixa prontos, porque
 * mudariam outros prints ou porque expiram (pedido de autorização do MCP, token de API, copiloto configurado). Cada
 * preparo monta o estado pela API antes do item e devolve como desfazer, chamado depois do print, com ou sem erro.
 *
 * Um item usa um preparo com `preparar: <nome>` no `manifesto.yml`. O preparo pode trocar marcadores da `url` do item
 * (ex.: `PEDIDO_PENDENTE` pelo pedido criado na hora).
 */
import { createHash, randomBytes } from 'node:crypto'
import { API_V3, DOCS_WORKSPACE_NAME, client, findDocsWorkspace, login, sleep, type LoginResponse } from './staging'

type Api = ReturnType<typeof client>

export type Preparo = {
  /** Marcadores da `url` do item e o valor que entra no lugar de cada um. */
  trocas?: Record<string, string>
  /** Desfaz o estado montado. Roda depois do print, mesmo se o item falhar. */
  desfazer?: () => Promise<void>
}

/** Workspace de testes do staging, de onde vêm as telas de WhatsApp (itens com `workspace: Kinbox`). */
const WORKSPACE_TESTES = 'Kinbox'

let sessao: Promise<LoginResponse> | undefined
async function apiDe(nome: string): Promise<Api> {
  sessao ||= login()
  const s = await sessao
  const ws = nome === DOCS_WORKSPACE_NAME ? findDocsWorkspace(s) : s.workspaces.find((w) => w.workspace === nome)
  if (!ws) throw new Error(`Workspace "${nome}" não encontrado na conta de teste`)
  return client(ws.token)
}

const lista = (resposta: any): any[] => (Array.isArray(resposta) ? resposta : resposta?.data || [])

// ─── Copiloto ────────────────────────────────────────────────────────────────

/** Os 2 comandos personalizados fictícios que aparecem nos prints do copiloto. */
const COMANDOS_DE_CHAT = {
  enabled: true,
  enableTextCommands: true,
  textCommands: [
    { name: 'Resumo em 3 linhas', prompt: 'Resuma o texto a seguir em até 3 linhas, sem perder prazos e valores:\n\n{{editor_text}}', enabled: true },
    {
      name: 'Tom da Loja Exemplo',
      prompt: 'Reescreva o texto a seguir no tom da Loja Exemplo: cordial, direto e sem gírias. Chame o cliente de {{first_name}}.\n\n{{editor_text}}',
      enabled: true,
    },
  ],
}

/** Sugestões automáticas com os valores padrão da tela (só ligadas). */
const SUGESTOES_AUTOMATICAS = {
  enabled: true,
  systemPrompt: '',
  maxSuggestions: 1,
  temperature: 0.4,
  processImages: true,
  transcribeAudio: true,
  suggestQuickPhrases: true,
}

/**
 * Configurações do copiloto (`settings.copilot` do workspace de documentação) de cada preparo. Fora da captura o
 * copiloto do workspace fica vazio (o print do botão Sugestões depende disso).
 */
const COPILOTO: Record<string, Record<string, unknown>> = {
  // Galeria, Comandos personalizados e Classificação de intenção
  'copiloto-completo': {
    autoSuggestion: SUGESTOES_AUTOMATICAS,
    chatCommands: COMANDOS_DE_CHAT,
    sentiment: { enabled: true },
    resolveGuard: { enabled: true },
    intent: { enabled: true },
    lead: { enabled: true },
  },
  // Tela com 4 funções, sem Sugestões automáticas
  'copiloto-quatro-funcoes': {
    chatCommands: COMANDOS_DE_CHAT,
    sentiment: { enabled: true },
    intent: { enabled: true },
    lead: { enabled: true },
  },
  // Menu do Copiloto na conversa: só Comandos de chat (sem sugestões automáticas, que gastariam saldo ao abrir a conversa)
  'copiloto-comandos': {
    chatCommands: COMANDOS_DE_CHAT,
  },
}

async function trocarCopiloto(api: Api, copilot: unknown) {
  const ws = await api.v0('GET', '/workspace')
  const settings = { ...(ws?.settings || {}) }
  if (copilot === undefined) delete settings.copilot
  else settings.copilot = copilot
  await api.v0('PUT', '/workspace', { settings })
  return ws?.settings?.copilot
}

async function prepararCopiloto(nome: string): Promise<Preparo> {
  const api = await apiDe(DOCS_WORKSPACE_NAME)
  const anterior = await trocarCopiloto(api, COPILOTO[nome])
  return { desfazer: async () => void (await trocarCopiloto(api, anterior)) }
}

// ─── Base de conhecimento ────────────────────────────────────────────────────

const BASE_FICTICIA = 'Políticas de troca e devolução'

/** Base fictícia em Aguardando processamento (criada sem processar e apagada depois). */
async function prepararBaseAguardando(): Promise<Preparo> {
  const api = await apiDe(DOCS_WORKSPACE_NAME)
  // Sobra de uma captura interrompida: apaga antes de criar de novo
  for (const base of lista(await api.v3('GET', '/knowledge-bases'))) {
    if (base.name === BASE_FICTICIA) await api.v3('DELETE', `/knowledge-bases/${base._id || base.id}`)
  }
  const base = await api.v3('POST', '/knowledge-bases', {
    name: BASE_FICTICIA,
    type: 'text',
    text: 'Trocas em até 30 dias com nota fiscal. Devoluções por arrependimento em até 7 dias após o recebimento.',
  })
  const id = base._id || base.id
  return { desfazer: async () => void (await api.v3('DELETE', `/knowledge-bases/${id}`)) }
}

// ─── Token de API ────────────────────────────────────────────────────────────

const TOKEN_FICTICIO = 'Integração ERP (exemplo)'

/** Token temporário (Ler e Alterar), revogado depois do print. O valor do token nunca é guardado nem impresso. */
async function prepararTokenTemporario(): Promise<Preparo> {
  const api = await apiDe(DOCS_WORKSPACE_NAME)
  for (const token of lista(await api.v3('GET', '/api-tokens'))) {
    if (token.name === TOKEN_FICTICIO) await api.v3('DELETE', `/api-tokens/${token.id}`)
  }
  const { id } = await api.v3<{ id: string }>('POST', '/api-tokens', { name: TOKEN_FICTICIO, scopes: ['read', 'write'] })
  return { desfazer: async () => void (await api.v3('DELETE', `/api-tokens/${id}`)) }
}

// ─── Pedido de autorização do MCP ────────────────────────────────────────────

/** Raiz do authorization server do MCP (fora do prefixo /v3). */
const OAUTH_URL = API_V3.replace(/\/v3\/?$/, '')
/** Retorno fictício do aplicativo de teste: o pedido é negado no fim e nada é enviado para lá. */
const REDIRECT_FICTICIO = 'https://www.example.com/oauth/callback'

/**
 * Pedido de autorização pendente de um aplicativo de teste chamado "Claude" (o mesmo nome que aparece ao conectar o
 * Claude), como o que a tela Autorizar acesso recebe. Depois do print o pedido é negado. Troca `PEDIDO_PENDENTE`.
 */
async function prepararPedidoMcp(): Promise<Preparo> {
  const registro = await fetch(`${OAUTH_URL}/oauth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_name: 'Claude', redirect_uris: [REDIRECT_FICTICIO], token_endpoint_auth_method: 'none' }),
  })
  const cliente: any = await registro.json().catch(() => null)
  if (!registro.ok || !cliente?.client_id) throw new Error(`Registro do aplicativo de teste do MCP falhou (${registro.status})`)

  const desafio = createHash('sha256').update(randomBytes(32).toString('base64url')).digest('base64url')
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: cliente.client_id,
    redirect_uri: REDIRECT_FICTICIO,
    code_challenge: desafio,
    code_challenge_method: 'S256',
    scope: 'read write',
    state: 'captura',
  })
  const autorizar = await fetch(`${OAUTH_URL}/oauth/authorize?${params}`, { redirect: 'manual' })
  const destino = autorizar.headers.get('location') || ''
  const pedido = destino.includes('/oauth/consent') ? new URL(destino).searchParams.get('request') : null
  if (!pedido) throw new Error(`O pedido de autorização do MCP não chegou à tela de consentimento (${autorizar.status})`)

  const api = await apiDe(DOCS_WORKSPACE_NAME)
  return {
    trocas: { PEDIDO_PENDENTE: pedido },
    desfazer: async () => void (await api.v3('POST', `/mcp/oauth/authorizations/${pedido}/decision`, { approve: false }).catch(() => {})),
  }
}

// ─── WhatsApp (workspace de testes) ──────────────────────────────────────────

/** Canal Express de QA (número fictício) usado no print do código de conexão. */
const CANAL_QR = 251

/**
 * Deixa o canal Express de QA aguardando a leitura do QR Code. Se ele estiver em outro status, reinicia o canal (o
 * mesmo que Ações › Reiniciar canal) e espera o status `qr_code`. Não desfaz: o canal só serve a testes.
 */
async function prepararCanalAguardandoQr(): Promise<Preparo> {
  const api = await apiDe(WORKSPACE_TESTES)
  const status = async () => lista(await api.v0('GET', '/integrations/channel')).find((c) => Number(c.id) === CANAL_QR)?.status
  if ((await status()) === 'qr_code') return {}
  await api.v0('POST', `/integrations/restart/${CANAL_QR}`)
  for (let i = 0; i < 40; i++) {
    await sleep(3000)
    if ((await status()) === 'qr_code') return {}
  }
  throw new Error(`O canal ${CANAL_QR} não chegou ao status "Necessário ler QR-Code" depois de reiniciar (status: ${await status()})`)
}

/** Canal da API oficial do WhatsApp (versão 4 = API Cloud) do workspace de testes. */
const VERSAO_API_OFICIAL = 4
/** Folga mínima na janela de 24 h, para o contador não virar no meio da captura. */
const FOLGA_JANELA_MS = 30 * 60 * 1000

/**
 * Conversa aberta do canal oficial de teste com a janela de 24 h aberta (mensagem do cliente nas últimas 24 h, com
 * folga). A janela é do cliente real do teste e muda sozinha, por isso a conversa é escolhida na hora. Troca
 * `CONVERSA_JANELA_ABERTA`.
 */
async function prepararConversaJanelaAberta(): Promise<Preparo> {
  const api = await apiDe(WORKSPACE_TESTES)
  const canais = lista(await api.v0('GET', '/integrations/channel')).filter((c) => String(c.channelId) === '1' && Number(c.version) === VERSAO_API_OFICIAL)
  const limite = Date.now() - 24 * 60 * 60 * 1000 + FOLGA_JANELA_MS
  for (const canal of canais) {
    const conversas = lista(await api.v0('GET', `/inbox?limit=100&workspacePlatformId=${canal.id}`))
    const aberta = conversas
      .filter((c) => !c.isFinished && c.customerLastMessageAt && new Date(c.customerLastMessageAt).getTime() > limite)
      .sort((a, b) => new Date(b.customerLastMessageAt).getTime() - new Date(a.customerLastMessageAt).getTime())[0]
    if (aberta) return { trocas: { CONVERSA_JANELA_ABERTA: String(aberta.id) } }
  }
  throw new Error(
    'Nenhuma conversa aberta do canal oficial de teste recebeu mensagem do cliente nas últimas 24 h: mande uma mensagem do número de teste para o canal oficial e capture de novo',
  )
}

// ─── Registro ────────────────────────────────────────────────────────────────

const PREPAROS: Record<string, () => Promise<Preparo>> = {
  'copiloto-completo': () => prepararCopiloto('copiloto-completo'),
  'copiloto-quatro-funcoes': () => prepararCopiloto('copiloto-quatro-funcoes'),
  'copiloto-comandos': () => prepararCopiloto('copiloto-comandos'),
  'base-aguardando': prepararBaseAguardando,
  'token-temporario': prepararTokenTemporario,
  'pedido-mcp': prepararPedidoMcp,
  'canal-aguardando-qr': prepararCanalAguardandoQr,
  'conversa-janela-aberta': prepararConversaJanelaAberta,
}

export const nomesPreparos = Object.keys(PREPAROS)

export async function preparar(nome: string): Promise<Preparo> {
  const preparo = PREPAROS[nome]
  if (!preparo) throw new Error(`Preparo desconhecido: ${nome}. Use: ${nomesPreparos.join(', ')}`)
  return preparo()
}
