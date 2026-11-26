---
title: "Apps e integrações: lista, status e onde aparecem"
description: Referência das integrações nativas da tela Apps, regras de status, permissões, ações prontas do bot e casos de borda do NectarCRM e do webhook do RD Station Marketing.
keywords: [apps, integrações, lista de apps, status instalado, esconder informações de integração, ações do bot, nectarcrm, webhook rd station, integrações retiradas]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/integrations/AppsAldeia.tsx
  - web:src/pages/settings/integrations/Apps.tsx
  - web:src/pages/settings/integrations/EditIntegration.tsx
  - web:src/components-old/chat/side/ContactDetails/**
  - web:src/pages/settings/index.tsx
  - api-v0:server/auxiliary/BotIntegrations.js
  - web:src/components-old/chat/side/integrationApps/NectarCRMApp/Actions.tsx
  - api:src/modules/webhooks/rdstation/rdstation-webhook.consumer.ts
codigo:
  - web:src/pages/settings/integrations/Apps.tsx
  - web:src/pages/settings/integrations/AppsAldeia.tsx
  - web:src/pages/settings/integrations/EditAppAldeia.tsx
  - web:src/pages/settings/integrations/EditIntegration.tsx
  - web:src/components-old/chat/side/ContactDetails/**
  - web:src/features/marketing-apps/**
  - api:src/modules/apps/**
  - web:src/components-old/chat/side/integrationApps/NectarCRMApp/**
  - api:src/modules/webhooks/rdstation/**
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

## Ações prontas no bot e app do agente de IA

- **Bot (bloco Integração, grupo Outros):** usam a conexão configurada em **Apps** e são puladas na simulação do bot (veja [Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot)):
  - **HubSpot:** `Consulta contato no HubSpot`, `Consulta negócio no HubSpot`, `Atualiza negócio no HubSpot`, `Cria ou atualiza Objeto no HubSpot`.
  - **Bitrix24:** `Cria Oportunidade no Bitrix`, `Atualiza Oportunidade no Bitrix`, `Cria ou atualiza contato no Bitrix`.
  - **RD Station Marketing:** `Cria ou atualiza contato no RDMarketing`.
  - **Pipedrive:** `Sincroniza contato, lead, deal, activity e notas no Pipedrive`, `Cria ou atualiza a deal no Pipedrive`, `Cria ou atualiza atividade de agenda no Pipedrive`.
- **Agente de IA:** o app **HubSpot** disponível nas ferramentas do agente usa login próprio separado da integração de **Apps** (veja [Dar ferramentas ao agente: Agenda, Google Calendar e HubSpot](/docs/agente-de-ia/ferramentas)).

## Integrações retiradas e sistemas sem integração pronta

- **Retiradas da lista Apps:** Followize, Exact Spotter e Consulta de FGTS.
- **Sem integração nativa em Apps:** Zapier, Make, n8n, Pluga, PipeRun, Moskit, ActiveCampaign, Salesforce, Mailchimp, Pipefy, Trello e Google Sheets (o bot oferece uma ação pronta para chamar o n8n no grupo **Outros**).
- **Alternativas para sistemas fora da lista:** API pública com token de API, plugins (página externa dentro do painel da conversa), bloco **Integração** do bot com **Chamar endpoint** ([Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot)) e **Cenários** com webhooks e requisições HTTP ([Bot, automações, cenários e agentes de IA: qual usar](/docs/conceitos/automacao-e-ia)).

## NectarCRM

Detalhes complementares de [Integrar com o NectarCRM](/docs/integracoes/nectarcrm):

- **Uma conta por workspace:** cada workspace tem uma única integração NectarCRM, com um campo de token por membro. Cada membro precisa do próprio token na linha dele para o botão **Add contato** ficar ativo.
- **Vínculo e campos enviados:** a ligação do contato fica salva no campo personalizado oculto `nectarcrm_id`, criado automaticamente no primeiro uso. Em **Add contato**, se o contato da Kinbox tiver campos personalizados com as chaves `segmento` e `origem`, esses valores são enviados como Segmento e Origem no NectarCRM.
- **Atenção ao Salvar dados:** a ação **Salvar dados** envia nome, telefone, e-mail e o valor do campo `origem`, e **substitui o Segmento do contato no NectarCRM pelo texto fixo `"WhatsApp/Kinbox"`**.
- **Sem busca de duplicados:** **Add contato** não procura contato existente no NectarCRM e sempre cria um novo. Se você usar **Desfazer integração** e clicar em **Add contato** novamente, será criado um segundo contato no NectarCRM.
- **Membro sem token em contato já ligado:** ao abrir a conversa de um contato já vinculado, o quadro tenta consultar o NectarCRM sem token, exibe o erro retornado pelo NectarCRM e deixa os campos vazios.
- **Limites de chamada:** as chamadas passam pelo serviço de repasse da Kinbox com limite de 120 requisições por minuto e tempo de espera padrão de 60 segundos (máximo de 120 segundos).
- **Bot e automações:** o NectarCRM não tem ações no bot nem nas automações.

## Webhook de leads do RD Station Marketing

Detalhes complementares de [Receber leads do RD Station Marketing por webhook](/docs/integracoes/rdstation-marketing-webhook):

- **Processamento em fila:** ao receber uma chamada do RD Station Marketing, a Kinbox responde sucesso imediatamente e coloca os leads numa fila de processamento em segundo plano. Por isso, o teste no RD pode responder sucesso mesmo quando o formato recebido não gera contato.
- **Formato e campos lidos:** o processamento lê apenas a lista `leads` do corpo da requisição e extrai três campos do topo de cada lead: `name` (nome), `email` (e-mail) e `mobile_phone` (telefone; se vazio, usa `personal_phone`). Campos de formulário, tags, campos personalizados (`cf_`), empresa e origem da conversão não são gravados.
- **Contato existente:** a Kinbox busca contato existente no workspace apenas pelo **telefone** (considerando variações com e sem DDI `55`). Se encontrar um contato, não atualiza nome nem e-mail. Não há busca por e-mail.
- **Lead sem telefone:** sem telefone não há busca de duplicados, então cada conversão recebida cria um novo contato no workspace (gerando contatos duplicados com o mesmo e-mail).
- **Efeito no workspace:** cria apenas o contato (normalizando o telefone); não cria conversa nem envia mensagem.
- **Corpos fora do formato de leads:** requisições sem a lista `leads` (como o formato por evento com `contact`) são aceitas na chegada e descartadas sem criar contato; falhas de processamento não são reexecutadas.
