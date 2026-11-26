/**
 * Cria (ou completa) o workspace de documentação no staging, com dados fictícios estáveis para os prints
 * da central de ajuda.
 *
 * Uso: `bun scripts/screenshots/seed.ts`
 *
 * É idempotente: cada item é procurado pelo nome (ou e-mail) antes de ser criado, e as conversas continuam
 * do passo em que pararam. Rodar de novo não duplica nada.
 *
 * Todos os nomes, e-mails (`example.com`) e telefones (`+55 11 90000-00NN`) são fictícios.
 */
import { API_V0, DOCS_WORKSPACE_NAME, client, findDocsWorkspace, login, sleep, type LoginWorkspace } from './staging'

// ---------------------------------------------------------------------------------------------------------
// Cenário
// ---------------------------------------------------------------------------------------------------------

const EMPRESA = DOCS_WORKSPACE_NAME
const WIDGET_NOME = 'Chat do site'

/** Cores da paleta de tags do front (tom 500), para aparecerem com a cor certa na tela. */
const TAGS = [
  { name: 'Cliente novo', color: '#22c55e' },
  { name: 'Orçamento', color: '#0ea5e9' },
  { name: 'Pós-venda', color: '#8b5cf6' },
  { name: 'Urgente', color: '#ef4444' },
  { name: 'VIP', color: '#f59e0b' },
]

/** Telefone fictício no formato que a API grava (só dígitos, com DDI). */
const telefone = (n: number) => `55119000000${String(n).padStart(2, '0')}`

const CONTATOS = [
  { name: 'Ana Souza', email: 'ana.souza@example.com', phone: telefone(1) },
  { name: 'Mariana Lima', email: 'mariana.lima@example.com', phone: telefone(2) },
  { name: 'Carlos Pereira', email: 'carlos.pereira@example.com', phone: telefone(3) },
  { name: 'Juliana Rocha', email: 'juliana.rocha@example.com', phone: telefone(4) },
  { name: 'Rafael Martins', email: 'rafael.martins@example.com', phone: telefone(5) },
  { name: 'Beatriz Alves', email: 'beatriz.alves@example.com', phone: telefone(6) },
  { name: 'Lucas Ferreira', email: 'lucas.ferreira@example.com', phone: telefone(7) },
  { name: 'Fernanda Costa', email: 'fernanda.costa@example.com', phone: telefone(8) },
]

type Passo = { de: 'cliente' | 'atendente'; texto: string }

/**
 * Conversas pelo chat do site. `visitante` é a chave estável do visitante: a mesma chave cai sempre na
 * mesma conversa. As mensagens do cliente entram pela fila do widget, como um visitante de verdade.
 */
const CONVERSAS: { visitante: string; nome: string; tags: string[]; passos: Passo[] }[] = [
  {
    visitante: 'docs-01',
    nome: 'Mariana Lima',
    tags: ['Cliente novo'],
    passos: [
      { de: 'cliente', texto: 'Oi! Vocês entregam no sábado?' },
      { de: 'atendente', texto: 'Olá, Mariana! Entregamos sim, aos sábados das 9h às 13h.' },
      { de: 'cliente', texto: 'Ótimo! Se eu pedir pelo site hoje, chega neste sábado?' },
      { de: 'atendente', texto: 'Chega, sim. Pedidos feitos até sexta às 18h saem para entrega no sábado.' },
    ],
  },
  {
    visitante: 'docs-02',
    nome: 'Carlos Pereira',
    tags: ['Orçamento'],
    passos: [
      { de: 'cliente', texto: 'Boa tarde! Queria um orçamento de 20 kits de presente para a minha empresa.' },
      { de: 'atendente', texto: 'Boa tarde, Carlos! Claro. Para quando você precisa dos kits?' },
      { de: 'cliente', texto: 'Até o dia 15 do mês que vem, se possível.' },
    ],
  },
  {
    visitante: 'docs-03',
    nome: 'Juliana Rocha',
    tags: ['Pós-venda', 'Urgente'],
    passos: [
      { de: 'cliente', texto: 'Olá, meu pedido chegou com um item faltando.' },
      { de: 'atendente', texto: 'Sinto muito, Juliana! Pode me passar o número do pedido?' },
      { de: 'cliente', texto: 'É o pedido 1234.' },
      { de: 'atendente', texto: 'Obrigado! Já separei o item e ele sai amanhã, sem custo para você.' },
    ],
  },
  {
    visitante: 'docs-04',
    nome: 'Rafael Martins',
    tags: ['VIP'],
    passos: [{ de: 'cliente', texto: 'Olá! Vocês já têm a linha nova de cafés especiais?' }],
  },
]

