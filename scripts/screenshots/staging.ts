/**
 * Acesso ao staging do Kinbox, compartilhado pelo seed e pela captura.
 *
 * As credenciais vêm de `KINBOX_STAGING_EMAIL` e `KINBOX_STAGING_PASSWORD`. Se elas não estiverem no
 * ambiente, o script lê `~/.config/kinbox/staging.env`. Nada de credencial fica neste repositório.
 */
import { homedir } from 'node:os'
import { join } from 'node:path'

/** api-v0 (login, inbox, operadores) */
export const API_V0 = process.env.KINBOX_STAGING_API_V0 || 'https://staging-api.kinbox.com.br/api'
/** api-v2 (rotas `/v3`) */
export const API_V3 = process.env.KINBOX_STAGING_API_V3 || 'https://api4-staging.kinbox.com.br/v3'
/** front do staging */
export const WEB_URL = process.env.KINBOX_STAGING_WEB || 'https://staging.kinbox.com.br'

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
  let email = process.env.KINBOX_STAGING_EMAIL
  let password = process.env.KINBOX_STAGING_PASSWORD
  if (!email || !password) {
    const file = Bun.file(join(homedir(), '.config/kinbox/staging.env'))
    if (await file.exists()) {
      for (const line of (await file.text()).split('\n')) {
        const m = line.match(/^\s*(?:export\s+)?([A-Z_]+)\s*=\s*(.*)\s*$/)
        if (!m) continue
        const value = m[2].replace(/^(['"])(.*)\1$/, '$2')
        if (m[1] === 'KINBOX_STAGING_EMAIL') email ||= value
        if (m[1] === 'KINBOX_STAGING_PASSWORD') password ||= value
      }
    }
  }
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
