/**
 * Acesso ao staging do Kinbox, compartilhado pelo seed e pela captura.
 *
 * Nada de endereço nem de credencial fica neste repositório:
 * - os endereços vêm de `KINBOX_STAGING_API_V0`, `KINBOX_STAGING_API_V3`, `KINBOX_STAGING_WEB` e `KINBOX_STAGING_WIDGET`.
 *   Se uma delas não estiver no ambiente, o script lê `~/.config/kinbox/docs-staging.env`;
 * - as credenciais vêm de `KINBOX_STAGING_EMAIL` e `KINBOX_STAGING_PASSWORD`, ou de `~/.config/kinbox/staging.env`.
 */
import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

/** Lê um arquivo `CHAVE=valor` local (aceita `export` e aspas). Devolve vazio se ele não existir. */
function lerEnvLocal(nome: string): Record<string, string> {
  const caminho = join(homedir(), '.config/kinbox', nome)
  if (!existsSync(caminho)) return {}
  const valores: Record<string, string> = {}
  for (const linha of readFileSync(caminho, 'utf8').split('\n')) {
    const m = linha.match(/^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (m) valores[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2')
  }
  return valores
}

const hosts = lerEnvLocal('docs-staging.env')

/** Endereço do staging: do ambiente ou do arquivo local. Falha com a variável que falta, sem valor padrão. */
function endereco(variavel: string) {
  const valor = process.env[variavel] || hosts[variavel]
  if (!valor) throw new Error(`Defina ${variavel} no ambiente ou em ~/.config/kinbox/docs-staging.env (veja o README dos prints)`)
  return valor.replace(/\/+$/, '')
}

/** api-v0 (login, inbox, operadores) */
export const API_V0 = endereco('KINBOX_STAGING_API_V0')
/** api-v2 (rotas `/v3`) */
export const API_V3 = endereco('KINBOX_STAGING_API_V3')
/** front do staging */
export const WEB_URL = endereco('KINBOX_STAGING_WEB')
/** script do chat do site (widget) no staging, o mesmo que o código de instalação do staging carrega */
export const WIDGET_URL = endereco('KINBOX_STAGING_WIDGET')

/** Nome do workspace de documentação. O seed e a captura o encontram por este nome. */
export const DOCS_WORKSPACE_NAME = process.env.DOCS_WORKSPACE_NAME || 'Loja Exemplo'

export type LoginWorkspace = {
  workspaceId: string
  workspace: string
  token: string
  renewalToken: string
  isOwner: boolean
  [key: string]: unknown
}

export type LoginResponse = {
  id: string
  name: string
  accountToken?: string
  workspaces: LoginWorkspace[]
  [key: string]: unknown
}

/** Lê as credenciais do ambiente ou do arquivo local, sem nunca imprimi-las. */
export async function credentials() {
  const local = lerEnvLocal('staging.env')
  const email = process.env.KINBOX_STAGING_EMAIL || local.KINBOX_STAGING_EMAIL
  const password = process.env.KINBOX_STAGING_PASSWORD || local.KINBOX_STAGING_PASSWORD
  if (!email || !password) {
    throw new Error('Defina KINBOX_STAGING_EMAIL e KINBOX_STAGING_PASSWORD (ex.: `. ~/.config/kinbox/staging.env`)')
  }
  return { email, password }
}

/** Login na api-v0. A resposta traz a conta e um token por workspace. */
export async function login(): Promise<LoginResponse> {
  const { email, password } = await credentials()
  const res = await fetch(`${API_V0}/operators/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, twoFactor: 'supported' }),
  })
  const data: any = await res.json().catch(() => null)
  if (!res.ok || !data?.workspaces) {
    throw new Error(`Login no staging falhou (${res.status}): ${data?.message || data?.error || 'sem detalhe'}`)
  }
  return data
}

/** Workspace de documentação na resposta do login, ou `undefined` se ainda não existe. */
export function findDocsWorkspace(session: LoginResponse) {
  return session.workspaces.find((w) => w.workspace === DOCS_WORKSPACE_NAME && w.isOwner)
}

/**
 * Cliente HTTP preso a um workspace: a api-v0 recebe o token puro e a api-v2 recebe `bearer <token>`,
 * igual ao front.
 */
export function client(token: string) {
  async function call<T = any>(base: 'v0' | 'v3', method: string, path: string, body?: unknown): Promise<T> {
    const url = (base === 'v0' ? API_V0 : API_V3) + path
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: base === 'v0' ? token : `bearer ${token}`,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    const text = await res.text()
    let data: any = text
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      // resposta sem JSON
    }
    if (!res.ok) {
      const detail = typeof data === 'string' ? data.slice(0, 300) : JSON.stringify(data).slice(0, 300)
      throw new Error(`${method} ${base}${path} → ${res.status}: ${detail}`)
    }
    return data as T
  }
  return {
    v0: <T = any>(method: string, path: string, body?: unknown) => call<T>('v0', method, path, body),
    v3: <T = any>(method: string, path: string, body?: unknown) => call<T>('v3', method, path, body),
  }
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
