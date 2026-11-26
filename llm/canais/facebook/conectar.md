---
title: "Messenger: páginas na conexão, teste grátis, prazo para responder, envio e reconexão"
description: Regras do canal de Facebook Messenger na Kinbox, com o prazo para responder, a etiqueta de atendimento humano, os limites no teste grátis, os erros e o que entra e sai nas conversas.
keywords: [messenger, facebook, prazo para responder, janela do messenger, etiqueta de atendimento humano, human agent, mensagem não enviada, teste grátis, seu plano atual não permite adicionar o novo canal]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/channels/facebook/AddMetaChannel.tsx
  - web:src/pages/settings/channels/AddChannel.tsx
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/controllers/MessengerController.js
  - api-v0:server/modules/accessRestriction/funcionalitiesAccess.js
codigo:
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/channels/facebook/**
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/controllers/MessengerController.js
  - api-v0:server/routes/IntegrationsApiRoutes.js
  - api-v0:server/routes/MessengerApiRoutes.js
  - api-v0:server/modules/accessRestriction/**
  - api-v0:server/modules/scheduler/facebookScheduler.js
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/inbox/Message.tsx
  - web:src/pages/inbox/MessageDrop.tsx
  - api-v0:server/modules/chat/auxiliary/sendMessageToClient.js
verificado_em: 2026-11-26
---

Detalhes de referência da página humana [Conectar o Facebook Messenger](/docs/canais/facebook/conectar).

## Prazo para responder e etiqueta de atendimento humano

- A Kinbox não mostra contador nem bloqueia a resposta por prazo no Facebook Messenger. A Meta ainda pode recusar o envio.
- As mensagens enviadas por membros saem com a etiqueta de atendimento humano da Meta (`HUMAN_AGENT`). Mensagens enviadas sem membro (como o [bot](/docs/bot/visao-geral)) saem sem essa etiqueta.
- O prazo para responder é definido pela Meta.
- Se a Meta recusar a mensagem, ela fica com ícone de erro, o motivo devolvido pela Meta aparece ao passar o mouse precedido de `"#2 Error:"` (sem motivo específico, exibe `"Erro ao enviar mensagem"`) e o erro também aparece como aviso na tela.

## Lista de páginas e permissões da Meta

- Na conexão do Facebook, a lista exibe todas as páginas liberadas na janela da Meta, com nome e foto (no máximo 99 páginas). Ao passar o mouse, aparece o ID da página.
- Se nenhuma página for liberada, a tela exibe `"Não encontramos nenhuma página com as permissões necessárias."` e o botão **Tentar novamente**.
- Uma página que já é canal ativo deste workspace aparece desativada e não pode ser clicada, mesmo que esteja **Desconectado**.
- Uma página que já é canal ativo em outro workspace é recusada com `"Esse canal já está ativado em outro ambiente"` ("ambiente" significa workspace).
- Na janela da Meta (em português), a Kinbox pede acesso para listar as páginas, enviar e receber mensagens da página, gerenciar os dados da página e acessar a empresa (`pages_show_list`, `pages_messaging`, `pages_manage_metadata` e `business_management`).
- Se a janela da Meta for fechada antes do fim ou o login falhar, nenhum canal é criado e nenhum aviso aparece na Kinbox.

## Plano e teste grátis

| Situação do workspace | Regra para páginas do Facebook |
| --- | --- |
| Assinatura paga atual | Sem limite de páginas do Facebook. |
| Teste grátis | Permite conectar **1** página do Facebook ativa por workspace. Ao tentar conectar uma segunda, aparece `"Seu plano atual não permite adicionar o novo canal"`. |
| Assinatura paga atual ou teste grátis vencidos, a partir do quarto dia depois do vencimento, ou workspace sem assinatura ativa | A conexão é recusada com `"Sua assinatura expirou"`. |
| Assinatura antiga paga | Até 50 páginas do Facebook. |

## O que entra do Messenger

- Entram textos, fotos, vídeos, áudios e arquivos enviados à página pelo Messenger.
- Cada anexo vira uma mensagem separada na conversa, e a Kinbox guarda uma cópia do arquivo recebido.
- O nome e a foto do contato são buscados no perfil da Meta a cada mensagem.
- Comentários em posts da página, reações a mensagens e cliques em anúncios sem mensagem não entram na Kinbox.
- Respostas que a empresa manda direto pelo Facebook (fora da Kinbox) não aparecem na conversa da Kinbox.

## Envio de mensagens

- **Texto:** enviado normalmente.
- **Foto e arquivo (documento):** enviados como anexo.
- **Áudio:** convertido e enviado como áudio; o editor tem o botão **Áudio** para gravar.
- **Vídeo:** chega ao contato como link.
- **Responder (citar) mensagem:** não existe no Messenger.
- **Iniciar conversa:** não dá para iniciar uma conversa nova pelo Messenger na Kinbox; a conversa começa quando o contato escreve ([Iniciar uma conversa com um contato](/docs/conversas/iniciar-conversa)).
- **Erros de canal ao enviar:** a mensagem que não sai fica com o ícone de erro; passe o mouse para ver o motivo, quando houver (sem motivo, aparece `"Erro ao enviar mensagem"`, por exemplo quando o canal está sem acesso salvo). Quando a Meta recusa o envio, inclusive por perda de acesso à página, a mensagem fica com erro e mostra o motivo devolvido pela Meta; o canal não muda de status por causa desse erro (no Facebook, só a renovação automática do acesso deixa o canal **Desconectado**).

## Renovação do acesso, desconexão e reconexão

- A Kinbox renova o acesso à página automaticamente. Se a Meta não renovar o acesso, o canal fica **Desconectado**.
- A dica do selo **Desconectado** diz `"Seu canal está desconectado. Verifique sua conexão de internet."`, mas no Facebook a causa é a perda de acesso na Meta.
- Não existe botão de reconectar, e a página já conectada fica desativada na lista. Para reconectar, é necessário **Excluir** o canal e conectar a mesma página de novo em **Novo canal**: o mesmo canal volta ativo e **Conectado**, com o mesmo ID e as conversas antigas (excluir não apaga conversas). Ao voltar, a lista de grupos de **Restringir visibilidade** fica vazia e precisa ser conferida.
- Excluir e adicionar canais exige a permissão **Gerenciar Canais** ([Referência de permissões](/docs/administracao/referencia-de-permissoes)) ou ser o proprietário do workspace, sem a restrição **Somente pode dar manutenção simples em canais** (que oculta **Novo canal** e **Excluir**). Veja [O Instagram ou o Facebook não conecta ou desconectou](/docs/canais/instagram/problemas-comuns).
