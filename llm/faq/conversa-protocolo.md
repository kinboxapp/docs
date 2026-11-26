---
title: A Kinbox gera número de protocolo de atendimento?
description: Sim, cada atendimento (sessão) recebe um número que é o protocolo, visível na conversa, na chave {{protocol}} e na coluna Protocolo da exportação; o formato não é configurável.
keywords: [protocolo de atendimento, número de protocolo, gerar protocolo, nova sessão, chave protocolo, exportar protocolo]
publico: llm
tipo: faq
fontes:
  - api-v0:server/services/CustomerPlatformService.js
  - web:src/components-old/ui/PlaceholderDropSearch/index.tsx
  - web:src/pages/inbox/Conversations/ConversationExport/conversationExport.ts
codigo:
  - api-v0:server/services/CustomerPlatformService.js
  - web:src/components-old/ui/PlaceholderDropSearch/index.tsx
verificado_em: 2026-11-26
---

## Pergunta

A Kinbox gera número de protocolo de atendimento?

## Resposta

Sim: cada atendimento (sessão) recebe um número, que é o protocolo.

Ele aparece na conversa no separador "Nova sessão #N", pode ser enviado ao contato usando a chave reservada **Protocolo** (`{{protocol}}`) em [frases rápidas](/docs/conversas/criar-frases-rapidas-para-suas-conversas) ou mensagens digitadas, e entra na coluna **Protocolo** ao exportar conversas em lote (veja [Ações em lote e exportar conversas](/docs/conversas/acoes-em-lote-e-exportar)). O formato do número de protocolo não é configurável na tela. Veja também [Caixa de entrada: visão geral](/docs/conversas/caixa-de-entrada-do-kinbox).

## Variações

- a kinbox tem protocolo automático para cada atendimento
- como mandar o número do protocolo para o cliente
- onde vejo o protocolo de uma conversa
- dá para personalizar o formato do protocolo
- o protocolo aparece na exportação das conversas
