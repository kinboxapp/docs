---
title: O que é um snapshot de dashboard e quando fica pronto?
description: Snapshot é a foto dos dados de todos os cartões de um dashboard num momento; é gerado ao clicar em Obter dados atualizados, leva alguns minutos e chega uma notificação quando fica pronto.
keywords: [snapshot, dashboard, obter dados atualizados, atualizar dados, dashboard desatualizado, dashboard não atualiza, dados do dashboard, notificação, cartões carregando]
publico: llm
tipo: faq
fontes:
  - web:src/pages/reports/CustomDashboard/EditDashboard.tsx
  - web:src/pages/reports/CustomDashboard/DashboardSnapshotSelect.tsx
  - api:src/modules/dashboards/snapshots/snapshots.service.ts
  - api:src/modules/dashboards/snapshots/snapshot.consumer.ts
codigo:
  - web:src/pages/reports/CustomDashboard/**
  - web:src/models/dashboards.ts
  - web:src/components-old/ui/PrivacyField/**
  - web:src/hooks/usePrivacy.ts
  - api:src/modules/dashboards/**
verificado_em: 2026-11-26
---

## Pergunta

O que é um snapshot de dashboard e quando fica pronto?

## Resposta

Um **snapshot** é uma foto dos dados de todos os cartões de um dashboard calculada em um momento: os cartões exibem o snapshot selecionado, e não dados ao vivo.

- **Como gerar:** clique no botão **Obter dados atualizados** (ao lado do seletor de snapshots ou no fim da lista do seletor) e confirme em **Atualizar dados**. É preciso ter a permissão **Gerenciar relatórios** e o dashboard precisa ter pelo menos um cartão.
- **Quando fica pronto:** o cálculo roda em segundo plano, numa fila, sem prazo fixo — pode levar vários minutos, dependendo do tamanho do dashboard. Enquanto processa, os cartões ficam carregando e o seletor mostra um ícone girando. Quando termina, você recebe uma notificação no sino no topo da tela para abrir o snapshot pronto.
- **Qual snapshot abre e como ver anteriores:** ao abrir o dashboard, a Kinbox carrega sempre o snapshot mais recente. No seletor abaixo do título (no formato `DD/MM/YYYY HH:mm by <nome>`), você pode consultar snapshots anteriores. Se os snapshots anteriores aparecerem desativados no seletor, peça ao administrador a permissão **Atribuir** no seu papel.
- **Se falhar:** em caso de erro no processamento, os cartões exibem um aviso de falha e o botão **Tentar novamente**, que gera um novo snapshot.
- **Atualização:** o dashboard não atualiza sozinho nem tem agendamento: gere um novo snapshot sempre que precisar de números atualizados.
- **Dashboard Compartilhado e exceções:** em dashboards com **Período dos relatórios** definido como **Compartilhado**, escolha as datas no seletor do topo antes de atualizar, pois o snapshot usa esse intervalo. Os cartões **Tarefas** são exceção: consultam os dados na hora.

Veja mais em [Criar dashboards](/docs/relatorios/dashboard) e [Exportar relatórios e quem pode ver cada um](/docs/relatorios/exportar-e-permissoes).

## Variações

- meu dashboard não atualiza
- dashboard mostra dados de ontem
- como atualizar o dashboard
- cartões do dashboard ficam carregando
- o que é aquele 'by' com data no dashboard
- quanto tempo demora para atualizar o dashboard
- recebi notificação de novos dados da dashboard
- ver dados antigos do dashboard
