---
title: "Importação de contatos: colunas reconhecidas, organizações, telefone, histórico e erros"
description: Regras da importação de contatos por planilha na Kinbox, com formatos, cabeçalhos reconhecidos, avisos, como o telefone é tratado, como contatos e organizações existentes são encontrados, erros por linha e histórico.
keywords: [importar contatos regras, cabeçalhos reconhecidos, coluna celular, coluna empresa, notação científica, telefone inválido, linha sem telefone ou e-mail, atualizar contatos existentes, contatos existentes, organizações criadas, vínculos com organizações, histórico de importações, 100 erros, cancelar importação, pendente, 10 mb]
publico: llm
tipo: referencia
fontes:
  - api:src/modules/contact-spreadsheet-imports/contact-spreadsheet-imports.consumer.ts
  - api:src/modules/contact-spreadsheet-imports/contact-spreadsheet-imports.helper.ts
  - api:src/modules/contacts/contact.helper.ts
  - web:src/pages/crm/contacts/ImportContacts/contactImport.types.ts
  - web:src/pages/crm/contacts/ImportContacts/components/ContactColumnMappingStep.tsx
  - web:src/pages/crm/contacts/ImportContacts/ImportContactsHistory.tsx
codigo:
  - web:src/pages/crm/contacts/ImportContacts/**
  - web:src/pages/crm/deals/ImportDeals/components/FileUploadStep.tsx
  - web:src/pages/crm/deals/ImportDeals/helpers/**
  - api:src/modules/contact-spreadsheet-imports/**
  - api:src/modules/contacts/contact.helper.ts
  - api:src/modules/contacts/contacts.repository.ts
verificado_em: 2026-11-26
---

Detalhes de referência de [Importar contatos de uma planilha](/docs/clientes/importar-contatos).

## Permissões

- **Gerenciar Contatos** ou proprietário do workspace: libera **Clientes** → **Contatos** → **⋯** → **Importar contatos** (na tabela, **Importar**).
- **Gerenciar Organizações** (além de **Gerenciar Contatos**): libera vincular e criar organizações na importação. Sem ela, os campos de organização e de campos personalizados de organização não aparecem no mapeamento, a planilha modelo sai sem Organização/CNPJ/Cargo e o passo **Revise as organizações** é omitido. Tentativa sem permissão retorna "Sem permissão para vincular contatos a organizações".

## Arquivo

- **Formatos:** `.csv` (separado por vírgula ou ponto e vírgula; use codificação UTF-8 para manter acentos) ou Excel `.xlsx` (lê apenas a **primeira aba**; números longos do `.xlsx` são lidos sem perda de dígitos).
- **Tamanho:** um arquivo por vez, até **10 MB**. Sem limite fixo de linhas além do tamanho do arquivo.
- **Estrutura:** a primeira linha é tratada como cabeçalho; colunas sem cabeçalho e linhas vazias são ignoradas.
- **Planilha modelo:** arquivo `.csv` baixado em **Baixar planilha modelo** com as colunas **Nome**, **Telefone**, **E-mail**, **Notas**, mais **Organização**, **CNPJ** e **Cargo** (com **Gerenciar Organizações**) e uma coluna para cada campo personalizado de contato.
- **Mensagens de erro de arquivo:**
  - "O tamanho do arquivo é maior que o permitido. O Máximo é {{maxSizeInMB}}MB."
  - "O arquivo não contém dados para importar."
  - "Erro ao processar o arquivo. Verifique se o formato está correto."
  - "Erro ao enviar o arquivo"

## Cabeçalhos reconhecidos

A Kinbox associa automaticamente uma coluna quando o cabeçalho corresponde exatamente a um dos nomes abaixo (sem diferenciar acentos nem maiúsculas):

| Campo da Kinbox | Grupo | Cabeçalhos reconhecidos |
| --- | --- | --- |
| **Nome** | Contato | `nome`, `name`, `contato`, `nome do contato`, `nome completo`, `cliente` |
| **Telefone** | Contato | `telefone`, `celular`, `phone`, `whatsapp`, `cel`, `fone`, `mobile`, `tel` |
| **E-mail** | Contato | `email`, `e-mail`, `mail` |
| **Notas** | Contato | `notas`, `notes`, `observacao`, `observacoes`, `obs` |
| **Nome da organização** | Organização | `organizacao`, `organization`, `empresa`, `company`, `companhia`, `nome da empresa`, `nome da organizacao` |
| **CNPJ** | Organização | `cnpj`, `cnpj da empresa`, `cnpj da organizacao` |
| **Cargo do contato** | Organização | `cargo`, `funcao`, `role`, `job title` |
| **Razão social** | Organização | `razao social`, `legal name` |
| **Site** | Organização | `site`, `website`, `url`, `site da empresa` |
| **Segmento** | Organização | `segmento`, `setor`, `ramo` |
| Campos personalizados (contato e organização) | Campos personalizados | Nome exato do campo ou chave reservada |

Também estão disponíveis para seleção manual no grupo **Organização** (com **Gerenciar Organizações**): **Telefone da organização** e **E-mail da organização**. Um campo já escolhido aparece com "(já usado)".

## Avisos do mapeamento

- Sem telefone nem e-mail mapeado (impede avançar): "Mapeie a coluna de telefone ou de e-mail para continuar".
- Números em notação científica: "Números longos corrompidos pelo Excel na coluna {{columns}}" — "Alguns valores estão em notação científica (ex.: 5.58599E+12) e perderam os últimos dígitos. Essas linhas vão dar erro. Formate a coluna como texto na planilha e exporte de novo, ou envie o arquivo .xlsx.".
- Colunas de organização sem nome nem CNPJ: "Mapeie o nome ou o CNPJ da organização" — "Sem eles não dá para saber a qual organização cada contato pertence, e as colunas da organização serão ignoradas.".
- Dica exibida quando há permissão de organizações: "Organizações: mapeie o nome e/ou o CNPJ da organização para vincular cada contato a ela. No próximo passo você revisa as organizações que não encontramos no cadastro.".

## Organizações

- **Agrupamento e busca:** linhas são agrupadas por CNPJ (ou pelo nome, quando não há CNPJ). A busca procura primeiro pelo CNPJ e depois pelo nome ou razão social, sem diferenciar acentos nem maiúsculas. Organizações excluídas não são consideradas.
- **Status exibidos:** **Encontrada pelo CNPJ**, **Encontrada pelo nome**, **{{count}} com o mesmo nome** e **Não encontrada**.
- **Ação padrão por status:**
  - Encontrada → vincular à organização existente.
  - Várias com o mesmo nome → vincular à mais antiga.
  - Não encontrada com nome → **Criar “{{name}}”**.
  - Apenas CNPJ sem nome (e não encontrada) → **Não vincular**.
- **Planilha sem organizações preenchidas:** "Nenhuma organização preenchida na planilha. Os contatos serão importados sem organização.".
- **Dados gravados:** organizações novas recebem razão social, site, telefone, e-mail, segmento e campos personalizados da primeira linha do grupo. Organizações que já existem **não** são atualizadas pela planilha.
- **Vínculo com o contato:** se o contato já tiver organização principal, a importada entra como secundária; se o contato já estiver vinculado à organização, o cargo não é alterado. Veja [Agrupar contatos em organizações](/docs/clientes/organizacoes).
- **Limite:** até **5000 organizações distintas** por planilha.

## Contatos existentes

A Kinbox identifica um contato existente pelo mesmo telefone (com ou sem o 9, com ou sem o `55`) **ou** pelo mesmo e-mail (sem diferenciar maiúsculas). A opção **Atualizar contatos existentes com os dados da planilha** vem marcada por padrão:

| Regra | Opção marcada (padrão) | Opção desmarcada |
| --- | --- | --- |
| **Nome**, **Notas** e **Campos personalizados** | Substitui pelos valores preenchidos na planilha. | Preenche apenas campos vazios. |
| **Telefone** e **E-mail** | Nunca são trocados (preenchidos apenas se vazios). | Nunca são trocados (preenchidos apenas se vazios). |
| **Célula vazia** | Nunca apaga dado já existente. | Nunca apaga dado já existente. |

- **Linhas repetidas no mesmo arquivo:** a segunda linha encontra o contato criado pela primeira e conta em **Contatos existentes**; com a opção marcada, prevalece a última linha.

## Telefone

Espaços, traços e parênteses são ignorados; o número precisa de no mínimo **8 dígitos**.

- **Sem `+`:** tratado como número do Brasil. Um número brasileiro válido recebe `55` na frente (exemplo: `11 90000-0001` vira `5511900000001`). Um número brasileiro com DDD e 8 dígitos de celular antigo sem o 9 recebe `55` e o dígito `9`. Outros padrões ficam apenas com os dígitos.
- **Com `+`:** número brasileiro com 12 dígitos (`+55` + DDD + 8 dígitos) recebe o dígito `9`; números de outros países com `+` e código do país são mantidos como informados.

## Erros por linha

Linhas com erro não são importadas:

- `Telefone em notação científica: "<valor>". Formate a coluna como texto na planilha e exporte de novo.` (falha mesmo se a linha tiver e-mail).
- `CNPJ em notação científica: "<valor>". Formate a coluna como texto na planilha e exporte de novo.` (falha mesmo se a linha tiver e-mail).
- `Telefone inválido: "<valor>"` (quando a linha não tem e-mail).
- `Linha sem telefone ou e-mail` (quando ambos estão vazios).
- **Telefone inválido com e-mail válido:** o contato é importado apenas com o e-mail.

## Campos personalizados

O texto da célula é gravado exatamente como está, sem validar tipo, lista de opções, data ou número (veja [Tipos de campo e validações](/docs/clientes/tipos-de-campo)).

## Origem

Contatos criados pela importação ficam registrados com origem de importação e sem **Criado por**. A importação não envia mensagens nem cria conversas.

## Progresso, cancelar e histórico

- **Contadores:** **Contatos criados**, **Contatos existentes**, **Organizações criadas**, **Vínculos com organizações** e **Erros**.
- **Mensagens de conclusão:** "Importação concluída!", "Falha na importação" ou "Importação cancelada" (o botão **Ver detalhes** aparece quando há erros ou falha).
- **Cancelar:** **Cancelar importação** age sem confirmação e interrompe entre lotes de **50 linhas**, mantendo o que já foi importado. Uma importação concluída não pode ser cancelada ("Não é possível cancelar uma importação concluída"). Não existe desfazer importação.
- **Segundo plano:** fechar a tela não interrompe a importação. Uma importação que ainda não começou aparece com status **Pendente**; acompanhe pelo **Histórico**.
- **Histórico de importações:** lista todas as importações do workspace (10 por página; não exibe qual membro importou) com **Arquivo**, **Status** (**Concluído**, **Processando**, **Pendente**, **Falhou**, **Cancelado**), **Data**, **Linhas**, **Criados** e **Erros**.
- **Detalhes da importação:** aba **Resumo** (**Status**, **Arquivo**, **Criado em**, **Concluído em**, total, **Processadas** e contadores) e aba **Erros ({{count}})** com **Linha** e **Erro** (cada item expande os dados da linha).
- **Limite e numeração de erros:** ficam armazenados apenas os primeiros **100 erros** ("Mostrando os primeiros {{count}} erros."). A coluna **Linha** conta o cabeçalho como linha 1 e não conta linhas vazias da planilha.
- **Atalhos da tela:** setas `←` e `→` avançam ou voltam passos; `Esc` fecha.

## Limites

- **Tamanho do arquivo:** até 10 MB.
- **Nome do contato:** até 128 caracteres.
- **Notas:** até 2048 caracteres.
- **Cargo do contato:** até 128 caracteres.
- **E-mail:** convertido para minúsculas.
- **Organizações distintas por planilha:** até 5000.
- **Erros guardados por importação:** até 100.
