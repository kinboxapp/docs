---
title: A IA consegue avaliar a qualidade do atendimento?
description: Sim, usando os Avaliadores do copiloto, que trazem modelos prontos de qualidade (Nota do atendimento, Problema resolvido? e Pontos a melhorar) e permitem criar avaliações próprias.
keywords: [ia dá nota para o atendente, avaliar qualidade do atendimento automaticamente, auditoria de atendimento com ia, nota automática por conversa, monitorar atendimento com inteligência artificial, a ia avalia meus atendentes]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/copilot/evaluators/evaluatorTemplates.ts
  - web:src/pages/settings/copilot/evaluators/EvaluatorEditorModal.tsx
  - api:src/modules/signals/evaluators.ts
  - api:src/modules/signals/signals.service.ts
codigo:
  - web:src/pages/settings/copilot/SentimentSettings.tsx
  - web:src/pages/settings/copilot/evaluators/**
  - web:src/pages/settings/copilot/IntentSettings.tsx
  - web:src/pages/settings/copilot/LeadSettings.tsx
  - web:src/pages/settings/copilot/StuckSettings.tsx
  - web:src/lib/signals.ts
  - web:src/hooks/useSessionSignals.ts
  - web:src/components-old/chat/side/SessionInfoPlugin/SignalFields.tsx
  - web:src/components-old/inbox/ConversationItem/SignalBadges.tsx
  - web:src/pages/reports/ReportCopilot/**
  - api:src/modules/signals/**
  - api:src/modules/wallet/micro-debit.service.ts
verificado_em: 2026-11-26
---

## Pergunta

A IA consegue avaliar a qualidade do atendimento?

## Resposta

Sim, com a função **Avaliadores** do copiloto, que lê a conversa e salva o resultado em um campo personalizado (da sessão ou do contato) ou aplica tags. Ela já traz três modelos prontos de qualidade do atendimento — **Nota do atendimento** (nota de 0 a 10 ao resolver), **Problema resolvido?** (sim/não ao resolver) e **Pontos a melhorar** (seleção múltipla ao resolver) —, além de permitir criar avaliadores em branco com a sua própria pergunta (até 1.000 caracteres) para rodar **No início da conversa**, **A cada mensagem** ou **Ao resolver**.

- **Condições:** alguém com a permissão **Copiloto** (ou o proprietário do workspace) precisa adicionar e salvar **Avaliadores** em **Configurações** → **Automação** → **Copiloto** (até 10 avaliadores por workspace). A conversa precisa estar em **Onde o copiloto atua** e o workspace precisa de saldo na carteira acima de R$ 0,20 (aparece no extrato como `"Avaliadores do copiloto"`).
- **Onde ver:** campos de sessão aparecem no cartão **Sessão** da conversa, campos de contato ficam no cadastro do contato e, com os modelos prontos de qualidade ligados salvando em campo, os resultados também aparecem em **Relatórios** → **Copiloto** → aba **Qualidade** ([Relatório do copiloto](/docs/relatorios/copiloto), para quem tem **Gerenciar relatórios**).
- **Limites:** avaliadores **Ao resolver** leem as últimas **20 mensagens** da sessão (em atendimentos muito longos, o começo fica de fora), e campos de seleção ou sim/não não são preenchidos quando o copiloto não tem certeza suficiente.
- **Outros recursos que apoiam a qualidade:** **Análise de sentimento** acompanha como o contato se sente durante a conversa, enquanto **Revisor de mensagens** e **Aviso ao resolver** alertam o membro antes de enviar ou encerrar.
- **Diferença para a pesquisa de satisfação:** os avaliadores são preenchidos pela IA com base no histórico; se você quiser que o próprio contato dê uma nota no fim do atendimento, use [Pedir avaliação no fim do atendimento](/docs/atendimento/pesquisa-de-satisfacao).

Veja como configurar passo a passo em [Analisar conversas com IA: sentimento, avaliadores, intenções e lead score](/docs/copiloto/analises-de-ia).

## Variações

- ia dá nota para o atendente
- avaliar qualidade do atendimento automaticamente
- auditoria de atendimento com ia
- nota automática por conversa
- monitorar atendimento com inteligência artificial
- a ia avalia meus atendentes
