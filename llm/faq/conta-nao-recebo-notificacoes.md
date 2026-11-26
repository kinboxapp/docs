---
title: Por que não sou avisado das novas mensagens?
description: Confira se Habilitar notificações de desktop e o tipo de aviso estão ligados em Configurações → Notificações e se o navegador permite notificações; os sons de nova mensagem também pedem que você esteja disponível.
keywords: [não recebo notificações, sem notificação, notificação não aparece, push não chega, som não toca, não toca alerta, aviso de mensagem, notificação no celular, não recebo conversas]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/profile/Notifications.tsx
  - web:src/sw.ts
  - web:src/hooks/useSocket.tsx
  - api:src/modules/push-notifications/push-notifications.service.ts
  - mobile:src/app/notifications.tsx
codigo:
  - web:src/pages/settings/profile/Notifications.tsx
  - web:src/pages/settings/profile/NotificationPushSwitch.tsx
  - web:src/sw.ts
  - web:src/hooks/usePushNotification.ts
  - web:src/hooks/useSocket.tsx
  - web:src/pages/inbox/index.tsx
  - api:src/modules/push-notifications/**
  - api:src/modules/userInfo/**
  - mobile:src/app/notifications.tsx
verificado_em: 2026-11-26
---

## Pergunta

Por que não sou avisado das novas mensagens?

## Resposta

Confira se o push está ligado em **Configurações** → **Notificações** (**Habilitar notificações de desktop** e o tipo do aviso desejado, salvando em **Salvar mudanças**) e se o navegador permite notificações para a Kinbox.

Principais causas quando os avisos não chegam:

- **Push desligado:** **Habilitar notificações de desktop** ou a opção do tipo (**Mensagem**, **Mensagem de time** ou **Atribuído**) está desativada em **Configurações** → **Notificações**.
- **Permissão negada no navegador:** o navegador bloqueou as notificações da Kinbox (a tela mostra o aviso de permissão negada); libere nas configurações do navegador e recarregue a página da Kinbox. O pedido de permissão aparece ao abrir a Kinbox ou a **Caixa de entrada**, não ao salvar.
- **Kinbox aberta e visível na tela:** o push do navegador não aparece enquanto alguma aba da Kinbox está visível — nessa situação, só tocam os sons.
- **Conversa não atribuída a você:** o push de **Mensagem** e o de **Atribuído** avisam apenas o responsável pela conversa; conversa sem responsável não gera push. O push de **Mensagem de time** depende de menção numa sala ou de mensagem direta.
- **Outro workspace:** as opções de **Push** valem só para o workspace aberto; configure também nos outros workspaces de que você participa.
- **Som não toca:** o interruptor correspondente está desligado no cartão **Som**, a Kinbox não está aberta, você está **Indisponível** (manualmente, por inatividade ou por horário do papel; os sons de nova mensagem e de nova conversa só tocam com você disponível) ou a conversa não é a que está aberta nem está na visão ou no filtro selecionado da **Caixa de entrada**. Com várias abas abertas, o som toca só em uma. Depois de "Você foi desconectado por inatividade.", nenhum som toca até você clicar em **Reconectar**.
- **No celular:** confira no app, em **Você** → **Notificações**, se **Receber notificações** está ligado (ele é independente de **Habilitar notificações de desktop**); se **Quando receber** estiver em **Quando não estiver usando o web**, o celular não avisa enquanto você usa a Kinbox no navegador (aba visível e em uso); com **Só no horário comercial** ligado, o app só avisa dentro do horário padrão do workspace. Com a conversa ou a sala aberta no app, o aviso não se repete, e salas que você silenciou não geram push no app.
- **Salas bloqueadas:** membros com a restrição **Não pode acessar as salas** no papel não recebem push de salas no app. Veja [Conversar nas salas: mensagens diretas, menções e threads](/docs/salas/usar-salas).
- **Não recebo novas conversas (diferente de não receber avisos):** se novas conversas não estão caindo para você pela atribuição automática, confira se você não está **Indisponível** (manualmente, por inatividade ou por horário do papel).

Veja como ajustar em [Receber notificações no navegador e no celular](/docs/conta/notificacoes) e [Ficar disponível ou indisponível](/docs/conta/disponibilidade).

## Variações

- as notificações da kinbox não aparecem no navegador
- não toca barulho quando chega mensagem nova
- recebo notificação de um ambiente mas de outro não
- por que o aplicativo da kinbox não me notifica no celular
- cliente manda mensagem e não aparece alerta na tela
- parei de receber avisos e novas conversas na kinbox
- ativei as notificações mas não chega nenhum push
