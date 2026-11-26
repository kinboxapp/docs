---
title: Como reconecto o Instagram ou o Facebook?
description: Não existe botão de reconectar; exclua o canal e conecte a mesma página novamente em Novo canal para o canal voltar com as conversas.
keywords: [reconectar instagram, reconectar facebook, canal desconectado, página desativada, necessita ser reconectado, excluir e conectar de novo]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/channels/facebook/AddMetaChannel.tsx
  - web:src/pages/settings/channels/instagram/EditInstagram.tsx
  - web:src/pages/settings/channels/facebook/EditFacebook.tsx
  - api-v0:server/controllers/IntegrationsController.js
codigo:
  - web:src/pages/settings/channels/facebook/**
  - web:src/pages/settings/channels/instagram/**
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/inbox/Message.tsx
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/controllers/KinboxDirectController.js
  - api-v0:server/controllers/MessengerController.js
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/modules/scheduler/facebookScheduler.js
  - api-v0:server/modules/accessRestriction/**
verificado_em: 2026-11-26
---

## Pergunta

Como reconecto o Instagram ou o Facebook?

## Resposta

Não existe um botão de reconectar para os canais de Instagram e de Facebook na Kinbox, e a página já conectada aparece desativada na lista de conexão. Reconecte o canal se ele ficar **Desconectado** ou, no Instagram, se uma mensagem falhar com o aviso de que o canal precisa ser reconectado.

Antes de começar:

- Confirme na Meta que a conta do Facebook que você vai usar ainda tem acesso à mesma página.
- Abra o canal e anote os grupos marcados em **Restringir visibilidade**, porque a lista de grupos volta vazia.

Para reconectar:

1. Em **Configurações** → **Chat** → **Canais**, abra o menu de três pontos do canal e clique em **Excluir**.
2. Clique em **Novo canal**, escolha **Instagram** ou **Facebook** e conecte a mesma página.
3. Abra o canal, selecione de novo os grupos em **Restringir visibilidade** e clique em **Salvar**.
4. Mande uma mensagem de teste a partir de outra conta e confira se ela chega na **Caixa de entrada**.

O mesmo canal volta ativo e **Conectado**, com as conversas antigas (excluir não apaga as conversas). Se a nova conexão falhar depois de excluir, as conversas continuam guardadas e você pode tentar de novo. No Instagram, a conexão passa pela checagem do plano, mas o canal excluído não entra na contagem.

Se a página estiver ativa em outro workspace ("Esse canal já está ativado em outro ambiente"), é preciso excluir o canal lá e conectar neste; o histórico de conversas continua no workspace de origem.

Quem pode: o proprietário do workspace ou membros com a permissão **Gerenciar Canais**. Se **Excluir** ou **Novo canal** não aparecer para você, peça a uma dessas pessoas.

Veja mais em [O Instagram ou o Facebook não conecta ou desconectou](/docs/canais/instagram/problemas-comuns).

## Variações

- meu instagram desconectou na kinbox como reconectar
- onde fica o botão de reconectar do facebook messenger
- a página do facebook aparece apagada na hora de reconectar
- se eu excluir o canal de instagram para reconectar perco as conversas
- a mensagem do instagram deu erro pedindo para reconectar o canal
- canal do instagram desconectado não consigo clicar na página de novo
