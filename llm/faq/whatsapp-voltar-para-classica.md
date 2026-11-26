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

Não pelo **Recriar**: num canal **Express**, a janela de **Recriar** não mostra o seletor **Tipo de conexão**, que só aparece em canais **Clássica** (**Multidevice**).

O único contorno é excluir o canal e criar de novo com o mesmo número, escolhendo **Clássica** em **Opções avançadas**. O canal antigo volta com o mesmo ID e as conversas, mas:

- excluir um canal **Express** tira o canal de todos os bots que o usavam: é preciso ligar o canal aos bots de novo;
- o número fica sem enviar e receber pela Kinbox até você ler o QR Code no canal novo (a **Clássica** pode levar até 10 minutos para mostrar o QR Code).

A Kinbox recomenda a **Express**. Veja "Migrar da conexão Clássica para a Express" (`/docs/canais/whatsapp/whatsapp-app/migracao-tipo-classico-para-alternativo`).

## Variações

- como voltar do whatsapp express para o clássico
- migrei para express e quero voltar para a conexão antiga
- por que não aparece a opção clássica quando clico em recriar
- dá para desfazer a migração para express
- quero trocar um canal v5 para multidevice
