---
title: "Ações em lote e exportação: limites, colunas, permissões e erros"
description: Regras das ações em lote da Caixa de entrada e da exportação de conversas para CSV, com o limite de 93 dias e 10.000 conversas, as colunas do arquivo, as permissões e as mensagens de erro.
keywords: [exportar conversas, exportação csv, 93 dias, 10.000 conversas, colunas do arquivo, ações em lote, resolver em lote, seu perfil não pode exportar conversas, exportar para csv, protocolo]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/inbox/Conversations/ConversationSegmentActionsModal.tsx
  - web:src/pages/inbox/Conversations/ConversationExport/conversationExport.ts
  - web:src/pages/inbox/Conversations/ConversationExport/ConversationExportFields.tsx
  - web:src/lib/exporters/conversation-csv.ts
  - api:src/modules/conversation-exports/conversation-exports.service.ts
  - KIN-7728
codigo:
  - web:src/pages/inbox/Conversations/ConversationSegmentActionsModal.tsx
  - web:src/pages/inbox/Conversations/ConversationExport/**
  - web:src/lib/exporters/conversation-csv.ts
  - api:src/modules/conversation-exports/**
verificado_em: 2026-11-26
---

Referência complementar de `docs/conversas/acoes-em-lote-e-exportar`.

## Ações em lote: regras gerais

- Escopo: aplica-se a **todas** as conversas da lista aberta (visão ou filtro + **Filtrar por** + pesquisa da lista). Não existe seleção manual de conversas por checkbox.
- Restrição geral: **Não pode executar ações em lote** desativa o item **Executar ação...** no menu **Mais opções**.
- Ritmo: processa 1 conversa por segundo, exibindo progresso, contagem e botão **Abortar** (ao abortar: "Ação cancelada durante execução").
- Contagem final: `{{total}}` é exibido como `feitas/total` (ex.: `8/10`); conversas puladas ou com erro não entram no primeiro número.
- **Resolver** em lote deixa como estão as conversas já resolvidas (elas contam como feitas) e pula as que têm campo personalizado obrigatório vazio ou que esbarram na restrição **Esconder mensagens se não atribuído.** numa conversa de outra pessoa ("Você não tem permissão para resolver essa conversa"). O motivo individual de cada conversa pulada não é exibido.
- **Atribuir** e **Mover para grupo** em lote aplicam as mesmas regras de grupo e bot (atribuir a quem não está no grupo remove o grupo; mover para grupo sem o responsável remove a atribuição; ambos desligam o bot).

| Ação | Campo extra | Aviso no fim | Permissão / restrição verificada na tela |
| --- | --- | --- | --- |
| **Resolver** | — | "{{total}} conversas foram resolvidas" | — |
| **Atribuir** | **Membro** (obrigatório) | "{{total}} conversas foram atribuídas" | Permissão **Atribuir** (item desativado sem ela). |
| **Mover para grupo** | **Grupo** (obrigatório) | "{{total}} conversas foram movidas para o grupo" | Permissão **Mover para grupo** (item desativado sem ela). |
| **Adicionar Tag** | **Tag** (obrigatório) | "{{total}} conversas tiveram tags adicionadas" | — |
| **Remover Tag** | **Tag** (obrigatório) | "{{total}} conversas tiveram tags removidas" | — |
| **Exportar conversas** | **Período** (obrigatório) | "{{calls}} atendimentos e {{messages}} mensagens exportados" | Bloqueada com **Não pode exportar para CSV** ou **Não pode executar ações em lote** (conferidas também no servidor). |

## Exportar conversas (em lote)

- **Período padrão:** mês passado inteiro.
- **Limite de período:** máximo de **93 dias** por exportação.
- **Limite de conversas:** máximo de **10.000 conversas** no período.
- **Escopo:** entram conversas abertas e resolvidas do filtro atual que tiveram mensagens no período e que o membro pode ver.
- **Visibilidade e privacidade (conferidas no servidor):**
  - Somente atendimentos dentro do acesso do membro são exportados.
  - Com **Esconder mensagens se não atribuído.** ou **Esconder mensagens se não atribuído, com botão de aceitar.**, entram apenas atendimentos atribuídos ao próprio membro.
  - Com **Esconder telefone**, a coluna **Telefone/identificador** sai vazia.
- **Formato do arquivo:** `conversas_AAAA-MM-DD_a_AAAA-MM-DD.csv`, separado por ponto e vírgula (`;`), codificação UTF-8 com BOM (abre no Excel mantendo acentos).
- **Execução:** ocorre no navegador; a aba precisa permanecer aberta até o download iniciar (estimativa da tela: cerca de 1 minuto para 2.000 conversas).
- **Caso de 20.000 mensagens:** internamente o navegador solicita lotes menores (até 100 conversas por pedido) e divide o lote sozinho se passar de 20.000 mensagens; o erro de limite só aparece para o usuário se **uma única conversa** tiver mais de 20.000 mensagens no período.

### Colunas do CSV em lote (nesta ordem)

1. **ID da sessão**
2. **Protocolo**
3. **ID da conversa**
4. **Link**
5. **Contato**
6. **Telefone/identificador**
7. **Canal**
8. **Agente responsável**
9. **Grupo**
10. **Tags**
11. **Início**
12. **Fim**
13. **Data/hora da mensagem**
14. **Remetente**
15. **Tipo** (`Cliente`, `Agente`, `Bot`, `Nota interna` ou `Sistema`)
16. **Mensagem** (arquivos e mídias saem como link; notas internas entram com tipo `Nota interna`)

### Mensagens de erro e sucesso da exportação em lote

| Situação | Mensagem exata |
| --- | --- |
| Período maior que 93 dias | "Escolha um período de até 93 dias." |
| Data inicial posterior à final | "O início do período precisa ser antes do fim." |
| Mais de 10.000 conversas no período | "Esse filtro tem mais de 10.000 conversas no período. Escolha um período menor ou um filtro mais específico." |
| Nenhuma conversa teve mensagem no período | "Nenhuma conversa deste filtro teve mensagens no período." |
| Uma única conversa com mais de 20.000 mensagens no período | "Essas conversas têm mensagens demais para um lote. Envie menos conversas por vez." |
| Sem permissão de exportar ou de lote | "Seu perfil não pode exportar conversas." |
| Cancelamento pelo usuário | "Exportação cancelada" |
| Falha genérica | "Não foi possível exportar as conversas. Tente de novo." |
| Sucesso | "{{calls}} atendimentos e {{messages}} mensagens exportados" |

## Exportar uma conversa só

- Ação: **Mais ações** → **Exportar para CSV** no cabeçalho da conversa.
- Arquivo: `mensagens-conversa-{id}` (CSV).
- Colunas: **Data**, **Remetente** (`Cliente`, `Bot`, `Sistema` ou nome do membro) e **Mensagem**.
- Limite: até **9.999 mensagens**.
- Restrições: a restrição **Não pode exportar para CSV** desativa o item; o item some quando as mensagens da conversa estão escondidas para o membro.
- Mensagens: "Exportando..." durante o processo; "Erro ao exportar conversa." em caso de falha.
