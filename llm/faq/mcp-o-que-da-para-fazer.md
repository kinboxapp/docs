---
title: O que consigo fazer na Kinbox pelo Claude ou ChatGPT?
description: Pelo MCP, o Claude ou o ChatGPT podem consultar dados da Kinbox e, se você liberar na conexão, organizar o atendimento e o CRM ou enviar mensagens, com o papel de quem conectou no workspace da conexão.
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

Pelo MCP, o Claude ou o ChatGPT podem consultar dados da Kinbox e, conforme as permissões que você marca ao conectar, também alterar registros e enviar mensagens aos clientes — usando o papel de quem conectou, no workspace aberto no navegador na hora de autorizar (nos workspaces clientes de um parceiro, a IA age como proprietário do cliente, dentro das permissões de parceiro).

O que fica liberado depende das permissões escolhidas na conexão:

- **Ver conversas, contatos e negócios** (obrigatória): ler conversas, mensagens, relatórios (até 92 dias por pedido), contatos, organizações, negociações, funis, produtos, tarefas, campanhas, canais, equipe, bots, agentes, cenários, automações, assinatura (exige a permissão **Assinatura** no papel) e a central de ajuda.
- **Alterar conversas, contatos e negócios:** organizar conversas (resolver, reabrir, atribuir, mover de grupo, tags, notas internas, pendências, campos, parar bot, cancelar agendamento, bloquear contato), gerenciar contatos, negociações e tarefas, renomear, pausar ou excluir campanhas, configurações (tags, frases rápidas, campos, grupos, horários), equipe (membros, papéis e atribuição automática), criar canal de WhatsApp por QR Code e criar rascunhos ou desligar bots, agentes, cenários e automações.
- **Enviar mensagens aos seus clientes:** responder com texto e mídia, iniciar conversas por WhatsApp ou SMS, reagir, encaminhar e apagar mensagens.
- **Alterar e Enviar juntas:** iniciar bot numa conversa, agendar ou editar mensagens agendadas, criar campanhas (WhatsApp por QR Code ou SMS), editar a mensagem ou retomar campanhas, e criar, ligar ou editar bots, agentes, cenários ou automações que podem rodar.

Regras e limites importantes:

- No workspace da conexão, a IA usa o papel de quem conectou; nos workspaces clientes de um parceiro, age como proprietário do cliente dentro das permissões de parceiro (e para abrir a tela **MCP** e gerenciar conexões, é preciso ter a permissão **Integrações** ou ser proprietário do workspace).
- Ações sem volta (como excluir contato, negociação, campanha, tarefa, tag, grupo ou papel, remover ou desativar membro ou apagar mensagem) exigem sua confirmação antes de rodar.
- A IA não cancela nem troca plano de assinatura, não envia mensagens em conversas resolvidas há mais de 30 dias e, no WhatsApp oficial fora da [janela de 24 horas](/docs/canais/whatsapp/whatsapp-cloud-api/janela-de-24-horas), só envia templates aprovados.
- Há limites de uso (valores configurados podem mudar), como 120 chamadas por minuto, 10 envios por minuto e 5 novas conversas por minuto. Ao passar de um limite, a IA recebe o tempo de espera antes de tentar de novo.

Veja como conectar em [Conectar o Claude, o ChatGPT e outros agentes de IA (MCP)](/docs/desenvolvedor/mcp).

## Variações

- o que o claude consegue fazer conectado na kinbox
- dá para responder clientes do whatsapp pelo chatgpt
- posso consultar relatórios e negociações da kinbox no claude
- o conector mcp da kinbox pode apagar conversas ou alterar plano
- quais permissões o chatgpt tem na kinbox pelo mcp
- assistente de ia consegue criar contato e mover negócio na kinbox
