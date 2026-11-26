---
title: O agente consegue mandar follow-up depois de alguns dias?
description: Sim; pela ferramenta Agendar follow-up (de 1 minuto a 60 dias) ou pelos follow-ups do fluxograma, com cancelamento automático se um membro assumir ou a conversa for resolvida.
keywords: [follow-up agente de ia, mensagem de retomada, cobrar cliente automaticamente, sem resposta fluxograma, setar follow-ups, cancelar follow-up]
publico: llm
tipo: faq
fontes:
  - api:src/modules/agents/tools/schedule-followup.tool.ts
  - api:src/modules/agents/flow/flow-followup-scheduler.service.ts
  - api:src/modules/agents/flow/flow-followup.consumer.ts
  - web:src/pages/agents/components/tools/forms/ScheduleFollowupToolForm.tsx
codigo:
  - web:src/pages/agents/components/tools/**
  - web:src/components-old/forms/CredentialSelect/**
  - api:src/modules/agents/tools/**
  - api:src/modules/tools/**
  - api:src/modules/composio/**
  - api:src/modules/agents/composio-toolkits/**
verificado_em: 2026-11-26
---

## Pergunta

O agente consegue mandar follow-up depois de alguns dias?

## Resposta

Sim, de duas formas: com a ferramenta **Agendar follow-up** (para retomar em uma data ou prazo combinado na conversa, entre **1 minuto e 60 dias** à frente) ou com os follow-ups automáticos do [Fluxograma](/docs/agente-de-ia/fluxograma-e-etapas) quando o contato fica sem responder.

- **Ferramenta Agendar follow-up:** o agente calcula a data e hora no fuso do workspace, mantém a conversa aberta e substitui qualquer agendamento anterior na mesma sessão. A equipe pode cancelar manualmente na **Caixa de entrada** pelo botão **Cancelar follow-up**.
- **Follow-ups no fluxograma:** configurados em **Subagente**, **Coletar dados** (inclusive por dado), **Aguardar mensagem do cliente** ou de forma compartilhada com **Setar follow-ups** (desligada por **Limpar follow-ups**). Aceitam **Duração** mínima `1` em **Segundos**, **Minutos**, **Horas** ou **Dias** (sem limite máximo definido), rodam em cascata e são cancelados se o contato responder antes.
- **Cancelamento automático:** se um membro assumir a conversa ou ela for resolvida, os follow-ups pendentes são cancelados.
- **WhatsApp oficial:** se a janela de 24 horas estiver expirada na hora da retomada, a mensagem comum não pode ser enviada; marque **Usar template caso conversa expirada** e escolha o canal oficial e um template aprovado.

Veja mais em [Dar ferramentas ao agente](/docs/agente-de-ia/ferramentas) e [Ações do fluxograma](/docs/agente-de-ia/acoes-do-fluxograma).

## Variações

- o agente de ia pode chamar o cliente de novo se ele não responder
- qual o prazo máximo de follow-up do agente de ia
- o agente consegue agendar um retorno para a semana que vem
- o follow-up é cancelado se o cliente responder ou se um membro assumir
- como funciona o follow-up do agente no whatsapp oficial depois de 24 horas
- consigo cancelar um follow-up agendado pelo agente
