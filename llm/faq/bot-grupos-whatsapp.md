---
title: O bot responde em grupos de WhatsApp?
description: Sim, se Atende grupos do WhatsApp estiver ligado no bot e o canal de WhatsApp por QR Code estiver em Canais que atende com o grupo ativado em Permitir Grupos de WhatsApp.
keywords: [bot em grupo, bot grupo whatsapp, atende grupos do whatsapp, permitir grupos de whatsapp, bot respondeu no grupo, atende todos os canais grupo, chatbot, robô]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/bot/EditBotSettings.tsx
  - api-v0:server/modules/chat/chatBotHandler.js
  - web:src/pages/settings/channels/whatsapp/WhatsappGroups.tsx
  - api-v0:server/modules/chat/auxiliary/sendMessageByClient.js
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

O bot responde em grupos de WhatsApp?

## Resposta

Sim, se o bot tiver **Atende grupos do WhatsApp** ligado em **Configurações do bot** e o grupo pertencer a um canal selecionado em **Canais que atende**.

Para funcionar, o canal de WhatsApp por QR Code também precisa estar com **Permitir Grupos de WhatsApp** ativado e o grupo selecionado nas configurações do canal (veja [Configurações do WhatsApp por QR Code](/docs/canais/whatsapp/whatsapp-app/configuracoes)). O WhatsApp oficial não tem grupos (veja [Qual WhatsApp usar: oficial ou QR Code](/docs/canais/whatsapp/visao-geral)).

Atenção a estas regras:

- **Quando Atende todos os canais está ligado:** o bot começa também em grupos de WhatsApp mesmo com **Atende grupos do WhatsApp** desligado (e também fora dos **Horários**). Para impedir o bot de responder em grupos — ou para escolher em quais canais ele entra — desligue **Atende todos os canais**, selecione os canais em **Canais que atende** e ajuste **Atende grupos do WhatsApp** (veja [Criar e publicar um bot](/docs/bot/aprender-a-usar-o-bot) e [O bot não ativa, travou ou repete mensagens](/docs/bot/problemas-comuns)).
- **Quando o bot inicia:** assim como nas conversas individuais, o bot só começa sozinho quando uma nova sessão é aberta no grupo, com o bot ligado e sendo o primeiro bot ativo da lista que serve ao canal.
- **Agente de IA direto no canal:** um agente de IA conectado diretamente ao canal não atende grupos de WhatsApp (veja [Ligar o agente aos canais e passar para um humano](/docs/agente-de-ia/conectar-canais)).

## Variações

- consigo colocar o bot para responder em grupo do whatsapp
- por que o bot respondeu no meu grupo de whatsapp se eu não ativei
- como desativar o bot nos grupos de whatsapp
- bot funciona em grupo no whatsapp oficial
- ativei grupos no whatsapp mas o bot não inicia no grupo
- bot responde em grupo quando atende todos os canais está ligado
