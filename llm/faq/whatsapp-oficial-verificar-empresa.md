---
title: Preciso verificar a empresa na Meta?
description: A Kinbox não exige nem confere a verificação da empresa na Meta para conectar; eventuais exigências da Meta aparecem na janela da Meta.
keywords: [verificar empresa meta, verificação de empresa, empresa verificada facebook, gerenciador de negócios verificado, precisa verificar empresa whatsapp oficial]
publico: llm
tipo: faq
fontes:
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

Preciso verificar a empresa na Meta?

## Resposta

A Kinbox não pede nem confere se a empresa está verificada na Meta para conectar o WhatsApp oficial.

Durante a conexão, qualquer exigência da Meta aparece na própria janela da Meta. Se a Meta recusar, a Kinbox mostra "Erro ao conectar canal de WhatsApp." junto com o motivo (veja [Problemas ao conectar ou enviar pelo WhatsApp oficial](/docs/canais/whatsapp/whatsapp-cloud-api/problemas-comuns)). A Kinbox também não mostra na tela o status da verificação da empresa. Veja mais em [Antes de conectar o WhatsApp oficial](/docs/canais/requisitos-para-se-ter-uma-api-oficial).

## Variações

- consigo conectar o whatsapp oficial sem a empresa verificada na meta
- a kinbox exige verificação de empresa no facebook para ligar a api oficial
- onde vejo na kinbox se minha empresa está verificada na meta
- minha empresa ainda não foi verificada pela meta, posso conectar o canal oficial
- é obrigatório verificar o gerenciador de negócios antes de conectar na kinbox
