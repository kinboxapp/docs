---
title: Onde vejo a qualidade do meu número do WhatsApp oficial?
description: A Kinbox não mostra a qualidade do número do WhatsApp oficial; consulte essa informação diretamente na Meta.
keywords: [qualidade do número, quality rating, classificação de qualidade, qualidade baixa, verde amarelo vermelho meta, saúde do número whatsapp oficial]
publico: llm
tipo: faq
fontes:
  - api-v0:server/controllers/WbaCloudController.js
  - api:src/modules/whatsapp-api/services/core/whatsapp-api-status-monitor.service.ts
  - api:src/modules/whatsapp-api/clients/whatsapp-api-meta.client.ts
  - web:src/pages/settings/whatsappApi/services/whatsappApi.service.ts
  - web:src/components-old/header/NotificationDropItem.tsx
  - api:src/modules/whatsapp-api/services/core/whatsapp-api-notifications.service.ts
codigo:
  - api-v0:server/controllers/WbaCloudController.js
  - api:src/modules/whatsapp-api/services/core/whatsapp-api-status-monitor.service.ts
  - api:src/modules/whatsapp-api/clients/whatsapp-api-meta.client.ts
  - web:src/pages/settings/whatsappApi/services/whatsappApi.service.ts
  - web:src/pages/settings/channels/whatsappCloud/**
  - web:src/components-old/header/NotificationDropItem.tsx
  - api:src/modules/whatsapp-api/services/core/whatsapp-api-notifications.service.ts
verificado_em: 2026-11-26
---

## Pergunta

Onde vejo a qualidade do meu número do WhatsApp oficial?

## Resposta

A Kinbox não tem uma tela que mostre a qualidade do seu número do WhatsApp oficial.

O status **Conectado** na lista de canais também não reflete a qualidade nem eventuais alertas do número na Meta. A tela **WhatsApp API** (**Configurações** → **Automação** → **WhatsApp API**) também não mostra qualidade, nem do número nem dos templates: a qualidade de um template só aparece numa notificação no sino, **Qualidade do template:** "A qualidade caiu no template", quando ela cai. Para consultar a qualidade do número, acesse diretamente a Meta. Veja mais em [Problemas ao conectar ou enviar pelo WhatsApp oficial](/docs/canais/whatsapp/whatsapp-cloud-api/problemas-comuns).

## Variações

- onde acompanho a classificação de qualidade do número oficial
- a kinbox avisa quando a qualidade do número cai na meta
- consigo ver o quality rating do whatsapp na kinbox
- meu número está conectado na kinbox mas quero saber a saúde dele na meta
- como consultar se meu número oficial está com qualidade baixa
