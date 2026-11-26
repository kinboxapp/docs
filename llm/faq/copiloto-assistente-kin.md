---
title: Onde foi parar o Assistente Kin?
description: O Assistente Kin virou o copiloto, e os comandos de texto dele ficam no ícone de estrelas do editor da conversa quando a função Comandos de chat está ligada.
keywords: [assistente kin sumiu, cadê o assistente de escrita, não acho o botão de corrigir português, kin no chat não aparece, como resumir a conversa com ia, onde está o assistente de ia do chat]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/copilot/CopilotChatDrop.tsx
  - web:src/pages/settings/copilot/chatCommands.ts
  - web:src/pages/settings/copilot/ChatCommandSettings.tsx
codigo:
  - web:src/pages/settings/copilot/CopilotChatDrop.tsx
  - web:src/pages/settings/copilot/chatCommands.ts
  - web:src/pages/settings/copilot/copilot.helper.ts
  - web:src/pages/inbox/ChatTextEditorPure.tsx
  - web:src/pages/inbox/AIAssistDrop.tsx
  - web:src/pages/inbox/AIAssistGenModal.tsx
  - web:src/pages/inbox/AIAssistTranslateModal.tsx
  - web:src/pages/inbox/Chat/CopilotAutoSuggest.tsx
  - web:src/pages/inbox/Chat/CopilotSuggestions.tsx
  - web:src/pages/inbox/Chat/useCopilotAutoSuggestion.ts
  - web:src/pages/inbox/Chat/ScheduleSuggestion.tsx
  - web:src/components-old/chat/useQuickPhraseSuggestions.ts
  - web:src/components-old/inbox/ScheduleMessageModal/**
  - web:src/lib/copilotChecks.tsx
  - web:src/lib/messageReview.ts
  - api:src/modules/copilot/**
  - api:src/modules/signals/**
  - api:src/modules/assist/assist.service.ts
verificado_em: 2026-11-26
---

## Pergunta

Onde foi parar o Assistente Kin?

## Resposta

O antigo Assistente Kin virou o **copiloto**, e os comandos de texto dele (resumir, expandir, reescrever, corrigir português, traduzir, mudar o tom e gerar texto) agora ficam no menu do copiloto, no ícone de estrelas (**Copiloto**) do editor da conversa.

- **Como fazer aparecer:** alguém com a permissão **Copiloto** (ou o proprietário do workspace) deve ir em **Configurações** → **Automação** → **Copiloto**, adicionar a função **Comandos de chat** e clicar em **Salvar mudanças** (pode levar até 60 segundos para valer). A conversa também precisa estar dentro de **Onde o copiloto atua**. Sem saldo na carteira, o ícone continua no editor, mas o menu abre com **Seus créditos acabaram** e os comandos desativados.
- **Sem permissão por comando:** as antigas permissões por comando do Assistente Kin em cada papel não existem mais. Os comandos são ligados, desligados e reordenados para o workspace inteiro no bloco **Comandos padrão** da função **Comandos de chat**.
- **Comandos próprios:** na mesma tela, você também pode ativar **Comandos personalizados** para criar prompts da sua empresa no topo do menu.

Veja mais em [Usar o copiloto na conversa](/docs/copiloto/usar-o-copiloto-de-ia), [Criar comandos personalizados](/docs/copiloto/comandos-personalizados) e [Copiloto: visão geral](/docs/copiloto/copiloto-atualizado).

## Variações

- assistente kin sumiu
- cadê o assistente de escrita
- não acho o botão de corrigir português
- kin no chat não aparece
- como resumir a conversa com ia
- onde está o assistente de ia do chat
