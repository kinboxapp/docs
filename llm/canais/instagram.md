---
title: "Instagram: páginas elegíveis, permissões da Meta, unidades do plano e teste grátis"
description: Regras do canal de Instagram na Kinbox, com as páginas que aparecem na conexão, o que é pedido à Meta, os limites do plano, as mensagens de erro e o que entra e sai nas conversas.
keywords: [instagram, páginas elegíveis, conta profissional, conta comercial, instagram business, instagram direct, plano trial, teste grátis, você não pode adicionar canais de instagram em plano trial, você precisa remover canais de instagram, story, menção, reels, vídeo como link, seu canal de necessita ser reconectado]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/channels/facebook/AddMetaChannel.tsx
  - web:src/pages/settings/channels/facebook/getPageDisplay.ts
  - web:src/pages/settings/channels/AddChannel.tsx
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/controllers/KinboxDirectController.js
  - api-v0:server/controllers/NewPaymentController.js
codigo:
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/channels/facebook/AddMetaChannel.tsx
  - web:src/pages/settings/channels/facebook/getPageDisplay.ts
  - web:src/pages/settings/channels/instagram/**
  - web:src/pages/inbox/MessageContent.tsx
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/controllers/KinboxDirectController.js
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/routes/IntegrationsApiRoutes.js
  - api-v0:server/modules/scheduler/facebookScheduler.js
  - api-v0:server/modules/chat/auxiliary/parser.js
verificado_em: 2026-11-26
---

Detalhes de referência da página humana [Conectar o Instagram](/docs/canais/instagram).

## Páginas elegíveis e lista na conexão

- Na conexão do Instagram, a Kinbox exibe apenas páginas do Facebook liberadas na janela da Meta que tenham uma conta do Instagram profissional vinculada.
- Cada cartão exibe o `@usuário` e a foto do perfil do Instagram. Sem `@usuário`, mostra o nome da conta do Instagram ou, na falta dele, o nome da página. Sem foto no Instagram, usa a foto da página. Ao passar o mouse, aparece o ID da página.
- A lista recebe no máximo 99 páginas da Meta.
- Se nenhuma página elegível for encontrada, a tela mostra `"Não encontramos nenhuma página com as permissões necessárias."` e o botão **Tentar novamente**.
- Uma página cuja conta do Instagram já é canal ativo deste workspace aparece desativada e não pode ser clicada, mesmo que o canal esteja **Desconectado**.
- Uma página ligada a um canal ativo de outro workspace é recusada com `"Esse canal já está ativado em outro ambiente"` ("ambiente" significa workspace).

## Permissões pedidas à Meta

Na janela de login da Meta (em português), a Kinbox pede acesso para listar as páginas, enviar e receber mensagens da página, gerenciar os dados da página, acessar a empresa, ler a conta do Instagram e gerenciar as mensagens do Instagram (`pages_show_list`, `pages_messaging`, `pages_manage_metadata`, `business_management`, `instagram_basic` e `instagram_manage_messages`).

Se a janela da Meta for fechada antes do fim ou o login falhar, nenhum canal é criado e nenhum aviso aparece na Kinbox.

## Plano e teste grátis

O canal de Instagram exige unidade livre de **Instagram Direct** no plano pago (item cobrado por canal) e não pode ser conectado no teste grátis. Não é possível contratar menos unidades de **Instagram Direct** do que a quantidade de canais de Instagram conectados (veja [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano)).

A checagem do plano acontece depois da janela da Meta e da escolha da página. Canais excluídos não entram na contagem de canais ativos.

| Mensagem de erro | Quando aparece |
| --- | --- |
| `"Você não pode adicionar canais de Instagram em plano trial"` | Workspace em teste grátis (assinatura atual). |
| `"Você precisa remover canais de Instagram para prosseguir com a contratação"` | Assinatura atual já usa todas as unidades de **Instagram Direct** contratadas (conta apenas canais de Instagram ativos). |
| `"Assinatura expirada"` | Assinatura atual vencida há mais de 3 dias. |
| `"Instagram bloqueado para seu plano atual."` | Assinatura antiga sem liberação para Instagram. |
| `"Seu plano atual não permite adicionar ou modificar instâncias do instagram."` | Assinatura antiga no limite de canais de Instagram. |

## O que chega do Instagram e como aparece

| Chega do Instagram | Como aparece na conversa |
| --- | --- |
| Texto, foto, vídeo, áudio ou arquivo | Mensagem normal na conversa. |
| Resposta a um story seu | O story junto do texto (descartada sem aviso se **Ignorar resposta de story** estiver ligado). |
| Menção em story | Botão `"Você foi mencionado em um Story"` que abre o story (descartada sem aviso se **Ignorar menções** estiver ligado). |
| Reel compartilhado | Vídeo do reel embutido ou botão `"Te encaminhou uma mídia"`. |
| Post ou outro conteúdo compartilhado | Imagem do post ou botão `"Te encaminhou uma mídia"`. |
| Contato apaga a mensagem | A mensagem fica marcada como apagada. |
| Mensagem enviada pela empresa pelo app do Instagram | Aparece na conversa como mensagem enviada pela empresa. |
| Comentário em post, reel ou anúncio; reação a mensagem; clique em anúncio sem mensagem | Não aparece na Kinbox. |

**Ignorar menções** e **Ignorar resposta de story** existem apenas no Instagram, vêm desligadas por padrão, valem somente para o que chegar depois de ligá-las e não bloqueiam mensagens normais do Direct (veja [Configurações do Instagram e do Facebook](/docs/canais/instagram/configuracoes)).

## Dados do contato

Quando a conversa é nova, a Kinbox busca o nome (ou o `@usuário`) e a foto do perfil do contato. Um nome já existente no contato não é substituído.

## Envio de mensagens, prazo para responder e erros

- **Texto e foto:** enviados normalmente.
- **Áudio:** convertido e enviado como áudio; o editor tem o botão **Áudio** para gravar.
- **Vídeo e arquivo (documento):** chegam ao contato como link.
- **Responder (citar) mensagem:** disponível no menu da mensagem para mensagens recebidas e para mensagens enviadas com sucesso no Instagram. Não aparece em mensagens com erro nem em notas.
- **Iniciar conversa:** não dá para iniciar uma conversa nova pelo Instagram na Kinbox; a conversa começa quando o contato escreve ([Iniciar uma conversa com um contato](/docs/conversas/iniciar-conversa)).
- **Prazo para responder:** a Kinbox não mostra contador nem bloqueia a resposta por prazo no Instagram. A Meta ainda pode recusar o envio. Mensagens enviadas por membros saem com a etiqueta de atendimento humano da Meta (`HUMAN_AGENT`); mensagens enviadas sem membro (como o [bot](/docs/bot/visao-geral)) saem sem essa etiqueta. O prazo para responder é definido pela Meta.
- **Erros de envio:** quando a Meta recusa uma mensagem, ela fica com ícone de erro e o motivo aparece ao passar o mouse precedido de `"#2 Error:"` (sem motivo específico, exibe `"Erro ao enviar mensagem"`). Se a recusa for por perda de acesso, o canal muda para **Desconectado** e a mensagem mostra `"Seu canal de necessita ser reconectado. Por favor acesse "Configurações -> Canais" e reconecte-o."`.

## Renovação do acesso, desconexão e reconexão

- A Kinbox renova o acesso à página automaticamente. Se a Meta não renovar o acesso, ou se recusar um envio por perda de acesso, o canal fica **Desconectado**.
- A dica do selo **Desconectado** diz `"Seu canal está desconectado. Verifique sua conexão de internet."`, mas no Instagram a causa é a perda de acesso na Meta.
- Não existe botão de reconectar, e a página já conectada fica desativada na lista. Para reconectar, é necessário **Excluir** o canal e conectar a mesma página de novo em **Novo canal**: o mesmo canal volta ativo e **Conectado**, com o mesmo ID e as conversas antigas (excluir não apaga conversas e libera a unidade do plano). Ao voltar, **Ignorar menções** e **Ignorar resposta de story** permanecem como estavam, mas a lista de grupos de **Restringir visibilidade** volta vazia e precisa ser conferida.
- Excluir e adicionar canais exige a permissão **Gerenciar Canais** ([Referência de permissões](/docs/administracao/referencia-de-permissoes)) ou ser o proprietário do workspace, sem a restrição **Somente pode dar manutenção simples em canais** (que oculta **Novo canal** e **Excluir**). Veja [O Instagram ou o Facebook não conecta ou desconectou](/docs/canais/instagram/problemas-comuns).
