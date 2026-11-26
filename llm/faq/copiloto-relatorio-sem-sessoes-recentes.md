---
title: Por que o relatório do Copiloto não mostra as sessões de hoje ou as abertas?
description: O relatório do Copiloto só conta sessões resolvidas que o copiloto já analisou, pela data de resolução; períodos passados ficam guardados até a meia-noite e os que incluem hoje atualizam em até 5 minutos.
keywords: [relatório do copiloto vazio, copiloto não mostra sessões, sessões abertas copiloto, análise atrasada, copiloto sem dados, sessões recentes, relatório copiloto desatualizado]
publico: llm
tipo: faq
fontes:
  - web:src/pages/reports/ReportCopilot/index.tsx
  - api:src/modules/reports/session-summary/session-summary.service.ts
codigo:
  - web:src/pages/reports/ReportCopilot/**
  - api:src/modules/reports/session-summary/**
verificado_em: 2026-11-26
---

## Pergunta

Por que o relatório do Copiloto não mostra sessões abertas ou as sessões mais recentes?

## Resposta

O relatório **Copiloto** (**Relatórios** → **Copiloto**) só conta sessões **resolvidas** no período escolhido, pela data de resolução, e só as que o copiloto já analisou para aquela aba. Sessões abertas ou ainda sem análise não entram.

- **Período padrão:** o relatório abre nos últimos 7 dias, **sem hoje**. Para ver as sessões resolvidas hoje, escolha o atalho **Hoje** ou um intervalo que inclua hoje.
- **Atualização:** períodos que incluem hoje atualizam em até 5 minutos. Períodos que já terminaram ficam guardados até a meia-noite, então análises que chegam depois podem aparecer só no dia seguinte.
- **Recurso ligado:** cada aba só aparece e só recebe dados com o recurso correspondente ligado em **Configurações** → **Automação** → **Copiloto** (veja [Analisar conversas com IA](/docs/copiloto/analises-de-ia)).
- **Restrições do papel:** com **Restringir relatórios ao membro** ou **Restringir relatórios aos grupos do membro**, você vê as suas sessões ou as dos seus grupos.

Veja mais em [Relatório do copiloto](/docs/relatorios/copiloto) (precisa da permissão **Gerenciar relatórios**).

## Variações

- relatório do copiloto não mostra a conversa de hoje
- copiloto não analisou as sessões abertas
- por que o relatório do copiloto está vazio
- análise do copiloto não aparece no relatório
- quanto tempo demora para o relatório do copiloto atualizar
