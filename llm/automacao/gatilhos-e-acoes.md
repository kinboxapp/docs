---
title: "Automações: ações aceitas por gatilho, atraso dos gatilhos por tempo e sessões criadas por API"
description: Regras detalhadas das automações da Kinbox — quando cada gatilho dispara e para, uma automação por gatilho de tempo, limite de ações e de repetição, sessões de API ou integração, operadores das condições e bordas de cada ação.
keywords: [regras automação, limite de ações automação, automação repetida, limite de execução de automação atingido, várias automações mesmo gatilho, sessão de integração, operadores condição, agendar template canal, automação hubspot, janela 24h automação, nome do cliente na mensagem, variáveis na mensagem da automação, first_name automação, mensagem recebida do cliente, texto da mensagem]
publico: llm
tipo: referencia
fontes:
  - KIN-7905
  - kinboxapp/kinbox-web#921
  - kinboxapp/kinbox-api-v0#141
  - web:src/pages/settings/automations/EditAutomations.tsx
  - web:src/components-old/forms/ActionsInput/index.tsx
  - web:src/components-old/forms/ConditionsInput/index.tsx
  - web:src/lib/constants.tsx
  - api-v0:server/controllers/AutomationEventsController.js
  - api-v0:server/controllers/CallController.js
  - api-v0:server/modules/conditionProcessor.js
  - api-v0:server/modules/scheduler/schedulerManager.js
  - api-v0:server/mongodb/services/AutomationService.js
