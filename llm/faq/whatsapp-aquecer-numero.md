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
  - motor-qr:apps/docs/guides/best-practices.mdx
codigo:
  - web:src/pages/settings/channels/whatsapp/AddWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/EditWhatsApp.tsx
  - web:src/pages/settings/channels/warmbox/**
  - api-v0:server/modules/**
  - motor-qr:apps/docs/guides/best-practices.mdx
verificado_em: 2026-11-26
---

## Pergunta

Posso começar a usar um número novo logo de cara?

## Resposta

Não é recomendado. A tela da Kinbox avisa que usar uma conta nova pode levar ao bloqueio do número, porque o WhatsApp pode confundi-la com spam, e recomenda "aquecer" o número por pelo menos uma semana, trocando mensagens todos os dias com contatos conhecidos.

Na prática: use o número normalmente por alguns dias, em conversas reais, com foto, nome e recado, e aumente o volume aos poucos, ao longo de semanas. Não comece com campanhas.

Em alguns workspaces com recursos em teste, o painel do canal tem o **Aquecedor**, com quatro perfis:

- **Padrão**: para contas novas; começa com 10 a 20 mensagens por dia.
- **Moderado**: para contas já em uso; começa com 50 a 60 e sobe até 200 a 300 mensagens por dia.
- **Ultra**: para contas ativas; começa com 90 a 100 e sobe mais rápido até 200 a 300 mensagens por dia.
- **Personalizado**: usa o mesmo volume do **Moderado** e deixa escolher os **Tipos de envio** (Texto, Imagem, Áudio, Vídeo, Status).

Os perfis prontos duram 30 dias. Durante o aquecimento, a lista de canais mostra o selo **Aquecendo**. O **Aquecedor** pode não aparecer no seu workspace. Veja [Como evitar que o número seja bloqueado](/docs/canais/whatsapp/whatsapp-app/como-nao-ter-numero-bloqueado-whatsapp).

## Variações

- comprei um chip novo já posso conectar na kinbox
- quanto tempo preciso aquecer um número novo de whatsapp
- posso disparar campanha com número recém-criado
- o que é o aquecedor de canal na kinbox
- por que o aquecedor não aparece no meu canal de whatsapp
- como aquecer um número de whatsapp antes de usar
