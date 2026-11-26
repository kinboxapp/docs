---
title: O parceiro consegue ler minhas conversas?
description: Se o workspace é ligado a um parceiro que pode inspecioná-lo, a opção Permitir que o parceiro veja as conversas, no cartão Parceria, decide se ele vê as conversas.
keywords: [parceiro vê conversas, parceiro lê conversas, privacidade do parceiro, esconder conversas do parceiro, permitir que o parceiro veja as conversas, conversas restritas pelo cliente, revenda, agência, consultor]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/workspace/index.tsx
  - web:src/layouts/BaseLayout.tsx
  - web:src/pages/settings/audit/Audit.tsx
codigo:
  - web:src/pages/settings/workspace/index.tsx
  - web:src/layouts/BaseLayout.tsx
  - web:src/pages/settings/audit/**
verificado_em: 2026-11-26
---

## Pergunta

O parceiro consegue ler minhas conversas?

## Resposta

Depende de uma opção que você controla. Se o seu workspace (na tela, **ambiente**) for ligado a um parceiro que pode inspecioná-lo, o cartão **Parceria** aparece em **Configurações** → **Ambiente** → **Geral** com a opção **Permitir que o parceiro veja as conversas**. Ela vem ligada; para mudar, é preciso ter a permissão **Workspace** no papel ou ser o proprietário, e clicar em **Salvar mudanças**.

Com a opção desligada, o parceiro deixa de ver as conversas do seu workspace: o item **Caixa de entrada** some do menu dele e, ao tentar abrir uma conversa, ele vê "Conversas restritas pelo cliente" ("O cliente não permite que o parceiro veja as conversas deste ambiente. Relatórios e configurações continuam disponíveis.").

As chamadas feitas pelo parceiro pelo MCP ficam na **Auditoria**: em **Configurações** → **Auditoria**, abra **Filtros**, escolha **Parceiro via MCP** em **Ação** e clique em **Filtrar** (precisa da permissão **Auditoria** no papel ou ser o proprietário).

Se o cartão **Parceria** não aparece, o seu workspace não é ligado a um parceiro que pode inspecioná-lo. Para confirmar o vínculo ou pedir para desfazê-lo, fale com o suporte da Kinbox.

Veja o passo a passo em [Controlar o que o parceiro vê no seu workspace](/docs/administracao/acesso-do-parceiro).

## Variações

- o parceiro que me indicou vê minhas mensagens
- a agência consegue ver as conversas dos meus clientes
- como esconder as conversas do parceiro
- o que é conversas restritas pelo cliente
- o revendedor tem acesso ao meu atendimento
