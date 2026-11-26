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
  - api-v0:server/modules/wabox/WaboxEvents.js
  - web:src/lib/groupMentions.ts
verificado_em: 2026-11-26
---

## Pergunta

Por que o contato aparece sem número de telefone?

## Resposta

No WhatsApp por QR Code, isso acontece em dois casos:

- **Conversa de grupo**: o contato da conversa é o próprio grupo, que não tem telefone. Quem escreveu aparece em cada mensagem. Numa menção, o participante cujo número o WhatsApp esconde aparece como "Participante" seguido do final do identificador.
- **Contato que o WhatsApp mostra sem número**: em alguns casos o WhatsApp troca o número por um identificador de privacidade. Nessas conversas, o que você manda pelo celular não entra na Kinbox.

Veja "O que funciona e o que não funciona no WhatsApp por QR Code" (`/docs/canais/whatsapp/whatsapp-app/o-que-funciona`). O caso do WhatsApp oficial é tratado na seção do WhatsApp oficial.

## Variações

- contato chegou no whatsapp sem telefone cadastrado
- por que aparece só um código em vez do número do cliente
- menção no grupo aparece como participante com código
- grupo do whatsapp fica sem número de telefone no contato
- mensagens que mando pelo celular para um contato sem número não entram na kinbox
