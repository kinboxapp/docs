---
title: A Kinbox controla SLA de atendimento?
description: Não. A Kinbox não tem SLA de conversa com prazo máximo de resposta, alerta ou estouro, mas oferece gatilhos de tempo em automações, indicação dinâmica de conversa pendente e relatórios com TME e TMA.
keywords: [sla, sla de atendimento, tempo máximo de resposta, alerta de atraso, fila com tempo máximo, limite de conversas por atendente, tme, tma, conversa sem resposta]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/automations/EditAutomations.tsx
  - web:src/pages/settings/workspace/index.tsx
  - api-v0:server/services/AssignmentService.js
codigo:
  - web:src/pages/settings/automations/**
  - web:src/pages/settings/workspace/**
  - api-v0:server/services/AssignmentService.js
verificado_em: 2026-11-26
---

## Pergunta

A Kinbox controla SLA de atendimento?

## Resposta

Não. A Kinbox não tem uma meta de SLA de resposta por conversa (prazo máximo de resposta com alerta ou estouro). Existe apenas "Prazo de SLA" em negociações nos funis. Também não há limite máximo de conversas por membro nem fila com tempo máximo na atribuição automática (veja [Distribuir as conversas automaticamente](/docs/configuracoes-no-workspace/criar-atribuicoes-automaticas)).

Para acompanhar e reagir à demora na resposta:

- **Automação com gatilho de tempo:** use o gatilho **Tempo sem nenhuma resposta do membro na sessão nova** (campo **Minutos sem resposta**; pode haver atraso de até 3 minutos) para avisar, transferir ou executar outra ação. As automações também têm os gatilhos **Tempo sem nova mensagem** e **Tempo pendente**.
- **Indicação dinâmica de conversa pendente:** em **Configurações** → **Ambiente** → **Geral** (nas configurações gerais do workspace, chamado na tela de **ambiente**), muda a cor do círculo azul quando a conversa passa o tempo configurado em horas sem resposta do membro.
- **Acompanhamento ao vivo:** o mapa de [Atendimento e vendas ao vivo](/docs/relatorios/ao-vivo) pinta cada conversa que espera resposta pelo tempo de espera, com estados de alerta e de atraso, e mostra a contagem de **atrasados** e a **pior espera**.
- **Relatórios de produtividade:** acompanhe TME e TMA em [Relatório de produtividade](/docs/relatorios/produtividade).

## Variações

- a kinbox tem política de sla nas conversas
- dá para configurar alerta quando o cliente fica sem resposta
- existe limite de atendimentos simultâneos por membro
- tem fila de espera com tempo máximo na atribuição automática
- como avisar o gestor se ninguém responder em x minutos
- a kinbox mede tempo médio de resposta e espera
