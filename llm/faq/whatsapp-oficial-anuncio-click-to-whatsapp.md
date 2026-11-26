---
title: Conversas que vêm de anúncio no WhatsApp são gratuitas?
description: A Kinbox não mostra se uma conversa vinda de anúncio é gratuita ou cobrada pela Meta; na conversa aparece um cartão com o anúncio de origem e a janela de 24 horas vale normalmente.
keywords: [anúncio whatsapp, click to whatsapp, ctwa, conversa de anúncio grátis, tráfego pago whatsapp oficial, cartão de anúncio, cobrança anúncio meta]
publico: llm
tipo: faq
fontes:
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/modules/chat/auxiliary/parser.js
  - web:src/pages/inbox/MessageContent.tsx
codigo:
  - web:src/pages/inbox/Chat/index.tsx
  - web:src/pages/inbox/ChatHeader/index.tsx
  - web:src/components-old/inbox/ScheduleMessageModal/**
  - web:src/components-old/inbox/NewMessageModal/**
  - web:src/components-old/forms/ConditionsInput/index.tsx
  - api-v0:server/modules/chat/auxiliary/sendMessageByClient.js
  - api-v0:server/modules/conditionProcessor.js
  - api-v0:server/controllers/CallController.js
verificado_em: 2026-11-26
---

## Pergunta

Conversas que vêm de anúncio no WhatsApp são gratuitas?

## Resposta

A Kinbox não mostra se uma conversa vinda de anúncio foi gratuita ou cobrada pela Meta, porque a cobrança e os preços das mensagens ficam na Meta e não aparecem na Kinbox.

Quando um contato inicia conversa a partir de um anúncio no WhatsApp, a Kinbox exibe na conversa um cartão com o anúncio de origem (título, imagem e link). A janela de 24 horas vale normalmente para essas conversas. Veja mais em "Janela de 24 horas: quando é preciso usar um template".

## Variações

- lead que vem de anúncio do instagram ou facebook paga mensagem na meta
- conversa de anúncio click to whatsapp tem cobrança no whatsapp oficial
- a kinbox mostra se a conversa do anúncio é gratuita
- como a conversa vinda de anúncio aparece na kinbox
- anúncio para whatsapp muda a janela de 24 horas na kinbox