const PIPELINE = {
  name: 'Vendas',
  stages: [
    { id: 'novo', name: 'Novo contato', color: '#64748b' },
    { id: 'qualificacao', name: 'Qualificação', color: '#0ea5e9' },
    { id: 'proposta', name: 'Proposta enviada', color: '#f59e0b' },
    { id: 'negociacao', name: 'Negociação', color: '#8b5cf6' },
  ],
}

const NEGOCIOS = [
  { name: 'Kit presente — Ana Souza', contato: 'Ana Souza', value: 350, stageId: 'proposta', tags: [] },
  { name: 'Kits corporativos — Carlos Pereira', contato: 'Carlos Pereira', value: 4800, stageId: 'qualificacao', tags: ['Orçamento'] },
  { name: 'Assinatura de café — Rafael Martins', contato: 'Rafael Martins', value: 1200, stageId: 'negociacao', tags: ['VIP'] },
  { name: 'Cesta de café da manhã — Beatriz Alves', contato: 'Beatriz Alves', value: 280, stageId: 'novo', tags: ['Cliente novo'] },
  { name: 'Reposição de estoque — Lucas Ferreira', contato: 'Lucas Ferreira', value: 2100, stageId: 'proposta', tags: [] },
  { name: 'Presente de aniversário — Fernanda Costa', contato: 'Fernanda Costa', value: 190, stageId: 'novo', tags: [] },
]

/** Membros convidados. O convite vai para `example.com`, que não recebe e-mail. */
const MEMBROS = [
  { name: 'Bruno Carvalho', email: 'bruno.carvalho@example.com', cargo: 'Atendente' },
  { name: 'Carla Mendes', email: 'carla.mendes@example.com', cargo: 'Supervisor' },
  { name: 'Diego Santos', email: 'diego.santos@example.com', cargo: 'Atendente' },
]

const EQUIPE = { name: 'Atendimento', membros: ['Bruno Carvalho', 'Carla Mendes', 'Diego Santos'] }

const RESPOSTAS_RAPIDAS = [
  { tag: 'horario', phrase: 'Nosso horário de atendimento é de segunda a sexta, das 9h às 18h, e aos sábados das 9h às 13h.' },
  { tag: 'entrega', phrase: 'Entregamos em até 2 dias úteis na cidade de São Paulo. Para outras cidades, o prazo aparece no carrinho.' },
  { tag: 'trocas', phrase: 'Você pode trocar qualquer produto em até 30 dias após o recebimento, com a nota fiscal.' },
]

const AGENTE = {
  name: 'Lia',
  welcome: `Olá! Eu sou a Lia, assistente virtual da ${EMPRESA}. Como posso ajudar?`,
  companyName: EMPRESA,
  segment: 'Varejo e Comércio Eletrônico',
  facts: [
    { label: 'Horário de atendimento', value: 'Segunda a sexta, das 9h às 18h; sábado, das 9h às 13h' },
    { label: 'Entrega', value: 'Até 2 dias úteis na cidade de São Paulo; pedidos até sexta às 18h saem no sábado' },
    { label: 'Trocas', value: 'Em até 30 dias após o recebimento, com a nota fiscal' },
    { label: 'Pagamento', value: 'Pix, cartão de crédito em até 3x sem juros e boleto' },
  ],
}

// ---------------------------------------------------------------------------------------------------------
// Execução
// ---------------------------------------------------------------------------------------------------------

type Api = ReturnType<typeof client>
const lista = <T = any>(r: any): T[] => (Array.isArray(r) ? r : r?.data || [])
const log = (msg: string) => console.log(msg)

/** Encontra o workspace de documentação ou cria um novo para a conta logada. */
async function garantirWorkspace(): Promise<LoginWorkspace> {
  const session = await login()
  const existente = findDocsWorkspace(session)
  if (existente) {
    log(`workspace: reaproveitado "${existente.workspace}" (id ${existente.workspaceId})`)
    return existente
  }
  if (!session.accountToken) throw new Error('A resposta do login não trouxe o accountToken para criar o workspace')
  // Mesma rota da tela "Criar novo ambiente": autentica pela conta, não por um workspace
  const res = await fetch(`${API_V0}/operators/workspaces`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: session.accountToken },
    body: JSON.stringify({ name: DOCS_WORKSPACE_NAME }),
  })
  const data: any = await res.json().catch(() => null)
  if (!res.ok || !data?.createdWorkspaceId) throw new Error(`Falha ao criar o workspace (${res.status}): ${data?.message || ''}`)
  const criado = (data.workspaces as LoginWorkspace[]).find((w) => String(w.workspaceId) === String(data.createdWorkspaceId))
  if (!criado) throw new Error('Workspace criado, mas ele não veio na resposta')
  log(`workspace: criado "${criado.workspace}" (id ${criado.workspaceId})`)
  return criado
}

