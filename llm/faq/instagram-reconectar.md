---
title: Como reconecto o Instagram ou o Facebook?
description: Não existe botão de reconectar; exclua o canal e conecte a mesma página novamente em Novo canal para o canal voltar com as conversas.
keywords: [reconectar instagram, reconectar facebook, canal desconectado, página desativada, necessita ser reconectado, excluir e conectar de novo]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/channels/facebook/AddMetaChannel.tsx
  - web:src/pages/settings/channels/instagram/EditInstagram.tsx
  - web:src/pages/settings/channels/facebook/EditFacebook.tsx
  - api-v0:server/controllers/IntegrationsController.js
codigo:
  - web:src/pages/settings/channels/facebook/**
  - web:src/pages/settings/channels/instagram/**
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/inbox/Message.tsx
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/controllers/KinboxDirectController.js
  - api-v0:server/controllers/MessengerController.js
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/modules/scheduler/facebookScheduler.js
  - api-v0:server/modules/accessRestriction/**
verificado_em: 2026-11-26
---

## Pergunta

Como reconecto o Instagram ou o Facebook?

## Resposta

Não existe um botão de reconectar para os canais de Instagram e de Facebook na Kinbox, e a página já conectada aparece desativada na lista de conexão. Isso é necessário quando o canal fica **Desconectado** ou quando uma mensagem falha avisando que o canal precisa ser reconectado.

Para reconectar:

1. Em **Configurações** → **Chat** → **Canais**, abra o menu de três pontos do canal e clique em **Excluir**.
2. Clique em **Novo canal**, escolha **Instagram** ou **Facebook** e conecte a mesma página novamente.
3. Abra o canal reconectado e confira os grupos de **Restringir visibilidade**, porque a lista de grupos volta vazia.

O mesmo canal volta ativo e **Conectado**, com as conversas antigas (excluir não apaga as conversas). Se a nova conexão falhar depois de excluir, as conversas continuam guardadas e você pode tentar de novo.

Excluir e adicionar canais exige a permissão **Gerenciar Canais** ou ser o proprietário do workspace, sem a restrição **Somente pode dar manutenção simples em canais** (que oculta **Novo canal** e **Excluir**). No Instagram, a conexão passa pela checagem de limite do plano, mas o canal excluído não entra na contagem de canais ativos.

Veja mais em [O Instagram ou o Facebook não conecta ou desconectou](/docs/canais/instagram/problemas-comuns).

## Variações

- meu instagram desconectou na kinbox como reconectar
- onde fica o botão de reconectar do facebook messenger
- a página do facebook aparece apagada na hora de reconectar
- se eu excluir o canal de instagram para reconectar perco as conversas
- apareceu seu canal de facebook necessita ser reconectado o que faço
- canal do instagram desconectado não consigo clicar na página de novo
