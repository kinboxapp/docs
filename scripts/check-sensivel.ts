// Procura dados sensíveis nos arquivos alterados. O repositório é público: barrar antes do merge é a única proteção real,
// porque um revert não apaga o histórico.
// Uso: bun scripts/check-sensivel.ts --base origin/main   (arquivos alterados em relação à base)
//      bun scripts/check-sensivel.ts <arquivo> [<arquivo> ...]
import { arquivosAlvo, encerrar, ler, type Falha } from './lib'

// Páginas geradas da referência da API (só apontam para o openapi.json, que é checado) e binários
const FORA = [/^api-reference\//, /^scripts\/check-sensivel\.ts$/, /\.(png|webp|jpe?g|gif|svg|ico|woff2?)$/i, /(^|\/)bun\.lockb?$/]

// Exceções: o 0800 e o WhatsApp do suporte, e os telefones fictícios do workspace de documentação (+55 11 90000-00xx)
const TELEFONES_PERMITIDOS = [/8001151777$/, /^(55)?119000000\d\d$/]
const EMAILS_PERMITIDOS = [/@example\.(com|org|net)$/i, /@exemplo\.com(\.br)?$/i]

type Regra = { nome: string; padrao: RegExp; valida?: (trecho: string, arquivo: string) => boolean }

const digitos = (s: string) => s.replace(/\D/g, '')

const luhn = (numero: string) => {
  let soma = 0
  let dobra = false
  for (let i = numero.length - 1; i >= 0; i--) {
    let d = Number(numero[i])
    if (dobra) {
      d *= 2
      if (d > 9) d -= 9
    }
    soma += d
    dobra = !dobra
  }
  return soma % 10 === 0
}

const REGRAS: Regra[] = [
  {
    nome: 'e-mail',
    padrao: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g,
    valida: (t) => !EMAILS_PERMITIDOS.some((r) => r.test(t)) && !/\.(png|webp|svg|jpg)$/i.test(t),
  },
  {
    nome: 'telefone',
    // +55 com DDD, (DD) 9xxxx-xxxx, DD 9xxxx-xxxx, e 55DDXXXXXXXXX em links de WhatsApp
    padrao: /(?:\+\s?55[\s-]?\(?\d{2}\)?[\s-]?9?\d{4}[\s-]?\d{4})|(?:\(\d{2}\)\s?9?\d{4}[\s-]?\d{4})|(?:\b\d{2}\s9\d{4}-\d{4}\b)|(?:\b55\d{10,11}\b)|(?:\b0800[\s-]?\d{3}[\s-]?\d{4}\b)/g,
    valida: (t) => !TELEFONES_PERMITIDOS.some((r) => r.test(digitos(t))),
  },
  // O CPF e o CNPJ zerados são os exemplos fictícios da referência da API
  { nome: 'CPF', padrao: /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g, valida: (t) => t !== '000.000.000-00' },
  { nome: 'CNPJ', padrao: /\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/g, valida: (t) => t !== '00.000.000/0000-00' },
  {
    nome: 'número de cartão',
    padrao: /\b[3-6]\d{3}(?:[\s-]?\d{4}){2,3}(?:[\s-]?\d{1,3})?\b/g,
    valida: (t) => {
      const d = digitos(t)
      return d.length >= 13 && d.length <= 19 && luhn(d)
    },
  },
  {
    nome: 'token',
    padrao:
      /\b(?:kb_(?:live|mcp|mcpr)_[A-Za-z0-9_-]{8,}|sk-[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|xox[abprs]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16}|wbx_key_[A-Za-z0-9_-]{8,}|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,})/g,
  },
  {
    nome: 'texto com cara de segredo',
    padrao: /\b[A-Za-z0-9_-]{32,}\b/g,
    // Só conta se misturar maiúsculas, minúsculas e dígitos (SHAs e slugs não misturam)
    valida: (t) => /[A-Z]/.test(t) && /[a-z]/.test(t) && /\d/.test(t) && !t.includes('--'),
  },
  { nome: 'pendência (TODO/FIXME)', padrao: /\b(?:TODO|FIXME|XXX)\b/g },
  {
    // Qualquer host com "staging" no nome, em qualquer pasta: os scripts de prints leem os endereços de fora do repositório
    nome: 'link de staging',
    padrao: /\b[\w-]*staging[\w-]*(?:\.[\w-]+)*\.(?:com|br|so|app|io|net|dev|cloud)\b/gi,
  },
]

const arquivos = arquivosAlvo(process.argv.slice(2)).filter((a) => !FORA.some((r) => r.test(a)))
const falhas: Falha[] = []

for (const arquivo of arquivos) {
  const linhas = ler(arquivo).split('\n')
  linhas.forEach((linha, i) => {
    for (const regra of REGRAS) {
      for (const m of linha.matchAll(regra.padrao)) {
        if (regra.valida && !regra.valida(m[0], arquivo)) continue
        const trecho = m[0].length > 12 ? m[0].slice(0, 6) + '…' : m[0]
        falhas.push({ arquivo: `${arquivo}:${i + 1}`, mensagem: `${regra.nome} encontrado ("${trecho}")` })
      }
    }
  })
}

// A referência pública da API só publica `/v1`: o spec que a API serve tem rotas internas, que não podem entrar
if (arquivos.includes('openapi.json')) {
  const spec = JSON.parse(ler('openapi.json'))
  for (const caminho of Object.keys(spec.paths ?? {})) {
    if (!caminho.startsWith('/v1/') && caminho !== '/v1') falhas.push({ arquivo: 'openapi.json', mensagem: `caminho fora de /v1 ("${caminho}")` })
  }
}

encerrar(`dados sensíveis (${arquivos.length} arquivos)`, falhas)
