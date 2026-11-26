---
title: Por que as ligações não aparecem no meu número em coexistência?
description: A Kinbox não recebe nem faz ligações em números de WhatsApp oficial em coexistência porque a Meta não oferece ligações pela API nesse modo; as ligações ficam apenas no celular.
keywords: [coexistência ligação, ligação whatsapp business celular, a meta não oferece ligações neste número, número coexistente ligação, não consigo ativar ligações whatsapp]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/channels/whatsappCloud/WhatsappCallingChannelSettings.tsx
  - web:src/components/whatsappCall/CallContactButton.tsx
  - api:src/modules/whatsapp-calling/whatsapp-calling.service.ts
  - api:src/modules/whatsapp-calling/whatsapp-calling.constants.ts
codigo:
  - web:src/pages/settings/channels/whatsappCloud/WhatsappCallingChannelSettings.tsx
  - web:src/pages/settings/channels/whatsappCloud/EditWhatsappCloud.tsx
  - web:src/components/whatsappCall/**
  - web:src/lib/whatsappCall.ts
  - web:src/pages/settings/channels/voip/WhatsAppCall.tsx
  - web:src/pages/settings/channels/voip/WhatsAppOutboundCall.tsx
  - web:src/pages/inbox/MessageVoipCall.tsx
  - api:src/modules/whatsapp-calling/**
  - api:src/modules/whatsapp-api/utils/call-permission-template.ts
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/controllers/v1IntegrationController.js
verificado_em: 2026-11-26
---

## Pergunta

Por que as ligações não aparecem no meu número em coexistência?

## Resposta

A Kinbox não recebe nem faz ligações em números de WhatsApp oficial em coexistência com o app WhatsApp Business, porque a Meta não oferece ligações pela API nesse modo — as ligações ficam apenas no app do celular.

- **O que a tela mostra:** na aba **Ligações** do canal (recurso em teste **Beta**), aparece o aviso **A Meta não oferece ligações neste número**: `"O número está em coexistência: usa o app WhatsApp Business no celular e a API oficial ao mesmo tempo. Nesse modo, as ligações ficam só no app do celular e não chegam ao Kinbox. Para receber ligações aqui, use o número só na API oficial, sem o app WhatsApp Business."`. Os interruptores **Receber ligações** e **Fazer ligações** só podem ser desligados, e o menu de ligar mostra `"A Meta não oferece ligações em números em coexistência com o app WhatsApp Business"`.
- **Agente de voz:** o [agente de voz](/docs/agente-de-ia/agente-de-voz) também não pode ser conectado a esse número (`"Coexistência: a Meta não oferece ligações"`).
- **Alternativas:** para usar ligações pelo WhatsApp na Kinbox (com o recurso em teste liberado e o plano **Ligações WhatsApp**), use o número apenas na API oficial, sem o app WhatsApp Business. Para ligar para o telefone do contato sem depender do WhatsApp, use [ligação por telefone (VoIP)](/docs/canais/ligacoes/ligar-por-telefone) (exige permissão **Pode ligar para o contato** e saldo na carteira).

Veja mais em [Usar o mesmo número no app WhatsApp Business e na Kinbox (coexistência)](/docs/canais/whatsapp-api-oficial-coexistente) e [Fazer e receber ligações pelo WhatsApp oficial (Beta)](/docs/canais/whatsapp/whatsapp-cloud-api/ligacoes-pelo-whatsapp).

## Variações

- consigo ativar ligações no whatsapp coexistente
- apareceu a meta não oferece ligações neste número
- por que não dá para ligar pelo whatsapp usando celular e kinbox juntos
- ligações do whatsapp coexistência tocam só no celular
- posso conectar agente de voz em número de coexistência
- interruptor de receber ligações não liga no canal coexistente
