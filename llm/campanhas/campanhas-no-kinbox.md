---
title: "Campanhas: uma por canal, versões de canal, erros ao criar e ao enviar"
description: Regras de borda das campanhas da Kinbox, como fila por canal, distribuição entre canais, normalização de números, variáveis, status dos contatos da lista, contagem de respostas e mensagens de erro.
keywords: [campanha regras, fila de campanha, aguardando outra campanha, misturar canais, normalizar números, nono dígito, ddi 55, número internacional campanha, variável vazia, first_name campanha, status do lead, formatação incorreta, duplicado, respondido 96 horas, erro campanha, sem créditos disponíveis, canal desconectado campanha express]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/crm/campaigns/AddCampaign/index.tsx
  - web:src/pages/crm/campaigns/AddCampaign/LeadsSource.tsx
  - web:src/pages/crm/campaigns/AddCampaign/SelectContactsDrawer.tsx
  - web:src/pages/crm/campaigns/AddCampaign/validate-leads.worker.ts
  - web:src/pages/crm/campaigns/ChunkLeadsDrawer.tsx
  - web:src/models/campaignsv2.ts
  - api:src/modules/campaigns/campaigns.service.ts
  - api:src/modules/campaigns/campaigns.consumer.ts
  - api:src/modules/campaigns/chunks/chunk.worker.ts
  - api:src/modules/campaigns/chunks/chunk-message.consumer.ts
  - api:src/shared/utils/helper.ts
  - api:src/modules/reports/session-summary/session-summary.consumer.ts
  - api-v0:server/controllers/CampaignController.js
  - api-v0:server/controllers/SmsController.js
  - api-v0:server/controllers/WbaCloudController.js
codigo:
  - web:src/pages/crm/campaigns/**
  - web:src/models/campaignsv2.ts
  - api:src/modules/campaigns/**
  - api:src/shared/utils/helper.ts
  - api:src/modules/reports/session-summary/session-summary.consumer.ts
  - api-v0:server/controllers/CampaignController.js
  - api-v0:server/controllers/SmsController.js
  - api-v0:server/modules/wabox/WaboxSender.js
verificado_em: 2026-11-26
---

Referência complementar de [Criar uma campanha](/docs/campanhas/campanhas-no-kinbox), [Criar uma campanha por SMS](/docs/campanhas/campanha-de-sms), [Acompanhar os resultados da campanha](/docs/campanhas/acompanhar-resultados) e [Minha campanha não envia ou parou](/docs/campanhas/problemas-comuns).

## Fila por canal e distribuição entre canais

- **Uma campanha por canal principal:** a fila considera o **primeiro canal** escolhido em **Canais de disparo**. Se outra campanha já está em **Enviando mensagens** nesse canal principal, a nova fica em **Aguardando outra campanha** e inicia automaticamente quando a anterior termina, é excluída ou entra em **Aguardando horário**.
- **Canais principais diferentes:** duas campanhas cujo primeiro canal é diferente podem rodar ao mesmo tempo, mesmo que compartilhem canais secundários.
- **Pausar e retomar na fila:** ao **Pausar** uma campanha que tem outra esperando o mesmo canal, a Kinbox exibe a janela **Iniciar campanha** perguntando se deseja iniciar a campanha da fila (botão **Sim**). Clicar em **Resumir** na campanha em **Aguardando outra campanha** não fura a fila enquanto a outra continuar ativa.
- **WhatsApp oficial e SMS:** apenas um canal por campanha.
- **WhatsApp por QR Code:** permite selecionar vários canais do mesmo tipo (todos **Express** ou todos **Clássica**). A cada mensagem, a Kinbox sorteia um dos canais escolhidos que esteja **Conectado**; se nenhum estiver conectado, tenta enviar pelo primeiro canal.
- Para os comportamentos automáticos da conexão **Express** ("digitando..." por 2 segundos e verificação se o número tem WhatsApp antes do envio), consulte [Enviar campanhas pelo QR Code com menos risco de bloqueio](/docs/canais/whatsapp/whatsapp-app/como-fazer-numero-nao-ser-bloqueado-campanhas).

## Canal desconectado durante o envio (só WhatsApp por QR Code na conexão Express)

- Se o canal desconectar durante uma campanha na conexão **Express**, cada mensagem enviada enquanto o canal está desconectado falha na hora (status **Falha**). A campanha não pausa sozinha e não reenvia essas falhas depois, mesmo que os contatos ainda na fila exibam **Aguardando canal conectar**.
- Para evitar perda de envios, clique em **Pausar** assim que notar a desconexão e use **Resumir** depois de reconectar o canal (pausar devolve o lote em andamento para a fila).
- Em campanhas com vários canais **Express**, os canais desconectados são pulados no sorteio e os envios saem pelos canais que continuam conectados.

## Arquivo de upload e normalização de números

- **Formatos e tamanho:** um arquivo `.csv`, `.xls` ou `.xlsx` de até **100 MB** (arquivos maiores são recusados). Planilhas do Excel são convertidas para CSV automaticamente.
- **Quantidade de contatos:** a Kinbox não limita a quantidade de contatos da lista.
- **Separador e estrutura:** não coloque linha de título (toda linha vira um contato e cabeçalho conta como erro). Separe as colunas com **vírgula**: com outro separador (como ponto e vírgula), os contadores **Erros**/**Sucesso** da tela e a **Pré-visualização** podem não bater com o que é enviado. Aspas são removidas apenas do início e do fim da célula, sem suporte a vírgula dentro de célula.
- **Validação e duplicados:** após remover caracteres não numéricos, um número válido tem de **10 a 13 dígitos**. Linhas com erro não recebem a campanha; números repetidos após a normalização recebem uma única vez (na tela, o repetido aparece em **Duplicados** e também em **Sucesso**). Se nenhum número do arquivo for válido, a campanha fica em **Falhou**.
- **Normalizar números do Brasil adicionando o DDI 55 automaticamente quando aplicável** (marcada por padrão):
  - Números iniciados com `+` não são alterados. Números de fora do Brasil precisam sempre começar com `+`; sem `+`, são tratados como brasileiros e ficam incorretos.
  - Número sem `+` com menos de 12 dígitos que não começa com `55` ganha o DDI `55` (exemplo: `11900000001` → `5511900000001`).
  - Número sem `+` com menos de 13 dígitos ganha o dígito `9` após o DDD (vale tanto para celular brasileiro de 12 dígitos com `55` + DDD sem o nono dígito quanto para número fixo brasileiro de 10 dígitos com DDD + 8 dígitos). Para disparar para números fixos brasileiros, desmarque a caixa de normalização e informe o número completo com DDI e DDD.
  - Com a caixa desmarcada, a Kinbox mantém apenas os dígitos informados (ou o número com `+`), sem acrescentar DDI nem nono dígito.

