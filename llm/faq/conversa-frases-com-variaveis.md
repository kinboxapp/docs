---
title: Como uso o nome do cliente numa frase rápida?
description: No campo Texto da frase rápida, clique em Chaves reservadas ({}) e escolha Primeiro nome ({{first_name}}) ou Nome ({{name}}); a troca acontece no envio.
keywords: [nome do cliente na frase rápida, variáveis frase rápida, chaves reservadas, first_name, placeholder, personalizar resposta pronta]
publico: llm
tipo: faq
fontes:
  - web:src/components-old/ui/PlaceholderDropSearch/index.tsx
  - api-v0:server/controllers/CallController.js
  - api-v0:server/services/CustomerPlatformService.js
codigo:
  - web:src/components-old/ui/PlaceholderDropSearch/index.tsx
  - web:src/components-old/forms/TextEditorInput/index.tsx
  - api-v0:server/controllers/CallController.js
verificado_em: 2026-11-26
---

## Pergunta

Como uso o nome do cliente numa frase rápida?

## Resposta

No campo **Texto** da frase rápida, clique no botão **Chaves reservadas** (`{}`) e escolha **Primeiro nome** (`{{first_name}}`) ou **Nome** (`{{name}}`).

A Kinbox substitui a chave pelo dado do contato no momento do envio (enquanto você edita a mensagem na conversa, a chave ainda aparece como `{{first_name}}`). Se o contato não tiver nome cadastrado, a chave some do texto.

Alguns cuidados importantes:

- **Use cada chave apenas uma vez por mensagem:** se repetir `{{first_name}}` na mesma mensagem, apenas a primeira ocorrência é trocada.
- **Outras chaves disponíveis:** **E-mail** (`{{email}}`), **Telefone** (`{{phone}}`), **Protocolo** (`{{protocol}}`) e campos personalizados de **contato**. Campos personalizados de **conversa** não são trocados no envio pelo membro.

Veja o passo a passo completo em [Criar frases rápidas](/docs/conversas/criar-frases-rapidas-para-suas-conversas).

## Variações

- como puxar o primeiro nome do contato na resposta rápida
- variáveis disponíveis nas frases rápidas da kinbox
- por que {{first_name}} aparece no campo antes de enviar
- o que acontece se o cliente não tiver nome cadastrado na variável
- usar campo personalizado dentro de frase rápida
