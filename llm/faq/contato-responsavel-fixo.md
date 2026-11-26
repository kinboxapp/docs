---
title: Dá para fixar um membro responsável para cada cliente (carteira)?
description: Não existe um campo de responsável fixo no contato, mas a estratégia Atribuir para último membro que atendeu ao contato devolve cada conversa nova ao último membro que atendeu aquele contato.
keywords: [carteira de clientes, responsável fixo, vendedor fixo por cliente, atendente fixo, sempre cair para o mesmo atendente, último membro que atendeu ao contato, fidelizar cliente ao vendedor]
publico: llm
tipo: faq
fontes:
  - api-v0:server/services/AssignmentService.js
  - api-v0:server/mongodb/services/SessionSummaryService.js
  - web:src/pages/settings/assignmentRules/EditAssignmentRule.tsx
codigo:
  - api-v0:server/services/AssignmentService.js
  - api-v0:server/mongodb/services/SessionSummaryService.js
  - web:src/pages/settings/assignmentRules/**
verificado_em: 2026-11-26
---

## Pergunta

Dá para fixar um membro responsável para cada cliente (carteira)?

## Resposta

Não existe um campo de responsável fixo no contato, mas a regra de atribuição **Atribuir para último membro que atendeu ao contato** devolve cada conversa nova ao último membro que atendeu aquele contato.

Pontos para observar ao usar essa regra:

- Ela precisa estar ligada em **Configurações** → **Automação** → **Atribuição automática** (toda regra nova nasce desligada) e ser a regra ativa usada nas sessões novas (apenas uma regra ligada é aplicada em cada sessão nova).
- A busca olha as conversas do contato em todos os canais, menos os escolhidos em **Excluir canais**.
- Com **Membro precisa estar disponível** marcado, se o último membro estiver indisponível, a conversa fica sem responsável; com a opção desmarcada, vai para ele mesmo indisponível. Um membro inativo nunca recebe por essa regra.
- Na primeira conversa do contato ainda não há último membro registrado, então a conversa fica sem responsável — atribua manualmente ou use outra regra.

Veja mais em [Estratégias de atribuição automática](/docs/atendimento/estrategias-de-atribuicao) e [Atribuir, mover para um grupo ou transferir uma conversa](/docs/conversas/atribuir-e-transferir).

## Variações

- como definir um vendedor fixo para cada contato
- dá para fazer carteira de clientes na kinbox
- como fazer o cliente sempre cair para o mesmo atendente
- o contato tem campo de responsável fixo
- como direcionar o cliente recorrente para quem já atendeu ele
- atribuir automaticamente para o vendedor da carteira
