---
title: "MCP: clientes aceitos, OAuth e token, permissões e o que aparece na Auditoria"
description: Referência do MCP da Kinbox — aplicativos e configurações, permissões da conexão, ferramentas por permissão, limites de uso, travas por papel, erros, parceiros, duração da conexão e registro na Auditoria.
keywords: [mcp erro, rate_limited, provisional_lock, permission_denied, confirmation_required, limite mcp, limite diário por token de api, conexão expirou, autorização indisponível, pedido de autorização expirou, conversations_read, messages_send, auditoria mcp, parceiro mcp, scope_required, ferramenta não aparece, privacidade mcp, exemplos de pedidos]
publico: llm
tipo: referencia
fontes:
  - KIN-7851
  - api:src/modules/mcp/mcp-server.factory.ts
  - api:src/modules/mcp/mcp-rate-limit.service.ts
  - api:src/modules/mcp/mcp-auth.service.ts
  - api:src/modules/mcp/mcp-audit.service.ts
  - api:src/modules/mcp/mcp-tool.registry.ts
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
- **Aplicativos com passo a passo na tela:** **Claude** (inclui o comando do Claude Code), **ChatGPT**, **Codex** e **Cursor**, todos por OAuth; a aba **Outros** traz a configuração JSON para qualquer aplicativo com servidor MCP, por OAuth ou, sem OAuth, com um token de API no cabeçalho `Authorization: Bearer kb_live_<seu_token>` (veja [Criar um token de API](/docs/desenvolvedor/tokens-de-api)). Passos em [Conectar o Claude, o ChatGPT e outros agentes de IA (MCP)](/docs/desenvolvedor/mcp).
- **Rótulo da permissão de parceiro:** em **Conexões ativas**, a permissão de parceiro aparece com o rótulo `partner` (sem tradução).
- **OAuth × token de API:** conexões OAuth valem para o **workspace aberto no navegador** na hora de autorizar e aparecem em **Conexões ativas** (a lista mostra todas as conexões OAuth do workspace). Conexões feitas por token de API não aparecem em **Conexões ativas** — para encerrá-las, revogue o token em **API Tokens**.
- **Papel de quem autoriza:** no workspace da conexão, a IA age com o papel de quem autorizou a conexão (ou de quem criou o token de API). Nos workspaces clientes de um parceiro, vale a regra da seção Parceiros.

## Permissões da conexão

| Permissão na tela **Autorizar acesso** | Descrição exibida | Padrão |
| --- | --- | --- |
| **Ver conversas, contatos e negócios** | "Ler conversas, mensagens, contatos, negócios e configurações do workspace" | Sempre marcada (obrigatória) |
| **Alterar conversas, contatos e negócios** | "Alterar tags, atribuições, grupos, contatos e negócios (não envia mensagens)" | Marcada |
| **Enviar mensagens aos seus clientes** | "Enviar mensagens aos seus clientes em seu nome" | Desmarcada |
| **Acessar os ambientes clientes do parceiro** | Disponível apenas em workspaces de parceiro para membros com **Pode inspecionar clientes (Básico)** ou **(Avançado)** | Desmarcada |

## Ferramentas por permissão

A IA só enxerga as ferramentas das permissões concedidas na conexão: uma ferramenta de permissão não concedida não aparece no aplicativo de IA. O papel de quem autorizou não esconde ferramentas; ele recusa a chamada com `PERMISSION_DENIED` (veja Erros). Os nomes abaixo são os mesmos registrados na **Auditoria**:

| Permissão | Ferramentas e ações |
| --- | --- |
| **Ver** (`read`) | `conversations_read` (buscar, abrir, ler mensagens, status de envio e agendadas), `reports_read` (visão geral, produtividade, atribuição, avaliação e sessões; até 92 dias por pedido), `contacts_read` (contatos e organizações), `deals_read` (negociações, funis e produtos), `tasks_read`, `campaigns_read` (campanhas e resultados), `channels_read` (canais e status), `catalog_read` (membros, grupos, tags, campos personalizados, frases rápidas, templates, bots e horários), `team_read` (membros, papéis e regras de atribuição), `automations_read` (listar, abrir e validar bots, agentes, cenários e automações), `billing_read` (plano, faturas, créditos de SMS e saldo; exige **Assinatura** no papel), `get_guide`, `help_read` (busca na central de ajuda), `report_gap` (avisa o que faltou na central de ajuda ou no MCP) e `list_partner_workspaces` (com permissão de parceiro). |
| **Alterar** (`write`) | `conversations_write` (resolver, reabrir, atribuir, mover de grupo, tags, nota interna, pendência, lida/não lida, seguir, campos, parar bot, cancelar agendamento, fixar nota, bloquear contato), `contacts_write` (criar, editar e excluir contatos e organizações), `deals_write` (criar, editar, mover etapa, excluir, ligar negociação à conversa, produtos e funis), `tasks_write`, `campaigns_write` (renomear, pausar e excluir; criar campanha pelo MCP só para WhatsApp por QR Code ou SMS, e a mensagem de campanha com template do WhatsApp oficial só muda pelo app), `settings_write` (tags, frases rápidas, campos personalizados, grupos e horários), `team_write` (convidar, editar, desativar e remover membros, papéis e regras de atribuição), `channels_write` (criar canal de WhatsApp por QR Code) e `automations_write` (criar e configurar bots, agentes, cenários e automações). |
| **Enviar** (`send`) | `messages_send` (responder texto e mídia, iniciar conversa por telefone via WhatsApp ou SMS, reagir, encaminhar e apagar mensagem). Algumas ações de ferramentas de escrita exigem as duas permissões, **Alterar** e **Enviar**, e contam no limite de envio: em `conversations_write`, `start_bot` (iniciar bot), `schedule` (agendar mensagem) e `edit_schedule` (editar agendamento); em `campaigns_write`, `create` (criar campanha), `edit_message` (editar a mensagem) e `resume` (retomar). Em `automations_write`, criar já ativo, ligar ou editar um fluxo que pode rodar também exige **Alterar** e **Enviar**; rascunhos e desligar exigem só **Alterar**. |

