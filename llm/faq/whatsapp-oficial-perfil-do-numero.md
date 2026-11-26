---
title: Como troco o nome, a foto ou a descrição do número oficial?
description: A Kinbox não altera nome de exibição, foto nem descrição do perfil do WhatsApp oficial; essas mudanças precisam ser feitas diretamente na Meta.
keywords: [trocar foto whatsapp oficial, mudar nome whatsapp oficial, alterar perfil whatsapp, foto de perfil api oficial, descrição do canal, nome de exibição]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/channels/whatsappCloud/EditWhatsappCloud.tsx
  - api-v0:server/controllers/WbaCloudController.js
codigo:
  - web:src/pages/settings/channels/whatsappCloud/**
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/settings/channels/whatsapp/ForwardZapModal.tsx
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/controllers/IntegrationsController.js
verificado_em: 2026-11-26
---

## Pergunta

Como troco o nome, a foto ou a descrição do número oficial?

## Resposta

A Kinbox não permite alterar o nome de exibição, a foto nem a descrição do perfil do seu número no WhatsApp oficial.

O campo **Descrição** nas configurações do canal serve apenas como o nome interno do canal dentro da Kinbox: ele nasce preenchido com o nome verificado na Meta, mas editá-lo não muda nada no WhatsApp. Para trocar nome, foto ou descrição vistos pelos contatos, faça a alteração diretamente na Meta. Veja mais em [Configurações do WhatsApp oficial](/docs/canais/whatsapp/whatsapp-cloud-api/configuracoes).

## Variações

- onde mudo a foto de perfil do whatsapp oficial na kinbox
- mudei a descrição do canal mas o nome no whatsapp não mudou
- como editar o recado e a imagem do número da api oficial
- dá para trocar o nome de exibição do whatsapp oficial pela kinbox
- alterei o nome do canal na kinbox e os clientes continuam vendo o nome antigo
