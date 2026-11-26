---
title: Dá para mandar botões, listas, localização ou template pelo QR Code?
description: Não, o WhatsApp por QR Code não envia templates, botões, listas, menus interativos nem localização; menus do bot vão como texto e esses recursos existem no WhatsApp oficial.
keywords: [botões whatsapp, listas whatsapp, template qr code, localização whatsapp, menu interativo, mensagem interativa]
publico: llm
tipo: faq
fontes:
  - api-v0:server/modules/wabox/WaboxSender.js
  - api-v0:server/modules/wabox/WaboxEvents.js
  - api-v0:server/modules/chat/botFlowV2.js
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

Dá para mandar botões, listas, localização ou template pelo QR Code?

## Resposta

Não. No WhatsApp por QR Code (conexão **Express**), a Kinbox não envia templates, botões, listas, menus interativos nem localização — qualquer tentativa de envio desses formatos fica com erro.

Como contorno, nos menus do bot a Kinbox envia as opções em formato de texto, uma por linha, em vez de botões. Já templates aprovados pela Meta, Flows, carrossel e recursos interativos oficiais existem somente no WhatsApp oficial. No recebimento, se o contato mandar localização ou responder a um botão/lista, a Kinbox exibe o conteúdo na conversa. Veja detalhes em [O que funciona e o que não funciona no WhatsApp QR Code](/docs/canais/whatsapp/whatsapp-app/o-que-funciona).

## Variações

- consigo enviar botão clicável no whatsapp qr code
- por que o template deu erro no canal de whatsapp
- dá para mandar menu de lista pelo whatsapp express
- como mandar localização pelo whatsapp na kinbox
- meu bot não está mandando botões no whatsapp
- o whatsapp por qr code aceita template da meta
