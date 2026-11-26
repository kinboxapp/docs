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

/**
 * CRM (prints da seção `funis`): produtos, responsáveis fictícios nos negócios do funil Vendas (para o print não mostrar a
 * foto do dono do workspace, que é uma conta real), produtos num negócio, um negócio ganho e um perdido, e um funil
 * operacional com dois tickets.
 */
const PRODUTOS = [
  { name: 'Café especial 250 g', description: 'Grãos torrados na semana', price: 45, isActive: true },
  { name: 'Kit presente', description: 'Caixa com dois cafés e uma caneca', price: 160, isActive: true },
  { name: 'Assinatura mensal de café', description: 'Um pacote por mês, com entrega', price: 99.9, isActive: true },
  { name: 'Caneca edição de inverno', description: 'Fora de linha', price: 39, isActive: false },
]

const RESPONSAVEIS: Record<string, string> = {
  'Kit presente — Ana Souza': 'Bruno Carvalho',
  'Kits corporativos — Carlos Pereira': 'Carla Mendes',
  'Assinatura de café — Rafael Martins': 'Bruno Carvalho',
  'Cesta de café da manhã — Beatriz Alves': 'Diego Santos',
  'Reposição de estoque — Lucas Ferreira': 'Carla Mendes',
  'Presente de aniversário — Fernanda Costa': 'Diego Santos',
}

const FUNIL_OPERACIONAL = {
  name: 'Pós-venda',
  stages: [
    { id: 'recebido', name: 'Recebido', color: '#64748b' },
    { id: 'analise', name: 'Em análise', color: '#0ea5e9' },
    { id: 'aguardando', name: 'Aguardando cliente', color: '#f59e0b' },
  ],
  lostReasons: ['Sem retorno do cliente', 'Fora da política de troca'],
  tickets: [
    { name: 'Troca de produto — Beatriz Alves', contato: 'Beatriz Alves', stageId: 'analise', responsavel: 'Diego Santos' },
    { name: 'Entrega atrasada — Carlos Pereira', contato: 'Carlos Pereira', stageId: 'recebido', responsavel: 'Bruno Carvalho' },
  ],
}

