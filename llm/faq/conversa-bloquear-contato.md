---
title: Como bloqueio um contato?
description: Abra a conversa e clique em Mais ações → Bloquear; a Kinbox deixa de receber mensagens desse contato naquele canal e você pode desbloquear pelo mesmo menu.
keywords: [bloquear contato, bloquear conversa, desbloquear contato, spam, parar de receber mensagens]
publico: llm
tipo: faq
fontes:
  - web:src/pages/inbox/ChatHeader/index.tsx
  - api-v0:server/controllers/CallController.js
  - api-v0:server/modules/chat/auxiliary/sendMessageByClient.js
codigo:
  - web:src/pages/inbox/ChatHeader/index.tsx
  - api-v0:server/controllers/CallController.js
verificado_em: 2026-11-26
---

## Pergunta

Como bloqueio um contato?

## Resposta

Abra a conversa do contato, clique em **Mais ações** (três pontos no cabeçalho) → **Bloquear** e confirme.

O bloqueio vale **por canal**: a Kinbox passa a descartar novas mensagens recebidas desse contato naquele canal e exibe o ícone **Bloqueado** no cabeçalho da conversa. Para voltar a receber mensagens depois, abra **Mais ações** → **Desbloquear** e confirme.

Membros com a restrição **Não pode bloquear conversa** não conseguem usar esta opção. Veja mais em [Atender uma conversa](/docs/conversas/gerenciar-conversas).

## Variações

- como bloquear um número ou cliente na kinbox
- quero parar de receber mensagens de spam de um contato
- onde desbloqueio um contato que foi bloqueado
- bloquear contato vale para todos os canais
- botão bloquear conversa está desativado
