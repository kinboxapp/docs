---
title: A Kinbox me avisa quando uma tarefa vence?
description: O responsável recebe um lembrete dentro da Kinbox antes do prazo, se a tarefa tiver horário e o momento do lembrete ainda estiver no futuro; não há aviso no celular, por e-mail nem de tarefa atrasada.
keywords: [lembrete de tarefa, aviso de tarefa, notificação de tarefa, tarefa vencida, tarefa atrasada, não recebi o lembrete, alerta da tarefa, lembrete no celular]
publico: llm
tipo: faq
fontes:
  - web:src/pages/crm/tasks/TaskModal/Facts.tsx
  - web:src/pages/crm/tasks/TaskModal/api.ts
  - api:src/modules/tasks/tasks.service.ts
  - api:src/modules/tasks/tasks-notify.consumer.ts
codigo:
  - web:src/pages/crm/tasks/TaskModal/**
  - api:src/modules/tasks/tasks.service.ts
  - api:src/modules/tasks/tasks-notify.consumer.ts
  - api:src/modules/push-notifications/**
verificado_em: 2026-11-26
---

## Pergunta

A Kinbox me avisa quando uma tarefa vence?

## Resposta

Sim, se a tarefa tiver horário no prazo e o momento do lembrete ainda estiver no futuro quando você cria a tarefa na tela ou muda o prazo ou o lembrete: o responsável recebe um aviso dentro da Kinbox.

Para configurar, abra a tarefa, clique no botão do prazo e escolha uma opção em **Lembrete**: **Na hora**, **5 min antes** (padrão), **15 min antes**, **30 min antes**, **1 hora antes** ou **1 dia antes**.

Regras importantes:

- **Prazo padrão de tarefa nova:** uma tarefa nova já vem com prazo no próximo horário de 5 em 5 minutos e lembrete de **5 min antes**, então o momento do aviso já passou e o lembrete não dispara. Para receber o aviso, escolha um horário mais à frente ou um lembrete que caia no futuro. Sempre que você altera o prazo ou o lembrete para um momento futuro, o aviso é atualizado.
- **Tarefas automáticas:** tarefas criadas por cadência, por agente de IA ou pela API para um responsável diferente de quem consta como autor avisam na hora se o momento do lembrete já tiver passado. Depois de criadas, mudar o prazo ou o lembrete segue a mesma regra do futuro.
- **Quem recebe:** apenas o responsável atual no momento do aviso. Inscritos não recebem lembrete, e tarefas já concluídas, canceladas ou sem responsável não geram aviso.
- **Onde chega:** dentro da Kinbox, no sino de notificações (como "Tarefa próxima:", com atalhos para a conversa e a negociação vinculadas) e, com a Kinbox aberta, como aviso na tela ("Tarefa próxima!") com som — o som segue a preferência **Quando receber mensagem de time** em [Receber notificações no navegador e no celular](/docs/conta/notificacoes).
- **O que não existe:** não há notificação push no celular, e-mail, WhatsApp nem aviso de tarefa atrasada. Quando o prazo passa, a tarefa fica vermelha na lista e aparece na situação **Atrasado**.

Veja todos os detalhes em [Criar e acompanhar tarefas](/docs/tarefas/criando-e-gerenciando-tarefas).

## Variações

- não recebi o lembrete da minha tarefa
- a kinbox manda alerta quando uma tarefa está para vencer
- tarefa atrasada envia notificação na kinbox
- o lembrete de tarefa chega no aplicativo do celular
- como configurar o aviso antes do prazo de uma tarefa
- a kinbox avisa por e-mail quando uma tarefa vence
