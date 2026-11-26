---
title: A Kinbox traz as conversas antigas do meu WhatsApp?
description: Na conexão Express (padrão) a Kinbox não importa conversas antigas do celular; apenas a conexão Clássica tem a ação Sincronizar histórico.
keywords: [histórico whatsapp, conversas antigas, sincronizar histórico, importar mensagens, express, clássica]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/channels/whatsapp/EditWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/SyncZapHistoryModal.tsx
  - api-v0:server/controllers/WppController.js
codigo:
  - api-v0:server/modules/wabox/WaboxSender.js
  - api-v0:server/modules/wabox/WaboxEvents.js
  - api-v0:server/modules/wabox/WaboxClient.js
  - web:src/pages/settings/channels/whatsapp/EditWhatsApp.tsx
  - wabox:apps/docs/resources/limitations.mdx
  - wabox:apps/engine/internal/wa/whatsmeow/**
verificado_em: 2026-11-26
---

## Pergunta

A Kinbox traz as conversas antigas do meu WhatsApp?

## Resposta

Na conexão **Express** (padrão do WhatsApp por QR Code), não: a Kinbox não importa conversas antigas do celular e passa a receber apenas as mensagens trocadas a partir da conexão.

Somente canais na conexão **Clássica** (conectados) têm a ação **Sincronizar histórico**, que permite importar de 10 a 10.000 conversas mais recentes (padrão 500), com 20 (padrão) ou 40 mensagens por conversa, podendo não trazer todo o histórico. Se um número já teve um canal excluído na Kinbox e você criar outro canal com o mesmo número, as conversas que já estavam na Kinbox voltam junto. Veja mais em [O que funciona e o que não funciona no WhatsApp QR Code](/docs/canais/whatsapp/whatsapp-app/o-que-funciona).

## Variações

- quando conecto o whatsapp por qr code puxa o histórico do celular
- onde fica o botão sincronizar histórico no whatsapp express
- minhas conversas antigas do celular não apareceram na kinbox
- dá para importar mensagens antigas do whatsapp na kinbox
- por que só aparecem mensagens novas depois de ler o qr code
- como sincronizar histórico de conversas do whatsapp
