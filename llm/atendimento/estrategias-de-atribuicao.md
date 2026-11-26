---
title: "Atribuição automática: quando a regra roda, cada estratégia em detalhe, disponibilidade e mensagens"
description: Referência da atribuição automática da Kinbox com quando a regra roda, o que cada estratégia faz e quando não atribui, as regras de DDD, CEP e transbordo, as mensagens de sistema e a matriz de diagnóstico.
keywords: [atribuição automática detalhes, regra não atribui, nenhum operador ou grupo disponível, conversa transferida por, regra inativa no bot, só uma regra roda, convidado recebe conversa, transbordo vazio, ddd do contato, campo cep, primeiro contato no canal, contato existente no canal, menos atendimentos]
publico: llm
tipo: referencia
fontes:
  - api-v0:server/services/AssignmentService.js
  - api-v0:server/controllers/AssignmentController.js
  - api-v0:server/modules/chat/auxiliary/sendMessageByClient.js
  - api-v0:server/services/OperatorWorkspaceService.js
  - api-v0:server/mongodb/services/SessionSummaryService.js
  - web:src/pages/settings/assignmentRules/EditAssignmentRule.tsx
codigo:
  - api-v0:server/services/AssignmentService.js
  - api-v0:server/controllers/AssignmentController.js
  - api-v0:server/auxiliary/AssignmentEnum.js
  - api-v0:server/modules/chat/auxiliary/sendMessageByClient.js
  - api-v0:server/services/OperatorWorkspaceService.js
  - api-v0:server/mongodb/services/SessionSummaryService.js
  - api-v0:server/services/GeoLocationService.js
  - web:src/pages/settings/assignmentRules/**
verificado_em: 2026-11-26
---

Referência complementar de [Distribuir as conversas automaticamente](/docs/configuracoes-no-workspace/criar-atribuicoes-automaticas), [Estratégias de atribuição automática](/docs/atendimento/estrategias-de-atribuicao) e [As conversas não chegam para mim ou para a equipe](/docs/atendimento/problemas-comuns).

## Quando a regra roda

- **Quem pode gerenciar a tela:** o proprietário ou quem tem a opção **Atribuição automática** ("Ver, adicionar, editar e excluir atribuição automáticas.") na seção **Gerenciamento do Ambiente** do papel (na tela, **Permissão**), em **Configurações** → **Automação** → **Atribuição automática** (no workspace, chamado na tela de **ambiente**).
- **Regra nova nasce desligada:** ao criar ou clonar uma regra, ela fica desligada na lista; é necessário ligar o interruptor para que passe a rodar automaticamente nas sessões novas.
- **Disparo automático em sessão nova:** toda mensagem que abre uma **sessão nova** aplica uma regra ligada, em qualquer canal (WhatsApp por QR Code, WhatsApp oficial, Instagram, Messenger, Telegram, e-mail, chat do site, SMS e canal customizado), inclusive em grupos de WhatsApp e quando a sessão é aberta por uma mensagem enviada do próprio celular.
- **Quando não roda automaticamente:** não roda ao reabrir uma sessão anterior, em mensagens de uma sessão já aberta nem quando uma conversa é iniciada por um membro pela Kinbox.
- **Campo Regra:**
  - **Todos:** vale para toda sessão nova.
  - **Primeiro contato no canal:** vale para sessão nova em uma conversa (aquele contato naquele canal) que nunca foi resolvida.
  - **Contato existente no canal:** vale para sessão nova em uma conversa que já foi resolvida pelo menos uma vez.
- **Apenas uma regra ligada por sessão nova:** quando mais de uma regra ligada atende à mesma situação (por exemplo, duas com **Todos**, ou uma com **Todos** e outra com **Primeiro contato no canal**), apenas uma é aplicada, sem ordem definida nem prioridade. Deixe ligada apenas uma regra para cada situação.
- **Bot ativo não impede a atribuição:** a regra ligada roda mesmo quando um bot é iniciado na sessão nova.
- **Chamada direta (mesmo desligada):** o bot (bloco **Atendimento**, em [Blocos do bot](/docs/bot/blocos-do-bot)), as automações, os agentes de IA (ação **Transferir**, em [Ações do fluxograma](/docs/agente-de-ia/acoes-do-fluxograma)), os cenários e a API aplicam uma regra mesmo que ela esteja desligada na lista. Se a regra foi criada só para um desses fluxos, mantê-la desligada evita que ela rode sozinha em toda sessão nova.

## Tabela completa das estratégias

As mensagens da coluna **Sem candidato** são as da regra que roda sozinha ou pelo bot. Quando a regra é chamada por uma ação de automação, veja "Depois de escolher e mensagens de sistema".

Nas estratégias de "menos atendimentos", **atendimentos** significa o número de sessões abertas atuais em que o membro é o responsável, contado na hora (sem filtro de período). Na Kinbox, **grupo** é uma equipe de membros (não um grupo de WhatsApp).

| Opção no seletor (e rótulo na lista, se diferente) | Campos pedidos | Quem pode receber | Como escolhe | Sem candidato |
| --- | --- | --- | --- | --- |
| **Atribuir para um membro** | **Membro** (obrigatório) | O membro escolhido, sem conferir ativo, disponível ou online | Fixo | Sempre atribui |
| **Atribuir para um grupo** | **Grupo** (obrigatório) | O grupo escolhido (só grupo) | Fixo | Sempre atribui |
| **Atribuir a um grupo que o membro participa** | Nenhum | O primeiro grupo do membro que já é responsável pela sessão aberta (só grupo) | Primeiro da lista de grupos do membro | Sessão sem responsável, ou responsável que não está em nenhum grupo: não atribui; mostra `"{regra}: Nenhum operador ou grupo disponível [1]"` |
| **Atribuir ciclicamente para um membro** | Nenhum | Membros disponíveis do workspace inteiro (inclusive convidados que ainda não entraram) | Rodízio compartilhado por todas as regras desse tipo; ordem dentro da rodada não é definida; quando todos já receberam, a rodada recomeça | Não atribui; mostra `"{regra}: Nenhum operador ou grupo disponível [1]"` |
| **Atribuir ciclicamente para um grupo** | **Grupos participantes** (vazio = todos os grupos) | Grupos da lista (só grupo), sem olhar membros | Rodízio pela ordem da lista, com ponteiro próprio por regra | Sem grupos no workspace: não atribui; mostra `"{regra}: Nenhum operador ou grupo disponível [1]"` |
| **Atribuir ciclicamente para um membro de um grupo** | **Grupo** (obrigatório) | Membros disponíveis do grupo (grava só o membro; o grupo não é gravado na conversa) | Rodízio por ordem fixa dos membros, com ponteiro próprio por regra | Não atribui; mostra `"{regra}: Nenhum operador ou grupo disponível [1]"` |
| **Atribuir ciclicamente para um membro online de um grupo** | **Grupo** (obrigatório) | Membros online do grupo (grava só o membro) | Rodízio por ordem fixa dos membros, com ponteiro próprio por regra | Não atribui; mostra `"{regra}: Nenhum operador ou grupo disponível [1]"` |
| **Atribuir ciclicamente entre membros de grupos** | **Grupo** múltiplo (vazio = todos os grupos) | Membros disponíveis do grupo da vez (só membro) | Avança para o próximo grupo da lista a cada conversa (avança mesmo sem atribuir) e faz rodízio entre os membros disponíveis desse grupo | Ninguém disponível no workspace: mostra `"{regra}: Nenhum operador ou grupo disponível [1]"`. Há membros disponíveis, mas nenhum no grupo da vez: não tenta outro grupo e mostra `"{regra}: Nenhum operador disponível para o grupo [{grupo}]"` |
| **Atribuir ciclicamente entre membros online de grupos** | **Grupo** múltiplo (vazio = todos os grupos) | Membros online de qualquer grupo da lista, juntos (só membro) | Escolhe quem recebeu menos conversas por esta regra hoje (contador zera à meia-noite), com sorteio em empate; não alterna entre grupos | Ninguém online no workspace: mostra `"{regra}: Nenhum operador ou grupo disponível [1]"`. Há gente online, mas fora dos grupos da lista: `"Atribuição [{regra}]: Nenhum operador disponível para o grupo"`. Workspace sem grupos: `"Atribuição [{regra}]: Nenhum grupo disponível"` |
| **Atribuir para o membro que tem menos atendimentos** | Nenhum | Membros disponíveis do workspace (só membro) | Menos atendimentos abertos na hora; quem tem zero vem primeiro | Ninguém disponível: não atribui; mostra `"{regra}: Nenhum operador ou grupo disponível [2]"` |
| **Atribuir para membro que tem menos atendimentos no grupo** | **Grupo** (obrigatório) | Membros disponíveis do grupo (só membro) | Menos atendimentos abertos naquele grupo na hora | Ninguém disponível: não atribui; mostra `"{regra}: Nenhum operador ou grupo disponível [2]"` |
| **Atribuir para membro que tem menos e está online** *(na lista: Atribuir para o membro que tem menos atendimentos e está online)* | Nenhum | Membros online do workspace (só membro) | Menos atendimentos abertos na hora | Não atribui; mostra `"{regra}: Nenhum operador ou grupo disponível [1]"` |
| **Atribuir para o último membro que atendeu a conversa** *(só com **Regra** = **Contato existente no canal**)* | **Membro precisa estar disponível** | Último membro responsável da sessão mais recente desta conversa que teve responsável (pode ser a sessão atual) | Último responsável registrado no histórico da sessão | Com a caixa marcada e o membro inativo ou indisponível (ou sem membro anterior): não atribui e mostra `"{regra}: Nenhum operador ou grupo disponível [1]"`; sem a caixa: atribui mesmo indisponível ou inativo |
| **Atribuir para o último grupo que atendeu a conversa** *(só com **Regra** = **Contato existente no canal**)* | Nenhum | Grupo da sessão mais recente desta conversa que teve grupo (só grupo) | Último grupo registrado | Sem grupo anterior: não atribui; mostra `"{regra}: Nenhum operador ou grupo disponível [1]"` |
| **Atribuir para grupo mais próximo do CEP** | **Grupos participantes** (vazio = todos), **Distância máxima em km** (obrigatório) | Grupos com CEP cadastrado (só grupo) | Menor distância entre o CEP do contato e o CEP do grupo, dentro da distância máxima | Contato sem o campo `cep`: não atribui e não mostra mensagem. Nenhum grupo dentro da distância: não atribui; mostra `"{regra}: Nenhum operador ou grupo disponível [1]"` |
| **Atribui ao grupo com mesmo DDD que o cliente** | **Grupos participantes** (vazio = todos os grupos; veja "DDD, estado, CEP e transbordo") | Grupos com o mesmo DDD (só grupo), sem olhar membros | Rodízio entre os grupos compatíveis, com ponteiro por regra e por DDD | Nenhum grupo compatível: não atribui; mostra `"{regra}: Nenhum operador ou grupo disponível [1]"` |
| **Atribui ao grupo com mesmo DDD que o cliente com transbordo** | **Grupos participantes** (vazio = todos os grupos; veja "DDD, estado, CEP e transbordo"), **Grupos de transbordo** | Grupos do mesmo DDD com pelo menos um membro ativo, disponível e online (só grupo) | Grupo com menos conversas desta regra num período de 24 horas para aquele DDD, com sorteio em empate | Passa para **Grupos de transbordo**; quando eles também acabam, não atribui e não mostra mensagem (o ciclo do contato recomeça) |
| **Atribui ao grupo com mesmo estado que o cliente com transbordo** *(na lista: Atribui ao grupo do mesmo estado que o cliente com transbordo)* | **Grupos participantes** (vazio = todos os grupos; veja "DDD, estado, CEP e transbordo"), **Grupos de transbordo** | Grupos cujo DDD pertence ao mesmo estado (UF) do contato, com pelo menos um membro ativo, disponível e online (só grupo) | Grupo com menos conversas desta regra num período de 24 horas para aquele estado, com sorteio em empate | Passa para **Grupos de transbordo**; quando eles também acabam, não atribui e não mostra mensagem (o ciclo do contato recomeça) |
| **Distribuição cíclica entre grupos com transbordo** | **Grupos participantes** (vazio = todos), **Grupos de transbordo** | Grupos da lista com pelo menos um membro online (só grupo) | Grupo com menos conversas desta regra num período de 24 horas, com sorteio em empate | Passa para **Grupos de transbordo**; quando eles também acabam, não atribui e não mostra mensagem (o ciclo do contato recomeça) |
| **Atribuir para último membro que atendeu ao contato** | **Membro precisa estar disponível**, **Excluir canais** | Último membro responsável da sessão mais recente do contato em qualquer canal, exceto os excluídos; exige membro **Ativo** | Último responsável registrado | Membro inativo, indisponível com a caixa marcada, ou contato sem atendimento anterior: não atribui; mostra `"{regra}: Nenhum operador ou grupo disponível [1]"` |

## Disponibilidade, online e o que não é avaliado

- **Disponível:** membro **Ativo** com o interruptor **Disponível** ligado (veja [Ficar disponível ou indisponível](/docs/conta/disponibilidade)).
- **Online:** membro disponível e com a Kinbox aberta e conectada em tempo real (navegador ou aplicativo).
- **Quais regras exigem disponibilidade:** as que escolhem um membro entre vários — as de rodízio de membro e as de "menos atendimentos" — só escolhem membros disponíveis, e as opções "online" exigem membro online. As de último membro exigem membro disponível só quando **Membro precisa estar disponível** está marcado. As três opções com transbordo só escolhem grupo com pelo menos um membro ativo, disponível e online.
- **Quais regras não escolhem entre membros disponíveis:** **Atribuir para um membro** atribui mesmo a quem está indisponível. As opções que escolhem só grupo (inclusive as três com transbordo) não escolhem responsável: o responsável atual continua se faz parte do grupo escolhido e sai se não faz. As de último membro com **Membro precisa estar disponível** desmarcado atribuem mesmo a indisponível (em **Atribuir para último membro que atendeu ao contato**, o membro precisa estar sempre **Ativo**).
- **Texto de ajuda na edição:** **Atribuir para membro que tem menos e está online** mostra na tela `"Essa regra só funciona para membros que estiverem disponíveis."`, mas exige também que o membro esteja online.
- **Quem pode ser escolhido:** a atribuição automática pode escolher um membro que ainda não aceitou o convite, que está fora do horário do papel ou que não enxerga a conversa (pelo papel ou por **Restringir visibilidade** no canal). Confira os membros dos grupos usados nas regras.
- **Convidados pendentes:** um membro convidado que ainda não entrou nasce **Ativo** e **Disponível**, portanto pode receber conversas nas regras cíclicas e de "menos atendimentos" que não exigem online. Para evitar isso, desligue **Disponível** do convidado em [Gerenciar membros](/docs/configuracoes-no-workspace/gerenciar-membros) (**Editar membro**) até ele entrar, ou use uma estratégia "online".

## DDD, estado, CEP e transbordo

- **DDD e estado (UF) do contato:** extraídos do 3º e 4º dígitos do identificador do contato (assumindo número com código do país de 2 dígitos, como `55` em `+55 11 90000-0001`). Números sem código de 2 dígitos ou canais sem telefone (Instagram, e-mail etc.) geram DDD incorreto. O estado (UF) é derivado do DDD.
- **DDD e CEP do grupo:** cadastrados no grupo (DDD com 2 dígitos; CEP com 8 dígitos). Se esses campos não aparecerem na tela de [Criar grupos de atendimento](/docs/configuracoes-no-workspace/criar-e-gerenciar-grupos), fale com o suporte.
- **Grupos participantes vazio nas regras de DDD/UF:** inclui todos os grupos do workspace, inclusive grupos sem DDD cadastrado. Com grupos selecionados na lista, entram apenas os da lista com o DDD/UF correspondente.
- **CEP do contato:** lido do campo personalizado de contato com a chave `cep` e comparado dentro de **Distância máxima em km**.
- **Transbordo:** vale para as três estratégias "com transbordo" (que gravam apenas grupo, nunca membro). Para cada combinação de conversa e regra, os grupos que já receberam aquele contato são guardados por 3 dias e evitados nas tentativas seguintes. A cada execução, a Kinbox tenta um grupo principal com pelo menos um membro online, escolhendo quem recebeu menos conversas desta regra num período de 24 horas (contador compartilhado que expira 24 horas depois da última vez que um grupo entrou nele pela primeira vez; empate sorteado). Quando os grupos principais acabam ou nenhum tem membro online, passa para os **Grupos de transbordo**; quando esses também acabam, a conversa não é atribuída e o ciclo do contato recomeça.
- **Grupos de transbordo vazio:** significa **nenhum transbordo**, embora o campo mostre o placeholder "Todos os grupos".
- **Excluir canais vazio** (em **Atribuir para último membro que atendeu ao contato**): o campo mostra "Todos os canais", mas não exclui nenhum canal.

## Depois de escolher e mensagens de sistema

- **Ajuste entre grupo e responsável:** se a regra escolher um **membro** e a conversa estiver em um grupo do qual ele não participa, a conversa sai desse grupo. Se escolher um **grupo** e o responsável atual não participar dele, a conversa fica sem responsável.
- **Primeira mensagem de sessão nova e mensagens automáticas:** quando uma regra ligada atribui um membro na sessão nova, o responsável já fica preenchido nessa primeira mensagem — por isso **Mensagem quando fora do horário comercial** ou **Mensagem quando membro indisponível** já podem ser disparadas nela (se configuradas). Se a regra atribuir apenas grupo (ou não atribuir), essas mensagens não saem nessa primeira mensagem.
- **Mensagem de sucesso na conversa:** `"Conversa transferida por [{regra}] para [{membro ou grupo}]"`. Pela ação de uma automação: `"Conversa transferida por Automação {nome da automação} para {membro ou grupo}"`.
- **Mensagens de falha na conversa:** quando nenhum candidato atende à regra, a conversa recebe a mensagem de sistema correspondente (listada na coluna **Sem candidato** da tabela acima), como `"{regra}: Nenhum operador ou grupo disponível [1]"`, `"{regra}: Nenhum operador ou grupo disponível [2]"`, `"{regra}: Nenhum operador disponível para o grupo [{grupo}]"`, `"Atribuição [{regra}]: Nenhum operador disponível para o grupo"` ou `"Atribuição [{regra}]: Nenhum grupo disponível"`. A mensagem [1] aparece também quando uma regra que escolhe grupo (CEP, DDD, último grupo, grupo do membro, cíclica de grupo) não acha grupo. Quando a regra é chamada por uma automação, o começo da mensagem é `"Automação [{regra}]: "`. Duas situações não mostram mensagem: contato sem o campo `cep` nas regras de CEP e o fim do ciclo nas regras com transbordo.
- **Mensagens quando a regra é chamada por uma automação:** o começo `{regra}: ` ou `Atribuição [{regra}]: ` vira `Automação [{regra}]: ` (por exemplo, `"Automação [{regra}]: Nenhum operador ou grupo disponível [1]"`). Na cíclica entre membros online de grupos, com gente online mas fora dos grupos, a mensagem é `"Automação [{regra}]: Nenhum operador disponível"`. Nos casos em que a regra não mostra mensagem (contato sem o campo `cep`, fim do ciclo de transbordo), a ação de automação mostra `"Conversa atribuída por Automação {nome da automação}"`.
- **Responsável que já existe:** se a sessão já tem responsável (por exemplo, quando o bot ou uma automação chamam a regra) e a regra não acha candidato, a regra não faz nova atribuição e o responsável continua; se a sessão ainda não tem responsável, continua sem.

## Mensagens da tela de grupos

- Validações de DDD e CEP, quando os campos aparecem: `"DDD inválido"`, `"CEP inválido"`, `"CEP não encontrado"`.
- Ao criar um grupo com nome repetido: `"Já existe um grupo com esse nome, por favor escolha outro."` (ao editar para um nome repetido não há bloqueio).

## Mensagens da tela de cadastro

- **Validações do formulário:** `"Por favor digite um nome para a atribuição."`, `"Por favor escolha uma regra."` (também aparece quando falta escolher **Atribuir para**), `"Por favor escolha um membro."`, `"Por favor escolha um grupo."`, `"Escolha a distância máxima em km."`.
- **Salvamento:** `"Atribuição Automática criado."` (ao criar) e `"Atribuição Automática salvo."` (ao editar).
- **Fechar sem salvar:** `"Fechar sem salvar?"` / `"Você vai perder as alterações se não salvar primeiro."` / **Prosseguir**.
- **Clonar e excluir:** clonar abre o formulário com `"Cópia de {nome}"` (nasce desligada). Excluir pede `"Tem certeza que deseja excluir essa atribuição automática?"` e exibe `"Excluído."`.

## O que não existe

- **SLA de conversa:** a Kinbox não controla prazo máximo de resposta com alerta ou estouro em conversas (existe apenas "Prazo de SLA" em negociações).
- **Limite de conversas por membro ou fila com tempo máximo:** não há teto de conversas por membro; as estratégias de "menos atendimentos" apenas ordenam pela contagem atual de sessões abertas.
- **Responsável fixo por contato (carteira):** o contato não possui campo de responsável fixo. O contorno é usar **Atribuir para último membro que atendeu ao contato** (opcionalmente com **Membro precisa estar disponível** desmarcado).

## Matriz: as conversas não chegam

| Se… | Causa provável | Como resolver |
| --- | --- | --- |
| Nenhuma conversa nova é atribuída após criar a regra | A regra está desligada (toda regra nova ou clonada nasce desligada) | Em **Configurações** → **Automação** → **Atribuição automática**, filtre por **Ativos** e ligue o interruptor da regra ([Distribuir as conversas automaticamente](/docs/configuracoes-no-workspace/criar-atribuicoes-automaticas)) |
| A regra está ligada, mas não roda para contatos recorrentes ou para novos contatos | O campo **Regra** não cobre o caso (**Primeiro contato no canal** só vale para conversa nunca resolvida; **Contato existente no canal**, só para conversa já resolvida) | Altere **Regra** para **Todos** ou crie outra regra para o outro caso |
| A conversa não tem a faixa **Nova sessão** ou foi iniciada pela equipe | A regra ligada só roda em sessão nova aberta por mensagem recebida no canal (do contato ou enviada do próprio celular); não roda ao reabrir nem em conversa iniciada por um membro pela Kinbox | Atribua manualmente em [Atribuir, mover para um grupo ou transferir uma conversa](/docs/conversas/atribuir-e-transferir) |
| Há mais de uma regra ligada para o mesmo tipo de contato e a errada roda | Apenas uma regra ligada é usada por sessão nova, sem ordem definida | Deixe ligada apenas uma regra por situação do campo **Regra** |
| A conversa mostra uma mensagem de "Nenhum operador ou grupo disponível" e não muda de responsável | Ninguém está **Disponível** (ou **online**) entre os elegíveis ou no grupo da regra. A mensagem [1] também aparece quando uma regra que escolhe grupo (CEP, DDD, último grupo) não acha grupo | Ligue **Disponível** ([Ficar disponível ou indisponível](/docs/conta/disponibilidade)), confira os membros em [Criar grupos de atendimento](/docs/configuracoes-no-workspace/criar-e-gerenciar-grupos) ou troque para uma estratégia sem "online" |
| Membro sai da distribuição sozinho durante o dia | **Tornar indisponível se inativo.** em **Geral** ou **Limitar horário que pode ficar disponível** no papel | Ajuste o tempo de inatividade nas configurações gerais ou o horário do papel ([Ficar disponível ou indisponível](/docs/conta/disponibilidade)) |
| A conversa tem selo de grupo, mas ficou sem responsável | A estratégia escolhe apenas grupo, ou o grupo escolhido não contém o responsável anterior | Use uma estratégia que escolha membro, como **Atribuir ciclicamente para um membro de um grupo** ([Estratégias de atribuição automática](/docs/atendimento/estrategias-de-atribuicao)) |
| Membro indisponível recebeu conversa automática ou continuou responsável | Regra fixa (**Atribuir para um membro**), regra de último membro sem **Membro precisa estar disponível** marcado, ou regra só de grupo (mantém o responsável atual, mesmo indisponível, se ele faz parte do grupo) | Troque a estratégia ou marque **Membro precisa estar disponível** |
| Um único membro recebe todas as conversas (ou um convidado recebe) | Regra fixa (**Atribuir para um membro**), só esse membro disponível/online, ou convidados pendentes ainda com **Disponível** ligado | Use estratégia cíclica ou de "menos atendimentos" com mais membros disponíveis e desligue **Disponível** de quem não está atendendo em [Gerenciar membros](/docs/configuracoes-no-workspace/gerenciar-membros) |
| Regras por DDD ou estado não atribuem | Nenhum grupo da lista tem o DDD ou o estado do telefone do contato (com **Grupos participantes** vazio, grupos sem DDD também servem, inclusive para canais sem telefone); nas com transbordo, nenhum grupo com membro ativo, disponível e online | Revise o DDD dos grupos e a lista de **Grupos participantes** em [Estratégias de atribuição automática](/docs/atendimento/estrategias-de-atribuicao); se os campos de DDD não aparecerem na tela do grupo, fale com o suporte |
| A regra por CEP não atribui | Contato sem o campo personalizado `cep` preenchido, grupos sem CEP ou nenhum grupo dentro de **Distância máxima em km** | Preencha o campo `cep` do contato e o CEP dos grupos, ou aumente a distância |
| A atribuição mudou durante o fluxo do bot ou do agente de IA | A regra ligada roda mesmo com bot ativo, e um bloco **Atendimento** do bot ou a ação **Transferir** do agente pode chamar outra regra (mesmo desligada) | Revise o bloco **Atendimento** em [Blocos do bot](/docs/bot/blocos-do-bot) ou a ação **Transferir** em [Ações do fluxograma](/docs/agente-de-ia/acoes-do-fluxograma) |
| A conversa foi atribuída, mas o membro não a vê na lista | A conversa pode ser atribuída a um membro que não a enxerga: confira **Acesso as Conversas** no papel e **Restringir visibilidade** no canal | Consulte [Não consigo responder ou ver uma conversa](/docs/conversas/problemas-comuns) e [O convite não chegou ou o membro não consegue entrar](/docs/administracao/problemas-com-membros) |
| A mensagem de fora do horário ou de membro indisponível não sai | **Horário comercial** não escolhido em **Geral** ou conversa sem membro responsável | Escolha o **Horário comercial** em **Geral** ([Definir os horários de atendimento](/docs/configuracoes-no-workspace/criar-e-gerenciar-horarios)); para responder também conversas sem responsável, use um bot: no campo **Horários** do bot, escolha um horário cujas faixas cubram o período **fora** do expediente (o bot só começa dentro das faixas escolhidas; não vale com **Atende todos os canais**), ou use o bloco **Decisão** com a condição **Horário** → **está fora de** num bot que possa começar nesse período |
| A conversa chega, mas o membro não recebe aviso | Configuração de notificações (o push não depende de **Disponível**) | Revise [Receber notificações no navegador e no celular](/docs/conta/notificacoes) |
