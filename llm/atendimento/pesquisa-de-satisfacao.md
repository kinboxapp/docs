---
title: "Pesquisa de satisfação: texto padrão, notas, quando não é enviada e a quem a nota conta"
description: Referência da avaliação de atendimento da Kinbox com o bot de avaliação único do workspace, o texto padrão, a faixa de notas, as condições que impedem o envio e a quem a nota é creditada.
keywords: [avaliação não enviada, pesquisa não chegou, nota de 0 a 5, avaliação conta para quem, bot de avaliação, avaliação atualizada, resposta da avaliação não registrada, avaliar atendimento automação, uma avaliação por sessão]
publico: llm
tipo: referencia
fontes:
  - api-v0:server/controllers/AutomationEventsController.js
  - api-v0:server/controllers/CallController.js
  - api-v0:server/services/BotService.js
  - api-v0:server/modules/chat/botFlowV2.js
  - web:src/pages/reports/ReportRating/ConfigureRatingModal/index.tsx
codigo:
  - api-v0:server/controllers/AutomationEventsController.js
  - api-v0:server/services/BotService.js
  - api-v0:server/auxiliary/avaliationBotTemplate.json
  - api-v0:server/modules/chat/botFlowV2.js
  - web:src/pages/reports/ReportRating/**
  - web:src/components-old/forms/ActionsInput/index.tsx
verificado_em: 2026-11-26
---

Referência complementar de [Pedir avaliação no fim do atendimento](/docs/atendimento/pesquisa-de-satisfacao).

## Como funciona e texto padrão

- **Quem pode:** criar a automação em **Configurações** → **Automação** → **Automações** exige ser o proprietário ou ter a opção **Automações** ("Ver, adicionar, editar e excluir automações.") na seção **Gerenciamento do Ambiente** do papel (na tela, **Permissão**). Ver as notas e abrir o botão **Configurar** em **Relatórios** → **Avaliação** exige ser o proprietário ou ter **Gerenciar relatórios** ("Ver e gerar relatórios.").
- **Depende de automação:** a pesquisa de satisfação não é enviada sozinha ao resolver uma conversa. Ela só sai quando uma automação ativa com a ação **Avaliar atendimento** é disparada.
- **Bot de avaliação único e texto padrão:** o workspace (na tela, **ambiente**) possui um único bot de avaliação. Em geral, todo workspace novo já nasce com esse bot e com o texto padrão:
  - **Pergunta:** `"Sua opinião é muito importante para nós!\n\nComo você avalia esse atendimento?"`
  - **Opções:** `1` Péssimo, `2` Ruim, `3` Regular, `4` Bom, `5` Ótimo (com emojis).
  - **Texto de agradecimento:** `"Obrigado! 👍"`

## Configuração

- A janela **Configurar Avaliação** abre pelo botão **Configurar** tanto na ação **Avaliar atendimento** da automação quanto em **Relatórios** → **Avaliação**.
- Cada item em **Opções** aceita uma **Nota** de `0` a `5` e um **Texto**; o botão **Opção** adiciona uma linha e o **x** remove.
- Ao clicar em **Salvar**, aparece o aviso `"Avaliação Atualizada."`. Como existe apenas um bot de avaliação no workspace, alterar a configuração em um lugar atualiza todas as automações que usam **Avaliar atendimento**.

## Quando a pesquisa não é enviada

A avaliação não sai quando ocorre qualquer uma das condições abaixo (mesmo quando disparada por gatilhos de tempo da automação, como **Tempo sem nova mensagem**, ou pelo gatilho **Ao resolver uma conversa reaberta**):

- A sessão foi reaberta.
- A sessão já tem uma avaliação registrada (no máximo uma por sessão).
- O contato não mandou nenhuma mensagem naquela sessão.
- A sessão nunca teve um membro responsável (está sem responsável e não teve nenhum responsável anterior).
- O workspace não tem o bot de avaliação configurado (nesse caso, fale com o suporte).

## Registro da resposta e a quem a nota conta

- **Comparação da resposta:** a Kinbox aceita a resposta quando ela é igual à **Nota** ou ao **Texto** de uma das opções (sem diferenciar maiúsculas de minúsculas). Se não for igual, compara com o **Texto** das opções e aceita a partir de 75% de semelhança. Aceita a resposta, grava a **Nota** daquela opção e envia o **Texto de agradecimento**. Resposta que não é aceita não vira nota e segue como mensagem comum da conversa.
- **Atribuição da nota:** a nota conta para o membro responsável pela conversa no momento da resposta. Se a conversa estiver sem responsável, conta para o último membro que foi responsável naquela sessão (veja [Conversas, sessões e status](/docs/conceitos/conversas-e-sessoes)).
- **Relatório e exibição pública:** as notas ficam em **Relatórios** → **Avaliação** ([Relatório de avaliação](/docs/relatorios/avaliacao); **Relatório de Avaliação**, com **Nota Média** e **Avaliadores** por membro, dia, grupo, tag ou canal; cada sessão entra pelo dia em que foi resolvida). A opção **Nota de avaliação pública** em **Configurações** → **Ambiente** → **Geral** ("Mostrar a nota de avaliação de cada membro para os demais nas salas") exibe as notas nas salas.

## O que não existe

- A faixa aceita em **Nota** é de `0` a `5` por opção; não há escala NPS de `0` a `10` com campo próprio.
- Não existe campo para pergunta de motivo da nota em **Configurar Avaliação**.
- Não existe envio da pesquisa por e-mail separado fora da conversa avaliada.