/**
 * Marca o onboarding guiado como pulado, igual ao botão "Pular onboarding". Sem isso, o dono cai no
 * onboarding em vez do app, e os prints não abrem a tela pedida.
 */
async function pularOnboarding(api: Api) {
  const ws = await api.v0('GET', '/workspace')
  const settings = ws?.settings || {}
  if (settings.onboarding?.completedAt || settings.onboarding?.skippedAt) return log('onboarding: já pulado')
  await api.v0('PUT', '/workspace', {
    settings: { ...settings, onboarding: { ...(settings.onboarding || {}), skippedAt: new Date().toISOString() } },
  })
  log('onboarding: marcado como pulado')
}

async function garantirWidget(api: Api) {
  const existentes = lista(await api.v3('GET', '/widget'))
  if (existentes.length) {
    log(`widget: reaproveitado (canal ${existentes[0].channelId})`)
    return String(existentes[0].channelId)
  }
  const w = await api.v3('POST', '/widget', { name: WIDGET_NOME, companyName: EMPRESA })
  log(`widget: criado (canal ${w.channelId})`)
  return String(w.channelId)
}

async function garantirTags(api: Api) {
  const existentes = lista(await api.v3('GET', '/tags?limit=100'))
  const ids: Record<string, string> = {}
  for (const tag of TAGS) {
    let t = existentes.find((x) => x.name === tag.name)
    if (!t) t = await api.v3('POST', '/tags', { ...tag, textColor: '#fff', privacy: { type: 'public' } })
    else if (t.color !== tag.color) await api.v3('PATCH', `/tags/${t.id}`, { color: tag.color })
    ids[tag.name] = String(t.id)
  }
  log(`tags: ${Object.keys(ids).length}`)
  return ids
}

async function conversaDoVisitante(api: Api, canal: string, visitante: string) {
  const conversas = lista(await api.v0('GET', `/inbox?segmentId=all&workspacePlatformId=${canal}&limit=100&skipCount=true`))
  return conversas.find((c) => String(c.identifier || '').startsWith(`${visitante}:`))
}

/** Mensagens comuns (sem as de sistema), da mais antiga para a mais nova. */
async function mensagens(api: Api, conversaId: string) {
  const msgs = lista(await api.v0('GET', `/inbox/messages?id=${conversaId}&limit=50&offset=0&skipReadConversation=true`))
  return msgs.filter((m) => m.type === 0).reverse()
}

/** Espera a fila do widget gravar a mensagem do cliente. */
async function esperarMensagens(api: Api, canal: string, visitante: string, quantidade: number) {
  for (let i = 0; i < 30; i++) {
    const c = await conversaDoVisitante(api, canal, visitante)
    if (c && (await mensagens(api, c.id)).length >= quantidade) return c
    await sleep(1500)
  }
  throw new Error(`A mensagem do visitante ${visitante} não apareceu no inbox`)
}

async function garantirConversas(api: Api, canal: string, tagIds: Record<string, string>) {
  for (const conv of CONVERSAS) {
    let c = await conversaDoVisitante(api, canal, conv.visitante)
    let feitos = c ? (await mensagens(api, c.id)).length : 0
    for (const [i, passo] of conv.passos.entries()) {
      if (i < feitos) continue
      if (passo.de === 'cliente') {
        await api.v3('POST', '/onboarding/test-message', { channelId: canal, text: passo.texto, visitor: conv.visitante, name: conv.nome })
        c = await esperarMensagens(api, canal, conv.visitante, i + 1)
      } else {
        if (!c) throw new Error(`Conversa ${conv.visitante} sem mensagem do cliente antes da resposta`)
        await api.v0('POST', '/inbox/messages', {
          content: JSON.stringify([{ insert: `${passo.texto}\n` }]),
          customerPlatformId: c.id,
          type: 0,
          tempId: `docs-${conv.visitante}-${i}`,
        })
      }
      feitos = i + 1
    }
    c = await conversaDoVisitante(api, canal, conv.visitante)
    const desejadas = conv.tags.map((t) => tagIds[t]).sort()
    const atuais = (c.tags || []).map(String).sort()
    if (desejadas.join() !== atuais.join()) {
      await api.v0('PUT', '/inbox/tag', { tags: desejadas, id: c.id, callId: c.callId })
    }
  }
  log(`conversas: ${CONVERSAS.length}`)
}

/** Contatos: o chat do site já cria o contato com o nome; aqui completa e-mail e telefone. */
async function garantirContatos(api: Api) {
  const existentes = lista(await api.v3('GET', '/contacts?limit=100'))
  const ids: Record<string, string> = {}
  for (const contato of CONTATOS) {
    let c = existentes.find((x) => x.name === contato.name)
    if (!c) {
      c = await api.v3('POST', '/contacts', contato)
    } else if (c.email !== contato.email || c.phone !== contato.phone) {
      c = await api.v3('PATCH', `/contacts/${c.id}`, { email: contato.email, phone: contato.phone })
    }
    ids[contato.name] = String(c.id)
  }
  log(`contatos: ${Object.keys(ids).length}`)
  return ids
}

