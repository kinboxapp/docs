---
title: Preciso contratar um provedor (BSP) para usar o WhatsApp oficial?
description: Não. Você conecta o WhatsApp oficial direto na Kinbox pela janela da Meta, sem precisar de outro provedor (BSP) no meio.
keywords: [bsp, provedor oficial, intermediário meta, contratar provedor whatsapp oficial, conexão direta meta, precisa de bsp]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/channels/whatsapp/embed/AddWhatsappEmbedded.tsx
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/modules/meta/CloudApiClient.js
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

Preciso contratar um provedor (BSP) para usar o WhatsApp oficial?

## Resposta

Não. A conexão do WhatsApp oficial é feita diretamente na Kinbox, pela janela da Meta, sem outro provedor no meio.

Ao concluir a janela da Meta, a Kinbox recebe acesso direto à sua conta do WhatsApp Business. Para conectar, você precisa de uma conta do Facebook com acesso à empresa na Meta, da permissão **Gerenciar Canais** na Kinbox e de um canal de WhatsApp livre no plano. Veja mais em [Antes de conectar o WhatsApp oficial](/docs/canais/requisitos-para-se-ter-uma-api-oficial).

## Variações

- preciso pagar um bsp além da kinbox para ter whatsapp oficial
- a kinbox conecta direto na meta ou precisa de intermediário
- tenho que contratar outro fornecedor de api do whatsapp para usar na kinbox
- dá para ligar o whatsapp oficial sem provedor terceiro
- preciso de conta em algum bsp para integrar o whatsapp oficial
