---
title: Como mando um link de pagamento para o meu cliente?
description: O painel de parceiro não tem hoje a opção de gerar link de pagamento; o cliente contrata em Configurações → Assinatura ou o parceiro com inspeção avançada ajusta pela inspeção.
keywords: [link de pagamento, link de checkout, gerar link de checkout, cobrar cliente parceiro, código inválido checkout, assinatura do cliente, inspecionar clientes avançado, parceiro contratar plano]
publico: llm
tipo: faq
fontes:
  - web:src/pages/partner/PartnerWorkspaces/index.tsx
  - web:src/pages/auth/PartnerCheckout.tsx/index.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
  - web:src/pages/settings/billing/BillingV2.tsx
codigo:
  - web:src/pages/partner/PartnerWorkspaces/**
  - web:src/pages/auth/PartnerCheckout.tsx/**
  - web:src/pages/settings/billing/BillingV2.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
  - api:src/modules/workspaces/**
verificado_em: 2026-11-26
---

## Pergunta

Como mando um link de pagamento para o meu cliente?

## Resposta

O painel de parceiro não tem, hoje, a opção de gerar um link de pagamento para o cliente.

Para contratar ou alterar o plano, o próprio cliente acessa **Configurações** → **Assinatura** no workspace dele (exige a permissão **Assinatura** ou ser o proprietário; veja [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano)).

Se a sua parceria naquele cliente permite inspeção e o seu papel tem **Pode inspecionar clientes (Avançado)**, você também pode abrir a tela **Assinatura** do cliente durante a inspeção (veja [Inspecionar o workspace de um cliente](/docs/programa-de-parceiros/inspecionar-cliente)). Com **Pode inspecionar clientes (Básico)**, a tela **Assinatura** não aparece. Se os botões de contratar ou mudar de plano não aparecerem no workspace do cliente, fale com o suporte da Kinbox.

Caso o cliente já tenha recebido um link de checkout (endereço `/c/...`), o link vale por **7 dias**; depois de vencido ou se estiver incorreto, a página exibe "Código inválido".

## Variações

- onde gerar link de checkout no painel de parceiro
- posso enviar link de cobrança para o cliente assinar a kinbox
- como o cliente indicado contrata o plano
- consigo mudar o plano do meu cliente pela inspeção
- link de checkout deu código inválido
- por quanto tempo vale o link de pagamento do parceiro
