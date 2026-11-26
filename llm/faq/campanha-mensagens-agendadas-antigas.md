---
title: Onde ficaram as mensagens agendadas "Individual" e "Por API"?
description: As abas Individual e Por API só existem no layout antigo da tela de campanhas; no layout atual os agendamentos ficam na conversa.
keywords: [individual, por api, mensagens agendadas, aba sumiu, agendamentos campanha]
publico: llm
tipo: faq
fontes:
  - web:src/pages/campaigns/index2.tsx
  - web:src/routes/routes.ts
  - web:src/routes/crm.routes.ts
codigo:
  - web:src/pages/campaigns/index2.tsx
  - web:src/routes/routes.ts
  - web:src/routes/crm.routes.ts
verificado_em: 2026-11-26
---

## Pergunta

Onde ficaram as mensagens agendadas "Individual" e "Por API"?

## Resposta

As abas **Individual** e **Por API** só existem no layout antigo da tela de campanhas (**CRM** → **Campanhas**) e não aparecem no item **Campanhas** do layout atual.

O layout antigo é exibido apenas em telas de celular (menos de 768 px), ambientes de templates e marcas brancas; nele, acessar **Individual** e **Por API** exige as permissões **Campanhas** e **Agendamentos** juntas.

No layout atual, os agendamentos de um contato ficam na própria conversa, pelo selo **Mensagem Agendada** ou em **Ver Informações** → **Agendamentos**. Veja como usar em [Agendar uma mensagem](/docs/conversas/agendar-mensagem).

## Variações

- cadê a aba individual nas campanhas
- sumiu a aba por api da tela de campanhas
- onde vejo as mensagens agendadas na kinbox
- não acho a lista de agendamentos em campanhas
- como ver a fila de mensagens enviadas pela api
- onde foi parar a tela de mensagens agendadas individuais
