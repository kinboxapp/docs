---
title: "Plugins: modos de exibição, placeholders no endpoint e biblioteca kinboxjs"
description: Referência dos plugins da Kinbox — campos e limites do cadastro, comportamento de cada modo, troca de campos no endereço, parâmetros e dados que o plugin recebe e funções da biblioteca kinboxjs.
keywords: [plugin não aparece, plugin em branco, modo tela inteira, placeholder no endpoint, dark_mode, operator_id, kinbox.on conversation, setProperty, sendForm, getWorkspaceInfo, assignTo, moveToGroup, addTag, callback]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/plugins/EditPlugin.tsx
  - web:src/components-old/chat/side/SidePlugin/SidePluginContainer.tsx
  - web:src/components-old/chat/side/SidePlugin/index.tsx
  - web:src/components-old/chat/side/SidePlugin/FormPluginModal.tsx
  - web:src/components-old/chat/side/ContactDetails/index.tsx
codigo:
  - web:src/pages/settings/plugins/**
  - web:src/components-old/chat/side/SidePlugin/**
  - web:src/components-old/chat/side/ContactDetails/index.tsx
  - api-v0:server/controllers/PluginController.js
verificado_em: 2026-11-26
---

Referência técnica dos plugins da Kinbox, complementando [Criar um plugin para o painel da conversa](/docs/desenvolvedor/criando-plugin-integracao) e [Caixa de entrada: visão geral](/docs/conversas/caixa-de-entrada-do-kinbox).

## Cadastro, campos e limites

- **Acesso:** **Configurações** → **Integrações** → **Plugins** exige a permissão **Integrações** ou ser proprietário do workspace (veja [Referência de permissões](/docs/administracao/referencia-de-permissoes)). A lista traz busca **Pesquisar por nome** e filtros **Tudo** e **Visível somente para mim**.
- **Campos do painel Criar plugin:**
  - **Nome do plugin:** obrigatório (`"Por favor digite um nome."`).
  - **Endpoint:** obrigatório (`"Por favor digite um endpoint."`); use endereço `https://`.
  - **Modo de exibição:** padrão **Normal**.
  - **Altura em pixels:** exibido em **Normal** e **Modal**, de `200` a `800` (padrão `400`).
  - **Largura em pixels:** exibido em **Painel lateral** e **Página lateral**, de `200` a `1600` (padrão `400`).
  - **Auth Secret:** preenchido pela Kinbox, sem edição. Não deve ser usado para autenticação.
  - **Visível para:** **Todos** (padrão), **Grupos** (abre o campo **Grupos**) ou **Apenas para mim**.

## Modos de exibição

| Modo | Comportamento | Tamanho |
| --- | --- | --- |
| **Normal** | Abre dentro do painel **Detalhes** da conversa. | **Altura em pixels** (200–800) |
| **Modal** | Abre em janela centralizada com o nome do plugin no título. | **Altura em pixels** (200–800) |
| **Painel lateral** | Abre em painel à direita com título. | **Largura em pixels** (200–1600) |
| **Página lateral** | Abre em painel à direita sem título. | **Largura em pixels** (200–1600) |
| **Nova página** | Abre em nova aba do navegador só com o endereço (com `{{chave}}` trocados): sem parâmetros da Kinbox, sem eventos e sem efeito das funções `Kinbox.*`. | Não usa |
| **Popup** | Abre em janela separada do navegador só com o endereço (com `{{chave}}` trocados): sem parâmetros da Kinbox, sem eventos e sem efeito das funções `Kinbox.*`. | Não usa |
| **Tela inteira** | Cobre a tela inteira sem botão de fechar da Kinbox. Para fechar, a página envia `window.parent.postMessage({ event: "close" }, "*")` (a biblioteca `kinboxjs.js` não tem função para isso); a Kinbox só aceita a mensagem vinda da própria página do plugin. | Não usa |

## Troca de campos personalizados no Endpoint

- O padrão `{{chave}}` no **Endpoint** é substituído pelo valor do campo personalizado do contato na conversa aberta **somente** nos modos **Nova página** e **Popup**.
- Nos demais modos (**Normal**, **Modal**, **Painel lateral**, **Página lateral** e **Tela inteira**), o quadro recebe o endereço sem substituição.
- Campo sem valor é trocado por texto vazio; chave que não corresponde a um campo do contato permanece como está.

## Parâmetros no endereço e verificação de origem

- **Query string acrescentada pela Kinbox** (só nos modos que abrem dentro da Kinbox; em **Nova página** e **Popup** não há parâmetros): `dark_mode` (`true` ou `false`), `app_plugin_type` (`inbox`), `operator_id` (ID do membro logado) e, no modo **Tela inteira**, `display_mode=fullscreen`.
- **Mesma origem:** a Kinbox só aceita mensagens vindas da mesma origem do **Endpoint** cadastrado; mensagens de outra origem são ignoradas. Se o plugin redirecionar para outro domínio, as funções da biblioteca param de responder.

## Biblioteca `kinboxjs.js`

Script: `https://andrody.github.io/kinbox-lib/kinboxjs.js` (carregado no `<head>`, expõe `window.Kinbox`).

### Eventos recebidos

- **`conversation`:** dispara ao abrir e sempre que o membro troca de conversa, com:
  - `contact`: `id`, `name`, `email`, `phone`, `avatar`, `customFields`
  - `conversation`: `id`, `identifier`, `channel` (`{ id, name, official }`), `channel_type`, `assignee.id`, `group.id`, `tags` (`[{ id }]`), `link`
  - `session`: `id`, `customFields`
  - `user`: `id`, `name`, `phone`, `avatar`, `email`, `isActive`
- **`no_conversation`:** `{ user }` quando nenhuma conversa está aberta.
- **`callback`:** `{ key, success }` em resposta a `Kinbox.setProperty(...)`.

### Funções e limites

| Assinatura | Comportamento |
| --- | --- |
| `Kinbox.on(evento, fn)` | Registra ouvinte para `conversation`, `no_conversation` ou `callback`. Apenas o primeiro ouvinte registrado para cada evento é chamado. |
| `Kinbox.loading(true \| false)` | Exibe ou remove sobreposição de carregamento sobre o plugin. Chame `false` ao terminar, inclusive em erro. |
| `Kinbox.toast(tipo, texto)` | Exibe aviso na Kinbox; `tipo` aceita `success`, `error`, `info`, `warning` e `loading`. |
| `Kinbox.dialog("confirm", { title, description, okText, cancelText }, fn)` | Abre confirmação; `fn` recebe `true` ou `false`. |
| `Kinbox.setProperty({ key, type, contactId \| sessionId, fields })` | Grava campos personalizados de `type`: `"contact"` ou `"session"`, com `fields: { <chave>: { value } }`. Responde no evento `callback` com `{ key, success }`. ID com caractere fora de letras, números, `_` e `-` retorna `success: false`. |
| `Kinbox.assignTo(idDoMembro)` | Atribui a conversa aberta ao membro. Em falha, mostra `"Não foi possível atribuir a conversa. Tente novamente."`. |
| `Kinbox.moveToGroup(idDoGrupo)` | Move a conversa aberta para o grupo informado. |
| `Kinbox.addTag(idDaTag)` / `Kinbox.removeTag(idDaTag)` | Adiciona ou remove a tag na conversa aberta. |
| `Kinbox.sendForm({ items, type, title }, fn)` | Abre formulário da Kinbox (`type`: `"modal"`, padrão, ou `"drawer"`) e entrega as respostas a `fn`. |
| `Kinbox.getWorkspaceInfo(fn)` | Entrega `channels`, `customFields`, `members`, `tags`, `groups` e `roles` do workspace. |

- **Uma resposta pendente por vez:** `Kinbox.dialog`, `Kinbox.sendForm` e `Kinbox.getWorkspaceInfo` mantêm apenas um retorno pendente por vez; chamar outra função antes de receber a resposta substitui a anterior.
- **Campos aceitos em `Kinbox.sendForm`:** cada item aceita `name`, `label`, `type`, `required` e, em seleção, `options` (`[{ value, label }]`). Tipos de campo aceitos: `text`, `textarea`, `number`, `decimal`, `select`, `multi-select`, `boolean`, `date` (retorna formatado como data) e `datetime`.

## Diagnósticos

| Sintoma | Causa provável |
| --- | --- |
| **Plugins** não aparece em **Integrações** | O papel do membro não tem a permissão **Integrações**. |
| Plugin não aparece no painel **Detalhes** da conversa | **Visível para** não inclui o membro ou seus grupos, ou o membro está no modo de treino da Academia (plugins ficam ocultos durante o treino). |
| Plugin abre em branco | Endereço inacessível na internet, fora de `https://` ou bloqueado para carregamento em iframe. |
| `{{chave}}` não é substituído no **Endpoint** | O modo de exibição não é **Nova página** nem **Popup**. |
| Funções do `Kinbox` não respondem | O modo é **Nova página** ou **Popup** (a página abre só com o endereço), ou a página redirecionou para um domínio diferente da origem do **Endpoint**. |
| Plugin fica preso no carregando | Faltou chamar `Kinbox.loading(false)` ao final da operação ou no tratamento de erro. |
