---
title: "Filtros de conversa: estados, combinação das condições, quem vê e contadores"
description: Referência dos filtros da Caixa de entrada da Kinbox, com todos os estados, como as condições se combinam, quem vê cada filtro, pastas, contadores e mensagens.
keywords: [estados do filtro, nunca respondidos, sessão sem resposta de operador, janela de resposta, tags ausentes, deve conter todas as tags, minutos desde última mensagem, contador de filtro, mais de 999, mostrar filtro, pasta de filtros, permissão filtros, não atribuído, conversas sem responsável, aba de conversas]
publico: llm
tipo: referencia
fontes:
  - web:src/components-old/ManageFilters/index.tsx
  - web:src/components-old/inbox/EditSegmentDrawer.tsx
  - web:src/pages/inbox/index.tsx
  - api-v0:server/controllers/SegmentController.js
  - api-v0:server/services/CustomerPlatformService.js
  - api-v0:server/services/SegmentService.js
codigo:
  - web:src/components-old/ManageFilters/**
  - web:src/components-old/inbox/EditSegmentDrawer.tsx
  - web:src/components-old/forms/RestrictionInput/index.tsx
  - web:src/pages/inbox/index.tsx
  - api-v0:server/controllers/SegmentController.js
  - api-v0:server/services/SegmentService.js
  - api-v0:server/services/CustomerPlatformService.js
  - api-v0:server/routes/InboxApiRoutes.js
  - mobile:src/app/segment-edit.tsx
verificado_em: 2026-11-26
---

Referência complementar de [Criar filtros de conversa](/docs/conversas/criar-filtros-de-conversa).

## Todos os 17 estados

O bloco **Estados** fica sempre visível no painel (o item **Estado** dentro do menu **Condição** não altera a exibição). Um filtro novo já vem com **Aberto** marcado.

| Estado | Significado |
| --- | --- |
| **Não atribuído** | Conversas sem membro atribuído. |
| **Atribuído** | Conversas atribuídas a algum membro. |
| **Atribuído a mim** | Conversas atribuídas ao membro que está visualizando o filtro. |
| **Sem grupo** | Conversas que não pertencem a nenhum grupo. |
| **Aberto** | Conversas não resolvidas (marcado por padrão em filtros novos). |
| **Resolvido** | Conversas já resolvidas. |
| **Primeiro contato do cliente no canal** | Primeira conversa daquele contato no canal específico. |
| **Primeiro contato do cliente** | Contato novo no workspace. |
| **Pendente** | Conversas marcadas como pendentes. |
| **Criado por integração** | Conversas criadas por integração. |
| **Não lido** | Conversas com indicador de não lida. |
| **Sem tags** | Conversas sem nenhuma tag aplicada. |
| **Nunca respondidos** | Conversas sem nenhuma mensagem de membro, considerando apenas conversas criadas após `22/11/2022`. |
| **Sessão sem resposta de operador** | Sessão atual ainda sem resposta de membro. |
| **Janela de resposta expirado** | Conversas individuais do WhatsApp oficial com a janela de 24 h vencida ou sem data de janela (o contato nunca escreveu). Pode incluir grupos do WhatsApp por QR Code (Express), cujo identificador é `<id>-group` e não tem data de janela: combine com **Canais** para ver só o oficial. |
| **Janela de resposta aberta** | Conversas individuais do WhatsApp oficial com a janela de 24 h aberta. |
| **Sessão com erro de envio de mensagem** | Sessão marcada com erro de envio. |

### Pares mutuamente exclusivos

Marcar uma opção desmarca automaticamente a outra:

- **Não atribuído** × **Atribuído**
- **Aberto** × **Resolvido**
- **Janela de resposta expirado** × **Janela de resposta aberta**

## Combinação das condições

- **Entre campos diferentes:** lógica **E** (a conversa precisa atender a todas as condições).
- **Vários itens no mesmo campo** (**Grupos**, **Atribuídos**, **Canais**, **Seguidores**): lógica **OU** (a conversa precisa atender a qualquer um dos itens).
- **Tags:** sem **Deve conter todas as tags**, usa **OU** (qualquer uma das tags); com **Deve conter todas as tags** marcada, usa **E** (precisa ter todas). O seletor lista apenas tags que o membro pode ver.
- **Tags ausentes** (**Não contém nenhuma das tags**): exclui conversas que possuam qualquer uma das tags selecionadas.
- **Tempo:** **Minutos desde última mensagem** `X` retorna conversas cuja última mensagem tem mais de `X` minutos; **Minutos desde pendente** `X` retorna conversas pendentes há mais de `X` minutos (aceita número a partir de `0`).
- **Escopo de acesso:** o filtro sempre aplica o **Acesso as Conversas** do papel do membro na mesma consulta; se o membro não vê todas as conversas e filtra por **Grupos**, entram apenas os grupos selecionados dos quais ele também participa.

## Visibilidade e inscrição na barra lateral

- **Quem tem acesso?** (padrão: **Todos os membros**): **Todos os membros**, **Apenas você** ou **Membros em grupos específicos** (exige pelo menos um grupo).
- Quem vê cada filtro em **Gerenciar Filtros**: filtros de **Todos os membros**, filtros criados pelo próprio membro e filtros restritos a grupos dos quais ele faz parte. O proprietário do workspace **não** vê filtros **Apenas você** de outros membros.
- Filtro privado mostra ícone com a dica **Apenas você**.
- Inscrição: ao criar um filtro, apenas o criador fica inscrito (aparece na barra lateral dele). Outros membros com acesso veem o filtro oculto em **Gerenciar Filtros** e precisam clicar em **Mostrar** para exibir na própria barra lateral. **Esconder** afeta apenas quem clicou.

## Contadores

- Contam apenas conversas **abertas** (dica: "Conversas abertas: {{count}}"). Um filtro com **Resolvido** marcado sempre mostra `0`.
- Teto de contagem: 999. Acima disso, a dica exibe "Conversas abertas: mais de 999".
- Tempo limite: se a contagem demorar mais de 2 segundos, exibe "—" com a dica "Esse filtro tem conversas demais para contar agora".
- Memória (cache): dura 90 segundos. O filtro aberto consulta o número atual ao ser selecionado; os demais exibem o último valor conhecido (mais apagado, com "atualizado há ..." na dica).
- **Atualizar contadores** (dica "Atualizar contadores de conversas"): recarrega sem usar a memória de 90 segundos para os filtros padrão e o filtro aberto (exibe "Atualizando...").

## Pastas

- Limite de profundidade: **2 níveis** (pasta de primeiro nível e subpasta; subpastas não exibem **Nova pasta**).
- Regras de **Mover para pasta**: subpastas podem ir para **Sem pasta** ou para outra pasta de primeiro nível; uma pasta de primeiro nível só entra dentro de outra se não tiver subpastas.
- Exclusão: não é possível excluir pasta com filtros ou subpastas dentro.
- Visibilidade independente: a restrição de acesso da pasta não substitui a restrição individual de cada filtro dentro dela.
- Os filtros **Padrões** em **Gerenciar Filtros** (onde **Abertos** aparece como **Caixa de entrada**) são apenas informativos e não podem ser editados nem escondidos.

## Permissões

- Permissão **Filtros** (seção **Gerenciamento do Ambiente**): "Adicionar, editar e excluir filtros públicos.".
- Sem **Filtros**: ao criar um filtro novo ou abrir um filtro que não é só seu, o painel exibe "Você não possui permissão para criar ou alterar filtros públicos.", desativa **Todos os membros** e **Membros em grupos específicos** e não deixa salvar (o mesmo vale para pastas). Para criar ou editar filtros, o membro pede a permissão **Filtros** ao administrador do workspace.

## Mensagens exatas

| Situação | Mensagem exata |
| --- | --- |
| Nome vazio ao criar filtro (API) | "name é obrigatório" |
| Sem permissão **Filtros** | "Você não possui permissão para criar ou alterar filtros públicos." |
| **Quem tem acesso?** vazio | "Escolha quem tem acesso" |
| **Membros em grupos específicos** sem grupo | "Por favor escolha pelo menos um grupo." |
| Filtro criado / salvo | "Filtro criado." / "Filtro salvo." |
| Pasta criada | "Pasta criado." |
| Excluir pasta com conteúdo | "Não é possível excluir uma pasta que contém filtros ou subpastas. Retire os filtros da pasta antes de excluí-la." |
| Confirmar exclusão de pasta vazia | "Tem certeza que deseja excluir essa pasta?" |
| Confirmar exclusão de filtro | "Tem certeza que deseja excluir esse segmento?" |
| Filtro não pertence ao workspace (API) | "Você não tem permissão para realizar essa operação" |
| Contagem de filtro inexistente | "Filtro não encontrado" |
| Sem nenhum filtro personalizado | "Parece que você ainda não possui nenhum filtro de conversa..." |
