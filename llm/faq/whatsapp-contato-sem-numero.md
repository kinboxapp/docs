---
title: Por que o contato aparece sem número de telefone?
description: No WhatsApp por QR Code, o contato aparece sem telefone em conversas de grupo ou quando o WhatsApp envia apenas um identificador de privacidade em vez do número.
keywords: [contato sem número, sem telefone, identificador de privacidade, lid, grupo sem telefone, participante sem número]
publico: llm
tipo: faq
fontes:
  - api-v0:server/modules/wabox/WaboxEvents.js
  - web:src/lib/groupMentions.ts
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

Por que o contato aparece sem número de telefone?

## Resposta

No WhatsApp por QR Code, isso acontece em dois casos: em conversas de grupo (em que o contato representa o próprio grupo, sem telefone) ou quando o WhatsApp fornece apenas um identificador de privacidade em vez do número do contato.

- **Grupos**: o contato da conversa é o grupo e não tem telefone associado; o nome de quem enviou aparece na própria mensagem. Em menções, quando o WhatsApp oculta o número de um participante, ele aparece como `"Participante (final do identificador)"`.
- **Identificador de privacidade do WhatsApp**: em alguns casos o WhatsApp troca o número por esse identificador. Nessas conversas sem número, mensagens que você enviar pelo celular não entram na Kinbox.

Veja mais detalhes em [O que funciona e o que não funciona no WhatsApp QR Code](/docs/canais/whatsapp/whatsapp-app/o-que-funciona). Para o caso de contatos sem número no WhatsApp oficial, consulte a página específica do WhatsApp oficial.

## Variações

- contato chegou no whatsapp sem telefone cadastrado
- por que aparece só um código em vez do número do cliente
- menção no grupo aparece como participante com código
- grupo do whatsapp fica sem número de telefone no contato
- mensagens que mando pelo celular para um contato sem número não entram na kinbox
