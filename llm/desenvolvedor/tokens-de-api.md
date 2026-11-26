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
- **Ultimo uso:** a coluna **Ultimo uso** mostra o último uso registrado do token, ou **Nunca**.
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

## Mensagens que você pode receber

Mensagens que a API pode devolver, conforme a rota e a situação:

| Mensagem / status | Causa | O que fazer |
| --- | --- | --- |
| `Missing or invalid Authorization header` | Cabeçalho `Authorization` ausente ou sem o prefixo `Bearer `. | Envie `Authorization: Bearer <token>`. |
| `Invalid API token format` | O token não começa com `kb_live_` (por exemplo, o **Token v0**). | Use um token criado em **Criar token**. |
| `Invalid or revoked API token` | Token incorreto ou revogado. | Confira o valor copiado ou crie outro token. |
| `The user who created this API token is inactive or no longer in the workspace. Create a new token.` | Quem criou o token foi desativado ou saiu do workspace. | Crie um token novo com um membro ativo. |
| `This API token lacks the "<escopo>" scope. Create a token with it in Settings › API.` | Falta ao token a permissão (`read`, `write` ou `send`) que a chamada exige. | Crie um token com essa permissão. |
| `The role of the user who created this API token lacks permission: <permissões>` | O papel de quem criou o token não tem a permissão que a rota pede. | Ajuste o papel ou crie o token com um membro que tenha a permissão. |
| `The role of the user who created this API token has the restriction <restrição>, which blocks this route.` | O papel de quem criou o token tem uma restrição que bloqueia a rota. | Ajuste o papel ou crie o token com um membro sem essa restrição. |
| Começa com `The role of the user who created this API token restricts which conversations and messages it can read…` | O papel de quem criou o token limita quais conversas e mensagens ele vê. | Confira com o proprietário do workspace se o papel de quem criou o token atende ao acesso que a integração precisa. |
| `ThrottlerException: Too Many Requests` (HTTP 429) | Limite de chamadas excedido. | Espere alguns segundos e repita. |

## Limite de chamadas

- **Maioria das rotas da API pública:** 3 chamadas a cada 3 segundos.
- **Envio de mensagem (`POST /v1/messages/send`):** 300 chamadas por minuto.
- A contagem é feita **por workspace** (somando todos os tokens do workspace) e **por rota**. Ao exceder o limite, a API responde HTTP 429 (`ThrottlerException: Too Many Requests`).

## Envio legado

Tokens antigos, criados antes de existir a permissão **Enviar**, podem exibir a etiqueta laranja **Envio legado**, com a dica: `"Token antigo: ainda envia mensagens e dispara campanhas pela API sem a permissão de envio. Não vale para o MCP. Clique para remover."`.

Ao clicar na etiqueta, surge a confirmação `'O token "<nome>" deixa de enviar mensagens e disparar campanhas pela API. Para voltar a enviar, crie um token com a permissão de envio.'` com o botão **Remover envio legado** (retorna `"Envio legado removido"`). Tokens novos nunca nascem com envio legado.

## Token v0 (tokens legados)

O **Token v0** aparece ao clicar em **Mostrar tokens legados** na tela **API Tokens** (exige a permissão **Integrações** ou ser proprietário), com a descrição `"Token legado para acesso a API."`. Há um único **Token v0** por workspace; na tela, você vê e copia o valor.

Ele não funciona na API pública atual (retorna `Invalid API token format`), mas é a credencial usada em [Integrar seu sistema como canal customizado (API)](/docs/desenvolvedor/criando-canal-customizado) (cabeçalho `x-api-token`) e em [Continuar o bot por webhook](/docs/desenvolvedor/webhook-continuar-bot) (campo `token`).
