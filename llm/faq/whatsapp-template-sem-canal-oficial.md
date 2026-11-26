---
title: Por que não consigo criar templates?
description: Templates existem apenas no WhatsApp oficial e exigem a permissão Gerenciar Canais e um canal oficial ativo.
keywords: [não consigo criar template, cadê opção de template, menu whatsapp api sumiu, conecte uma api oficial, templates no whatsapp qr code, sem permissão whatsapp api]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/index.tsx
  - web:src/pages/settings/whatsappApi/WhatsappApiContent.tsx
  - api:src/modules/whatsapp-api/credentials/whatsapp-api-credentials.service.ts
  - api:src/modules/whatsapp-api/guards/whatsapp-api-permission.guard.ts
codigo:
  - web:src/pages/settings/whatsappApi/sections/OverviewSection.tsx
  - web:src/pages/settings/whatsappApi/constants.ts
  - web:src/pages/settings/whatsappApi/WhatsappApiContent.tsx
  - web:src/pages/settings/whatsappApi/helpers/templates.ts
  - web:src/pages/settings/index.tsx
  - api:src/modules/whatsapp-api/credentials/whatsapp-api-credentials.service.ts
verificado_em: 2026-11-26
---

## Pergunta
Por que não consigo criar templates?

## Resposta
Existem quatro causas comuns para não conseguir criar ou editar templates em **Configurações** → **Automação** → **WhatsApp API**:

1. **Não há canal WhatsApp oficial conectado**: ao abrir **WhatsApp API**, a tela exibe a janela **Conecte uma API Oficial** (`"Para usar a Central WhatsApp API, conecte primeiro um canal pela API Oficial."`). É preciso conectar um canal oficial ativo.
2. **O canal conectado é WhatsApp por QR Code**: canais **Express** e **Clássica** não possuem templates, Flows nem carrosséis; esses recursos existem apenas no WhatsApp oficial.
3. **Falta a permissão Gerenciar Canais**: sem essa permissão (ou sem ser o proprietário do workspace), o menu **WhatsApp API** não aparece e abrir o endereço diretamente mostra `"Você não tem permissão para acessar essa página"`.
4. **O template já existe e está em análise pela Meta**: enquanto estiver em análise, ele fica bloqueado para edição até receber um status final.

Mais detalhes na página "Templates, Flows e carrossel: o que é cada um".

## Variações
- não aparece a opção de criar template na kinbox
- o menu whatsapp api sumiu das configurações
- não consigo criar modelo de mensagem no meu whatsapp
- templates não aparecem no whatsapp por qr code
- aparece conecte uma api oficial quando abro templates
- estou sem acesso à tela de templates do whatsapp
