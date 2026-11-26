---
title: O que acontece se eu atrasar o pagamento?
description: Há 3 dias de carência após o vencimento; depois o campo de mensagem some e não dá para adicionar membros nem canais, e após 7 dias os canais de WhatsApp por QR Code são excluídos.
keywords: [atrasar pagamento, assinatura vencida, boleto vencido, carência, bloqueio, quantos dias bloqueia, perco minhas conversas, canais excluídos, pagamento atrasado]
publico: llm
tipo: faq
fontes:
  - web:src/hooks/useInit.tsx
  - web:src/stores/sessionStore.jsx
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/modules/scheduler/deleteChannelsScheduler.js
codigo:
  - web:src/hooks/useInit.tsx
  - web:src/stores/sessionStore.jsx
  - web:src/pages/inbox/Chat/index.tsx
  - web:src/pages/settings/billing/BillingV2.tsx
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/modules/scheduler/deleteChannelsScheduler.js
  - api-v0:server/services/WorkspacePlatformService.js
verificado_em: 2026-11-26
---

## Pergunta

O que acontece se eu atrasar o pagamento?

## Resposta

Você tem **3 dias** de carência depois do vencimento com acesso normal; passado esse prazo, o campo de mensagem some das conversas e não dá para adicionar membros nem canais, e **7 dias** depois do vencimento os canais de WhatsApp por QR Code são desconectados e excluídos da lista.

- Pagar a fatura em **Configurações** → **Assinatura** → **Faturas** atualiza a data em **Expira em** e devolve o acesso ao workspace.
- A Kinbox não envia e-mail automático avisando que a assinatura venceu; o aviso aparece na faixa no topo do app.
- Quando a assinatura é no cartão de crédito e a cobrança falha, a Kinbox não tenta cobrar de novo sozinha — use **Tentar pagar novamente** na fatura.
- A exclusão após 7 dias vale apenas para canais de WhatsApp por QR Code (o WhatsApp oficial não entra nessa rotina). Depois de regularizar o pagamento, é preciso conectar o número novamente em [Conectar o WhatsApp pelo QR Code](/docs/canais/conectar-whatsapp-app).

Veja como regularizar em [Minha assinatura venceu ou o pagamento falhou](/docs/assinatura/assinatura-vencida).

## Variações

- quantos dias depois do vencimento a kinbox bloqueia o acesso
- atrasei o boleto da kinbox o sistema para na hora
- quanto tempo tenho de carência se a assinatura vencer
- se eu atrasar a mensalidade meu whatsapp desconecta
- perco meus canais de whatsapp se a assinatura expirar
- a kinbox tenta cobrar o cartão de novo se falhar
