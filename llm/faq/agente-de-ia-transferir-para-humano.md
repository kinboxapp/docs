---
title: Como o agente passa a conversa para um atendente?
description: A conversa passa para um membro pela ferramenta Transferir para humano ou Mover para grupo, pela ação Transferir no fluxograma ou quando um membro escreve uma mensagem comum na conversa.
keywords: [transferir para humano, passar para atendente, tirar agente da conversa, mover para grupo, agente parar de responder, transbordo humano]
publico: llm
tipo: faq
fontes:
  - api:src/modules/agents/tools/assign-operator.ts
  - api:src/modules/agents/flow/actions/assign.action.ts
  - api-v0:server/controllers/CallController.js
  - api-v0:server/modules/chat/auxiliary/sendMessageToClient.js
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

Como o agente passa a conversa para um atendente?

## Resposta

A conversa pode passar do agente de IA de texto para um membro da equipe de três formas: pela ferramenta **Transferir para humano** (ou **Mover para grupo**), pela ação **Transferir** no fluxograma ou quando um membro envia uma mensagem comum na conversa.

- **Ferramentas Transferir para humano e Mover para grupo:** o agente escolhe o membro ou grupo configurado nas condições, registra uma mensagem de sistema e para de responder naquela sessão (só volta em uma [sessão nova](/docs/conceitos/conversas-e-sessoes)). Ao transferir para um membro fora do grupo atual, a conversa sai desse grupo; ao mover para um grupo que não contém o responsável atual, a conversa fica sem responsável.
- **Ação Transferir no fluxograma:** permite transferir por **Membro**, **Grupo**, **Usar atribuição automática**, **Cíclico**, **Cíclico com fila** ou **Último membro que atendeu a conversa**. Transferir para **Membro** ou **Grupo** desliga o agente naquela sessão.
- **Membro escrevendo na conversa:** ao enviar uma mensagem comum para o contato, o agente para de atender e, se a conversa ainda não tinha responsável, o membro passa a ser o responsável. Enviar nota pro time não desliga o agente.

Veja mais em [Ligar o agente aos canais e passar para um humano](/docs/agente-de-ia/conectar-canais) e [Dar ferramentas ao agente](/docs/agente-de-ia/ferramentas).

## Variações

- como fazer o agente de ia transferir para um humano
- o agente para de responder depois que transfere a conversa
- se um membro mandar mensagem o agente de ia desliga
- nota interna tira o agente de ia da conversa
- qual a diferença entre transferir para humano e mover para grupo no agente
- o agente volta a atender depois que transferiu
