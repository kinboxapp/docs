---
title: Os horários aparecem errados. Como ajusto o fuso?
description: O fuso do workspace fica em Configurações → Ambiente → Geral (campo Fuso horário) e vale para regras; a hora mostrada na tela segue o relógio do aparelho.
keywords: [horário errado, fuso horário, mudar fuso, mensagens com hora errada, mensagem fora do horário errada, bot fora do horário, horário de verão, 1 hora de diferença]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/workspace/index.tsx
  - web:src/lib/timezones.json
  - api-v0:server/auxiliary/Utils.js
  - api-v0:server/modules/conditionProcessor.js
codigo:
  - web:src/pages/settings/workspace/**
  - web:src/lib/timezones.json
  - api-v0:server/auxiliary/Utils.js
  - api-v0:server/modules/conditionProcessor.js
verificado_em: 2026-11-26
---

## Pergunta

Os horários aparecem errados. Como ajusto o fuso?

## Resposta

O fuso do workspace (na tela, **ambiente**) fica em **Configurações** → **Ambiente** → **Geral**, no campo **Fuso horário** (precisa da permissão **Workspace** no papel ou ser o proprietário). Depois de escolher a opção no cartão **Preferências**, clique em **Salvar mudanças**.

O que ajustar depende de onde o horário está errado:

- **Regras do workspace** (horários de atendimento, **Mensagem quando fora do horário comercial**, bot com horário, automações, campanhas e limites de horário do papel): seguem o **Fuso horário** do workspace. Confira esse campo em **Geral** e as faixas cadastradas em [Definir os horários de atendimento](/docs/configuracoes-no-workspace/criar-e-gerenciar-horarios).
- **Hora mostrada na tela** (hora das mensagens, listas e **Auditoria**): segue o relógio e o fuso do computador ou celular de quem está olhando. Mudar o fuso do workspace não altera essa exibição; ajuste a data e a hora do aparelho.

Quando **Fuso horário** está vazio (como acontece em workspaces criados depois em **Criar ambiente**), a maior parte das regras usa o horário de Brasília (UTC−3); escolha o fuso e clique em **Salvar mudanças** para que todas sigam o mesmo horário. Na **Mensagem quando fora do horário comercial**, pode levar até 1 minuto para a virada do horário valer. Em fusos de lugares com horário de verão, a Kinbox aplica uma diferença de horas fixa o ano todo e o horário das regras pode ficar 1 hora diferente em parte do ano — nesse caso, fale com o suporte.

Nos relatórios, o **Horário comercial** escolhido em **Geral** define o que entra no cálculo de TME, TMP e TMA (veja [Como os relatórios contam sessões e tempos](/docs/relatorios/como-funcionam)). Para ver todas as opções da tela, consulte [Configurações gerais do workspace](/docs/configuracoes-no-workspace/configuracoes-gerais).

## Variações

- horário errado na kinbox
- fuso horário errado no ambiente
- mensagens aparecendo com hora errada
- mensagem fora do horário saindo na hora errada
- bot respondendo fora do horário configurado
- como mudar o fuso horário do workspace
- kinbox com 1 hora de diferença no horário de verão
