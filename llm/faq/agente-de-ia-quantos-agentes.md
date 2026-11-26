---
title: Quantos agentes de IA posso criar?
description: O plano da Kinbox não limita a quantidade de agentes de IA que você cria; o que limita o uso é a regra de um agente por canal e o saldo disponível na carteira.
keywords: [quantos agentes de ia, limite de agentes, criar varios agentes, clonar agente, importar agente, agentes no plano]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/billing/BillingV2.tsx
  - web:src/pages/agents/useAgentImportExport.tsx
  - api:src/modules/agents/agents.service.ts
codigo:
  - web:src/pages/settings/agents/**
  - web:src/pages/agents/EditAgentCore.tsx
  - web:src/pages/agents/onboarding/index.tsx
  - api:src/modules/agents/agent-bot.service.ts
  - api:src/modules/agents/agent.runner.ts
verificado_em: 2026-11-26
---

## Pergunta

Quantos agentes de IA posso criar?

## Resposta

O plano da Kinbox não limita a quantidade de agentes de IA que você pode criar no workspace; na prática, o uso é limitado pela regra de um único agente por canal conectado e pelo saldo disponível na carteira.

Você também pode criar novos agentes copiando um agente existente pelo menu **Clonar** ou importando um arquivo `.json` exportado em **Importar agente** (a cópia não leva os canais conectados do original e nasce ligada).

Veja mais em [Agentes de IA: visão geral](/docs/agente-de-ia/visao-geral) e [Criar um agente de IA](/docs/agente-de-ia/criando-seu-agente-de-ia).

## Variações

- existe limite de agentes de ia no meu plano
- posso criar mais de um agente de ia na kinbox
- a licença de agentes do plano limita os agentes de ia
- dá para duplicar ou importar um agente de ia
- quantos assistentes de ia posso ter no workspace
