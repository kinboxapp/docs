---
title: "Mercado Livre: só perguntas de anúncio, sem notas nem anexos, fora da tela atual de canais"
description: Como funciona o canal de Mercado Livre na Kinbox, que recebe só as perguntas dos anúncios, junta as perguntas por anúncio, responde publicamente na pergunta e não aparece mais para conectar na tela atual de canais.
keywords: [mercado livre, perguntas do anúncio, responder perguntas mercado livre, loja do mercado livre, mercado livre não aparece, conectar mercado livre, pós-venda mercado livre, marketplace]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/channels/mercadolivre/AddMercadoLivre.tsx
  - web:src/pages/inbox/Chat/index.tsx
  - api-v0:server/controllers/MercadoLivreController.js
codigo:
  - web:src/pages/settings/channels/mercadolivre/**
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/inbox/MessageML.tsx
  - api-v0:server/controllers/MercadoLivreController.js
  - api-v0:server/modules/scheduler/mercadoLivreScheduler.js
verificado_em: 2026-11-26
---

## Disponibilidade

- A tela atual de canais (**Conectar novo canal**) não oferece mais o cartão para conectar o Mercado Livre (veja [Canais: conectar e gerenciar](/docs/canais/visao-geral)).
- Canais de Mercado Livre conectados antes continuam funcionando e recebendo as perguntas dos anúncios, com renovação automática do acesso à conta conectada.
- Para conectar uma conta nova do Mercado Livre, fale com o suporte.

## O que chega

- Chegam apenas as **perguntas feitas nos anúncios** que ainda não têm resposta (perguntas já respondidas são ignoradas).
- Mensagens de pós-venda (pedidos), avaliações e reclamações não chegam.

## Como as conversas aparecem

- Cada anúncio vira um contato e uma conversa: todas as perguntas do mesmo anúncio chegam juntas na conversa desse anúncio.
- O contato recebe o título do produto como nome, a foto do produto e, nas observações, `"Produto: <título>"` e o link do anúncio.
- Não é possível iniciar uma conversa pelo Mercado Livre a partir da Kinbox.

## Como responder

- Para responder, o membro precisa clicar em **Responder** na pergunta: sem isso, o editor de texto não aparece.
- A resposta é publicada como resposta pública àquela pergunta no anúncio do Mercado Livre.
- A conversa aceita apenas texto: não há notas internas nem anexos.

## Lista de canais, edição e exclusão

- Em **Configurações** → **Chat** → **Canais**, a linha mostra a descrição e `"Loja do Mercado Livre"` abaixo.
- Clicar na linha abre o painel **Canal de Mercado Livre**, com **Status** e **Descrição**.
- No menu de três pontos ficam **Copiar ID** (`"ID do canal (<id>) copiado para clipboard."`) e **Excluir** (`"Tem certeza que deseja excluir esse canal?"`), que exige a permissão **Gerenciar Canais** (ou proprietário) e estar sem a restrição **Somente pode dar manutenção simples em canais**. **Excluir** desliga o canal e mantém as conversas.
