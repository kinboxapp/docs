---
title: Quanto custa cada mensagem no WhatsApp oficial, quem cobra e onde pago?
description: Quem cobra pelas mensagens do WhatsApp oficial é a Meta, direto na conta do WhatsApp; a Kinbox não cobra mensagens nem templates e não mostra estimativa de custo.
keywords: [preço mensagem whatsapp oficial, custo template, quanto custa whatsapp oficial, cobrança meta, carteira kinbox, valor por mensagem, plano whatsapp, pagar meta pela kinbox, boleto meta, fatura whatsapp oficial, forma de pagamento meta, cobrança separada]
publico: llm
tipo: faq
fontes:
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/modules/meta/CloudApiClient.js
  - web:src/components/whatsappCall/RequestCallPermissionModal.tsx
  - web:src/pages/settings/channels/whatsappCloud/WhatsappCallingChannelSettings.tsx
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

Quanto custa cada mensagem no WhatsApp oficial, quem cobra e onde pago?

## Resposta

Quem cobra pelas mensagens e templates do WhatsApp oficial é a Meta, direto na sua conta do WhatsApp; a Kinbox não cobra mensagens nem templates e não desconta esses envios do saldo da carteira (veja [Saldo da carteira e créditos: o que consome](/docs/conceitos/saldo-e-creditos)).

A Kinbox não intermedia esse pagamento: a forma de pagamento das mensagens é cadastrada direto na Meta, e a fatura da Kinbox não inclui mensagens nem templates. Também não dá para colocar saldo na carteira da Kinbox para pagar a Meta.

A Kinbox também não exibe preços nem estimativa de custo por mensagem ou campanha: os valores seguem as regras da própria Meta. Na Kinbox, o canal oficial ocupa um dos canais de WhatsApp do seu plano (todos os canais de WhatsApp ativos, oficiais e por QR Code, entram na mesma contagem). Já as ligações pelo WhatsApp oficial têm cobrança própria na carteira da Kinbox. Veja mais em [Antes de conectar o WhatsApp oficial](/docs/canais/requisitos-para-se-ter-uma-api-oficial).

## Variações

- qual o valor de cada mensagem na api oficial do whatsapp
- a kinbox cobra por template enviado no whatsapp oficial
- quem faz a cobrança das mensagens do whatsapp oficial
- consigo ver na kinbox quanto vou gastar num disparo oficial
- mensagem do whatsapp oficial desconta do saldo da kinbox
- quanto pago por disparo na api oficial
- pago as mensagens da meta pela kinbox
- a fatura da kinbox já inclui as mensagens da meta
- posso pagar as conversas do whatsapp oficial junto com a mensalidade da kinbox
- a kinbox repassa a cobrança da meta para mim
- onde cadastro o pagamento das mensagens da api oficial
- preciso pagar a meta separado da kinbox
- tem como colocar crédito na kinbox para pagar templates da meta