## Exemplos de pedidos

Frases fictícias que um usuário pode digitar no aplicativo de IA, com a ferramenta usada e a permissão da conexão exigida:

| Pedido | Ferramenta e ação | Permissão |
| --- | --- | --- |
| "Resuma as conversas abertas de hoje." | `conversations_read` (`search` com status aberta, depois as mensagens) | **Ver** |
| "Encontre o contato Ana Souza e resuma o histórico de conversas dela." | `contacts_read` e `conversations_read` | **Ver** |
| "Liste as negociações abertas no funil Vendas." | `deals_read` (`pipelines` e `search`) | **Ver** |
| "Qual foi o tempo médio de primeira resposta de cada membro nesta semana?" | `reports_read` (produtividade) | **Ver** |
| "Crie uma tarefa para amanhã às 10h na negociação Loja Exemplo." | `deals_read` para achar a negociação e `tasks_write` (`create` com a negociação e o prazo) | **Ver** e **Alterar** |

Em todos, vale também o papel de quem autorizou: sem a permissão do papel, a chamada é recusada com `PERMISSION_DENIED`.

## Confirmação e o que a IA não faz

- **Ações irreversíveis:** exigem confirmação explícita do usuário; sem confirmação a chamada é recusada com `CONFIRMATION_REQUIRED`. Lista: apagar mensagem (`messages_send`); excluir contato e organização (`contacts_write`); excluir negociação, produto e funil (`deals_write`); excluir campanha (`campaigns_write`); excluir tarefa (`tasks_write`); excluir tag, frase rápida, grupo e horário de atendimento (`settings_write`); desativar e remover membro, excluir papel e regra de atribuição (`team_write`).
- **Assinatura:** `billing_read` é somente leitura; o MCP não cancela nem troca o plano.
- **Conversas antigas:** não envia mensagens em conversas resolvidas há mais de 30 dias (`"Conversa resolvida há mais de 30 dias. Envio bloqueado por política do MCP."`).
- **WhatsApp oficial:** fora da [janela de 24 horas](/docs/canais/whatsapp/whatsapp-cloud-api/janela-de-24-horas), envia apenas template aprovado.

## Limites de uso

Limites configurados hoje (podem mudar):

- **Chamadas gerais:** 120 por minuto.
- **Envio de mensagens e ações que exigem Enviar:** 10 por minuto. Em conexões por token de API, também 500 por dia por token.
- **Novas conversas por telefone:** 5 por minuto. Em conexões por token de API, também 100 por dia por token.
- **Concorrência:** até 3 chamadas ao mesmo tempo; chamadas extras aguardam até 30 segundos na fila e, se não liberarem, falham com `"Too many concurrent calls..."`.
- **Consultas longas:** interrompidas em cerca de 55 segundos com `"A consulta demorou demais e foi interrompida. Reduza o período (from/to) ou use filtros mais específicos."`.
- **Período de relatórios e buscas:** até 92 dias por pedido.

Ao ultrapassar um limite, a ferramenta retorna `RATE_LIMITED` com o tempo de espera em segundos: espere esse tempo antes de repetir a chamada.

## Travas por papel

O proprietário do workspace nunca sofre trava. Papéis com determinadas restrições de visualização ou envio recebem `PROVISIONAL_LOCK`: o MCP fica bloqueado para esses papéis. O que fazer: peça ao proprietário do workspace para usar o MCP ou ajustar o seu papel.

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

