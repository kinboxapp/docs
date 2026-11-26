---
title: O que consigo fazer na Kinbox pelo Claude ou ChatGPT?
description: Pelo MCP, o Claude ou o ChatGPT podem consultar dados da Kinbox e, se você liberar na conexão, organizar o atendimento e o CRM ou enviar mensagens, sempre com o papel de quem conectou.
keywords: [usar a kinbox pelo chatgpt, claude acessa minhas conversas, mcp da kinbox, assistente de ia controlar a kinbox, conector kinbox claude, o que o mcp faz]
publico: llm
tipo: faq
fontes:
  - KIN-7851
  - api:src/modules/mcp/mcp-server.factory.ts
  - api:src/modules/mcp/mcp-rate-limit.service.ts
codigo:
  - web:src/pages/settings/mcp/**
  - web:src/pages/oauth/McpConsent.tsx
  - api:src/modules/mcp/**
  - api:src/modules/api-tokens/api-token-scopes.ts
verificado_em: 2026-11-26
---

## Pergunta

O que consigo fazer na Kinbox pelo Claude ou ChatGPT?

## Resposta

Pelo MCP, o Claude ou o ChatGPT podem consultar dados da Kinbox e, conforme as permissões que você marca ao conectar, também alterar registros e enviar mensagens aos clientes — sempre usando o papel de quem conectou e no workspace aberto no navegador na hora de autorizar.

O que fica liberado depende das permissões escolhidas na conexão:

- **Ver conversas, contatos e negócios** (obrigatória): ler conversas, mensagens, relatórios (até 92 dias por pedido), contatos, organizações, negociações, funis, produtos, tarefas, campanhas, canais, equipe, bots, agentes, cenários, automações, assinatura (exige a permissão **Assinatura** no papel) e a central de ajuda.
- **Alterar conversas, contatos e negócios:** organizar conversas (resolver, reabrir, atribuir, mover de grupo, tags, notas internas, pendências, campos, iniciar/parar bot, agendar mensagem, bloquear contato), gerenciar contatos, negociações, tarefas, campanhas, configurações (tags, frases rápidas, campos, grupos, horários), equipe (membros, papéis e atribuição automática), criar canal de WhatsApp por QR Code e configurar bots, agentes, cenários e automações.
- **Enviar mensagens aos seus clientes:** responder com texto e mídia, iniciar conversas por WhatsApp ou SMS, reagir, encaminhar e apagar mensagens, além de ligar bots, agentes, cenários ou automações que podem rodar.

Regras e limites importantes:

- A IA usa o papel de quem conectou (e para abrir a tela **MCP** e gerenciar conexões, é preciso ter a permissão **Integrações** ou ser proprietário do workspace).
- Ações sem volta (como excluir contato, negociação, campanha, tarefa, tag, grupo ou papel, remover ou desativar membro ou apagar mensagem) exigem sua confirmação antes de rodar.
- A IA não cancela nem troca plano de assinatura, não envia mensagens em conversas resolvidas há mais de 30 dias e, no WhatsApp oficial fora da [janela de 24 horas](/docs/canais/whatsapp/whatsapp-cloud-api/janela-de-24-horas), só envia templates aprovados.
- Há limites de uso (valores configurados podem mudar), como 120 chamadas por minuto, 10 envios de mensagem por minuto e 500 por dia, e 5 novas conversas por minuto e 100 por dia.

Veja como conectar em [Conectar o Claude, o ChatGPT e outros agentes de IA (MCP)](/docs/desenvolvedor/mcp).

## Variações

- o que o claude consegue fazer conectado na kinbox
- dá para responder clientes do whatsapp pelo chatgpt
- posso consultar relatórios e negociações da kinbox no claude
- o conector mcp da kinbox pode apagar conversas ou alterar plano
- quais permissões o chatgpt tem na kinbox pelo mcp
- assistente de ia consegue criar contato e mover negócio na kinbox
