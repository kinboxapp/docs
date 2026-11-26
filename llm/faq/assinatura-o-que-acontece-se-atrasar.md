---
title: O que acontece se eu atrasar o pagamento?
description: Há 3 dias de carência após o vencimento; a partir do 4º dia o campo de mensagem some e não dá para convidar membros nem criar canais de WhatsApp ou Instagram, e 7 dias depois os canais de WhatsApp por QR Code saem da lista.
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

Depois do vencimento há **3 dias** de carência; a partir do 4º dia, o campo de mensagem some das conversas e não dá para convidar membros nem criar canais de WhatsApp ou Instagram. **7 dias** depois do vencimento, os canais de WhatsApp por QR Code são desconectados e saem da lista de canais (exceto no workspace do próprio parceiro).

- Pagar a fatura em **Configurações** → **Assinatura** → **Faturas** atualiza a data em **Expira em** e tira essas restrições.
- A Kinbox não envia e-mail avisando que a assinatura venceu; o aviso aparece na faixa no topo do app.
- Se a cobrança no cartão falhou, a Kinbox não tenta cobrar de novo sozinha. Se a opção **Tentar pagar novamente** aparecer na fatura, use-a; se não aparecer, fale com o suporte.
- A saída da lista depois de 7 dias vale só para canais de WhatsApp por QR Code; o WhatsApp oficial não entra nessa regra. Depois de regularizar o pagamento, conecte o número de novo em [Conectar o WhatsApp pelo QR Code](/docs/canais/conectar-whatsapp-app).

Veja como regularizar em [Minha assinatura venceu ou o pagamento falhou](/docs/assinatura/assinatura-vencida).

## Variações

- quantos dias depois do vencimento a kinbox bloqueia o acesso
- atrasei o boleto da kinbox o sistema para na hora
- quanto tempo tenho de carência se a assinatura vencer
- se eu atrasar a mensalidade meu whatsapp desconecta
- perco meus canais de whatsapp se a assinatura expirar
- a kinbox tenta cobrar o cartão de novo se falhar
