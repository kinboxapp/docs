---
title: Os grupos de WhatsApp aparecem na Kinbox?
description: Por padrão a Kinbox ignora mensagens de grupo; para atender grupos no WhatsApp por QR Code, ative e selecione os grupos em Permitir Grupos de WhatsApp na tela do canal.
keywords: [grupos whatsapp, permitir grupos de whatsapp, mensagens de grupo, atender grupo na kinbox, lista de grupos vazia]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/channels/whatsapp/EditWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/WhatsappGroups.tsx
  - api-v0:server/modules/wabox/WaboxEvents.js
  - api-v0:server/controllers/WaboxController.js
codigo:
  - web:src/pages/settings/channels/whatsapp/**
  - api-v0:server/controllers/WaboxController.js
  - api-v0:server/modules/wabox/**
  - api-v0:server/controllers/IntegrationsController.js
  - web:src/pages/settings/channels/warmbox/**
  - web:src/pages/settings/channels/index.tsx
verificado_em: 2026-11-26
---

## Pergunta

Os grupos de WhatsApp aparecem na Kinbox?

## Resposta

Só se você ativar e selecionar cada grupo: por padrão, a Kinbox ignora todas as mensagens de grupo de WhatsApp.

No canal de WhatsApp por QR Code, abra o canal em **Configurações** → **Chat** → **Canais**, ative **Permitir Grupos de WhatsApp** e marque os grupos que você quer ler e responder pela Kinbox (no WhatsApp oficial não existe opção de grupos). A lista de grupos vem do WhatsApp do número e aparece vazia se o canal estiver desconectado.

Nas conversas de grupo, o contato é o próprio grupo (sem número de telefone), quem escreveu aparece identificado na mensagem, você pode mencionar participantes com `@` (participantes com número ocultado pelo WhatsApp aparecem como `"Participante (final do identificador)"`) e não há tiques de entrega/leitura. Veja mais em [Configurações do WhatsApp por QR Code](/docs/canais/whatsapp/whatsapp-app/configuracoes) e [O que funciona e o que não funciona no WhatsApp por QR Code](/docs/canais/whatsapp/whatsapp-app/o-que-funciona).

## Variações

- como ativar grupos do whatsapp na kinbox
- as mensagens dos meus grupos não estão caindo na kinbox
- por que a lista de grupos do whatsapp aparece vazia
- dá para responder grupo de whatsapp pela kinbox
- consigo mencionar pessoas com arroba em grupo pela kinbox
- grupos funcionam no whatsapp oficial da kinbox
