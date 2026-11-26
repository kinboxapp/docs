---
title: Onde está a integração com o Followize?
description: A integração com o Followize foi retirada e não aparece mais na tela Apps da Kinbox.
keywords: [followize, integração followize, followize sumiu, app followize, criar lead no followize]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/integrations/Apps.tsx
  - web:src/components-old/chat/side/ContactDetails/**
codigo:
  - web:src/pages/settings/integrations/Apps.tsx
  - web:src/pages/settings/integrations/AppsAldeia.tsx
  - web:src/pages/settings/integrations/EditAppAldeia.tsx
  - web:src/pages/settings/integrations/EditIntegration.tsx
  - web:src/components-old/chat/side/ContactDetails/**
  - web:src/features/marketing-apps/**
  - api:src/modules/apps/**
verificado_em: 2026-11-26
---

## Pergunta

Onde está a integração com o Followize?

## Resposta

A integração com o Followize foi retirada e não aparece mais em **Apps**.

Em **Configurações** → **Integrações** → **Apps** (acessível para o proprietário do workspace ou membros com a permissão **Integrações**), o app do Followize não está mais disponível. Veja a lista atual de integrações prontas em [Apps e integrações: instalar e usar](/docs/integracoes/visao-geral).

Se você precisa integrar com o Followize ou com outro sistema fora da lista de **Apps**, as alternativas disponíveis na Kinbox são:

- **API pública** da Kinbox (com token de API) para ler e gravar dados a partir do outro sistema;
- **Plugins** para abrir uma página do seu sistema dentro do painel da conversa;
- **Bloco Integração do bot** usando **Chamar endpoint** (veja [Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot));
- **Cenários** para receber webhooks e fazer requisições HTTP (veja [Bot, automações, cenários e agentes de IA: qual usar](/docs/conceitos/automacao-e-ia)).

## Variações

- followize sumiu da kinbox
- como integrar com o followize
- criar lead no followize pela kinbox
- app followize não aparece em apps
- followize ainda funciona na kinbox
