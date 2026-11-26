---
title: Respostas a stories e menções viram conversa?
description: Sim, por padrão respostas e menções em stories do Instagram entram na Caixa de entrada; você pode ignorar cada uma nas configurações do canal.
keywords: [stories instagram, resposta de story, menção em story, ignorar menções, ignorar resposta de story, direct stories]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/channels/instagram/EditInstagram.tsx
  - web:src/pages/inbox/MessageContent.tsx
  - api-v0:server/controllers/KinboxDirectController.js
codigo:
  - web:src/pages/settings/channels/instagram/**
  - web:src/pages/settings/channels/facebook/**
  - web:src/pages/settings/channels/index.tsx
  - api-v0:server/controllers/KinboxDirectController.js
  - api-v0:server/controllers/IntegrationsController.js
verificado_em: 2026-11-26
---

## Pergunta

Respostas a stories e menções viram conversa?

## Resposta

Sim. Por padrão, respostas aos seus stories e menções em stories de outras pessoas entram como conversa no canal de Instagram na Kinbox: a resposta chega com o story junto do texto, e a menção aparece como o botão `"Você foi mencionado em um Story"`, que abre o story.

Se não quiser que elas criem conversa, abra o canal de Instagram em **Configurações** → **Chat** → **Canais** e ligue:

- **Ignorar resposta de story** ("Não cria conversa se responderem ao seu story")
- **Ignorar menções** ("Não cria conversa ao ser mencionado em um story")

Essas duas opções existem apenas no Instagram (o canal de Facebook não tem opções de stories), valem somente para o que chegar depois de ligá-las (o que for descartado não aparece depois) e não bloqueiam mensagens normais do Direct. Comentários em posts, reels e anúncios não entram na Kinbox.

Veja todas as opções em [Configurações do Instagram e do Facebook](/docs/canais/instagram/configuracoes).

## Variações

- quando alguém me marca no story do instagram abre conversa na kinbox
- como parar de receber menção de story na caixa de entrada
- resposta no meu story do instagram cai no atendimento
- consigo ignorar respostas de stories mas continuar recebendo direct
- tem opção de ignorar stories no canal do facebook
- desliguei ignorar menções as antigas vão aparecer
