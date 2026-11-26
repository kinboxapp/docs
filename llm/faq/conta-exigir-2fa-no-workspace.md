---
title: Posso obrigar todo mundo do workspace a usar a verificação em duas etapas?
description: Não existe opção para exigir a verificação em duas etapas no workspace inteiro; cada membro ativa a própria, e quem administra acompanha o status na lista de membros.
keywords: [obrigar 2fa, exigir 2fa, forçar verificação em duas etapas, dois fatores obrigatório, segurança do workspace, ativar 2fa para outro membro, quem ativou 2fa]
publico: llm
tipo: faq
fontes:
  - api:src/modules/operators/two-factor/two-factor.controller.ts
  - api:src/modules/operators/two-factor/two-factor.service.ts
  - web:src/pages/settings/profile/TwoFactorPreference.tsx
codigo:
  - web:src/pages/settings/profile/TwoFactor*.tsx
  - web:src/components/twoFactor/**
  - web:src/lib/twoFactor.ts
  - web:src/pages/auth/TwoFactorStep.tsx
  - api:src/modules/operators/two-factor/**
verificado_em: 2026-11-26
---

## Pergunta

Posso obrigar todo mundo do workspace a usar a verificação em duas etapas?

## Resposta

Não; não existe opção para obrigar os membros do workspace a usar a verificação em duas etapas (2FA), e cada membro ativa a própria.

- Quem administra os membros consegue ver quem já ativou pelo escudo verde na lista de **Membros** e na coluna **Verificação em duas etapas** da exportação.
- Como alternativa, peça a cada membro para seguir [Ativar a verificação em duas etapas](/docs/conta/verificacao-em-duas-etapas) e acompanhe quem concluiu pela lista de **Membros** (veja [Gerenciar membros](/docs/configuracoes-no-workspace/gerenciar-membros)).
- Ninguém do workspace consegue ativar nem desativar a verificação de outro membro. Se alguém perder o celular e os códigos de recuperação, apenas o suporte da Kinbox pode redefinir.

## Variações

- tem como tornar a verificação em duas etapas obrigatória para toda a equipe
- consigo exigir 2fa para todos os membros do ambiente
- como administrador posso ativar o 2fa na conta de um membro
- dá para saber quais membros ativaram a autenticação de dois fatores
- o proprietário consegue desativar o 2fa de um membro que perdeu o celular
- existe configuração de 2fa obrigatório no workspace
