---
title: Por que as ligações por telefone (VoIP) aparecem em Outros no relatório de Saldo?
description: No relatório Saldo, os minutos de ligação por telefone (VoIP) e o excedente do plano de ligações do WhatsApp não têm categoria própria e aparecem em Outros, pela descrição do débito.
keywords: [voip em outros, ligação em outros, saldo outros, categoria outros, consumo de ligações, minutos voip saldo, excedente do plano de ligações, voz e áudio]
publico: llm
tipo: faq
fontes:
  - web:src/pages/reports/WalletUsage/wallet-usage.helper.ts
  - web:src/pages/reports/WalletUsage/index.tsx
codigo:
  - web:src/pages/reports/WalletUsage/**
  - api:src/modules/wallet/**
  - api:src/modules/voip/**
verificado_em: 2026-11-26
---

## Pergunta

Por que as ligações por telefone (VoIP) aparecem em **Outros** no relatório de Saldo, e não em **Voz e áudio**?

## Resposta

No relatório **Saldo** (**Relatórios** → **Saldo**), cada débito entra em uma categoria pelo tipo de serviço. Os minutos de ligação por telefone (**Voip**) e o **Excedente do plano de ligações do WhatsApp** não têm categoria própria, então aparecem em **Outros**, com a descrição do débito como nome do serviço.

- **Em Voz e áudio:** ligações e gravações do WhatsApp, transcrições e resumos de chamadas, transcrição de áudio e ligações atendidas por IA.
- **Para ver só o VoIP:** clique em **Outros** em **Por categoria** para filtrar, ou procure "Voip" em **Buscar serviço** na tabela **Serviços**.
- **Minutos e status das chamadas:** ficam no [Relatório de ligações](/docs/relatorios/ligacoes), que não mostra valores em reais.

Veja mais em [Relatório de saldo](/docs/relatorios/saldo) (precisa da permissão **Gerenciar relatórios**).

## Variações

- ligação voip não aparece em voz e áudio
- o que é a categoria outros no saldo
- onde vejo quanto gastei com ligações por telefone
- excedente do plano de ligações aparece em outros
- consumo de voip no relatório de saldo