async function garantirCrm(api: Api, contatoIds: Record<string, string>) {
  // Produtos
  const produtos = lista(await api.v3('GET', '/products?limit=100'))
  for (const p of PRODUTOS) {
    if (!produtos.some((x) => x.name === p.name)) produtos.push(await api.v3('POST', '/products', p))
  }
  const produto = (nome: string) => produtos.find((x) => x.name === nome)

  // Responsáveis fictícios (membros convidados)
  const operadores = lista(await api.v0('GET', '/operators?limit=100'))
  // Sem o membro, o negócio ficaria com o dono real da conta (nome e foto no print): falha em vez de seguir
  const opId = (nome: string) => {
    const membro = MEMBROS.find((m) => m.name === nome)
    const op = operadores.find((o) => o.email === membro?.email)
    if (!op) throw new Error(`membro "${nome}" não encontrado: rode antes a etapa "membros" (bun seed.ts --so membros,crm)`)
    return Number(op.operatorId || op.id)
  }

  const vendas = lista(await api.v3('GET', '/pipelines')).find((p) => p.name === PIPELINE.name)
  if (vendas) {
    const negocios = lista(await api.v3('GET', `/deals?pipelineId=${String(vendas.id || vendas._id)}&limit=100`))
    for (const negocio of negocios) {
      const responsavel = RESPONSAVEIS[negocio.name]
      const operatorId = responsavel ? opId(responsavel) : undefined
      const patch: Record<string, unknown> = {}
      if (operatorId && negocio.operatorId !== operatorId) patch.operatorId = operatorId
      if (negocio.name === 'Kit presente — Ana Souza' && !negocio.products?.length) {
        const kit = produto('Kit presente')
        const cafe = produto('Café especial 250 g')
        if (kit && cafe) {
          patch.products = [
            { id: String(kit.id || kit._id), name: kit.name, price: kit.price, quantity: 2, discount: 0, discountType: 'percentage', total: 320 },
            { id: String(cafe.id || cafe._id), name: cafe.name, price: cafe.price, quantity: 1, discount: 0, discountType: 'percentage', total: 45 },
          ]
          patch.value = 365
        }
      }
      // Um negócio ganho e um perdido, para o quadro mostrar as três situações do cartão
      if (negocio.name === 'Presente de aniversário — Fernanda Costa' && negocio.status !== 'won') {
        Object.assign(patch, { status: 'won', wonLostDate: new Date().toISOString() })
      }
      if (negocio.name === 'Cesta de café da manhã — Beatriz Alves' && negocio.status !== 'lost') {
        Object.assign(patch, { status: 'lost', lostReason: ['Preço'], wonLostDate: new Date().toISOString() })
      }
      if (Object.keys(patch).length) await api.v3('PATCH', `/deals/${negocio.id || negocio._id}`, patch)
    }
  }

  // Funil operacional
  let pos = lista(await api.v3('GET', '/pipelines')).find((p) => p.name === FUNIL_OPERACIONAL.name)
  if (!pos) {
    pos = await api.v3('POST', '/pipelines', {
      name: FUNIL_OPERACIONAL.name,
      kind: 'operational',
      stages: FUNIL_OPERACIONAL.stages.map((s) => ({ ...s, requireds: [] })),
      lostReasons: FUNIL_OPERACIONAL.lostReasons,
      requiredCustomFieldIds: [],
      privacy: { type: 'public' },
      cadence: [],
      rules: [],
    })
  }
  const posId = String(pos.id || pos._id)
  const tickets = lista(await api.v3('GET', `/deals?pipelineId=${posId}&limit=100`))
  for (const t of FUNIL_OPERACIONAL.tickets) {
    if (tickets.some((d) => d.name === t.name)) continue
    await api.v3('POST', '/deals', {
      name: t.name,
      value: 0,
      pipelineId: posId,
      stageId: t.stageId,
      contactId: Number(contatoIds[t.contato]),
      operatorId: opId(t.responsavel),
    })
  }
  log(`crm: ${PRODUTOS.length} produtos, responsáveis nos negócios de "${PIPELINE.name}", funil operacional "${FUNIL_OPERACIONAL.name}"`)
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

/**
 * Salas (prints da seção salas): a sala pública "Avisos" com mensagens internas fictícias da equipe,
 * uma fixada, uma com reação e uma resposta em thread, e a sala privada "Gerência". As mensagens
 * saem em nome da conta de teste (dona do workspace): os prints mascaram nome e foto do autor.
 * Salas são só da equipe: nada é enviado a contato.
 */
async function garantirSalas(api: Api) {
  const salas = lista(await api.v0('GET', '/rooms'))
  let avisos = salas.find((r) => r.name === 'Avisos' && r.type !== 'dm')
  if (!avisos) {
    avisos = await api.v0('POST', '/rooms', { name: 'Avisos', description: 'Comunicados para toda a equipe', privacy: 'public', color: '#3498db', memberIds: [] })
  }
  if (!salas.some((r) => r.name === 'Gerência' && r.type !== 'dm')) {
    const eu = lista(await api.v0('GET', '/operators?limit=100')).find((o) => o.isOwner)
    await api.v0('POST', '/rooms', { name: 'Gerência', description: 'Metas e escalas da semana', privacy: 'private', color: '#8e44ad', memberIds: eu ? [eu.id] : [] })
  }
  const avisosId = String(avisos.id || avisos._id)
  const mensagens = lista(await api.v3('GET', `/rooms/${avisosId}/messages?limit=50`))
  if (!mensagens.length) {
    const textos = [
      'Bom dia, equipe! A partir de segunda, o atendimento de sábado vai até as 14h.',
      'Lembrete: antes de encerrar o dia, confiram se ficou alguma conversa sem responsável.',
      'A nova coleção de cafés especiais chega na quinta. As fotos já estão na pasta de produtos.',
    ]
    const criadas: any[] = []
    for (const text of textos) criadas.push(await api.v0('POST', `/rooms/${avisosId}/messages`, { text, type: 'text' }))
    const [primeira, , terceira] = criadas.map((m) => String(m._id || m.id))
    await api.v3('POST', `/rooms/${avisosId}/messages/${primeira}/pin`, {})
    await api.v3('POST', `/rooms/${avisosId}/messages/${primeira}/reactions`, { emoji: '👍' })
    await api.v3('POST', `/rooms/${avisosId}/messages/${terceira}/thread`, { text: 'Combinado. Vou atualizar as frases rápidas com os novos sabores.', type: 'text' })
  }
  log(`salas: "Avisos" (pública, ${mensagens.length || 3} mensagens) e "Gerência" (privada)`)
}

/** Agente de IA criado pelo mesmo caminho do onboarding. Nasce desligado e sem canal. */
async function garantirAgente(api: Api) {
  const existente = lista(await api.v3('GET', '/agents')).find((a) => a.name === AGENTE.name)
  if (!existente) await api.v3('POST', '/onboarding/agent', AGENTE)
  log(`agente de IA: "${AGENTE.name}"${existente ? ' (reaproveitado)' : ''}`)
}

/**
 * Bot de exemplo "Atendimento inicial" (prints da seção bot): Início → Mensagem → Menu → Mensagem/Atendimento → Fim.
 * Nasce e fica DESLIGADO, com o widget fictício em "Canais que atende".
 */
function montarBotExemplo(grupoId: string, canalId: string) {
  const pos = (x: number, y: number) => ({ x, y })
  const cores: Record<string, string> = { message: '#686de0', menu: '#0984e3', assign: '#38ada9', integration: '#000' }
  const no = (id: string, type: string, x: number, y: number, action: any = {}) => ({ id, type, position: pos(x, y), data: { backgroundColor: cores[type], action } })
  const aresta = (source: string, sourceHandle: string, target: string) => ({
    id: `reactflow__edge-${source}${sourceHandle}-${target}`, source, sourceHandle, target, targetHandle: null,
    type: 'removable_edge', animated: true, arrowHeadType: 'arrow', style: { stroke: 'var(--content-primary)' },
  })
  const nos = [
    { id: '1', type: 'start', position: pos(-60, 200), data: { label: 'Início' }, sourcePosition: 'right' },
    no('boas-vindas', 'message', 260, 180, { text: 'Olá, {{first_name}}! Bem-vindo à Loja Exemplo.' }),
    no('menu', 'menu', 560, 150, {
      text: 'Como podemos ajudar? Digite o número da opção:',
      menu_options: [{ value: '1', name: 'Acompanhar meu pedido' }, { value: '2', name: 'Trocas e devoluções' }, { value: '3', name: 'Falar com a equipe' }],
      menu_validate_text: 'Resposta inválida. Digite 1, 2 ou 3.', similarity_rate: 20,
      menu_response_timeout_value: 10, menu_response_timeout_unit: 'seconds',
    }),
    no('pedido', 'message', 940, -120, { text: 'Para acompanhar o pedido, acesse Minha conta > Pedidos no site.' }),
    no('trocas', 'message', 940, 170, { text: 'Você pode trocar qualquer produto em até 30 dias após o recebimento, com a nota fiscal.' }),
    no('equipe', 'assign', 940, 480, { assign_type: 'group', assign_to_group_id: grupoId }),
    { id: 'end', type: 'end', position: pos(1320, 200), data: { label: 'Fim', action: {} }, sourcePosition: 'left' },
  ]
  const arestas = [
    aresta('1', 'start', 'boas-vindas'), aresta('boas-vindas', 'a', 'menu'),
    aresta('menu', '1', 'pedido'), aresta('menu', '2', 'trocas'), aresta('menu', '3', 'equipe'),
    aresta('pedido', 'a', 'end'), aresta('trocas', 'a', 'end'), aresta('equipe', 'a', 'end'),
  ]
  const elements = [...nos, ...arestas]
  const actions = nos.map((n: any) => ({
    id: n.id, type: n.type,
    targets: arestas.filter((e) => e.source === n.id).map((e) => ({ sourceHandle: e.sourceHandle, target: e.target })),
    ...(n.data?.action || {}),
  }))
  return {
    name: 'Atendimento inicial', color: '#6c5ce7', isActive: false, channels: [canalId], businessHours: [],
    isEnabledForAllChannels: false, expirable: false, settings: {}, actions, elements,
  }
}

async function garantirBot(api: Api, canal: string) {
  const existente = lista(await api.v0('GET', '/bot')).find((b) => b.name === 'Atendimento inicial')
  if (!existente) {
    const grupo = lista(await api.v0('GET', '/group')).find((g) => g.name === EQUIPE.name)
    if (!grupo) throw new Error(`Equipe "${EQUIPE.name}" não encontrada`)
    await api.v0('POST', '/bot', montarBotExemplo(String(grupo.id), canal))
  }
  log(`bot: "Atendimento inicial" (desligado)${existente ? ' (reaproveitado)' : ''}`)
}

/**
 * Segundo bot de exemplo "Consulta de pedido" (prints de integração): Chamar endpoint grava o pedido no campo Json
 * `pedido` (sessão) e Executar código marca o cliente; endereços em exemplo.com. Desligado e sem canal.
 */
function montarBotIntegracao() {
  const pos = (x: number, y: number) => ({ x, y })
  const cores: Record<string, string> = { message: '#686de0', menu: '#0984e3', assign: '#38ada9', integration: '#000' }
  const no = (id: string, type: string, x: number, y: number, action: any = {}) => ({ id, type, position: pos(x, y), data: { backgroundColor: cores[type], action } })
  const aresta = (source: string, sourceHandle: string, target: string) => ({
    id: `reactflow__edge-${source}${sourceHandle}-${target}`, source, sourceHandle, target, targetHandle: null,
    type: 'removable_edge', animated: true, arrowHeadType: 'arrow', style: { stroke: 'var(--content-primary)' },
  })
  const json = JSON.stringify({
    url: 'https://exemplo.com/api/pedidos?email={{email}}',
    method: 'GET',
    headers: { Authorization: 'Bearer SEU_TOKEN' },
    mapReturnToCustomField: { pedido: 'data' },
  }, null, 2)
  const codigo = `async function run(kinbox) {\n  const { contact } = kinbox\n\n  // Consulta um sistema externo (endereço fictício)\n  const url = "https://exemplo.com/api/clientes"\n  const { data } = await axios.get(url, {\n    params: { email: contact.email },\n  })\n\n  if (data.vip) {\n    await kinbox.addTag("vip")\n  }\n\n  return data\n}`
  const nos = [
    { id: '1', type: 'start', position: pos(-60, 200), data: { label: 'Início' }, sourcePosition: 'right' },
    no('consulta', 'integration', 260, 170, { code: 'custom', integration_description: 'Consultar pedido', script: json }),
    no('codigo', 'integration', 600, 170, { code: 'run_code', integration_description: 'Marcar cliente VIP', scriptCode: codigo }),
    no('resposta', 'message', 940, 170, { text: 'Seu pedido {{json:pedido.numero}} está: {{json:pedido.status}}.' }),
    { id: 'end', type: 'end', position: pos(1300, 200), data: { label: 'Fim', action: {} }, sourcePosition: 'left' },
  ]
  const arestas = [aresta('1', 'start', 'consulta'), aresta('consulta', 'a', 'codigo'), aresta('codigo', 'a', 'resposta'), aresta('resposta', 'a', 'end')]
  const elements = [...nos, ...arestas]
  const actions = nos.map((n: any) => ({
    id: n.id, type: n.type,
    targets: arestas.filter((e) => e.source === n.id).map((e) => ({ sourceHandle: e.sourceHandle, target: e.target })),
    ...(n.data?.action || {}),
  }))
  return { name: 'Consulta de pedido', color: '#00b894', isActive: false, channels: [], businessHours: [], isEnabledForAllChannels: false, expirable: false, settings: {}, actions, elements }
}

async function garantirBotIntegracao(api: Api) {
  const campos = lista(await api.v0('GET', '/custom-fields'))
  if (!campos.some((c) => c.placeholder === 'pedido')) {
    await api.v0('POST', '/custom-fields', { name: 'Pedido', placeholder: 'pedido', type: 'json', entity: 'session', description: 'Dados do pedido consultado pelo bot' })
  }
  const existente = lista(await api.v0('GET', '/bot')).find((b) => b.name === 'Consulta de pedido')
  if (!existente) await api.v0('POST', '/bot', montarBotIntegracao())
  log(`bot: "Consulta de pedido" (desligado, sem canal) e campo Json "pedido"${existente ? ' (reaproveitado)' : ''}`)
}

/**
 * Organização do atendimento (prints da seção `atendimento`): grupos Vendas e Suporte, um horário com intervalo,
 * uma regra de atribuição (nasce inativa), a tag Orçamento visível só para Vendas e a automação de avaliação, desligada.
 */
async function garantirOrganizacao(api: Api) {
  const operadores = lista(await api.v0('GET', '/operators?limit=100'))
  const idDe = (nome: string) => String(operadores.find((o) => o.name === nome)?.id || '')
  const grupos = lista(await api.v0('GET', '/group'))
  const novos = [
    { name: 'Vendas', description: 'Orçamentos e novos pedidos', icon: '#22c55e', membros: ['Bruno Carvalho', 'Carla Mendes'] },
    { name: 'Suporte', description: 'Trocas, entregas e dúvidas de uso', icon: '#0ea5e9', membros: ['Carla Mendes', 'Diego Santos'] },
  ]
  for (const g of novos) {
    if (!grupos.some((x) => x.name === g.name)) {
      await api.v0('POST', '/group', { name: g.name, description: g.description, icon: g.icon, members: g.membros.map(idDe).filter(Boolean) })
    }
  }
  const vendas = lista(await api.v0('GET', '/group')).find((g) => g.name === 'Vendas')

  const horarios = lista(await api.v0('GET', '/business-hours'))
  if (!horarios.some((h) => h.name === 'Atendimento da loja')) {
    const util = { active: true, hours: [['09:00', '12:00'], ['13:00', '18:00']] }
    await api.v0('POST', '/business-hours', {
      name: 'Atendimento da loja', mon: util, tue: util, wed: util, thu: util, fri: util,
      sat: { active: true, hours: [['09:00', '13:00']] }, sun: { active: false, hours: [] },
    })
  }

  const regras = lista(await api.v0('GET', '/inbox/assignment'))
  if (vendas && !regras.some((r) => r.name === 'Distribuir entre Vendas')) {
    await api.v0('POST', '/inbox/assignment', { name: 'Distribuir entre Vendas', rule: 'all', assignTo: 'round_robin_agent_group', groupId: vendas.id })
  }

  const orcamento = lista(await api.v3('GET', '/tags')).find((t) => t.name === 'Orçamento')
  // Cor da paleta da tela (sky): com o hex do seed, o campo Cor da edição mostra o código em vez do nome
  if (vendas && orcamento && (orcamento.privacy?.type !== 'group' || orcamento.color !== '#e0f2fe')) {
    await api.v3('PATCH', `/tags/${orcamento.id}`, { color: '#e0f2fe', privacy: { type: 'group', groupIds: [String(vendas.id)] } })
  }

  const automacoes = lista(await api.v0('GET', '/automations'))
  if (!automacoes.some((a) => a.name === 'Pedir avaliação')) {
    await api.v0('POST', '/automations', {
      name: 'Pedir avaliação', active: false, trigger: 'trigger:conversation:resolved',
      conditions_active: false, actions: [{ type: 'action:conversation:rate' }],
    })
  }
  log('organização: grupos Vendas e Suporte, horário "Atendimento da loja", regra "Distribuir entre Vendas" (inativa), automação "Pedir avaliação" (desligada)')
}

/** Widget de exemplo da seção "Chat do site": já configurado, para os prints da tela e do chat no site de teste. */
const WIDGET_EXEMPLO = 'Site da loja'
const WIDGET_EXEMPLO_CONFIG = {
  branding: { colors: { bubble: '#16a085', text: '#ffffff' }, companyName: EMPRESA },
  position: { alignment: 'right', sideSpacing: 20, bottomSpacing: 20 },
  texts: {
    introMessages: [{ text: '👋 Olá! Como podemos te ajudar?' }],
    teamDescription: 'Tire suas dúvidas sobre pedidos, entregas e trocas.',
    awayText: 'Vamos te responder assim que possível',
  },
  preChatForm: {
    description: 'Bem-vindo! Por favor preencha o formulário abaixo antes de iniciar o chat.',
    fields: [
      { name: 'name', type: 'text', label: 'Nome', required: true, options: [] },
      { name: 'email', type: 'text', label: 'E-mail', required: true, options: [] },
      { name: 'phone', type: 'text', label: 'Celular', required: false, options: [] },
    ],
    autoMessage: { enabled: true, text: 'Olá! Acabei de preencher o formulário.' },
  },
  tweaks: {
    enableSound: true,
    showAgentsAvatar: true,
    showOnMobile: true,
    enableCustomAvatar: false,
    hideWidgetButton: false,
    popupBalloon: { enable: true, text: 'Oi, está precisando de ajuda?', delay: 5 },
    enableDomains: true,
    whatsapp: { enabledWhatsApp: true, phone: '+5511900000001', text: 'Oi, quero saber mais sobre os produtos.', onlyWhatsapp: false, captureCampaign: false },
    businessHours: { enableBusinessHours: false },
  },
  // Domínio reservado para exemplos: o HTML do site de teste é servido localmente pela captura nesse endereço;
  // o script e as configurações do chat vêm do staging
  domains: ['https://www.example.com'],
}

async function garantirWidgetExemplo(api: Api) {
  const canais = lista(await api.v0('GET', '/integrations/channel'))
  let canal = canais.find((c) => String(c.channelId) === '10' && c.description === WIDGET_EXEMPLO)
  let widget = canal ? lista(await api.v3('GET', '/widget')).find((w) => String(w.channelId) === String(canal.id)) : undefined
  if (canal && !widget) {
    // Canal sem configurações de widget (criação interrompida): desativa para não deixar um canal órfão na lista
    await api.v3('DELETE', `/widget/channel/${canal.id}`)
    log(`widget de exemplo: canal órfão ${canal.id} desativado`)
  }
  if (!widget) {
    widget = await api.v3('POST', '/widget', { name: WIDGET_EXEMPLO, companyName: EMPRESA })
    canal = { id: widget.channelId }
  }
  await api.v3('PATCH', `/widget/settings/${widget.id}`, WIDGET_EXEMPLO_CONFIG)
  log(`widget de exemplo: "${WIDGET_EXEMPLO}" (canal ${canal.id}), configurado`)
}

/** Campos personalizados de contato e organizações com contatos vinculados (prints da seção Contatos). */
const CAMPOS_CONTATO = [
  {
    name: 'Tipo de cliente',
    placeholder: 'tipo_de_cliente',
    type: 'select',
    entity: 'contact',
    description: 'Como o cliente costuma comprar na loja',
    options: ['Pessoa física', 'Empresa', 'Revenda'].map((value) => ({ value, label: value })),
  },
  { name: 'Data de aniversário', placeholder: 'data_de_aniversario', type: 'day', entity: 'contact', description: 'Para mandar parabéns e cupons' },
]
const VALORES_CONTATO: Record<string, { tipo_de_cliente?: string; notes?: string }> = {
  'Ana Souza': { tipo_de_cliente: 'Pessoa física', notes: 'Prefere receber mensagens à tarde.' },
  'Carlos Pereira': { tipo_de_cliente: 'Empresa' },
  'Lucas Ferreira': { tipo_de_cliente: 'Revenda' },
}
const ORGANIZACOES = [
  { name: 'Escritório Exemplo', segment: 'Serviços', website: 'https://www.example.com', contatos: [{ nome: 'Carlos Pereira', role: 'Compras' }] },
  { name: 'Padaria Exemplo', segment: 'Alimentação', contatos: [{ nome: 'Lucas Ferreira', role: 'Gerente' }, { nome: 'Juliana Rocha', role: 'Financeiro' }] },
]

async function garantirClientes(api: Api, contatoIds: Record<string, string>) {
  const campos = lista(await api.v0('GET', '/custom-fields'))
  for (const campo of CAMPOS_CONTATO) {
    if (!campos.some((c) => c.placeholder === campo.placeholder)) await api.v0('POST', '/custom-fields', campo)
  }
  for (const [nome, valores] of Object.entries(VALORES_CONTATO)) {
    const id = contatoIds[nome]
    if (!id) continue
    await api.v3('PATCH', `/contacts/${id}`, {
      ...(valores.notes ? { notes: valores.notes } : {}),
      ...(valores.tipo_de_cliente ? { customFields: { tipo_de_cliente: { value: valores.tipo_de_cliente, type: 'select' } } } : {}),
    })
  }
  const existentes = lista(await api.v3('GET', '/organizations?limit=100'))
  for (const org of ORGANIZACOES) {
    const { contatos, ...dados } = org
    let o = existentes.find((x) => x.name === org.name)
    if (!o) o = await api.v3('POST', '/organizations', dados)
    const vinculados = lista(await api.v3('GET', `/organizations/${o.id}/contacts`)).map((l: any) => String(l.contactId ?? l.contact?.id))
    for (const contato of contatos) {
      const contactId = contatoIds[contato.nome]
      if (contactId && !vinculados.includes(contactId)) await api.v3('POST', `/organizations/${o.id}/contacts`, { contactId, role: contato.role })
    }
  }
  log(`clientes: ${CAMPOS_CONTATO.length} campos de contato e ${ORGANIZACOES.length} organizações`)
}

// As etapas abaixo são independentes: uma falha é registrada e o seed segue com as outras
// (as funções só rodam no laço do fim, depois que `api`, `canal`, `tagIds` e `contatoIds` existem)
const falhas: Record<string, string> = {}
const etapas: [string, () => Promise<unknown>][] = [
  ['funil', () => garantirFunil(api, contatoIds, tagIds)],
  ['membros', () => garantirMembros(api)],
  ['respostas rápidas', () => garantirRespostasRapidas(api)],
  ['agente', () => garantirAgente(api)],
  ['bot', () => garantirBot(api, canal)],
  ['bot de integração', () => garantirBotIntegracao(api)],
  ['organização do atendimento', () => garantirOrganizacao(api)],
  ['widget de exemplo', () => garantirWidgetExemplo(api)],
  ['clientes', () => garantirClientes(api, contatoIds)],
  ['crm', () => garantirCrm(api, contatoIds)],
  ['salas', () => garantirSalas(api)],
]
// `bun seed.ts --so funil,membros,crm` roda só as etapas listadas (as do começo, idempotentes, rodam sempre).
// `crm` depende de `funil` (o funil "Vendas") e de `membros` (os responsáveis): rode as três juntas.
const nomesEtapas = etapas.map(([nome]) => nome)
const soArg = process.argv.indexOf('--so')
let so: string[] | undefined
if (soArg > -1) {
  const valor = process.argv[soArg + 1]
  if (!valor || valor.startsWith('--')) throw new Error(`--so precisa da lista de etapas, separadas por vírgula: ${nomesEtapas.join(', ')}`)
  const pedidas = valor.split(',').map((nome) => nome.trim())
  const desconhecidas = pedidas.filter((nome) => !nomesEtapas.includes(nome))
  if (desconhecidas.length) throw new Error(`--so: etapa desconhecida (${desconhecidas.join(', ')}). Use: ${nomesEtapas.join(', ')}`)
  so = pedidas
}

const workspace = await garantirWorkspace()
const api = client(workspace.token)
await pularOnboarding(api)
const canal = await garantirWidget(api)
const tagIds = await garantirTags(api)
await garantirConversas(api, canal, tagIds)
const contatoIds = await garantirContatos(api)

for (const [nome, etapa] of etapas) {
  if (so && !so.includes(nome)) continue
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
