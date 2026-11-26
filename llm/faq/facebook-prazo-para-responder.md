---
title: Até quando posso responder uma mensagem do Messenger?
description: A Kinbox não limita nem mostra prazo para responder no Messenger ou no Instagram; quem define o prazo é a Meta.
keywords: [prazo messenger, janela do messenger, até quando responder facebook, etiqueta atendimento humano, human agent, prazo responder instagram, mensagem com erro messenger]
publico: llm
tipo: faq
fontes:
  - web:src/pages/inbox/Chat/index.tsx
  - web:src/components-old/inbox/NewMessageModal/index.tsx
  - api-v0:server/controllers/MessengerController.js
  - api-v0:server/modules/chat/auxiliary/sendMessageToClient.js
codigo:
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/channels/facebook/**
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/controllers/MessengerController.js
  - api-v0:server/routes/IntegrationsApiRoutes.js
  - api-v0:server/routes/MessengerApiRoutes.js
  - api-v0:server/modules/accessRestriction/**
verificado_em: 2026-11-26
---

## Pergunta

Até quando posso responder uma mensagem do Messenger?

## Resposta

A Kinbox não limita nem mostra prazo para responder no Facebook Messenger (nem no Instagram): o editor fica sempre liberado, sem contador, e quem define o prazo é a Meta.

As mensagens enviadas por membros saem com a etiqueta de atendimento humano da Meta; mensagens enviadas sem membro (como o [bot](/docs/bot/visao-geral)) saem sem essa etiqueta. Se a Meta recusar o envio (por exemplo, por ter passado do prazo dela), a mensagem fica com ícone de erro, o motivo devolvido pela Meta aparece ao passar o mouse e, no Messenger, também surge um aviso na tela.

Não dá para iniciar uma conversa nova pelo Messenger nem pelo Instagram na Kinbox: a conversa só começa quando o contato escreve ([Iniciar uma conversa com um contato](/docs/conversas/iniciar-conversa)). Diferente do WhatsApp oficial, onde existe contador na conversa e a necessidade de template quando a janela fecha (veja [Janela de 24 horas: quando é preciso usar um template](/docs/canais/whatsapp/whatsapp-cloud-api/janela-de-24-horas)).

Veja mais em [Conectar o Facebook Messenger](/docs/canais/facebook/conectar).

## Variações

- qual é o prazo para responder no facebook messenger pela kinbox
- o messenger tem janela igual ao whatsapp oficial na kinbox
- por que minha mensagem no messenger ficou com erro depois de alguns dias
- a kinbox trava o campo de resposta no instagram ou no facebook
- consigo mandar a primeira mensagem para um contato pelo messenger
- quanto tempo depois posso responder uma dm do instagram na kinbox
