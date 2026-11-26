---
title: Quanto o agente de IA gasta?
description: O agente de IA de texto consome saldo da carteira a cada resposta, no processamento do conhecimento e na escolha de etapa, enquanto o agente de voz consome por minuto de ligação (ou da franquia do plano).
keywords: [quanto custa agente de ia, custo agente de ia, saldo agente de ia, preço ia kinbox, gasto carteira, saldo insuficiente, teste gasta saldo, custo agente de voz]
publico: llm
tipo: faq
fontes:
  - api:src/modules/agents/agent.runner.ts
  - api:src/modules/knowledges/knowledges.service.ts
  - api:src/modules/whatsapp-calling/whatsapp-call-ai.service.ts
codigo:
  - web:src/pages/settings/agents/**
  - web:src/pages/agents/EditAgentCore.tsx
  - web:src/pages/agents/onboarding/index.tsx
  - api:src/modules/agents/agent-bot.service.ts
  - api:src/modules/agents/agent.runner.ts
verificado_em: 2026-11-26
---

## Pergunta

Quanto o agente de IA gasta?

## Resposta

O agente de IA de texto gasta saldo da carteira a cada resposta (inclusive no processamento do conhecimento e na escolha de etapa em agentes com etapas), e o agente de voz gasta por minuto em que fica na ligação (arredondado para cima, mínimo de 1 minuto, ou descontando da franquia de minutos de IA do plano de **Ligações WhatsApp** quando incluída; a franquia cobre só a voz padrão, e fora dela a ligação usa o saldo da carteira).

- **Saldo mínimo:** no agente de texto, quando o saldo da carteira chega a **R$ 1,00 ou menos**, o agente para de responder (no agente de voz sem franquia disponível, o mínimo é acima de **R$ 0,50**, com aviso 30 segundos antes de encerrar a ligação se o saldo acabar).
- **Agente gerenciado pelo parceiro:** os gastos podem sair da carteira do parceiro em vez da carteira do workspace; com a carteira do parceiro em R$ 1,00 ou menos, o agente para mesmo com saldo no workspace.
- **Testes:** o chat de teste por texto no editor também consome saldo como uma resposta real; já o **Testar por voz** do agente de voz não cobra.
- **Cortesia e acompanhamento:** workspaces novos começam com um saldo de cortesia para testar. Você acompanha os débitos em **Relatórios** → **Saldo** (categoria **Agente de IA** para respostas e processamento de conhecimento, e categoria **Voz e áudio** para ligações atendidas por IA).

Para colocar saldo, veja [Adicionar saldo e créditos de SMS](/docs/assinatura/adicionar-saldo). Veja mais em [Agentes de IA: visão geral](/docs/agente-de-ia/visao-geral) e [Saldo da carteira e créditos: o que consome](/docs/conceitos/saldo-e-creditos).

## Variações

- qual o preço do agente de ia na kinbox
- o agente de ia consome saldo da carteira
- testar o agente no editor gasta saldo
- com quanto de saldo o agente para de responder
- subir conhecimento para o agente de ia tem custo
- como funciona a cobrança do agente de voz
- onde vejo quanto meu agente de ia gastou
