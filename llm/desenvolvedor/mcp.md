---
title: "MCP: clientes aceitos, OAuth e token, permissões e o que aparece na Auditoria"
description: Referência do MCP da Kinbox — aplicativos e configurações, permissões da conexão, ferramentas por permissão, limites de uso, travas por papel, erros, parceiros, duração da conexão e registro na Auditoria.
keywords: [mcp erro, rate_limited, provisional_lock, permission_denied, confirmation_required, limite mcp, 500 mensagens por dia, conexão expirou, autorização indisponível, pedido de autorização expirou, conversations_read, messages_send, auditoria mcp, parceiro mcp]
publico: llm
tipo: referencia
fontes:
  - KIN-7851
  - api:src/modules/mcp/mcp-server.factory.ts
  - api:src/modules/mcp/mcp-rate-limit.service.ts
  - api:src/modules/mcp/mcp-auth.service.ts
  - api:src/modules/mcp/mcp-audit.service.ts
  - api:src/modules/mcp/oauth/mcp-oauth.service.ts
  - api:src/shared/auth/operator-access.ts
codigo:
  - web:src/pages/settings/mcp/**
  - web:src/pages/oauth/McpConsent.tsx
  - web:src/pages/settings/audit/Audit.tsx
  - api:src/modules/mcp/**
  - api:src/shared/auth/operator-access.ts
  - api:src/shared/auth/partner-access.service.ts
verificado_em: 2026-11-26
---

Referência técnica do MCP da Kinbox, complementando [Conectar o Claude, o ChatGPT e outros agentes de IA (MCP)](/docs/desenvolvedor/mcp).

## Endereço, aplicativos e formas de conexão

- **URL única do servidor MCP:** `https://mcp.kinbox.com.br/mcp`.
- **Acesso à tela MCP:** **Configurações** → **Integrações** → **MCP** exige a permissão **Integrações** ou ser proprietário do workspace (veja [Referência de permissões](/docs/administracao/referencia-de-permissoes)).
- **Aplicativos exibidos em Como conectar:**
  - **Claude:** **Configurações › Conectores** → **Adicionar conector personalizado** com a URL `https://mcp.kinbox.com.br/mcp` (OAuth). No terminal (Claude Code): `claude mcp add --transport http kinbox https://mcp.kinbox.com.br/mcp`.
  - **ChatGPT:** **Configurações › Conectores** → **Criar conector** com a URL e autenticação em OAuth.
  - **Codex:** **Configurações › Plugins › MCPs** → **Add**, tipo **Streamable HTTP**, URL do servidor e token em branco (OAuth).
  - **Cursor:** **Settings › MCP** → **Add new global MCP server** com JSON `{"mcpServers":{"kinbox":{"url":"https://mcp.kinbox.com.br/mcp"}}}` (OAuth).
  - **Outros:** aceita o mesmo JSON via OAuth ou, para aplicativos sem OAuth, um token de API (`kb_live_...`, veja [Criar um token de API](/docs/desenvolvedor/tokens-de-api)) em `"headers": {"Authorization": "Bearer kb_live_<seu_token>"}`.
- **OAuth × token de API:** conexões OAuth valem para o **workspace aberto no navegador** na hora de autorizar e aparecem em **Conexões ativas** (a lista mostra todas as conexões OAuth do workspace). Conexões feitas por token de API não aparecem em **Conexões ativas** — para encerrá-las, revogue o token em **API Tokens**.
- **Papel de quem autoriza:** a IA age sempre com o papel de quem autorizou a conexão (ou de quem criou o token de API).

## Permissões da conexão

| Permissão na tela **Autorizar acesso** | Descrição exibida | Padrão |
| --- | --- | --- |
| **Ver conversas, contatos e negócios** | "Ler conversas, mensagens, contatos, negócios e configurações do workspace" | Sempre marcada (obrigatória) |
| **Alterar conversas, contatos e negócios** | "Alterar tags, atribuições, grupos, contatos e negócios (não envia mensagens)" | Marcada |
| **Enviar mensagens aos seus clientes** | "Enviar mensagens aos seus clientes em seu nome" | Desmarcada |
| **Acessar os ambientes clientes do parceiro** | Disponível apenas em workspaces de parceiro para membros com **Pode inspecionar clientes (Básico)** ou **(Avançado)** | Desmarcada |

## Ferramentas por permissão

A IA só enxerga as ferramentas das permissões concedidas. Os nomes abaixo são os mesmos registrados na **Auditoria**:

| Permissão | Ferramentas e ações |
| --- | --- |
| **Ver** (`read`) | `conversations_read` (buscar, abrir, ler mensagens, status de envio e agendadas), `reports_read` (visão geral, produtividade, atribuição, avaliação e sessões; até 92 dias por pedido), `contacts_read` (contatos e organizações), `deals_read` (negociações, funis e produtos), `tasks_read`, `campaigns_read` (campanhas e resultados), `channels_read` (canais e status), `catalog_read` (membros, grupos, tags, campos personalizados, frases rápidas, templates, bots e horários), `team_read` (membros, papéis e regras de atribuição), `automations_read` (listar, abrir e validar bots, agentes, cenários e automações), `billing_read` (plano, faturas, créditos de SMS e saldo; exige **Assinatura** no papel), `get_guide`, `help_read` (busca na central de ajuda) e `list_partner_workspaces` (com permissão de parceiro). |
| **Alterar** (`write`) | `conversations_write` (resolver, reabrir, atribuir, mover de grupo, tags, nota interna, pendência, lida/não lida, seguir, campos, iniciar/parar bot, agendar mensagem, fixar nota, bloquear contato), `contacts_write` (criar, editar e excluir contatos e organizações), `deals_write` (criar, editar, mover etapa, excluir, ligar negociação à conversa, produtos e funis), `tasks_write`, `campaigns_write` (criar, editar, pausar, retomar e excluir), `settings_write` (tags, frases rápidas, campos personalizados, grupos e horários), `team_write` (convidar, editar, desativar e remover membros, papéis e regras de atribuição), `channels_write` (criar canal de WhatsApp por QR Code) e `automations_write` (criar e configurar bots, agentes, cenários e automações). |
| **Enviar** (`send`) | `messages_send` (responder texto e mídia, iniciar conversa por telefone via WhatsApp ou SMS, reagir, encaminhar e apagar mensagem). Ligar um bot, agente, cenário ou automação que pode rodar (`automations_write`) também exige **Enviar**. |

## Confirmação e o que a IA não faz

- **Ações irreversíveis:** excluir contato, negociação, campanha, tarefa, tag, grupo ou papel, remover ou desativar membro e apagar mensagem exigem confirmação explícita do usuário; sem confirmação a chamada é recusada com `CONFIRMATION_REQUIRED`.
- **Assinatura:** `billing_read` é somente leitura; o MCP não cancela nem troca o plano.
- **Conversas antigas:** não envia mensagens em conversas resolvidas há mais de 30 dias (`"Conversa resolvida há mais de 30 dias. Envio bloqueado por política do MCP."`).
- **WhatsApp oficial:** fora da [janela de 24 horas](/docs/canais/whatsapp/whatsapp-cloud-api/janela-de-24-horas), envia apenas template aprovado.

## Limites de uso

Os valores configurados abaixo podem mudar:

- **Chamadas gerais:** 120 por minuto.
- **Envio de mensagens:** 10 por minuto e 500 por dia.
- **Novas conversas por telefone:** 5 por minuto e 100 por dia.
- **Concorrência:** até 3 chamadas ao mesmo tempo; chamadas extras aguardam até 30 segundos na fila e, se não liberarem, falham com `"Too many concurrent calls..."`.
- **Consultas longas:** interrompidas em cerca de 55 segundos com `"A consulta demorou demais e foi interrompida. Reduza o período (from/to) ou use filtros mais específicos."`.
- **Período de relatórios e buscas:** até 92 dias por pedido.

Ao ultrapassar limites de taxa, a ferramenta retorna `RATE_LIMITED` com o tempo de espera.

## Travas por papel

O proprietário do workspace nunca sofre trava. Papéis com determinadas restrições de visualização ou envio recebem `PROVISIONAL_LOCK` com a mensagem `"O MCP ainda não aplica algumas restrições do seu papel (ex.: tags ou dados do contato ocultos, horário de atendimento, canais permitidos para envio). Por segurança, ele fica bloqueado para papéis com essas restrições até que sejam aplicadas. Peça ao dono do workspace para usar o MCP ou ajustar o seu papel."`.

Restrições que ativam essa trava (rótulos de **Configurações** → **Ambiente** → **Permissões**):

- **Esconder tags se não for atribuido**
- **Esconder informações do contato**
- **Esconder notas do contato**
- **Esconder informações da sessão**
- **Esconder linha do tempo**
- **Esconder lead score**
- **Esconder sentimento do cliente**
- **Somente pode iniciar chat ativo com conversa não atribuída a outro membro.** (e as duas variações de restrição de chat ativo)
- **Limitar horário que pode responder**
- **Limitar canais que pode responder**
- **Impedir envio de palavras proibidas**
- **Limitar horário de acesso ao ambiente**
- **Somente pode ver canais na lista se estiver no grupo do canal**
- **Somente pode ver frases rápidas na lista se estiver no grupo da frase rápida**
- Papel sem nenhuma opção selecionada em **Acesso as Conversas**

## Erros

- **Na tela Autorizar acesso** (pedido válido por 15 minutos): título `"Autorização indisponível"` com `"Pedido de autorização inválido."`, `"Pedido de autorização não encontrado ou expirado."`, `"Pedido de autorização expirou"`, `"Pedido de autorização já foi respondido"` ou `"Não foi possível concluir a autorização."`.
- **Na autenticação (HTTP 401):** `Invalid, expired or revoked access token`, `Invalid or revoked API token`, `Unsupported token type`.
- **Nas ferramentas:** `PERMISSION_DENIED` (`"Seu papel não permite..."`), `SCOPE_REQUIRED`, `PROVISIONAL_LOCK`, `CONFIRMATION_REQUIRED`, `NOT_FOUND`, `RATE_LIMITED`, `TIMEOUT`, `VALIDATION_FAILED`, `LIMIT_REACHED`, `PARTNER_ACCESS_DENIED`, `PARTNER_CONVERSATIONS_BLOCKED` e `TOOL_ERROR`.

## Duração, renovação e revogação

- **Renovação OAuth:** o acesso dura 1 hora e é renovado automaticamente. Se ficar 30 dias sem renovação, expira e exige nova conexão.
- **Revogação:** clicar em **Revogar** em **Conexões ativas** encerra o acesso imediatamente.
- **Membro desativado ou removido:** a conexão para na chamada seguinte e não renova (o mesmo vale para token de API).

## Parceiros

Com a permissão de parceiro (OAuth ou token de API com **Parceiro**, exigindo workspace de parceiro e **Pode inspecionar clientes (Básico)** ou **(Avançado)**), a IA lista os workspaces clientes via `list_partner_workspaces` e age neles dentro da restrição de ambientes do papel do parceiro.

Se o workspace cliente desativar **Permitir que o parceiro veja as conversas** (**Configurações** → **Ambiente** → **Geral**), o acesso a conversas e mensagens pelo parceiro retorna `PARTNER_CONVERSATIONS_BLOCKED`.

## Auditoria

- Cada chamada bem-sucedida fica registrada em **Configurações** → **Auditoria** (exige a permissão **Auditoria**) em nome do membro que conectou, com entidade **MCP**, nome da ferramenta (por exemplo, `conversations_read`) e ação `mcp:<ferramenta>`.
- **Retenção:** 30 dias para chamadas comuns; 180 dias para ações irreversíveis e chamadas de parceiro.
- **Parceiro:** chamadas feitas por um parceiro no workspace cliente aparecem com `"Ação feita por um parceiro pelo MCP"` e podem ser filtradas por **Parceiro via MCP**.
- **Central de ajuda:** a ferramenta `help_read` grava apenas a ação na auditoria, sem registrar o texto da pergunta.
