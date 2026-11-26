---
title: Posso conectar várias caixas de e-mail?
description: "Sim: crie um canal de e-mail para cada caixa; no teste grátis o limite é de 3 canais ativos e na assinatura paga atual não há limite de quantidade."
keywords: [várias caixas de email, quantos emails posso conectar, limite de email, múltiplos emails, dois workspaces, mesma conta de email, restringir email por grupo]
publico: llm
tipo: faq
fontes:
  - api-v0:server/modules/accessRestriction/rules.js
  - api-v0:server/modules/accessRestriction/funcionalitiesAccess.js
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/controllers/MailController.js
codigo:
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/channels/email/**
  - api-v0:server/controllers/MailController.js
  - api-v0:server/modules/mail/**
  - api-v0:server/modules/scheduler/MailScheduler.js
  - api-v0:server/modules/accessRestriction/**
verificado_em: 2026-11-26
---

## Pergunta

Posso conectar várias caixas de e-mail?

## Resposta

Sim: cada caixa de e-mail é um canal na Kinbox, então crie um canal para cada caixa que você quiser atender. Você pode combinar tipos diferentes de conexão no mesmo workspace (por exemplo, uma caixa **Por encaminhamento** e outra por **IMAP/SMTP**).

Os limites de canais de e-mail ativos dependem do plano (canais excluídos não entram na contagem):

- **Teste grátis:** até **3** canais de e-mail ativos (tentar conectar o quarto mostra `"Seu plano atual não permite adicionar o novo canal"`).
- **Assinatura paga atual em dia:** sem limite de quantidade de canais de e-mail.
- **Assinatura antiga paga:** até **10** canais de e-mail ativos.

Regras para contas repetidas e visibilidade:

- **Outro workspace:** no **IMAP/SMTP** e no **Outlook**, a caixa cadastrada (**IMAP Usuário** ou **Graph Sender**) não pode ser canal ativo de dois workspaces (`"Essa conta já foi adicionada em outro ambiente"`). Excluir o canal no outro workspace não libera a caixa: fale com o suporte antes de excluir. No encaminhamento, cada canal tem um endereço próprio gerado pela Kinbox.
- **Mesmo workspace:** no **IMAP/SMTP** e no **Outlook**, conectar de novo o mesmo endereço (**IMAP Usuário** ou **Graph Sender**) atualiza o canal existente sem duplicar. No **Por encaminhamento**, cada canal criado recebe um endereço próprio.
- **Conversas:** quando o mesmo contato escreve para duas caixas diferentes, cada canal mantém a sua própria conversa com esse contato.
- **Visibilidade por grupo:** não existe opção para restringir a visibilidade de um canal de e-mail por grupo. A opção **Restringir visibilidade** existe em outros canais (veja [Criar grupos de atendimento](/docs/configuracoes-no-workspace/criar-e-gerenciar-grupos)).

Veja como escolher a conexão em [Conectar o e-mail: qual opção escolher](/docs/canais/e-mail/visao-geral) e os limites gerais em [Canais: conectar e gerenciar](/docs/canais/visao-geral).

## Variações

- quantos endereços de e-mail posso conectar na kinbox
- posso ligar e-mail do financeiro e do suporte no mesmo workspace
- dá para misturar encaminhamento e imap na mesma conta
- posso conectar o mesmo e-mail em dois workspaces da kinbox
- consigo limitar qual grupo vê cada canal de e-mail
- existe limite de canais de e-mail no teste grátis
