---
title: Para quantos contatos posso mandar numa campanha?
description: A Kinbox não limita a quantidade de contatos da lista; o arquivo vai até 100 MB e os limites práticos dependem do canal.
keywords: [limite de contatos campanha, quantos números campanha, tamanho da lista, máximo de leads, limite de disparo]
publico: llm
tipo: faq
fontes:
  - web:src/pages/crm/campaigns/AddCampaign/LeadsSource.tsx
  - web:src/components-old/forms/Dropzone.tsx
  - api:src/modules/campaigns/chunks/chunk.worker.ts
  - api-v0:server/controllers/SmsController.js
codigo:
  - web:src/pages/crm/campaigns/AddCampaign/LeadsSource.tsx
  - api:src/modules/campaigns/chunks/chunk.worker.ts
verificado_em: 2026-11-26
---

## Pergunta

Para quantos contatos posso mandar numa campanha?

## Resposta

A Kinbox não limita a quantidade de contatos de uma campanha; no envio por **Upload**, o limite técnico é o tamanho do arquivo, que vai até **100 MB**.

Linhas com número inválido não recebem a campanha e números repetidos escritos da mesma forma entram uma única vez. Apenas uma campanha envia por vez em cada canal principal.

Os limites práticos dependem do canal escolhido:

- **SMS:** nos canais de SMS da Kinbox, cada SMS que a campanha tenta enviar consome **1 crédito de SMS**, mesmo se falhar (veja [Criar uma campanha por SMS](/docs/campanhas/campanha-de-sms)).
- **WhatsApp por QR Code:** disparar para muitos contatos aumenta o risco de o WhatsApp bloquear o número (veja [Enviar campanhas pelo QR Code com menos risco de bloqueio](/docs/canais/whatsapp/whatsapp-app/como-fazer-numero-nao-ser-bloqueado-campanhas)).
- **WhatsApp oficial:** os limites de envio são definidos pela Meta, e a Kinbox não exibe esses limites na tela.

Para enviar a mesma mensagem para até 10 números de uma vez sem criar campanha, você pode usar [Iniciar uma conversa com um contato](/docs/conversas/iniciar-conversa) (no WhatsApp por QR Code, acima de 10 números a tela pede que você crie uma campanha). Veja também [Campanhas: visão geral](/docs/campanhas/visao-geral).

## Variações

- qual o limite máximo de contatos em uma campanha
- quantos números posso colocar na planilha csv da campanha
- tem limite de leads para disparo em massa na kinbox
- qual o tamanho máximo do arquivo de campanha
- posso mandar campanha para milhares de contatos
- quantas pessoas podem receber uma campanha no whatsapp ou sms
