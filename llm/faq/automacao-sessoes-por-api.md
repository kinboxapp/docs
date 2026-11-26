---
title: Por que a automação não roda em conversas criadas pela API?
description: Sessões abertas pela API ou por integração só disparam os gatilhos Tempo sem nenhuma resposta do membro na sessão nova e Tempo sem nova mensagem com a caixa Habilitar para sessões geradas por API ou Integração marcada, e não disparam os gatilhos de nova sessão.
keywords: [automação api, automação integração, sessão criada pela api, habilitar para sessões geradas por api, automação não roda conversa da api, mensagem enviada pela api automação]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/automations/EditAutomations.tsx
  - api-v0:server/controllers/AutomationEventsController.js
  - api-v0:server/controllers/CallController.js
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

Por que a automação não roda em conversas criadas pela API?

## Resposta

Nos gatilhos **Tempo sem nenhuma resposta do membro na sessão nova** e **Tempo sem nova mensagem**, você precisa marcar a caixa **Habilitar para sessões geradas por API ou Integração** — essa caixa só existe nesses dois gatilhos (se não aparecer na tela, confira o gatilho escolhido). Sem ela marcada, esses dois gatilhos ignoram sessões abertas pela API ou por integrações.

Como funcionam essas sessões:

- **O que é uma sessão de API ou integração:** toda sessão aberta sem um membro, por envio feito pela API ou por integrações que enviam mensagens pela Kinbox. Essa marca fica na sessão e continua valendo mesmo depois que o contato responde.
- **Gatilhos de nova sessão não disparam:** sessões abertas pela API ou por integração não disparam **Nova conversa ou sessão** (só sessão aberta por mensagem do contato) nem **Nova conversa ou sessão iniciada pelo membro** (exige um membro).
- **Outros gatilhos funcionam normalmente:** gatilhos como **Ao resolver uma conversa**, **Ao adicionar tag**, **Ao atribuir membro** e **Ao mover grupo** disparam normalmente quando o evento acontece.

Nos gatilhos de tempo, lembre também que só **uma** automação ligada vale por gatilho de tempo e que "Pode haver atraso de até 3 minutos.". Para conferir ou editar a automação em **Configurações** → **Automação** → **Automações**, é preciso ter a permissão **Automações** ou ser o proprietário do workspace.

Veja o passo a passo em [Criar uma automação](/docs/automacao/configurando-automacoes) e outras causas em [Minha automação não disparou](/docs/automacao/problemas-comuns).

## Variações

- automação não funciona em conversa aberta pela api
- conversa iniciada por integração não dispara automação
- tempo sem nova mensagem não roda quando mando mensagem pela api
- onde habilitar automação para sessões geradas por api ou integração
- nova conversa ou sessão não dispara quando a api abre conversa
- automação ignora atendimento criado por integração
