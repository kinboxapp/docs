---
title: Por que os snapshots anteriores do dashboard aparecem desativados?
description: No seletor de snapshots do dashboard, os snapshots anteriores ficam desativados para quem não tem a permissão Atribuir no papel; essa pessoa vê sempre o mais recente e ainda pode gerar um novo.
keywords: [snapshot desativado, snapshots anteriores, não consigo trocar de snapshot, seletor de snapshots cinza, dashboard snapshot antigo, permissão atribuir, histórico do dashboard]
publico: llm
tipo: faq
fontes:
  - web:src/pages/reports/CustomDashboard/DashboardSnapshotSelect.tsx
  - web:src/pages/reports/CustomDashboard/EditDashboard.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
codigo:
  - web:src/pages/reports/CustomDashboard/**
  - web:src/pages/settings/roles/permissionSections.tsx
verificado_em: 2026-11-26
---

## Pergunta

Por que os snapshots anteriores do dashboard aparecem desativados no seletor?

## Resposta

Os itens do seletor de snapshots (abaixo do título do dashboard) ficam desativados para quem não tem a permissão **Atribuir** no papel. Para consultar snapshots anteriores, peça ao administrador do workspace para marcar **Atribuir** na seção **Conversas** do seu papel, em **Configurações** → **Ambiente** → **Permissões** (veja [Criar papéis e permissões](/docs/configuracoes-no-workspace/configurar-permissoes-dos-usuarios) e a [Referência de permissões](/docs/administracao/referencia-de-permissoes)).

- **Sem a permissão:** você continua vendo o dashboard com o snapshot mais recente, que a Kinbox abre automaticamente, e pode gerar um novo em **Obter dados atualizados** (com a permissão **Gerenciar relatórios**).
- **Com a permissão:** cada item do seletor mostra a data, a hora e quem gerou o snapshot; clique em um item para ver os números daquela foto.

Veja mais em [Criar dashboards](/docs/relatorios/dashboard).

## Variações

- não consigo selecionar um snapshot antigo do dashboard
- snapshots do dashboard ficam cinza
- como ver os dados de ontem no dashboard
- seletor de snapshot bloqueado
- por que só aparece o snapshot mais recente
