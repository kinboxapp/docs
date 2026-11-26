---
title: "Métricas dos relatórios: como TME, TMA, sessões novas e resolvidas são contadas"
description: Regras exatas de cada métrica e relatório de atendimento da Kinbox, o que entra e o que fica fora, e por que números de relatórios diferentes não batem.
keywords: [tme, tma, tmp, primeira resposta, nota interna, bot, horário comercial, sessão transferida, responsável atual, sessões novas, resolvidas, leads, mensagens, atribuição, interação, presença, avaliação, ao vivo, cache, números não batem, tempo de resposta, sla]
publico: llm
tipo: referencia
fontes:
  - api:src/modules/reports/session-summary/session-summary.consumer.ts
  - api:src/modules/reports/session-summary/session-summary.service.ts
  - api:src/modules/reports/session-summary/session-summary.helper.ts
  - api:src/modules/reports/session-summary/time-average.ts
  - api:src/modules/reports/presence-block/presence-block.service.ts
  - api:src/modules/live-floor/live-floor.scope.ts
  - api-v0:server/modules/chat/auxiliary/sendMessageToClient.js
  - api-v0:server/modules/chat/botFlowV2.js
  - web:src/pages/reports/useReports.tsx
codigo:
  - api:src/modules/reports/**
  - api:src/modules/live-floor/**
  - api:src/modules/live-sales/**
  - api-v0:server/modules/chat/auxiliary/sendMessageToClient.js
  - api-v0:server/modules/chat/ChatEventsNotificator.js
  - api-v0:server/controllers/AutomationEventsController.js
  - api-v0:server/modules/chat/botFlowV2.js
  - web:src/pages/reports/**
  - web:src/pages/live-view/**
verificado_em: 2026-11-26
---

Referência técnica complementar de [Relatórios: visão geral e métricas](/docs/relatorios/como-funcionam), [Relatório Visão geral (tempo real)](/docs/relatorios/visao-geral), [Atendimento e vendas ao vivo](/docs/relatorios/ao-vivo), [Relatório de produtividade](/docs/relatorios/produtividade), [Relatório de atribuição](/docs/relatorios/atribuicao), [Relatório de interação](/docs/relatorios/interacao), [Relatório de presença](/docs/relatorios/presenca) e [Relatório de avaliação](/docs/relatorios/avaliacao).

## Acesso, permissões e restrições

- **Menu:** **Relatórios** no menu lateral. Quando o membro define **Dashboard** como **Home**, o item **Relatórios** sobe para o topo do menu lateral.
- **Permissão base:** **Gerenciar relatórios** (seção **Relatórios** do papel). Sem ela, o item **Relatórios** e todos os relatórios somem do menu. O proprietário do workspace sempre tem acesso e não sofre restrições. Nos papéis padrão, **Administrador** e **Supervisor** vêm com **Gerenciar relatórios**; **Atendente** não.
- **Vendas ao vivo:** exige **Gerenciar relatórios** e **Gerenciar negociações**.
- **Restrições da seção Relatórios do papel** (lista completa em [Referência de permissões](/docs/administracao/referencia-de-permissoes)):
  - **Restringir relatórios ao membro:** limita os relatórios às sessões em que o membro é o responsável atual (na **Avaliação**, às avaliações registradas para ele; na **Presença**, só a presença dele) e limita os filtros ao próprio membro.
  - **Restringir relatórios aos grupos do membro:** limita os relatórios de sessões aos grupos do membro (na **Atribuição**, sessões que estão ou já estiveram nos grupos dele) e limita os filtros aos grupos dele e aos colegas desses grupos. Se o membro não pertence a nenhum grupo, o relatório não abre e aparece um aviso de que ele não pertence a nenhum grupo.
  - **Restringir relatórios ao membro** e **Restringir relatórios aos grupos do membro** se excluem mutuamente (marcar uma desmarca a outra; ambas podem ficar desmarcadas).
  - **Não pode exportar relatórios:** desativa o botão **Exportar** dentro da lista de sessões (**Ver sessões**).
  - **Não pode criar ou excluir Dashboard:** impede criar ou excluir dashboards.
- **Canais restritos a grupos:** canais com visibilidade restrita a grupos não aparecem nos filtros de relatórios para membros fora desses grupos (exceto o proprietário e quem tem acesso **Global**).
- **Atendimento ao vivo:** não usa as restrições de relatório; segue o **Acesso as Conversas** do papel, igual à [Caixa de entrada](/docs/conversas/caixa-de-entrada-do-kinbox) (veja [Workspace, membros e papéis](/docs/conceitos/workspace-membros-e-papeis)). Com a restrição **Esconder telefone**, o telefone dos contatos não é exibido. Os indicadores do dia no conjunto **Tempo médio** (**resolvidas hoje** e **TM 1ª resposta**) vêm da **Produtividade** de hoje e seguem as restrições de relatórios.

## Sessão e primeira resposta

- Os relatórios contam **sessões** (cada atendimento com protocolo próprio; veja [Conversas, sessões e status](/docs/conceitos/conversas-e-sessoes)), e não conversas nem contatos. Uma sessão reaberta dentro do **Tempo de tolerância ao resolver conversa** continua sendo a mesma sessão.
- **Primeira resposta:** marcada na primeira mensagem enviada por um membro na sessão.
  - **Contam:** mensagem comum de membro, **nota interna** enviada por um membro e ligação atendida por um membro.
  - **Não contam:** mensagens de bot e mensagens automáticas do sistema.
- **Sessão iniciada pela equipe:** sessão aberta por um membro pelo botão **Enviar mensagem** (veja [Iniciar uma conversa com um contato](/docs/conversas/iniciar-conversa)). Na lista de sessões aparece com **Sessão iniciada pelo contato** = "Não", e no filtro **Estado** como **Criado por chat ativo**. Fica fora de **TME** e **TMP** e entra como **Em atendimento** na **Visão geral**.

## TME, TMP e TMA

| Métrica | Começa | Termina | Quando é calculada |
| --- | --- | --- | --- |
| **TME** (Tempo médio de espera) | Criação da sessão | Primeira resposta de membro | Na primeira resposta |
| **TMP** (Tempo médio pós-atribuição) | Primeira atribuição a um membro | Primeira resposta de membro | Na primeira resposta, se já havia membro atribuído |
| **TMA** (Tempo médio de atendimento) | Primeira resposta de membro | Resolução da sessão | A cada resolução, se houve resposta de membro |

O que entra e o que fica fora das médias na [Produtividade](/docs/relatorios/produtividade):

- **TME e TMP:** média das sessões com o tempo calculado, cuja **primeira resposta** ocorreu dentro do período e que **não** foram iniciadas pela equipe.
- **TMA:** média das sessões **resolvidas** dentro do período que tiveram resposta de membro e TMA de **1 minuto ou mais** (sessões resolvidas em menos de 1 minuto ficam fora da média).
- **Tempo com o [bot](/docs/bot/visao-geral):** entra no **TME** (o bot não marca primeira resposta) e fica fora do **TMP** e do **TMA**.
- **Sessão sem resposta de membro:** sessões resolvidas sem nenhuma resposta de membro (por exemplo, atendidas apenas por bot ou agente de IA e resolvidas por automação) não têm TME, TMP nem TMA.
- **Sessão reaberta:** o **TMA** é recalculado na nova resolução, indo da primeira resposta até a última resolução (o intervalo em que ficou resolvida entra no cálculo).
- **Exibição e exportação:** na tela os tempos aparecem em horas e minutos (ex.: `3h 51m`), ou `-` sem dado. Na exportação da Produtividade, as colunas trazem o agrupamento, **Sessões novas**, **Sessões resolvidas**, **TME (min)** e **TMA (min)**.

## Horário comercial

- Definido no workspace (na tela, **ambiente**) em **Configurações** → **Ambiente** → **Geral**, no campo **Horário comercial**, escolhendo um horário cadastrado em **Configurações** → **Ambiente** → **Horários**.
- Quando há um horário escolhido, **TME**, **TMP** e **TMA** contam apenas os minutos dentro desse horário. Sem horário escolhido, contam todos os minutos corridos.
- O cálculo é gravado na sessão no momento da primeira resposta (TME e TMP) e da resolução (TMA), usando o horário vigente naquele momento: alterar o horário comercial depois não recalcula sessões antigas.

## Sessões novas, leads, resolvidas e mensagens

- **Sessões novas:** sessões criadas no período selecionado.
- **Leads:** sessões criadas no período cujo contato foi criado junto com essa sessão (contato novo). Um contato que já existia no workspace e escreve pela primeira vez em outro canal não conta como lead.
- **Sessões resolvidas** (cartão) / **Resolvidas** (coluna): sessões resolvidas no período, mesmo se criadas antes.
- **Mensagens:** soma as mensagens comuns (de membros e de contatos) e as mensagens de bot registradas por dia no período; notas internas não entram. Fora do agrupamento **Por Membro**, passar o mouse mostra a divisão entre membros, bots e contatos. Em **Por Membro**, soma as mensagens de membro das sessões em que ele é o responsável atual.

### Qual data cada coluna usa no agrupamento Por Dia

No agrupamento **Por Dia** da **Produtividade**, cada coluna usa uma data própria no fuso do workspace:

| Coluna | Data usada |
| --- | --- |
| **Sessões novas** e **Leads** | Dia de criação da sessão |
| **TME** e **TMP** | Dia da primeira resposta de membro |
| **TMA** e **Resolvidas** | Dia da resolução |
| **Mensagens** | Dia em que cada mensagem foi registrada |

Por isso, numa mesma data da tabela, colunas diferentes podem se referir a sessões diferentes.

## Por que os números de relatórios diferentes não batem

| Relatório | Unidade contada | Como atribui ao membro ou grupo |
| --- | --- | --- |
| [**Produtividade**](/docs/relatorios/produtividade) e [**Visão geral**](/docs/relatorios/visao-geral) | Sessões | Pelo **responsável atual** da sessão (ou responsável na resolução). Uma sessão transferida ([Atribuir e transferir](/docs/conversas/atribuir-e-transferir)) conta inteira para o último responsável. |
| [**Atribuição**](/docs/relatorios/atribuicao) | Registros de atribuição | Cada vez que a sessão recebe um membro ou grupo (primeira atribuição, atribuição automática, resposta em sessão sem responsável, chat ativo ou transferência). A mesma sessão pode somar várias vezes e o registro permanece depois da transferência. Uma mesma mudança pode somar `1` para o membro e `1` para o grupo. O período compara a data e a hora da atribuição (registros antigos sem hora usam só o dia). |
| [**Interação**](/docs/relatorios/interacao) | Sessões únicas por membro por dia | Toda sessão em que o membro enviou mensagem naquele dia (incluindo nota interna), mesmo sem ser o responsável. Responder a mesma sessão em dois dias soma `1` em cada dia; dois membros na mesma sessão somam `1` para cada um. |

## Período, cache e limites

- **Período padrão** (Produtividade, Atribuição, Interação, Presença e Avaliação): últimos 7 dias, sem hoje (de 7 dias atrás às `00:00` até ontem às `23:59`).
- **Seletor de período:** formato `DD/MM/YYYY HH:mm`, com atalhos **Hoje**, **Ontem**, **Últimos 7 dias**, **Últimos 30 dias**, **Esse mês** e **Mês passado**. Não aceita datas futuras nem datas anteriores a `03/06/2022`. Não há limite máximo de duração no seletor.
- **Cache:** relatórios de períodos que terminam antes de hoje ficam guardados em cache até a meia-noite — alterações feitas hoje em sessões de dias anteriores podem aparecer só no dia seguinte. Períodos que incluem hoje são calculados na hora.
- **Limite de consultas:** trocar filtros ou períodos em sequência muito rápida pode fazer a busca falhar; espere alguns segundos e tente novamente.
- **Linhas especiais nos agrupamentos:** **Sem atribuição** (sem membro), **Sem grupo** (sem grupo), **Sem tag** (sem tag) e `Excluído #id` (membro excluído do ambiente).

## Visão geral

- Mostra apenas sessões abertas agora, de qualquer data, sem seletor de período. Não se atualiza sozinha; clique em **Atualizar** para recarregar.
- **Não atribuído:** sessões abertas sem membro responsável (ao passar o mouse, divide entre **Bot atendendo** e **Sem bot**).
- **Em espera:** sessões abertas sem primeira resposta de membro e não iniciadas pela equipe.
- **Em atendimento:** sessões abertas com primeira resposta de membro ou iniciadas pela equipe.
- **Em espera** + **Em atendimento** = total de sessões abertas.
- **Pendente:** conta todas as sessões abertas de conversas marcadas como pendentes, mesmo quando ainda estão em espera ou sem responsável. As dicas da tela descrevem o indicador de forma mais restrita do que o número que ele mostra.
- **Atribuído:** sessões abertas com membro responsável.
- **Bot:** sessões abertas com bot ativo.

## Atendimento ao vivo e Vendas ao vivo

- **Estados no Atendimento ao vivo:**
  - Com bot: bot ou agente de IA atendendo (área dos robôs).
  - Na fila: sem membro responsável (fila na recepção do grupo, ou **Sem departamento** quando sem grupo).
  - Aguardando: com membro responsável, sem primeira resposta de membro ou marcada como pendente (cor pelo tempo de espera desde que ficou pendente ou, na falta, desde a última mensagem).
  - Vez do contato: membro já respondeu e a conversa não está pendente (cor apagada).
- **Limites de atraso:** usa os dois tempos de **Indicação dinâmica de conversa pendente** (**Configurações** → **Ambiente** → **Geral**) quando ligada; sem ela, padrão de **10 minutos** ("aguardando há mais de") e **20 minutos** ("atrasado").
- **Membros:** online com fone (Kinbox aberta e **Disponível**), em pausa (Kinbox aberta e fora de **Disponível**), mesa sem ninguém/offline (sem a Kinbox aberta).
- **Indicadores no topo:**
  - **Fila** (padrão): `na fila` (com seta de variação na última hora), `aguardando · N atrasado(s)`, `N/M online · N em pausa`.
  - **Tempo médio:** `resolvidas hoje`, `TM 1ª resposta` (TME de hoje; `—` sem dado), `pior espera · N acima do limite`.
  - Quando o copiloto analisa sentimento, pode mostrar também `irritados`/`impacientes`.
- **Limite de sessões:** carrega até as **20.000** sessões abertas mais recentes do workspace; acima disso, as mais antigas ficam fora.
- **Mensagens de erro exatas:**
  - Sem permissão em **Vendas ao vivo:** "Seu perfil não tem acesso aos negócios" / `A Vendas ao vivo mostra os negócios do CRM. Peça a um administrador a permissão "Gerenciar negociações" no seu perfil.` (botão **Abrir Atendimento ao vivo**).
  - Sem WebGL: "Este navegador não consegue mostrar o Ao vivo" / "A tela usa gráficos 3D (WebGL), que estão desligados ou não existem neste aparelho. Tente outro navegador, como o Chrome, ou ative a aceleração de hardware."
  - Erro ao montar: "Não foi possível abrir o Ao vivo" / "Algo deu errado ao montar a tela. Tente de novo; se continuar, avise o suporte." (botões **Tentar de novo** e **Voltar para os relatórios**).
- **Vendas ao vivo:** mostra negociações abertas de um funil por vez, mais as ganhas e perdidas hoje, respeitando o acesso a negociações do papel (o proprietário vê todas). Funis do tipo **Operacional** não entram.
  - Indicadores: ganho no mês (com a meta do mês quando existe meta de vendas cadastrada), `em aberto` (soma das negociações abertas do funil) e `parados · N críticos` (parados há mais de **7 dias** na mesma etapa; críticos há mais de **14 dias**).
  - Símbolos da **Legenda:** caixa = negociação (maior = maior valor), fita dourada = negociação de **R$ 20.000** ou mais, esteira = etapas, pódio = venda ganha, caçamba = perdida, tubo na mesa = progresso da meta do mês do vendedor, coroa = primeiro do ranking do mês.

## Presença

- A Kinbox registra a cada **5 minutos** quais membros estão conectados; cada registro conta 5 minutos online, e quem está desconectado no momento da verificação conta como offline naquele intervalo.
- Mede conexão ativa, não o status **Disponível** nem se o membro está atendendo.
- Histórico retido por **90 dias**; períodos anteriores aparecem vazios.
- Grade de horários (ao clicar no membro ou em **Ver presenças**): cada faixa fica **Online** se houve registro de conexão em pelo menos um intervalo de 5 minutos dentro dela. **Tolerância** define o tamanho da faixa: **5 minutos**, **15 minutos**, **30 minutos** (padrão) ou **1 hora** (salva no navegador). Mensagem de falha ao exportar a grade: "Ocorreu um erro ao exportar os dados".

## Avaliação

- Enviada pela ação **Avaliar atendimento** de uma automação (**Configurações** → **Automações**) usando o bot de avaliação do workspace.
- **Quando não é enviada:** sessão reaberta, sessão já avaliada, workspace sem bot de avaliação, ou sessão em que o contato não enviou nenhuma mensagem.
- **Cálculo da nota:** compara a resposta do contato com o texto das **Opções** (exige semelhança de pelo menos **75%**) e grava a **Nota** (`0` a `5`) da opção correspondente. Vale apenas uma avaliação por sessão.
- **Membro creditado:** responsável pela sessão no momento da resposta; se não houver responsável, o último membro que foi responsável; se a sessão nunca teve membro, a avaliação não é gravada.
- **Agrupamento e período:** entram sessões **resolvidas no período** que têm avaliação (**Por Dia** usa a data da resolução). **Por Membro** usa o membro gravado na avaliação; **Por Grupo**, **Por Tag** e **Por Canal** usam os da sessão. A exportação inclui o agrupamento, **Nota média** e **Avaliadores**.
- **Nota de avaliação pública:** opção em **Configurações** → **Ambiente** → **Geral** ("Mostrar a nota de avaliação de cada membro para os demais nas salas").

## Lista de sessões e opções do filtro Estado

- **Colunas disponíveis em Ver sessões:** **TME** (Criado em → Primeira resposta), **TMP** (Atribuído em → Primeira resposta), **TMA** (o número mede primeira resposta → resolução), **Status** (**Resolvida**, **Não atribuído**, **Em atendimento**, **Esperando atendimento**), **Protocolo**, **Mensagens trocadas**, **Mensagens de bot**, **Mensagens de membro**, **Mensagens de contato**, **Resolvido em**, **Primeira mensagem do membro**, **Reaberto**, **Contato novo**, **Conversa nova**, **Sessão iniciada pelo contato**, **Avaliação**, **Trilha de atribuídos**, **Trilha de grupos**, **Trilha de bots**, **Trilha de autoatribuição**.
- **Critérios em Filtrar:** **Estado**, **Atribuído**, **Grupo**, **Tag**, **Canal**, **Tipo de canal**, **Campanha**, **Bot**, **Atribuição automática**, **Automação**, **Quantidade de atribuições**, **Data de criação da sessão**, **Data de criação da conversa**, além de filtros de contato e campos personalizados (de contato e de sessão).
- **Opções do filtro Estado:** **Aberto**, **Resolvido**, **Não lido**, **Atribuído**, **Não atribuído**, **Em espera**, **Em atendimento**, **Pendente**, **Bot atendendo**, **Sem tags**, **Nunca respondido pelo membro**, **Nunca respondido pelo contato**, **Bloqueado**, **Contato novo**, **Conversa nova**, **Importado**, **Tem agendamento**, **Criado por chat ativo**, **Criado por Google Ads**, **Criado por Meta Ads**, **Tem negócio**.
