// Confere os prints da central em images/ajuda/**: só .webp ou .png, até 500 KB, e cada um usado por alguma página.
// As imagens antigas fora de images/ajuda/ ficam fora da checagem.
// Uso: bun scripts/check-imagens.ts
import { statSync } from 'node:fs'
import { join } from 'node:path'
import { RAIZ, encerrar, existe, ler, listarArquivos, type Falha } from './lib'

const LIMITE = 500 * 1024
const falhas: Falha[] = []
const imagens = listarArquivos('images/ajuda')

const textos = [
  ...listarArquivos('docs', (c) => /\.mdx?$/.test(c)),
  ...listarArquivos('llm', (c) => /\.mdx?$/.test(c)),
  ...listarArquivos('snippets', (c) => /\.mdx?$/.test(c)),
  ...(existe('novidades.mdx') ? ['novidades.mdx'] : []),
]
  .map(ler)
  .join('\n')

for (const imagem of imagens) {
  if (!/\.(webp|png)$/.test(imagem)) falhas.push({ arquivo: imagem, mensagem: 'formato não aceito: use .webp (ou .png)' })
  const tamanho = statSync(join(RAIZ, imagem)).size
  if (tamanho > LIMITE) falhas.push({ arquivo: imagem, mensagem: `${Math.round(tamanho / 1024)} KB, acima do limite de 500 KB` })
  if (!textos.includes(imagem)) falhas.push({ arquivo: imagem, mensagem: 'imagem órfã: nenhuma página usa este arquivo' })
}

encerrar(`imagens (${imagens.length})`, falhas)
