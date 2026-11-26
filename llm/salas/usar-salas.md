---
title: "Salas: arquivos por envio, busca, fixar, salvar e silenciar"
description: Regras e limites das Salas da Kinbox — quem pode criar e gerenciar salas, quem vê salas privadas e mensagens diretas, arquivos por envio, reações, menções, threads, edição e exclusão, busca, fixadas, salvos, silenciar, avisos e auditoria.
keywords: [limite de arquivos na sala, quantos arquivos posso mandar, reações por mensagem, limite de reações, busca nas salas, mínimo de letras busca, quem pode excluir mensagem da sala, editar mensagem da sala, fixar mensagem, mensagens salvas, silenciar sala, aviso de menção, proprietário vê sala privada, mensagem direta privada, auditoria de mensagens diretas, formatação negrito sala, atalhos das salas, não pode acessar as salas]
publico: llm
tipo: referencia
fontes:
  - web:src/components/rooms/RoomComposer.tsx
  - web:src/components/rooms/RoomMessageItem.tsx
  - web:src/components/rooms/RoomPanels.tsx
  - web:src/components/rooms/rooms.helpers.ts
  - web:src/components/rooms/useRoomMenu.tsx
  - web:src/components/rooms/RoomAuditView.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
  - api:src/modules/rooms/rooms.service.ts
  - api:src/modules/rooms/rooms.dto.ts
  - api:src/modules/push-notifications/mobile-push.policy.ts
