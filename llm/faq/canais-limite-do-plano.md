---
title: Quantos canais posso conectar no meu plano?
description: O plano limita a soma de canais de WhatsApp ativos (oficiais e por QR Code) e tem limite próprio para Instagram; SMS permite um por workspace e, na assinatura paga atual, os demais tipos não têm limite de quantidade; no teste grátis, são até 1 página do Facebook, 1 Telegram e 3 e-mails.
keywords: [quantos canais, limite de canais, limite whatsapp, linhas de whatsapp, instagram plano trial, assinatura expirada, remover canais, facebook teste grátis, limite facebook, seu plano atual não permite adicionar o novo canal]
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

A quantidade permitida depende do que está contratado no seu plano: canais de **WhatsApp** (somando WhatsApp oficial e QR Code) contam contra o número de linhas de WhatsApp do plano, **Instagram** tem limite próprio e não pode ser adicionado no teste grátis, **SMS** permite um canal por workspace, e, na assinatura paga atual, os demais tipos (**Telegram**, **E-mail**, **Widget**, **Facebook** e **Customizado**) não têm limite de quantidade. No teste grátis, o workspace pode ter até 1 página do **Facebook**, 1 canal de **Telegram** e 3 canais de **E-mail**; acima disso, aparece `"Seu plano atual não permite adicionar o novo canal"`. Na assinatura antiga paga, os tetos são 50 páginas do Facebook, 10 canais de Telegram e 10 de e-mail.

**Recriar** um canal de WhatsApp não consome uma linha nova do plano. Quando o limite é atingido ou há bloqueio de assinatura ao tentar criar um canal, a Kinbox pode exibir mensagens como:
- `"Você precisa remover canais de Whatsapp para prosseguir com a contratação"`: assinatura atual acima do limite de linhas de WhatsApp.
- `"Assinatura expirada"`: assinatura atual vencida há mais de 3 dias, ao criar canal de WhatsApp ou de Instagram.
- **Instagram**: `"Você não pode adicionar canais de Instagram em plano trial"` (teste grátis) e `"Você precisa remover canais de Instagram para prosseguir com a contratação"` (todas as unidades de **Instagram Direct** em uso).
- `"Seu plano atual não permite adicionar o novo canal"`: teste grátis acima do limite (Facebook, Telegram ou e-mail) ou assinatura antiga acima do teto.
- `"Sua assinatura expirou"`: assinatura vencida, a partir do quarto dia depois do vencimento, ao conectar Facebook, Telegram ou e-mail; na assinatura antiga, também ao criar canal de WhatsApp.
- `"WhatsApp bloqueado para seu plano atual."` e `"Seu plano atual não permite adicionar ou modificar número de whatsapps."`: assinatura antiga.

Veja a visão geral em [Canais: conectar e gerenciar](/docs/canais/visao-geral). Para aumentar a quantidade contratada, veja [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano).

## Variações

- quantos números de whatsapp posso colocar na kinbox
- whatsapp oficial e qr code contam no mesmo limite do plano
- aparece você precisa remover canais de whatsapp para prosseguir com a contratação
- posso conectar instagram no teste grátis da kinbox
- existe limite para widget e-mail ou telegram na kinbox
- recriar um canal de whatsapp conta como novo canal no plano
- quantas páginas do facebook posso conectar no teste grátis
