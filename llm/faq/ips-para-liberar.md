---
title: Quais IPs da Kinbox libero no meu firewall?
description: A Kinbox não publica uma lista de IPs de saída; proteja seu endereço autenticando as chamadas com um cabeçalho próprio.
keywords: [ip da kinbox, liberar ip no firewall, whitelist de ip, allowlist, ip fixo de saída, faixa de ip, range de ip, firewall webhook]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/index.tsx
  - api-v0:server/modules/httpClient.js
  - api:src/modules/api-tokens/api-tokens.service.ts
codigo:
  - web:src/pages/settings/index.tsx
  - web:src/pages/settings/api/**
  - web:src/pages/settings/mcp/**
  - web:src/pages/settings/plugins/**
  - web:src/pages/settings/channels/custom/**
  - web:src/routes/inbox.routes.ts
verificado_em: 2026-11-26
---

## Pergunta

Quais IPs da Kinbox libero no meu firewall?

## Resposta

A Kinbox não publica uma lista de IPs fixos de saída para liberação em firewall.

Nas chamadas que você configura no bloco **Chamar endpoint** do bot e nos **Cenários**, proteja o endereço do seu sistema exigindo um cabeçalho de autenticação próprio (como uma chave ou token em `headers`): os dois aceitam cabeçalhos personalizados (nos cenários, na aba **Headers** da **Requisição HTTP**; veja [Gatilhos e ações dos cenários](/docs/cenarios/gatilhos-e-acoes)). Quando o seu sistema envia mensagens **para a Kinbox** pelo canal customizado e na chamada do webhook para continuar o bot, quem inicia a requisição é o seu próprio sistema; essas chamadas não dependem de liberar IPs da Kinbox.

Veja [Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot) e [Para desenvolvedores: API, plugins, MCP e links](/docs/desenvolvedor/visao-geral).

## Variações

- qual o ip fixo da kinbox para colocar na whitelist
- quais faixas de ip preciso liberar no firewall para webhooks da kinbox
- allowlist de ips da kinbox
- qual o ip de saída das requisições do bot e cenários
- range de ip dos servidores da kinbox
- bloquear acesso ao meu webhook só para a kinbox
