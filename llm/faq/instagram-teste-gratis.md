---
title: Posso conectar o Instagram no teste grátis?
description: Não. O Instagram exige um plano pago com unidade livre de Instagram Direct; no teste grátis, dá para conectar uma página do Facebook.
keywords: [instagram teste grátis, instagram plano trial, você não pode adicionar canais de instagram em plano trial, testar instagram na kinbox, facebook teste grátis]
publico: llm
tipo: faq
fontes:
  - api-v0:server/routes/IntegrationsApiRoutes.js
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/modules/accessRestriction/funcionalitiesAccess.js
codigo:
  - api-v0:server/routes/IntegrationsApiRoutes.js
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/modules/accessRestriction/**
  - web:src/pages/settings/channels/facebook/AddMetaChannel.tsx
  - web:src/pages/settings/billing/v2/Checkout.tsx
verificado_em: 2026-11-26
---

## Pergunta

Posso conectar o Instagram no teste grátis?

## Resposta

Não. No teste grátis, a Kinbox recusa a conexão do Instagram com a mensagem `"Você não pode adicionar canais de Instagram em plano trial"`, exibida depois da janela da Meta e da escolha da página.

Para conectar o Instagram, é preciso assinar um plano pago com unidade livre de **Instagram Direct** (item cobrado por canal) e conectar o canal normalmente.

No teste grátis, dá para conectar uma página do Facebook (Messenger) por workspace; a segunda é recusada com `"Seu plano atual não permite adicionar o novo canal"` ([Conectar o Facebook Messenger](/docs/canais/facebook/conectar)).

Veja [Conectar o Instagram](/docs/canais/instagram) e [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano).

## Variações

- dá para testar o instagram direct no período de teste da kinbox
- apareceu você não pode adicionar canais de instagram em plano trial
- por que não consigo conectar meu instagram no trial
- o teste grátis da kinbox inclui instagram
- posso conectar facebook messenger no teste grátis
- preciso assinar um plano para usar o instagram na kinbox
