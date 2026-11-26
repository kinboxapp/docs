---
title: Quantos canais posso conectar no meu plano?
description: O plano limita a soma de canais de WhatsApp ativos (oficiais e por QR Code) e tem limite próprio para Instagram; SMS permite um por workspace e, nos planos pagos, os demais tipos não têm limite de quantidade; no teste grátis, o Facebook permite uma página por workspace.
keywords: [quantos canais, limite de canais, limite whatsapp, linhas de whatsapp, instagram plano trial, assinatura expirada, remover canais]
publico: llm
tipo: faq
fontes:
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/routes/IntegrationsApiRoutes.js
  - web:src/pages/settings/channels/AddChannel.tsx
  - api-v0:server/modules/accessRestriction/rules.js
codigo:
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/channels/channels.def.tsx
  - web:src/pages/settings/channels/whatsapp/ForwardZapModal.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/routes/IntegrationsApiRoutes.js
  - api-v0:server/modules/accessRestriction/**
verificado_em: 2026-11-26
---

## Pergunta

Quantos canais posso conectar no meu plano?

## Resposta

A quantidade permitida depende do que está contratado no seu plano: canais de **WhatsApp** (somando WhatsApp oficial e QR Code) contam contra o número de linhas de WhatsApp do plano, **Instagram** tem limite próprio e não pode ser adicionado no teste grátis, **SMS** permite um canal por workspace, e, nos planos pagos, os demais tipos (**Telegram**, **E-mail**, **Widget**, **Facebook** e **Customizado**) não têm limite de quantidade. No teste grátis, dá para conectar uma página do **Facebook** por workspace (a segunda é recusada com `"Seu plano atual não permite adicionar o novo canal"`), e o **Telegram** e o **E-mail** também podem ter limite de quantidade.

**Recriar** um canal de WhatsApp não passa pela checagem de limite do plano. Quando o limite é atingido ou há bloqueio de assinatura ao tentar criar um canal, a Kinbox pode exibir mensagens como:
- `"Você precisa remover canais de Whatsapp para prosseguir com a contratação"` (assinatura atual, acima do limite de linhas de WhatsApp)
- `"Assinatura expirada"` (assinatura atual vencida há mais de 3 dias)
- `"WhatsApp bloqueado para seu plano atual."`, `"Seu plano atual não permite adicionar ou modificar número de whatsapps."`, `"Seu plano atual não permite adicionar o novo canal"` ou `"Sua assinatura expirou"` (assinatura antiga)
- `"Você não pode adicionar canais de Instagram em plano trial"`

Veja a visão geral em [Canais: conectar e gerenciar](/docs/canais/visao-geral). Para aumentar a quantidade contratada, veja [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano).

## Variações

- quantos números de whatsapp posso colocar na kinbox
- whatsapp oficial e qr code contam no mesmo limite do plano
- aparece você precisa remover canais de whatsapp para prosseguir com a contratação
- posso conectar instagram no teste grátis da kinbox
- existe limite para widget e-mail ou telegram na kinbox
- recriar um canal de whatsapp conta como novo canal no plano
