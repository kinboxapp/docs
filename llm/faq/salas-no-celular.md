---
title: Posso usar as salas pelo celular?
description: Sim. No app da Kinbox para celular, a aba Salas mostra as salas e mensagens diretas da equipe, com a maior parte das ações do computador.
keywords: [salas no celular, chat interno no app, usar salas no aplicativo, mensagem direta no celular, criar sala no celular, notificações de salas no celular, reagir na sala no celular, thread no celular]
publico: llm
tipo: faq
fontes:
  - mobile:src/app/(tabs)/rooms/index.tsx
  - mobile:src/app/(tabs)/rooms/room/[id].tsx
  - mobile:src/ui/MessageMenu.tsx
  - mobile:src/app/room-edit.tsx
  - mobile:src/app/notifications.tsx
  - mobile:src/domain/rooms.ts
codigo:
  - mobile:src/app/(tabs)/rooms/**
  - mobile:src/app/room-*.tsx
  - mobile:src/domain/rooms.ts
verificado_em: 2026-11-26
---

## Pergunta

Posso usar as salas pelo celular?

## Resposta

Sim. No app da Kinbox para celular, a aba **Salas** mostra as salas e as mensagens diretas da equipe: dá para ler, escrever, mandar fotos, arquivos e áudio, apagar as próprias mensagens, silenciar salas e criar ou editar salas (com a permissão **Salas**). Algumas coisas não estão disponíveis no app: reagir, responder em thread, editar mensagem, fixar, salvar, buscar mensagens, a lista de **Menções** e a **Auditoria**.

A aba **Salas** é a segunda aba do app (entre **Conversas** e **Agenda**) e mostra o total de mensagens não lidas (`99+` a partir de 100), sem contar salas silenciadas. Para quem tem a restrição **Não pode acessar as salas**, a aba exibe "Sem acesso às salas" — "Seu perfil não permite acessar o chat do time neste workspace." — e o botão **Trocar workspace** (o proprietário nunca é bloqueado).

O que dá para fazer no app:

- **Lista:** buscar em "Buscar sala ou colega" nas seções **Salas** e **Mensagens diretas**. Segurar uma linha mostra **Ver perfil** (em mensagem direta), **Marcar como lida** (quando há mensagens não lidas) e **Silenciar** / **Reativar notificações**.
- **Mensagens:** ler (30 por vez), escrever, anexar pelo **+** (**Câmera**, **Fotos** e **Arquivos**, até 10 por vez) e gravar áudio. Segurar uma mensagem abre **Responder** (citando, sem thread), **Copiar** (texto) e **Apagar** (apenas o autor ou o proprietário).
- **Mensagens diretas:** tocar no colega em **Mensagens diretas**; a conversa nasce no primeiro envio. Com a restrição **Só pode ver membros que sejam dos seus grupos nos DMs.**, você só vê e manda mensagem direta para colegas que têm algum grupo em comum com você.
- **Criar e gerenciar salas (com a permissão Salas ou sendo proprietário):** tocar em **Nova sala**, preencher **Nome**, descrição, **Cor**, **Privacidade** (**Pública · todo o workspace** ou **Privada · só membros escolhidos**) e, só em sala privada, **Membros**, e salvar em **Salvar sala**. Sem nome, o app avisa "Dê um nome para a sala."; numa sala privada, você precisa continuar na lista de membros ("Você precisa ser membro de uma sala privada."). Ao tocar no nome da sala no topo, aparecem **Descrição**, **Notificações** (com a chave **Silenciar**), **Membros** e, para quem tem a permissão **Salas**, **Editar sala** e **Excluir sala**.

O que não está disponível no app: reagir, responder em thread, editar mensagem, fixar, salvar, buscar mensagens dentro da sala, listas **Menções** e **Salvos**, **Auditoria** e a lista **@** para mencionar (menções feitas no computador aparecem destacadas no app).

- **Notificações:** em **Você** → **Notificações**, seção **Salas**, a opção **Mensagens diretas e menções** (ligada por padrão) avisa menções e mensagens diretas. Salas silenciadas não geram push no app ("Salas silenciadas não geram alertas."), e o aviso não se repete com a sala aberta. Veja [Receber notificações no navegador e no celular](/docs/conta/notificacoes).
- **Sem internet:** a lista salva continua aparecendo ("Sem conexão · mostrando salas salvas") e o envio fica desativado.
- **Pelo navegador do celular:** sem usar o app, o painel **Salas** abre em tela cheia, uma coluna por vez, e `Enter` pula linha em vez de enviar.

Veja mais em [Salas: o chat interno da equipe](/docs/salas/visao-geral) e [Conversar nas salas: mensagens diretas, menções e threads](/docs/salas/usar-salas).

## Variações

- tem salas no aplicativo da kinbox
- consigo usar o chat interno pelo celular
- dá para criar ou editar uma sala no app
- por que não consigo reagir nem responder em thread no celular
- como silenciar uma sala no aplicativo da kinbox
- funciona abrir as salas pelo navegador do celular
