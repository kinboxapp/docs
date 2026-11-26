---
title: "Base de conhecimento do bot e do copiloto: tipos aceitos, tamanho, processamento e erros"
description: Regras da base de conhecimento do copiloto e do bot na Kinbox, com tipos e tamanho de arquivo, limite de bases, status, mensagens de erro ao processar, o que acontece ao editar ou excluir e como ela é usada nas respostas.
keywords: [base de conhecimento, tipos de arquivo aceitos, 5 mb, limite de 20 bases, você atingiu o limite máximo de 20 bases de conhecimento, o arquivo não é suportado, erro ao processar documento, arquivo da base de conhecimento inválido, não foi possível baixar o arquivo da base, aguardando processamento, processar desativado, pdf escaneado, base não usada pelo copiloto]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/knowledgeBases/index.tsx
  - web:src/pages/settings/knowledgeBases/EditKnowledgeBase.tsx
  - web:src/pages/settings/copilot/AutoSuggestionSettings.tsx
  - web:src/pages/settings/bot/drawers/EditNodeLLMDrawer.tsx
  - api:src/modules/knowledge-bases/knowledge-bases.service.ts
  - api:src/modules/copilot/copilot.service.ts
codigo:
  - web:src/pages/settings/knowledgeBases/**
  - web:src/components-old/forms/Dropzone22.tsx
  - web:src/pages/settings/copilot/AutoSuggestionSettings.tsx
  - web:src/pages/settings/copilot/GroupRulesList.tsx
  - web:src/pages/settings/bot/drawers/EditNodeLLMDrawer.tsx
  - api:src/modules/knowledge-bases/**
  - api:src/modules/copilot/copilot.service.ts
  - api:src/modules/agents/agent.runner.ts
  - api-v0:server/modules/chat/**
verificado_em: 2026-11-26
---

Detalhes de referência da página [Base de conhecimento do bot e do copiloto](/docs/copiloto/base-de-conhecimento).

## Onde fica e quem pode

- Caminho: **Configurações** → **Automação** → **Base de conhecimento**.
- Permissão: **Base de conhecimento** (na seção **Gerenciamento do Ambiente** do papel) ou proprietário do workspace.
- A lista oferece busca (`"Pesquisar por nome"`) e filtros de status: **Tudo**, **Aguardando processamento**, **Processando**, **Pronto** e **Erro**. Cada linha tem **Editar**, **Processar** e **Excluir** no menu de três pontos (não há ação **Clonar**).

## Limites e formatos aceitos

- **Quantidade de bases:** até **20 bases de conhecimento** por workspace. Ao tentar abrir **Nova base de conhecimento** no limite, aparece `"Você atingiu o limite máximo de 20 bases de conhecimento."`.
- **Tamanho e quantidade de arquivo:** **1 arquivo** por base, de até **5 MB**. Acima disso, a tela exibe `"O tamanho do arquivo é maior que o permitido. O Máximo é 5MB."`.
- **Tipos aceitos:**
  - **Texto:** texto digitado ou colado no campo **Texto**. O contador do campo **Texto** mostra 50.000 caracteres como referência.
  - **PDF:** arquivo `.pdf` com texto selecionável (PDF escaneado só com imagem não possui texto extraível e falha no processamento).
  - **Arquivo de texto:** arquivo `.txt` (lido como texto puro).
  - **Docx:** arquivo `.docx` (Word).
- **Formatos não aceitos:** Markdown (`.md`), CSV, planilhas, imagens, `.doc` antigo, links de site e vídeos. Arrastar um formato não suportado exibe `"O arquivo não é suportado."`.
- Trocar o **Tipo** durante a criação ou edição limpa o texto ou o arquivo já preenchido.

## Como a base é usada nas respostas

- Ao processar, o conteúdo é dividido em trechos de até **1.000 caracteres** com **200 caracteres** de sobreposição. A Kinbox busca apenas os trechos mais parecidos com a conversa, nunca a base inteira.
- **Copiloto (Sugestões automáticas):** busca os **3 trechos** mais parecidos usando as **2 últimas mensagens do contato**. Em **Personalizar por grupo**, a base definida na regra substitui a base padrão para membros daquele grupo e funciona mesmo com **Usar base de conhecimento** desligado no padrão. **Comandos de chat** e demais funções do copiloto não consultam bases de conhecimento.
- **Bloco Agente de IA do bot (com agente selecionado):** busca os **3 trechos** mais parecidos usando as **2 últimas mensagens do contato** e soma esses trechos ao conhecimento próprio do agente. Um agente conectado direto aos canais, fora do bot, não usa esta base.
- **Bloco Agente de IA antigo (salvo sem agente selecionado):** busca **4 trechos** pela mensagem atual, lembra a última pergunta e resposta da conversa por **1 hora**, responde em português (informando que não sabe quando não encontra a resposta na base), aceita áudio do contato (transcreve antes) e condições de saída, e sai por **Sem saldo** ou **Erro**. Ao abrir um bloco desses para editar, a tela passa a exigir um **Agente de IA** para salvar.

## Status e processamento

- Salvar uma base nova não processa o conteúdo: ela nasce em **Aguardando processamento**.
- **Processar** (no menu de três pontos) executa na hora, sem fila: muda para **Processando** e depois para **Pronto** ou **Erro**. O tempo depende do tamanho do conteúdo.
- **Processar** fica desativado quando a base já está em **Pronto** (para reprocessar, é necessário alterar o conteúdo). Processar novamente substitui os trechos anteriores sem duplicar.

## Mensagens de erro ao processar

| Mensagem | Causa | O que fazer |
| --- | --- | --- |
| `"Erro ao processar documento"` | Texto vazio, PDF escaneado sem texto selecionável, arquivo corrompido ou falha no processamento | Revisar o conteúdo ou converter o PDF para um arquivo com texto selecionável, salvar e clicar em **Processar**. |
| `"Arquivo da base de conhecimento inválido"` | Base de tipo arquivo salva sem arquivo anexado ou com referência inválida | Abrir **Editar**, anexar o arquivo, salvar e clicar em **Processar**. |
| `"Não foi possível baixar o arquivo da base"` | Falha ao acessar o arquivo enviado | Abrir **Editar**, reenviar o arquivo, salvar e clicar em **Processar**. |
| `"Tipo de base de conhecimento não suportado"` | Base com tipo não suportado | Alterar o **Tipo** para **Texto**, **PDF**, **Arquivo de texto** ou **Docx**, salvar e clicar em **Processar**. |
| `"Não foi possível apagar os trechos da base"` | Falha ao remover os trechos durante a exclusão | Tentar excluir a base novamente. |

## Editar, excluir e bases não prontas

- **Editar:** mudar apenas o **Nome** mantém a base em **Pronto**. Mudar **Tipo**, **Texto** ou arquivo apaga os trechos processados imediatamente e volta a base para **Aguardando processamento**; até clicar em **Processar** de novo, o copiloto e o bot respondem sem o conteúdo dela.
- **Excluir:** pede confirmação (`"Tem certeza que deseja excluir essa base de conhecimento?"`) e não avisa se a base está vinculada ao copiloto ou a um bloco do bot. Se uma base em uso for excluída:
  - no copiloto e no bloco **Agente de IA** com agente, as respostas continuam saindo **sem** o conteúdo da base;
  - em blocos **Agente de IA** antigos sem agente, a etapa falha e o bot sai por **Erro**.
  - Sempre troque a base no copiloto e nos blocos do bot antes de excluir.
- **Base em status diferente de Pronto:** os seletores do copiloto e do bloco **Agente de IA** listam bases em qualquer status, mas bases em **Aguardando processamento**, **Processando** ou **Erro** não retornam trechos — o copiloto e o bot respondem sem o conteúdo dela e sem aviso. Escolha sempre uma base em **Pronto**.

## Saldo

- **Processar** uma base de conhecimento desta tela **não gasta saldo**.
- **Usar** a base entra no débito normal da resposta no [saldo da carteira](/docs/conceitos/saldo-e-creditos), sem cobrança separada:
  - no copiloto: `"Uso do copilot"`;
  - no bloco **Agente de IA** com agente: `"Uso do agente de IA no bot"`;
  - em blocos antigos sem agente: uso de IA no bot (e `"Transcrição de áudio"` quando o contato envia áudio).
- Sem saldo, o copiloto não gera sugestões e o bloco **Agente de IA** segue pela saída **Sem saldo**.

## Fronteira com o conhecimento dos agentes

A **Base de conhecimento** em **Configurações** → **Automação** → **Base de conhecimento** e o conhecimento interno dos agentes de IA são cadastros separados: um não aparece na lista do outro. Para dar conhecimento a um agente de IA (inclusive com sites e vídeos do YouTube), use [Ensinar o agente com arquivos, textos, sites e vídeos](/docs/agente-de-ia/conhecimento) — lá, o processamento consome saldo.

## Problemas comuns

| Sintoma | Causas mais comuns |
| --- | --- |
| O copiloto ou o bot não usa a base | Base não está em **Pronto**, foi editada e não reprocessada, foi excluída, **Usar base de conhecimento** está desligado, há uma regra em **Personalizar por grupo** apontando para outra base, a pergunta do contato está fora do conteúdo ou a sugestão da mesma mensagem ainda está no reaproveitamento de 72 h. |
| Não consigo criar nova base | Falta a permissão **Base de conhecimento** ou o workspace já atingiu o limite de 20 bases. |
| O arquivo não sobe | Extensão diferente do **Tipo** escolhido (`.pdf`, `.txt`, `.docx`) ou tamanho acima de 5 MB. |
| A base ficou em **Erro** | Texto vazio, arquivo não anexado, PDF escaneado sem texto selecionável ou arquivo corrompido. Corrija, salve e clique em **Processar**. |
| **Processar** está cinza (desativado) | A base já está em **Pronto**. |
| Quero usar o arquivo em um agente de IA | Cadastre diretamente no cartão **Conhecimento** do agente (veja [Ensinar o agente com arquivos, textos, sites e vídeos](/docs/agente-de-ia/conhecimento)). |