async function garantirFunil(api: Api, contatoIds: Record<string, string>, tagIds: Record<string, string>) {
  let pipeline = lista(await api.v3('GET', '/pipelines')).find((p) => p.name === PIPELINE.name)
  if (!pipeline) {
    pipeline = await api.v3('POST', '/pipelines', {
      name: PIPELINE.name,
      kind: 'commercial',
      stages: PIPELINE.stages.map((s) => ({ ...s, requireds: [] })),
      lostReasons: ['Sem justificativa', 'Preço', 'Concorrência'],
      requiredCustomFieldIds: [],
      privacy: { type: 'public' },
      cadence: [],
      rules: [],
    })
  }
  const pipelineId = String(pipeline.id || pipeline._id)
  const existentes = lista(await api.v3('GET', `/deals?pipelineId=${pipelineId}&limit=100`))
  for (const negocio of NEGOCIOS) {
    if (existentes.some((d) => d.name === negocio.name)) continue
    await api.v3('POST', '/deals', {
      name: negocio.name,
      value: negocio.value,
      pipelineId,
      stageId: negocio.stageId,
      contactId: Number(contatoIds[negocio.contato]),
      tagIds: negocio.tags.map((t) => tagIds[t]),
    })
  }
  log(`funil: "${PIPELINE.name}" com ${NEGOCIOS.length} negócios`)
}

async function garantirMembros(api: Api) {
  const cargos = lista(await api.v0('GET', '/roles'))
  const operadores = lista(await api.v0('GET', '/operators?limit=100'))
  const ids: Record<string, string> = {}
  for (const membro of MEMBROS) {
    let op = operadores.find((o) => o.email === membro.email)
    if (!op) {
      const cargo = cargos.find((r) => r.name === membro.cargo)
      if (!cargo) throw new Error(`Cargo "${membro.cargo}" não encontrado`)
      op = await api.v0('POST', '/operators', { name: membro.name, email: membro.email, roleId: String(cargo.id), isActive: true })
    }
    ids[membro.name] = String(op.operatorId || op.id)
  }
  log(`membros convidados: ${Object.keys(ids).length}`)

  const equipe = lista(await api.v0('GET', '/group')).find((g) => g.name === EQUIPE.name)
  if (!equipe) {
    await api.v0('POST', '/group', { name: EQUIPE.name, description: '', members: EQUIPE.membros.map((n) => ids[n]) })
  }
  log(`equipe: "${EQUIPE.name}"`)
}

async function garantirRespostasRapidas(api: Api) {
  const existentes = lista(await api.v0('GET', '/inbox/quick-phrases?limit=100'))
  for (const r of RESPOSTAS_RAPIDAS) {
    if (existentes.some((x) => x.tag === r.tag)) continue
    await api.v0('POST', '/inbox/quick-phrases', { ...r, privacy: 'public', type: 'text' })
  }
  log(`respostas rápidas: ${RESPOSTAS_RAPIDAS.length}`)
}

/** Agente de IA criado pelo mesmo caminho do onboarding. Nasce desligado e sem canal. */
async function garantirAgente(api: Api) {
  const existente = lista(await api.v3('GET', '/agents')).find((a) => a.name === AGENTE.name)
  if (!existente) await api.v3('POST', '/onboarding/agent', AGENTE)
  log(`agente de IA: "${AGENTE.name}"${existente ? ' (reaproveitado)' : ''}`)
}

const workspace = await garantirWorkspace()
const api = client(workspace.token)
await pularOnboarding(api)
const canal = await garantirWidget(api)
const tagIds = await garantirTags(api)
await garantirConversas(api, canal, tagIds)
const contatoIds = await garantirContatos(api)

// As etapas abaixo são independentes: uma falha é registrada e o seed segue com as outras
const falhas: Record<string, string> = {}
const etapas: [string, () => Promise<unknown>][] = [
  ['funil', () => garantirFunil(api, contatoIds, tagIds)],
  ['membros', () => garantirMembros(api)],
  ['respostas rápidas', () => garantirRespostasRapidas(api)],
  ['agente', () => garantirAgente(api)],
]
for (const [nome, etapa] of etapas) {
  try {
    await etapa()
  } catch (e) {
    falhas[nome] = (e as Error).message
    console.error(`⚠ ${nome}: ${(e as Error).message}`)
  }
}

console.log(`\nWorkspace de documentação: "${workspace.workspace}" (id ${workspace.workspaceId})`)
if (Object.keys(falhas).length) {
  console.log('Etapas com falha:', falhas)
  process.exitCode = 1
}
