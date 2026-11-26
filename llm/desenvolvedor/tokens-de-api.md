---
title: "Tokens de API: permissões, papel de quem criou, erros em inglês e tokens legados"
description: Referência dos tokens de API da Kinbox — permissões Ler, Alterar, Enviar e Parceiro, ligação com quem criou, mensagens de erro da API, limite de chamadas, envio legado e Token v0.
keywords: [erro token api, invalid or revoked api token, invalid api token format, lacks the scope, missing authorization header, "429", too many requests, limite da api, token v0, envio legado, permissões do token, papel do token]
publico: llm
tipo: referencia
fontes:
  - api:src/modules/auth/guards/api-token-auth.guard.ts
  - api:src/modules/api-tokens/api-tokens.service.ts
  - api:src/modules/api-tokens/api-token-scopes.ts
  - api:src/guards/throttler.guard.ts
  - web:src/pages/settings/api/index.tsx
codigo:
  - web:src/pages/settings/api/**
  - api:src/modules/api-tokens/**
  - api:src/modules/auth/guards/api-token-auth.guard.ts
  - api:src/decorators/v1-access.decorator.ts
  - api:src/guards/throttler.guard.ts
verificado_em: 2026-11-26
---

Referência técnica dos tokens de API da Kinbox, complementando [Criar um token de API](/docs/desenvolvedor/tokens-de-api) e [Autenticação](/api-reference/authentication).

## Acesso, formato e exibição

- **Acesso à tela:** **Configurações** → **Integrações** → **API Tokens** exige a permissão **Integrações** ou ser o proprietário do workspace (veja [Referência de permissões](/docs/administracao/referencia-de-permissoes)). A tabela lista todos os tokens ativos do workspace inteiro, do mais novo para o mais antigo.
- **Formato:** todo token de API começa com `kb_live_`. O valor completo só é exibido uma única vez, na criação; na lista aparecem apenas os 16 primeiros caracteres seguidos de `...`.
- **Ultimo uso:** a coluna **Ultimo uso** mostra quando o token foi usado pela última vez, ou **Nunca**.
- **Uso:** enviado no cabeçalho `Authorization: Bearer <token>`. Também funciona no MCP em aplicativos sem OAuth (aba **Outros**, veja [Conectar o Claude, o ChatGPT e outros agentes de IA (MCP)](/docs/desenvolvedor/mcp)).

## Permissões do token × métodos HTTP

| Permissão na tela | Escopo | Padrão na criação | Quando é exigida |
| --- | --- | --- | --- |
| **Ler dados (conversas, contatos, negócios, relatórios)** | `read` | Marcada | Requisições `GET` da API pública e leitura no MCP. |
| **Alterar dados (contatos, negócios, tags, campanhas)** | `write` | Marcada | Demais métodos (`POST`, `PATCH`, `PUT`, `DELETE`), salvo rotas que pedem outra permissão, e escrita no MCP. |
| **Enviar mensagens ao cliente final** | `send` | Desmarcada (nunca marcada por padrão) | Envio de mensagens e disparo ou retomada de campanhas. |
| **Acessar os ambientes clientes do parceiro pelo MCP (com as permissões acima)** | `partner` | Desmarcada | Disponível apenas em workspaces de parceiro (revenda ou multinível) para membros com **Pode inspecionar clientes (Básico)** ou **(Avançado)** no papel. Tem efeito somente no MCP. |

Se um membro sem a permissão de inspeção tentar criar token com escopo de parceiro, a API retorna: `"Seu papel não permite criar token com acesso aos workspaces clientes do parceiro."`.

## Ligação com quem criou e papel

- O token fica vinculado ao membro que o criou. Se essa pessoa sair do workspace ou for desativada, o token para de funcionar e é necessário criar outro token.
- Conforme indicado na tela de criação, o token também respeita o papel de quem o criou (veja [Workspace, membros e papéis](/docs/conceitos/workspace-membros-e-papeis)). Quando o papel não tem a permissão exigida ou possui uma restrição que impede a rota, a API devolve as mensagens listadas abaixo.

## Mensagens de erro da API

| Mensagem / status | Causa |
| --- | --- |
| `Missing or invalid Authorization header` | Cabeçalho `Authorization` ausente ou sem o prefixo `Bearer `. |
| `Invalid API token format` | Token não começa com `kb_live_` (por exemplo, uso do **Token v0** na API pública). |
| `Invalid or revoked API token` | Token incorreto ou já revogado. |
| `The user who created this API token is inactive or no longer in the workspace. Create a new token.` | Membro que criou o token foi desativado ou saiu do workspace. |
| `This API token lacks the "<escopo>" scope. Create a token with it in Settings › API.` | Falta a permissão (`read`, `write` ou `send`) no token. |
| `The role of the user who created this API token lacks permission: <permissões>` | O papel de quem criou o token não tem a permissão exigida pela rota. |
| `The role of the user who created this API token has the restriction <restrição>, which blocks this route.` | O papel de quem criou o token tem uma restrição que bloqueia a rota. |
| `ThrottlerException: Too Many Requests` (HTTP 429) | Limite de chamadas excedido. |

## Limite de chamadas

- **Maioria das rotas da API pública:** 3 chamadas a cada 3 segundos.
- **Envio de mensagem (`POST /v1/messages/send`):** 300 chamadas por minuto.
- A contagem é feita **por workspace** (somando todos os tokens do workspace) e **por rota**. Ao exceder o limite, a API responde HTTP 429 (`ThrottlerException: Too Many Requests`).

## Envio legado

Tokens antigos, criados antes de existir a permissão **Enviar**, podem exibir a etiqueta laranja **Envio legado**, com a dica: `"Token antigo: ainda envia mensagens e dispara campanhas pela API sem a permissão de envio. Não vale para o MCP. Clique para remover."`.

Ao clicar na etiqueta, surge a confirmação `'O token "<nome>" deixa de enviar mensagens e disparar campanhas pela API. Para voltar a enviar, crie um token com a permissão de envio.'` com o botão **Remover envio legado** (retorna `"Envio legado removido"`). Tokens novos nunca nascem com envio legado.

## Token v0 (tokens legados)

O **Token v0** aparece ao clicar em **Mostrar tokens legados** na tela **API Tokens** (exige a permissão **Integrações** ou ser proprietário), com a descrição `"Token legado para acesso a API."`. Há um único **Token v0** por workspace, e a tela permite apenas visualizar e copiar.

Ele não funciona na API pública atual (retorna `Invalid API token format`), mas é a credencial usada em [Integrar seu sistema como canal customizado (API)](/docs/desenvolvedor/criando-canal-customizado) (cabeçalho `x-api-token`) e em [Continuar o bot por webhook](/docs/desenvolvedor/webhook-continuar-bot) (campo `token`).
