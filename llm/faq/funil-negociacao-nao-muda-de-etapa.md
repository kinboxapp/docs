---
title: Por que não consigo mudar a negociação de etapa?
description: Ao mover uma negociação pelo quadro ou pela tela da negociação, a Kinbox bloqueia a mudança se o papel tiver Não pode voltar para etapa anterior, se houver tarefa obrigatória pendente ou se faltar campo obrigatório da etapa atual.
keywords: [não consigo mover negociação, negociação travada na etapa, voltar etapa bloqueado, tarefas obrigatórias pendentes, preencha todos os campos obrigatórios, erro ao arrastar cartão no funil, mudar estágio bloqueado]
publico: llm
tipo: faq
fontes:
  - web:src/pages/crm/deals/*.tsx
  - web:src/pages/crm/deals/ViewDeal/**
  - web:src/pages/settings/roles/permissionSections.tsx
  - web:src/pages/settings/pipelines/EditPipelineStagesDnd.tsx
codigo:
  - web:src/pages/crm/deals/*.tsx
  - web:src/pages/crm/deals/*.ts
  - web:src/pages/crm/deals/DealsActions/**
  - web:src/pages/crm/deals/Kanban/**
  - web:src/pages/crm/deals/AddDeal/**
  - web:src/pages/crm/deals/ViewDeal/**
  - web:src/pages/crm/deals/DealActivities/**
  - web:src/pages/crm/deals/DealTabActions/**
  - web:src/components-old/forms/FiltersInput/deal.filter.tsx
  - web:src/components-old/chat/side/DealsPlugin/**
  - web:src/pages/settings/pipelines/EditPipelineRules.tsx
  - web:src/pages/settings/pipelines/EditPipelineStagesDnd.tsx
  - web:src/pages/settings/pipelines/wizard/**
  - api:src/modules/deals/**
  - api:src/modules/activities/**
  - api:src/modules/pipelines/cadence.service.ts
verificado_em: 2026-11-26
---

## Pergunta

Por que não consigo mudar a negociação de etapa?

## Resposta

Ao mover uma negociação pelo quadro ou pela tela da negociação (barra de etapas ou **Editar etapa e funil**), a Kinbox verifica três bloqueios nesta ordem: a restrição de voltar etapa do seu papel, tarefas obrigatórias pendentes na negociação e campos obrigatórios da etapa **atual** (veja [Trabalhar com negociações no funil](/docs/crm/gerenciando-funil-de-vendas) e [Motivos de perda, campos obrigatórios e regras do funil](/docs/crm/motivos-de-perda-e-regras)).

Confira qual mensagem aparece e como resolver:

1. **Restrição de voltar etapa (`"Você não tem permissão para retornar a uma etapa anterior. Chame seu gestor para essa ação."`):** seu papel tem a restrição **Não pode voltar para etapa anterior**. Peça ao gestor ou ao proprietário do workspace para mover a negociação ou alterar seu papel (o proprietário nunca tem restrições).
2. **Tarefa obrigatória pendente (`"Você tem tarefas obrigatórias pendentes, não é possível mudar estágio."`):** existe pelo menos uma tarefa obrigatória aberta (não concluída e não cancelada) na negociação — a Kinbox considera todas as tarefas obrigatórias pendentes da negociação, não apenas as da etapa atual. Conclua ou cancele a tarefa no painel **Tarefas** da negociação para liberar a mudança.
3. **Campos obrigatórios da etapa atual (`"Preencha todos os campos obrigatórios antes de mover o negócio para a próxima etapa."`):** a Kinbox confere os campos configurados para **sair da etapa em que a negociação está** (não os da etapa de destino), em qualquer direção. Preencha os campos destacados na negociação (por exemplo, **Valor do negócio** precisa ser maior que zero) e mova novamente.

Observações adicionais:

- Negociações **ganhas** ou **perdidas** podem mudar de etapa normalmente e continuam ganhas ou perdidas (para reabrir, use **Retomar negociação** / **Retomar ticket**).
- Se aparecer `"Não foi possível mudar de etapa pois o negócio não existe mais."`, a negociação foi excluída enquanto o quadro estava aberto.

## Variações

- o cartão volta para a coluna anterior quando arrasto no funil
- erro você tem tarefas obrigatórias pendentes não é possível mudar estágio
- preencha todos os campos obrigatórios antes de mover o negócio
- não tenho permissão para voltar a negociação para etapa anterior
- quais campos são conferidos ao mover de etapa, os da etapa atual ou da próxima
- dá para mudar de etapa uma negociação que já foi ganha ou perdida
