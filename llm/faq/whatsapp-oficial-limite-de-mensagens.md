---
title: Onde vejo o limite diário de conversas da Meta?
description: A Kinbox não mostra o limite diário de envios ou conversas da Meta para o número; consulte essa informação diretamente na Meta.
keywords: [limite diário, limite de mensagens, limite de conversas, tier meta, quantas mensagens posso enviar por dia, limite de disparo whatsapp oficial]
publico: llm
tipo: faq
fontes:
  - api-v0:server/controllers/WbaCloudController.js
  - api:src/modules/whatsapp-api/services/core/whatsapp-api-status-monitor.service.ts
  - web:src/pages/settings/channels/whatsappCloud/EditWhatsappCloud.tsx
codigo:
  - web:src/pages/settings/channels/whatsapp/embed/**
  - web:src/pages/settings/channels/whatsappCloud/**
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/inbox/Message.tsx
  - web:src/pages/inbox/ChatHeader/index.tsx
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/modules/meta/CloudApiClient.js
verificado_em: 2026-11-26
---

## Pergunta

Onde vejo o limite diário de conversas da Meta?

## Resposta

A Kinbox não mostra o limite diário de conversas nem o limite de envios definido pela Meta para o seu número do WhatsApp oficial.

O status **Conectado** na lista de canais também não reflete alterações de limite ou restrições da Meta. Para consultar o limite atual de envio do seu número, verifique diretamente na Meta. Veja mais em "Problemas ao conectar ou enviar pelo WhatsApp oficial".

## Variações

- quantos clientes posso chamar por dia no whatsapp oficial
- onde vejo meu limite de disparo na kinbox
- a kinbox mostra em qual nível de envio meu número está na meta
- como saber se atingi o limite diário do whatsapp oficial
- onde aparece o limite de conversas iniciadas pela empresa
