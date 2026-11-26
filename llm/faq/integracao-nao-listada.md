---
title: Meu CRM não está na lista de apps. Dá para integrar?
description: Não há integração pronta para sistemas fora da lista de Apps, mas dá para integrar pela API pública, plugins, Chamar endpoint no bot ou Cenários.
keywords: [crm não listado, integrar outro crm, piperun, salesforce, activecampaign, moskit, pipefy, trello, google sheets, mailchimp, integração própria]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/integrations/Apps.tsx
  - web:src/pages/settings/integrations/AppsAldeia.tsx
codigo:
  - web:src/pages/settings/integrations/Apps.tsx
  - web:src/pages/settings/integrations/AppsAldeia.tsx
  - web:src/pages/settings/integrations/EditAppAldeia.tsx
  - web:src/pages/settings/integrations/EditIntegration.tsx
  - web:src/components-old/chat/side/ContactDetails/index.tsx
  - web:src/features/marketing-apps/**
  - api:src/modules/apps/**
verificado_em: 2026-11-26
---

## Pergunta

Meu CRM não está na lista de apps. Dá para integrar?

## Resposta

Não há integração pronta para sistemas fora da lista de **Apps** — como PipeRun, Moskit, ActiveCampaign, Salesforce, Pipefy, Trello, Google Sheets ou Mailchimp —, mas você pode integrar pela API pública, por plugins, pelo bot ou por **Cenários**.

A lista em **Configurações** → **Integrações** → **Apps** (disponível para o proprietário do workspace ou membros com a permissão **Integrações**) reúne as integrações nativas e pode variar entre workspaces conforme apps do catálogo liberados pela Kinbox. Veja quais sistemas têm app pronto em [Apps e integrações: instalar e usar](/docs/integracoes/visao-geral).

Para conectar um CRM ou sistema que não está na lista, use uma destas opções:

- **API pública:** o seu sistema lê e grava dados na Kinbox usando um token de API.
- **Plugins:** exibe uma página do seu sistema dentro do painel da conversa.
- **Bot com Chamar endpoint:** no bloco **Integração** do bot, chama a API do seu CRM durante o atendimento (veja [Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot)).
- **Cenários:** recebe webhooks e envia requisições HTTP para integrar sistemas fora do fluxo de um bot (veja [Bot, automações, cenários e agentes de IA: qual usar](/docs/conceitos/automacao-e-ia)).

Para integração com ferramentas de automação como Zapier, Make e n8n, veja a pergunta sobre Zapier, Make e n8n (o bot também possui uma ação pronta para chamar o n8n no grupo **Outros**).

## Variações

- integrar kinbox com piperun
- kinbox tem integração com salesforce
- meu crm não aparece na lista de apps
- como integrar crm próprio com a kinbox
- integração com activecampaign ou mailchimp
- dá para conectar moskit, pipefy ou trello na kinbox
- integrar google sheets com a kinbox
