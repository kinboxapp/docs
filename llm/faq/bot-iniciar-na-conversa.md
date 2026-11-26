---
title: Como inicio um bot numa conversa aberta?
description: Abra Mais ações no cabeçalho da conversa, clique em Executar bot e escolha o bot desejado (requer permissão Iniciar Bot e roda mesmo se o bot estiver desligado).
keywords: [executar bot, iniciar bot manualmente, rodar bot na conversa, testar bot desligado, atendimento manual, parar bot na conversa, reabrir conversa no bot]
publico: llm
tipo: faq
fontes:
  - web:src/pages/inbox/ChatHeader/index.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
  - api-v0:server/controllers/CallController.js
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

Como inicio um bot numa conversa aberta?

## Resposta

Abra a conversa na **Caixa de entrada**, clique em **Mais ações** (ícone de três pontos no cabeçalho), selecione **Executar bot** e escolha o nome do bot desejado (veja [Atender uma conversa](/docs/conversas/gerenciar-conversas) e [Criar e publicar um bot](/docs/bot/aprender-a-usar-o-bot)).

O que você precisa saber sobre essa ação:

- **Permissão:** exige a permissão **Iniciar Bot** (na seção **Conversas**) ou ser proprietário do workspace. Sem essa permissão, aparece o aviso `"Você não tem permissão para iniciar bots."`.
- **Roda mesmo desligado:** **Executar bot** lista todos os bots do workspace e executa o bot escolhido mesmo se ele estiver desligado, ignorando canais e horários configurados nele — o que permite testar um bot em uma conversa real antes de ligá-lo. A conversa registra `"Atendente {membro} executou o bot {bot}"`.
- **Sessão resolvida:** o bot roda na última sessão da conversa; se ela estiver resolvida, o bot só reabre a conversa se a opção **Reabrir conversa** estiver ligada em **Configurações do bot**.
- **Como parar o bot:** clique em **Mais ações** → **Executar bot** → **Atendimento manual** (ou envie uma mensagem comum na conversa).
- **Restrição de canal:** em conversas do Mercado Livre, a opção **Executar bot** fica desativada.
- **Outros disparos:** automações, cenários, ações em lote de funil e agentes de IA também podem iniciar um bot em uma conversa aberta, mesmo com o bot desligado.

## Variações

- como rodar um bot manualmente em um atendimento já aberto
- dá para testar um bot desligado em uma conversa real
- por que não consigo clicar em executar bot na conversa
- como parar um bot que está respondendo uma conversa
- executar bot reabre uma conversa que já foi resolvida
- por que executar bot fica desativado na conversa do mercado livre
