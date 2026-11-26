---
title: O que são TME e TMA?
description: TME é o tempo médio de espera da criação da sessão até a primeira resposta de um membro, e TMA é o tempo médio de atendimento da primeira resposta até a resolução.
keywords: [tme, tma, tmp, tempo médio de espera, tempo médio de atendimento, tempo médio de resposta, tempo pós-atribuição, primeira resposta, produtividade, relatórios, sla]
publico: llm
tipo: faq
fontes:
  - api:src/modules/reports/session-summary/session-summary.consumer.ts
  - api:src/modules/reports/session-summary/session-summary.service.ts
  - api:src/modules/reports/session-summary/time-average.ts
  - api-v0:server/modules/chat/auxiliary/sendMessageToClient.js
codigo:
  - web:src/pages/reports/Productivity/**
  - web:src/pages/reports/useReports.tsx
  - web:src/pages/reports/RangePickerReport/**
  - web:src/pages/reports/ReportOverview/IndividualSummaries.tsx
  - api:src/modules/reports/session-summary/**
  - api-v0:server/modules/chat/auxiliary/sendMessageToClient.js
verificado_em: 2026-11-26
---

## Pergunta

O que são TME e TMA?

## Resposta

**TME** é o tempo médio de espera, contado da criação da sessão até a primeira resposta de um membro; **TMA** é o tempo médio de atendimento, contado da primeira resposta de um membro até a resolução da sessão.

Há também o **TMP** (tempo médio pós-atribuição), contado da primeira atribuição da sessão a um membro até a primeira resposta de um membro. Você vê os três indicadores em **Relatórios** → **Produtividade** (seu papel precisa da permissão **Gerenciar relatórios**; o proprietário do workspace sempre vê).

Principais regras que afetam os cálculos:

- **Bot e primeira resposta:** mensagens do bot e mensagens automáticas do sistema não contam como primeira resposta, então o tempo com o bot até a primeira resposta entra no **TME**. O tempo antes da primeira atribuição fica fora do **TMP**, e o tempo antes da primeira resposta fica fora do **TMA**; o bot não é descontado à parte dentro desses intervalos. Uma **nota interna** enviada por um membro também conta como primeira resposta.
- **Sessões fora das médias:** sessões iniciadas pela equipe pelo botão **Enviar mensagem** ficam fora do **TME** e do **TMP**. Sessões resolvidas sem nenhuma resposta de membro não têm TME, TMP nem TMA.
- **Quais sessões entram:** a **Produtividade** só considera sessões criadas ou resolvidas no período. Dentro delas, o **TME** e o **TMP** usam as que tiveram a primeira resposta no período, e o **TMA** usa as resolvidas no período com atendimento de pelo menos **1 minuto**.
- **Horário comercial:** quando o workspace (na tela, **ambiente**) tem um **Horário comercial** escolhido em **Configurações** → **Ambiente** → **Geral**, os três tempos contam apenas os minutos dentro desse horário (veja [Definir os horários de atendimento](/docs/configuracoes-no-workspace/criar-e-gerenciar-horarios)). Uma sessão cuja espera ou atendimento ficou inteira fora do horário fica com tempo zero e não entra na média.
- **Responsável atual:** ao agrupar **Por Membro** ou **Por Grupo**, a sessão inteira conta para quem é o responsável atual (ou era ao ser resolvida).

Os relatórios de atendimento não têm uma meta de SLA de resposta para configurar: para acompanhar prazos de resposta das conversas, use o **TME** da **Produtividade** e, em tempo real, os alertas de espera e atraso do [Atendimento e vendas ao vivo](/docs/relatorios/ao-vivo).

Veja os detalhes em [Relatório de produtividade](/docs/relatorios/produtividade) e [Como os relatórios contam sessões e tempos](/docs/relatorios/como-funcionam).

## Variações

- o que significa tme e tma na kinbox
- tempo médio de resposta no relatório
- o que é tma no relatório
- por que meu tme está alto
- tme conta o tempo do bot
- como é calculado o tempo médio de atendimento
- qual a diferença entre tme tmp e tma
- a kinbox tem relatório de sla?