codigo:
  - web:src/components/rooms/**
  - api:src/modules/rooms/**
  - api-v0:server/routes/rooms/**
  - api-v0:server/controllers/RoomController.js
  - mobile:src/app/(tabs)/rooms/**
verificado_em: 2026-11-26
---

## Onde fica, modos de abrir e atalhos

- **Acesso:** botão **Salas** (ícone **@**) no topo da tela, à direita (não existe item no menu lateral nem em **Configurações**). Mostra número amarelo com o total de não lidas (`99+` a partir de 100); salas silenciadas não entram na conta.
- **Busca do topo:** **Pesquisar** (`Ctrl+K` / `⌘K`, descrita em [Caixa de entrada: visão geral](/docs/conversas/caixa-de-entrada-do-kinbox)) exibe os grupos **Salas** e **Mensagens Diretas** para quem tem acesso às salas e abre direto na sala ou pessoa escolhida.
- **Modos de exibição (computador):** alternados pelo botão no topo da lista — na lateral em tela maior (padrão; dica "Abrir as salas em uma janela menor") ou em janela menor presa ao botão **Salas** (dica "Abrir as salas na lateral, em tela maior"). No navegador do celular, exibe uma coluna por vez. Ao abrir sem sala escolhida, abre a primeira sala da lista.
- **Colunas e lista:** lista à esquerda (busca "Ir para sala ou pessoa…" sem diferenciar acento ou maiúscula; atalhos **Menções**, **Salvos** e **Auditoria**, que somem enquanto há texto na busca; seções recolhíveis **Salas** e **Mensagens diretas**, com estado salvo no navegador), sala no centro e painel auxiliar à direita (**Membros**, **Mensagens fixadas**, busca ou **Thread**). Em telas largas, **Membros** abre sozinho até ser fechado pelo **X**.
- **Sinais na lista:** nome em negrito e contagem para não lidas (`99+` a partir de 100); **#** para sala pública e cadeado para sala privada; sino cortado e nome esmaecido para sala silenciada; lápis ("Rascunho") para texto não enviado (salvo por sala no navegador).
- **Atalhos de teclado:**
  - `Alt`+`↑` / `Alt`+`↓`: navega para a sala ou pessoa anterior/seguinte na lista (telas grandes).
  - `Alt`+`Shift`+`↑` / `Alt`+`Shift`+`↓`: pula para a próxima sala ou pessoa com mensagens não lidas.
  - Busca da lista ("Ir para sala ou pessoa…"): `Esc` limpa e `Enter` abre o primeiro resultado.
  - Campo de mensagem: `Enter` envia (no navegador do celular, quebra linha); `Shift`+`Enter` quebra linha; `↑` com o campo vazio abre a edição da sua última mensagem.
  - Formatação com texto selecionado: `Ctrl`/`⌘`+`B` (negrito), `Ctrl`/`⌘`+`I` (itálico), `Ctrl`/`⌘`+`Shift`+`X` (riscado).
  - Edição de mensagem: `Enter` salva, `Shift`+`Enter` quebra linha, `Esc` cancela ("Esc para cancelar · Enter para salvar").
  - Lista **Mencionar** (`@`) e citação: `Esc` fecha ou cancela; em **Mencionar**, setas + `Enter` ou `Tab` selecionam.

## Quem pode

| Ação | Condição |
| --- | --- |
| Usar as salas e receber avisos delas | Todo membro sem a restrição **Não pode acessar as salas** (quadro **Restrições** da seção **Outros**). O proprietário nunca é bloqueado |
| Ver e enviar mensagens diretas para qualquer colega | Acesso às salas e ausência da restrição **Só pode ver membros que sejam dos seus grupos nos DMs.** (quadro **Restrições** da seção **Outros**; com ela, só colegas com algum grupo em comum). O proprietário não sofre a restrição |
| Criar, editar, clonar, ordenar e excluir salas; adicionar pessoas em sala privada | Permissão **Salas** (seção **Gerenciamento do Ambiente**) ou proprietário. Os papéis prontos **Atendente** e acima trazem essa permissão. A ordem das salas vale para todo o workspace |
| Mandar mensagem, reagir, responder, fixar/desafixar, salvar e buscar | Qualquer membro com acesso à sala (não depende da permissão **Salas**) |
| Editar mensagem | Apenas o autor da mensagem, e apenas mensagens de texto (sem prazo) |
| Excluir mensagem | O autor (próprias mensagens) ou o proprietário (qualquer mensagem). A permissão **Salas** não permite excluir mensagens de outros membros |
| Auditar mensagens diretas | Permissão **Auditar mensagens diretas** (seção **Outros**) ou proprietário, além de acesso às salas. Nenhum papel pronto traz essa permissão |

- Com **Não pode acessar as salas**: o botão **Salas** e os grupos da busca somem, avisos, sons e push são bloqueados, e o app exibe "Sem acesso às salas" — "Seu perfil não permite acessar o chat do time neste workspace.".
- Sem a permissão **Salas**: **Criar sala**, **Editar sala**, **Clonar**, **Excluir sala** e **Adicionar pessoas** não aparecem, e **Mover para cima** / **Mover para baixo** ficam apagados (no app, **Nova sala** some e a tela de edição exibe "Seu perfil não permite criar ou editar salas neste workspace.").

## Quem vê o quê

- **Sala pública:** todos os membros do workspace que têm acesso às salas. O painel **Membros** exibe "Sala pública: todos do workspace".
- **Sala privada:** apenas os membros escolhidos em **Membros** (uma sala privada precisa ter pelo menos um membro; na criação, o criador já vem marcado e não pode se remover) e o **proprietário**, que vê todas as salas do workspace, inclusive as privadas de que não participa.
- **Mensagem direta:** aparece na lista apenas das duas pessoas. Mensagens diretas de outros membros não aparecem na lista nem na busca **Todas as salas** do proprietário. A tela exibe "Este é o início da sua conversa com {{name}}. Só vocês dois veem estas mensagens.", mas o proprietário e quem tem **Auditar mensagens diretas** podem lê-la em modo somente leitura pela **Auditoria**, exceto as que envolvem o proprietário.
- **Sala Geral:** todo workspace novo nasce com a sala pública **Geral**, que é uma sala comum e pode ser editada ou excluída por quem tem a permissão **Salas** ou pelo proprietário.
- **Cliente:** nunca vê nada das salas nem das mensagens diretas; nada é enviado por canal, bot ou agente de IA. Para notas internas dentro de uma conversa com contato, veja [Atender uma conversa: responder, notas, resolver e reabrir](/docs/conversas/gerenciar-conversas).
- **Nota de avaliação pública:** se **Nota de avaliação pública** estiver ligada em **Configurações** → **Ambiente** → **Geral**, o painel **Membros** exibe a nota com estrela ao lado de cada membro (veja [Pedir avaliação no fim do atendimento](/docs/atendimento/pesquisa-de-satisfacao)).

## Mensagens: limites, formatação e ações

- **Arquivos:** até **10 arquivos por envio** (passando disso: "Envie no máximo 10 arquivos"). Cada arquivo vira uma mensagem separada, e o texto digitado vai em uma mensagem própria. Aceita clipe **Anexar arquivo**, colar no campo ou arrastar para a sala ("Solte para enviar").
- **Áudio:** gravação pelo microfone **Gravar áudio** apenas fora de threads.
- **Limite de texto:** até **10.000 caracteres** na edição de mensagens e nas respostas de thread.
- **Formatação e emojis:** `*negrito*` ou `**negrito**`, `_itálico_`, `~riscado~`, `` `código` ``, bloco entre ```` ``` ````, citação com `>` no começo da linha; links ficam clicáveis. Mensagem composta apenas por emojis (até 6) aparece grande. Digitar `:` e duas letras sugere até 8 emojis.
- **Indicador de digitação:** mostra "{{name}} está digitando", "{{a}} e {{b}} estão digitando" ou "Várias pessoas estão digitando" abaixo da sala.
- **Falha no envio:** mensagem que falhou fica marcada como "Erro ao enviar" com o link **Tentar novamente** (para texto). Em mensagem direta, falha no primeiro envio mostra "Erro ao enviar DM" e devolve o texto ao campo. As ações ficam indisponíveis em mensagens ainda enviando ou com erro.
- **Menções (`@`):** abre **Mencionar** com até 8 membros ativos que já aceitaram o convite. Menciona uma pessoa por vez (não existe menção coletiva). Se o papel tiver a restrição **Somente pode atribuir para quem pertence ao grupo do membro** (seção **Conversas**), a lista do **@** mostra apenas colegas que têm algum grupo em comum com você.
- **Reações:** até **30 emojis diferentes por mensagem** (ao atingir: "Limite de reações da mensagem atingido"). Passar o mouse mostra "{{names}} reagiu com {{emoji}}"; clicar de novo no mesmo emoji remove a reação.
- **Responder citando:** o campo mostra "Respondendo" com nome e início da mensagem; clicar na citação leva à original. Se a original foi excluída, mostra "Mensagem original não encontrada".
- **Thread:** respostas ficam agrupadas no painel **Thread** (não aparecem soltas na sala e não há opção de enviar também na sala). Responder a uma resposta continua na mesma thread. Carrega até **500 respostas**.
- **Editar:** marca a mensagem com "(editado)". Mensagens de erro: "Não foi possível editar a mensagem", "Só o autor pode editar a mensagem", "Só mensagens de texto podem ser editadas".
- **Excluir:** confirmação "Tem certeza que deseja excluir essa mensagem?" (com thread, inclui "As respostas da thread também serão excluídas.") e aviso "Mensagem removida". A exclusão é definitiva, remove para todos e retira dos **Salvos** de todos.
- **Copiar texto:** mostra "Copiado"; em mensagem de arquivo, copia a descrição curta (por exemplo, "📷 Imagem").
- **Fixar na sala:** mostra "Mensagem fixada na sala" ou "Mensagem desafixada", exibe o selo **Fixada** com quem fixou e funciona também em mensagens diretas. O painel **Mensagens fixadas** lista até **100** mensagens (mais recentes primeiro) e exibe "Nada fixado ainda" quando vazio.
- **Salvar para depois:** privado de cada membro; mostra "Mensagem salva. Veja em Salvos". O painel **Salvos** lista até **200** mensagens ("Nada salvo ainda" quando vazio). Se a mensagem for excluída ou o membro perder acesso à sala, ela sai dos salvos.

## Mensagens diretas, Menções, Salvos e busca

- **Mensagens diretas:** passam a existir no primeiro envio; não é possível mandar mensagem direta para si mesmo; listam os colegas que já aceitaram o convite (membros inativos aparecem esmaecidos); topo exibe "Online", "Online · Indisponível" ou "Offline"; "Visto" aparece abaixo da última mensagem lida (exclusivo de mensagem direta). Sem painel **Membros** nem menu **⋮** no computador. Se um colega for removido do workspace, a conversa continua e aparece como "Mensagem direta".
- **Menções:** reúne mensagens de todas as salas, 30 por vez com **Carregar mais** (mensagens que você mesmo escreveu não entram; vazio: "Nenhuma menção por aqui"). Clicar leva à mensagem e abre a thread, se for resposta.
- **Buscar mensagens:** painel **Buscar mensagens** (lupa no topo), campo "Buscar por texto…", escopo **Nesta sala** (**Nesta conversa** em mensagem direta) ou **Todas as salas** (inclui suas mensagens diretas, nunca as dos outros; inclui respostas de threads). Exige entre **2 e 100 caracteres** ("Digite pelo menos 2 letras para buscar." / "A busca precisa ter entre 2 e 100 caracteres"), não diferencia maiúsculas, busca apenas no texto (não por autor nem arquivo), retorna até **30 resultados** e exibe "Nenhuma mensagem encontrada" quando não há resultado.

## Não lidas, silenciar e avisos

- **Leitura:** abrir a sala marca como lida (ou **Marcar como lida** no menu da sala). Primeira abertura exibe a linha vermelha **Novas**; ao ler mensagens antigas, aparece o botão de novas mensagens / "Ir para o fim". Separadores "Hoje" e "Ontem"; mensagens antigas carregam ao rolar.
- **Silenciar:** por pessoa. Aviso "Sala silenciada: você só será notificado quando for mencionado" / "Notificações da sala ativadas". Não soma no botão **Salas**, fica esmaecida com sino cortado na lista e mostra "Sala silenciada" no topo. Mensagem direta não tem menu para silenciar no computador (no app, segurar a linha exibe **Silenciar**).
- **Avisos no navegador (Kinbox aberta):** ao chegar mensagem de outra pessoa, avisa se for mensagem direta, sala não silenciada ou sala silenciada que menciona você. Com o painel **Salas** fechado: aviso no canto por 5 segundos com autor, início do texto e sala (clicar abre a sala). Com o painel aberto em outra sala: apenas som. Com a própria sala aberta: nada, e a mensagem já conta como lida. O som segue **Quando receber mensagem de time** em **Configurações** → **Notificações** (ligada por padrão).
- **Avisos em thread:** resposta em thread avisa quem foi mencionado, quem participa da thread e o autor da mensagem original, mesmo em sala silenciada, se a pessoa não estiver com aquela thread aberta.
- **Push (navegador fechado e celular):** a opção **Mensagem de time** (no app: **Mensagens diretas e menções**) envia push apenas quando mencionam você em uma sala ou mandam uma mensagem direta; mensagens comuns de sala sem menção não geram push. No app, salas silenciadas não geram push ("Salas silenciadas não geram alertas."). Veja [Receber notificações no navegador e no celular](/docs/conta/notificacoes).

## Auditoria de mensagens diretas

- Disponível para o proprietário e quem tem **Auditar mensagens diretas** (seção **Outros**), pelo item **Auditoria** da lista. Modo somente leitura: sem campo de envio, sem ações nas mensagens, sem mudar leitura e sem avisar os membros.
- Mensagens diretas que envolvem o proprietário ficam de fora (ele não aparece em **Escolha um membro** e conversas com ele não são listadas).
- Lista apenas conversas com pelo menos uma mensagem (vazio: "{{name}} não tem mensagens diretas"); colega que saiu aparece como "Membro removido". Carrega até **500 respostas** por thread.
- Mensagens de erro: "Não foi possível carregar as mensagens diretas", "Não foi possível carregar a thread", "Mensagem direta não encontrada".
- Passo a passo em [Auditar as mensagens diretas dos membros](/docs/salas/auditar-mensagens-diretas).

## No celular

- O app da Kinbox para celular tem a aba **Salas** (entre **Conversas** e **Agenda**) com o mesmo conteúdo do computador.
- Algumas ações só existem no computador (não estão disponíveis no app): reagir, responder em thread, editar mensagem, fixar, salvar, buscar mensagens dentro da sala, listas **Menções** e **Salvos**, **Auditoria** e a lista **@** para mencionar (menções feitas no computador aparecem destacadas no app).

Veja os guias completos em [Salas: o chat interno da equipe](/docs/salas/visao-geral), [Conversar nas salas: mensagens diretas, menções e threads](/docs/salas/usar-salas) e [Auditar as mensagens diretas dos membros](/docs/salas/auditar-mensagens-diretas).
