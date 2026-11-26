---
title: "Negociações e funis: permissões, regras de etapa, mensagens e limites"
description: Regras detalhadas do quadro do funil e das negociações na Kinbox — permissões e restrições, visibilidade do funil, ordem das conferências ao mudar de etapa, mensagens de erro, filtros, exportação, limites e configuração do funil.
keywords: [permissões de negociações, restrições de negociação, não pode voltar para etapa anterior, tarefas obrigatórias pendentes, campos obrigatórios, não consigo mover negociação, você não tem permissão para acessar esse funil, máximo de negociações abertas, exportar negociações colunas, filtros do funil, visibilidade do funil, excluir funil com negociações, etapa excluída]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/crm/deals/*.tsx
  - web:src/pages/crm/deals/*.ts
  - web:src/pages/crm/deals/AddDeal/**
  - web:src/pages/crm/deals/ViewDeal/**
  - web:src/components-old/forms/FiltersInput/deal.filter.tsx
  - web:src/pages/settings/pipelines/wizard/usePipelineWizardController.ts
  - api:src/modules/deals/**
  - api:src/modules/pipelines/**
codigo:
  - web:src/pages/crm/deals/*.tsx
  - web:src/pages/crm/deals/*.ts
  - web:src/pages/crm/deals/DealsActions/**
  - web:src/pages/crm/deals/AddDeal/**
  - web:src/pages/crm/deals/ViewDeal/**
  - web:src/components-old/forms/FiltersInput/deal.filter.tsx
  - web:src/pages/settings/pipelines/wizard/**
  - api:src/modules/deals/**
  - api:src/modules/pipelines/**
verificado_em: 2026-11-26
---

Detalhes de referência de [Trabalhar com negociações no funil](/docs/crm/gerenciando-funil-de-vendas). Veja também [Funis e negociações: visão geral](/docs/crm/visao-geral), [Criar um funil e as etapas](/docs/crm/criar-funil-de-vendas), [Ações em lote no funil](/docs/crm/acoes-em-lote) e [Motivos de perda, campos obrigatórios e regras do funil](/docs/crm/motivos-de-perda-e-regras).

## Permissões e restrições

Configuradas nos papéis do workspace em **Configurações** → **Ambiente** → **Permissões** (veja [Referência de permissões](/docs/administracao/referencia-de-permissoes) e [Criar papéis e permissões](/docs/configuracoes-no-workspace/configurar-permissoes-dos-usuarios)). O **proprietário** do workspace tem todas as permissões e nunca sofre restrições.

| Permissão ou restrição | Seção | Efeito |
| --- | --- | --- |
| **Gerenciar negociações** | **Negociações** | Libera o menu **Funis** e permite criar, importar, editar e excluir negociações. |
| **Não pode ver negociações atribuídas a outros.** | **Negociações** | Oculta negociações atribuídas a outro membro. |
| **Não pode ver negociações sem atribuição** | **Negociações** | Oculta negociações sem responsável. Combinada com a anterior, o membro vê apenas as atribuídas a ele. |
| **Não pode ver negociações de grupos que não pertence** | **Negociações** | Oculta negociações em grupos dos quais o membro não participa. |
| **Não pode ver negociações sem grupo** | **Negociações** | Oculta negociações sem grupo. |
| **Não pode excluir negociação** | **Negociações** | Impede excluir negociações. |
| **Não pode exportar negociações** | **Negociações** | Impede exportar as negociações do funil. |
| **Não pode voltar para etapa anterior** | **Negociações** | Bloqueia mover a negociação para uma etapa anterior no funil. |
| **Não pode criar negócio se já contato tiver um negócio aberto** | **Negociações** | Bloqueia criar nova negociação quando o contato já tem qualquer negociação aberta (em qualquer funil). |
| **Não pode criar negócio se já contato tiver negócio aberto para outro agente** | **Negociações** | Permite criar várias negociações abertas para o mesmo contato atribuídas ao próprio membro (ou sem responsável), mas bloqueia se existir negociação aberta atribuída a outro membro. |
| **Pode gerenciar as negociações da conversa.** | **Negociações** | Exibe a seção **Negociações** na aba **Detalhes** da conversa (lista as negociações do contato). Criar e editar a partir dali exige também **Gerenciar negociações**. |
| **Funis** | **Gerenciamento do Ambiente** | Libera **Configurações** → **CRM** → **Funis** e os atalhos **+** / **Criar Funil** para criar, editar e excluir funis. |
| **Produtos** | **Gerenciamento do Ambiente** | Libera **Configurações** → **CRM** → **Produtos** para gerenciar produtos. |
| **Atribuir** / **Somente pode atribuir para quem pertence ao grupo do membro** | **Conversas** | Controlam a alteração de **Responsável** da negociação (sem **Atribuir**, os itens ficam desabilitados; com a restrição, aparecem apenas membros dos mesmos grupos). |
| **Somente pode mover para grupo que pertence** | **Conversas** | Restringe a lista **Mover para grupo** aos grupos do membro. |
| Permissões de contato no painel **Contato** da negociação | **Contatos** / **Conversas** | **Esconder informações do contato** oculta o painel **Contato**; **Esconder telefone** oculta **Celular**; **Proibir alterar celular** deixa **Celular** somente leitura; sem **Alterar propriedades do contato**, os campos não são editáveis; sem **Ver telefone de contatos privados**, o telefone do contato privado aparece mascarado (`*******`). |

Regra de visibilidade: uma negociação **atribuída ao próprio membro** sempre aparece para ele, mesmo quando o papel possui restrições de grupo.

## Visibilidade do funil

Cada funil possui a configuração **Visível para** (definida em **Configurações** → **CRM** → **Funis**):

- **Todos** (padrão): todos os membros com acesso a funis.
- **Grupos**: apenas membros pertencentes a algum dos grupos selecionados.
- **Apenas para mim**: apenas quem criou o funil (editar o funil não altera o autor). Funis antigos sem autor registrado aparecem para todos.
- O proprietário vê todos os funis.

Quem não tem visibilidade sobre um funil também não vê as negociações dele (nem na tela **Funis** nem na lista de configuração).

Mensagens de acesso negado:
- Link de funil sem acesso ou inexistente: `"Você não tem permissão para acessar esse funil"` (redireciona para o último funil usado ou o primeiro da lista).
- Link de negociação de um funil sem acesso: `"Você não tem permissão para acessar o funil desse negócio"`.

## Mudar de etapa

Ao mudar a etapa de uma negociação, a Kinbox verifica, nesta ordem:

1. **Restrição de voltar etapa (**Não pode voltar para etapa anterior**):** bloqueia mover para etapa anterior (ou mesma posição), exibindo `"Você não tem permissão para retornar a uma etapa anterior. Chame seu gestor para essa ação."`.
2. **Tarefa obrigatória pendente:** verifica **todas** as tarefas obrigatórias não concluídas e não canceladas da negociação (não apenas as da etapa atual). Se houver alguma, exibe `"Você tem tarefas obrigatórias pendentes, não é possível mudar estágio."` e destaca a tarefa. Tarefa cancelada não trava.
3. **Campos obrigatórios da etapa atual (para sair dela):** verificados em qualquer direção (para a frente ou para trás); os campos obrigatórios da etapa de destino não são conferidos na entrada. **Valor do negócio** exige valor maior que zero; campo personalizado não pode estar vazio. Se faltar algum, exibe `"Preencha todos os campos obrigatórios antes de mover o negócio para a próxima etapa."` e destaca os campos.

Comportamentos adicionais:
- Negociações **ganhas** ou **perdidas** podem mudar de etapa normalmente e continuam ganhas ou perdidas (para reabrir, use **Retomar negociação** / **Retomar ticket**).
- Soltar o cartão na mesma coluna ou fora de uma coluna não faz nada (não existe reordenação manual dentro da coluna).
- Negociação que não existe mais ao arrastar: `"Não foi possível mudar de etapa pois o negócio não existe mais."`.
- Ao mudar de etapa, a Kinbox grava o tempo decorrido na etapa anterior (usado em **Tempo na etapa**) e dispara a cadência da nova etapa (veja [Cadências: tarefas automáticas por etapa](/docs/crm/cadencias)).
- Ao trocar a negociação para um **Funil Operacional** em **Editar etapa e funil**, valor e produtos são zerados e ela recebe um número de ticket.

## Criar negociação

Locais que abrem **Nova negociação** / **Novo ticket**: botão **+** no cabeçalho ou no pé da coluna no quadro, seção **Negociações** no painel **Detalhes** da conversa, **Nova negociação** no perfil do contato, **Negociação** / **Nova negociação** no perfil da organização e o comando **Adicionar Negócio** na busca global.

- **Campos obrigatórios:** **Nome da negociação** (ou **Título do ticket**), **Funil**, **Etapa** e **Contato**.
- **Nome sugerido:** no **Funil Comercial**, enquanto o nome não é editado, a Kinbox preenche `"Negócio de {{name}}"` com o contato ou organização escolhido; vindo da conversa, preenche com o nome do contato.
- **Busca de contato:** exige mínimo de 3 letras (`"Digite ao menos 3 letras para buscar"`) ou 5 dígitos (`"Digite ao menos 5 números para buscar pelo telefone"`), mostrando até 8 contatos. Sem contato selecionado: `"Selecione ou crie um contato."`. Criar contato novo na janela exige **Gerenciar Contatos**; criar organização nova ou marcar **Vincular o contato a esta organização também** exige **Gerenciar Organizações**.
- **Responsável padrão:** se ficar vazio, a negociação fica atribuída a quem criou. O **Grupo** inicial é preenchido automaticamente apenas se o funil tiver a regra **Ao criar negócio também mover para algum grupo do responsável.**.
- **Número do ticket (Funil Operacional):** gerado no formato `<3 primeiras letras do funil>-<sequência>` (por exemplo, `POS-1`; se o nome do funil não tiver letras, usa `KIN-`), com contagem própria por funil.
- **Sucesso:** `"Negociação criada."` / `"Ticket criado."`.

Mensagens de bloqueio na criação:
- Restrição **Não pode criar negócio se já contato tiver um negócio aberto**: `"Você não pode criar um negócio se já tiver um negócio aberto para o mesmo contato."`.
- Restrição **Não pode criar negócio se já contato tiver negócio aberto para outro agente**: `"Você não pode criar um negócio pois este contato já possui um negócio aberto atribuído a outro agente."`.
- Regra do funil **Máximo de negócios abertos por contato**: `"Você já tem um máximo de {{max}} negociações abertas com esse contato."`. Conta apenas negociações **abertas** desse contato **neste funil** (ganhas, perdidas e de outros funis não contam), é conferida na criação e não se aplica quando o contato é criado junto com a negociação.

## Ganhar, perder, retomar e excluir

- **Produtos na negociação:** disponíveis apenas no **Funil Comercial** (**Adicionar produtos a negociação**). Quantidade mínima 1; desconto em `%` ou valor; total da linha = preço × quantidade menos o desconto aplicado; o **Total** geral vira o valor da negociação. Produtos inativos não aparecem para novas inclusões e são mostrados com `(Inativo)` se já estavam na negociação.
- **Ganhar (✓):**
  - Confere os **Campos obrigatórios para ganhar negócio** do funil (**Valor do negócio** > 0, **Produto** >= 1, campos personalizados não vazios). No **Funil Operacional**, confere **Campos obrigatórios para encerrar atendimento** (campos personalizados) apenas ao **Marcar como resolvido**. Se faltar algum campo, exibe `"Necessário preencher o campo ... para ganhar esse negócio."` (ou `"...para resolver esse ticket."`) e destaca o campo.
  - Ao ganhar, a Kinbox verifica apenas os campos obrigatórios configurados no funil (e não tarefas obrigatórias nem campos obrigatórios da etapa).
  - No **Funil Comercial**, marca como ganha imediatamente sem pedir motivo. No **Funil Operacional**, abre **Ticket resolvido** com **Motivo** obrigatório (**Resolvido** pré-marcado se constar na lista) e **Detalhes** opcional.
- **Perder (✕):** abre **Perda de negócio** (operacional: **Ticket não resolvido**) com **Motivo** obrigatório (múltipla escolha) e **Detalhes** opcional. Com a regra **Usar motivo de perda por produto.** e produtos na negociação, pede **Motivo** e **Detalhes** por produto.
- **Movimentação automática:** com as regras **Mover negócio para estágio específico ao ganhar** ou **...ao perder** (e equivalentes operacionais), a negociação vai para a etapa configurada no momento do encerramento.
- **Retomar:** **Retomar negociação** / **Retomar ticket** volta o status para **Aberto** na mesma etapa sem confirmação e apaga a data de ganho/perda (os motivos gravados anteriormente permanecem no registro).
- **Excluir:** menu **⋯** → **Excluir**. Com **Não pode excluir negociação**, exibe `"Você não tem permissão para excluir negociações"` (ou `"...excluir tickets"`). Sem a restrição, pede confirmação (`"Tem certeza que deseja excluir essa negociação?"` / `"...esse ticket?"`) e apaga definitivamente a negociação, comentários, histórico e tarefas ligadas (sem lixeira). Contato, organização e conversa permanecem.

### Diagnóstico rápido de mensagens

| Mensagem ou sintoma | Causa |
| --- | --- |
| `"Você não tem permissão para retornar a uma etapa anterior. Chame seu gestor para essa ação."` | Papel tem a restrição **Não pode voltar para etapa anterior**. |
| `"Você tem tarefas obrigatórias pendentes, não é possível mudar estágio."` | Existe tarefa obrigatória aberta na negociação (conclua ou cancele). |
| `"Preencha todos os campos obrigatórios antes de mover o negócio para a próxima etapa."` | Falta preencher um campo obrigatório da etapa **atual**. |
| `"Necessário preencher o campo ... para ganhar esse negócio."` | Falta preencher um item de **Campos obrigatórios para ganhar negócio** do funil. |
| `"Você já tem um máximo de ... negociações abertas com esse contato."` | Contato atingiu o limite da regra **Máximo de negócios abertos por contato** neste funil. |
| `"Você não pode criar um negócio..."` | Papel tem uma das restrições de criação para contato com negociação aberta. |
| `"Você não tem permissão para excluir negociações"` | Papel tem a restrição **Não pode excluir negociação**. |
| Lista de **Responsável** no cabeçalho aparece desabilitada | Papel não tem a permissão **Atribuir**. |

## Pesquisa e filtros

- **Pesquisar** (aplicada com `Enter`): busca sem diferenciar maiúsculas em **nome da negociação**, **nome do contato**, **telefone do contato** e, no formato `#<ID>`, no **ID do contato**. **Não** busca por e-mail do contato, organização, ID do ticket, produto, tag nem campos personalizados.
- **Filtros do menu Filtrar, nesta ordem:** **Status** (**Ganho**, **Perdido**, **Em andamento**), **Valor**, **Atribuído**, **Grupo** (inclui negociações sem grupo), **Organização**, **Produto**, **Tag**, **Motivo de perda** (do funil aberto), **Outros** (**Tem comentários**, **Associado a uma conversa**, **Conversa pendente**, **Criado por Meta Ads**, **Criado por Google Ads**), as datas (**Criado em**, **Ganho/perdido em**, **Previsão de fechamento**, **Última mudança de etapa**), **Campos customizados** e, por último, **Etapa** (do funil aberto). **Salvar segmento** guarda a combinação em **Filtros salvos** (visível para **Todos**, **Grupos** ou **Apenas para mim**); **Limpar filtros** remove todos.
- **Operadores de filtro:**
  - Listas (**Status**, **Atribuído**, **Grupo**, **Produto**, **Tag**, **Motivo de perda**, **Outros**, **Etapa**): "é igual a" / "não é igual a" (com múltiplos valores: "é qualquer um dentre" / "é nenhum dentre").
  - **Valor:** além dos operadores de igualdade, aceita "é maior que", "é menor que", "é vazio" e "não é vazio".
  - **Organização:** aceita também "é vazio" e "não é vazio" (busca retorna até 20 organizações por consulta).
  - **Datas** (**Criado em**, **Ganho/perdido em**, **Previsão de fechamento**, **Última mudança de etapa**): "depois de" / "antes de", com atalhos de 1 dia atrás até 6 meses atrás e **Personalizado...** (data e hora). **Ganho/perdido em** retorna apenas negociações ganhas ou perdidas.
  - **Campos customizados:** todos os campos personalizados de negociação, exceto os do tipo JSON.
- Com 2 ou mais filtros, clique em **todos** para alternar entre exigir **todos** ou **qualquer** dos filtros.
- **Analítico:** usa o funil aberto e os filtros, pesquisa e período do quadro; período próprio pela data de criação (**Hoje**, **Essa semana**, **Esse mês**, **Mês passado**, **Últimos 3 meses**, **Esse ano**, **Ano passado**, **Última hora**, últimas 3 horas e **Últimas 24 horas**); **Métrica** (**Por quantidade**, **Por valor**, **Tempo até ganhar ou perder o negócio**); **Agrupamento** (**Data de criação**, **Data de ganho/perdido**, **Funil**, **Etapa**, **Membro**, **Grupo**, **Produto**, **Tag**, **Motivo da perda**, **Status**, **Campos personalizados**); **Visualização** (**Linha**, **Pizza**, **Ranking**, **Barra**); totais **Total**, **Valor total** e **Ticket médio** (desconsidera negociações sem preço).

## O que fica guardado no navegador

- **Fica salvo neste navegador:** último funil aberto, período do fluxo, ordenação escolhida e campos marcados em **Mostrar campos...** (esta escolha vale para todos os funis).
- **É limpo ao recarregar a página:** texto da pesquisa, filtros aplicados e **Atualizar a cada 30s** (volta a desligado).

## Período e ordenação

- **Período do fluxo:** padrão **Fluxo geral** (mostra todas as negociações). Nas demais opções (**Fluxo do mês**, **Fluxo do mês passado**, **Fluxo de 3 meses passados**, **Fluxo de 6 meses passados** e **Fluxo de 12 meses passados**), o quadro exibe sempre todas as negociações em aberto e filtra as ganhas e perdidas pela data de fechamento no fuso do workspace.
- **Ordenação:** padrão **Mais recentes** (criação); inclui **Mais antigos**, **Maior valor**, **Menor valor**, **Mensagem mais recente**, **Mensagem mais antiga**, **Pendência mais antiga** e **Pendência mais recente**. As duas opções de pendência filtram o quadro para exibir **apenas negociações com conversa pendente**.

## Menu ⋯ do quadro

- **Itens:** **Executar ação...**, **Atualizar a cada 30s** (vira **Parar de atualizar a cada 30s**), **Mostrar campos...** (exibe **ID do contato** e campos personalizados de negociação nos cartões; vale para todos os funis), **Exportar** e **Importar**. Aparece só no computador, com um funil aberto.

## Exportação

- **Restrição:** indisponível para quem tem **Não pode exportar negociações**.
- **Escopo e formato:** exporta todas as negociações do funil aberto (todas as etapas) que passam pela pesquisa, filtros, período e restrições de visibilidade, na ordenação atual. Sem limite de linhas (busca de 400 em 400, com pausa de 1 s entre lotes). Formatos: **CSV** (UTF-8 com BOM, separado por vírgula, todos os campos entre aspas) e Excel `.xlsx` (aba única `Sheet 1`).
- **Arquivos:** `relatorio_negocios.csv` / `relatorio_negocios.xlsx` (comercial) e `relatorio_tickets.csv` / `relatorio_tickets.xlsx` (operacional). Erro: `"Ocorreu um erro ao exportar os dados"`.
- **Colunas do Funil Comercial:** ID, Nome da negociação, Status (`Aberto`, `Vendido`, `Perdido`), Criado por, Criado em, Vendido/Perdido em, Previsão de fechamento, Responsável, Produtos (`nome (preço x quantidade)`), Grupo, Valor, Funil, Etapa, Tempo na etapa (`N dias`), Tags, Motivo da perda, Observação da perda, Nome do contato, E-mail do contato, Telefone do contato, Criação do contato, Organização, Link da conversa relacionada — seguidas de uma coluna por campo personalizado de negociação.
- **Colunas do Funil Operacional:** ID, ID do ticket, Título do ticket, Status (`Aberto`, `Resolvido`, `Não resolvido`), Descrição, Prazo de SLA, Criado por, Criado em, Concluído/Não resolvido em, Responsável, Grupo, Funil, Etapa, Tempo na etapa, Tags, Motivo de não resolução, Observação de não resolução, Nome do contato, E-mail do contato, Telefone do contato, Criação do contato, Organização, Link da conversa relacionada — seguidas pelos campos personalizados.
- **Formatação e o que não sai:** datas em `DD/MM/AAAA HH:mm:ss`; tags e motivos separados por vírgula. Não inclui tarefas, comentários, histórico nem a seleção de **Mostrar campos...**.

## Limites

- **Cartões por etapa:** carrega **8** cartões inicialmente e mais **10** a cada rolagem até o fim da coluna (sem limite máximo por coluna).
- **Atualização automática:** recarrega todas as colunas a cada **30 segundos** a partir dos primeiros cartões (`"Negócios serão atualizados a cada 30s"` / `"Negócios não serão atualizados a cada 30s"`).
- **Lista de funis à esquerda:** nomes exibidos com corte em **18 caracteres**.
- **Exportação:** lotes de **400** registros por requisição (pausa de 1 s), sem teto total.
- **Listas internas:** **Histórico** da negociação, **Associar conversa** e seção **Negociações** na conversa carregam **20** itens por vez; busca do filtro **Organização** retorna até **20** resultados.
- **Celular:** no navegador do celular, a barra superior (**Pesquisar**, **Filtrar**, período, ordenação, **Analítico** e menu **⋯**) não é exibida.

## Configuração do funil

- **Passos do assistente (comercial / operacional):** 1. **Como você quer criar seu funil?** (só na criação); 2. **Comece com nome e visibilidade**; 3. **Configure as etapas do funil** / **Configure as etapas operacionais**; 4. **Cadência** / **Cadência operacional**; 5. **Motivos e regras** / **Encerramento e regras**; 6. **Revise o funil antes de salvar**; 7. **Importe suas negociações** / **Importe seus tickets** (só na criação e com **Gerenciar negociações**).
- **Tipo do funil:** não pode ser alterado após a criação. Durante a criação, voltar ao passo 1 e trocar o tipo repõe os motivos padrão e descarta os motivos editados.
- **Etapas:** mínimo de 1 etapa (`"Configure pelo menos uma etapa para salvar o funil."`), sem limite máximo. Renomear ou reordenar etapas mantém as negociações intactas; excluir uma etapa não apaga as negociações, mas elas deixam de aparecer nas colunas do quadro.
- **Excluir funil:** bloqueado se existir qualquer negociação (aberta, ganha ou perdida) no funil, com `"Não pode deletar funil enquanto tiver negociações associadas a ele."`. A exclusão é definitiva (sem lixeira).
- **Outras mensagens do assistente:** `"Obrigatório"` (nome do funil), `"Obrigatório."` (nome da etapa), **Fechar sem salvar?** / `"As alterações feitas neste funil serão perdidas."`, `"Existem alterações não salvas neste funil. Deseja sair?"`, `"Funil criado."`, `"Funil salvo."`, `"Salve o funil antes de importar."` e `"Salve o funil antes de baixar o modelo."`.
- **Motivos e regras:** remover um motivo não altera negociações já encerradas. Evite cadastrar a mesma regra duas vezes (nas regras de mover etapa e de mostrar campos selecionados, vale a primeira da lista).

## Ações em lote

- **Permissões:** exige **Gerenciar negociações**. As ações seguem as permissões e restrições do papel (veja [Referência de permissões](/docs/administracao/referencia-de-permissoes)).
- **Processamento:** sem limite de quantidade; busca as negociações em blocos de 400 (pausa de 1 s) e aplica a ação uma por vez.
- **Contagem final:** o total exibido na mensagem de conclusão reflete o total de negociações encontradas pelos filtros (incluindo itens pulados). Em **Associar conversas**, exibe `"{{associated}} negociações associadas. {{skipped}} ignoradas."`.
- **Interrupção:** clicar em **Abortar** encerra após a negociação em andamento (`"Ação cancelada durante execução"`). Alterações já aplicadas permanecem; em **Gerar relatório com dados de contato**, nenhum arquivo é baixado se a ação for abortada.
- **Gerar relatório com dados de contato:** consulta cada contato (pausa de 0,4 s por contato), baixa o arquivo `relatorio_negocios` diretamente no navegador (`"{{total}} negociações foram exportadas."`) e traz, por negociação, os dados da negociação, os campos personalizados de negociação e os dados atuais do contato: **Nome do contato**, **E-mail do contato**, **Telefone do contato**, **Criação do contato**, **Contato criado por**, os campos personalizados do contato com o sufixo `(contato)` (ou `(campo-contato)` para campos chamados Nome, Membro, Criado em, E-mail ou Celular), **Facebook do contato**, **Instagram do contato**, **Telegram do contato**, **ID Externo do contato** e **Notas do contato**.
