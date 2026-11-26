---
title: Posso começar a usar um número novo logo de cara?
description: Não é recomendado conectar ou disparar em número novo logo de cara; aqueça o número por pelo menos uma semana com conversas reais e aumente o volume aos poucos.
keywords: [número novo, aquecer número, aquecimento whatsapp, aquecedor, chip novo, evitar bloqueio]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/channels/whatsapp/AddWhatsApp.tsx
  - web:src/pages/settings/channels/warmbox/warmbox.helper.ts
  - web:src/pages/settings/channels/warmbox/WarmboxSettings.tsx
  - wabox:apps/docs/guides/best-practices.mdx
codigo:
  - web:src/pages/settings/channels/whatsapp/AddWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/EditWhatsApp.tsx
  - web:src/pages/settings/channels/warmbox/**
  - api-v0:server/modules/wabox/WaboxClient.js
  - wabox:apps/docs/guides/best-practices.mdx
verificado_em: 2026-11-26
---

## Pergunta

Posso começar a usar um número novo logo de cara?

## Resposta

Não é recomendado. Conectar um número novo ou disparar mensagens logo nos primeiros dias aumenta o risco de o WhatsApp confundir a conta com spam e bloquear o número.

A tela da Kinbox recomenda aquecer o número por pelo menos uma semana, trocando mensagens diariamente com contatos conhecidos, com foto, nome e recado preenchidos, aumentando o volume de envios aos poucos ao longo de semanas. Em alguns workspaces com recursos em teste, existe também a opção **Aquecedor** na tela do canal (com os perfis **Padrão** — 10 a 20 mensagens/dia para contas novas —, **Moderado** — 50 a 60 até 200 a 300/dia —, **Ultra** — 90 a 100 até 200 a 300/dia — e **Personalizado**, com duração padrão de 30 dias nos perfis prontos e selo **Aquecendo** na lista), mas esse recurso pode não aparecer no seu workspace. Veja mais em [Como evitar que o número seja bloqueado](/docs/canais/whatsapp/whatsapp-app/como-nao-ter-numero-bloqueado-whatsapp).

## Variações

- comprei um chip novo já posso conectar na kinbox
- quanto tempo preciso aquecer um número novo de whatsapp
- posso disparar campanha com número recém-criado
- o que é o aquecedor de canal na kinbox
- por que o aquecedor não aparece no meu canal de whatsapp
- como aquecer um número de whatsapp antes de usar
