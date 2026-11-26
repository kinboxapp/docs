---
title: O cliente vê o que a equipe escreve nas salas?
description: Não. Nada escrito nas Salas ou nas mensagens diretas da Kinbox chega ao cliente nem é enviado por canal, bot ou agente de IA.
keywords: [o cliente vê as salas, cliente lê chat interno, mensagem na sala vai para o cliente, sala é privada, quem vê a sala privada, quem vê mensagem direta, gestor vê mensagem direta, proprietário vê sala privada, diferença sala e nota interna]
publico: llm
tipo: faq
fontes:
  - web:src/components/rooms/rooms.helpers.ts
  - api:src/modules/rooms/rooms.helpers.ts
  - api:src/modules/rooms/rooms.service.ts
  - web:src/components/rooms/RoomView.tsx
codigo:
  - web:src/components/rooms/**
  - web:src/components-old/header/index.tsx
  - api:src/modules/rooms/**
  - api-v0:server/routes/rooms/**
verificado_em: 2026-11-26
---

## Pergunta

O cliente vê o que a equipe escreve nas salas?

## Resposta

Não. Nada escrito nas **Salas** ou nas mensagens diretas da Kinbox chega ao cliente: nenhuma mensagem é enviada por canal (WhatsApp, Instagram, e-mail ou outros), nem passa por bot ou agente de IA.

As mensagens ficam apenas entre os membros do workspace, conforme o tipo de espaço:

- **Sala pública:** todos os membros do workspace que têm acesso às salas (ou seja, sem a restrição **Não pode acessar as salas**).
- **Sala privada:** apenas os membros escolhidos na sala e o proprietário do workspace, que vê todas as salas, inclusive as privadas.
- **Mensagem direta:** na lista, aparece apenas para as duas pessoas, mas o proprietário e quem tem a permissão **Auditar mensagens diretas** podem lê-la em modo somente leitura pela **Auditoria**, exceto as mensagens diretas que envolvem o proprietário.

Se você quiser falar com a equipe **dentro** de uma conversa específica com um cliente (também sem o cliente ver), use as notas internas (**Nota pro time**): veja [Atender uma conversa: responder, notas, resolver e reabrir](/docs/conversas/gerenciar-conversas). A nota interna fica ligada àquele atendimento; a sala é um chat interno separado.

Veja mais em [Salas: o chat interno da equipe](/docs/salas/visao-geral) e [Auditar as mensagens diretas dos membros](/docs/salas/auditar-mensagens-diretas).

## Variações

- o cliente consegue ler o chat interno da kinbox
- mensagem na sala vai pro whatsapp do cliente
- o contato recebe o que a equipe escreve nas salas
- as salas são privadas ou o cliente vê
- meu gestor vê minhas mensagens diretas nas salas
- qual a diferença entre conversar numa sala e mandar nota interna
