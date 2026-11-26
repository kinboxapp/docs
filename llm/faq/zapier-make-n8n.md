---
title: A Kinbox tem integração com Zapier, Make, n8n ou Pluga?
description: Não, a Kinbox não tem aplicativo pronto para Zapier, Make, n8n ou Pluga; use requisições HTTP na API pública e Cenários.
keywords: [zapier, make, integromat, n8n, pluga, integração no-code, integrar sem programar, webhook zapier, conectar n8n na kinbox]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/index.tsx
  - api:src/modules/api-tokens/api-tokens.service.ts
  - api:src/modules/auth/guards/api-token-auth.guard.ts
codigo:
  - web:src/pages/settings/index.tsx
  - web:src/pages/settings/api/**
  - web:src/pages/settings/mcp/**
  - web:src/pages/settings/plugins/**
  - web:src/pages/settings/channels/custom/**
  - web:src/routes/inbox.routes.ts
verificado_em: 2026-11-26
---

## Pergunta

A Kinbox tem integração com Zapier, Make, n8n ou Pluga?

## Resposta

Não, a Kinbox não tem app pronto para Zapier, Make, n8n ou Pluga.

Como alternativa, você pode ligar a Kinbox a essas ferramentas de duas formas:

- **Da ferramenta para a Kinbox:** nas ferramentas que tiverem um módulo de requisição HTTP (como Zapier, Make e n8n), use esse módulo para chamar a API pública da Kinbox com um token de API (`Authorization: Bearer <token>`), criado em **Configurações** → **Integrações** → **API Tokens** (exige a permissão **Integrações** ou ser proprietário do workspace).
- **Da Kinbox para a ferramenta (e vice-versa):** use **Cenários** (**Configurações** → **Automação** → **Cenários**; exige a permissão **Cenários** ou ser proprietário), com o gatilho **Webhook recebido** para receber chamadas e passos de **Requisição HTTP** para enviar dados para fora. Veja [Receber dados de outro sistema por webhook](/docs/cenarios/integrar-via-webhook-com-cenarios) e [Gatilhos e ações dos cenários](/docs/cenarios/gatilhos-e-acoes).

Veja [Criar um token de API](/docs/desenvolvedor/tokens-de-api), [Autenticação](/api-reference/authentication) e [Bot, automações, cenários e agentes de IA: qual usar](/docs/conceitos/automacao-e-ia).

## Variações

- a kinbox integra com zapier
- existe nó ou conector da kinbox no n8n
- como conectar a kinbox no make ou integromat
- tem integração nativa com a pluga
- como integrar a kinbox sem programar usando webhook
- conectar ferramentas de automação externas na kinbox
