---
title: "Abas antigas \"Individual\" e \"Por API\" (layout antigo)"
description: O que são as abas Individual, Por API e Campanhas (Antigo) da tela de campanhas no layout antigo da Kinbox, quem vê e onde ficam os agendamentos no layout atual.
keywords: [individual, por api, mensagens agendadas, agendamentos, campanhas antigo, layout antigo, mensagens enviadas pela api, aba individual campanha]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/campaigns/index2.tsx
  - web:src/pages/campaigns/MessageSchedules/index.tsx
  - web:src/pages/campaigns/MessagesAPI/index.tsx
  - web:src/routes/crm.routes.ts
  - web:src/pages/settings/roles/permissionSections.tsx
codigo:
  - web:src/pages/campaigns/index2.tsx
  - web:src/pages/campaigns/MessageSchedules/**
  - web:src/pages/campaigns/MessagesAPI/**
  - web:src/routes/crm.routes.ts
verificado_em: 2026-11-26
---

## Quando aparece o layout antigo

No layout antigo da Kinbox — exibido, por exemplo, em telas de celular (largura menor que 768 px) e em algumas versões de marca branca —, o caminho **CRM** → **Campanhas** abre uma tela com quatro abas:

- **Campanhas:** tela atual de campanhas em massa (veja [Campanhas: visão geral](/docs/campanhas/visao-geral)).
- **Individual:** lista de mensagens agendadas individualmente (tela **Agendamentos**).
- **Por API:** lista de mensagens enviadas ou na fila pela API.
- **Campanhas (Antigo):** versão anterior do editor de campanhas de WhatsApp (a versão atual fica em **Campanhas**).

No layout atual (**Campanhas** no menu lateral), apenas a tela atual de campanhas aparece; as abas **Individual**, **Por API** e **Campanhas (Antigo)** não são exibidas.

## Permissões no layout antigo

- Para abrir a tela, o membro precisa da permissão **Campanhas**.
- As abas **Individual** e **Por API** exigem, além de **Campanhas**, a permissão **Agendamentos** ("Ver, adicionar, editar e excluir agendamentos."). Quem tem apenas **Agendamentos** sem **Campanhas** não consegue acessar a tela.

## Aba Individual (tela Agendamentos)

Exibe a lista de mensagens agendadas para números de WhatsApp específicos ("Agende uma mensagem para um número de WhatsApp específico.").

- **Colunas:** **Contato**, **Status** (**Falha ao enviar**, **Enviado** e **Aguardando**), **Agendado para**, **Canal** e **Texto**.
- **Ações:** **Editar**, **Excluir** (confirmação: "Tem certeza que deseja excluir esse agendamento? Essa operação não poderá ser desfeita.") e exportar.

No layout atual da Kinbox, os agendamentos ficam diretamente na conversa do contato (pelo selo **Mensagem Agendada** ou em **Ver Informações** → **Agendamentos**). Veja [Agendar uma mensagem](/docs/conversas/agendar-mensagem).

## Aba Por API

Exibe a lista de mensagens que foram ou estão na fila para envio pela API ("Mensagem que foram ou estão na fila para serem enviadas através da nossa API.").

- **Colunas:** **Contato**, **Status** (**Falha ao enviar**, **Enviado** e **Aguardando**), **Criado em**, **Enviado em**, **Canal**, **Texto** e **Erro**.
- **Busca e filtros:** campo "Pesquisar por contato ou texto" e filtros **Criado de**, **Criado até**, **Enviado**, **Teve erro** e **Canal**.
