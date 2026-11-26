---
title: Posso criar uma conta pelo app?
description: Não; o app da Kinbox para celular só entra em uma conta que já existe, e o cadastro ou novo workspace é feito pela Kinbox no navegador.
keywords: [criar conta no app, cadastrar pelo celular, criar workspace no app, novo cadastro aplicativo, sem ambiente ativo, entrar no app sem conta, convite workspace]
publico: llm
tipo: faq
fontes:
  - mobile:src/app/sign-in-form.tsx
  - mobile:src/app/sign-in.tsx
  - mobile:src/app/workspaces.tsx
codigo:
  - mobile:src/app/(tabs)/_layout.tsx
  - mobile:src/app/(tabs)/profile/index.tsx
  - mobile:src/app/sign-in.tsx
  - mobile:src/app/sign-in-form.tsx
  - mobile:src/app/privacy.tsx
  - mobile:src/app/appearance.tsx
  - mobile:src/app/workspaces.tsx
  - web:src/components/base/MobileApp/**
  - web:src/components-old/header/UserDrop.tsx
verificado_em: 2026-11-26
---

## Pergunta

Posso criar uma conta pelo app?

## Resposta

Não; o app da Kinbox para celular só entra em uma conta que já existe.

Para criar uma conta e um workspace, use a Kinbox no navegador do computador. Também não é possível criar um novo workspace pelo app. Se você quer entrar no workspace da sua empresa, peça um convite a quem administra o workspace (veja [Gerenciar membros](/docs/configuracoes-no-workspace/gerenciar-membros)).

Ao tentar entrar no app com uma conta sem workspace (na tela, **ambiente**) ativo — inclusive usando **Continuar com Google** sem ter conta cadastrada — aparece a mensagem: "Esta conta não tem acesso a um ambiente ativo. Entre com sua conta de trabalho ou peça acesso ao administrador da sua empresa."

Se você excluiu sua conta anteriormente, o seu e-mail fica livre para um cadastro novo pela Kinbox no navegador (veja [Excluir sua conta pelo app](/docs/app/excluir-conta)). Veja também [App da Kinbox para celular: o que dá para fazer](/docs/app/visao-geral).

## Variações

- consigo fazer cadastro pelo aplicativo da kinbox
- como criar um workspace novo pelo celular
- entrei com o google no app e disse que não tem acesso a um ambiente ativo
- onde fica o botão de criar conta no app da kinbox
- posso abrir uma conta na kinbox pelo iphone ou android
- excluí minha conta e quero criar outra pelo app
