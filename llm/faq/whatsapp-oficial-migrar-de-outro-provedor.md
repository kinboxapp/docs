---
title: Como trago meu número oficial de outro provedor?
description: Conecte o número pelo caminho padrão da API Oficial escolhendo a conta e o número na janela da Meta; conversas antigas do outro provedor não são importadas.
keywords: [migrar número oficial, trocar de provedor, trazer número de outra plataforma, portabilidade whatsapp oficial, migração api oficial, mais de um app conectado]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/channels/AddChannelWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/embed/AddWhatsappEmbedded.tsx
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/modules/meta/CloudApiClient.js
codigo:
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/channels/AddChannelWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/embed/**
  - web:src/pages/settings/channels/whatsappCloud/**
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/modules/meta/CloudApiClient.js
  - api-v0:server/routes/IntegrationsApiRoutes.js
verificado_em: 2026-11-26
---

## Pergunta

Como trago meu número oficial de outro provedor?

## Resposta

A Kinbox não tem uma tela própria de migração: o número entra pelo mesmo caminho de uma conexão nova, em **Configurações** → **Chat** → **Canais** → **Novo canal** → **WhatsApp** → **API Oficial**, clicando em **Conectar WhatsApp** e escolhendo a conta do WhatsApp Business e o número na janela da Meta.

Alguns pontos importantes ao trazer um número de outra plataforma:

- Se o outro provedor continuar ligado à mesma conta do WhatsApp Business, o painel do canal na Kinbox mostra o aviso `"Canal com mais de um App conectado. Uma ação é necessária para evitar indisponibilidade do canal."`. Remova o acesso da outra plataforma à conta para evitar falhas.
- Se a Meta recusar o registro do número durante a conexão, a Kinbox exibe o erro na tela; nesse caso, fale com o suporte.
- Conversas antigas mantidas no outro provedor não vêm para a Kinbox.

Veja mais em "Conectar o WhatsApp oficial" e "Problemas ao conectar ou enviar pelo WhatsApp oficial".

## Variações

- já uso a api oficial em outra ferramenta, como migro para a kinbox
- dá para transferir meu número do whatsapp oficial para a kinbox
- se eu trouxer meu número de outro sistema as conversas antigas vêm junto
- como conectar na kinbox um número que já estava em outro provedor de whatsapp
- mudei de plataforma e apareceu aviso de mais de um app conectado
