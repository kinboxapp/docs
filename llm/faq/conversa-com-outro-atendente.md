---
title: Por que não consigo responder um contato que está com outra pessoa?
description: Depende das restrições do seu papel (como responder apenas suas conversas, esconder mensagens não atribuídas ou restrições de chat ativo); peça a atribuição da conversa ou ajuste do papel.
keywords: [conversa com outro atendente, não consigo responder conversa de outro, em atendimento, responder apenas conversas dele, aceitar conversa, atribuído a outro membro]
publico: llm
tipo: faq
fontes:
  - web:src/pages/inbox/ChatTextEditorPure.tsx
  - web:src/pages/inbox/Chat/index.tsx
  - web:src/components-old/inbox/NewMessageModal/index.tsx
codigo:
  - web:src/pages/inbox/ChatTextEditorPure.tsx
  - web:src/pages/inbox/Chat/index.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
verificado_em: 2026-11-26
---

## Pergunta

Por que não consigo responder um contato que está com outra pessoa?

## Resposta

Isso acontece por causa de restrições configuradas no seu papel (o proprietário do workspace não sofre essas restrições). As causas mais comuns são:

- **Responder apenas conversas dele:** ao tentar enviar, aparece "Você não possui permissão para enviar essa mensagem.".
- **Esconder mensagens se não atribuído.** ou **Esconder mensagens se não atribuído, com botão de aceitar.:** a tela oculta o histórico com "Necessário ser atribuído à conversa para visualizar as mensagens". Mesmo quando aparece o botão **Aceitar conversa**, ele só funciona se ninguém estiver atendendo (caso contrário, exibe "Já existe um membro atendendo esse contato.").
- **Restrições de chat ativo no Enviar mensagem:** bloqueiam iniciar conversa quando o número ou o contato já está em atendimento com outro membro, exibindo "{número} - Em atendimento" ou "{número} - Em atendimento com {nome}".

Para resolver, peça a alguém com a permissão **Atribuir** para passar a conversa para você (veja [Atribuir, mover para um grupo ou transferir uma conversa](/docs/conversas/atribuir-e-transferir)), clique em **Aceitar conversa** quando a conversa estiver sem responsável, ou peça ao administrador do workspace para ajustar as permissões do seu papel. Consulte também [Não consigo responder ou ver uma conversa](/docs/conversas/problemas-comuns).

## Variações

- conversa atribuída a outro membro não deixa eu mandar mensagem
- não consigo falar com cliente que está em atendimento com colega
- aparece já existe um membro atendendo esse contato
- erro em atendimento ao tentar mandar mensagem ativa
- por que não vejo as mensagens da conversa de outro atendente
