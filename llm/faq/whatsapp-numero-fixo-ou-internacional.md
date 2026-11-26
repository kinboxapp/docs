---
title: Posso conectar um número fixo ou de outro país?
description: A Kinbox aceita números de 10 a 15 dígitos com DDI sem restringir país nem diferenciar fixo de celular, desde que o número tenha uma conta de WhatsApp para parear.
keywords: [número fixo, telefone fixo, número internacional, outro país, ddi, número inválido, conectar whatsapp]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/channels/whatsapp/AddWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/WhatsappPairingCode.tsx
  - api-v0:server/controllers/WaboxController.js
codigo:
  - web:src/pages/settings/channels/whatsapp/**
  - api-v0:server/controllers/WaboxController.js
  - api-v0:server/modules/wabox/**
  - api-v0:server/controllers/IntegrationsController.js
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/channels/AddChannelWhatsApp.tsx
  - wabox:apps/engine/internal/config/config.go
verificado_em: 2026-11-26
---

## Pergunta

Posso conectar um número fixo ou de outro país?

## Resposta

A Kinbox aceita qualquer número com DDI que tenha de 10 a 15 dígitos (exemplo: `+55 11 90000-0000`), sem restringir o código do país nem diferenciar número fixo de celular no cadastro, desde que esse número já possua uma conta de WhatsApp ativa para ler o QR Code ou usar o código de pareamento.

Antes de validar, a Kinbox remove espaços e símbolos e verifica apenas se há entre 10 e 15 dígitos; fora desse intervalo, exibe `"Número inválido"`. Para números do Brasil no código de pareamento, a Kinbox verifica automaticamente se a conta está registrada com ou sem o nono dígito. Veja o passo a passo em [Conectar o WhatsApp pelo QR Code](/docs/canais/conectar-whatsapp-app).

## Variações

- dá para conectar whatsapp business com telefone fixo na kinbox
- consigo usar um número de fora do brasil na kinbox
- a kinbox aceita ddi estrangeiro no whatsapp qr code
- quantos dígitos precisa ter o número ao conectar whatsapp
- aparece número inválido quando tento colocar meu telefone
