---
title: Qual é a diferença entre bot, automação, cenário e agente de IA?
description: O bot segue um fluxo de blocos com respostas previstas; o agente de IA conversa com as próprias palavras e gasta saldo; automações reagem a eventos; cenários integram sistemas.
keywords: [bot, agente de ia, automação, cenário, chatbot, diferença, qual usar, inteligência artificial]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/bot/Bot.tsx
  - web:src/pages/settings/agents/index.tsx
  - web:src/pages/settings/bot/drawers/EditNodeLLMDrawer.tsx
  - api:src/modules/agents/agent-bot.service.ts
codigo:
  - web:src/pages/settings/bot/Bot.tsx
  - web:src/pages/settings/bot/panels/MidLeftPanel.tsx
  - web:src/pages/settings/bot/drawers/EditNodeLLMDrawer.tsx
  - web:src/pages/settings/automations/EditAutomations.tsx
  - web:src/pages/settings/workflows/actions/workflow.triggers.defs.ts
  - web:src/pages/agents/onboarding/index.tsx
  - web:src/pages/agents/components/connections/ConnectionPicker.tsx
  - web:src/pages/settings/copilot/index.tsx
  - api:src/modules/agents/agent-bot.service.ts
verificado_em: 2026-11-26
---

## Pergunta

Qual é a diferença entre bot, automação, cenário e agente de IA?

## Resposta

O **Bot** segue um fluxo montado com blocos e respostas previstas, enquanto o **Agente de IA** conversa com o contato com as próprias palavras e gasta saldo da carteira. Já **Automações** reagem a eventos dentro da Kinbox e **Cenários** integram sistemas externos e manipulam dados em passos.

Quando usar cada ferramenta (todas ficam em **Configurações** → **Automação**):

- **Bot**: quando você quer menus fixos, coleta de dados com perguntas definidas e transferência para o time. Só gasta saldo se usar o bloco **Agente de IA**.
- **Agentes de IA**: quando você quer que a IA converse de forma aberta, tire dúvidas com base de conhecimento e execute ações sozinha (como **Transferir para humano**). Cada canal é atendido por um único agente de IA; existe também o **Agente de voz** (**Beta**, para ligações do WhatsApp oficial, que pode não aparecer no workspace).
- **Automações**: quando você quer reagir a eventos e tempos na Kinbox (como tempo sem resposta, ao resolver uma conversa ou ao adicionar tag; os gatilhos por tempo podem atrasar até 3 minutos) para executar ações nos bastidores, como atribuir, enviar mensagem ou executar bot. Não geram débito no saldo (só um bot com o bloco **Agente de IA** executado por elas gasta).
- **Cenários**: quando você quer integrar outro sistema — começar por webhook, campanha, nova sessão ou agendamento cíclico e executar passos sobre contatos, conversas, negócios e produtos, com requisições HTTP e loops. Também não geram débito no saldo sozinhos.

Você pode combinar bot e IA usando o bloco **Agente de IA** dentro de um fluxo de bot (com opção de **Base de conhecimento**). Existe ainda o **Copiloto**, que ajuda o membro a responder, resumir, transcrever e analisar (não atende o contato sozinho e gasta saldo), e a **Atribuição automática**, que distribui conversas entre os membros disponíveis.

Veja a comparação completa em [Bot, automações, cenários e agentes de IA: qual usar](/docs/conceitos/automacao-e-ia).

## Variações

- qual a diferença entre bot e ia na kinbox
- chatbot ou agente de ia qual devo usar
- automação ou cenário qual a diferença
- o bot usa inteligência artificial ou gasta saldo
- preciso de bot se já tenho agente de ia
- o que é cenário na kinbox
- o copiloto responde clientes sozinho
