---
title: Por que não consigo excluir um funil?
description: A Kinbox bloqueia a exclusão de qualquer funil que ainda tenha negociações (abertas, ganhas ou perdidas) e exige a permissão Funis; mova ou exclua as negociações antes de excluir o funil.
keywords: [não consigo excluir funil, erro ao deletar funil, não pode deletar funil enquanto tiver negociações associadas a ele, apagar funil com negócios, excluir etapa do funil]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/pipelines/index.tsx
  - web:src/pages/settings/pipelines/EditPipelineStagesDnd.tsx
  - api:src/modules/pipelines/**
codigo:
  - web:src/pages/settings/pipelines/index.tsx
  - web:src/pages/settings/pipelines/PipelineWizard.tsx
  - web:src/pages/settings/pipelines/EditPipeline.tsx
  - web:src/pages/settings/pipelines/EditPipelineStagesDnd.tsx
  - web:src/pages/settings/pipelines/wizard/**
  - web:src/components-old/ui/PrivacyField/**
  - api:src/modules/pipelines/**
  - api:src/modules/pipelines/pipeline.schema.ts
verificado_em: 2026-11-26
---

## Pergunta

Por que não consigo excluir um funil?

## Resposta

A Kinbox bloqueia a exclusão de qualquer funil que ainda tenha negociações associadas (abertas, ganhas ou perdidas), exibindo `"Não pode deletar funil enquanto tiver negociações associadas a ele."`, e exige a permissão **Funis** (ou ser o proprietário do workspace) para excluir — veja [Criar um funil e as etapas](/docs/crm/criar-funil-de-vendas).

Como resolver:

1. **Verifique sua permissão:** você precisa da permissão **Funis** (na seção **Gerenciamento do Ambiente**) para acessar **Configurações** → **CRM** → **Funis** e excluir um funil.
2. **Esvazie o funil antes de excluir:** abra o funil no menu **Funis** com o período em **Fluxo geral** e sem filtros que escondam negociações. Mova todas as negociações para outro funil usando **Mover todos os negócios** em [Ações em lote no funil](/docs/crm/acoes-em-lote) (ou **Editar etapa e funil** em cada negociação) ou exclua as negociações antes. Sem filtro de **Etapa**, **Mover todos os negócios** alcança também as negociações de etapas já excluídas.
3. **Exclua o funil:** volte em **Configurações** → **CRM** → **Funis**, clique em **⋯** → **Excluir** e confirme. A exclusão do funil é definitiva e não tem volta.

Negociações de uma etapa já excluída não aparecem nas colunas do quadro, mas continuam no funil e impedem a exclusão dele. É por isso que o funil pode parecer vazio e ainda assim não ser excluído: use **Mover todos os negócios** sem filtro de **Etapa** para levá-las a outro funil.

Se você quiser excluir apenas uma **etapa** (e não o funil inteiro), remover a etapa não apaga as negociações que estavam nela — antes de excluí-la, filtre o funil por **Etapa** e mova as negociações dessa etapa com **Mover todos os negócios**.

## Variações

- aparece não pode deletar funil enquanto tiver negociações associadas a ele
- excluir um funil apaga as negociações que estão dentro dele
- como limpar um funil para conseguir excluir
- já fechei todas as negociações do funil e ainda não consigo deletar
- o que acontece com as negociações se eu excluir uma etapa do funil
- qual permissão preciso para excluir um funil
