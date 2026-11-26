---
title: O que o cliente recebe fora do horário de atendimento?
description: A Kinbox só envia resposta automática fora do horário se você configurar a Mensagem quando fora do horário comercial em Geral, um bot com horário ou uma automação com a condição Horário.
keywords: [mensagem fora do horário, resposta automática fora do horário, mensagem de ausência, atendimento fora do expediente, mensagem quando fora do horário comercial, bot fora do horário]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/workspace/index.tsx
  - api-v0:server/controllers/EventsController.js
  - api-v0:server/modules/chat/auxiliary/sendMessageByClient.js
codigo:
  - web:src/pages/settings/workspace/**
  - api-v0:server/controllers/EventsController.js
  - api-v0:server/modules/chat/auxiliary/sendMessageByClient.js
verificado_em: 2026-11-26
---

## Pergunta

O que o cliente recebe fora do horário de atendimento?

## Resposta

Só recebe uma resposta automática se você configurar uma: a Kinbox não responde sozinha fora do horário.

Existem três caminhos para avisar o contato:

- **Mensagem quando fora do horário comercial:** em **Configurações** → **Ambiente** → **Geral**, cartão **Caixa de Entrada** (nas configurações gerais do workspace, chamado na tela de **ambiente**; acessível ao proprietário ou a quem tem a opção **Workspace** na seção **Gerenciamento do Ambiente** do papel, na tela **Permissão**). Ela envia um texto automaticamente quando o contato manda mensagem fora do horário comercial padrão, mas só funciona com um **Horário comercial** escolhido em **Geral**, só sai em conversas que já têm um membro responsável (inclusive quando uma regra ligada de atribuição automática atribui um membro na primeira mensagem da sessão nova; conversas sem responsável ou só com grupo não recebem) e sai a cada mensagem do contato fora do horário.
- **Bot com horário:** configure o campo **Horários** do bot (essa opção não vale com **Atende todos os canais**) ou use o bloco **Decisão** com a condição **Horário** ("está fora de"). Essa opção responde também conversas sem responsável.
- **Automação com condição Horário:** use uma automação com a condição **Horário** para responder fora do expediente.

No mesmo cartão **Caixa de Entrada**, existe ainda **Mensagem quando membro indisponível** (também só em conversa com responsável e a cada mensagem); quando as duas condições acontecem juntas, **Mensagem quando fora do horário comercial** tem prioridade.

Veja mais em [Definir os horários de atendimento](/docs/configuracoes-no-workspace/criar-e-gerenciar-horarios), [Criar e publicar um bot](/docs/bot/aprender-a-usar-o-bot) e [Blocos do bot](/docs/bot/blocos-do-bot).

## Variações

- a kinbox manda mensagem automática fora do expediente
- como configurar mensagem de ausência fora do horário comercial
- por que o cliente não recebeu a mensagem de fora do horário
- por que a mensagem de fora do horário foi enviada várias vezes
- conversa sem atendente recebe mensagem de fora do horário
- como mandar aviso de fora do horário pelo bot
