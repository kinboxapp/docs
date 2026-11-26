---
title: Dá para usar ChatGPT ou outra IA para responder os clientes?
description: Sim; o agente de IA da Kinbox já usa modelos de IA de mercado escolhidos em Configurações → Modelo (ou o padrão da Kinbox), sem precisar nem permitir conectar conta ou chave própria.
keywords: [chatgpt na kinbox, integrar chatgpt, usar minha chave de ia, escolher modelo de ia, ia para responder clientes, modelo llm]
publico: llm
tipo: faq
fontes:
  - web:src/pages/agents/components/EditAgentSettings.tsx
  - web:src/pages/agents/components/AgentModelSelect.tsx
  - api:src/modules/agents/agent.runner.ts
codigo:
  - web:src/pages/settings/agents/**
  - web:src/pages/agents/EditAgentCore.tsx
  - web:src/pages/agents/onboarding/index.tsx
  - api:src/modules/agents/agent-bot.service.ts
  - api:src/modules/agents/agent.runner.ts
verificado_em: 2026-11-26
---

## Pergunta

Dá para usar ChatGPT ou outra IA para responder os clientes?

## Resposta

Sim, por meio dos **Agentes de IA** da própria Kinbox, que já utilizam modelos de IA de mercado sem precisar de conta externa. Nas **Configurações** do agente de texto, no campo **Modelo**, você escolhe entre os modelos liberados pela Kinbox (cada opção mostra a faixa de custo relativo **$**, **$$** ou **$$$**) ou deixa em branco para usar o modelo padrão.

Não há campo para informar uma conta ou chave própria de outro serviço de IA — o uso é sempre cobrado diretamente do [saldo da carteira](/docs/conceitos/saldo-e-creditos) na Kinbox.

Veja como começar em [Agentes de IA: visão geral](/docs/agente-de-ia/visao-geral) e [Criar um agente de IA](/docs/agente-de-ia/criando-seu-agente-de-ia).

## Variações

- como conectar o chatgpt na kinbox
- posso usar minha própria chave de api de ia no agente
- a kinbox tem integração com chatgpt para atender no whatsapp
- dá para escolher qual modelo de ia o agente usa
- preciso pagar uma assinatura externa de ia além da kinbox
