---
title: "Chamar endpoint e Executar código: formato do JSON e modelo da função"
description: "Formato completo do JSON do Chamar endpoint, chaves reservadas, mapReturnToCustomField, funções do objeto kinbox no Executar código e a sintaxe json: dos campos personalizados no bot."
keywords: [json do chamar endpoint, url, method, headers, body, params, mapReturnToCustomField, chave text na resposta, função run, kinbox.sendMessage, kinbox.assignTo, kinbox.jumpTo, kinbox.setCustomField, axios, json path, erro na integração]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/bot/drawers/EditNodeIntegrationDrawer.tsx
  - web:src/pages/settings/bot/nodes/IntegrationNode.tsx
  - web:src/pages/settings/bot/drawers/integration/prompts-code.ts
  - web:src/pages/settings/bot/drawers/integration/CodeAiAssistDrop.tsx
  - web:public/bot-frame.html
  - web:src/pages/settings/customFields/EditCustomField.tsx
  - web:src/components-old/forms/ConditionsInput/index.tsx
  - web:src/components-old/ui/PlaceholderDropSearch/index.tsx
  - api-v0:server/modules/chat/botFlowV2.js
  - api-v0:server/controllers/BotController.js
  - api-v0:server/auxiliary/Utils.js
  - api-v0:server/services/CustomerPlatformService.js
