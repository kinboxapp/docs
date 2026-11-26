---
title: Qual é a diferença entre o WhatsApp oficial e o QR Code?
description: O WhatsApp oficial conecta pela Meta com templates, Flows, carrossel e janela de 24 horas; o QR Code funciona como um aparelho conectado, com grupos e sem janela de 24 horas.
keywords: [whatsapp oficial, qr code, diferença whatsapp, api oficial, modo qrcode, express, clássica, qual escolher]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/channels/AddChannelWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/embed/AddWhatsappEmbedded.tsx
  - web:src/pages/inbox/Chat/index.tsx
  - api-v0:server/modules/wabox/WaboxSender.js
codigo:
  - web:src/pages/settings/channels/AddChannelWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/AddWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/embed/**
  - web:src/pages/settings/channels/whatsappCloud/**
  - web:src/pages/inbox/Chat/index.tsx
  - api-v0:server/modules/wabox/WaboxSender.js
verificado_em: 2026-11-26
---

## Pergunta

Qual é a diferença entre o WhatsApp oficial e o QR Code?

## Resposta

O **WhatsApp oficial** (**API Oficial**) conecta pelo cadastro da Meta e tem templates, Flows, carrossel e ligações pelo WhatsApp (recurso em teste, com plano de ligações; veja [Fazer e receber ligações pelo WhatsApp oficial (Beta)](/docs/canais/whatsapp/whatsapp-cloud-api/ligacoes-pelo-whatsapp)). Passadas 24 horas da última mensagem do contato, só dá para escrever com template; numa conversa resolvida nessa situação, a Kinbox mostra "Resolvida · janela de 24h encerrada" com **Enviar template**.

O **WhatsApp por QR Code** (**Modo QRCode**) funciona como um aparelho conectado ao WhatsApp do celular: não tem limite de 24 horas para responder, aceita grupos e deixa usar o celular junto sem configurar nada. Em troca, não envia templates, botões, listas nem localização, e o número pode ser bloqueado pelo WhatsApp se receber denúncias de spam. O oficial também permite usar o aplicativo WhatsApp Business junto, mas só com a coexistência da Meta.

Os dois tipos contam no mesmo limite de canais de WhatsApp do plano. No QR Code, a conexão recomendada é a **Express**; a **Clássica** é o modo antigo. Tabela completa: [Qual WhatsApp usar: oficial ou QR Code](/docs/canais/whatsapp/visao-geral).

## Variações

- qual whatsapp devo conectar na kinbox
- diferença entre api oficial e modo qrcode
- whatsapp oficial ou não oficial qual é melhor
- whatsapp por qr code tem janela de 24 horas
- dá para usar grupos no whatsapp oficial ou só no qr code
- qual tipo de whatsapp aceita templates da meta