codigo:
  - web:src/pages/settings/automations/**
  - web:src/components-old/forms/ActionsInput/**
  - web:src/components-old/forms/ConditionsInput/**
  - web:src/pages/settings/index.tsx
  - api-v0:server/controllers/AutomationController.js
  - api-v0:server/controllers/AutomationEventsController.js
  - api-v0:server/modules/EventsEnum.js
verificado_em: 2026-11-26
---

Referência complementar de [Gatilhos, condições e ações das automações](/docs/automacao/gatilhos-e-acoes), [Automações: visão geral](/docs/automacao/visao-geral) e [Minha automação não disparou](/docs/automacao/problemas-comuns).

## Quem pode

- Ver, criar, editar e excluir automações em **Configurações** → **Automação** → **Automações** exige a permissão **Automações** ("Ver, adicionar, editar e excluir automações.", na seção **Gerenciamento do Ambiente** do papel, na tela **Permissão**) ou ser o proprietário do workspace (veja [Referência de permissões](/docs/administracao/referencia-de-permissoes)).
- Um assistente de IA conectado pelo [MCP](/docs/desenvolvedor/mcp) também pode ler, criar e editar automações com a mesma permissão **Automações**.
- Automações não descontam saldo da carteira por si sós; apenas o que elas acionam pode gastar saldo (por exemplo, um bot com recursos de IA; veja [Saldo da carteira e créditos: o que consome](/docs/conceitos/saldo-e-creditos)).

## Gatilhos: quando disparam e quando param

| Grupo | Gatilho | Quando dispara e bordas |
| --- | --- | --- |
| **Conversa** | **Nova conversa ou sessão** | Quando o contato manda uma mensagem que abre uma sessão nova (ou a primeira conversa). Não dispara em sessões abertas por membro, API ou integração. Na primeira mensagem de uma sessão nova, dispara junto com **Mensagem recebida do cliente**. |
| **Conversa** | **Nova conversa ou sessão iniciada pelo membro** | Quando um membro começa uma sessão nova enviando a primeira mensagem. Exige um membro; sessões abertas pela API ou por integração não disparam. |
| **Conversa** | **Mensagem recebida do cliente** | Quando o contato envia uma mensagem na conversa (não tem campo de minutos). Na primeira mensagem de uma sessão nova, dispara junto com **Nova conversa ou sessão**. Dispara também com bot atendendo e em mensagens de grupo. **Não** dispara para mensagem de membro, mensagem digitada no celular do canal, mensagem de bot, nota interna, mensagem de sistema, mensagem enviada por ação de automação nem mensagem mantida resolvida pelo copiloto ([Configurações do copiloto](/docs/copiloto/configuracoes-de-copiloto)). Uma automação nova ou religada com esse gatilho pode levar até 60 segundos para começar a rodar (desligar para na hora). |
| **Conversa** | **Ao resolver uma conversa** | Quando uma sessão que não foi reaberta é resolvida. Não dispara quando a resolução é feita por uma automação nem quando a sessão tinha sido reaberta. |
| **Conversa** | **Ao resolver uma conversa reaberta** | Quando é resolvida uma sessão que tinha sido reaberta dentro do tempo de tolerância. Excludente com **Ao resolver uma conversa**. |
| **Conversa** | **Ao atribuir membro** | Quando a conversa recebe um membro responsável, inclusive pela atribuição automática. Não dispara quando a atribuição é feita diretamente por uma automação no caminho da conversa (mas uma regra de atribuição automática chamada por automação pode disparar). |
| **Conversa** | **Ao mover grupo** | Quando a conversa muda de grupo. Não dispara quando quem move é uma automação. |
| **Conversa** | **Ao adicionar tag** | Quando uma tag é adicionada à conversa; cada tag adicionada dispara de novo, inclusive quando adicionada pela ação **Adicionar tag** de uma automação. A condição **Tag** (grupo **Contexto**, exclusiva deste gatilho) confere a tag recém-adicionada; **Tags** (**contém**/**não contém**) confere todas as tags da conversa. |
| **Conversa** | **Ao transferir conversa** | Quando a conversa é transferida para outro canal (permissão **Transferir conversa**). A automação roda na conversa de destino. |
| **Conversa** | **Conversas reaberta dentro do tempo de tolerância** | Quando o contato escreve depois da resolução, dentro do **Tempo de tolerância ao resolver conversa**, e a sessão é reaberta ([Conversas, sessões e status](/docs/conceitos/conversas-e-sessoes), [Configurações gerais](/docs/configuracoes-no-workspace/configuracoes-gerais)). |
| **Conversa** | **Negócio da conversa atualizado** | Quando uma negociação ligada à conversa é atualizada. |
| **Conversa** | **Chamada perdida** | Quando uma ligação do WhatsApp ou do telefone VoIP para o workspace não é atendida ([Não consigo ligar ou a ligação caiu](/docs/canais/ligacoes/problemas-comuns)). |
| **Conversa** | **Tempo sem nenhuma resposta do membro na sessão nova** | Conta a partir de quando o contato abre uma sessão (nova ou reaberta) e para quando um membro envia mensagem na conversa (mensagem de bot ou de automação não para). Não conta em sessões iniciadas pelo membro. Possui a caixa **Habilitar para sessões geradas por API ou Integração**. |
| **Conversa** | **Tempo sem nova mensagem** | Conta desde a última mensagem do contato ou de um membro; cada nova mensagem de um dos dois recomeça a contagem (mensagem de bot ou da própria automação não recomeça). Dispara **uma vez** por sessão — depois de disparar, só volta a contar numa sessão nova ou reaberta. Vale também em sessões iniciadas pelo membro. Possui a caixa **Habilitar para sessões geradas por API ou Integração**. |
| **Conversa** | **Tempo pendente** | Conta enquanto a conversa está **Pendente** (aguardando resposta do membro); para quando deixa de estar pendente. Não conta em sessões iniciadas pelo membro. |
| **Conversa** | **Tempo para expirar a Janela de 24h** | Apenas **WhatsApp oficial**. Os minutos definem a antecedência **antes** de a janela de 24 horas fechar, contada da última mensagem do contato; cada mensagem nova do contato recomeça a contagem. Se faltar menos tempo do que os minutos configurados, dispara em cerca de 2 minutos ([Janela de 24 horas](/docs/canais/whatsapp/whatsapp-cloud-api/janela-de-24-horas)). |
| **Membro** | **Ao membro ficar online** | Quando um membro fica online na Kinbox ([Ficar disponível ou indisponível](/docs/conta/disponibilidade)). Só aceita a ação **Atribuir conversas sem atendimento** e as condições **Horário**, **Grupo do membro** e **Disponibilidade do membro**. |
| **Contato** | **Tempo sem conversa ao criar contato** | Quando um contato é cadastrado (na tela, pela API pública ou por outras partes da Kinbox) e, passados os minutos em **Minutos sem conversa criada**, ainda não tem conversa em nenhum canal. Só aceita **Iniciar conversa** e não tem condições (condições ligadas são ignoradas). Contatos que já têm qualquer conversa em qualquer canal são pulados. |

## Gatilhos de tempo