## Fonte Contatos e ordem das colunas

- Ao clicar em **Selecionar** em **Selecionar Sessões**, a Kinbox inclui todas as sessões que correspondem ao filtro (não apenas as da página atual), remove contatos repetidos (cada contato recebe uma única vez) e descarta contatos sem celular válido.
- Ordem das colunas disponíveis como variáveis na fonte **Contatos** (campos vazios viram `-`):
  - `{{1}}`: celular do contato
  - `{{2}}`: **Nome**
  - `{{3}}`: **Criado em**
  - `{{4}}`: **E-mail**
  - `{{5}}`: **Notas**
  - Colunas seguintes: **Importado**, **Contato novo**, **Campanha** e os campos personalizados (primeiro os da sessão, depois os do contato).

## Variáveis, células vazias e chaves de contato

- `{{1}}` é o número do contato; `{{2}}`, `{{3}}`... são as colunas seguintes. O botão **Chaves reservadas** lista **Coluna 1** a **Coluna 5**, mas variáveis acima de `{{5}}` (como `{{6}}`) digitadas à mão também funcionam.
- Na lista de contatos de uma campanha aberta, a 1ª coluna aparece em **Número**, portanto **Coluna 1** na lista exibe a 2ª coluna do arquivo (`{{2}}`).
- **Célula vazia (ou número de coluna inexistente):**
  - **Só no WhatsApp por QR Code e no SMS:** a variável sai como o próprio número da coluna (por exemplo, `Olá {{2}}` vira `Olá 2`), o mesmo que ocorre na **Pré-visualização** sem arquivo.
  - **Só no WhatsApp oficial:** a célula vazia é substituída por texto vazio.
- **Chaves de contato (`{{first_name}}`, `{{email}}`, campos personalizados por nome):** não funcionam em campanhas. No WhatsApp por QR Code e no SMS, a **Frase aleatória** converte `{{palavra}}` em `palavra` (por exemplo, `Olá first_name`); no WhatsApp oficial, a chave vai literal para o contato (`{{email}}`, `{{first_name}}`). Use sempre o número da coluna (`{{2}}`, `{{4}}`...).

## Regras específicas do SMS

- Cada SMS enviado consome **1 crédito de SMS** no momento do envio.
- Se a mensagem ultrapassar 160 caracteres após a substituição das variáveis, a Kinbox corta o texto em **160 caracteres**.
- Se os créditos acabarem durante o envio, as mensagens seguintes ficam em **Falha** com `"Sem créditos disponíveis"` em **Detalhes** e a campanha continua até o fim da lista sem pausar; falhas não são reenviadas.
- Outros erros por contato no SMS: `"Mensagem inválida, número inválido ou você não tem permissão para enviar SMS para este número"` e `"Você atingiu o limite de envio de SMS por minuto"`.

## Status da campanha e dos contatos da lista

### Status da campanha

