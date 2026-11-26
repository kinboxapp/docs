---
title: Onde está a documentação da API?
description: A documentação da API pública da Kinbox fica na aba de referência da API do site, com entrada em Autenticação.
keywords: [documentação da api, referencia da api, swagger, openapi, endpoints da kinbox, onde pego o token da api, api pública, integrar sistema]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/api/index.tsx
  - api:src/modules/auth/guards/api-token-auth.guard.ts
  - api:src/guards/throttler.guard.ts
codigo:
  - web:src/pages/settings/api/**
  - api:src/modules/api-tokens/**
  - api:src/modules/auth/guards/api-token-auth.guard.ts
  - api:src/decorators/v1-access.decorator.ts
verificado_em: 2026-11-26
---

## Pergunta

Onde está a documentação da API?

## Resposta

A documentação da API pública da Kinbox fica na aba de referência da API do site, começando por [Autenticação](/api-reference/authentication). Lá estão os endpoints organizados por recurso: Contatos, Organizações, Campos personalizados, Tags, Produtos, Negócios, Funis, Tarefas, Campanhas, Sessões, Conversas, Execuções de ferramentas, Mensagens, Canais, Usuários, Funções, Grupos, Atribuição automática, Horários de atendimento e Frases rápidas.

Para chamar a API, crie um token (`kb_live_...`) em **Configurações** → **Integrações** → **API Tokens** (exige a permissão **Integrações** ou ser proprietário do workspace) e envie no cabeçalho `Authorization: Bearer <token>`. A maioria das rotas aceita 3 chamadas a cada 3 segundos por workspace e por rota (o envio de mensagens aceita 300 por minuto).

Veja o passo a passo em [Criar um token de API](/docs/desenvolvedor/tokens-de-api) e o mapa de integrações em [Para desenvolvedores: API, plugins, MCP e links](/docs/desenvolvedor/visao-geral).

## Variações

- onde encontro a documentação da api da kinbox
- qual o swagger ou openapi da kinbox
- lista de endpoints da api pública
- onde pego o token para integrar meu sistema na kinbox
- como autenticar na api da kinbox
- manual para desenvolvedores da kinbox
