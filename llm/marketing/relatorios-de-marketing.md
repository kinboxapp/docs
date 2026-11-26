---
title: "Relatórios de Meta Ads e Google Ads: consultas, contas, métricas, atribuição e mensagens"
description: Detalhes dos relatórios e conexões de Meta Ads e Google Ads para consulta — limite de consultas, dados salvos, troca de conta, cálculo das métricas, origem das negociações, sugestões do Google e mensagens de erro.
keywords: [limite de consultas meta ads, limite google ads, dados salvos, atualizado em, leads gerados meta, faturamento meta, roas, funil meta ads, atribuição no kinbox, gclid, sugestões google ads, autorização expirou, ads_read]
publico: llm
tipo: referencia
fontes:
  - api:src/modules/marketing/dashboard-snapshots/dashboard-snapshots.service.ts
  - api:src/modules/marketing/meta-ads/meta-ads.controller.ts
  - api:src/modules/marketing/google-ads/google-ads.controller.ts
  - api:src/modules/deals/deal-attribution.helper.ts
  - web:src/pages/reports/Marketing/GoogleAds/googleAdsSuggestions.ts
  - web:src/pages/reports/Marketing/MetaAds/index.tsx
codigo:
  - web:src/pages/reports/Marketing/**
  - api:src/modules/marketing/**
  - api:src/modules/deals/deal-attribution.helper.ts
verificado_em: 2026-11-26
---

Referência detalhada dos relatórios e conexões de **Meta Ads** e **Google Ads** (título **Visão do Gestor** na tela). Para os guias passo a passo, veja [Conectar o Meta Ads](/docs/marketing/meta-ads), [Conectar o Google Ads](/docs/marketing/google-ads) e [Ler os relatórios de marketing](/docs/marketing/relatorios-de-marketing).

Condições gerais:

- Ver os relatórios em **Relatórios** → **Marketing** exige a permissão **Gerenciar relatórios**; ativar os apps em **Configurações** → **Integrações** → **Apps**, conectar, desconectar e definir a conta padrão exigem a permissão **Integrações** (o proprietário pode tudo).
- Se algum app não aparecer em **Configurações** → **Integrações** → **Apps**, ele ainda não foi liberado para o workspace: fale com o suporte.
- Limites diários de consultas por workspace: **Meta Ads** = 10 consultas/dia; **Google Ads** = 3 consultas/dia; **Tracking** = sem limite (e só conta visitantes com consentimento de analytics, sem identificar o contato).
- O relatório **Google Ads** não tem leads, CPL nem métricas de funil e pipeline; as negociações aparecem só como tipo **Negócio** na aba **Atribuição no Kinbox**.

## Consultas e dados salvos

- Os relatórios **Meta Ads** e **Google Ads** exibem os dados salvos da última busca ("Atualizado em DD/MM HH:mm").
- A cota diária é por workspace e separada por app, renovada à meia-noite (horário de Brasília):
  - **Meta Ads:** 10 consultas por dia; intervalo mínimo de 5 minutos entre dois cliques em **Atualizar**.
  - **Google Ads:** 3 consultas por dia; intervalo mínimo de 15 minutos entre dois cliques em **Atualizar**.
- **Consome 1 consulta:** primeira abertura de uma conta ou período; período ainda não coberto por dados salvos; dados salvos há mais de 48 horas (renovados automaticamente ao abrir; se falhar ou sem cota, exibe os dados antigos); clique em **Atualizar**; e troca para outra conta que ainda não tenha dados salvos.
- **Não consome consulta:** selecionar um intervalo dentro de um período já consultado da conta, quando a Kinbox reaproveita os dados salvos sem renová-los; consultas que falham (a consulta é devolvida à cota). O intervalo mínimo de 5 ou 15 minutos vale apenas para **Atualizar**, não para abrir um período novo.
- **Validade dos dados salvos:** expiram automaticamente após 30 dias sem atualização. **Desconectar** apaga todos os dados salvos daquele app no workspace.
- **Tooltips do botão Atualizar:**
  - `"{{remaining}} de {{limit}} consultas disponíveis hoje."`
  - `"Próxima atualização disponível às {{time}}."`
  - `"Limite de {{limit}} consultas por dia atingido. Novas consultas liberam amanhã."`
- **Mensagens de retorno:**
  - Limite diário: `"Limite de consultas de hoje atingido. Os períodos já consultados continuam disponíveis e novas consultas liberam amanhã."`
  - Intervalo mínimo: `"Aguarde o intervalo entre uma atualização e outra. Os dados salvos continuam disponíveis."`
  - Concorrência: `"Outra pessoa deste workspace já está atualizando estes dados. Aguarde alguns segundos e tente novamente."`
  - Sucesso/falha de **Atualizar**: `"Dados do Meta Ads atualizados."`, `"Dados do Google Ads atualizados."`, `"Não foi possível atualizar os dados agora."`

## Período

- Formato `DD/MM/AAAA`, sem hora; o período passa a valer ao fechar o calendário.
- Atalhos: **Hoje**, **Ontem**, **Últimos 7 dias**, **Últimos 30 dias**, **Esse mês** e **Mês passado**. Padrão de abertura: últimos 30 dias até ontem (no Google Ads, no fuso da conta).
- **Limites:** máximo de 366 dias (períodos maiores são cortados no início sem aviso); datas futuras e anteriores a `03/06/2022` ficam bloqueadas.
- No **Meta Ads**, cada seção tem seu seletor de datas independente; ao abrir ou trocar de conta, todas voltam ao padrão.
- **Aviso de recorte de período maior:** em blocos que não têm detalhamento diário (Campanhas, Criativos, Regiões e Demografia no Meta Ads; Palavras-chave, Regiões e abas Palavras-chave, Anúncios e Termos de busca no Google Ads), quando o período selecionado é recortado de um período maior já consultado, aparece `"Mostrando o período completo já consultado (DD/MM a DD/MM): a Meta não calcula estes dados por dia."` ou `"...: o Google Ads não calcula estes dados por dia."`.
- No **Google Ads**, quando o período inclui hoje, aparece `"Os dados de hoje ainda são parciais."`

## Contas

- **Troca no relatório:** o botão **Conta de anúncios: …** abre **Contas de anúncio** → **Salvar**. A escolha fica lembrada naquele navegador. Quando feita por quem tem a permissão **Integrações** escolhendo **uma** conta, clicar em **Salvar** também altera a conta padrão do workspace para todos os membros.
- **Meta Ads:**
  - Nenhuma conta é definida como padrão automaticamente após conectar; sem conta padrão, o relatório mostra `"Selecione uma conta de anúncios"`.
  - A lista mostra apenas as contas autorizadas na janela da Meta; **Atualizar lista** (ou **Atualizar** na gaveta de contas, para quem tem **Integrações**) consulta novas contas na Meta.
  - Seleção manual aceita até 20 contas; **Todas as contas** soma as contas salvas. A seleção só soma contas na mesma moeda: com moedas diferentes, o atalho aparece como **Todas as contas em …** e as contas de outra moeda ficam desabilitadas.
- **Google Ads:**
  - Apenas uma conta Google fica conectada por workspace; conectar outra substitui a anterior. Sob essa conta Google podem ser selecionadas várias contas de cliente.
  - **Trocar de conta** com outra conta Google apaga as contas escolhidas e os dados salvos do relatório. Quando a autorização atual foi feita por outra pessoa, a tela pede confirmação em "Trocar a conta Google?". Se a troca for cancelada no meio, aparece "A troca de conta não foi concluída. A conta Google anterior continua conectada." Com a mesma conta Google, as contas escolhidas continuam salvas.
  - Contas de administrador (MCC) servem apenas para agrupar as contas de cliente e não podem ser selecionadas.
  - Salvar uma nova seleção substitui a anterior inteira; a conta padrão atual continua padrão se permanecer marcada, senão a primeira da lista enviada vira padrão.
  - O relatório exibe uma conta de anúncios por vez; fuso horário e moeda seguem os da conta de anúncios (padrão `America/Sao_Paulo` e `BRL`).

## Meta Ads: métricas

| Cartão | Tooltip exato | Cálculo e regras |
| --- | --- | --- |
| **Investimento** | Total gasto em anúncios da Meta no período selecionado. | Soma do gasto diário informado pela Meta. |
| **Leads Gerados** | Resultados das campanhas da Meta no período, contados pelo evento de conversão do objetivo de cada campanha. | Conta lead, conversa, registro, contato, agendamento, solicitação e resultado personalizado; alcance, impressões, cliques, engajamento, vídeo e compras não entram. |
| **Custo por Lead** | Investimento dividido pela quantidade de leads gerados. | Investimento ÷ leads (0 sem leads). Único cartão em que subir é negativo. |
| **ROAS** | Faturamento (Meta) dividido pelo investimento em mídia. | Faturamento (Meta) ÷ investimento, formato `1,5x`. |
| **Faturamento (Meta)** | Valor de compras registrado pelo pixel da Meta. Não inclui negócios da Kinbox. | Valor de compras informado pela Meta. |

- **Comparação:** cada cartão compara com o período anterior de mesmo tamanho; sem dado anterior, mostra `-` com `"Sem dados do período anterior para comparar."`
- **Gráfico:** **Leads**, **Investimento** ou **Faturamento (Meta)** por dia; o filtro de campanha (até 100 campanhas) altera apenas o gráfico.
- **Visão Geral das Campanhas:** **Impressões**, **Alcance** (nível de conta), **Frequência**, **CPM** e **CPC**; tabela **Campanhas em Destaque** com no máximo 8 campanhas de maior gasto. Status possíveis: **Ativa**, **Pausada**, **Excluída**, **Arquivada**, **Em processamento**, **Com problemas**, **Desativada**. Orçamento exibido por dia, total ou `"Usando orçamento do conjunto"`.
- **Criativos em Destaque:** 4 anúncios com melhor resultado entre os 20 primeiros retornados pela Meta; selos **Mais Leads**, **Melhor CTR** e **Menor CPL** (no máximo um por criativo).
- **Distribuição por Regiões:** mapa do Brasil e tabela **Regiões em Destaque** (top 7). Quando nenhum estado tem leads, muda para **Alcance por região** com o texto `"A Meta não informa cadastros, contatos e leads do site por região. Aqui aparecem o alcance, o CPM e o CTR de cada estado."`
- **Dados Demográficos:** **Audiência por idade e gênero** (faixas `13-17`, `18-24`, `25-34`, `35-44`, `45-54`, `55-64`, `65+`; desconhecida aparece como `N/I` no eixo e `"Não informada"` no tooltip) e **Distribuição por gênero** (**Mulheres**, **Homens**, **Não identificado**).

## Meta Ads: de onde vêm as negociações

- Cliques, leads, gasto, alcance, **Faturamento (Meta)** e **ROAS** vêm da Meta. Da Kinbox vêm **Negócios**, **Ganhos**, **Perdidos**, **Valor em negociação**, **Negócios em aberto** e **Tempo médio no funil**.
- **Origem da negociação:** ao criar uma negociação, a Kinbox procura a sessão mais recente do contato com origem nos últimos 90 dias. Ao ligar uma negociação existente sem origem a uma conversa, a Kinbox busca a origem nas sessões dessa conversa dos 90 dias anteriores à criação da negociação. A origem é Meta Ads quando a sessão tem ID do anúncio (`source_id`), `ctwa_clid` ou `fbclid` (UTM sozinha não atribui ao Meta Ads); essa origem vale para o filtro **Criado por Meta Ads**. Negociações importadas e de funil operacional não recebem origem.
- **Regras do bloco Conversão e Pipeline - Meta Ads:** conta só negociações com o ID do anúncio (`source_id`, que vem de anúncios de clique para o WhatsApp) de um anúncio da conta/campanha selecionada (considerando anúncios que rodaram até 90 dias antes do início do período), criadas no período (no fuso da conta de anúncios). Negociações com origem Meta Ads só por `fbclid` ou `ctwa_clid` não entram no bloco. O status em **Status dos negócios** (**Em andamento**, **Ganhos**, **Perdidos**) é o status atual; **Tempo médio no funil** é a média de dias desde a criação das negociações ainda abertas.
- **Funil de Vendas e Conversão:** **Cliques** → **Leads** → **Negócios** → **Ganhos**, com cada percentual calculado sobre a etapa imediatamente anterior.

## Meta Ads: conexão e mensagens

- Permissões solicitadas na janela da Meta: **Ler anúncios (`ads_read`)** e **Gerenciar negócios (`business_management`)**; mensagens de falta também podem listar **Gerenciar anúncios (`ads_management`)**.
- A autorização pode vencer ou ser removida na Meta sem aviso prévio. Quando isso acontecer, reconecte em **Configurações** → **Integrações** → **Apps** → **Meta Ads** usando **Trocar de conta** (se o botão aparecer) ou **Conectar Meta Ads**.

| Mensagem | Causa | O que fazer |
| --- | --- | --- |
| `A Meta ainda não liberou a leitura dos seus anúncios para o Kinbox. A liberação está em andamento: tente conectar de novo em alguns dias.` | Permissão de leitura de anúncios ainda indisponível para o perfil na Meta. | Tente novamente mais tarde; se continuar, fale com o suporte. |
| `Permissões não concedidas pela Meta: … Conecte de novo e aceite todas as permissões.` | Alguma permissão foi desmarcada na janela da Meta. | Conecte novamente e aceite todas as permissões. |
| `A conexão com a Meta não devolveu nenhuma conta de anúncios. Confira se o perfil conectado tem acesso a uma conta.` | O perfil conectado não tem contas liberadas. | Conceda acesso ao perfil e clique em **Atualizar lista** (se o botão aparecer), ou use **Trocar de conta**. |
| `A autorização da Meta expirou ou foi removida…` | Autorização vencida ou revogada na Meta. | Reconecte em **Configurações** → **Integrações** → **Apps** → **Meta Ads** (**Trocar de conta** ou **Conectar Meta Ads**). |
| `A Meta limitou as consultas por alguns minutos. Tente atualizar mais tarde.` | Limite temporário de consultas na Meta. | Aguarde alguns minutos e clique em **Atualizar**. |
| `Não foi possível conectar a conta de anúncios.` / `Não foi possível trocar a conta de anúncios.` | Falha ao concluir a autorização. | Tente iniciar a conexão novamente. |
| `Não foi possível salvar a conta padrão agora.` / `Não foi possível carregar as contas de anúncios da Meta agora.` / `Não foi possível desconectar a conta Meta Ads agora.` | Erro temporário ao salvar, listar ou desconectar. | Tente novamente; se persistir, fale com o suporte. |
| `Peça a alguém com permissão para gerenciar integrações que conecte a conta de anúncios da Meta.` | Papel sem a permissão **Integrações**. | Peça a um membro com **Integrações** ou ao proprietário para conectar. |

## Google Ads: métricas e sugestões

- **Métricas (todas do Google; sem leads, CPL nem métricas de funil e pipeline):** **Investimento**, **Conversões** (pode ter até 2 casas decimais), **Custo por conversão** (também exibido como **CPA** nos cartões de destaque e **Custo/conv.** na tabela), **Valor de conversão**, **ROAS** (valor de conversão ÷ investimento), **Impressões**, **Cliques**, **CTR** (cliques ÷ impressões × 100), **CPC médio** (custo ÷ cliques) e **CPM médio** (custo ÷ impressões × 1.000).
- **Filtro de campanha:** filtra todos os blocos do relatório (na aba **Atribuição no Kinbox**, filtra linhas com campanha identificada).
- **Agrupamentos e limites:**
  - **Conversões por tipo:** **Rede de Pesquisa**, **Performance Max** (inclui Shopping) e **Display** (inclui Vídeo, Geração de demanda e Discovery).
  - **Valor por campanha:** top 5 campanhas por valor de conversão.
  - **Detalhamento das melhores campanhas:** 2 campanhas de maior valor de conversão.
  - **Palavras-chave e custo:** top 5 palavras-chave por custo (entre até 200 retornadas).
  - **De onde vêm seus cliques:** top 5 cidades por participação nos cliques (entre até 12 retornadas).
  - **Campanhas:** 4 linhas por página; status **Ativa**, **Pausada** ou **Removida**; campanhas sem atividade no período não aparecem.
  - **Mídia e atribuição:** 6 linhas por página; até 200 **Palavras-chave**, 100 **Anúncios** (expansíveis com títulos e descrições) e 200 **Termos de busca** (termos omitidos pelo Google por privacidade aparecem como **Termo indisponível** / **Restrição de privacidade**).
- **Sugestões em Destaque:** máximo de 2 por tipo e 8 no total (4 por página), sempre comparadas ao custo por conversão médio da conta no período. Sem gasto no período, não gera sugestões. A Kinbox apenas sugere e não altera nada no Google Ads.

| Sugestão | Tipo | Quando aparece |
| --- | --- | --- |
| `Configure o acompanhamento de conversões` | **Configuração** | Há investimento no período, mas zero conversões na conta (aparece sozinha). |
| `Revise ou pause a campanha` | **Desperdício** | Campanha sem conversão com gasto maior ou igual a 1× o custo por conversão médio. |
| `Aumente o orçamento` | **Oportunidade** | Campanha com 3 ou mais conversões e custo por conversão menor ou igual a 75% da média. |
| `Negative o termo “…”` | **Desperdício** | Termo de busca disponível, sem conversão e com gasto maior ou igual a 50% da média. |
| `Pause a palavra-chave “…”` | **Desperdício** | Palavra-chave ativa, sem conversão e com gasto maior ou igual a 1× a média. |
| `Revise a página de destino` | **Atenção** | Campanha com 50 ou mais cliques, com conversão e taxa de conversão menor que metade da taxa da conta (no máx. 1). |
| `O custo por clique subiu` | **Atenção** | CPC médio 20% ou mais acima do período anterior. |
| `Configure o valor das conversões` | **Configuração** | Valor de conversão total menor ou igual à quantidade de conversões. |

## Google Ads: Atribuição no Kinbox

- **Vínculo determinístico:** lê o identificador de clique (`gclid`, `gbraid` ou `wbraid`, nessa ordem) gravado na sessão (por [Redirecionador de WhatsApp](/docs/desenvolvedor/redirecionador-via-whatsapp), origem registrada no contato pela API ou captura do [widget](/docs/canais/widget/configuracoes)). `utm_campaign` sozinho não atribui ao Google Ads.
- **Colunas:** **Click ID** (mascarado: 7 primeiros + `••••` + 4 últimos e tipo), **Campanha** (com grupo e palavra-chave), **Entidade Kinbox** (**Conversa** ou **Negócio**), **Motivo do vínculo**, **Confiança** (`Alta`), **Status** (`Vinculado`) e **Registrado em**.
- **Limites:** lê até 1.000 sessões mais recentes do workspace no período e exibe até 200 linhas.
- **Confirmação no Google Ads:** para `gclid`, consulta até 32 dias distintos mais recentes por carregamento (o Google mantém 90 dias de histórico de cliques); `gbraid` e `wbraid` não são confirmados no Google. Quando não confirma, a linha continua com a campanha por `utm_campaign` ou `—`. Quando o Google confirma que o clique pertence a outra conta do workspace e não há UTM compatível, a linha sai da lista.
- **Frequência:** a atribuição é recalculada no máximo 1 vez por dia para os mesmos dados salvos (clicar em **Atualizar** no mesmo dia mantém as linhas).
- **Conversas e negociações:** a aba lista as conversas do período com `gclid`, `gbraid` ou `wbraid`, mesmo sem negociação (tipo **Conversa**); quando uma negociação recebeu a origem daquela sessão, a linha aparece como **Negócio**. A negociação recebe a origem Google Ads ao ser criada (sessão mais recente do contato nos 90 dias anteriores) ou ao ser ligada a uma conversa, se ainda não tiver origem (sessões dos 90 dias anteriores à criação da negociação); negociações importadas ou de funil operacional não recebem origem.

## Google Ads: conexão e mensagens

- A sessão de autorização em andamento no pop-up do Google vale por 15 minutos.

| Mensagem | Causa | O que fazer |
| --- | --- | --- |
| `Autorização não concluída` / `A janela de autorização foi fechada antes da conclusão. Tente novamente.` | A janela do Google foi fechada antes de finalizar. | Clique em **Fazer login com Google**. |
| `A autorização Google Ads foi cancelada ou não concedeu acesso.` / `A permissão do Google Ads não foi concedida.` | O acesso ao Google Ads foi recusado ou desmarcado. | Inicie a conexão novamente e aceite o acesso ao Google Ads. |
| `A conta Google foi autorizada, mas nenhuma conta Google Ads foi identificada ainda…` | A conta Google autorizada não lista contas Google Ads. | Clique em **Tentar carregar contas** ou use **Trocar de conta** com uma conta que administra os anúncios. |
| `Reconecte o Google Ads` / `A autorização do Google expirou. Reconecte a conta.` | A autorização do Google expirou ou foi revogada. | Clique em **Trocar de conta** (com a mesma conta Google, as contas escolhidas continuam salvas). |
| `Algumas contas Google Ads não puderam ser consultadas e podem não aparecer na lista.` | Parte das contas falhou na consulta ao Google. | Clique em **Tentar carregar contas**. |
| `A conta Google Ads não está ativa. Ela pode estar cancelada, suspensa ou com o cadastro incompleto.` | Conta de anúncios inativa no Google Ads. | Regularize a conta no Google Ads ou selecione outra conta ativa. |
| `A conta Google conectada não tem acesso a esta conta Google Ads. Reconecte escolhendo a conta Google que administra os anúncios.` | A conta Google autorizada perdeu acesso à conta de anúncios. | Use **Trocar de conta** com a conta Google correta. |
| `Esta conta não liberou os relatórios de … O restante do período foi carregado normalmente.` | Um ou mais blocos opcionais não puderam ser carregados (pode ser falha passageira). | Tente clicar em **Atualizar** mais tarde; se continuar, confira o acesso da conta no Google Ads. |
| `Não foi possível consultar o Google Ads neste momento.` | Falha temporária ao consultar o Google. | Tente novamente mais tarde. |
| `A conexão real ficará disponível…` ou aviso de acesso da Kinbox ao Google Ads | Google Ads ainda não liberado para o workspace ou problema de acesso da Kinbox. | Fale com o suporte. |
| `Peça a alguém com permissão para gerenciar integrações que conecte a conta do Google Ads.` | Papel sem a permissão **Integrações**. | Peça a um membro com **Integrações** ou ao proprietário para conectar. |

## Apresentação do Kin

- Nos relatórios **Meta Ads** e **Google Ads**, a apresentação do Kin abre automaticamente uma única vez para o membro que conectou a conta, em qualquer navegador; ao desconectar e conectar de novo, volta a abrir.
- Qualquer membro com acesso ao relatório pode revê-la clicando em **Ver apresentação**, ao lado de **Atualizar** (com os controles **Pular introdução** e **Silenciar voz** / **Ativar voz**). O relatório **Tracking** não tem apresentação.
