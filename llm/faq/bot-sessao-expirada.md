---
title: O que acontece quando a sessão do bot expira?
description: Sem bot de destino, a Kinbox envia a Mensagem ao expirar e resolve a sessão; com Executar bot ao expirar, inicia o outro bot na mesma sessão sem enviar a mensagem nem resolver.
keywords: [expirar sessão do bot, sessão expirou e foi finalizada, mensagem ao expirar, executar bot ao expirar, tempo limite do bot, bot encerra por inatividade]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/bot/EditBotSettings.tsx
  - api-v0:server/modules/chat/botFlowV2.js
  - api-v0:server/modules/scheduler/callExpirationScheduler.js
codigo:
  - web:src/pages/settings/bot/Bot.tsx
  - web:src/pages/settings/bot/EditBot.tsx
  - web:src/pages/settings/bot/EditBotSettings.tsx
  - web:src/pages/settings/bot/panels/**
  - web:src/pages/settings/bot/helpers/pathTester.ts
  - web:src/pages/settings/bot/run/**
  - web:src/pages/inbox/ChatHeader/index.tsx
  - api-v0:server/controllers/BotController.js
  - api-v0:server/modules/chat/chatBotHandler.js
  - api-v0:server/modules/scheduler/callExpirationScheduler.js
verificado_em: 2026-11-26
---

## Pergunta

O que acontece quando a sessão do bot expira?

## Resposta

O comportamento depende do que você configurou em **Expirar Sessão** nas **Configurações do bot**:

- **Com Executar bot ao expirar preenchido:** a Kinbox inicia o bot escolhido na mesma sessão; a sessão não é resolvida e a **Mensagem ao expirar** não é enviada.
- **Sem bot de destino e com Mensagem ao expirar preenchida:** a Kinbox envia a **Mensagem ao expirar** ao contato e, cerca de 2 segundos depois, resolve a sessão com o aviso `"Essa sessão expirou e foi finalizada"`.
- **Sem bot de destino e sem mensagem:** a Kinbox apenas resolve a sessão com o aviso `"Essa sessão expirou e foi finalizada"`.

Como o prazo funciona:

- A contagem começa quando o bot inicia, zera quando o contato responde e recomeça a cada mensagem que o bot envia — ou seja, mede o tempo sem resposta desde a última mensagem do bot.
- Só vale enquanto o bot está ativo na conversa: se um membro enviar mensagem, o prazo é removido. Com horas e minutos zerados, a sessão não expira pelo bot.
- A verificação roda a cada minuto, então a expiração pode acontecer até cerca de 1 minuto após o prazo configurado.
- Os blocos **Entrada de dados** e **Agente de IA** não têm tempo limite próprio e dependem de **Expirar Sessão** para encerrar se o contato parar de responder (enquanto **Menu** e **Esperar um tempo** têm opções próprias de espera de até 7 dias). Veja [Criar e publicar um bot](/docs/bot/aprender-a-usar-o-bot) e [Blocos do bot](/docs/bot/blocos-do-bot).

**Expirar Sessão** vale apenas enquanto o bot está atendendo; para encerrar por inatividade conversas que estão sem bot, use uma automação em **Configurações** → **Automação** → **Automações**.

## Variações

- o bot resolve a conversa sozinho quando o cliente não responde
- configurei mensagem ao expirar e executar bot ao expirar mas a mensagem não foi enviada
- quanto tempo demora para a sessão do bot expirar
- entrada de dados ou agente de ia no bot tem tempo limite de resposta
- por que apareceu essa sessão expirou e foi finalizada na conversa
- qual a diferença entre expirar sessão no bot e encerrar por inatividade na automação
