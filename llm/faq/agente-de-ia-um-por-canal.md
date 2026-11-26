---
title: Posso ter dois agentes no mesmo canal?
description: Não; cada canal tem um único agente de texto para as mensagens; no WhatsApp oficial com ligações, um agente de voz à parte atende as ligações. Para comportamentos diferentes, você pode usar um agente com Subagente ou Executar outro agente no fluxograma, ou chamar agentes dentro de um bot.
keywords: [dois agentes mesmo canal, varios agentes no whatsapp, um agente de texto por canal, agente de voz, mover canal de agente, agente e bot mesmo canal, subagente]
publico: llm
tipo: faq
fontes:
  - web:src/pages/agents/components/connections/ConnectionPicker.tsx
  - api:src/modules/agents/agents.service.ts
  - api-v0:server/modules/chat/chatBotHandler.js
codigo:
  - web:src/pages/agents/components/connections/**
  - web:src/pages/inbox/AgentExecution/**
  - web:src/pages/inbox/ChatHeader/AgentFloating.tsx
  - api:src/modules/agents/agents.service.ts
  - api:src/modules/agents/agent-bot.service.ts
  - api-v0:server/modules/chat/chatBotHandler.js
  - api-v0:server/modules/chat/auxiliary/sendMessageByClient.js
  - api-v0:server/modules/chat/auxiliary/sendMessageToClient.js
verificado_em: 2026-11-26
---

## Pergunta

Posso ter dois agentes no mesmo canal?

## Resposta

Não para as mensagens: cada canal tem um único agente de texto — ao conectar um canal que já está em outro agente de texto, a Kinbox abre a confirmação **Mover canal de agente** e desconecta o canal do primeiro agente. As ligações são separadas: o mesmo número de WhatsApp oficial pode ter um agente de texto para as mensagens e um [agente de voz](/docs/agente-de-ia/agente-de-voz) para as ligações (um agente de voz por número).

Se você precisa de comportamentos diferentes no mesmo canal, existem três caminhos:

- Usar um único agente de texto com o [Fluxograma](/docs/agente-de-ia/fluxograma-e-etapas), dividindo o atendimento em blocos de **Subagente** ou chamando o fluxo de outro agente com **Executar outro agente**.
- Em agentes que já possuem etapas configuradas, usar **Etapas** para alternar instruções, conhecimento e ferramentas.
- Montar um fluxo em **Bot** e chamar agentes diferentes pelo bloco **Agente de IA** conforme a escolha do contato.

Atenção: ter um bot comum e um agente de IA ativos no mesmo canal não divide o atendimento entre eles — em cada sessão nova, entra apenas o primeiro bot ativo da lista de bots cujas condições batam com o canal.

Veja mais em [Ligar o agente aos canais e passar para um humano](/docs/agente-de-ia/conectar-canais).

## Variações

- dá para conectar dois agentes de ia no mesmo whatsapp
- posso usar mais de um agente no mesmo canal
- o que acontece se eu conectar um canal que já tem outro agente
- como colocar dois agentes diferentes para atender no mesmo número
- bot e agente de ia funcionam juntos no mesmo canal
