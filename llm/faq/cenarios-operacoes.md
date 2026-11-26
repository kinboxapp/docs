---
title: O que são as operações consumidas por um cenário?
description: Operação é a contagem dos passos que um cenário executa; serve para acompanhar o tamanho das execuções e não desconta saldo da carteira.
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

Operação é a contagem dos passos que uma execução do cenário roda. Uma execução concluída registra **1 operação por passo executado**. Se um passo falhar, a execução registra os passos que rodaram (incluindo o que falhou) **mais 1**. Passos dentro de um **Loop sobre itens da lista** contam novamente a cada item processado.

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
