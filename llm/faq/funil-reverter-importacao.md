---
title: Como desfaço uma importação de negociações?
description: Abra o Histórico na tela de importação de negociações (no computador e no layout atual) e clique em Reverter importação em uma importação concluída; exige Gerenciar negociações e não apaga contatos nem tags.
keywords: [desfazer importação, reverter importação, apagar negociações importadas, importei errado, cancelar importação de funil, excluir importação, histórico de importações]
publico: llm
tipo: faq
fontes:
  - web:src/pages/crm/deals/ImportDeals/**
  - web:src/pages/crm/deals/DealsActions/**
  - api:src/modules/deal-imports/**
codigo:
  - web:src/pages/crm/deals/ImportDeals/**
  - web:src/pages/crm/deals/DealsActions/**
  - web:src/pages/settings/pipelines/wizard/PipelineImportStep.tsx
  - api:src/modules/deal-imports/**
  - api:src/modules/deals/**
verificado_em: 2026-11-26
---

## Pergunta

Como desfaço uma importação de negociações?

## Resposta

Vá em **Funis**, abra um funil (no computador e no layout atual), clique em **⋯** → **Importar** → **Histórico**, clique na importação desejada e selecione **Reverter importação** → **Reverter** — essa opção existe apenas para importações com status **Concluído** e pelo menos uma negociação criada, e exige a permissão **Gerenciar negociações** ou ser o proprietário do workspace (veja [Importar negociações](/docs/crm/importar-negociacoes)).

O que você precisa saber antes de reverter:

- **Onde encontrar:** no **Histórico** da tela de importação; se você importou ao criar um funil novo, **Ver detalhes** no cartão de resultado abre a mesma tela. Não há limite de prazo.
- **O que é excluído:** a Kinbox exclui definitivamente todas as negociações criadas por aquela importação — inclusive as que já foram editadas, movidas de etapa ou de funil, ganhas ou perdidas. Antes de confirmar (`"Deseja reverter esta importação e excluir os itens criados por ela ({{count}} negociações)? Esta ação não pode ser desfeita."`), use **Ver … negociações** no mesmo painel para conferir a lista. Depois da reversão, o status muda para **Revertido** e a ação não pode ser desfeita.
- **O que não é desfeito:** contatos criados pela importação, dados preenchidos em contatos existentes e tags criadas permanecem no workspace e devem ser removidos manualmente se necessário.
- **Importação em andamento, cancelada ou que falhou:** durante o processamento, você pode clicar em **Cancelar Importação** (interrompe no próximo lote, mas mantém as negociações já criadas). Importações com status **Cancelado** ou **Falhou** não exibem **Reverter importação** — para remover os itens já criados, exclua as negociações individualmente ou use **Excluir negociações** em [Ações em lote no funil](/docs/crm/acoes-em-lote), filtrando o funil com cuidado antes, pois a ação em lote alcança todas as negociações filtradas e a exclusão é definitiva.

## Variações

- importei uma planilha errada no funil, como apago tudo
- onde fica o botão para reverter importação de negócios
- reverter importação apaga os contatos que foram criados junto
- cancelei a importação no meio e não aparece o botão reverter
- consigo desfazer uma importação que falhou no meio
- existe prazo para reverter uma importação de negociações
