---
title: "Cenários: limites de loop e split, busca de negócios, logs de 60 dias e operações"
description: Detalhes dos cenários para consulta — limites do Loop, do Split e da busca de negócios, respostas do webhook de entrada, variáveis, mensagens de erro das execuções, operações e retenção de 60 dias.
keywords: [limite de iterações, limite de loop excedido, split, buscar negócio 500, variáveis do cenário, erro no cenário, operações consumidas, histórico 60 dias, webhook resposta 404]
publico: llm
tipo: referencia
fontes:
  - api:src/modules/workflows/workflow.consumer.ts
  - api:src/modules/workflows/entities/utils.workflow.ts
  - api:src/modules/workflows/entities/deal/deal.workflow.ts
  - api:src/modules/workflows/executions/workflow-log.schema.ts
  - api:src/modules/webhooks/webhooks.service.ts
  - web:src/pages/settings/workflows/workflow.defs.tsx
codigo:
  - web:src/pages/settings/workflows/**
  - web:src/components-old/forms/InputVariable/**
  - api:src/modules/workflows/**
  - api:src/modules/webhooks/**
  - api:src/modules/campaigns/**
  - api-v0:server/services/WorkflowService.js
verificado_em: 2026-11-26
---

Complemento técnico de [Gatilhos e ações dos cenários](/docs/cenarios/gatilhos-e-acoes). Ver, criar e editar cenários exige a permissão **Cenários** (ou ser o proprietário).

## Ligado, publicado e execuções em andamento

- Um cenário só roda **ligado e publicado**.
- No editor, **Publicar** grava nome, gatilho, passos e o interruptor do topo. Mexer no interruptor do editor só passa a valer depois de clicar em **Publicar**. O selo **Live** ou **Inativo** ao lado do interruptor aparece apenas quando o cenário tem pelo menos um gatilho e reflete sempre o estado já gravado.
- Na lista **Cenários**, o interruptor da linha só aparece quando o cenário tem pelo menos um gatilho e grava na hora, sem precisar publicar.
- Alterações no editor só entram em vigor após clicar em **Publicar**. Sair com mudanças pendentes mostra: `"Você tem mudanças não salvas, tem certeza que deseja fechar?"`. O histórico de desfazer e refazer no editor guarda até **30** passos.
- No celular, o editor não exibe **Publicar** nem **Analítico**.
- Desligar um cenário impede novas execuções e remove gatilhos e agendamentos ativos, mas **não interrompe** execuções que já começaram (inclusive as que estão em **Esperar um tempo**). Execuções em andamento passam a usar os passos da nova versão assim que você publica.

## Operações

- Uma execução concluída registra **1 operação por passo executado**.
- Se um passo falhar, a execução registra os passos que rodaram (incluindo o que falhou) **mais 1**.
- Passos dentro de um **Loop sobre itens da lista** contam novamente a cada item processado.
- O consumo aparece na coluna e no total **Operações** no **Analítico** e na variável **Operações consumidas**.
- Operações servem para acompanhar o tamanho das execuções e **não descontam saldo da carteira**. A única funcionalidade do editor que usa saldo da carteira é o botão **Corrigir e formatar com IA** no corpo da **Requisição HTTP** (sem saldo suficiente, aparece `"Você não tem créditos suficientes para usar essa funcionalidade."`).

## Histórico e Analítico

- O histórico de execuções fica guardado por **60 dias**. O filtro **Período** do **Analítico** mostra no máximo os **Últimos 30 dias** (**Hoje**, **Últimos 7 dias**, **Últimos 15 dias**, **Últimos 30 dias**).
- Os totais de dias anteriores são fechados uma vez por dia; os números de **Hoje** são contabilizados na hora.
- Quando não há execuções no filtro, o painel mostra: `"Parece que você ainda não adicionou nenhum registro..."`.
- Uma execução nos status **Executando** ou **Pendente** parada há mais de **1 hora** sem avançar (sem estar em espera) pode ser marcada como **Falhou** na verificação diária, com a mensagem `"Execução travou por mais de uma hora."`.
- Os dados do gatilho e dos passos de uma execução ficam guardados por até **31 dias** a partir do início. Um passo que roda depois disso (por exemplo, após um **Esperar um tempo** longo) não encontra mais esses dados: referências e variáveis do gatilho e de passos anteriores chegam vazias, e o passo pode falhar.
- **Exportar** (**CSV** ou **XLSX**) gera o arquivo `relatorio_execucoes_<id do cenário>` com as execuções do período e status filtrados. Colunas exportadas: **ID**, **Status**, **Data de início**, **Data de término**, **Duração** (em ms), **Operações consumidas**, **Ações executadas** (números dos passos, ex.: `1 > 2 > 3`), **Tipo de gatilho**, **Dados recebidos** e **Erro**. Se a exportação falhar, aparece `"Ocorreu um erro ao exportar os dados"`.

## Webhook recebido

- Recebe requisições apenas com método **POST** e corpo em **JSON** (`Content-Type: application/json`), sem token nem cabeçalho de autenticação. Parâmetros de URL chegam em **Query**.
- Tamanho máximo do corpo: **20 MB**.
- Com o cenário ligado e publicado, enviar uma amostra enquanto a janela **Webhook de Recebimento** está aberta também inicia uma execução real do cenário.

| Situação | Resposta do endereço |
| --- | --- |
| Cenário ligado e publicado | `{"success": true}` na hora; o cenário roda em seguida por conta própria (a resposta não contém o resultado dos passos). |
| Cenário desligado ou ainda não publicado, com a janela **Webhook de Recebimento** aberta | `success: false` com a mensagem `"Estrutura determinada mas cenário não foi publicado ainda."` |
| Cenário desligado, excluído, gatilho trocado ou endereço incorreto, com a janela **Webhook de Recebimento** fechada | Erro **404** (`"Inbound Webhook not found"`). |

- Variáveis do grupo **Webhook**:
  - **Url**: URL do webhook de recebimento.
  - **Query**: parâmetros de query da URL do webhook.
  - **Body**: payload recebido no corpo do webhook.
  - **Origem**: domínio de origem vindo do cabeçalho `Origin` (geralmente preenchido por navegadores e vazio em chamadas servidor-a-servidor).

## Agendamento cíclico

- **Periodicidade**: **Diária** (padrão ao adicionar: 09:00), **Semanal** (**Dia da semana**: Domingo a Sábado), **Mensal** (**Dia do mês**: 1 a 31) e **Cron customizado**.
- **Horário de execução**: hora (`00`–`23`) e minuto (`00`–`59`).
- **Cron customizado**: campo **Expressão cron** com 5 campos (`minuto hora dia-mês mês dia-semana`), intervalo mínimo de 1 minuto (exemplo: `*/15 * * * *`). Mensagens de validação: `"Informe uma expressão cron."` e `"Expressão deve ter 5 campos: minuto hora dia-mês mês dia-semana."`.
- O horário segue o [**Fuso horário**](/docs/configuracoes-no-workspace/configuracoes-gerais#preferências) do workspace, no cartão **Preferências** de **Configurações** → **Ambiente** → **Geral** (padrão `America/Sao_Paulo` quando não definido).
- Na periodicidade **Mensal**, escolher dia 29, 30 ou 31 faz o cenário rodar apenas nos meses que possuem esse dia.
- O agendamento só existe enquanto o cenário está ligado e publicado; desligar remove o próximo disparo.
- Variáveis do grupo **Agendamento cíclico**: **Data do disparo**, **Periodicidade**, **Hora configurada**, **Minuto configurado**, **Dia da semana**, **Dia do mês**, **Expressão cron**.

## Mensagem de campanha enviada e Nova Sessão

- **Mensagem de campanha enviada**: dispara uma execução por destinatário para cada mensagem de campanha enviada pelo canal escolhido (canal obrigatório). Variáveis do grupo **Campanha**: **Telefone do lead**, **ID** (da campanha), **Texto** (da mensagem).
- **Nova Sessão**: dispara a cada sessão nova nos canais escolhidos (se **Canais** ficar vazio, vale para **Todos os canais**). Usa o mesmo evento de nova conversa ou sessão das **Automações** e entrega a referência **Conversa #trigger**.

## Saídas não ligadas

Quando uma saída extra não tem caminho ligado a outro passo, o resultado depende da ação:

| Passo e situação | Resultado da execução |
| --- | --- |
| **Buscar conversa** sem resultado | **Falhou** com `"Conversa não encontrada."` |
| **Criar conversa** com erro | **Falhou** com `"Erro ao criar conversa."` |
| **Buscar contato** sem resultado | **Concluído** (**Executado**), encerrando ali |
| **Buscar negócio** sem resultado (ou lista vazia em **Todos por funil**) | **Concluído** (**Executado**), encerrando ali |
| **Buscar produto** sem resultado | **Concluído** (**Executado**), encerrando ali |
| **Decisão** = **Não** | **Concluído** (**Executado**), encerrando ali |
| **Atribuir para membro** sem membro elegível (tipos **Membro**, **Cíclico** e **Último membro que atendeu a conversa**; **Cíclico com fila** não tem essa saída) | **Concluído** (**Executado**), encerrando ali |

## Limite de repetição fora do Loop

Fora de um **Loop sobre itens da lista**, o mesmo passo pode rodar no máximo **6 vezes** na mesma execução (por exemplo, quando um caminho volta para um passo anterior). Na 7ª repetição, a execução falha com `"Limite de loop excedido."`. Dentro de um **Loop**, esse limite conta por item.

## Ações: regras e mensagens

### Conversa

- **Buscar conversa**: apenas canais de WhatsApp. Busca pelo **ID** ou pelo par contato + canal. Erros: `"Necessário informar id da conversa ou id do contato para buscar conversa."`, `"Canal não informado para criação de conversa."`, `"Conversa não encontrada."`.
- **Criar conversa**: apenas canais de WhatsApp. Registra a mensagem de sistema `"Conversa criada via Cenário"`. Telefone do contato com tamanho inválido causa falha e segue pela saída **Em caso de falha** (se ligada) ou falha a execução com `"Erro ao criar conversa."`. Sem contato: `"Contato #<n> não encontrado."`.
- **Resolver conversa**: resolve a conversa com origem `"Cenário"`.
- **Executar bot**: roda o bot mesmo que ele esteja desligado; com **Reabrir conversa** marcada, reabre conversas encerradas. Sem bot: `"Bot não informado."`.
- **Enviar mensagem**: apenas canais de WhatsApp (o campo **Canal** fica travado quando a conversa escolhida já define um único canal). No WhatsApp oficial exige **Template oficial** (**Modelo de mensagem** aprovado); no WhatsApp por QR Code usa **Texto livre**. A mensagem sai como mensagem de bot. Se o envio falhar, a execução falha com a mensagem do erro ou `"Erro ao enviar mensagem."`. Outros erros: `"Template não informado para envio de mensagem."`, `"Mensagem não informada para envio."`, `"Canal não informado para envio de mensagem."`.
- **Atribuir para membro**:
  - **Cíclico**: distribui em rodízio entre membros ou grupos participantes que caibam na **Capacidade** configurada (`0` ou vazio = sem limite de conversas abertas).
  - **Cíclico com fila**: põe a conversa numa fila até alguém ter vaga, verificando a cada **30 segundos**; o cenário segue para o próximo passo logo depois de colocar a conversa na fila (não aguarda a atribuição). Esse tipo não tem a saída **Nenhum membro elegível**.
  - **Último membro que atendeu a conversa**: busca o último membro das sessões anteriores dessa conversa.
  - **Condições de elegibilidade** (**Membro deve estar disponível**, **Membro deve estar online**) aplicam-se a **Membro**, **Cíclico**, **Cíclico com fila** e **Último membro que atendeu a conversa**.

### Contato

- **Buscar contato**: normaliza o número de celular antes de consultar. Quando mais de um campo (**ID**, **Celular**, **E-mail**) é preenchido, o contato precisa corresponder a **todos os preenchidos**. Nenhum campo informado: `"Necessário informar id, número de telefone ou email para buscar contato."`.
- **Criar contato**: se já existir um contato com o mesmo telefone, reaproveita esse contato em vez de criar outro (não deduplica por e-mail). Campos vazios são ignorados.
- **Atualizar contato**: sem contato referenciado, falha com `"Necessário informar id do contato para atualizar."`.

### Negócio

As ações de negócio agem sobre as negociações dos funis (veja [Funis e negociações: visão geral](/docs/crm/visao-geral)).

- **Buscar negócio**:
  - **Um negócio**: exige ID, contato ou conversa (`"Necessário informar id ou contato ou conversa para buscar negócio."`).
  - **Todos por funil**: exige **Funil** (`"Necessário informar funil para buscar negócios."`). Retorna até **500** negociações do funil, ordenadas das mais novas para as mais antigas. Campos do resultado: `data` (lista para o **Loop**), `totalCount`, `count` e `truncated`. Lista vazia segue pela saída **Não encontrado**.
- **Criar negócio**: **Funil** e **Etapa** obrigatórios; precisa de nome ou contato (`"Necessário informar nome do negócio ou contato."`).
- **Atualizar negócio**: sem negociação referenciada, falha com `"Negócio não encontrado."`.

### Produto

As ações de produto usam o cadastro de produtos (veja [Cadastrar produtos](/docs/crm/criar-e-gerenciar-produtos)).

- **Buscar produto**: exige **ID** ou **ID Externo** (`"Necessário informar id ou id externo para buscar produto."`).
- **Criar produto**: **Nome** obrigatório (`"Necessário informar nome do produto."`); grava **Nome**, **ID Externo**, **Descrição** e **Preço**.
- **Atualizar produto**: altera **Nome**, **ID Externo**, **Preço** e campos personalizados. O campo **Descrição** aparece na lista de **Campos**, mas este passo não altera a descrição do produto. Sem produto referenciado: `"Produto não encontrado."`.

### Controle

- **Requisição HTTP**: aceita apenas URLs `https://`. Tamanho máximo da resposta: **50 MB**. Se o sistema externo responder com erro ou não responder, o cenário **segue** para o próximo passo sem os campos da resposta (a execução não falha por isso). Erros que fazem falhar: `"URL ou método não setado."` e `"Erro ao parsear o corpo da requisição."` (quando o JSON do **Body** fica inválido após a substituição das variáveis).
- **Esperar um tempo**: sem duração ou unidade, falha com `"Duração ou unidade não setada."`. Durante a pausa, a execução fica em **Aguardando** (no detalhe: `"Aguardando delay..."`).
- **Decisão**: 10 operadores (**é igual a**, **não é igual a**, **é maior que**, **é menor que**, **contém**, **não contém**, **é vazio**, **não é vazio**, **começa com**, **não começa com**). A comparação **diferencia maiúsculas de minúsculas**. Sem campo ou operador: `"Faltando campo ou operador."`.
- **Loop sobre itens da lista**:
  - **Limite máximo de repetições**: de 1 a **1000** (padrão **300**). Se a lista tiver mais itens que o limite, a execução **falha** com `"Limite máximo de iterações excedido."`.
  - **Tamanho do lote**: de 1 a **500** (padrão **50**).
  - Outros erros: `"Lista do loop não configurada."` e `"A variável da lista não retornou uma lista."`.
