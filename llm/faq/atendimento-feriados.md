---
title: Como cadastro feriados no horário de atendimento?
description: A Kinbox não tem cadastro de feriados nem de datas especiais, pois cada horário vale apenas por dia da semana; como contorno, edite o horário antes do feriado ou crie um horário separado.
keywords: [feriado, feriados, datas especiais, recesso, horário de feriado, emenda de feriado, expediente no feriado, exceção no horário]
publico: llm
tipo: faq
fontes:
  - web:src/models/businessHours.ts
  - web:src/pages/settings/businesshours/BusinessHoursFormFields.tsx
  - api-v0:server/modules/conditionProcessor.js
codigo:
  - web:src/models/businessHours.ts
  - web:src/pages/settings/businesshours/**
  - api-v0:server/modules/conditionProcessor.js
verificado_em: 2026-11-26
---

## Pergunta

Como cadastro feriados no horário de atendimento?

## Resposta

A Kinbox não tem cadastro de feriados nem de datas especiais: cada horário vale por dia da semana.

Você pode contornar isso de duas formas (como proprietário ou com a opção **Horários** na seção **Gerenciamento do Ambiente** do papel, chamado na tela de **Permissão**):

- **Editar o horário antes do feriado:** vá em **Configurações** → **Ambiente** → **Horários** (no workspace, chamado na tela de **ambiente**), desligue o dia do feriado e ligue novamente depois. Como o horário vale por dia da semana, desligar o dia fecha esse dia da semana em todas as semanas até você religá-lo. Essa mudança afeta tudo o que usa esse horário (relatórios, bot, campanhas, permissões, chat do site, Kinbox Agenda e mensagem de fora do horário). No Kinbox Agenda, cada serviço guarda a própria cópia do horário: a mudança só vale depois de abrir e salvar cada serviço da Agenda que usa esse horário, tanto ao desligar quanto ao religar o dia (veja [Cadastrar serviços e locais](/docs/agenda/servicos-e-locais)). Se o horário for usado por um serviço ativo do Kinbox Agenda e esse for o único dia ativo, não dá para desligá-lo: a Kinbox avisa que o horário está em uso pelo serviço do Kinbox Agenda e precisa ter pelo menos um dia ativo.
- **Criar um horário separado para o período:** cadastre um novo horário em **Horários** e troque apenas nos lugares desejados — por exemplo, no campo **Horários** do bot (que não vale com **Atende todos os canais**) ou no campo **Horário comercial** de uma campanha. O horário escolhido como **Horário comercial** do workspace não pode ser excluído enquanto continuar como padrão.

Veja mais em [Definir os horários de atendimento](/docs/configuracoes-no-workspace/criar-e-gerenciar-horarios).

## Variações

- onde coloco os feriados no horário comercial
- dá para configurar feriado nacional na kinbox
- como pausar o atendimento em um feriado
- existe exceção por data no horário de atendimento
- como colocar aviso de feriado no horário comercial
- a kinbox reconhece feriados automaticamente
