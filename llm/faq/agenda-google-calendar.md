---
title: A Agenda sincroniza com o Google Calendar?
description: Não — o Kinbox Agenda não sincroniza com o Google Calendar, não exporta arquivos iCal e não tem link público para o cliente marcar sozinho; o Google Calendar existe apenas como ferramenta separada do agente de IA.
keywords: [google calendar, google agenda, sincronizar agenda, integrar agenda google, exportar ics, ical, link de agendamento, cliente agendar sozinho, outlook calendar, kinbox agenda]
publico: llm
tipo: faq
fontes:
  - web:src/pages/kingenda/kingendaBookingDetails.tsx
  - web:src/pages/agents/components/tools/tool.defs.tsx
  - api:src/modules/agents/flow/actions/googlecalendar-create-event.action.ts
  - api:src/modules/agents/flow/actions/agenda.helper.ts
codigo:
  - web:src/pages/kingenda/**
  - web:src/pages/settings/agendas/**
  - api:src/modules/agenda/**
verificado_em: 2026-11-26
---

## Pergunta

A Agenda sincroniza com o Google Calendar?

## Resposta

Não. Os serviços e agendamentos do **Kinbox Agenda** não vão para o Google Calendar, e eventos do Google Calendar não entram na Agenda. A Agenda também não exporta arquivos `.ics` (iCal) nem gera link público para o cliente marcar horários sozinho.

Na Kinbox, o Google Calendar existe apenas como ferramenta do agente de IA (na aba **Apps** do seletor de ferramentas e nos blocos do fluxograma, conectando uma conta Google no próprio agente), separado da Agenda: um mesmo agente pode usar os dois, mas um não atualiza o outro.

No chat de teste do editor, as ferramentas do Google Calendar criam eventos de verdade na conta conectada, enquanto criar, reagendar e cancelar no Kinbox Agenda são simulados — veja [Testar o agente antes de ativar](/docs/agente-de-ia/testar).

Veja mais em [Kinbox Agenda: visão geral](/docs/agenda/kinbox-agenda), [Dar ferramentas ao agente: Agenda, Google Calendar e HubSpot](/docs/agente-de-ia/ferramentas) e [Ações do fluxograma](/docs/agente-de-ia/acoes-do-fluxograma).

## Variações

- consigo integrar o kinbox agenda com o google agenda
- dá para ver os agendamentos da kinbox no google calendar do celular
- como exportar os horários da agenda em ical ou ics
- existe sincronização da agenda com o outlook calendar
- a kinbox oferece link público para o cliente escolher o horário sozinho
- o google calendar do agente de ia sincroniza com o kinbox agenda
