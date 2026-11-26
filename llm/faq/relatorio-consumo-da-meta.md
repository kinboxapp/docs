---
title: Onde vejo quantas conversas a Meta me cobrou?
description: A Kinbox não mostra quantas conversas ou mensagens a Meta cobrou; o consumo e a cobrança ficam na sua conta do WhatsApp na Meta.
keywords: [fatura do whatsapp oficial, gasto com templates, conversas cobradas meta, consumo meta, fatura whatsapp oficial, quantas conversas meta cobrou, relatório whatsapp api oficial, gasto templates meta, cobrança meta]
publico: llm
tipo: faq
fontes:
  - web:src/pages/reports/index.tsx
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/modules/meta/CloudApiClient.js
  - web:src/pages/reports/WalletUsage/wallet-usage.helper.ts
  - api-v0:server/auxiliary/walletDefaults.js
  - web:src/pages/settings/channels/AddChannelWhatsApp.tsx
codigo:
  - web:src/pages/reports/index.tsx
  - web:src/pages/reports/WalletUsage/wallet-usage.helper.ts
  - web:src/pages/settings/channels/whatsappCloud/**
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/modules/meta/CloudApiClient.js
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/auxiliary/walletDefaults.js
  - web:src/pages/settings/channels/AddChannelWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/embed/**
verificado_em: 2026-11-26
---

## Pergunta

Onde vejo quantas conversas a Meta me cobrou?

## Resposta

A Kinbox não mostra quantas conversas ou mensagens a Meta cobrou; o consumo e a cobrança do WhatsApp oficial ficam direto na sua conta do WhatsApp na Meta.

A Kinbox não cobra nem repassa os envios do WhatsApp oficial, e templates do WhatsApp oficial não descontam da carteira do workspace. O [Relatório de saldo](/docs/relatorios/saldo) (**Relatórios** → **Saldo**; seu papel precisa da permissão **Gerenciar relatórios**, e o proprietário do workspace sempre vê) mostra apenas o consumo do saldo da Kinbox (como recursos de IA e ligações), e não a fatura da Meta.

Para acompanhar o volume de atendimentos de um número oficial dentro da Kinbox, abra **Relatórios** → **Produtividade** (exige a permissão **Gerenciar relatórios**; o proprietário do workspace sempre vê), clique em **Filtrar**, escolha o **Canal** do número e clique em **Aplicar filtros** para consultar sessões novas e resolvidas. Esse volume mede sessões da Kinbox e não corresponde às conversas cobradas pela Meta.

Veja também [Relatório de produtividade](/docs/relatorios/produtividade), [Antes de conectar o WhatsApp oficial](/docs/canais/requisitos-para-se-ter-uma-api-oficial) e [Saldo da carteira e créditos: o que consome](/docs/conceitos/saldo-e-creditos).

## Variações

- relatório de conversas cobradas pela meta
- onde ver gasto de templates do whatsapp oficial na kinbox
- quantas mensagens a meta cobrou esse mês
- tem relatório de cobrança da api oficial do whatsapp
- por que o relatório saldo não mostra a cobrança da meta
- como acompanhar o consumo de mensagens do whatsapp oficial