- **Campo de minutos e atraso:** todos os gatilhos de tempo pedem **Minutos sem resposta** (ou **Minutos sem conversa criada** em **Tempo sem conversa ao criar contato**), obrigatório, mínimo `1` (nos gatilhos de conversa, o valor inicial é `3`, sem máximo na tela), com a ajuda `"Pode haver atraso de até 3 minutos."`.
- **Ciclos de envio e checagem:**
  - **Agendar mensagem** e **Agendar mensagem template**: saem em ciclos de até 3 minutos.
  - **Agendar execução de bot** e **Enviar mensagem** com **Canal** escolhido: saem em ciclos de até 30 segundos.
  - **Tempo sem conversa ao criar contato**: verificado a cada minuto.
  - Esses ciclos são a frequência com que a Kinbox verifica o que já está na hora de sair, não um prazo. Quando um gatilho de tempo dispara uma ação agendada, as duas esperas podem se somar (o atraso do gatilho e o ciclo do envio); por isso não espere disparo no segundo exato.
- **Fuso horário:** datas e horários das ações agendadas usam o fuso horário do workspace ([Configurações gerais](/docs/configuracoes-no-workspace/configuracoes-gerais)).
- **Uma automação por gatilho de tempo:** nos quatro gatilhos de tempo de conversa (**Tempo sem nenhuma resposta do membro na sessão nova**, **Tempo sem nova mensagem**, **Tempo pendente** e **Tempo para expirar a Janela de 24h**), só **uma** automação ligada por gatilho vale para cada conversa — a primeira elegível pela ordem do nome (em sessões abertas pela API ou por integração, nos gatilhos que têm a caixa **Habilitar para sessões geradas por API ou Integração**, a primeira com a caixa marcada). As demais com o mesmo gatilho nunca disparam, mesmo com condições diferentes. Em **Tempo sem conversa ao criar contato**, também só a primeira automação ligada vale.
- **Condições avaliadas no disparo:** nos gatilhos de tempo, as condições são conferidas na hora de disparar, não quando a contagem começa. Se as condições da automação escolhida não baterem na hora do disparo, nada roda.
- **Cancelamento ao resolver ou desligar:** resolver a conversa para as contagens de tempo daquela conversa. Uma automação de tempo de conversa já agendada também é conferida na hora de disparar: se foi desligada ou excluída antes do disparo, não roda.
- **Desligar em Tempo sem conversa ao criar contato:** desligar ou excluir impede novos agendamentos, mas não cancela os contatos que já estavam aguardando: passados os minutos, a conversa desses contatos ainda é aberta e, se a automação só foi desligada (não excluída), as ações dela rodam.
- **Editar durante a contagem:** editar a automação não muda contagens de tempo de conversa já iniciadas; elas seguem com os minutos, as condições e as ações que valiam quando a contagem começou. A edição vale para as contagens seguintes.

## Sessões geradas por API ou integração

- **Caixa de opção:** **Habilitar para sessões geradas por API ou Integração** só existe em **Tempo sem nenhuma resposta do membro na sessão nova** e **Tempo sem nova mensagem** (não tem efeito nos outros gatilhos). Sem essa caixa marcada, esses dois gatilhos ignoram sessões abertas pela API ou por uma integração.
- **O que conta como sessão de API ou integração:** sessão aberta sem um membro, por envio pela API ou por integrações que enviam mensagens pela Kinbox. Essa marca fica na sessão e continua valendo mesmo depois que o contato responde.
- **Gatilhos de nova sessão:** sessões abertas sem membro (por API ou integração) não disparam **Nova conversa ou sessão** (só sessão aberta por mensagem do contato) nem **Nova conversa ou sessão iniciada pelo membro** (exige um membro). Os demais gatilhos de conversa (resolver, tag, atribuir, mover grupo etc.) disparam normalmente quando um membro faz a ação nessa sessão.

## Várias automações, ordem e limites

