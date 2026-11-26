---
title: As ligações do WhatsApp por QR Code chegam na Kinbox?
description: Não, no WhatsApp por QR Code as ligações tocam apenas no celular e não entram na Kinbox; ligações pela Kinbox existem apenas no WhatsApp oficial.
keywords: [ligações whatsapp, chamadas whatsapp, atender ligação na kinbox, chamada de voz, qr code, whatsapp oficial]
publico: llm
tipo: faq
fontes:
  - api-v0:server/modules
  - web:src/pages/settings/channels/whatsappCloud/WhatsappCallingChannelSettings.tsx
  - motor-qr:packages/database/src/schema/instances.ts
codigo:
  - api-v0:server/modules/**
  - web:src/pages/settings/channels/whatsappCloud/WhatsappCallingChannelSettings.tsx
  - motor-qr:packages/database/src/schema/instances.ts
verificado_em: 2026-11-26
---

## Pergunta

As ligações do WhatsApp por QR Code chegam na Kinbox?

## Resposta

Não. No WhatsApp por QR Code não existe fazer nem receber ligações pela Kinbox.

As ligações tocam apenas no celular do número, não são recusadas automaticamente e nenhum aviso de ligação aparece na conversa. Para atender ou fazer ligações de WhatsApp pela Kinbox, é preciso usar o WhatsApp oficial sem coexistência (recurso em teste que exige plano de ligações; veja [Fazer e receber ligações pelo WhatsApp oficial (Beta)](/docs/canais/whatsapp/whatsapp-cloud-api/ligacoes-pelo-whatsapp)). Veja mais em [O que funciona e o que não funciona no WhatsApp por QR Code](/docs/canais/whatsapp/whatsapp-app/o-que-funciona).

## Variações

- consigo atender chamada do whatsapp pela kinbox
- dá para fazer ligação pelo whatsapp qr code na kinbox
- por que não aparece aviso de chamada perdida no whatsapp
- a kinbox recusa ligações do whatsapp automaticamente
- cliente ligou no whatsapp e não tocou na kinbox
- tem suporte a ligação de voz no whatsapp express
