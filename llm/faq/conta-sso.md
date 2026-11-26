---
title: Dá para entrar com o login da empresa (SSO)?
description: A Kinbox não tem login por SSO corporativo (SAML, OpenID, Microsoft ou Okta); o acesso é com e-mail e senha, Continuar com o Google ou Apple no app para iPhone.
keywords: [sso, single sign on, saml, openid, okta, microsoft, entra id, active directory, login corporativo, login da empresa, google, apple, entrar com google]
publico: llm
tipo: faq
fontes:
  - web:src/pages/auth/Login.tsx
  - mobile:src/app/sign-in-form.tsx
  - api:src/modules/operators/two-factor/two-factor.service.ts
codigo:
  - web:src/pages/auth/**
  - web:src/components-old/SessionLimitReached.tsx
  - web:src/components/feedback/BusinessHoursAccessLocked.tsx
  - web:src/hooks/useSocket.tsx
  - web:src/hooks/useSocketV2.ts
  - api-v0:server/controllers/OperatorController.js
  - api-v0:server/security/loginBruteForceGuard.js
  - api:src/modules/operators/two-factor/**
  - api:src/modules/events/events.gateway.ts
verificado_em: 2026-11-26
---

## Pergunta

Dá para entrar com o login da empresa (SSO)?

## Resposta

Não existe login com SSO da empresa (SAML, OpenID, Microsoft ou Okta) na Kinbox; você entra com e-mail e senha ou com **Continuar com o Google** (e, no app para iPhone, também com a Apple).

- Se a sua empresa usa contas Google, dá para usar **Continuar com o Google** com o e-mail corporativo. O e-mail da conta Google precisa ser o mesmo da conta Kinbox; caso contrário, aparece "Você ainda não tem uma conta. Complete seu registro."
- Para proteger o acesso, cada membro pode ativar a verificação em duas etapas (2FA) em [Ativar a verificação em duas etapas](/docs/conta/verificacao-em-duas-etapas). O login com **Continuar com o Google** também pede o código do app autenticador quando a verificação está ativa.

Veja outras dúvidas de acesso em [Não consigo entrar na Kinbox](/docs/conta/problemas-de-acesso).

## Variações

- a kinbox tem login sso corporativo
- consigo entrar na kinbox com saml ou okta
- dá para logar na kinbox com conta microsoft ou entra id
- tem integração com active directory para login dos membros
- quais formas de login a kinbox aceita
- posso usar a conta google da empresa para entrar na kinbox
