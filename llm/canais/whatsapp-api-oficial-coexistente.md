---
title: "Coexistência: o que muda no canal (registro, ligações, app no celular)"
description: Regras do WhatsApp oficial em coexistência com o app WhatsApp Business na Kinbox, com o que entra na conversa, o que não entra e o que evitar.
keywords: [coexistência, app whatsapp business, mensagens do celular, histórico do app, ligações coexistência, a meta não oferece ligações neste número, atualizar registro]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/channels/whatsapp/embed/AddWhatsappEmbedded.tsx
  - web:src/pages/settings/channels/whatsappCloud/WhatsappCallingChannelSettings.tsx
  - api-v0:server/controllers/WbaCloudController.js
  - api:src/modules/whatsapp-calling/whatsapp-call-permission.service.ts
codigo:
  - web:src/pages/settings/channels/whatsapp/embed/**
  - web:src/pages/settings/channels/whatsappCloud/**
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/modules/meta/CloudApiClient.js
  - api:src/modules/whatsapp-calling/whatsapp-call-permission.service.ts
  - api:src/modules/whatsapp-api/services/core/whatsapp-api-status-monitor.service.ts
verificado_em: 2026-11-26
---

Referência complementar à página humana [Usar o mesmo número no app WhatsApp Business e na Kinbox (coexistência)](/docs/canais/whatsapp-api-oficial-coexistente).

## Como a Kinbox reconhece a coexistência

A janela da Meta aberta pelo botão **Conectar WhatsApp** inclui a opção de conectar um número que continua no app WhatsApp Business. Quando a Meta encerra o cadastro sinalizando essa opção do app WhatsApp Business, a Kinbox grava o canal em modo de coexistência e pula a etapa de registrar o número na API da Meta.

## O que muda no canal em coexistência

| Aspecto | Comportamento na Kinbox |
| --- | --- |
| Mensagens enviadas pelo app no celular | Entram na conversa da Kinbox como mensagens enviadas pela empresa. |
| Conversas antigas do app | Não são importadas para a Kinbox (o evento de histórico enviado pela Meta não é tratado). |
| Ligações pelo WhatsApp | Não funcionam pela Kinbox. Na seção **Ligações** (recurso em teste, visível apenas em workspaces habilitados), aparece o aviso `"A Meta não oferece ligações neste número"` com o texto `"O número está em coexistência: usa o app WhatsApp Business no celular e a API oficial ao mesmo tempo. Nesse modo, as ligações ficam só no app do celular e não chegam ao Kinbox. Para receber ligações aqui, use o número só na API oficial, sem o app WhatsApp Business."` As chaves de receber e fazer ligações só podem ser desligadas, e a API da Kinbox recusa iniciar ligações nesse canal. |
| Janela de 24 horas | Vale normalmente para o que é enviado pela Kinbox (ver [Janela de 24 horas: quando é preciso usar um template](/docs/canais/whatsapp/whatsapp-cloud-api/janela-de-24-horas)). |
| Templates, configurações e avisos | Iguais aos do canal oficial padrão (ver [Configurações do WhatsApp oficial](/docs/canais/whatsapp/whatsapp-cloud-api/configuracoes)). |
| **Atualizar registro** | Não recomendar nem executar em canal de coexistência. O cadastro pula o registro do número de propósito nesse modo, mas o menu da lista oferece **Atualizar registro** para qualquer canal oficial sem distinguir o modo; executar o registro pode afetar o número no app WhatsApp Business. |

## Como identificar se um canal está em coexistência

A Kinbox não mostra um selo ou indicador visual de coexistência na lista de canais nem na aba **Geral** do canal. A marcação existe apenas nos dados internos do canal e só fica visível na tela no aviso da aba **Ligações**, nos workspaces que têm o recurso em teste habilitado.