- **Não é retroativa:** automações só reagem a eventos ocorridos depois de salvas e ligadas. Uma automação nova já nasce com **Ativo** ligado.
- **Ordem e tolerância a falha:** há uma espera de cerca de 1 segundo antes de executar as ações. As ações rodam na ordem em que aparecem na tela; se uma ação falha, as seguintes continuam rodando.
- **Limite de 10 ações por evento (apenas fora dos gatilhos de tempo):** todas as automações ligadas do mesmo gatilho cujas condições batem rodam, ordenadas pelo nome da automação e depois pela ordem das ações. Apenas as **10 primeiras** ações das automações que ainda estão dentro do limite de execuções por sessão são executadas por evento: uma automação barrada pelo limite da sessão não consome esse teto, e se uma automação admitida passar do que falta para 10, só as primeiras ações dela rodam. Nos gatilhos de tempo não há esse teto de 10 ações por evento.
- **Limite de repetição:** cada automação roda no máximo **10 vezes** na mesma sessão num período de 1 dia — a contagem vale separadamente para cada automação (inclusive nos gatilhos de tempo e em **Ao membro ficar online**); se uma estourar, as outras que casaram no mesmo evento continuam rodando. Na 11ª tentativa, a automação para de rodar nessa sessão e grava na conversa a mensagem de sistema `"Limite de execução de automação atingido - <idAutomação>-<idSessão>"`. No gatilho **Mensagem recebida do cliente**, esse aviso aparece uma única vez por automação por sessão; nos outros gatilhos, pode se repetir a cada nova tentativa acima do limite.
- **Ações em cadeia:** ações executadas por automação não disparam **Mensagem recebida do cliente**, **Ao resolver uma conversa**, **Ao atribuir membro** (pelo caminho direto da conversa) nem **Ao mover grupo**. Já **Adicionar tag** feita por automação dispara **Ao adicionar tag**, e uma regra de atribuição automática chamada por automação pode disparar **Ao atribuir membro**.

## Condições: operadores por campo

Quando **Condições** está desligado (**Sem condições**), a automação roda sempre. Quando ligado, exige todas as linhas de "Quando **todas** as condições são verdadeiras" **e** pelo menos uma linha de "E quando **qualquer** das condições são verdadeiras" (quando ambos os blocos têm condições).

Uma condição com erro ou referenciando um campo personalizado que não existe mais pode fazer a automação nunca rodar.

Na lista de campos, **Estado**, **Origem da sessão**, **Janela de resposta** e os campos de origem de anúncio e UTM (`source_id`, `utm_source`, `utm_medium`, `utm_campaign`, `gclid`) aparecem desabilitados nas automações: só podem ser usados em condições de bot.

### Gatilhos de Conversa

| Grupo | Campo | Operadores aceitos |
| --- | --- | --- |
| **Contexto** | **Horário** | **está dentro de**, **está fora de** |
| **Contexto** | **Tag** *(só em **Ao adicionar tag**)* | **é igual a**, **não é igual a** |
| **Contexto** | **Texto da mensagem** *(só em **Mensagem recebida do cliente**)* | **contém**, **não contém**, **é igual a**, **não é igual a**, **começa com** |
| **Contato** | **Tipo de contato** (**Primeira conversa do canal**, **Já conversou no canal**, **Contato novo**, **Contato já cadastrado**) | **é igual a** |
| **Contato** | **Nome do contato**, **E-mail do contato** | **é igual a**, **não é igual a**, **contém**, **não contém**, **é vazio**, **não é vazio** |
| **Contato** | **Celular do contato** | **é igual a**, **não é igual a**, **contém**, **não contém**, **começa com** |
| **Contato** | **Negócios abertos do contato** | **é igual a**, **não é igual a**, **é maior que**, **é menor que** |
| **Contato** | Campos personalizados do contato | Conforme o tipo do campo (veja a tabela abaixo) |
| **Conversa/Sessão** | **Grupo**, **Atribuído**, **Campanha** | **é igual a**, **não é igual a**, **é vazio**, **não é vazio** |
| **Conversa/Sessão** | **Tags** | **contém**, **não contém** |
| **Conversa/Sessão** | **Tipo de canal**, **Canal**, **Ads** (**Google** / **Meta**) | **é igual a**, **não é igual a** |
| **Conversa/Sessão** | **Negócios abertos da conversa** | **é igual a**, **não é igual a**, **é maior que**, **é menor que** |
| **Conversa/Sessão** | **Minutos desde sessão criada** | **é maior que**, **é menor que** |
| **Conversa/Sessão** | **Avaliação de atendimento** | **é igual a**, **é maior que**, **é menor que** |
| **Conversa/Sessão** | Campos personalizados da sessão | Conforme o tipo do campo (veja a tabela abaixo) |

