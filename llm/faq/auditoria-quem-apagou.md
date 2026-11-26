---
title: Como sei quem apagou ou alterou algo no workspace?
description: A Auditoria, em Configurações → Auditoria, mostra quem criou, alterou ou excluiu algo no workspace nos últimos 30 dias, com filtros por data, membro, ação e entidade.
keywords: [quem apagou, quem deletou, quem excluiu, quem mudou, quem alterou, histórico de ações, auditoria, log, registro de alterações]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/audit/Audit.tsx
  - web:src/pages/settings/index.tsx
  - api:src/modules/audit/audit.schema.ts
  - api:src/modules/mcp/mcp-audit.service.ts
codigo:
  - web:src/pages/settings/audit/**
  - api:src/modules/audit/audit.schema.ts
  - api:src/modules/mcp/mcp-audit.service.ts
verificado_em: 2026-11-26
---

## Pergunta

Como sei quem apagou ou alterou algo no workspace?

## Resposta

Use a **Auditoria**, em **Configurações** → **Auditoria** (precisa da permissão **Auditoria** no papel ou ser o proprietário do workspace; nos papéis prontos, só **Administrador** tem). Ela mostra quem criou, alterou ou excluiu algo no workspace (na tela, **ambiente**) nos últimos 30 dias, com as colunas **Autor**, **Ação**, **Entidade**, **Descrição** e **Quando**.

Para achar quem apagou um item:

1. Clique em **Filtros**.
2. Em **Ação**, escolha **Excluiu** (para alterações, filtre **Atualizou (Put)** e depois **Atualizou (Patch)**, que aparecem ambos como **Atualizou** na lista).
3. Restrinja com **Criado entre**, **Membro**, **Entidade** ou **ID da entidade** (use **Entidade** ou **ID da entidade**, um de cada vez) e clique em **Filtrar**.

Se a pessoa saiu do workspace, a coluna **Autor** mostra **Membro removido**. Consultas feitas na tela (como abrir uma conversa) e tentativas com erro não aparecem; as chamadas feitas pelo MCP aparecem, inclusive as de leitura. Itens que não estão entre as opções de **Entidade** aparecem na lista: filtre por **Membro** ou **Criado entre** para achá-los.

Veja mais em [Ver o histórico de alterações (Auditoria)](/docs/administracao/auditoria).

## Variações

- quem excluiu esse contato
- como ver quem deletou uma tag
- quem mudou a configuração do workspace
- tem histórico de ações dos atendentes
- onde vejo o log de alterações da kinbox
