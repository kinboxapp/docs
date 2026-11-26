// Confere a navegação do docs.json e as rotas antigas do help.kinbox.com.br.
// - Toda entrada da navegação aponta para um arquivo que existe.
// - Toda página de docs/ aparece na navegação (página fora do menu não é vista por ninguém).
// - Cada rota de scripts/rotas-antigas.json resolve (arquivo existe ou há redirect). Por padrão, só as rotas cuja
//   pasta-pai já existe em docs/; com --completo, todas (portão da virada e PRs para a main depois dela).
// Uso: bun scripts/check-navegacao.ts [--completo]
import { arquivoDaPagina, encerrar, existe, ler, listarArquivos, paginasDaNavegacao, type Falha } from './lib'

const completo = process.argv.includes('--completo')
const falhas: Falha[] = []
const docs = JSON.parse(ler('docs.json'))
const navegacao = paginasDaNavegacao(docs)

const vistas = new Set<string>()
for (const pagina of navegacao) {
  if (vistas.has(pagina)) falhas.push({ arquivo: 'docs.json', mensagem: `página repetida na navegação: ${pagina}` })
  vistas.add(pagina)
  if (!arquivoDaPagina(pagina)) falhas.push({ arquivo: 'docs.json', mensagem: `a navegação aponta para um arquivo que não existe: ${pagina}` })
}

for (const arquivo of listarArquivos('docs', (c) => c.endsWith('.mdx') || c.endsWith('.md'))) {
  const pagina = arquivo.replace(/\.mdx?$/, '')
  if (!vistas.has(pagina)) falhas.push({ arquivo, mensagem: 'página de docs/ fora da navegação do docs.json' })
}

if (existe('novidades.mdx') && !vistas.has('novidades')) {
  // Antes da virada a aba Novidades não existe na main (sem abas vazias). Só avisa.
  console.log('aviso: novidades.mdx existe mas não está na navegação')
}

// Redirects do docs.json, com suporte a :param e :slug*
type Redirect = { source: string; destination: string }
const redirects: Redirect[] = docs.redirects ?? []
const casa = (rota: string, origem: string) => {
  const padrao = origem
    .split('/')
    .map((parte) => (parte.endsWith('*') && parte.startsWith(':') ? '.*' : parte.startsWith(':') ? '[^/]+' : parte.replace(/[.+?^${}()|[\]\\]/g, '\\$&')))
    .join('/')
  return new RegExp(`^${padrao}/?$`).test(rota)
}
const resolve = (rota: string) => {
  const limpa = rota.replace(/^\//, '').replace(/\/$/, '')
  if (limpa === '' || arquivoDaPagina(limpa)) return true
  return redirects.some((r) => casa('/' + limpa, r.source))
}

if (existe('scripts/rotas-antigas.json')) {
  const rotas: string[] = JSON.parse(ler('scripts/rotas-antigas.json'))
  let conferidas = 0
  for (const rota of rotas) {
    const limpa = rota.replace(/^\//, '').replace(/\/$/, '')
    const pai = limpa.split('/').slice(0, -1).join('/')
    if (!completo && !(pai.startsWith('docs') && existe(pai))) continue
    conferidas++
    if (!resolve(rota)) falhas.push({ arquivo: 'scripts/rotas-antigas.json', mensagem: `rota antiga sem página nem redirect: ${rota}` })
  }
  console.log(`rotas antigas conferidas: ${conferidas} de ${rotas.length}${completo ? ' (modo completo)' : ''}`)
}

encerrar(`navegação (${navegacao.length} entradas)`, falhas)
