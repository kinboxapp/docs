---
title: Como troco o cartão ou a forma de pagamento?
description: Para trocar a forma de pagamento ou o cartão sem mudar o plano, fale com o suporte; se o cartão falhou em uma fatura, use Tentar pagar novamente para escolher outro cartão.
keywords: [trocar cartão, mudar cartão, alterar cartão, trocar forma de pagamento, mudar forma de pagamento, mudar de boleto para cartão, cartão recusado, dados de cobrança]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/billing/v2/RetryPaymentModal.tsx
  - web:src/pages/settings/billing/v2/CheckoutModal.tsx
  - api-v0:server/controllers/NewPaymentController.js
codigo:
  - web:src/pages/settings/billing/v2/Checkout.tsx
  - web:src/pages/settings/billing/v2/CheckoutModal.tsx
  - web:src/pages/settings/billing/v2/CheckoutCard.tsx
  - web:src/pages/settings/billing/v2/BillingDataFormFields.tsx
  - web:src/pages/settings/billing/v2/CreditCardPicker.tsx
  - web:src/pages/settings/billing/AddBalanceModal/index.tsx
  - api-v0:server/controllers/NewPaymentController.js
verificado_em: 2026-11-26
---

## Pergunta

Como troco o cartão ou a forma de pagamento?

## Resposta

Para trocar a forma de pagamento (por exemplo, de boleto ou Pix para cartão de crédito) ou mudar o cartão das próximas cobranças fora de uma mudança de plano, fale com o suporte; se a cobrança no cartão falhou em uma fatura, você pode escolher outro cartão direto pela fatura usando **Tentar pagar novamente**.

- **Cartão recusado em uma fatura:** vá em **Configurações** → **Assinatura** → **Faturas**, abra o menu **...** da fatura com status **Falha ao pagar** (a mais recente do período atual) e clique em **Tentar pagar novamente**. Escolha outro cartão salvo ou clique em **Adicionar novo cartão** e confirme o pagamento. Se for aprovado, esse cartão passa a ser usado automaticamente nas próximas cobranças.
- **Trocar a forma de pagamento ou os dados de cobrança fora de uma falha:** não existe uma tela própria na Kinbox para alterar só o método de pagamento ou os dados de cobrança sem alterar o plano, então fale com o suporte para fazer a troca com segurança.

Veja mais em [Faturas, boletos e nota fiscal](/docs/assinatura/faturas) e [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano).

## Variações

- quero mudar o pagamento de boleto para cartão de crédito
- como cadastrar um novo cartão de crédito na assinatura
- meu cartão venceu como atualizo na kinbox
- posso mudar minha assinatura de cartão para pix ou boleto
- onde altero os dados de cobrança e e-mail das faturas
- pagamento recusado como pagar com outro cartão
