---
title: "Relatórios em detalhe: restrições, exportação, dashboards, saldo, ligações e copiloto"
description: Regras exatas de acesso e exportação dos relatórios da Kinbox, snapshots e cartões de dashboard, categorias e registros do relatório Saldo, status do relatório Ligações e regras do relatório do Copiloto.
keywords: [permissões de relatórios, gerenciar relatórios, restringir relatórios ao membro, restringir relatórios aos grupos do membro, não pode exportar relatórios, não pode criar ou excluir dashboard, exportar csv, exportar excel, snapshot, obter dados atualizados, atualizar dados, dashboard compartilhado, visível para, limite de cards, 100 relatórios, carrossel, saldo, categorias do saldo, voip em outros, usos e registros, ligações, status das ligações, não atendeu, relatório do copiloto, faixas de nota, recuperadas, pioraram, período máximo de 1 ano]
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
  - web:src/pages/reports/WalletUsage/wallet-usage.helper.ts
  - web:src/pages/reports/ReportVoip/index.tsx
  - web:src/pages/reports/ReportCopilot/QualityReport.tsx
  - api:src/modules/wallet/micro-debit.service.ts
  - api:src/modules/reports/session-summary/session-summary.service.ts
codigo:
  - web:src/pages/settings/roles/permissionSections.tsx
  - web:src/pages/reports/**
  - web:src/lib/export.helper.ts
  - api:src/modules/dashboards/**
  - api:src/modules/wallet/**
  - api:src/modules/voip/**
  - api:src/modules/reports/session-summary/**
verificado_em: 2026-11-26
---

Referência técnica complementar de [Exportar relatórios e quem pode ver cada um](/docs/relatorios/exportar-e-permissoes), [Criar dashboards](/docs/relatorios/dashboard), [Relatório de saldo](/docs/relatorios/saldo), [Relatório de ligações](/docs/relatorios/ligacoes) e [Relatório do copiloto](/docs/relatorios/copiloto).

## Acesso e restrições de relatório

- **Permissão base:** **Gerenciar relatórios** ("Ver e gerar relatórios."), configurada no workspace (na tela, **ambiente**) em **Configurações** → **Ambiente** → **Permissões** → papel → seção **Relatórios** ([Criar papéis e permissões](/docs/configuracoes-no-workspace/configurar-permissoes-dos-usuarios) e [Referência de permissões](/docs/administracao/referencia-de-permissoes)). Sem ela, o item **Relatórios** não aparece no menu lateral.
- **Proprietário e papéis prontos:** o proprietário não precisa dessa permissão no papel. As condições de cada relatório continuam valendo. **Administrador** e **Supervisor** já vêm com **Gerenciar relatórios**; **Atendente** não.
- **Condições extras por relatório:**
  - [**Dashboards**](/docs/relatorios/dashboard): cada dashboard define em **Visível para** quem o encontra na lista de dashboards (menu do título, **Mudar dashboard**): **Todos**, **Grupos** ou **Apenas para mim**; cartões de negociações exigem **Gerenciar negociações**.
  - [**Atendimento ao vivo**](/docs/relatorios/ao-vivo): o mapa e a fila seguem o **Acesso as Conversas** do papel.
  - [**Vendas ao vivo**](/docs/relatorios/ao-vivo): exige **Gerenciar negociações**.
  - [**Copiloto**](/docs/relatorios/copiloto): o item só aparece quando há pelo menos um recurso correspondente ligado em **Configurações** → **Automação** → **Copiloto** ([Analisar conversas com IA](/docs/copiloto/analises-de-ia)).
  - **Marketing** (**Meta Ads**, **Google Ads**, **Tracking**): exige o aplicativo correspondente ativo.

### O que cada restrição da seção Relatórios faz

| Restrição | Onde age e efeito |
| --- | --- |
| **Restringir relatórios ao membro** | Em relatórios de sessões como [**Visão geral**](/docs/relatorios/visao-geral), [**Produtividade**](/docs/relatorios/produtividade) e [**Copiloto**](/docs/relatorios/copiloto), e nas listas **Ver sessões**: mostra as sessões em que o membro é o responsável (na [**Avaliação**](/docs/relatorios/avaliacao), as avaliações registradas para ele). Na [**Presença**](/docs/relatorios/presenca): mostra a presença do próprio membro. |
| **Restringir relatórios aos grupos do membro** | Em relatórios de sessões como **Visão geral**, **Produtividade** e **Copiloto**, e nas listas **Ver sessões**: mostra as sessões dos grupos do membro (na [**Atribuição**](/docs/relatorios/atribuicao), as sessões que estão ou já estiveram nos grupos dele; no **Copiloto**, oculta as linhas **Sem atribuição** e **Sem grupo**). Se o membro não pertencer a nenhum grupo, ao abrir esses relatórios aparece um aviso de que ele não pertence a nenhum grupo e a Kinbox volta para a tela inicial. |
| **Não pode exportar relatórios** | Impede exportar a lista de sessões dos relatórios. |
| **Não pode criar ou excluir Dashboard** | Ao tentar criar, clonar, editar (inclusive cartões e organização) ou excluir um dashboard, aparece um aviso de que não tem permissão. |

- **Exclusividade mútua:** **Restringir relatórios ao membro** e **Restringir relatórios aos grupos do membro** não podem ficar marcadas ao mesmo tempo (marcar uma desmarca a outra; as duas podem ficar desmarcadas).

## Exportar relatórios

- **Formatos:** **CSV (.csv)** e **Excel (.xlsx)** em todo o módulo, gerados no navegador. Sem PDF nem imagem. O nome do arquivo não inclui data.

| Onde | Caminho | Nome do arquivo | O que vai no arquivo |
| --- | --- | --- | --- |
| [**Produtividade**](/docs/relatorios/produtividade) | **...** → **Exportar** | `relatorio_produtividade` | Tabela do agrupamento atual (a busca por nome não filtra o arquivo). |
| [**Atribuição**](/docs/relatorios/atribuicao) | **...** → **Exportar** | `relatorio_atribuicao` | Tabela do agrupamento atual (a busca por nome não filtra o arquivo). |
| [**Interação**](/docs/relatorios/interacao) | **...** → **Exportar** | `relatorio_interacao` | Tabela do agrupamento atual (a busca por nome não filtra o arquivo). |
| [**Presença**](/docs/relatorios/presenca) | **...** → **Exportar** | `relatorio_presenca` | Tabela do agrupamento atual (a busca por nome não filtra o arquivo). |
| [**Avaliação**](/docs/relatorios/avaliacao) | **...** → **Exportar** | `relatorio_avaliacao` | Tabela do agrupamento atual (a busca por nome não filtra o arquivo). |
| [**Copiloto**](/docs/relatorios/copiloto) (cada aba) | **...** → **Exportar** | `relatorio_qualidade`, `relatorio_sentimento`, `relatorio_intencoes`, `relatorio_lead_score`, `relatorio_atendimento_automatico` | Tabela agrupada da aba atual (cartões não entram; em **Atendimento automático**, não inclui **Reaberturas evitadas**). |
| Lista **Ver sessões** | **...** da lista → **Exportar** | `relatorio_sessoes` | Colunas selecionadas na lista para as sessões do filtro. Exportada em páginas (pode levar alguns instantes em períodos grandes; mostra `Exportando... N%`; erro: "Ocorreu um erro ao exportar os dados"). |
| Lista **Ver presenças** | **...** da lista → **Exportar** | `relatorio_presencas` | Grade de horários × dias com online/offline. |
| [**Saldo**](/docs/relatorios/saldo) (extrato) | **...** → **Exportar extrato** | `relatorio_carteira` | Débitos do período: ID, **Data**, Total, **Descrição**, **Carteira**, **Autor**. Mostra `Exportando... n%`; erro: "Ocorreu um erro ao exportar os dados". |
| [**Saldo**](/docs/relatorios/saldo) (serviços) | **...** → **Exportar serviços** | `relatorio_saldo_servicos` | Tabela de serviços: **Serviço**, **Categoria**, **Usos**, **Valor**, **% do total**, **Período anterior**. Respeita a categoria selecionada; busca por nome não filtra. |
| [**Ligações**](/docs/relatorios/ligacoes) | **...** → **Exportar** | `relatorio_ligacoes` | As ligações do período e da origem escolhida. Compartilhe a planilha apenas com pessoas autorizadas. |

- **Sem exportar:** **Visão geral** (apenas via lista **Ver sessões**), **Atendimento ao vivo**, **Vendas ao vivo**, **Dashboards** e **Marketing**.

## Dashboards: regras, campos, modelos e limites

- **Abertura e atalho:** também acessível pela busca global com "Ir para Dashboards". Ao abrir **Relatórios** → **Dashboards**, a Kinbox mostra o último dashboard aberto naquele navegador ou, se não houver, o primeiro da lista visível.
- **Dashboard como primeira tela:** se o papel tiver **Gerenciar relatórios**, quem configura o papel pode escolher **Dashboard** na seção **Home** e indicar o **Dashboard inicial**; ao entrar no workspace, a pessoa cai nesse dashboard ([Referência de permissões](/docs/administracao/referencia-de-permissoes)).
- **Visível para:** define quem encontra o dashboard na lista de dashboards (menu do título, **Mudar dashboard**): **Todos** (padrão, todos com acesso a relatórios), **Grupos** (campo **Grupos**, seleção múltipla; vê quem está em um dos grupos) ou **Apenas para mim** (apenas o autor). O proprietário vê todos na lista.
- **Salvar:** adicionar, editar, clonar ou excluir um cartão é salvo na hora. A organização da grade (**Organizar cards**, **Auto-organizar**) só é salva ao clicar em **Concluir**.
- **Individual × Compartilhado (**Período dos relatórios**):**
  - **Individual** (também vale quando o campo fica vazio na criação): cada cartão usa o próprio campo **Período**.
  - **Compartilhado:** o dashboard exibe um seletor de datas (`DD/MM/YYYY HH:mm`), padrão hoje de `00:00` a `23:59`, e o campo **Período** dos cartões mostra **Selecionado na dashboard**. Atalhos do seletor do dashboard compartilhado: **Última 1 hora**, **Últimas 3 horas**, **Últimas 6 horas**, **Últimos 7 dias**, **Últimos 15 dias**, **Ontem**, **Hoje**, **Essa semana**, **Esse mês**, **Mês passado**. O intervalo só entra em vigor quando um novo snapshot é gerado; depois aparece `Mostrando dados do snapshot do período <de> - <até>`.
- **Opções de Período do cartão** (dashboard **Individual**): **Hoje**, **Ontem**, **Essa semana**, **Esse mês**, **Mês passado**, **Última hora**, **Últimas 3 horas**, **Últimas 24 horas**, **Últimos 15 dias**, **Personalizado** (abre **Período personalizado**).
  - **Cartões de tarefas:** use apenas **Essa semana**, **Esse mês** ou **Personalizado**.

### Modelos de cartão

| Categoria | Modelo | Descrição na tela |
| --- | --- | --- |
| **Vendas** | **Conversão de leads** | Veja a jornada de leads até vendas. |
| **Vendas** | **Funil de vendas** | Veja a distribuição de seus negócios no funil. |
| **Vendas** | **Progressão do funil** | Acompanhe por quais etapas os negócios passaram, a conversão entre elas e os retornos. |
| **Vendas** | **Ciclo médio de vendas** | Veja o tempo médio até ganhar um negócio. |
| **Vendas** | **Taxa de recompra** | Acompanhe quantos clientes voltam a comprar dentro de uma janela de tempo. |
| **Atendimento** | **Pipeline Atendimento** | Adicione KPIs de atendimento com variação percentual. |
| **Atendimento** | **Melhor horário de resposta** | Descubra os horários com resposta mais rápida do cliente. |
| **Tarefas** | **Tarefas** | Acompanhe volume, conclusão e prazos das tarefas. |
| **Tarefas** | **Calendário de tarefas** | Veja tarefas, prazos e reuniões do período organizados num calendário. |
| **Tarefas** | **Feed operacional** | Acompanhe negócios ganhos, perdidos e tarefas vencidas num feed cronológico, agrupado por dia. |
| **Metas** | **Necessidade de leads** | Estime quantos leads faltam para bater uma meta. |
| **Metas** | **Meta x Realizado** | Acompanhe o progresso de uma meta em relação ao realizado. |
| **Do seu jeito** | **Personalizado** | Crie seu relatório com seus próprios parâmetros. |
| **Do seu jeito** | **Carrossel** | Visualize seus gráficos em uma sequência deslizável, como um álbum de fotos. |

### Cartão Personalizado

- **Campos, nesta ordem:** **Nome** (obrigatório), **Período** (em dashboards **Compartilhados**, aparece desativado com **Selecionado na dashboard**: o período vem do seletor do topo), **Fonte dos dados**, **Por propriedade** (obrigatório; padrão **Data da criação**), **Métrica** (e **Operação**, quando aplicável), **Agrupar por**, **Visualização** e **Condições**. Botão **Criar** (ou **Salvar** ao editar). Cartões novos que usam snapshot só ganham números no próximo snapshot; os de **Tarefas** consultam os dados na hora, mas podem ficar carregando enquanto o snapshot selecionado é processado.
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

- **Entram direto sem formulário:** **Ciclo médio de vendas**, **Pipeline Atendimento** (um cartão com 5 indicadores: **Não atribuído**, **Em espera**, **Em atendimento**, **Pendente**, **Atribuído**), **Melhor horário de resposta**, **Tarefas** (um cartão com 3 indicadores: **A fazer**, **Completas**, **Atrasadas**).
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

- **Negociações** (fonte **Negócios**, **Conversão de leads**, **Funil de vendas**, **Progressão do funil**, **Ciclo médio de vendas**, **Taxa de recompra**, **Necessidade de leads**, **Meta x Realizado**): exigem **Gerenciar negociações**. Sem ela, o cartão mostra **Sem permissão** ("Você não tem permissão para visualizar dados de negociações.").
- **Tarefas** e **Calendário de tarefas:** quem não pode ver tarefas de outros membros vê apenas as próprias tarefas.
- **Pipeline Atendimento:** ao clicar em um número, abre a lista das sessões por trás dele.

## Snapshots de dashboard

- **Definição:** foto dos dados de todos os cartões do dashboard calculada em um momento. Os cartões exibem o snapshot selecionado, não dados ao vivo.
- **Exceção:** os cartões **Tarefas** consultam os dados na hora.
- **Como gerar:** somente manualmente via **Obter dados atualizados** (confirmando em **Atualizar dados**) ou **Tentar novamente** em caso de falha. Sem cartões, avisa: "Adicione pelo menos um relatório para atualizar dados."
- **Processamento:** roda em segundo plano, em fila, um snapshot por vez, sem prazo fixo (a tela avisa que pode levar vários minutos, dependendo do tamanho do dashboard). Enquanto processa, os cartões ficam carregando e o seletor exibe um ícone girando; a tela verifica o andamento sozinha a cada 5 segundos.
- **Conclusão e falha:** ao terminar, chega uma notificação no sino com link para o snapshot. Em caso de falha, não há notificação e cada cartão mostra "O snapshot selecionado falhou ao processar os dados deste dashboard." com **Tentar novamente** (gera um novo snapshot). Cartão sem dados mostra **Sem dados** ("Não há dados para este card no snapshot selecionado.").
- **Seletor Snapshots:** itens no formato `DD/MM/YYYY HH:mm by <nome>`, ordenados do mais recente para o mais antigo, com busca e 30 por página. Ao abrir o dashboard, carrega sempre o snapshot mais recente (sem nenhum, exibe `⚠️ Selecione um snapshot...` e os cartões ficam carregando). Se os snapshots anteriores aparecerem desativados no seletor, peça ao administrador a permissão **Atribuir** no seu papel.
- **Atualização:** não há atualização automática nem agendada; gere um novo snapshot sempre que precisar de números atualizados.

## Saldo: categorias, registros e colunas

- **O que entra:** só débitos do [saldo da carteira](/docs/conceitos/saldo-e-creditos). Recargas (compras de saldo) ficam no **Histórico de recargas**; créditos de SMS usam outro saldo e não aparecem.
- **Período:** padrão últimos 15 dias, sem hoje. Os dias são contados no horário de Brasília. O **período anterior** (comparação do **Total consumido** e da tabela) tem a mesma duração e termina logo antes do início do período escolhido.
- **Outro caminho:** **Configurações** → **Assinatura** → **Saldo disponível** → **Ver relatório de uso**, se o botão aparecer (precisa de **Gerenciar relatórios**).

### Categorias e serviços

| Categoria | Serviços (rótulo exato) |
| --- | --- |
| **Copiloto** | **Uso do copilot**, **Uso do copilot (chat)**, **Uso de Assistente IA**, **Avaliadores do copiloto**, **Revisor de mensagens** |
| **Agente de IA** | **Uso do agente de IA**, **Processamento da base de conhecimento** |
| **Análises** | **Análise de sentimento**, **Lead score**, **Classificação de intenção**, **Cliente preso no bot**, **Sugestão de retorno**, **Aviso de pendência ao resolver**, **Mensagem de encerramento**, **Rascunho de retorno** |
| **Voz e áudio** | **Ligação atendida por IA**, **Transcrição de chamada de voz**, **Resumo da transcrição de chamada de voz**, **Transcrição de áudio**, **Ligação do WhatsApp**, **Gravação de ligação do WhatsApp** |
| **Outros** | Qualquer débito sem categoria própria, exibido pela descrição |

- **VoIP e excedente em Outros:** os minutos de ligação por telefone (**Voip**) e o **Excedente do plano de ligações do WhatsApp** aparecem em **Outros**, e não em **Voz e áudio**.
- **Avaliadores × análises:** os **Avaliadores do copiloto** (que alimentam a aba **Qualidade** do [Relatório do copiloto](/docs/relatorios/copiloto)) ficam em **Copiloto**; sentimento, intenção, lead score e cliente preso no bot ficam em **Análises**.

### Usos, registros e dia do débito

- Análises de custo muito pequeno são somadas e viram um único débito na carteira depois de acumular um valor mínimo ou uma vez por dia. Por isso **Usos** pode ser maior que a quantidade de registros, e parte do consumo de um dia pode aparecer no dia seguinte.

### Tabela, detalhe e exportação

- **Tabela Serviços:** colunas **Serviço**, **Categoria**, **Usos** (quantas vezes o serviço foi usado no período), **Valor**, **% do total** e **Tendência** (valor por dia no período; ordena pela variação contra o período anterior). Padrão: **Valor**, do maior para o menor; clique no cabeçalho para ordenar; **Buscar serviço** filtra pelo nome.
- **Detalhe do serviço** (linha da tabela ou cartão **Maior gasto**): cartões **Valor no período**, **Usos** (com a quantidade de registros), **Custo por uso** e **Período anterior**; gráfico **Valor por dia**; lista **Registros**, carregada 30 por vez ao rolar.
- **Detalhe de um registro:** painel **Detalhe** com **Descrição**, **Data**, **Valor consumido (R$)**, **ID da transação** e, quando existem, **Membro**, **ID do Contato**, **ID da Conversa** (botão **Ver conversa**), **ID da Sessão**, **Minuto**, **Destino** e **ID da Chamada de Voz**.
- **Ver extrato:** abre o painel **Extrato do saldo** com os débitos do período.
- **Colunas exportadas:** **Exportar extrato**: ID, **Data**, Total, **Descrição**, **Carteira**, **Autor**. **Exportar serviços**: **Serviço**, **Categoria**, **Usos**, **Valor**, **% do total**, **Período anterior**.

## Ligações: status, gráfico e totais

- **O que entra:** ligações do [WhatsApp oficial](/docs/canais/whatsapp/whatsapp-cloud-api/ligacoes-pelo-whatsapp) e por [telefone (VoIP)](/docs/canais/ligacoes/ligar-por-telefone), pela data em que cada ligação foi criada. Período padrão: últimos 15 dias, sem hoje.
- **Origem:** **Todas as ligações** (padrão), **WhatsApp: feitas**, **WhatsApp: recebidas**, **Telefone (VoIP)**. Não há filtro por membro, canal ou status.
- **Status:** **Chamando...**, **Em andamento**, **Concluída**, **Ligação falhou**, **Não atendeu**, **Recusada**. Uma ligação recebida e perdida aparece na tabela como **Não atendeu**.
- **Gráfico por dia:** só entram as ligações **concluídas**. Seletor: **Minutagem** (título **Minutos diários**), **Média de minutos**, **Contagem de ligações**.
- **Cartões de totais:** **Minutos** e **Média de minutos** (das concluídas), **Concluídas** e um cartão para cada outro status que apareceu no período; respeitam o filtro de origem. Sem ligações, aparece só **Média de minutos** zerado.
- **Lista:** 20 por página, das mais recentes para as mais antigas; colunas **Destino**, **Minutos** (`-` quando não concluída), **Status**, **Data**, **Membro**. Clicar na linha não abre nada: passe o mouse para ver **Baixar** e **Ver**.
- **Custo:** o relatório não mostra valores em reais; o consumo fica no relatório **Saldo** (ligações do WhatsApp em **Voz e áudio**; VoIP e excedente em **Outros**).

## Copiloto: sessões, período e regras dos cartões

- **Quais sessões entram:** só sessões **resolvidas** no período, contadas pela data de resolução, e só as que o copiloto analisou para aquela aba. Sessões abertas ou sem análise não entram.
- **Período:** padrão últimos 7 dias, sem hoje. O período pode ter no máximo 1 ano; acima disso aparece o erro "O período do relatório pode ter no máximo 1 ano.".
- **Cache:** períodos que já terminaram ficam guardados até a meia-noite (análises que chegam depois podem aparecer só no dia seguinte); períodos que incluem hoje atualizam em até 5 minutos.
- **Aba Qualidade:** aparece com um avaliador ativo que grava em campo, criado a partir dos modelos **Nota do atendimento**, **Problema resolvido?** ou **Pontos a melhorar**. Um avaliador criado só com critério próprio não ativa a aba.
- **Faixas de nota (Qualidade):** **Crítico (0–4)**, **Atenção (5–6)**, **Adequado (7–8)** e **Excelente (9–10)**. **Precisam de atenção** conta as sessões com nota até 6.
- **Sentimento:** **Terminaram negativas** = terminaram **Irritado** ou **Impaciente**; **Recuperadas** = passaram de negativo para **Satisfeito** ou **Encantado**; **Pioraram** = não começaram negativas e terminaram negativas.
- **Intenções:** entram na aba **Intenções** apenas as sessões em que a intenção foi identificada.

## O que não existe

- **Dashboards:** não há exportar dashboard, PDF, imagem, tela cheia/modo TV, link de compartilhamento próprio, atualização automática/agendada nem filtros globais para o dashboard inteiro (filtros são por cartão).
- **Relatórios em geral:** não há exportação em PDF ou imagem, e os nomes dos arquivos exportados não trazem data.
