---
title: A Agenda manda lembrete automático para o cliente?
description: Não — o Kinbox Agenda não envia lembrete, confirmação nem aviso de reagendamento ou cancelamento ao contato, nem lembrete ao membro; para avisar o cliente, envie ou agende uma mensagem na conversa.
keywords: [lembrete agendamento, confirmação de agendamento, aviso automático agenda, lembrete de consulta, notificação agendamento whatsapp, avisar cliente horário marcado, aviso de cancelamento agenda, kinbox agenda lembrete]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/index.tsx
  - web:src/pages/kingenda/kingendaBookingDetails.tsx
  - web:src/pages/crm/tasks/EditTask.tsx
  - api:src/modules/agents/flow/actions/agenda.operations.ts
codigo:
  - web:src/pages/settings/agendas/**
  - web:src/pages/kingenda/**
  - web:src/pages/crm/tasks/EditTask.tsx
verificado_em: 2026-11-26
---

## Pergunta

A Agenda manda lembrete automático para o cliente?

## Resposta

Não. O **Kinbox Agenda** não envia lembrete automático, confirmação nem aviso de reagendamento ou cancelamento ao contato, por nenhum canal.

- **Como avisar o cliente hoje:** mande uma mensagem na conversa do contato ou use [Agendar uma mensagem](/docs/conversas/agendar-mensagem) para o dia anterior ao atendimento. Como são funções separadas, a mensagem agendada não acompanha mudanças no agendamento — se você reagendar ou cancelar o horário, ajuste ou exclua a mensagem agendada manualmente.
- **Agendamentos feitos por agente de IA:** a Kinbox adiciona apenas uma nota interna na conversa para avisar a equipe, sem enviar notificação automática ao contato.
- **Lembrete para a equipe:** os membros também não recebem lembrete automático dos agendamentos da Agenda.

Veja mais em [Criar, reagendar e cancelar agendamentos](/docs/agenda/agendamentos) e [Kinbox Agenda: visão geral](/docs/agenda/kinbox-agenda).

## Variações

- a agenda envia confirmação automática para o cliente
- dá para mandar lembrete de consulta no whatsapp pela agenda
- como avisar o cliente um dia antes do horário marcado
- o cliente recebe notificação quando eu reagendo ou cancelo o agendamento
- existe lembrete automático de horário marcado no kinbox agenda
- o atendente recebe lembrete antes do horário do agendamento
