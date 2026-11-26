---
title: Como baixo o histórico de todas as conversas?
description: Use Exportar conversas em ações em lote (até 93 dias e 10.000 conversas em CSV) ou Exportar para CSV em uma conversa; para períodos maiores, exporte por partes, pois não há backup automático.
keywords: [exportar histórico, baixar todas as conversas, backup das conversas, exportar csv, limite 93 dias, 10.000 conversas]
publico: llm
tipo: faq
fontes:
  - web:src/pages/inbox/Conversations/ConversationExport/conversationExport.ts
  - api:src/modules/conversation-exports/conversation-exports.service.ts
  - web:src/lib/exporters/conversation-csv.ts
codigo:
  - web:src/pages/inbox/Conversations/ConversationExport/**
  - api:src/modules/conversation-exports/**
  - web:src/lib/exporters/conversation-csv.ts
verificado_em: 2026-11-26
---

## Pergunta

Como baixo o histórico de todas as conversas?

## Resposta

Você pode exportar o histórico de duas formas na Caixa de entrada:

- **Várias conversas de um filtro (em lote):** entram as conversas da visão ou do filtro, abertas e resolvidas, que tiveram mensagens no período (exportar a partir de **Abertos** também traz as resolvidas). Abra a visão ou o filtro desejado, clique em **Mais opções** → **Executar ação...** → **Exportar conversas**, escolha um **Período** de até **93 dias** (limite de **10.000 conversas** por exportação) e clique em **Executar**, mantendo a aba aberta até o download do CSV começar.
- **Uma única conversa:** abra a conversa e clique em **Mais ações** → **Exportar para CSV** (até 9.999 mensagens).

Para baixar um período maior que 93 dias, divida a exportação em partes. Não existe backup automático nem exportação completa de todo o workspace em uma única ação (os relatórios do workspace também têm exportações próprias). Veja o passo a passo em [Ações em lote e exportar conversas](/docs/conversas/acoes-em-lote-e-exportar).

## Variações

- como fazer backup de todas as conversas da kinbox
- exportar conversas para excel ou csv
- baixar histórico de atendimento de um ano inteiro
- existe backup automático das mensagens
- como exportar mensagens de um cliente específico
