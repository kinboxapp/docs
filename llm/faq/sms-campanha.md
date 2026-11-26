---
title: Posso fazer campanha por SMS?
description: "Sim: com um canal de SMS e créditos de SMS, você cria campanhas por SMS em Campanhas, com mensagens de até 160 caracteres, sem emoji e sem anexo."
keywords: [campanha de sms, disparo de sms em massa, enviar sms em massa, campanha sms, disparo sms, torpedo em massa, créditos campanha sms]
publico: llm
tipo: faq
fontes:
  - web:src/pages/crm/campaigns/AddCampaign/index.tsx
  - web:src/pages/settings/channels/sms/AddSms.tsx
  - api:src/modules/campaigns/campaigns.service.ts
  - api-v0:server/controllers/SmsController.js
codigo:
  - web:src/pages/crm/campaigns/AddCampaign/index.tsx
  - web:src/pages/settings/channels/sms/**
  - api:src/modules/campaigns/campaigns.service.ts
  - api-v0:server/controllers/SmsController.js
verificado_em: 2026-11-26
---

## Pergunta

Posso fazer campanha por SMS?

## Resposta

Sim: com um canal de SMS e créditos de SMS, você cria campanhas por SMS em **Campanhas**.

Regras principais:

- **Conteúdo:** mensagem de até 160 caracteres, sem emoji e sem anexo.
- **Créditos:** cada SMS enviado desconta 1 crédito de SMS (separado do saldo da carteira). Se o workspace não tiver créditos ao criar a campanha, aparece `"Sem saldo de créditos SMS suficiente."`.
- **Quem pode:** membros com a permissão **Campanhas** ou o proprietário do workspace. A restrição **Proibir criar campanha de WhatsApp** não bloqueia campanhas por SMS.

Veja como criar o canal e comprar créditos em [Usar SMS: criar o canal e comprar créditos](/docs/canais/sms), o passo a passo da campanha em [Criar uma campanha por SMS](/docs/campanhas/campanha-de-sms) e os tempos de envio em [Velocidade de envio e horário comercial](/docs/campanhas/velocidade-e-horario).

## Variações

- dá para disparar sms em massa pela kinbox
- como faço uma campanha de sms na kinbox
- consigo mandar torpedo em massa para uma lista de contatos
- quantos caracteres pode ter uma campanha de sms
- posso usar emoji em campanha de sms
- quem não pode fazer campanha de whatsapp pode fazer campanha de sms
