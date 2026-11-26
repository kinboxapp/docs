---
title: "Conhecimento do agente: tamanho de arquivo, páginas, texto cortado, site e YouTube"
description: Limites do conhecimento do agente de IA na Kinbox, estados e erros do processamento, como a busca usa o conhecimento e os limites dos arquivos que o contato manda na conversa.
keywords: [limite de arquivo conhecimento, 5 mb, markdown, 50 mil caracteres, 20 mb, pdf escaneado, youtube sem legenda, site não lido, error conhecimento, excluir conhecimento]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/agents/components/knowledge/KnowledgeBlock.tsx
  - web:src/pages/agents/components/knowledge/KnowledgePicker.tsx
  - web:src/pages/agents/components/knowledge/add-source/KnowledgeAddSource.tsx
  - api:src/modules/knowledges/knowledges.service.ts
  - api:src/modules/knowledges/knowledges.controller.ts
  - api:src/modules/agents/utils/file-handler.util.ts
codigo:
  - web:src/pages/agents/components/knowledge/**
  - api:src/modules/knowledges/**
  - api:src/modules/agents/agent.runner.ts
  - api:src/modules/agents/utils/file-handler.util.ts
verificado_em: 2026-11-26
---

Referência técnica complementar de [Ensinar o agente com arquivos, textos, sites e vídeos](/docs/agente-de-ia/conhecimento). Vale para agentes de texto e de voz.

## Limites do conhecimento do agente

| Fonte / item | Como funciona |
| --- | --- |
| **Upload de arquivos** (tamanho) | Limite de **5 MB** por arquivo no navegador, um arquivo por vez. Acima disso exibe `"O tamanho do arquivo é maior que o permitido. O Máximo é 5MB."`. |
| **Upload de arquivos** (formatos) | O seletor aceita somente `.pdf`, `.txt` e `.docx`. Qualquer outro formato arrastado exibe `"O arquivo não é suportado."`. |
| **Markdown (`.md`)** | **Não é aceito**, apesar de o texto da tela listar `"Tipos de arquivos suportados: PDF, .txt, Markdown, .docx"`. Arquivo `.md` arrastado retorna `"O arquivo não é suportado."`. Contorno: renomear ou salvar o conteúdo como `.txt`. |
| **Texto colado** | O contador `(n/50000)` fica vermelho acima de 50.000 caracteres. Para textos longos, prefira dividir em mais de um conhecimento. |
| **Website** | Lê apenas a URL informada (não percorre subpáginas). Tenta extrair o texto principal visível e, se falhar, usa um leitor que abre páginas com JavaScript. Artigos pagos não são suportados. Falha na leitura marca o item com erro. |
| **YouTube** | Importa apenas a transcrição de vídeos públicos (tenta português primeiro e depois a legenda padrão). Vídeos privados, muito recentes ou sem legenda falham e ficam com erro. |
| **PDF e `.docx`** | `.txt` é lido em UTF-8; PDF e `.docx` têm o texto extraído. PDF escaneado (só imagem, sem texto selecionável) não possui texto para extração. |
| **Quantidade de conhecimentos** | Não há limite de quantidade para o conhecimento dos agentes. (O limite de 20 bases existe apenas na **Base de conhecimento** do bot e do copiloto, em **Configurações** → **Automação**, que é um cadastro separado e não aparece em **Selecione um conhecimento**; veja [Base de conhecimento do bot e do copiloto](/docs/copiloto/base-de-conhecimento).) |

## Estados, fila e erros do processamento

- **Em processamento:** ícone girando no cartão. O processamento roda em fila, um conhecimento por vez, e o status atualiza em tempo real na tela.
- **Pronto:** ícone normal. **Quantidade de caracteres** é preenchida na criação (texto colado) ou após o processamento (arquivo, site, YouTube).
- **Erro:** nome riscado com selo vermelho `"Error"` (em inglês na tela) e dica `"Ocorreu um erro ao treinar o conhecimento"`.
- **Motivo do erro:** a tela não mostra o motivo do erro, como vídeo sem legenda ou página inacessível.
- **Sem botão de reprocessar:** num item com erro, clicar no **X** remove imediatamente do agente, sem confirmação. A orientação é conferir o arquivo ou link e adicionar novamente.

## Como o agente busca e usa o conhecimento

- O conteúdo processado é dividido em trechos de **1.000 caracteres** com **200 caracteres** de sobreposição.
- A cada resposta do agente de texto, o sistema junta as **2 últimas mensagens do contato** como texto de busca e traz até **3 trechos** de cada conhecimento ligado ao agente (ou etapa). No agente de voz, busca até **6 trechos** por pergunta.
- Por usar as duas últimas mensagens como busca, perguntas completas tendem a recuperar trechos mais precisos do que perguntas muito curtas fora de contexto.
- **Conhecimento da etapa:** etapa nova nasce com **Herdar conhecimento** desligado (substituir). Porém, se a etapa não tiver nenhum conhecimento próprio ligado, o agente usa os conhecimentos do agente principal mesmo com **Herdar conhecimento** desligado.

## Renomear, retirar e excluir

- Abrir um item no cartão exibe o painel **Conhecimento** com **Nome do conhecimento** (editável; renomear não reprocessa), **Conteúdo** (ou **Abrir em outra aba**), **ID do documento**, **Atualizado em**, **Tamanho do arquivo**, **Quantidade de caracteres** e **URL**. O conteúdo não é editável.
- **Tirar do agente (**X** no cartão):** confirma `"Tem certeza que deseja retirar este conhecimento do agente?"` (**Retirar** → `"Conhecimento retirado"`). Mantém o conhecimento no workspace e nos demais agentes.
- **Excluir (menu do item em Selecione um conhecimento):** confirma `'Tem certeza que deseja excluir o conhecimento "{{name}}" permanentemente?'` (`"Conhecimento excluído"`). Apaga do workspace para **todos** os agentes que o usavam (o aviso não informa isso; agentes que ainda apontavam para o item podem exibi-lo sem nome no cartão).
- **Permissões:** ligar ou retirar conhecimento de um agente exige **Agentes de IA**. Criar, renomear e excluir exige **Base de conhecimento**. Sem ela, o membro consegue abrir a tela de adicionar, mas o envio não é concluído.

## Arquivos que o contato manda na conversa (não é conhecimento)

Os limites abaixo valem para **anexos enviados pelo contato durante uma conversa** (não para o cartão **Conhecimento**):

- Documentos suportados (PDF, `.docx`, texto, CSV, Markdown, HTML) têm o texto extraído e **cortado nos primeiros 50.000 caracteres**.
- Arquivo acima de **20 MB** ou cujo download passe de **30 segundos** não é lido — o agente apenas recebe a informação de que um arquivo foi anexado.
- PDF sem texto selecionável (escaneado) pode ser lido integralmente quando tiver até **5 MB** e **30 páginas** e o modelo em uso aceitar leitura direta de PDF.

## Custo

Processar um conhecimento debita saldo da carteira com a descrição `"Processamento da base de conhecimento"` (categoria **Agente de IA** no [Relatório de saldo](/docs/relatorios/saldo)), quando há custo de processamento. A busca nos trechos a cada resposta entra no débito da própria resposta do agente.
