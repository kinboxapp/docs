// Valida o frontmatter de todas as páginas de `docs/` (humano) e `llm/` (só LLM). Contrato em guia-de-escrita.md §Frontmatter.
// Uso: bun scripts/check-frontmatter.ts
import { encerrar, ler, listarArquivos, separarFrontmatter, type Falha } from './lib'

const TIPOS = ['guia', 'conceito', 'referencia', 'solucao-de-problema', 'faq']
const PREFIXOS = ['web', 'api', 'api-v0', 'api-v1', 'mobile', 'widget', 'integrations', 'motor-qr']

// Formatos aceitos em `fontes`: card do Linear, PR, lacuna ou arquivo de código com prefixo
const FONTE_CARD = /^KIN-\d+$/
const FONTE_PR = /^kinboxapp\/[\w.-]+#\d+$/
const FONTE_LACUNA = /^lacuna [\w-]+$/
const FONTE_CODIGO = new RegExp(`^(${PREFIXOS.join('|')}):[^\\s]+$`)

const falhas: Falha[] = []
const paginas = [
  ...listarArquivos('docs', (c) => c.endsWith('.mdx') || c.endsWith('.md')),
  ...listarArquivos('llm', (c) => c.endsWith('.md') || c.endsWith('.mdx')),
]

for (const arquivo of paginas) {
  const falhar = (mensagem: string) => falhas.push({ arquivo, mensagem })
  const { dados, corpo, erro } = separarFrontmatter(ler(arquivo))
  if (erro) {
    falhar(erro)
    continue
  }
  if (!dados) {
    falhar('sem frontmatter')
    continue
  }

  const texto = (campo: string) => typeof dados[campo] === 'string' && (dados[campo] as string).trim().length > 0
  if (!texto('title')) falhar('`title` obrigatório')
  if (!texto('description')) falhar('`description` obrigatório (uma frase)')

  const esperado = arquivo.startsWith('docs/') ? 'humano' : 'llm'
  if (dados.publico !== esperado) falhar(`\`publico\` deve ser "${esperado}" para arquivos em ${arquivo.split('/')[0]}/ (veio ${JSON.stringify(dados.publico)})`)

  if (!TIPOS.includes(dados.tipo as string)) falhar(`\`tipo\` deve ser um de: ${TIPOS.join(', ')} (veio ${JSON.stringify(dados.tipo)})`)

  if (dados.keywords !== undefined && !(Array.isArray(dados.keywords) && dados.keywords.every((k) => typeof k === 'string'))) {
    falhar('`keywords` deve ser uma lista de textos')
  }

  const fontes = dados.fontes
  if (!Array.isArray(fontes) || fontes.length === 0) falhar('`fontes` obrigatório, com pelo menos um card, PR, lacuna ou arquivo de código')
  else {
    for (const f of fontes) {
      const s = String(f)
      if (![FONTE_CARD, FONTE_PR, FONTE_LACUNA, FONTE_CODIGO].some((r) => r.test(s))) {
        falhar(`fonte inválida: "${s}". Use KIN-123, kinboxapp/<repo>#123, "lacuna <id>" ou <prefixo>:<caminho> (prefixos: ${PREFIXOS.join(', ')})`)
      }
    }
  }

  if (dados.codigo !== undefined) {
    if (!Array.isArray(dados.codigo)) falhar('`codigo` deve ser uma lista de caminhos')
    else
      for (const c of dados.codigo) {
        if (!FONTE_CODIGO.test(String(c))) falhar(`caminho de \`codigo\` inválido: "${c}". Use <prefixo>:<caminho ou glob> (prefixos: ${PREFIXOS.join(', ')})`)
      }
  }

  // O YAML pode trazer a data como texto ou como Date
  const v = dados.verificado_em
  const data = v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? '')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data) || Number.isNaN(Date.parse(data))) falhar('`verificado_em` obrigatório, no formato AAAA-MM-DD')
  else if (Date.parse(data) > Date.now() + 2 * 86_400_000) falhar('`verificado_em` no futuro')

  if (arquivo.startsWith('llm/faq/')) {
    if (dados.tipo !== 'faq') falhar('arquivos em llm/faq/ usam `tipo: faq`')
    for (const secao of ['## Pergunta', '## Resposta']) if (!corpo.includes(secao)) falhar(`FAQ sem a seção "${secao}"`)
  } else if (dados.tipo === 'faq' && arquivo.startsWith('llm/')) {
    falhar('`tipo: faq` só em llm/faq/')
  }
}

encerrar(`frontmatter (${paginas.length} páginas)`, falhas)
