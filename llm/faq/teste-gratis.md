---
title: Como funciona o teste grátis da Kinbox?
description: Todo workspace novo tem 7 dias de teste grátis sem cartão de crédito, com até 10 licenças e 1 canal de WhatsApp, sem Instagram nem campanhas.
keywords: [teste grátis, quantos dias de teste, trial, degustação, 7 dias, sem cartão, limite do teste grátis, whatsapp no teste, instagram no teste, estender teste, acabou o teste]
publico: llm
tipo: faq
fontes:
  - api-v0:server/config/constants.js
  - api-v0:server/controllers/OperatorController.js
  - api-v0:server/controllers/NewPaymentController.js
  - web:src/hooks/useInit.tsx
  - web:src/pages/settings/billing/BillingV2.tsx
codigo:
  - api-v0:server/config/constants.js
  - api-v0:server/modules/accessRestriction/**
  - web:src/stores/sessionStore.jsx
  - web:src/hooks/useInit.tsx
verificado_em: 2026-11-26
---

## Pergunta

Como funciona o teste grátis da Kinbox?

## Resposta

7 dias, sem cartão de crédito. Todo workspace (na tela, **ambiente**) novo começa no teste grátis até o fim do 7º dia.

- **O que inclui e limites:** até **10 licenças** de membro (contando você), **1 canal de WhatsApp** (oficial ou por QR Code), **1 página do Facebook**, **1 canal de Telegram** e **3 canais de e-mail**, além de chat no site sem limite de quantidade. O **Instagram** não pode ser conectado e as **campanhas** ficam bloqueadas durante o teste — veja [Canais: conectar e gerenciar](/docs/canais/visao-geral).
- **Saldo para testar a IA:** todo workspace novo recebe um saldo inicial de cortesia na carteira — veja [Saldo da carteira e créditos: o que consome](/docs/conceitos/saldo-e-creditos).
- **Avisos:** nos últimos dias, aparece no topo a faixa "Faltam N dias para acabar sua degustação." com **Assine agora!** para quem cuida da assinatura. Em **Configurações** → **Assinatura**, aparece "Trial" com o tempo restante e o botão **Assinar um plano**.
- **Quando acaba sem assinar:** o bloqueio vem alguns dias depois do fim do teste. Com o teste vencido há mais de 3 dias, aparece a faixa "Sua assinatura expirou..." e o editor de mensagens some (não dá para responder conversas). Depois que o teste termina sem assinatura, adicionar canais e convidar membros também fica bloqueado. Escolher um plano libera o acesso — veja [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano) e [Minha assinatura venceu ou o pagamento falhou](/docs/assinatura/assinatura-vencida).
- **Estender o teste:** não há botão no aplicativo para estender o período; fale com o suporte (ou com o parceiro, se o workspace estiver ligado a um).
- **Outro workspace:** cada workspace novo criado pela mesma pessoa começa o próprio teste grátis de 7 dias.

Veja o passo a passo do cadastro em [Criar sua conta e o workspace](/docs/primeiros-passos/criar-seu-workspace-no-kinbox).

## Variações

- quantos dias dura o teste grátis da kinbox
- precisa cadastrar cartão de crédito para testar a kinbox
- o que está liberado no período de degustação ou trial
- o que acontece quando acaba o teste grátis da kinbox
- dá para estender o prazo do teste grátis
- posso conectar whatsapp e instagram durante o teste grátis
- quantas licenças vêm no teste grátis
