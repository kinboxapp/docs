---
title: Como encerro sozinho as conversas paradas?
description: Use uma automação com o gatilho Tempo sem nova mensagem e a ação Resolver conversa, ou configure Expirar Sessão no bot; para conversas já paradas, use filtro por tempo e ação em lote.
keywords: [encerrar por inatividade, fechar conversa sozinho, resolver conversa automaticamente, tempo sem nova mensagem, expirar sessão, conversas paradas]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/automations/EditAutomations.tsx
  - web:src/components-old/forms/ActionsInput/index.tsx
  - web:src/pages/settings/bot/EditBotSettings.tsx
codigo:
  - web:src/pages/settings/automations/**
  - web:src/pages/settings/bot/EditBotSettings.tsx
  - api-v0:server/modules/scheduler/callExpirationScheduler.js
verificado_em: 2026-11-26
---

## Pergunta

Como encerro sozinho as conversas paradas?

## Resposta

Use uma automação com o gatilho **Tempo sem nova mensagem** e a ação **Resolver conversa**.

Não existe um botão de "encerrar por inatividade" dentro da Caixa de entrada. Os caminhos disponíveis são:

- **Automações** (**Configurações** → **Automação** → **Automações**): crie uma automação com o gatilho **Tempo sem nova mensagem** (ou **Tempo sem nenhuma resposta do membro na sessão nova**), defina **Minutos sem resposta** (pode haver atraso de até 3 minutos) e adicione a ação **Resolver conversa**. Há também a opção **Habilitar para sessões geradas por API ou Integração**. Veja o modelo pronto em [Exemplos de automação: follow-up, encerrar por inatividade e avaliação](/docs/automacao/exemplos#2-encerrar-conversas-paradas-inatividade).
- **Bot:** configure **Expirar Sessão** (horas e minutos, **Mensagem ao expirar** e **Executar bot ao expirar**) para finalizar automaticamente enquanto o bot atende (a conversa recebe o aviso "Essa sessão expirou e foi finalizada").
- **Para encerrar várias conversas já paradas agora:** crie um [filtro de conversa](/docs/conversas/criar-filtros-de-conversa) com a condição **Tempo** → **Minutos desde última mensagem** e execute **Resolver** em [Ações em lote e exportar conversas](/docs/conversas/acoes-em-lote-e-exportar).

## Variações

- fechar conversas automaticamente quando o cliente não responde
- como resolver atendimento por inatividade
- encerrar conversa depois de x minutos sem resposta
- tem como finalizar conversas antigas paradas de uma vez
- expirar sessão do bot por falta de resposta