| Rótulo na tela | Dica / significado |
| --- | --- |
| **Processando** | Lendo o arquivo e montando os lotes. |
| **Agendado** | "Início de campanha agendada para `{data}`" |
| **Enviando mensagens** | "Enviando mensagens do lote" |
| **Aguardando lote** | "Aguardando tempo para próximo lote" |
| **Aguardando horário** | "Início de campanha agendada para `{data}`" |
| **Aguardando outra campanha** | "Somente uma campanha pode ser executada por vez no mesmo canal" |
| **Pausado** | "Campanha pausada pelo membro" |
| **Falhou** | Nenhum número válido na lista ou erro ao ler o arquivo. |
| ✓ verde | "Campanha concluída" |
| Selo **Canal desconectado** | Canal principal desconectado no momento atual (na lista aparece em campanhas em **Enviando mensagens** ou concluídas; no painel da campanha aparece sempre que o canal principal está desconectado). |

### Status dos contatos da lista

| Rótulo na tela | Significado |
| --- | --- |
| **Pronto** | Contato preparado para envio. |
| **Aguardando envio** | Na fila para ser disparado. |
| **Aguardando canal conectar** | Na fila enquanto o canal principal está desconectado no momento. |
| **Enviado** | Envio realizado ao canal. |
| **Recebido** | Recebimento confirmado. |
| **Lido** | Leitura confirmada. |
| **Respondido** | Contato respondeu dentro da regra de rastreamento. |
| **Falha** | Falha no envio (motivo em **Detalhes**). |
| **Duplicado** | Número repetido na lista (descartado para evitar envio duplo). |
| **Formatação incorreta** | Número inválido na validação da lista. |

## Regra do Respondido

- **Respondido** conta apenas respostas que abrem uma **sessão nova** pelo **canal principal** da campanha em até **96 horas** após o início do lote daquele contato.
- Respostas em uma conversa que já estava aberta, respostas depois de 96 horas ou respostas por um canal secundário (em campanhas com vários canais de WhatsApp por QR Code) não entram em **Respondido**.
- Ao clicar no cartão **Respondido**, a tela abre as sessões filtradas pela campanha e pelo canal principal.
- Quando a resposta é contabilizada, a conversa recebe o cartão **Campanha** (posicionado 30 segundos antes da resposta) com o texto original da campanha, sem variáveis e frases aleatórias preenchidas.

## Mensagens de erro ao criar, controlar e enviar

| Mensagem exata | Quando ocorre |
| --- | --- |
| `"O canal de disparo escolhido está desconectado."` | Ao criar com canal principal de WhatsApp (QR Code ou oficial) fora do status **Conectado**. |
| `"Necessário recriar esse canal para usar as campanhas."` | Ao criar com canal de WhatsApp por QR Code na conexão **Clássica** criado ou recriado até 27/01/2024. |
| `"Você não tem permissão para criar campanhas de WhatsApp."` | Ao criar campanha de WhatsApp com a restrição **Proibir criar campanha de WhatsApp** ativa no papel (não se aplica ao **proprietário**). |
| `"Mensagem de SMS não pode conter mais de 160 caracteres."` | Ao criar campanha de SMS com texto acima de 160 caracteres. |
| `"Mensagem não pode conter emojis."` | Ao criar campanha de SMS contendo emojis. |
| `"Necessário escolher um anexo"` | Ao criar campanha de WhatsApp oficial com template de mídia no cabeçalho sem arquivo selecionado. |
| `"Sem saldo de créditos SMS suficiente."` | Ao criar campanha de SMS quando o workspace não tem nenhum crédito de SMS disponível. |
| `"Canal de disparo não encontrado."` | Ao criar campanha de SMS quando o canal escolhido não é encontrado. |
| `"Não é possível misturar canais de versões diferentes na mesma campanha."` | Ao criar campanha de WhatsApp por QR Code misturando canais **Express** e **Clássica** (por exemplo, pela API). |
| `"Campanha não encontrada."` | Ao tentar excluir uma campanha que não existe. |
| `"Campanha não está pausada ou esperando outra campanha."` | Ao tentar usar **Resumir** em campanha fora dos status **Pausado** e **Aguardando outra campanha**. |
| `"Sem créditos disponíveis"` | Em **Detalhes** de um contato (só no SMS), quando os créditos acabam durante o disparo. |
| `"Mensagem inválida, número inválido ou você não tem permissão para enviar SMS para este número"` | Em **Detalhes** de um contato (só no SMS). |
| `"Você atingiu o limite de envio de SMS por minuto"` | Em **Detalhes** de um contato (só no SMS). |
| `"{código} - {mensagem da Meta}"` ou `"Falha interna ao enviar a mensagem"` | Em **Detalhes** de um contato (só no WhatsApp oficial), quando a Meta recusa o envio ou há falha interna. Veja [Problemas ao conectar ou enviar pelo WhatsApp oficial](/docs/canais/whatsapp/whatsapp-cloud-api/problemas-comuns). |

## API pública

Os endpoints em `/v1/campaigns` permitem criar, listar, pausar, retomar, excluir e consultar leads de campanhas pela API. Veja [Criar uma campanha (API)](/api-reference/campaigns/create-a-campaign).
