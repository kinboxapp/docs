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

Depende do número ter uma conta de WhatsApp: o canal por QR Code se conecta a uma conta de WhatsApp que já existe no celular. A Kinbox não bloqueia DDI de outro país nem diferencia fixo de celular, mas não garante que todo número funcione.

Regras que a Kinbox confere:

- Na **Express** (e no código de conexão), o número precisa ter de 10 a 15 dígitos, contando o DDI. Espaços e símbolos são ignorados. Fora disso, aparece "Número inválido".
- Na **Clássica**, a Kinbox só exige que o número seja preenchido.
- Número do Brasil no código de conexão: a Kinbox tenta descobrir se a conta está registrada com ou sem o nono dígito. Se o código não funcionar, gere outro ou conecte pelo QR Code.

Exemplo de formato: `+55 11 90000-0001`. Passo a passo em "Conectar o WhatsApp pelo QR Code" (`/docs/canais/conectar-whatsapp-app`).

## Variações

- dá para conectar whatsapp business com telefone fixo na kinbox
- consigo usar um número de fora do brasil na kinbox
- a kinbox aceita ddi estrangeiro no whatsapp qr code
- quantos dígitos precisa ter o número ao conectar whatsapp
- aparece número inválido quando tento colocar meu telefone
