---
title: "Importação de negociações: colunas, valores aceitos, reverter e erros"
description: Regras da importação de negociações por planilha na Kinbox — colunas e cabeçalhos reconhecidos, valores aceitos de status, etapa, valor e datas, contatos novos e existentes, erros por linha, histórico, cancelar e reverter.
keywords: [importar negociações regras, colunas da importação, status aberto ganho perdido, etapa não encontrada, valor da negociação na planilha, data na planilha, contato existente na importação, erros de importação, histórico de importações, reverter importação, cancelar importação, mapeamento de tags]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/crm/deals/ImportDeals/**
  - api:src/modules/deal-imports/**
codigo:
  - web:src/pages/crm/deals/ImportDeals/**
  - web:src/pages/settings/pipelines/wizard/PipelineImportStep.tsx
  - api:src/modules/deal-imports/**
verificado_em: 2026-11-26
---

Detalhes de referência de [Importar negociações](/docs/crm/importar-negociacoes). Veja também [Ações em lote no funil](/docs/crm/acoes-em-lote), [Criar um funil e as etapas](/docs/crm/criar-funil-de-vendas) e [Cadências: tarefas automáticas por etapa](/docs/crm/cadencias).

## Permissões e onde aparece

- **Permissão:** exige **Gerenciar negociações** ou ser o proprietário do workspace.
- **Pelo quadro do funil:** menu **⋯** → **Importar** (aparece apenas com um funil aberto, no computador e no layout atual). Não possui botão de planilha modelo; o botão **Histórico** fica no topo dessa tela.
- **Pela criação de funil:** último passo **Importe suas negociações** (no **Funil Operacional**, **Importe seus tickets**), disponível apenas ao criar um funil para quem tem **Funis** e **Gerenciar negociações**. É o único local com o botão **Baixar modelo** (**CSV** ou **XLSX**). O cartão de resultado tem **Ver detalhes**, que abre o detalhe da importação.
- **Colunas do modelo baixado** (somente cabeçalho, sem linhas de exemplo, seguidas dos campos personalizados de negociação):
  - **Funil Comercial:** Nome da negociação, Valor, Descrição, Nome do contato, Telefone do contato, E-mail do contato, Status (open/won/lost), Data de fechamento, Data de ganho/perda, Tags, Etapa, Responsável, Grupo.
  - **Funil Operacional:** Título do ticket, Descrição, Nome do contato, Telefone do contato, E-mail do contato, Status (open/won/lost), Prazo, Data de conclusão/não resolução, Tags, Etapa, Responsável, Grupo.
- **Avisos do passo no assistente:** `"Salve o funil antes de importar."`, `"Configure pelo menos uma etapa antes de importar."`, `"Salve o funil antes de baixar o modelo."`, `"Configure pelo menos uma etapa antes de baixar o modelo."`, `"Modelo CSV baixado."` e `"Modelo XLSX baixado."`.

## Regras do arquivo

- **Formatos aceitos:** `.csv` (UTF-8, separado por vírgula ou ponto e vírgula) ou `.xlsx` (lê apenas a **primeira aba**). Um arquivo por vez.
- **Tamanho máximo:** **10 MB** (`"O tamanho do arquivo é maior que o permitido. O Máximo é 10MB."`). Não há limite fixo de linhas além dos 10 MB.
- **Cabeçalho e linhas vazias:** primeira linha é o cabeçalho; colunas sem título e linhas vazias são ignoradas. Evite espaços sobrando no início ou no fim dos títulos das colunas.
- **Prévia:** exibe até 10 linhas e a contagem total de linhas e colunas encontradas.
- **Erros ao ler o arquivo:** `"O arquivo não contém dados para importar."` e `"Erro ao processar o arquivo. Verifique se o formato está correto."`.

## Campos e cabeçalhos reconhecidos

Embora **Nome da negociação** (ou **Título do ticket**) e **Nome do contato** exibam `*` na tela, é suficiente mapear **um dos dois** para avançar (`"Por favor, mapeie: Nome do negócio ou Nome do contato"`; no **Funil Operacional**, `"Por favor, mapeie: Título do ticket ou Nome do contato"`). Telefone e e-mail não são obrigatórios no mapeamento.

No mapeamento automático, a Kinbox compara o título da coluna (ignorando acentos, maiúsculas, espaços, `_` e `-`) com os termos abaixo (por igualdade ou parte do nome). Confira sempre todas as associações antes de avançar — especialmente **Nome do contato**, **Telefone do contato** e **E-mail do contato**. Campos personalizados de negociação casam por igualdade pelo nome ou pela chave do campo.

| Campo (Comercial / Operacional) | Termos reconhecidos no mapeamento automático |
| --- | --- |
| **Nome da negociação** / **Título do ticket** | `name`, `nome`, `titulo`, `title`, `deal`, `negocio`, `negociação`, `deal_name`, `nome_negocio`, `nome da negociação`, `registro`, `nome do registro`, `ticket`, `atendimento` |
| **Valor** *(só comercial)* | `value`, `valor`, `preco`, `price`, `amount`, `total`, `montante` |
| **Descrição** | `description`, `descricao`, `descrição`, `detalhes`, `details`, `observacao`, `observacoes`, `observação`, `notes`, `notas` |
| **Nome do contato** | `contact`, `contato`, `cliente`, `customer`, `contact_name`, `nome_contato`, `nome_cliente`, `client`, `lead` |
| **Telefone do contato** | `phone`, `telefone`, `cel`, `celular`, `mobile`, `tel`, `whatsapp`, `fone`, `contact_phone`, `telefone_contato` |
| **E-mail do contato** | `email`, `e-mail`, `mail`, `correio`, `contact_email`, `email_contato` |
| **Status (open/won/lost)** | `status`, `situacao`, `estado`, `state`, `resultado`, `result` |
| **Data de fechamento** / **Prazo** | `due_date`, `data_previsao`, `previsao`, `deadline`, `vencimento`, `data de vencimento`, `data_vencimento`, `fechamento`, `prazo` |
| **Data de ganho/perda** / **Data de conclusão/não resolução** | `won_lost_date`, `data_ganho`, `data_perda`, `data_fechamento`, `data de ganho/perda`, `data_conclusao`, `won_date`, `lost_date`, `close_date`, `closed_at` |
| **Tags (separadas por vírgula)** | `tags`, `tag`, `etiquetas`, `etiqueta`, `labels`, `label`, `marcadores`, `marcador` |
| **Etapa** | `stage`, `etapa`, `fase`, `estagio` |
| **Responsável** | `operator`, `responsavel`, `vendedor`, `seller`, `agent`, `agente`, `atendente` |
| **Grupo** | `group`, `grupo`, `team`, `equipe`, `time` |

## Valores aceitos por coluna

| Coluna | Como é lida | Se vazia ou inválida |
| --- | --- | --- |
| **Nome da negociação** / **Nome do contato** | Se apenas um vier preenchido na linha, o mesmo texto preenche os dois. | Se ambos vierem vazios na linha, cria o contato `Contato Importado` e a negociação `Negócio - Contato Importado`. |
| **Telefone do contato** | Números sem `+` recebem normalização brasileira (DDI 55 e nono dígito quando aplicável); números de outros países devem começar com `+` e o código do país. Formate como texto no CSV ou use `.xlsx`. | Telefone com menos de 8 dígitos é descartado; sem telefone e sem e-mail, cria um novo contato a cada linha. |
| **E-mail do contato** | Sem validação de formato; comparado sem diferenciar maiúsculas. | Vazio não impede a importação. |
| **Etapa** | Nome exato da etapa do funil (insensível a maiúsculas, ignora espaços nas pontas) ou código da etapa. | Vazia ou não mapeada entra na primeira etapa do funil. Valor inexistente gera erro na linha: `Etapa não encontrada: "<valor>"`. |
| **Status (open/won/lost)** | Escreva `aberto`, `ganho` ou `perdido` (também aceita os termos em inglês do rótulo; insensível a maiúsculas). No **Funil Operacional**, `ganho` marca como **Resolvido** e `perdido` como **Não resolvido**. | Vazia ou qualquer outro texto (como `resolvido` ou `vendido`) entra como **Aberto**, sem aviso. Negociações importadas como ganhas ou perdidas ficam sem motivo. |
| **Valor** *(só comercial)* | No CSV, apenas números com ponto para centavos (ex.: `1500.50`), sem `R$` nem ponto de milhar. No `.xlsx`, célula numérica. | No **Funil Operacional**, o valor é sempre `0`. |
| **Data de fechamento** / **Prazo** | Previsão de fechamento (no **Funil Operacional**, **Prazo** também grava a previsão de fechamento, não o prazo de SLA; o SLA não é importado). No CSV, use `DD/MM/AAAA` com dois dígitos para dia e mês (datas com um dígito, como `1/2/2026`, podem ser lidas como mês/dia). No `.xlsx`, células no formato de data são convertidas automaticamente. | Data inválida faz a linha dar erro. |
| **Data de ganho/perda** / **Data de conclusão/não resolução** | Gravada apenas quando o status da linha é ganho ou perdido (use `DD/MM/AAAA`). | Ignorada quando o status é aberto. Se vazia com status ganho ou perdido, grava a data da importação. |
| **Tags (separadas por vírgula)** | Valores separados por vírgula, aplicados à negociação (não ao contato). **Mapeamento de Tags** associa automaticamente por nome (sem acento/maiúsculas); **Criar automaticamente tags não mapeadas** vem marcada por padrão e reaproveita tag existente de mesmo nome. | Sem ação escolhida e com a criação automática desmarcada, a tag é ignorada. |
| **Responsável** e **Grupo** | Se **Responsável** ficar vazio, a negociação fica atribuída a quem fez a importação (para distribuir depois, use **Atribuir todos os negócios para um membro** em [Ações em lote no funil](/docs/crm/acoes-em-lote)). | Se **Grupo** ficar vazio e o funil tiver a regra **Ao criar negócio também mover para algum grupo do responsável.**, a negociação recebe um grupo do responsável. |
| **Descrição** e **Campos Personalizados** | Gravados como texto exatamente como estão na célula, sem validação de tipo ou opções. | Célula vazia não grava o campo. |

## O que acontece com cada linha

- **Criação:** cada linha cria uma **nova negociação** no funil selecionado; a importação nunca atualiza negociações existentes.
- **Contato novo × existente:** a Kinbox procura um contato existente pelo telefone ou pelo e-mail. Se encontrar, vincula a negociação a esse contato sem substituir dados já preenchidos e **sem alterar telefone ou e-mail** (mesmo se estiverem vazios). Se não encontrar — ou se a linha não tiver telefone nem e-mail — cria um novo contato.
- **Evitar duplicados:** a opção **Não criar negociação se já existir contato com negociação** (desmarcada por padrão) ignora a linha (conta em **Ignorados**) quando o contato já tem uma negociação **aberta** neste funil. Negociações ganhas ou perdidas não bloqueiam.
- **Regra de máximo por contato:** a regra **Máximo de negócios abertos por contato** do funil vale na importação e faz a linha falhar quando o contato existente já atingiu o limite de negociações abertas neste funil (`"Você já tem um máximo de {{max}} negociações abertas com esse contato."`). Não se aplica quando o contato é criado na própria linha.
- **Efeitos automáticos:** grava `"criou a negociação"` no histórico (autor = quem importou), dispara as tarefas de [cadência](/docs/crm/cadencias) da etapa de entrada e gera número de ticket no **Funil Operacional**. As negociações não vêm associadas a conversas (use **Associar conversas** em [Ações em lote no funil](/docs/crm/acoes-em-lote)) e não são atribuídas a anúncios.

## Erros por linha, progresso, cancelar e histórico

- **Início e acompanhamento:** inicia com `"Importação iniciada!"` (falha ao iniciar: `"Erro ao iniciar importação"`). A janela atualiza a cada 2 segundos e não fecha por clique fora; sair da página não interrompe a importação, que segue em andamento e aparece no **Histórico**. Se outras importações estiverem em andamento, a nova pode aguardar com status **Pendente**.
- **Cancelar Importação:** interrompe sem confirmação entre lotes de 10 linhas (`"Importação cancelada"` / `"Erro ao cancelar importação"`). As negociações já criadas permanecem no funil. Importações já concluídas não podem ser canceladas.
- **Histórico de Importações:** mostra as **10** importações mais recentes. Status: **Concluído**, **Processando**, **Pendente**, **Falhou**, **Cancelado** e **Revertido**. Colunas: **ID** (8 últimos caracteres), **Arquivo**, **Status**, **Data**, **Total**, **Criados**, **Erros**.
- **Detalhes da Importação:** aba **Resumo** (datas, estatísticas, **Mapeamento** e aviso caso a opção de ignorar contato com negociação estivesse ativa) e aba **Erros** (guarda os **100 últimos** erros, enquanto o contador **Erros** conta todos; a coluna **Linha** conta o cabeçalho como linha 1 e desconsidera linhas vazias).
- **Erros por linha:** quando uma linha falha, ela não é criada e as demais continuam. Mensagens: `Etapa não encontrada: "<valor>"` e `"Você já tem um máximo de {{max}} negociações abertas com esse contato."`.

## Reverter importação

- **Condições:** disponível em **Histórico** → clique na importação → **Reverter importação** (ou **Ver detalhes** no cartão de resultado ao criar um funil) apenas para importações com status **Concluído** e **Criados com sucesso** maior que zero. Não aparece para importações **Cancelado**, **Falhou**, **Processando** ou **Revertido**. Não há limite de prazo.
- **Confirmação e mensagens:** `"Deseja reverter esta importação e excluir os itens criados por ela ({{count}} negociações)? Esta ação não pode ser desfeita."` → **Reverter**. Sucesso: `"Importação revertida e itens criados excluídos"`; erro: `"Erro ao reverter importação"`. O status no histórico muda para **Revertido**.
- **O que é excluído:** todas as negociações criadas por aquela importação, inclusive as que já foram editadas, movidas de etapa, ganhas ou perdidas. Antes de confirmar, use **Ver … negociações** no mesmo painel para conferir a lista.
- **O que não é desfeito:** contatos criados e tags criadas pela importação não são apagados. A reversão em si não pode ser desfeita.