Regras da condição **Texto da mensagem** (exclusiva do gatilho **Mensagem recebida do cliente**):

- **Maiúsculas, acentos e espaços:** não diferencia maiúsculas de minúsculas, mas **diferencia acentos** (por exemplo, `boleto` não casa com `boléto` e `ação` não casa com `acao`). Espaços nas pontas do texto da mensagem e do valor configurado são aparados.
- **Valor vazio:** um valor vazio ou só com espaços nunca casa (inclusive em **não contém**).
- **Operadores:** **contém** e **não contém** comparam trecho do texto (não exigem palavra inteira); **é igual a** e **não é igual a** comparam o texto inteiro; **começa com** confere o início do texto. Não existem os operadores **é vazio** e **não é vazio** nessa condição.
- **Mídia sem legenda:** apenas o texto da mensagem ou da legenda entra na comparação; mídia sem legenda tem texto vazio, por isso avalia como verdadeira em **não contém** e **não é igual a**, e como falsa em **contém**, **é igual a** e **começa com**.

### Campos personalizados

Os campos personalizados de contato e de sessão aparecem nas condições com o nome cadastrado. Os operadores dependem do **Tipo de campo** ([Criar campos personalizados](/docs/configuracoes-no-workspace/campos-personalizados-no-kinbox)):

| Tipo de campo | Operadores aceitos |
| --- | --- |
| **Texto**, **Texto em área**, **Seleção Multipla** | **é igual a**, **não é igual a**, **contém**, **não contém**, **é vazio**, **não é vazio** |
| **Número**, **Decimal** | **é igual a**, **não é igual a**, **é maior que**, **é menor que**, **é vazio**, **não é vazio** |
| **Booleano** (valor **Sim** ou **Não**) | **é igual a**, **é vazio**, **não é vazio** |
| **Json** | **é igual a**, **não é igual a**, **é maior que**, **é menor que**, **é vazio**, **não é vazio**, **contém**, **não contém** |
| **Seleção**, **Data**, **Data e hora** | **é igual a**, **não é igual a**, **é vazio**, **não é vazio** |

### Gatilho de Membro (**Ao membro ficar online**)

| Grupo | Campo | Operadores aceitos |
| --- | --- | --- |
| **Contexto** | **Horário** | **está dentro de**, **está fora de** |
| **Membro** | **Grupo do membro** | **contém**, **não contém** |
| **Membro** | **Disponibilidade do membro** (**Disponível** / **Indisponível**) | **é igual a** |

### Gatilho de Contato (**Tempo sem conversa ao criar contato**)

Não possui condições (condições ligadas são ignoradas).

## Ações: campos e bordas

