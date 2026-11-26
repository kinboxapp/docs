---
title: A Kinbox envia webhooks quando algo acontece?
description: Não existe um webhook de saída para cadastrar; para avisar outro sistema, use um cenário com Requisição HTTP, o bloco Chamar endpoint do bot ou o canal customizado.
keywords: [webhook de saída, kinbox envia webhook, notificar meu sistema, evento nova mensagem webhook, callback, webhook quando conversa resolvida, enviar dados para meu sistema]
publico: llm
tipo: faq
fontes:
  - api:src/modules/webhooks/webhook.consumer.ts
  - web:src/pages/settings/index.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
codigo:
  - api:src/modules/webhooks/**
  - web:src/pages/settings/index.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
  - web:src/pages/settings/workflows/**
verificado_em: 2026-11-26
---

## Pergunta

A Kinbox envia webhooks quando algo acontece?

## Resposta

Não. A Kinbox não tem um webhook de saída que você cadastre para receber avisos de eventos (como nova mensagem ou conversa resolvida).

Para enviar informações da Kinbox para outro sistema, você pode usar uma destas alternativas:

- **Cenário com Requisição HTTP**: crie um cenário com o gatilho **Nova Sessão**, **Mensagem de campanha enviada** ou **Agendamento cíclico** e adicione o passo **Requisição HTTP** apontando para o endereço `https://` do seu sistema. Ver, criar e editar cenários exige a permissão **Cenários** (ou ser o proprietário), e o cenário só roda ligado e publicado (no editor, o interruptor só vale depois de **Publicar**; na lista, grava na hora). Veja [Gatilhos e ações dos cenários](/docs/cenarios/gatilhos-e-acoes).
- **Bloco Chamar endpoint do bot**: se você usa um bot no atendimento, o bloco **Chamar endpoint** envia dados para o seu sistema durante o fluxo do bot. Veja [Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot).
- **Canal customizado**: ao integrar um canal customizado, a Kinbox envia ao endereço configurado as mensagens enviadas pelos membros. Veja [Integrar seu sistema como canal customizado (API)](/docs/desenvolvedor/criando-canal-customizado).
- **API pública**: se precisar consultar dados da Kinbox a partir do seu sistema, use a API pública com um token de acesso. Veja [Criar um token de API](/docs/desenvolvedor/tokens-de-api).

Para o sentido inverso — quando outro sistema envia dados para a Kinbox (via **POST** em JSON) — use o gatilho **Webhook recebido** em [Receber dados de outro sistema por webhook](/docs/cenarios/integrar-via-webhook-com-cenarios).

## Variações

- como configurar webhook de saída na kinbox
- a kinbox avisa meu sistema quando chega uma nova mensagem
- receber callback quando uma conversa for resolvida
- enviar eventos da kinbox para meu erp
- cadastrar url de webhook para notificações da kinbox
- existe webhook para nova conversa ou nova mensagem
