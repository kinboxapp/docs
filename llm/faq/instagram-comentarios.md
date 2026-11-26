---
title: Os comentários dos posts do Instagram entram como conversa?
description: Não. A Kinbox não traz comentários de posts, reels ou anúncios do Instagram nem do Facebook; entram apenas mensagens, respostas a stories e menções em stories.
keywords: [comentários instagram, comentários facebook, comentário em post, comentário em reel, comentário em anúncio, direct, responder comentários na kinbox]
publico: llm
tipo: faq
fontes:
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/controllers/KinboxDirectController.js
  - api-v0:server/controllers/MessengerController.js
codigo:
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/controllers/KinboxDirectController.js
  - api-v0:server/controllers/MessengerController.js
  - web:src/pages/inbox/MessageContent.tsx
  - web:src/pages/settings/channels/instagram/**
verificado_em: 2026-11-26
---

## Pergunta

Os comentários dos posts do Instagram entram como conversa?

## Resposta

Não. A Kinbox não traz comentários de posts, reels ou anúncios do Instagram, e o mesmo vale para comentários em posts de páginas do Facebook.

O que entra na **Caixa de entrada** são as mensagens do Direct (e do Messenger, no Facebook) e, no Instagram, respostas aos seus stories e menções em stories — desde que **Ignorar resposta de story** e **Ignorar menções** não estejam ligados nas configurações do canal ([Configurações do Instagram e do Facebook](/docs/canais/instagram/configuracoes)).

Para responder comentários, use diretamente o Instagram ou o Facebook. Veja mais em [Conectar o Instagram](/docs/canais/instagram).

## Variações

- consigo responder comentários do instagram pela kinbox
- comentário em publicação do instagram vira conversa na caixa de entrada
- comentários de reels e anúncios chegam na kinbox
- a kinbox puxa comentários da página do facebook
- por que os comentários dos meus posts não aparecem no atendimento
- existe integração de comentários do instagram na kinbox