- **Split**: **Quantidade de saídas** de 2 a 10. O revezamento (`1, 2, 3, 1…`) continua de uma execução para a outra no mesmo passo. Saídas sem caminho não recebem execuções; se nenhuma saída estiver ligada, falha com `"Nenhuma saída do Split está ligada."`.

## Variáveis

- **Sistema** (disponíveis em qualquer cenário):
  - **Ambiente**: **ID**, **Nome**.
  - **Cenário**: **ID**, **Data da execução**, **Operações consumidas**.
  - **Utils**: **uuid**, **Agora**, **Timestamp**, **Aleatório**.
- **Conversa** (**Conversa #…**): **ID**, **Criado em**, **$json** (a conversa inteira), **ID da sessão**, **Protocolo**, **Atribuído**, **Grupo**, **Canal**, **Veio de anúncio Meta**, **ID do anúncio Meta**.
- **Contato** (**Contato #…**): **ID**, **Nome**, **Telefone**, **E-mail**, **Origem**, **Criado em**, **ID Externo**, **Tem conversas**, **Foi importado**, **É novo**, **É privado**, **Notas**, **$json**.
- **Negócio** (**Negócio #…**): **ID**, **Criado em**, **$json**, **Status do negócio**, **Negócio ganho**, **Negócio perdido**, **Negócio em andamento**, **Valor do negócio**, **Etapa do negócio**, **Funil do negócio**.
- **Produto** (**Produto #…**): **ID do produto**, **Criado em**, **$json**, **Nome**, **ID Externo**, **Preço**, **Descrição**.
- **Requisição HTTP**: **$json** (contexto da requisição HTTP, incluindo a entrada enviada e os campos retornados pela API; quando a resposta é texto, fica em `response`).
- **Loop sobre itens da lista**: **$item** (item atual do loop), **Índice** (começa em 0), **Iteração**, **Total**, **Processados**, **Concluído**, **Cursor**.

## Mensagens de falha no Analítico

| Mensagem | Causa |
| --- | --- |
| `Ação não encontrada.` | O cenário foi excluído, ou publicado sem nenhum passo, enquanto a execução estava em andamento. (Apagar só um passo faz a execução terminar no passo anterior, como **Executado**.) |
| `Limite de loop excedido.` | Um mesmo passo rodou mais de 6 vezes na mesma execução fora de um **Loop**. |
| `Limite máximo de iterações excedido.` | A lista do **Loop sobre itens da lista** excedeu o **Limite máximo de repetições** configurado. |
| `Lista do loop não configurada.` | Campo **Lista** do **Loop sobre itens da lista** está vazio. |
| `A variável da lista não retornou uma lista.` | O campo informado em **Lista** do **Loop** não contém uma lista. |
| `Nenhuma saída do Split está ligada.` | Passo **Split** sem nenhum caminho conectado. |
| `Execução travou por mais de uma hora.` | Execução em **Executando** ou **Pendente** ficou mais de 1 hora sem avançar e foi marcada como **Falhou** na verificação diária. |
| `Conversa não encontrada.` | **Buscar conversa** sem resultado e sem caminho na saída **Não encontrado**. |
| `Erro ao criar conversa.` | **Criar conversa** falhou (ex.: telefone inválido) sem caminho na saída **Em caso de falha**. |
| `Erro ao enviar mensagem.` | **Enviar mensagem** falhou sem mensagem mais específica. |
| `Necessário informar id da conversa ou id do contato para buscar conversa.` | **Buscar conversa** sem ID da conversa e sem contato. |
| `Canal não informado para criação de conversa.` | **Buscar conversa** ou **Criar conversa** sem canal informado. |
| `Contato #<n> não encontrado.` | Referência de contato inexistente ao criar conversa. |
| `Bot não informado.` | **Executar bot** sem bot selecionado. |
| `Template não informado para envio de mensagem.` | **Enviar mensagem** em WhatsApp oficial sem **Modelo de mensagem**. |
| `Mensagem não informada para envio.` | **Enviar mensagem** em WhatsApp por QR Code sem texto. |
| `Canal não informado para envio de mensagem.` | **Enviar mensagem** sem canal definido. |
| `Necessário informar id, número de telefone ou email para buscar contato.` | **Buscar contato** sem nenhum campo preenchido. |
| `Necessário informar id do contato para atualizar.` | **Atualizar contato** sem referência de contato. |
| `Necessário informar id ou contato ou conversa para buscar negócio.` | **Buscar negócio** (**Um negócio**) sem ID, contato nem conversa. |
| `Necessário informar funil para buscar negócios.` | **Buscar negócio** (**Todos por funil**) sem funil selecionado. |
| `Necessário informar nome do negócio ou contato.` | **Criar negócio** sem nome e sem contato. |
| `Negócio não encontrado.` | **Atualizar negócio** sem negociação referenciada. |
| `Necessário informar id ou id externo para buscar produto.` | **Buscar produto** sem ID e sem ID externo. |
| `Necessário informar nome do produto.` | **Criar produto** sem nome. |
| `Produto não encontrado.` | **Atualizar produto** sem produto referenciado. |
| `URL ou método não setado.` | **Requisição HTTP** sem **Endereço URL** ou sem **Método**. |
| `Erro ao parsear o corpo da requisição.` | **Body** da **Requisição HTTP** gerou JSON inválido após substituir variáveis. |
| `Duração ou unidade não setada.` | **Esperar um tempo** sem **Duração** ou **Unidade**. |
| `Faltando campo ou operador.` | **Decisão** sem **Campo** ou **Operador**. |
