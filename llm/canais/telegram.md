---
title: "Telegram: formato do token, erros e o que chega pelo bot"
description: Regras do canal de Telegram da Kinbox, com o formato do token, as mensagens de erro ao conectar, o que chega e o que sai pelo bot, trocar o token, reconectar e usar o mesmo bot em outro lugar.
keywords: [telegram token inválido, essa conta já foi adicionada, canal não encontrado, conta criada mas a conversa não pôde ser criada, telegram conectado mas não recebe, legenda telegram, figurinha telegram, trocar token telegram, bot em dois lugares, teste grátis telegram]
publico: llm
tipo: referencia
fontes:
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/controllers/TelegramController.js
  - api-v0:server/modules/Telegram/parserMessage.js
  - web:src/pages/settings/channels/telegram/EditTelegram.tsx
  - web:src/pages/inbox/MessageDrop.tsx
codigo:
  - web:src/pages/settings/channels/telegram/**
  - web:src/pages/inbox/MessageDrop.tsx
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/controllers/TelegramController.js
  - api-v0:server/modules/Telegram/**
  - api-v0:server/modules/accessRestriction/**
verificado_em: 2026-11-26
---

Detalhes de referência da página [Conectar o Telegram](/docs/canais/telegram).

## Token

- O canal conecta um bot do Telegram criado no @BotFather, identificado pelo **Token**. Não conecta a conta pessoal de Telegram de alguém.
- **Formato:** `número:letras`. Nos exemplos desta página, o token aparece como `<token do bot>`.
- **Status Conectado:** o status **Conectado** não garante que o token está certo. Envie uma mensagem de teste para o bot; se não chegar, confira o token e se o bot não está ligado a outra ferramenta.
- **Segurança:** guarde o token em local seguro, pois ele dá acesso ao bot.

## Mensagens ao conectar

| Mensagem | Causa | O que fazer |
| --- | --- | --- |
| `"Token inválido"` | O **Token** informado está incompleto. | Copie o token completo do bot no formato `número:letras` e tente novamente. |
| `"Essa conta já foi adicionada"` | Esse token já pertence a um canal de Telegram ativo no mesmo workspace. | Use o canal já conectado na lista ou conecte outro bot. |
| `"Seu plano atual não permite adicionar o novo canal"` | O workspace está no teste grátis e já possui 1 canal de Telegram. | Use o canal existente ou mude para um plano pago. |
| `"Sua assinatura expirou"` | A assinatura do workspace está vencida há mais de 3 dias. | Regularize a assinatura antes de conectar novos canais. |
| `"Conta criada, mas a conversa não pôde ser criada."` | Falha interna ao registrar o recebimento das mensagens do bot; o canal fica criado. | Exclua o canal e conecte novamente com o token do bot. |

## Plano

- **Teste grátis:** até 1 canal de Telegram. Tentar adicionar o segundo retorna `"Seu plano atual não permite adicionar o novo canal"`.
- **Assinatura paga atual:** sem limite de quantidade; canais de Telegram não entram na cobrança do plano. Contas mais antigas podem ter outros limites.
- **Assinatura vencida há mais de 3 dias:** impede criar novos canais de Telegram com `"Sua assinatura expirou"`.
- Veja [Canais: conectar e gerenciar](/docs/canais/visao-geral).

## O que chega e o que sai

- **Quem inicia a conversa:** a Kinbox não inicia conversas no Telegram (o canal não aparece em **Canal** ao iniciar conversa; veja [Iniciar uma conversa com um contato](/docs/conversas/iniciar-conversa)). O contato precisa enviar a primeira mensagem para o bot.
- **Dados do contato:** entram nome, sobrenome e foto do perfil do Telegram, quando disponíveis. O telefone só entra no contato se a pessoa compartilhar o contato dela no Telegram.
- **Tipos recebidos do contato:** só texto, foto, vídeo, áudio de voz e documento chegam na conversa.
- **Legenda:** a legenda enviada junto com uma foto ou vídeo não chega (chega apenas o arquivo).
- **O que o membro envia:** texto, foto, vídeo, áudio, documento e gravação de áudio pelo editor da conversa.

## Excluir mensagem

- No Telegram, o menu da mensagem tem **Excluir** (confirmação: `"Tem certeza que deseja excluir essa mensagem? Essa operação não poderá ser desfeita."`) e a mensagem é apagada também no Telegram.
- Funciona apenas para mensagens enviadas pela Kinbox (mensagens recebidas do contato não são apagadas no Telegram).
- Se o Telegram não permitir apagar a mensagem, aparece `"Não foi possível deletar a mensagem #1"`.

## Trocar de bot ou de token

- Clique na linha do canal. O painel abre com a **Descrição** do canal no topo e mostra **Status**, **Descrição** e **Token**.
- No painel, você pode alterar a **Descrição** (e os campos personalizados do canal, se houver).
- Com o **Token** alterado, o painel mostra `"Canal não encontrado"` e não salva nada.
- Para usar outro bot ou token, conecte um canal novo com o token novo.

## Excluir e reconectar

- No menu de três pontos da linha ficam **Copiar ID** (`"ID do canal (<id>) copiado para clipboard."`) e **Excluir** (`"Tem certeza que deseja excluir esse canal?"`).
- **Excluir** desliga o canal e a Kinbox para de receber as mensagens do bot; as conversas não são apagadas.
- Conectar novamente o **mesmo** token no mesmo workspace reativa o canal anterior, mantendo as conversas.
- Abrir **Canais**, criar, editar e excluir exige a permissão **Gerenciar Canais** ou ser proprietário do workspace; **Somente pode dar manutenção simples em canais** esconde **Novo canal** e **Excluir**.

## Um bot em mais de um lugar

- O Telegram entrega as mensagens de um bot a apenas um destino por vez.
- Se o mesmo token for conectado depois em outra ferramenta ou em outro workspace da Kinbox, as mensagens passam a ir para o último lugar conectado e deixam de chegar no anterior.
- Use um bot exclusivo para cada workspace da Kinbox.

## Mensagem com erro

- Quando o Telegram recusa o envio (por exemplo, o contato bloqueou o bot), a mensagem fica com erro na conversa.
