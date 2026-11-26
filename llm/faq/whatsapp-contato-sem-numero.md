---
title: Por que o contato aparece sem número de telefone?
description: No WhatsApp por QR Code, o contato aparece sem telefone em conversas de grupo ou quando o WhatsApp envia apenas um identificador de privacidade; no WhatsApp oficial, quando a Meta manda só um identificador do usuário.
keywords: [contato sem número, sem telefone, identificador de privacidade, lid, grupo sem telefone, participante sem número]
publico: llm
tipo: faq
fontes:
  - api-v0:server/modules/wabox/WaboxEvents.js
  - web:src/lib/groupMentions.ts
  - api-v0:server/controllers/WbaCloudController.js
codigo:
  - api-v0:server/modules/wabox/WaboxEvents.js
  - web:src/lib/groupMentions.ts
  - api-v0:server/controllers/WbaCloudController.js
verificado_em: 2026-11-26
---

## Pergunta

Por que o contato aparece sem número de telefone?

## Resposta

No WhatsApp por QR Code, isso acontece em dois casos:

- **Conversa de grupo**: o contato da conversa é o próprio grupo, que não tem telefone. Quem escreveu aparece em cada mensagem. Numa menção, o participante cujo número o WhatsApp esconde aparece como "Participante". Na lista para mencionar, se houver mais de um assim, cada um ganha os últimos 4 dígitos do identificador.
- **Contato que o WhatsApp mostra sem número**: em alguns casos o WhatsApp troca o número por um identificador de privacidade. Nessas conversas, o que você manda pelo celular não entra na Kinbox.

No WhatsApp oficial, a Meta pode mandar só um identificador do usuário em vez do telefone. A Kinbox identifica o contato por esse identificador, e a conversa funciona normalmente. Veja [Problemas ao conectar ou enviar pelo WhatsApp oficial](/docs/canais/whatsapp/whatsapp-cloud-api/problemas-comuns).

Veja [O que funciona e o que não funciona no WhatsApp por QR Code](/docs/canais/whatsapp/whatsapp-app/o-que-funciona).

## Variações

- contato chegou no whatsapp sem telefone cadastrado
- por que aparece só um código em vez do número do cliente
- menção no grupo aparece como participante com código
- grupo do whatsapp fica sem número de telefone no contato
- mensagens que mando pelo celular para um contato sem número não entram na kinbox
- no whatsapp oficial o cliente chegou sem número de telefone
