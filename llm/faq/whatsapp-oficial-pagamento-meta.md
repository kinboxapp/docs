---
title: Pago as mensagens da Meta pela Kinbox?
description: Não. A Kinbox não intermedia o pagamento das mensagens da Meta; a cobrança acontece direto na sua conta do WhatsApp na Meta.
keywords: [pagar meta pela kinbox, boleto meta kinbox, fatura whatsapp oficial, forma de pagamento meta, pagar mensagens na kinbox, cobrança separada]
publico: llm
tipo: faq
fontes:
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/modules/meta/CloudApiClient.js
  - web:src/components/whatsappCall/RequestCallPermissionModal.tsx
codigo:
  - web:src/pages/settings/channels/AddChannelWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/embed/**
  - web:src/pages/settings/channels/whatsappCloud/**
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/modules/meta/CloudApiClient.js
  - api-v0:server/controllers/NewPaymentController.js
  - web:src/components/whatsappCall/RequestCallPermissionModal.tsx
verificado_em: 2026-11-26
---

## Pergunta

Pago as mensagens da Meta pela Kinbox?

## Resposta

Não. A Kinbox não intermedia nem cobra o pagamento das mensagens do WhatsApp oficial: a cobrança é feita pela Meta, direto na sua conta do WhatsApp.

A forma de pagamento das mensagens precisa ser cadastrada diretamente na Meta. Na Kinbox, não existe cobrança de mensagens nem de templates do WhatsApp oficial. Veja mais em [Antes de conectar o WhatsApp oficial](/docs/canais/requisitos-para-se-ter-uma-api-oficial).

## Variações

- a fatura da kinbox já inclui as mensagens da meta
- posso pagar as conversas do whatsapp oficial junto com a mensalidade da kinbox
- a kinbox repassa a cobrança da meta para mim
- onde cadastro o pagamento das mensagens da api oficial
- preciso pagar a meta separado da kinbox
- tem como colocar crédito na kinbox para pagar templates da meta
