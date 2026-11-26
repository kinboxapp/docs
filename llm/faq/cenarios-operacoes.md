---
title: O que são as operações consumidas por um cenário?
description: Operação é cada passo que um cenário executa, mais o início; serve para acompanhar o tamanho das execuções e não desconta saldo da carteira.
keywords: [operações cenário, operações consumidas, cenário gasta saldo, custo do cenário, limite de operações, analítico operações]
publico: llm
tipo: faq
fontes:
  - api:src/modules/workflows/workflows.service.ts
  - api:src/modules/workflows/workflow.consumer.ts
  - web:src/pages/settings/workflows/analytics/AnalyticsCore.tsx
codigo:
  - web:src/pages/settings/workflows/**
  - web:src/pages/settings/index.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
  - api:src/modules/workflows/**
verificado_em: 2026-11-26
---

## Pergunta

O que são as operações consumidas por um cenário?

## Resposta

Operação é a contagem de cada passo executado por um cenário, somada ao início da execução: cada vez que o cenário roda, conta **1 operação** ao começar (gatilho) e **+1 operação** para cada passo que executa, inclusive o passo que falha. Passos dentro de um **Loop sobre itens da lista** contam novamente a cada item processado.

Você acompanha o consumo na coluna e no total **Operações** no painel **Analítico** do cenário (acessível com a permissão **Cenários** ou como proprietário; o filtro mostra no máximo os **Últimos 30 dias** de um histórico guardado por 60 dias) e pela variável **Operações consumidas** dentro do próprio cenário.

As operações servem para acompanhar o tamanho das execuções e **não descontam saldo da carteira**. A única ação nos cenários que consome [saldo da carteira](/docs/conceitos/saldo-e-creditos) é o botão **Corrigir e formatar com IA** no corpo da **Requisição HTTP**.

Veja mais em [Acompanhar as execuções no Analítico](/docs/cenarios/execucoes).

## Variações

- cenário gasta saldo da carteira
- quanto custa rodar um cenário na kinbox
- como são contadas as operações do cenário
- o que significa a coluna operações no analítico
- loop conta mais operações no cenário
- operações consumidas têm cobrança adicional
