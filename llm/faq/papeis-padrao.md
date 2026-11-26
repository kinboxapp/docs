---
title: Quais papéis já vêm prontos no workspace?
description: Em geral, um workspace novo vem com três papéis prontos — Administrador, Supervisor e Atendente — que podem ser editados, clonados ou excluídos.
keywords: [papéis padrão, permissões padrão, administrador, supervisor, atendente, nova permissão, modelos de permissão, perfis prontos]
publico: llm
tipo: faq
fontes:
  - api:src/modules/workspace-defaults/workspace-defaults.constants.ts
  - api-v0:server/services/RolesService.js
codigo:
  - api:src/modules/workspace-defaults/**
  - api-v0:server/services/RolesService.js
  - api-v0:server/auxiliary/DefaultRoles.js
verificado_em: 2026-11-26
---

## Pergunta

Quais papéis já vêm prontos no workspace?

## Resposta

Em geral, três: **Administrador**, **Supervisor** e **Atendente**.

- **Administrador** ("Acesso total, inclusive cobrança e configurações"): libera tudo o que o Supervisor tem, mais **Assinatura**, **Permissões**, **Auditoria**, **Agentes de IA**, **Automações**, **Base de conhecimento**, **Metas** e **Gerenciar Organizações**.
- **Supervisor** ("Acompanha a equipe, relatórios e filas"): vê todas as conversas (**Global**), acessa relatórios, campanhas, canais, membros, grupos, contatos, integrações, negociações e a maior parte das configurações do workspace; não inclui **Assinatura**, **Permissões**, **Auditoria**, **Agentes de IA**, **Automações**, **Base de conhecimento** nem **Metas**.
- **Atendente** ("Atende conversas e gerencia negociações"): vê conversas com **Por Grupo ou sem Grupo**, usa as ações de conversa, **Salas**, **Tags**, **Frases Rápidas**, **Filtros** e **Gerenciar negociações**; não inclui relatórios, contatos, canais nem configurações do workspace.

Na tela, os papéis ficam em **Configurações** → **Ambiente** → **Permissões** (disponível para o proprietário ou quem tem a permissão **Permissões**). Você pode editar, clonar ou excluir esses papéis — um papel em uso por algum membro não pode ser excluído antes de trocar o papel desses membros — e criar outros clicando em **Nova permissão**.

Veja o passo a passo em [Criar papéis e permissões](/docs/configuracoes-no-workspace/configurar-permissoes-dos-usuarios).

## Variações

- quais permissões vêm prontas quando crio um ambiente na Kinbox
- qual a diferença entre Administrador, Supervisor e Atendente
- o que o papel Supervisor consegue acessar
- posso editar ou excluir os papéis padrão de permissão
