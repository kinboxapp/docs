---
title: "Restrições de relatório: o que cada uma bloqueia, snapshots e limite de cards"
description: Regras exatas de acesso e exportação dos relatórios da Kinbox, como funcionam os snapshots de dashboard e os limites e tamanhos dos cartões.
keywords: [permissões de relatórios, gerenciar relatórios, restringir relatórios ao membro, restringir relatórios aos grupos do membro, não pode exportar relatórios, não pode criar ou excluir dashboard, exportar csv, exportar excel, snapshot, obter dados atualizados, atualizar dados, dashboard compartilhado, visível para, limite de cards, 100 relatórios, carrossel]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/roles/permissionSections.tsx
  - web:src/pages/reports/CustomDashboard/EditDashboard.tsx
  - web:src/pages/reports/CustomDashboard/dashboardLayoutLimits.ts
  - web:src/pages/reports/CustomDashboard/DashboardSnapshotSelect.tsx
  - api:src/modules/dashboards/dashboards.controller.ts
  - api:src/modules/dashboards/snapshots/snapshots.service.ts
  - api:src/modules/dashboards/snapshots/snapshot.consumer.ts
codigo:
  - web:src/pages/settings/roles/permissionSections.tsx
  - web:src/pages/reports/**
  - web:src/lib/export.helper.ts
  - api:src/modules/dashboards/**
verificado_em: 2026-11-26
---

Referência técnica complementar de [Exportar relatórios e quem pode ver cada um](/docs/relatorios/exportar-e-permissoes) e [Criar dashboards](/docs/relatorios/dashboard).

## Acesso e restrições de relatório

- **Permissão base:** **Gerenciar relatórios** ("Ver e gerar relatórios."), configurada no workspace (na tela, **ambiente**) em **Configurações** → **Ambiente** → **Permissões** → papel → seção **Relatórios** ([Configurar permissões dos usuários](/docs/configuracoes-no-workspace/configurar-permissoes-dos-usuarios) e [Referência de permissões](/docs/administracao/referencia-de-permissoes)). Sem ela, o item **Relatórios** não aparece no menu lateral.
- **Proprietário e papéis padrão:** o proprietário do workspace sempre vê todos os relatórios e não sofre restrições. **Administrador** e **Supervisor** já vêm com **Gerenciar relatórios**; **Atendente** não.
- **Condições extras por relatório:**
  - [**Dashboards**](/docs/relatorios/dashboard): cada dashboard define em **Visível para** para quem ele aparece (**Todos**, **Grupos** ou **Apenas para mim**); cartões de negociações exigem **Gerenciar negociações**.
  - [**Atendimento ao vivo**](/docs/relatorios/ao-vivo): o mapa e a fila seguem o **Acesso as Conversas** do papel.
  - [**Vendas ao vivo**](/docs/relatorios/ao-vivo): exige **Gerenciar negociações**.
  - [**Copiloto**](/docs/relatorios/copiloto): o item só aparece quando há pelo menos um recurso correspondente ligado em **Configurações** → **Automação** → **Copiloto** ([Analisar conversas com IA](/docs/copiloto/analises-de-ia)).
  - **Marketing** (**Meta Ads**, **Google Ads**, **Tracking**): exige o aplicativo correspondente ativo.

### O que cada restrição da seção Relatórios faz

| Restrição | Onde age e efeito |
| --- | --- |
| **Restringir relatórios ao membro** | Em [**Visão geral**](/docs/relatorios/visao-geral), [**Produtividade**](/docs/relatorios/produtividade), [**Atribuição**](/docs/relatorios/atribuicao), [**Interação**](/docs/relatorios/interacao), [**Avaliação**](/docs/relatorios/avaliacao), [**Copiloto**](/docs/relatorios/copiloto), listas **Ver sessões** e lista de sessões dos cartões **Pipeline Atendimento**: restringe às sessões em que o membro é o responsável (na **Avaliação**, às avaliações registradas para ele). Na [**Presença**](/docs/relatorios/presenca): mostra apenas a presença do próprio membro. |
| **Restringir relatórios aos grupos do membro** | Em **Visão geral**, **Produtividade**, **Atribuição**, **Interação**, **Avaliação**, **Copiloto**, listas **Ver sessões** e lista de sessões dos cartões **Pipeline Atendimento**: restringe às sessões dos grupos do membro (e no **Copiloto**, oculta as linhas **Sem atribuição** e **Sem grupo**). Se o membro não pertencer a nenhum grupo, esses relatórios não abrem e aparece um aviso de que ele não pertence a nenhum grupo. |
| **Não pode exportar relatórios** | Desativa o botão **Exportar** da lista de sessões (**Ver sessões**). |
| **Não pode criar ou excluir Dashboard** | Impede criar, clonar, editar (inclusive cartões e organização) e excluir dashboards. Os botões permanecem na tela e, ao tentar salvar ou excluir, aparece um aviso de que não tem permissão. Ainda permite ver os dashboards e acionar **Obter dados atualizados**. |

- **Exclusividade mútua:** **Restringir relatórios ao membro** e **Restringir relatórios aos grupos do membro** não podem ficar marcadas ao mesmo tempo (marcar uma desmarca a outra; as duas podem ficar desmarcadas).

## Exportar relatórios

- **Formatos:** **CSV (.csv)** e **Excel (.xlsx)** em todo o módulo, gerados no navegador. Sem PDF nem imagem. O nome do arquivo não inclui data.

| Onde | Caminho | Nome do arquivo | O que vai no arquivo |
| --- | --- | --- | --- |
| [**Produtividade**](/docs/relatorios/produtividade) | **...** → **Exportar** | `relatorio_produtividade` | Tabela do agrupamento atual (todas as linhas; busca por nome não filtra). |
| [**Atribuição**](/docs/relatorios/atribuicao) | **...** → **Exportar** | `relatorio_atribuicao` | Tabela do agrupamento atual (todas as linhas; busca por nome não filtra). |
| [**Interação**](/docs/relatorios/interacao) | **...** → **Exportar** | `relatorio_interacao` | Tabela do agrupamento atual (todas as linhas; busca por nome não filtra). |
| [**Presença**](/docs/relatorios/presenca) | **...** → **Exportar** | `relatorio_presenca` | Tabela do agrupamento atual (todas as linhas; busca por nome não filtra). |
| [**Avaliação**](/docs/relatorios/avaliacao) | **...** → **Exportar** | `relatorio_avaliacao` | Tabela do agrupamento atual (todas as linhas; busca por nome não filtra). |
| [**Copiloto**](/docs/relatorios/copiloto) (cada aba) | **...** → **Exportar** | `relatorio_qualidade`, `relatorio_sentimento`, `relatorio_intencoes`, `relatorio_lead_score`, `relatorio_atendimento_automatico` | Tabela agrupada da aba atual (cartões não entram; em **Atendimento automático**, não inclui **Reaberturas evitadas**). |
| Lista **Ver sessões** | **...** da lista → **Exportar** | `relatorio_sessoes` | Colunas selecionadas na lista para todas as sessões do filtro. Exportada em páginas (pode levar alguns instantes em períodos grandes; mostra `Exportando... N%`; erro: "Ocorreu um erro ao exportar os dados"). Desativado para quem tem **Não pode exportar relatórios**. |
| Lista **Ver presenças** | **...** da lista → **Exportar** | `relatorio_presencas` | Grade de horários × dias com online/offline. |
| [**Saldo**](/docs/relatorios/saldo) (extrato) | **...** → **Exportar extrato** | `relatorio_carteira` | Todos os débitos do período: ID, **Data**, Total, **Descrição**, **Carteira**, **Autor**. Mostra `Exportando... n%`; erro: "Ocorreu um erro ao exportar os dados". |
| [**Saldo**](/docs/relatorios/saldo) (serviços) | **...** → **Exportar serviços** | `relatorio_saldo_servicos` | Tabela de serviços: **Serviço**, **Categoria**, **Usos**, **Valor**, **% do total**, **Período anterior**. Respeita a categoria selecionada; busca por nome não filtra. |
| [**Ligações**](/docs/relatorios/ligacoes) | **...** → **Exportar** | `relatorio_ligacoes` | Todas as ligações do período e da origem escolhida: ID, **Destino**, **Status**, **Data**, **Minutos**, **Membro**, **ID da Conversa**, ID do contato, ID da sessão, **Iniciado por**, **Sentimento**, **Gravação** (link do áudio), **Resumo**. |

- **Sem exportar:** **Visão geral** (apenas via lista **Ver sessões**), **Atendimento ao vivo**, **Vendas ao vivo**, **Dashboards** e **Marketing**.

## Dashboards: regras, campos, modelos e limites

- **Abertura e atalho:** também acessível pela busca global com "Ir para Dashboards". Abre o último dashboard aberto naquele navegador ou o primeiro da lista visível; não existe dashboard padrão configurável. Quem tem **Gerenciar relatórios** pode escolher **Dashboard** como **Home** no papel ([Referência de permissões](/docs/administracao/referencia-de-permissoes)).
- **Visível para:** define para quem o dashboard aparece: **Todos** (padrão, todos com acesso a relatórios), **Grupos** (campo **Grupos**, seleção múltipla; vê quem está em um dos grupos) ou **Apenas para mim** (apenas o autor). O proprietário vê todos.
- **Individual × Compartilhado (**Período dos relatórios**):**
  - **Individual** (também vale quando o campo fica vazio na criação): cada cartão usa o próprio campo **Período**.
  - **Compartilhado:** o dashboard exibe um seletor de datas (`DD/MM/YYYY HH:mm`), padrão hoje de `00:00` a `23:59`, e o campo **Período** dos cartões mostra **Selecionado na dashboard**. Atalhos do seletor do dashboard compartilhado: **Última 1 hora**, **Últimas 3 horas**, **Últimas 6 horas**, **Últimos 7 dias**, **Últimos 15 dias**, **Ontem**, **Hoje**, **Essa semana**, **Esse mês**, **Mês passado**. O intervalo só entra em vigor quando um novo snapshot é gerado; depois aparece `Mostrando dados do snapshot do período <de> - <até>`.
- **Opções de Período do cartão** (dashboard **Individual**): **Hoje**, **Ontem**, **Essa semana**, **Esse mês**, **Mês passado**, **Última hora**, **Últimas 3 horas**, **Últimas 24 horas**, **Últimos 15 dias**, **Personalizado** (abre **Período personalizado**).
  - **Cartões de tarefas:** use apenas **Essa semana**, **Esse mês** ou **Personalizado**.

### Cartão Personalizado

- **Negócios:**
  - **Por propriedade:** **Data da criação**, **Ganho/perdido em**, **Previsão de fechamento**.
  - **Métrica:** **Por quantidade**, **Por valor**, **Tempo até ganhar ou perder o negócio** (com **Operação**: **Soma**, **Média**, **Mínimo**, **Máximo**, quando aplicável).
  - **Agrupar por:** **Sem agrupamento**, **Data de criação**, **Data de ganho/perdido**, **Funil**, **Etapa**, **Membro**, **Grupo**, **Produto**, **Tag**, **Motivo da perda**, **Status**, campos personalizados.
- **Sessões de conversa:**
  - **Por propriedade:** datas de criação e de resolução.
  - **Métrica:** **Por quantidade** e quantidade de mensagens.
  - **Agrupar por:** **Sem agrupamento**, **Data de criação**, **Data de resolução**, **Data de pendência**, **Membro**, **Grupo**, **Tag**, **Canal**, campos personalizados.
- **Tarefas:**
  - Somente **Por quantidade**; nome fixo **Tarefas**; sem agrupamento; visualização **Métrica única**; filtro **Atribuído a** no lugar de **Condições**.
- **Visualização:** **Métrica única** (só com **Sem agrupamento**); **Barras**, **Rankings**, **Pizza**, **Linha** (só com agrupamento).

### Campos próprios dos outros modelos de cartão

- **Entram direto sem formulário:** **Ciclo médio de vendas**, **Pipeline Atendimento** (5 cartões: **Não atribuído**, **Em espera**, **Em atendimento**, **Pendente**, **Atribuído**), **Melhor horário de resposta**, **Tarefas** (3 cartões: **A fazer**, **Completas**, **Atrasadas**).
- **Funil de vendas** e **Conversão de leads:** **Funil de vendas** (obrigatório) e **O que é o lead?**.
- **Progressão do funil:** **Modo de análise** (**Negócios criados no período** / **Movimentações realizadas no período**) e **Funil de vendas**.
- **Taxa de recompra:** **Janela** (30, 60 ou 90 dias), **Escopo do funil** (**Qualquer funil** / **Mesmo funil**), **Funis**, **Amostra mínima**.
- **Necessidade de leads** e **Meta x Realizado:** **Meta** (obrigatória; depende de meta cadastrada no workspace) e, opcionalmente, **Responsáveis** e **Grupos**.
- **Carrossel:** reúne 2 ou mais relatórios compatíveis do dashboard (métrica única não entra). Campos: **Nome do gráfico** (até 100 caracteres), **Ciclo automático** com **Duração** e **Unidade** (**Segundos**, **Minutos**, **Horas**). Aviso com menos de dois itens: "Selecione pelo menos dois relatórios compatíveis." Excluir o carrossel devolve os relatórios filhos à grade.

### Limite de cartões e tamanhos na grade

- **Limite:** até **100 relatórios** por dashboard ("Não é possível adicionar mais de 100 relatórios em uma mesma dashboard.").
- **Grade:** 4 colunas. Tamanhos por tipo de cartão (colunas × linhas):

| Tipo de cartão | Mínimo | Máximo | Padrão |
| --- | --- | --- | --- |
| Métrica única | 1×1 | 2×2 | 1×1 |
| Gráfico padrão (**Barras**, **Rankings**, **Pizza**, **Linha**) | 2×3 | 4×5 | 4×4 |
| **Ciclo médio de vendas** | 1×2 | 1×2 | 1×2 |
| **Tarefas** (KPIs) | 3×2 | 4×2 | 4×2 |
| **Pipeline Atendimento** | 4×2 | 4×2 | 4×2 |
| **Conversão de leads** / **Funil de vendas** | 2×3 | 4×6 | 2×4 |
| **Melhor horário de resposta** / **Calendário de tarefas** | 4×4 | 4×6 | 4×4 |
| **Progressão do funil** | 4×5 | 4×7 | 4×6 |
| **Necessidade de leads** / **Meta x Realizado** / **Taxa de recompra** | 2×2 | 4×3 | 2×2 |
| **Feed operacional** | 2×3 | 4×6 | 2×4 |
| **Carrossel** | 4×4 | 4×6 | 4×4 |

### Cartões que pedem outras permissões

- **Negociações** (fonte **Negócios**, **Conversão de leads**, **Funil de vendas**, **Progressão do funil**, **Ciclo médio de vendas**, **Taxa de recompra**, **Necessidade de leads**, **Meta x Realizado**): exigem **Gerenciar negociações** e seguem o escopo de negociações do papel. Sem ela, o cartão mostra **Sem permissão** ("Você não tem permissão para visualizar dados de negociações.").
- **Tarefas** e **Calendário de tarefas:** quem não pode ver tarefas de outros membros vê apenas as próprias tarefas.
- **Pipeline Atendimento:** ao clicar em um número, a lista de sessões aplica **Restringir relatórios ao membro** e **Restringir relatórios aos grupos do membro**.

## Snapshots de dashboard

- **Definição:** foto dos dados de todos os cartões do dashboard calculada em um momento. Os cartões exibem o snapshot selecionado, não dados ao vivo.
- **Exceção:** cartões **Tarefas** (e **Calendário de tarefas** para quem só vê as próprias tarefas) consultam os dados na hora.
- **Como gerar:** somente manualmente via **Obter dados atualizados** (confirmando em **Atualizar dados**) ou **Tentar novamente** em caso de falha. Sem cartões, avisa: "Adicione pelo menos um relatório para atualizar dados."
- **Processamento:** roda em segundo plano, em fila, um snapshot por vez, sem prazo fixo (a tela avisa que pode levar vários minutos, dependendo do tamanho do dashboard). Enquanto processa, os cartões ficam carregando e o seletor exibe um ícone girando; a tela verifica o andamento sozinha a cada 5 segundos.
- **Conclusão e falha:** ao terminar, chega uma notificação no sino com link para o snapshot. Em caso de falha, não há notificação e cada cartão mostra "O snapshot selecionado falhou ao processar os dados deste dashboard." com **Tentar novamente** (gera um novo snapshot). Cartão sem dados mostra **Sem dados** ("Não há dados para este card no snapshot selecionado.").
- **Seletor Snapshots:** itens no formato `DD/MM/YYYY HH:mm by <nome>`, ordenados do mais recente para o mais antigo, com busca e 30 por página. Ao abrir o dashboard, carrega sempre o snapshot mais recente (sem nenhum, exibe `⚠️ Selecione um snapshot...` e os cartões ficam carregando). Se os snapshots anteriores aparecerem desativados no seletor, peça ao administrador a permissão **Atribuir** no seu papel.
- **Retenção e atualização:** não há expiração, não há como excluir um snapshot pela tela e não há atualização automática nem agendada.

## Notas adicionais do Copiloto

- **Cache:** no [Relatório do copiloto](/docs/relatorios/copiloto), períodos que já terminaram ficam guardados até a meia-noite (análises que chegam depois podem aparecer só no dia seguinte); períodos que incluem hoje atualizam em até 5 minutos.
- **Intenções:** entram na aba **Intenções** apenas as sessões em que a intenção foi identificada.

## O que não existe

- **Dashboards:** não há exportar dashboard, PDF, imagem, tela cheia/modo TV, link de compartilhamento próprio, atualização automática/agendada, exclusão de snapshots nem filtros globais para o dashboard inteiro (filtros são por cartão).
- **Relatórios em geral:** não há exportação em PDF ou imagem, e os nomes dos arquivos exportados não trazem data.
