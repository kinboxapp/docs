---
title: Como crio uma negociação a partir de uma conversa?
description: Na conversa, abra Mostrar detalhes do contato, vá na seção Negociações da aba Detalhes e clique em + (ou em Negócio); exige Pode gerenciar as negociações da conversa. e Gerenciar negociações.
keywords: [criar negociação na conversa, abrir negócio pelo chat, adicionar negociação no atendimento, seção negociações não aparece, vincular conversa à negociação, negócio do contato na conversa]
publico: llm
tipo: faq
fontes:
  - web:src/components-old/chat/side/DealsPlugin/**
  - web:src/components-old/chat/side/ContactDetails/index.tsx
  - web:src/pages/crm/deals/AddDeal/**
  - web:src/pages/settings/roles/permissionSections.tsx
  - api:src/modules/deals/**
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
  - api:src/modules/deals/**
  - api:src/modules/activities/**
verificado_em: 2026-11-26
---

## Pergunta

Como crio uma negociação a partir de uma conversa?

## Resposta

Abra a conversa na [Caixa de entrada: visão geral](/docs/conversas/caixa-de-entrada-do-kinbox), abra a seção **Negociações** no painel **Detalhes** à direita (se o painel estiver fechado, clique em **Mostrar detalhes do contato**), passe o mouse sobre o título e clique em **+** (ou em **Negócio**, se o contato ainda não tiver negociações) — para ver essa seção você precisa da permissão **Pode gerenciar as negociações da conversa.** e, para criar ou editar, também de **Gerenciar negociações** (o proprietário do workspace sempre tem acesso).

Como funciona na prática:

- **O que aparece na seção:** a seção **Negociações** lista todas as negociações **do contato** da conversa (abertas, ganhas e perdidas), não só as associadas a ela, e clicar em uma delas abre os detalhes em uma gaveta lateral por cima da conversa.
- **O que já vem preenchido:** a janela **Nova negociação** (ou **Novo ticket**) já abre com o **Contato** fixo, o **Nome da negociação** preenchido com o nome do contato (editável), a **Organização** principal do contato sugerida e esta conversa associada automaticamente. Escolha o **Funil** e a **Etapa** e clique em **Criar** (ou **Criar e abrir**).
- **Responsável:** se você deixar **Responsável** vazio no formulário, a negociação fica atribuída a quem a criou (não ao responsável da conversa).
- **Bloqueios na criação:** se aparecer `"Você não pode criar um negócio..."` ou `"Você já tem um máximo de ... negociações abertas com esse contato."`, seu papel tem uma restrição de criação para contatos com negociação aberta ou o funil atingiu o limite de negociações abertas por contato.
- **Associar uma negociação já existente:** abra a negociação e use **⋯** → **Associar uma conversa** (ou use **Associar conversas** em [Ações em lote no funil](/docs/crm/acoes-em-lote)).
- **Criação automática:** bots e agentes de IA também podem criar negociações ligadas à conversa — veja [Blocos do bot](/docs/bot/blocos-do-bot) (**Ação de CRM**) e [Ações do fluxograma](/docs/agente-de-ia/acoes-do-fluxograma) (**Criar negócio**), além de automações e cenários.

Para mais detalhes sobre edição e regras das negociações, veja [Trabalhar com negociações no funil](/docs/crm/gerenciando-funil-de-vendas).

## Variações

- como abrir uma negociação direto pelo atendimento
- por que a seção negociações não aparece nos detalhes da conversa
- qual permissão libera criar negócio dentro da conversa
- quem fica como responsável quando crio uma negociação pelo chat
- como ligar uma conversa a uma negociação que já existe
- dá para o bot ou agente de IA criar negociação na conversa
