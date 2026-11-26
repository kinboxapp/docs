// Utilitários compartilhados pelas checagens do CI (ver guia-de-escrita.md e AGENTS.md).
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

export const RAIZ = join(import.meta.dir, '..')

/** Lista os arquivos de uma pasta (recursivo), com caminho relativo à raiz do repositório e `/` como separador. */
export function listarArquivos(pasta: string, filtro: (caminho: string) => boolean = () => true): string[] {
  const absoluta = join(RAIZ, pasta)
  if (!existsSync(absoluta)) return []
  const saida: string[] = []
  const visitar = (dir: string) => {
    for (const nome of readdirSync(dir)) {
      if (nome === 'node_modules' || nome.startsWith('.')) continue
      const caminho = join(dir, nome)
      if (statSync(caminho).isDirectory()) visitar(caminho)
      else {
        const rel = relative(RAIZ, caminho).split(sep).join('/')
        if (filtro(rel)) saida.push(rel)
      }
    }
  }
  visitar(absoluta)
  return saida.sort()
}

export function ler(caminho: string): string {
  return readFileSync(join(RAIZ, caminho), 'utf8')
}

export function existe(caminho: string): boolean {
  return existsSync(join(RAIZ, caminho))
}

/** Separa o frontmatter YAML do corpo. Devolve `null` em `dados` quando não há frontmatter. */
export function separarFrontmatter(texto: string): { dados: Record<string, unknown> | null; corpo: string; erro?: string } {
  const m = texto.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) return { dados: null, corpo: texto }
  try {
    const dados = Bun.YAML.parse(m[1]) as Record<string, unknown>
    return { dados: dados ?? {}, corpo: m[2] }
  } catch (e) {
    return { dados: null, corpo: m[2], erro: `YAML inválido: ${(e as Error).message}` }
  }
}

/** Todas as páginas referenciadas na navegação do `docs.json` (sem extensão). */
export function paginasDaNavegacao(docs: any): string[] {
  const paginas: string[] = []
  const visitar = (no: unknown) => {
    if (typeof no === 'string') paginas.push(no)
    else if (Array.isArray(no)) no.forEach(visitar)
    else if (no && typeof no === 'object') {
      for (const [chave, valor] of Object.entries(no)) {
        if (['pages', 'groups', 'tabs', 'anchors', 'dropdowns', 'versions', 'languages', 'menu', 'products'].includes(chave)) visitar(valor)
      }
    }
  }
  visitar(docs.navigation)
  return paginas
}

/** Caminho do arquivo de uma página da navegação, ou `null` se não existe. */
export function arquivoDaPagina(pagina: string): string | null {
  for (const ext of ['.mdx', '.md']) if (existe(pagina + ext)) return pagina + ext
  return null
}

export type Falha = { arquivo: string; mensagem: string }

/** Imprime as falhas no formato de anotação do GitHub Actions e encerra com código 1 se houver alguma. */
export function encerrar(nome: string, falhas: Falha[]): never {
  if (falhas.length === 0) {
    console.log(`✓ ${nome}: ok`)
    process.exit(0)
  }
  const noCI = !!process.env.GITHUB_ACTIONS
  for (const f of falhas) {
    if (noCI) console.log(`::error file=${f.arquivo}::${f.mensagem}`)
    else console.log(`✗ ${f.arquivo}: ${f.mensagem}`)
  }
  console.log(`\n${nome}: ${falhas.length} problema(s).`)
  process.exit(1)
}

/** Arquivos alterados em relação a uma base git (`--base <ref>`), ou os caminhos passados como argumento. */
export function arquivosAlvo(args: string[]): string[] {
  const i = args.indexOf('--base')
  if (i >= 0) {
    const base = args[i + 1]
    const r = Bun.spawnSync(['git', 'diff', '--name-only', '--diff-filter=d', `${base}...HEAD`], { cwd: RAIZ })
    if (r.exitCode !== 0) throw new Error(`git diff falhou: ${r.stderr.toString()}`)
    const naoCommitados = Bun.spawnSync(['git', 'diff', '--name-only', '--diff-filter=d', 'HEAD'], { cwd: RAIZ }).stdout.toString()
    const novos = Bun.spawnSync(['git', 'ls-files', '--others', '--exclude-standard'], { cwd: RAIZ }).stdout.toString()
    const todos = new Set([r.stdout.toString(), naoCommitados, novos].join('\n').split('\n').filter(Boolean))
    return [...todos].filter(existe).sort()
  }
  return args.filter((a) => !a.startsWith('--'))
}