- **Na tela Autorizar acesso** (pedido válido por 15 minutos): título `"Autorização indisponível"` com `"Pedido de autorização inválido."`, `"Pedido de autorização não encontrado ou expirado."`, `"Pedido de autorização expirou"` ou `"Pedido de autorização já foi respondido"`.
- **Ao clicar em Autorizar ou Cancelar:** se a decisão falhar, aparece o aviso flutuante `"Não foi possível concluir a autorização."` (ou a mensagem devolvida, como `O escopo "read" é obrigatório`).
- **Ferramenta não aparece:** a permissão correspondente não foi marcada na conexão. Não dá para incluir permissões numa conexão existente: revogue em **Conexões ativas** e autorize de novo marcando a opção. Numa conexão por token de API, valem as permissões do token.
- **Ação de envio sem Enviar (`SCOPE_REQUIRED`):** a ferramenta aparece, mas a ação que dispara mensagens é recusada com `"<ferramenta> com action <ação> dispara mensagens ao cliente final e exige o escopo send, que esta conexão não tem."`.
- **Papel sem permissão (`PERMISSION_DENIED`):** `"Seu papel não permite usar <ferramenta>..."` ou `"Seu papel não permite <ferramenta> com action <ação>..."`. O que fazer: pedir a quem gerencia os papéis para ajustar o papel.
- **Na autenticação (HTTP 401):** `Missing or invalid Authorization header`, `Invalid, expired or revoked access token`, `Invalid or revoked API token`, `Unsupported token type`, `Operador inativo ou removido do workspace`.
- **Nas ferramentas:** `FORBIDDEN`, `PERMISSION_DENIED` (`"Seu papel não permite..."`), `SCOPE_REQUIRED`, `PROVISIONAL_LOCK`, `CONFIRMATION_REQUIRED`, `NOT_FOUND`, `RATE_LIMITED`, `TIMEOUT`, `VALIDATION_FAILED`, `LIMIT_REACHED`, `PARTNER_ACCESS_DENIED`, `PARTNER_CONVERSATIONS_BLOCKED` e `TOOL_ERROR`.

## Duração, renovação e revogação

- **Renovação OAuth:** o acesso dura 1 hora e é renovado automaticamente. Se ficar 30 dias sem renovação, expira e exige nova conexão.
- **Revogação:** clicar em **Revogar** em **Conexões ativas** encerra o acesso imediatamente; a renovação também deixa de funcionar e as chamadas seguintes recebem HTTP 401 (`Invalid, expired or revoked access token`). A conexão não volta sozinha: para usar de novo, refaça a conexão no aplicativo de IA (desconectando ou removendo o conector da Kinbox, se ele ainda aparecer) e autorize outra vez.
- **Membro desativado ou removido:** a conexão para na chamada seguinte e não renova (o mesmo vale para token de API).

## Parceiros

Com a permissão de parceiro (OAuth ou token de API com **Parceiro**, exigindo workspace de parceiro e **Pode inspecionar clientes (Básico)** ou **(Avançado)**), a IA lista os workspaces clientes via `list_partner_workspaces` e age neles dentro da restrição de ambientes do papel do parceiro. Num workspace cliente, a IA age com o papel de proprietário daquele cliente, mas continua sujeita às permissões de parceiro do seu papel (sem elas, `PERMISSION_DENIED`) e à opção **Permitir que o parceiro veja as conversas** do cliente.

Se o workspace cliente desativar **Permitir que o parceiro veja as conversas** (**Configurações** → **Ambiente** → **Geral**), o acesso a conversas e mensagens pelo parceiro retorna `PARTNER_CONVERSATIONS_BLOCKED`.

## Privacidade

Os dados que o assistente lê pelo MCP (conversas, mensagens, contatos, negociações e o que mais as permissões liberarem) são enviados ao provedor do aplicativo de IA conectado e seguem a política de privacidade desse provedor. Na Kinbox, o tratamento dos dados segue a [Política de Privacidade](https://www.kinbox.com.br/privacy/) e os [Termos de Uso](https://www.kinbox.com.br/terms/). Para cortar o acesso, revogue a conexão em **Conexões ativas** (OAuth) ou o token em **API Tokens**.

## Auditoria

- Cada chamada bem-sucedida fica registrada em **Configurações** → **Auditoria** (exige a permissão **Auditoria**) em nome do membro que conectou, com entidade **MCP**, nome da ferramenta (por exemplo, `conversations_read`) e ação `mcp:<ferramenta>`.
- **Retenção:** 30 dias para chamadas comuns; 180 dias para ações irreversíveis e chamadas de parceiro.
- **Parceiro:** chamadas feitas por um parceiro no workspace cliente aparecem com `"Ação feita por um parceiro pelo MCP"` e podem ser filtradas por **Parceiro via MCP**.
- **Central de ajuda:** a ferramenta `help_read` grava apenas a ação na auditoria, sem registrar o texto da pergunta.
