---
title: Posso voltar da conexão Express para a Clássica?
description: Não existe opção para voltar da Express para a Clássica pelo botão Recriar; o único contorno é excluir e recriar com o mesmo número, mas a Kinbox recomenda a Express.
keywords: [voltar para clássica, sair da express, trocar express para clássica, downgrade whatsapp, recriar canal]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/channels/whatsapp/RecreateWhatsAppConfirm.tsx
  - api-v0:server/controllers/IntegrationsController.js
  - web:src/pages/settings/channels/whatsapp/AddWhatsApp.tsx
codigo:
  - web:src/pages/settings/channels/whatsapp/RecreateWhatsAppConfirm.tsx
  - web:src/pages/settings/channels/whatsapp/EditWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/AddWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/ChannelVersionUpdate.tsx
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/controllers/WaboxController.js
verificado_em: 2026-11-26
---

## Pergunta

Posso voltar da conexão Express para a Clássica?

## Resposta

Não existe opção para voltar da conexão **Express** para a **Clássica** pelo botão **Recriar** — o seletor **Tipo de conexão** na janela de recriação só aparece em canais que ainda estão na **Clássica**.

Como contorno, excluir o canal e criar novamente com o mesmo número escolhendo **Clássica** em **Opções avançadas** reaproveita o canal antigo (mesmo ID e conversas), mas a Kinbox recomenda manter a conexão **Express**, que é o padrão. Veja mais em [Migrar da conexão Clássica para a Express](/docs/canais/whatsapp/whatsapp-app/migracao-tipo-classico-para-alternativo).

## Variações

- como voltar do whatsapp express para o clássico
- migrei para express e quero voltar para a conexão antiga
- por que não aparece a opção clássica quando clico em recriar
- dá para desfazer a migração para express
- quero trocar um canal v5 para multidevice
