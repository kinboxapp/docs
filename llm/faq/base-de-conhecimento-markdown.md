---
title: Posso subir arquivo Markdown na base de conhecimento?
description: Não. A base de conhecimento aceita apenas Texto, PDF, Arquivo de texto (.txt) e Docx (.docx); para usar um arquivo .md, cole o texto ou salve como .txt, .docx ou .pdf.
keywords: [base de conhecimento aceita md, subir markdown, quais arquivos a base de conhecimento aceita, posso enviar csv ou planilha na base, arquivo não é suportado na base de conhecimento, base de conhecimento aceita link de site]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/knowledgeBases/EditKnowledgeBase.tsx
  - web:src/components-old/forms/Dropzone22.tsx
  - api:src/modules/knowledge-bases/knowledge-bases.service.ts
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

## Pergunta

Posso subir arquivo Markdown na base de conhecimento?

## Resposta

Não. A base de conhecimento (**Configurações** → **Automação** → **Base de conhecimento**) aceita apenas os tipos **Texto**, **PDF** (`.pdf`), **Arquivo de texto** (`.txt`) e **Docx** (`.docx`). Ao arrastar um arquivo `.md`, ele é recusado com a mensagem `"O arquivo não é suportado."` (CSV, planilhas, imagens, `.doc` antigo, links de site e vídeos também não são aceitos).

Para usar um conteúdo em Markdown, existem três contornos:

1. Copiar o conteúdo e colar em uma base do tipo **Texto** (os símbolos do Markdown ficam como texto comum).
2. Salvar ou renomear o arquivo com extensão `.txt` e enviar em uma base do tipo **Arquivo de texto**.
3. Converter o arquivo para `.docx` ou `.pdf` (com texto selecionável) e enviar em uma base do tipo **Docx** ou **PDF**.

O limite é de **5 MB** por arquivo. Depois de clicar em **Salvar**, abra o menu de três pontos da linha e clique em **Processar** para a base ficar em **Pronto**.

O conhecimento interno dos agentes de IA também não aceita arquivos `.md` — veja os formatos aceitos lá em [Ensinar o agente com arquivos, textos, sites e vídeos](/docs/agente-de-ia/conhecimento). Para mais detalhes sobre esta tela, veja [Base de conhecimento do bot e do copiloto](/docs/copiloto/base-de-conhecimento).

## Variações

- base de conhecimento aceita .md
- subir markdown na base de conhecimento
- quais arquivos a base de conhecimento aceita
- posso enviar csv ou planilha na base
- arquivo não é suportado na base de conhecimento
- base de conhecimento aceita link de site