- **Onde cada ação aparece:** nos gatilhos de **Conversa**, a lista mostra todas as ações, inclusive **Atribuir conversas sem atendimento** e **Iniciar conversa**. **Ao membro ficar online** mostra só **Atribuir conversas sem atendimento** (e só nele existe a opção **Atribuir ao membro do gatilho**). **Tempo sem conversa ao criar contato** mostra só **Iniciar conversa**.
- **Enviar mensagem:** **Texto** obrigatório (`"Por favor escreva um texto."`); **Canal** opcional (`"Mesmo canal da conversa caso não setado."`). Sem **Canal**, envia na própria conversa. O seletor **Canal** lista WhatsApp e SMS, mas não lista os canais do WhatsApp oficial (API). Com **Canal** escolhido, a mensagem sai por esse canal para o número formado pelos dígitos do identificador do contato na conversa de origem, não para o telefone do cadastro do contato (verificado em ciclos de 30 segundos). Por isso o envio por outro canal só chega ao contato quando a conversa de origem é de WhatsApp ou SMS; em conversas de Instagram, Facebook, Telegram, e-mail ou chat do site, o identificador não é um telefone e a mensagem não chega. Para responder na própria conversa, deixe **Canal** vazio. Envia só texto (sem anexo nem template). No WhatsApp oficial fora da janela de 24 horas só sai template.
- **Chaves com os dados do contato (Enviar mensagem e Agendar mensagem):** no envio, as chaves entre chaves duplas são trocadas pelos dados do contato: `{{name}}` (nome), `{{first_name}}` (primeira palavra do nome), `{{last_name}}` (última palavra do nome), `{{email}}`, `{{phone}}`, `{{protocol}}` (protocolo da sessão) e a chave de cada campo personalizado de contato (`{{chave_do_campo}}`). Campos personalizados da sessão não entram. Cada chave é trocada só na primeira vez que aparece no texto, e uma chave sem dado no contato pode sair em branco ou ficar escrita como está — teste antes. É diferente das mensagens automáticas da tela **Geral**, em que só a **Mensagem ao resolver conversa** troca chaves ([Mensagens automáticas e regras da caixa de entrada](/docs/administracao/mensagens-automaticas)). As chaves seguem as das [frases rápidas](/docs/conversas/criar-frases-rapidas-para-suas-conversas), exceto os campos personalizados da sessão e as chaves de campo JSON (`{{json:…}}`).
- **Executar bot:** escolhe um bot e o inicia na conversa. Sem bot escolhido, nada acontece.
- **Atribuir:** opções **Atribuir usando uma atribuição automática** (**Atribuição automática**), **Desatribuir membro**, **Desatribuir grupo** e **Atribuir a um membro específico** (**Membro**). A regra escolhida em **Atribuição automática** roda mesmo se estiver desligada na lista de regras; mantê-la desligada evita que ela rode sozinha em toda sessão nova.
- **Mover para grupo:** opções **Mover para um grupo específico** (**Grupo**), **Atribuir ciclicamente a um grupo** (**Grupos participantes**, múltiplos) e **Atribuir a um grupo que o membro participa** (sem campo extra).
- **Adicionar tag:** adiciona uma ou mais tags à conversa e dispara **Ao adicionar tag**.
- **Resolver conversa:** resolve a sessão e para as contagens de tempo daquela conversa.
- **Reabrir conversa:** reabre a conversa.
- **Avaliar atendimento:** envia a pesquisa de satisfação do workspace (botão **Configurar**). Regras de quando a pesquisa não é enviada estão em [Pedir avaliação no fim do atendimento](/docs/atendimento/pesquisa-de-satisfacao).
- **Agendar mensagem:** **Para quando?** (**Próximo horário comercial** + **Horários**; **Depois de um tempo específico** + **Dias**/**Horas**/**Minutos**, cada um a partir de 0; ou **Próxima segunda-feira** … **Próximo domingo** + **Horário**, de 15 em 15 minutos e 23:59), **Canal** opcional (WhatsApp por QR Code), **Texto** obrigatório e **Não reabrir conversa** (evita reabrir a conversa no envio). Troca as mesmas chaves do contato de **Enviar mensagem**. Sai em ciclos de até 3 minutos, no fuso do workspace, só texto (sem anexo).
- **Agendar mensagem template:** **Para quando?** igual a **Agendar mensagem**, **Canal** obrigatório (só WhatsApp oficial) e **Modelo de mensagem**. O template sai pelo **canal da conversa** em que a automação rodou, não pelo **Canal** escolhido na ação — use em conversas do WhatsApp oficial em que o template está aprovado. Templates com mídia no cabeçalho não funcionam nesta ação ([Enviar um template aprovado](/docs/canais/whatsapp/whatsapp-templates/enviar-template)). Sai em ciclos de até 3 minutos, no fuso do workspace.
- **Agendar execução de bot:** **Para quando?** igual a **Agendar mensagem**, **Bot** obrigatório e **Não reabrir conversa**. Funciona apenas em conversas de WhatsApp e sai em ciclos de até 30 segundos, no fuso do workspace.
- **Criar negociação:** cria uma negociação no CRM com nome, valor, funil, etapa, responsável, grupo e tags ([Funis e negociações: visão geral](/docs/crm/visao-geral)).
- **Atualizar negociação:** altera campos das negociações da conversa.
- **Mudar etapa da negociação:** **Que negócios serão afetados** (**Negócio mais recente aberto da conversa** ou **Todos os negócios abertos da conversa**), **Funil de vendas** e **Etapa do funil**. Mudar a etapa por automação dispara as [cadências](/docs/crm/cadencias) da etapa.
- **Integração:** executa ações de apps conectados. No [HubSpot](/docs/integracoes/hubspot), aparecem quatro opções, mas **Mudar etapa do negócio no Hubspot** não altera a etapa; apenas **Atualizar responsável do negócio**, **Salvar mensagens no negócio do Hubspot** e **Salvar mensagens no contato do Hubspot** atuam. Ações de outros apps dependem do app conectado.
- **Atribuir conversas sem atendimento** *(gatilhos de **Conversa** e **Ao membro ficar online**)*: **Atribuir ao membro do gatilho** (opção que só existe em **Ao membro ficar online**) ou **Atribuir para o membro que tem menos atendimentos**, **Quantidade** e **Limite do membro**. Atribui conversas abertas sem responsável do workspace (não só a conversa do gatilho) e apenas a membros disponíveis.
- **Iniciar conversa** *(feita para **Tempo sem conversa ao criar contato**; também aparece nos gatilhos de **Conversa**)*: **Canal** obrigatório (WhatsApp), **Bot** opcional e **Texto** obrigatório (em canal de WhatsApp oficial, escolhe-se um template no lugar do texto; templates com mídia no cabeçalho não funcionam aqui). Não troca chaves `{{...}}`. Num gatilho de **Conversa**, envia o texto (ou o template) pelo **Canal** escolhido para o telefone do contato, numa conversa desse canal; contato sem telefone não recebe nada. Para responder na própria conversa, use **Enviar mensagem**.

