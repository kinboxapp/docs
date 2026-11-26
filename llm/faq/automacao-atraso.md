---
title: Por que a automação por tempo dispara alguns minutos depois?
description: Os gatilhos de tempo das automações podem atrasar até 3 minutos, e mensagens agendadas saem em ciclos; a contagem também recomeça ou para conforme as mensagens da conversa.
keywords: [automação atrasada, automação demora, atraso automação, tempo sem nova mensagem atrasou, automação não respeitou o tempo, minutos sem resposta, agendar mensagem atrasou]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/automations/EditAutomations.tsx
  - api-v0:server/controllers/AutomationEventsController.js
  - api-v0:server/modules/scheduler/schedulerManager.js
codigo:
  - web:src/pages/settings/automations/**
  - web:src/components-old/forms/ActionsInput/**
  - web:src/components-old/forms/ConditionsInput/**
  - web:src/pages/settings/index.tsx
  - api-v0:server/controllers/AutomationController.js
  - api-v0:server/controllers/AutomationEventsController.js
  - api-v0:server/modules/EventsEnum.js
verificado_em: 2026-11-26
---

## Pergunta

Por que a automação por tempo dispara alguns minutos depois?

## Resposta

Os gatilhos de tempo das automações podem atrasar até 3 minutos — a própria tela avisa `"Pode haver atraso de até 3 minutos."` abaixo do campo de minutos.

Além disso, os envios agendados acontecem em ciclos:

- **Agendar mensagem** e **Agendar mensagem template**: saem em ciclos de até 3 minutos.
- **Agendar execução de bot** (só conversas de WhatsApp) e **Enviar mensagem** com **Canal** escolhido (o campo não lista os canais do WhatsApp oficial (API)): saem em ciclos de até 30 segundos.
- **Tempo sem conversa ao criar contato**: verificado a cada minuto.

Quando um gatilho de tempo dispara uma ação agendada, as duas esperas podem se somar: o atraso do gatilho e o ciclo do envio agendado. Por isso, o disparo não ocorre no segundo exato.

Outros comportamentos que podem parecer atraso na contagem:

- **Tempo sem nova mensagem:** recomeça a contagem a cada nova mensagem enviada pelo contato ou por um membro (e dispara apenas uma vez por sessão).
- **Tempo sem nenhuma resposta do membro na sessão nova** e **Tempo pendente:** param a contagem assim que um membro responde (e não contam em sessões iniciadas pelo membro).
- **Tempo para expirar a Janela de 24h** (apenas WhatsApp oficial): conta a partir da última mensagem do contato e recomeça quando ele envia outra mensagem.
- **Condições e resolução:** nos gatilhos de tempo, as condições são conferidas na hora de disparar (não quando a contagem começa), e resolver a conversa para as contagens de tempo daquela conversa.

Se a automação nunca disparou em vez de apenas atrasar, confira se há outra automação ligada usando o mesmo gatilho de tempo: só **uma** automação ligada vale por gatilho de tempo (a primeira elegível pela ordem do nome; em sessões abertas pela API ou por integração, nos gatilhos **Tempo sem nenhuma resposta do membro na sessão nova** e **Tempo sem nova mensagem**, a primeira com a caixa **Habilitar para sessões geradas por API ou Integração** marcada). Nos gatilhos **Tempo sem nenhuma resposta do membro na sessão nova** e **Tempo sem nova mensagem**, confira também se a sessão foi aberta pela API ou por integração e se a caixa **Habilitar para sessões geradas por API ou Integração** está marcada (ela só existe nesses dois gatilhos). Ver e editar automações em **Configurações** → **Automação** → **Automações** exige a permissão **Automações** ou ser o proprietário.

Veja mais em [Minha automação não disparou](/docs/automacao/problemas-comuns) e [Gatilhos, condições e ações das automações](/docs/automacao/gatilhos-e-acoes).

## Variações

- automação atrasando para enviar mensagem
- tempo sem nova mensagem não respeitou os minutos
- por que a automação demorou mais tempo do que configurei
- mensagem agendada na automação saiu atrasada
- minutos sem resposta passou do tempo e só disparou depois
- automação por tempo não dispara na hora exata
