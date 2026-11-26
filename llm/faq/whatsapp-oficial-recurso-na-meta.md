---
title: Minha conta foi restringida pela Meta. A Kinbox pede revisão?
description: Não. A Kinbox não pede revisão à Meta nem mostra restrições da conta; o pedido precisa ser feito pela própria empresa na Meta.
keywords: [conta restringida meta, bloqueio meta, pedir revisão meta, apelação whatsapp oficial, desbloquear conta whatsapp business, restrição de envio]
publico: llm
tipo: faq
fontes:
  - api-v0:server/controllers/WbaCloudController.js
  - api:src/modules/whatsapp-api/services/core/whatsapp-api-status-monitor.service.ts
  - web:src/pages/inbox/Message.tsx
codigo:
  - api-v0:server/controllers/WbaCloudController.js
  - api:src/modules/whatsapp-api/services/core/whatsapp-api-status-monitor.service.ts
  - web:src/pages/inbox/Message.tsx
  - web:src/pages/settings/channels/whatsappCloud/**
verificado_em: 2026-11-26
---

## Pergunta

Minha conta foi restringida pela Meta. A Kinbox pede revisão?

## Resposta

Não. A Kinbox não tem como pedir revisão à Meta nem mostra avisos de restrição da conta na tela.

No WhatsApp oficial, o status **Conectado** na lista de canais não acompanha bloqueios ou restrições na Meta. Os sinais que aparecem na Kinbox são mensagens com ícone de erro, exibindo o motivo devolvido pela Meta ao passar o mouse sobre o aviso. O pedido de revisão precisa ser feito pela própria empresa diretamente na Meta; o suporte da Kinbox pode ajudar a entender os erros exibidos na Kinbox. Veja mais em [Problemas ao conectar ou enviar pelo WhatsApp oficial](/docs/canais/whatsapp/whatsapp-cloud-api/problemas-comuns).

## Variações

- a meta bloqueou minha conta comercial do whatsapp, a kinbox consegue desbloquear
- meu número oficial foi suspenso pela meta, como faço recurso pela kinbox
- a kinbox avisa quando a conta do whatsapp business toma restrição
- canal aparece conectado mas minha conta está restrita na meta
- o suporte da kinbox abre chamado na meta por bloqueio de conta
