---
title: Como consigo o selo verde de conta verificada?
description: A Kinbox não solicita nem concede o selo verde da Meta, e conectar o WhatsApp oficial não dá esse selo; o pedido precisa ser feito diretamente à Meta.
keywords: [selo verde, conta verificada, conta comercial oficial, selo de verificação whatsapp, tique verde, verificado whatsapp oficial]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/settings/channels/whatsapp/embed/AddWhatsappEmbedded.tsx
  - api-v0:server/controllers/WbaCloudController.js
codigo:
  - web:src/pages/settings/channels/AddChannelWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/embed/**
  - web:src/pages/settings/channels/whatsappCloud/**
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/modules/meta/CloudApiClient.js
  - api-v0:server/controllers/NewPaymentController.js
verificado_em: 2026-11-26
---

## Pergunta

Como consigo o selo verde de conta verificada?

## Resposta

A Kinbox não solicita nem exibe o selo verde de conta verificada da Meta, e conectar um número pelo WhatsApp oficial não concede esse selo.

O ícone "WhatsApp Oficial" que aparece na lista de canais da Kinbox existe apenas para identificar o tipo do canal dentro da Kinbox. Para pedir o selo de conta verificada, é preciso fazer a solicitação diretamente à Meta. Veja mais em [Antes de conectar o WhatsApp oficial](/docs/canais/requisitos-para-se-ter-uma-api-oficial).

## Variações

- conectei a api oficial mas não ganhei o selo verde
- a kinbox pede o selo verificado do whatsapp para minha empresa
- como colocar o selo verde do lado do nome no whatsapp
- o ícone de selo na lista de canais quer dizer que meu número é verificado na meta
- preciso ativar alguma opção na kinbox para ter o selo verde
