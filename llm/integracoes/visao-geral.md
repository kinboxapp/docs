---
title: "Apps e integrações: lista, status e onde aparecem"
description: Referência das integrações nativas da tela Apps, regras de status, quem vê os quadros na conversa e ações prontas do bot.
keywords: [apps, integrações, lista de apps, status instalado, esconder informações de integração, ações do bot, integrações retiradas, integrações sem quadro]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/integrations/AppsAldeia.tsx
  - web:src/pages/settings/integrations/Apps.tsx
  - web:src/pages/settings/integrations/EditIntegration.tsx
  - web:src/components-old/chat/side/ContactDetails/**
  - web:src/pages/settings/index.tsx
  - api-v0:server/auxiliary/BotIntegrations.js
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

Complemento técnico de [Apps e integrações: instalar e usar](/docs/integracoes/visao-geral).

## Integrações nativas na tela Apps

Caminho no menu: **Configurações** → **Integrações** → **Apps** (`/settings/apps`). Disponível apenas para o proprietário do workspace ou membros com a permissão **Integrações** (veja [Referência de permissões](/docs/administracao/referencia-de-permissoes)).

| App | Caminho relativo | Descrição na lista | Título do quadro na conversa | Página |
| --- | --- | --- | --- | --- |
| **Mola** | `/settings/apps/mola` | Sistema de consignado completo | **Mola** | — |
| **Banco Inter** | `/settings/apps/banco-inter` | Gere boletos de cobrança | **Banco Inter** | — |
| **Pipedrive** | `/settings/apps/pipedrive` | CRM e funil de vendas | **Pipedrive** | [Integrar com o Pipedrive](/docs/integracoes/pipedrive) |
| **Dom360** | `/settings/apps/dom360` | CRM completo | **Dom360** | — |
| **RD Station CRM** | `/settings/apps/rdstation` | CRM e funil de vendas | **RD Station CRM** | [Integrar com o RD Station CRM](/docs/integracoes/rdstation-crm) |
| **RD Station Marketing** | `/settings/apps/rdstation-marketing` | Marketing digital | **RD Station Marketing** | [Integrar com o RD Station Marketing](/docs/integracoes/rdstation-marketing) |
| **Tiny ERP** | `/settings/apps/tinyerp` | Software de ERP | **Tiny ERP** | — |
| **Sensedata** | `/settings/apps/sensedata` | Customer Success | **Sensedata** | — |
| **Smarters** | `/settings/apps/smarters` | Software de gestão de IPTV | **Smarters** | — |
| **Gestor Premium** | `/settings/apps/gestor_premium` | Gestão de IPTV | **Gestor Premium** | — |
| **Hubspot** | `/settings/apps/hubspot` | Plataforma de CRM | **Hubspot** | [Integrar com o HubSpot](/docs/integracoes/hubspot) |
| **Zoho CRM** | `/settings/apps/zoho` | Plataforma de CRM | **Zoho** | [Integrar com o Zoho CRM](/docs/integracoes/zoho) |
| **Bitrix24** | `/settings/apps/bitrix24` | CRM e gestão de projetos | **Bitrix24** | [Integrar com o Bitrix24](/docs/integracoes/bitrix24) |
| **NectarCRM** | `/settings/apps/nectarcrm` | Gestão de Vendas B2B | **NectarCRM** | [Integrar com o NectarCRM](/docs/integracoes/nectarcrm) |
| **Hinova** | `/settings/apps/hinova` | Soluções Digitais | — | — |
| **Anycar** | `/settings/apps/anycar` | Consulta de Veículos por placa | **Anycar** | — |
| **Asaas** | `/settings/apps/asaas` | Sistema financeiro | — | — |

## Regras gerais da tela Apps e dos quadros

- **Status Instalado × Não instalado:** **Instalado** indica apenas que existe uma configuração daquele tipo com **Habilitar integração** ligado; não verifica se a credencial está válida. **Não instalado** inclui integrações que já têm dados salvos, mas estão com **Habilitar integração** desligado.
- **Uma integração por tipo:** cada workspace mantém apenas uma conta por tipo de integração (não é possível configurar duas contas do mesmo CRM simultaneamente).
- **Sem botão de excluir:** para desativar, desligue **Habilitar integração** e clique em **Salvar**. Os dados preenchidos permanecem salvos no painel.
- **Apps do catálogo e marketing digital:** além das integrações nativas, a Kinbox pode liberar apps do catálogo para todos os workspaces ou para workspaces específicos (por isso a lista pode variar). Apps do catálogo que têm quadro próprio aparecem no painel **Detalhes** abaixo dos plugins quando ativos e habilitados. **Meta Ads**, **Google Ads** e **Tracking** aparecem na mesma lista quando liberados e abrem uma janela própria de instalação.
- **Quem vê o quadro na conversa:** os quadros das integrações nativas aparecem como seções recolhíveis no painel **Detalhes** da conversa (abaixo de **Sessão**, **Contato**, **Negociações** e **Tarefas**, antes dos plugins) para qualquer membro, sem exigir a permissão **Integrações** (veja [Caixa de entrada: visão geral](/docs/conversas/caixa-de-entrada-do-kinbox)). O quadro não aparece quando:
  - **Habilitar integração** está desligado;
  - o membro tem a restrição **Esconder informações de integração** no papel;
  - a conversa está no modo de treino da Academia.
- **Integrações sem quadro na conversa:** Asaas e Hinova não têm quadro no painel **Detalhes**.
- **Limite de uso:** as consultas dos quadros aos CRMs têm limite de uso. Se aparecer erro de limite, espere um minuto e tente de novo.
- **Páginas complementares:** detalhes do NectarCRM em [Integrar com o NectarCRM](/docs/integracoes/nectarcrm) e do webhook de leads em [Receber leads do RD Station Marketing por webhook](/docs/integracoes/rdstation-marketing-webhook).

## Ações prontas no bot e app do agente de IA

- **Bot (bloco Integração, grupo Outros):** há ações prontas de várias integrações (entre elas as listadas abaixo, além de Dom360 e Anycar); usam a conexão configurada em **Apps** e são puladas na simulação do bot (veja [Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot)):
  - **HubSpot:** `Consulta contato no HubSpot`, `Consulta negócio no HubSpot`, `Atualiza negócio no HubSpot`, `Cria ou atualiza Objeto no HubSpot`.
  - **Bitrix24:** `Cria Oportunidade no Bitrix`, `Atualiza Oportunidade no Bitrix`, `Cria ou atualiza contato no Bitrix`.
  - **RD Station Marketing:** `Cria ou atualiza contato no RDMarketing`.
  - **Pipedrive:** `Sincroniza contato, lead, deal, activity e notas no Pipedrive`, `Cria ou atualiza a deal no Pipedrive`, `Cria ou atualiza atividade de agenda no Pipedrive`.
- **Agente de IA:** o app **HubSpot** disponível nas ferramentas do agente usa login próprio separado da integração de **Apps** (veja [Dar ferramentas ao agente: Agenda, Google Calendar e HubSpot](/docs/agente-de-ia/ferramentas)).

## Integrações retiradas e sistemas sem integração pronta

- **Retiradas da lista Apps:** Followize, Exact Spotter e Consulta de FGTS.
- **Sem integração nativa em Apps:** Zapier, Make, n8n, Pluga, PipeRun, Moskit, ActiveCampaign, Salesforce, Mailchimp, Pipefy, Trello e Google Sheets (o bot oferece uma ação pronta para chamar o n8n no grupo **Outros**).
- **Alternativas para sistemas fora da lista:** API pública com token de API ([Criar um token de API](/docs/desenvolvedor/tokens-de-api)), plugins, que abrem uma página externa dentro do painel da conversa ([Criar um plugin para o painel da conversa](/docs/desenvolvedor/criando-plugin-integracao)), bloco **Integração** do bot com **Chamar endpoint** ([Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot)) e **Cenários** com webhooks e requisições HTTP ([Bot, automações, cenários e agentes de IA: qual usar](/docs/conceitos/automacao-e-ia)).