codigo:
  - web:src/pages/settings/bot/drawers/EditNodeIntegrationDrawer.tsx
  - web:src/pages/settings/bot/drawers/EditNodeIntegrationDynamic.tsx
  - web:src/pages/settings/bot/drawers/integration/**
  - web:src/pages/settings/bot/nodes/IntegrationNode.tsx
  - web:src/pages/settings/bot/run/**
  - web:public/bot-frame.html
  - web:src/pages/settings/customFields/EditCustomField.tsx
  - web:src/components-old/forms/ConditionsInput/index.tsx
  - web:src/components-old/ui/PlaceholderDropSearch/index.tsx
  - api-v0:server/modules/chat/botFlowV2.js
  - api-v0:server/controllers/BotController.js
  - api-v0:server/modules/httpClient.js
  - api-v0:server/auxiliary/Utils.js
  - api-v0:server/services/CustomerPlatformService.js
  - api:src/modules/proxy/**
  - api:src/modules/assist/assist.service.ts
verificado_em: 2026-11-26
---

Referência técnica das integrações do bot e de campos personalizados **Json**, complementando [Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot), [Executar código no bot](/docs/bot/usando-integracao-execucao-codigo) e [Usar um campo personalizado JSON no bot](/docs/bot/usar-campo-personalizado-em-json).

Para o bot pausar no bloco **Esperar um tempo** (**Recebimento de webhook**) e continuar quando o seu sistema chamar, veja [Continuar o bot por webhook](/docs/desenvolvedor/webhook-continuar-bot).

## Chamar endpoint

- **Saída e tempo antes de rodar:** o bloco **Integração** tem uma única saída e aguarda cerca de 1 segundo antes de executar.
- **Chaves aceitas no JSON:**

| Chave | Comportamento |
| --- | --- |
| `url` | Endereço da requisição. |
| `method` | Método HTTP, como `GET` ou `POST`. Padrão: `GET` quando omitido. |
| `headers` | Objeto de cabeçalhos HTTP. |
| `body` | Corpo enviado na requisição. |
| `params` | Objeto convertido em query string e acrescentado à `url` com `?`; a troca de chaves em `params` usa apenas dados do contato. Use `params` ou a query na própria `url`, não os dois. |
| `mapReturnToCustomField` | Objeto `{ "<chave_do_campo>": "<caminho_na_resposta>" }` que salva partes do corpo da resposta em campos do contato ou da sessão. |

- **JSON inválido:** se o conteúdo do campo **Json** não for um JSON válido, o bloco não faz a chamada e segue para o próximo bloco.
- **Chaves reservadas no JSON:**
  - `{{chave}}`: substituída em todo o texto do JSON (URL, cabeçalhos e corpo) pelos dados do contato, da sessão e dos campos personalizados; chave sem valor vira texto vazio.
  - `{{json:<chave>.<caminho>}}`: lê propriedade de um campo personalizado do tipo **Json**.
  - `{{integrations.<tipo>.<chave>}}`: lê um dado salvo em uma integração instalada no workspace; use chaves de um só tipo de integração em cada JSON.
- **Resposta e `mapReturnToCustomField`:**
  - A extração lê o corpo da resposta usando caminhos com pontos e índices (ex.: `result.id`, `itens[0].nome`).
  - A chave de destino é a **Chave reservada** do campo personalizado sem `{{}}` (de **Contato** ou **Sessão de conversa**) ou os campos `name` e `email` do contato. Chaves que não correspondem a um campo existente são ignoradas.
  - Valores vazios, `null` ou ausentes não são gravados. Na conversa real, `0` e `false` são gravados; no **Simular bot**, `0` e `false` não são gravados.
  - Valores do tipo objeto são gravados como texto JSON (compatível com campos do tipo **Json**).
  - Sempre informe um caminho preenchido em `mapReturnToCustomField`: um caminho vazio (`""`) não grava nada na conversa real (embora no simulador salve a resposta inteira).
- **Chave `text` na resposta:** se o corpo da resposta contiver a propriedade `text`, o bot envia esse conteúdo como mensagem ao contato.
- **Erros:** erro de rede, status HTTP fora de 2xx ou JSON inválido fazem o corpo ficar vazio, nada é salvo, nenhum erro aparece na conversa e o bot segue para o próximo bloco.
- **Simulação × conversa real:**
  - Na simulação (**Simular bot**), **Chamar endpoint** faz a chamada de verdade e mostra o retorno ou a falha em **Resultado da integração** (em vermelho com ícone de alerta quando falha).
  - Na conversa real, falhas não aparecem na conversa e o bot segue para o próximo bloco.
  - Em **Ver dados do contato** no simulador, a opção **Pular integrações** pula todos os blocos **Integração**.
- **Integrações prontas (grupo Outros):**
  - As integrações prontas usam a conexão com aquele sistema que o workspace configurou.
  - Na simulação, integrações do grupo **Outros** são puladas. Na conversa real, falhas em integrações prontas não mudam o caminho do fluxo.

## Executar código

- **Modelo da função:**

```js
async function run(kinbox) {
  await kinbox.sendMessage("Seu nome é " + kinbox.contact.name)
  return { name: kinbox.contact.name }
}
```

- **Regras do modelo:** escreva apenas `async function run(kinbox)`. `axios` está disponível como variável global (sem `require` e sem segundo parâmetro). O valor de `return` é exibido em **Resultado da integração** no simulador e é ignorado na conversa real. O bloco aguarda cerca de 1 segundo antes de rodar.
- **Funções do objeto `kinbox`:**

| Assinatura | Comportamento |
| --- | --- |
| `await kinbox.sendMessage(texto)` | Envia uma mensagem de texto ao contato. |
| `await kinbox.sendNote(texto)` | Envia uma nota interna na conversa (**Nota pro time**). |
| `await kinbox.updateContact({ ... })` | Atualiza propriedades do contato. |
| `await kinbox.setCustomField(chave, valor)` | Grava um campo personalizado de contato ou de sessão usando a chave reservada sem `{{}}`. Objetos são salvos como texto JSON. |
| `await kinbox.addTag(nomeOuId)` | Adiciona uma tag à sessão pelo nome ou ID (no simulador, a comparação por nome não diferencia maiúsculas). |
| `await kinbox.removeTag(nomeOuId)` | Remove uma tag da sessão pelo nome ou ID. |
| `await kinbox.assignTo(tipo, id)` | Atribui usando `tipo` = `"agent"` (membro), `"group"` (grupo) ou `"assignmentRule"` (regra de atribuição automática) e o respectivo `id`. |
| `await kinbox.resolve()` | Resolve a conversa (no simulador não executa ação). |
| `await kinbox.jumpTo(idDoBloco, idDoBot?)` | Pula para outro bloco do mesmo bot ou, com `idDoBot`, transfere para outro bot. Aceita o ID com `#` na frente. |

- **Dados recebidos em `kinbox`:**
  - `kinbox.contact`: nome, telefone, e-mail e `customFields` (cada chave com `{ value }`).
  - `kinbox.conversation`: `session.protocol`, `session.customFields`, tags, grupo e responsável. Na conversa real, também inclui `conversation.lastMessage` (`text`, `content`, `date`) e `conversation.operator` (`id`, `name`, `email`).
  - Campos personalizados do tipo **Json** chegam já convertidos em objeto JavaScript em `customFields.<chave>.value`.
- **Descoberta de IDs para `jumpTo`:** o ID de um bloco aparece no formato `<tipo> - #<id>` em **Pesquisar ação** no editor. O ID de outro bot é o número na URL do editor (`/settings/bots/<id>`). Na conversa real, passar o segundo parâmetro transfere para o outro bot.
- **Erros e simulação:**
  - No **Simular bot**, o código roda de forma isolada: ações do objeto `kinbox` alteram apenas a conversa de teste, enquanto chamadas com `axios` são feitas de verdade.
  - O simulador valida tipos de parâmetro e exibe erros em vermelho em **Resultado da integração** com `"Error executing function"` e mensagens como `"sendMessage() expects a string as parameter"`, `"assignTo() expects a string as first parameter"` e `"updateContact() expects an object as parameter"`.
  - Na conversa real, qualquer erro no código é silencioso e o bot segue para o próximo bloco ligado.

## Assistente Kin

- **No editor Código (Executar código):** grupo **Código** com **Analisar e corrigir**, **Explicar**, **Refatorar** e **Gerar código** (abre **Instruções** com o campo **O que você gostaria de fazer?**).
- **No editor Json (Chamar endpoint):** grupo **JSON** com **Analisar e corrigir**, **Explicar** e **Gerar JSON** (sem **Refatorar**).
- **Saída:** o resultado é exibido abaixo do editor na área **Resultado** e não substitui o conteúdo automaticamente.
- **Saldo:** consome saldo da carteira (veja [Saldo da carteira e créditos](/docs/conceitos/saldo-e-creditos)). Quando o saldo está em R$ 0,10 ou menos, as opções ficam desativadas com a dica `(Pouco ou nenhum crédito restante)` e aparecem **Seus créditos acabaram** e **Comprar créditos** para qualquer membro. Ao clicar em **Comprar créditos**, quem tem a permissão **Assinatura** (ou o proprietário) vai para a tela de saldo (veja [Adicionar saldo e créditos de SMS](/docs/assinatura/adicionar-saldo)); os demais veem `"Fale com um administrador para colocar créditos no ambiente."`.

## Campo personalizado do tipo Json

- **Cadastro:** em **Configurações** → **Ambiente** → **Campos personalizados** (permissão **Campos**, na seção **Gerenciamento do Ambiente**, ou proprietário), com **Tipo de campo** = **Json**. A **Chave reservada** é gerada sem acentos, em minúsculas e com `_` no lugar de espaços e pontos (`{{chave}}`).
- **Entidades:** escolha **Contato** ou **Sessão de conversa** para gravar e ler no bot. Apenas campos de **Contato** e **Sessão de conversa** são lidos em mensagens e no bloco **Decisão**. Na gravação pelo bot, campos de **Sessão de conversa** gravam na sessão atual e campos de **Negociação** gravam na negociação aberta da conversa (se houver).
- **Sintaxe em textos e no Chamar endpoint:** `{{json:<chave>.<caminho>}}`, com suporte a propriedades aninhadas e índices de lista (ex.: `{{json:pedido.numero}}`, `{{json:pedido.itens[0].nome}}`). Funciona em mensagens, no JSON do **Chamar endpoint** e no **Simular bot**. No **Simular bot**, chaves com índice de lista (como `{{json:pedido.itens[0].nome}}`) aparecem como texto literal, sem a troca; na conversa real a troca acontece. Para conferir índices, `0` e `false`, use uma conversa de teste com dados fictícios e **Executar bot**.
- **Seletor de chaves:** no botão `{}` (**Chaves reservadas**), o campo aparece como `{{json:<chave>}}` e insere `{{json:<chave>.key_name}}`.
- **Valores vazios:** usar `{{<chave>}}` sem o prefixo `json:` em um campo **Json** resulta em texto vazio. Propriedade inexistente no objeto também resulta em texto vazio.
- **Bloco Decisão:** campos de contato aparecem no grupo **Contato** e campos de sessão em **Conversa/Sessão**. Exige o campo extra `json path (e.g: a[0].b)` com o caminho interno (sem o nome do campo e sem `json:`; vazio retorna `"Faltando caminho do JSON"`). Operadores disponíveis: **é igual a**, **não é igual a**, **é maior que**, **é menor que**, **é vazio**, **não é vazio**, **contém** e **não contém**.
