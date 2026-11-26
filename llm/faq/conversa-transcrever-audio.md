---
title: Dá para transcrever um áudio do cliente?
description: Sim, pelo menu da mensagem de áudio em Transcrever; usa saldo da carteira do workspace, aceita áudios de até 1 MB.
keywords: [transcrever áudio, áudio para texto, transformar áudio em texto, transcrição na conversa, limite 1 mb áudio]
publico: llm
tipo: faq
fontes:
  - web:src/pages/inbox/Message.tsx
  - api:src/modules/assist/assist.service.ts
codigo:
  - web:src/pages/inbox/Message.tsx
  - web:src/pages/inbox/MessageDrop.tsx
  - api:src/modules/assist/**
verificado_em: 2026-11-26
---

## Pergunta

Dá para transcrever um áudio do cliente?

## Resposta

Sim: abra o menu da mensagem de áudio e clique em **Transcrever**. O texto transcrito aparece na própria conversa.

Algumas regras:

- A transcrição usa o saldo da carteira do workspace.
- O limite é de **1 MB** por arquivo de áudio (acima disso aparece "O tamanho do arquivo de áudio excede o limite de 1 MB").
- A restrição **Não pode transcrever áudio** esconde o botão **Transcrever áudio** que fica ao lado do áudio.

Veja mais em [Atender uma conversa](/docs/conversas/gerenciar-conversas).

## Variações

- como transformar mensagem de voz em texto na kinbox
- tem transcrição de áudio do whatsapp na caixa de entrada
- por que o botão transcrever não aparece no áudio
- qual o tamanho máximo de áudio para transcrever
- consigo ler o áudio do cliente sem ouvir
