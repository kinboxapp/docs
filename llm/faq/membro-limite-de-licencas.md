---
title: Por que não consigo convidar mais um membro?
description: Na maioria das vezes, todas as licenças de membro do plano já estão em uso — inclusive pelo proprietário e por convidados que ainda não aceitaram.
keywords: [limite de licenças, número limite de operadores atingido, não consigo convidar membro, adicionar mais membros, licença de membro, assinatura expirada, já existe um convite]
publico: llm
tipo: faq
fontes:
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/routes/OperatorsApiRoutes.js
  - api-v0:server/controllers/OperatorController.js
codigo:
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/routes/OperatorsApiRoutes.js
  - web:src/pages/settings/members/**
verificado_em: 2026-11-26
---

## Pergunta

Por que não consigo convidar mais um membro?

## Resposta

Na maioria das vezes, porque todas as licenças de membro do plano já estão em uso.

Todo membro com acesso ativo ocupa uma licença — inclusive o proprietário do workspace e quem foi convidado e ainda não aceitou o convite. Membros marcados como **Inativo** não ocupam licença. Quando o limite é atingido, a Kinbox exibe a mensagem `"Número limite de operadores atingido"`. Para liberar vaga, desative quem não usa mais o workspace em **Configurações** → **Ambiente** → **Membros** ou aumente o número de licenças em **Configurações** → **Assinatura** → **Mudar plano** (exige a permissão **Assinatura** ou ser o proprietário).

Outros dois motivos impedem o envio do convite:

- Se aparecer `"Já existe um convite para esse operador"`, o e-mail já está cadastrado no workspace (ativo, **Inativo** ou **Convidado**): pesquise o e-mail em **Membros** com o filtro **Tudo** para usar **Reativar** ou **Reenviar convite**.
- Se aparecer `"Assinatura expirada"`, a assinatura do workspace está vencida há mais de 3 dias e precisa ser regularizada para liberar novos convites.

Veja mais em [Licenças, desativar membros e transferir a propriedade](/docs/administracao/licencas-e-propriedade).

## Variações

- erro número limite de operadores atingido ao convidar membro
- não consigo adicionar mais um usuário no workspace
- atingi o limite de licenças mesmo tendo convites pendentes
- como liberar vaga para convidar outro atendente
- já existe um convite para esse operador
- convite de membro bloqueado com assinatura expirada
