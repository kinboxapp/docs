---
title: "Metas: assistente, participantes, Meta atual e mensagens"
description: Regras detalhadas das metas da Kinbox — permissão, passos e validações do assistente Criar Meta, participantes (Todos, Membros específicos, Grupo), milestones, quem vê o ícone Meta atual, Modo tela cheia, edição, exclusão e mensagens da tela.
keywords: [metas regras, assistente criar meta, milestone valor mínimo, milestone sem valor alvo, nome da meta obrigatório, sair do assistente, mudanças não salvas, meta atual, ícone meta atual, quem vê a meta, participantes grupo sem grupo, membros específicos vazio, modo tela cheia meta, editar meta, excluir meta, permissão metas, nova negociação ganha]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/crm/goals/index.tsx
  - web:src/pages/crm/goals/AddGoal2/index.tsx
  - web:src/pages/crm/goals/ViewGoal/index.tsx
  - web:src/pages/crm/goals/ViewGoal/ViewGoalHeader.tsx
  - web:src/components-old/header/GoalHeaderItem.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
  - api:src/modules/goals/goal.utils.ts
codigo:
  - web:src/pages/crm/goals/**
  - web:src/components-old/header/GoalHeaderItem.tsx
  - web:src/layouts/BaseLayout.tsx
  - api:src/modules/goals/**
verificado_em: 2026-11-26
---

Detalhes de referência de [Criar metas para a equipe](/docs/metas/criando-metas-no-kinbox). Regras de cálculo em [Como as metas são calculadas](/docs/metas/como-as-metas-sao-calculadas).

## Permissão

- **Metas** (seção **Gerenciamento do Ambiente** do papel, em **Configurações** → **Ambiente** → **Permissões**): "Ver, adicionar, editar e excluir metas." Libera o item **Metas** no menu lateral e criar, editar e excluir metas. O proprietário sempre pode. Veja [Referência de permissões](/docs/administracao/referencia-de-permissoes).
- Sem a permissão **Metas**, o item **Metas** não aparece no menu lateral, e abrir o endereço da página exibe `"Você não tem permissão para acessar essa página"`.

## Lista de metas

- Campo **Pesquisar**, botão **Nova meta** e 20 metas por página.
- Colunas: **Nome**, **Status** (`"{{count}} dias restantes"`; com menos de 24 horas restantes ou com a meta já terminada, só um ✓ verde), **Valor alvo** (valor na moeda do workspace ou quantidade de produtos) e menu **⋯** (**Visualizar** e **Excluir**).
- Lista vazia: `"Parece que você ainda não criou nenhuma meta..."` com o botão **Criar nova meta**.

## Assistente Criar Meta

**Nova meta** abre o assistente **Criar Meta** em 7 passos, com barra de progresso e botões **Voltar**, **Próximo** e, no último passo, **Finalizar** (salva e abre a meta).

| Passo | Título na tela | Campos e regras |
| --- | --- | --- |
| 1 | `"Que tipo de meta você quer criar?"` | **Valor do negócio** ou **Quantidade de produto**. Clicar num cartão já avança. |
| 2 | `"Qual vai ser a meta?"` | Valor alvo (a partir de 0, na moeda do workspace). Na meta por produto: **Quantidade** (a partir de 1) e **Produtos** (um ou mais). |
| 3 | `"Como vai se chamar sua meta?"` | **Nome** obrigatório (vazio mostra `"Obrigatório"`); **Descrição** opcional, para regras ou premiações. |
| 4 | `"Escolha um período para a meta"` | **Esse Mês**, **Próximo Mês**, **Esse Ano** ou **Personalizado**. Em **Personalizado**, **De** e **Até** são obrigatórios (`"Por favor escolha a data de início."` / `"Por favor escolha a data de término."`). |
| 5 | `"Quem vai participar?"` | **Todos**, **Membros específicos** (campo **Membros**) ou **Grupo** (campo **Grupos**). Os campos **Membros** e **Grupos** mostram `"Todos"` quando ficam vazios. |
| 6 | **Milestones** | Opcional. Veja [Milestones](#milestones). |
| 7 | **Condições** | Opcional. Botão **+ Condição**, com os filtros de negociação do funil, em grupos "todas" ou "qualquer". As condições só restringem as negociações que contam. |

Confira tipo, valor alvo e período antes de clicar em **Finalizar**.

Ao sair do assistente com alterações não salvas, a Kinbox pergunta `"Você tem mudanças não salvas, tem certeza que deseja sair?"`.

## Participantes

| Opção | Negociações que contam (pelo responsável atual) |
| --- | --- |
| **Todos** | Todas as negociações que passam nas regras da meta, inclusive as sem responsável. |
| **Membros específicos** | Só as negociações cujo responsável está em **Membros**. Com **Membros** vazio, contam as de todos. |
| **Grupo** | Só as negociações cujo responsável é membro de um grupo escolhido e que estão nesse grupo. Com **Grupos** vazio, contam as negociações cujo responsável é membro de qualquer grupo do workspace. |

## Milestones

- O botão **+ Milestone** fica desativado enquanto o valor alvo não estiver preenchido.
- Cada milestone novo vem com o nome `"Milestone #N"` e metade do valor alvo.
- Campos: **🚩 Tipo** (**Global**, **Para um membro específico**, **Individual para todos os membros**, **Para um grupo específico**), **Membro** ou **Grupo** quando o tipo pede, **Nome** e **Valor** (ou **Quantidade**), com controle deslizante.
- **Valor** vai de 1 até o valor alvo.
- Mensagens: `"Digite um milestone."` (campo do milestone vazio), `"Selecione um membro."`, `"Selecione um grupo."`.
- Não há aviso nem marca de "atingido" quando um milestone é alcançado.

## Meta atual

O ícone **Meta atual** no topo da tela aparece só quando há meta em andamento (entre o início e o fim do período) que inclui você:

- você criou a meta; ou
- a meta é de **Todos**; ou
- a meta é de **Membros específicos** e você está em **Membros** (ou o campo ficou vazio); ou
- a meta é de **Grupo** e você é membro de um dos grupos escolhidos (ou o campo **Grupos** ficou vazio e você é membro de algum grupo).

O ícone abre a meta numa gaveta, sem o menu **⋯**. Com mais de uma meta, o botão `"Mostrar outra meta que está ativa"` alterna entre elas.

## Tela da meta

- Topo: **←** **Metas**, nome da meta (clique para renomear), **Ver Analítico** e **⋯** (**Editar**, **Modo tela cheia**, **Excluir**).
- **Modo tela cheia:** ocupa a tela inteira, para TV ou reunião. Clique de novo em **Modo tela cheia** ou pressione `Esc` para sair.
- **Atualização:** com a aba aberta, os números atualizam sozinhos a cada 5 minutos. Quando entra uma nova negociação ganha, a tela comemora com confete e som e mostra `"Nova negociação ganha!"` (ou `"{{count}} novos negócios ganhos!"`).
- **Analítico:** clicar num participante na aba **Ranking** ou num grupo na aba **Grupos** abre a gaveta filtrada, com o título **Negócios de** e o nome.

## Editar e excluir

- **Editar:** **⋯** → **Editar** abre a gaveta **Editar Meta** com o mesmo assistente; todos os campos podem mudar, inclusive tipo e período (no passo do período aparecem **De** e **Até**; confira as datas antes de salvar). Confirmação: `"Meta atualizada"`.
- **Excluir:** na lista de **Metas**, **⋯** → **Excluir** abre `"Por favor, confirme"` com `"Tem certeza que deseja excluir essa meta? Essa operação não poderá ser desfeita."`; clique em **Excluir**. As negociações não são apagadas.

## Mensagens da tela

| Mensagem | O que significa |
| --- | --- |
| `"Obrigatório"` | **Nome** da meta vazio no passo 3. |
| `"Por favor escolha a data de início."` | **De** vazio no período **Personalizado**. |
| `"Por favor escolha a data de término."` | **Até** vazio no período **Personalizado**. |
| `"Digite um milestone."` | Campo de um milestone vazio. |
| `"Selecione um membro."` | Milestone **Para um membro específico** sem membro. |
| `"Selecione um grupo."` | Milestone **Para um grupo específico** sem grupo. |
| `"Você tem mudanças não salvas, tem certeza que deseja sair?"` | Saída do assistente com alterações não salvas. |
| `"Meta atualizada"` | Edição salva. |
| `"Você não tem permissão para acessar essa página"` | Seu papel não tem a permissão **Metas**. |