## Mensagens que a automação deixa na conversa

- Atribuição/transferência: `"Conversa transferida por Automação {nome} para {destino}"` ou `"Conversa atribuída por Automação {nome}"`. Quando uma regra de atribuição automática chamada pela automação não encontra candidato, a mensagem começa com `"Automação [{regra}]: "`.
- Bot agendado por automação (ou iniciado em contato novo): `"Bot iniciado por Automação {nome}"`.
- Contato novo (**Iniciar conversa**): `"Automação iniciada"`.
- Resolver ou reabrir: exibe `"Automação"` no lugar do nome do membro.
- Limite de repetição atingido (10 execuções por automação por sessão em 1 dia): `"Limite de execução de automação atingido - <idAutomação>-<idSessão>"` (aparece uma única vez por automação por sessão em **Mensagem recebida do cliente**; nos outros gatilhos, pode se repetir).

## Diagnóstico

| Sintoma | Causa provável | O que fazer |
| --- | --- | --- |
| Contato novo teve a conversa aberta depois de desligar **Tempo sem conversa ao criar contato** | Desligar não cancela os contatos que já estavam aguardando | Comportamento esperado para contatos cadastrados antes de desligar |
| Não vê **Automações** em **Configurações** | Falta a permissão **Automações** (ou não é o proprietário) | Peça ao proprietário ou gestor de papéis para liberar **Automações** em **Gerenciamento do Ambiente** ([Referência de permissões](/docs/administracao/referencia-de-permissoes)) |
| A automação está criada, mas nunca roda | Está desligada (**Ativo** desmarcado) | Ligue o interruptor na lista **Automações** (use o filtro **Inativos**) |
| Não rodou em conversas que já estavam abertas | Automação não é retroativa | Teste em uma sessão nova criada depois de salvar e ligar |
| Não rodou mesmo com o evento acontecendo | Condições não bateram ("todas" × "qualquer"), condição com campo personalizado apagado, ou condições de gatilho de tempo não batiam na hora do disparo | Revise os dois blocos de **Condições**; teste com **Sem condições** |
| Segunda automação com o mesmo gatilho de tempo nunca dispara | Só **uma** automação ligada vale por gatilho de tempo (a primeira elegível pela ordem do nome), mesmo com condições diferentes | Deixe apenas uma automação ligada por gatilho de tempo e reúna as ações nela |
| Não rodou em conversa aberta pela API ou integração | **Habilitar para sessões geradas por API ou Integração** desmarcada (só existe em **Tempo sem nenhuma resposta do membro na sessão nova** e **Tempo sem nova mensagem**), ou gatilho de nova sessão (**Nova conversa ou sessão** / **… iniciada pelo membro**), que não dispara nessas sessões | Marque a caixa nesses dois gatilhos de tempo ou use um gatilho compatível |
| Não disparou quando o contato sumiu depois da resposta do membro | Usou **Tempo sem nenhuma resposta do membro na sessão nova** ou **Tempo pendente** (ambos param quando um membro responde e não contam em sessões iniciadas pelo membro) | Troque o gatilho para **Tempo sem nova mensagem** |
| Não disparou ao resolver uma sessão reaberta | Usou **Ao resolver uma conversa** (não roda em sessões reabertas) | Use **Ao resolver uma conversa reaberta** |
| **Tempo para expirar a Janela de 24h** não disparou | Canal não é WhatsApp oficial | Esse gatilho vale apenas para canais de WhatsApp oficial |
| Gatilho de tempo não disparou porque a conversa foi resolvida | Resolver a conversa interrompe as contagens de tempo daquela conversa | Comportamento esperado; confira se outra automação resolveu a conversa antes |
| Disparou alguns minutos depois do previsto | Os gatilhos de tempo podem atrasar até 3 minutos, e os envios agendados são verificados em ciclos (até 3 minutos em **Agendar mensagem** / **Agendar mensagem template**; 30 segundos em bot agendado e **Enviar mensagem** com **Canal**) | As duas esperas podem se somar quando um gatilho de tempo dispara uma ação agendada; não conte com disparo no segundo exato |
| **Enviar mensagem** não entregou no WhatsApp oficial | Fora da janela de 24 horas só sai template; o campo **Canal** também não lista os canais do WhatsApp oficial (API) | Use **Agendar mensagem template** em conversas do WhatsApp oficial ([Enviar um template aprovado](/docs/canais/whatsapp/whatsapp-templates/enviar-template)) |
| Aviso de inatividade não saiu no WhatsApp oficial, mas a conversa foi resolvida | Com 24 horas ou mais sem mensagem do contato, a janela de 24 horas já fechou e o texto não é entregue; a falha de uma ação não impede as seguintes (como **Resolver conversa**). **Agendar mensagem template** antes de resolver também não garante o aviso: sai em ciclo de até 3 minutos e pode chegar depois da resolução | Em canais sem janela (como WhatsApp por QR Code), o aviso de texto funciona; no WhatsApp oficial, o texto só é entregue com menos de 24 horas desde a última mensagem do contato ([Janela de 24 horas](/docs/canais/whatsapp/whatsapp-cloud-api/janela-de-24-horas)) |
| **Agendar mensagem template** falhou ou saiu no canal errado | O envio usa o canal da conversa (ignora o **Canal** escolhido) ou o template tem mídia no cabeçalho | Use em conversas do WhatsApp oficial onde o template está aprovado e sem mídia no cabeçalho |
| **Agendar execução de bot** não rodou | A conversa não é de WhatsApp | Essa ação só funciona em conversas de WhatsApp |
| **Avaliar atendimento** não enviou pesquisa | Regra da pesquisa de satisfação (ex.: sessão reaberta, já avaliada, sem mensagem do contato ou sem responsável) | Veja [Pedir avaliação no fim do atendimento](/docs/atendimento/pesquisa-de-satisfacao) |
| **Mensagem recebida do cliente** não disparou | A mensagem era de membro, digitada no celular do canal, de bot, nota interna, mensagem de sistema, enviada por automação ou mantida resolvida pelo copiloto; ou a automação acabou de ser criada ou religada (pode levar até 60 segundos para começar a rodar); ou **Texto da mensagem** não bateu (diferencia acentos) | Confira a origem da mensagem, aguarde até 60 segundos após criar ou religar e revise acentos e operadores na condição **Texto da mensagem** |
| Só parte das ações rodou | Uma ação falhou (item apagado) e as seguintes continuaram, ou o total de ações somadas no evento (fora dos gatilhos de tempo, contando só as automações ainda dentro do limite de 10 execuções por sessão) passou de 10 | Revise os campos de cada ação e mantenha até 10 ações por evento |
| Parou de rodar numa conversa com `"Limite de execução de automação atingido"` | Essa automação atingiu o limite de **10 execuções** na mesma sessão em 1 dia (cada automação tem sua própria contagem) | Revise se há automações que se disparam em cadeia (ex.: **Adicionar tag** com **Ao adicionar tag**) ou se a sessão recebeu mais de 10 mensagens do contato com o gatilho **Mensagem recebida do cliente** |
| **Mudar etapa do negócio no Hubspot** não fez nada | Essa opção do HubSpot na ação **Integração** não altera a etapa | Veja [Integrar com o HubSpot](/docs/integracoes/hubspot) |
| **Tempo sem conversa ao criar contato** não abriu conversa | O contato já tinha conversa em algum canal, ou há outra automação ligada com o mesmo gatilho (só a primeira vale) | Confira se o contato já tinha conversa e mantenha apenas uma automação ligada com esse gatilho |
