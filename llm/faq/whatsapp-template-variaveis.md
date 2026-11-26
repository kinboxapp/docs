---
title: Como uso variáveis num template?
description: Ao criar um template, use variáveis numéricas com amostras; ao enviar, preencha texto fixo, chaves do contato (fora de campanhas) ou colunas do arquivo na campanha.
keywords: [variáveis no template, como colocar nome do cliente no template, "{{1}} template", amostra de variável, first_name no template, variável campanha whatsapp oficial]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/whatsappApi/sections/templateBuilder/TemplateContentPanel.tsx
  - web:src/pages/settings/whatsappApi/helpers/templateVariables.ts
  - web:src/components-old/inbox/NewMessageModal/NewMessageTemplate.tsx
  - api-v0:server/controllers/WbaCloudController.js
codigo:
  - web:src/pages/settings/whatsappApi/sections/TemplatesListSection.tsx
  - web:src/pages/settings/whatsappApi/sections/TemplateBuilder.tsx
  - web:src/pages/settings/whatsappApi/sections/templateBuilder/**
  - web:src/pages/settings/whatsappApi/helpers/templateVariables.ts
  - web:src/components-old/inbox/NewMessageModal/**
  - web:src/components-old/inbox/ScheduleMessageModal/index.tsx
  - web:src/pages/crm/campaigns/AddCampaign/**
  - web:src/components-old/forms/ActionsInput/**
  - web:src/pages/settings/bot/drawers/EditNodeNotifyDrawer.tsx
  - web:src/pages/settings/workflows/entities/conversation/send-message/**
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/controllers/CampaignController.js
verificado_em: 2026-11-26
---

## Pergunta
Como uso variáveis num template?

## Resposta
Você cria o template usando variáveis numéricas (`{{1}}`, `{{2}}`...) com amostras obrigatórias e preenche os valores na hora do envio, conforme o recurso usado.

**Ao criar o template:**
- Clique em **Adicionar variável** para inserir `{{1}}`, `{{2}}` e assim por diante (variáveis por nome, como `{{first_name}}`, não estão disponíveis na criação).
- Preencha uma amostra para cada variável em **Amostras de variáveis** para a Meta analisar o modelo.
- No **Corpo da mensagem**, as variáveis não podem ficar no início nem no fim do texto; no cabeçalho de texto, há no máximo uma variável.

**Ao enviar o template:**
- Ao selecionar o modelo, a Kinbox mostra um campo para cada variável (**Cabeçalho** `{{n}}`, **Corpo** `{{n}}` e URL do botão). Preencha todos os campos para evitar recusa da Meta.
- **Na conversa, no Agendar mensagem, nas automações e no bloco Notificar do bot**: você pode digitar texto fixo ou uma chave do contato (`{{first_name}}`, `{{name}}`, `{{email}}`, `{{phone}}`, `{{protocol}}`, `{{operator}}` ou campo personalizado). As chaves do contato são trocadas apenas no **Corpo** e na **URL** do botão — não no **Cabeçalho**. A **Pré-visualização** não substitui chaves do contato.
- **Na campanha**: chaves do contato não funcionam. Digite `{{2}}`, `{{3}}` e assim por diante para usar a 2ª, 3ª e demais colunas do arquivo de destinatários (`{{1}}` é o número).
- **Nos cenários**: use as variáveis do próprio cenário em qualquer campo.

Mais detalhes em [Criar um template e enviar para aprovação](/docs/canais/criar-templates-dentro-do-kinbox) e [Enviar um template aprovado](/docs/canais/whatsapp/whatsapp-templates/enviar-template).

## Variações
- como colocar o nome do cliente no template do whatsapp
- o que significa `{{1}}` no modelo de mensagem
- como preencher variáveis de template na campanha oficial
- minha variável `{{first_name}}` não trocou na campanha
- o que preencher em amostras de variáveis do template
- como personalizar um template com dados do contato
