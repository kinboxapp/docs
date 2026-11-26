---
title: "Notificações e disponibilidade: push, sons, inatividade e horário"
description: Regras de quem recebe cada aviso de push e som, o que vale por workspace e para a conta toda, a ligação com o app e quando a Kinbox deixa o membro indisponível ou offline sozinha.
keywords: [push, notificação, som, permissão do navegador, você negou permissões, notificação no celular, quando não estiver usando o web, indisponível, inatividade, tornar indisponível se inativo, desconectado por inatividade, reconectar, horário para ficar disponível, não pode ficar indisponível]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/profile/Notifications.tsx
  - web:src/sw.ts
  - web:src/hooks/useSocket.tsx
  - web:src/hooks/useInit.tsx
  - api:src/modules/push-notifications/push-notifications.service.ts
  - api:src/modules/push-notifications/mobile-push.policy.ts
codigo:
  - web:src/pages/settings/profile/Notifications.tsx
  - web:src/sw.ts
  - web:src/hooks/useSocket.tsx
  - web:src/hooks/useInit.tsx
  - web:src/hooks/useToggleAvaliable.ts
  - web:src/hooks/useAutoAvaliableBusinessHours.tsx
  - web:src/components-old/header/UserDrop.tsx
  - api:src/modules/push-notifications/**
  - api:src/modules/userInfo/**
  - mobile:src/app/notifications.tsx
verificado_em: 2026-11-26
---

## Push no navegador e no app

- As opções de **Push** em **Configurações** → **Notificações** valem só para o workspace (na tela, **ambiente**) aberto. Só os três tipos de aviso (tabela abaixo) são compartilhados com o app para celular: alterar em um lugar altera no outro. **Habilitar notificações de desktop** (navegador) e **Receber notificações** (app) são independentes.
- Para receber push no navegador, **Habilitar notificações de desktop** e o tipo desejado precisam estar ligados.
- O navegador pede a permissão de notificações quando a Kinbox ou a **Caixa de entrada** abre, não ao salvar. Depois de liberar a permissão no navegador, é preciso recarregar a página para o push passar a funcionar.
- O push não depende da disponibilidade: chega também com o membro **Indisponível**.
- Conversa sem responsável não gera push de **Mensagem**.

| Opção no navegador | Texto na tela | Quem recebe | Nome no app |
| --- | --- | --- | --- |
| **Mensagem** | "Quando receber nova mensagem atribuída a você" | Só o responsável pela conversa | **Novas mensagens** |
| **Mensagem de time** | "Quando for mencionado em uma sala ou receber uma mensagem direta." | Quem foi mencionado ou recebeu a mensagem direta | **Mensagens diretas e menções** |
| **Atribuído** | "Quando uma conversa for atribuída a você." | O novo responsável pela conversa | **Atribuídas a mim** |

### Quando o push do navegador não aparece

- Alguma aba da Kinbox está aberta e visível naquele navegador (nesse caso valem os sons).
- **Habilitar notificações de desktop** ou o tipo específico está desligado.
- A permissão de notificações está negada no navegador. Com a opção ligada e a permissão negada, a tela exibe: "Você negou permissões para postar notificações push nesse navegador. Por favor, vá para suas configurações e ative as notificações push."

### Opções só do app para celular (aba **Você** → **Notificações**)

- **Receber notificações**: liga ou desliga o push no app.
- **Quando receber**: **Sempre** ou **Quando não estiver usando o web** (padrão: **Quando não estiver usando o web**). Com **Sempre**, o app avisa mesmo com a Kinbox visível no navegador. Com o padrão, o app não avisa enquanto o membro usa o web de verdade: aba visível, em foco e com interação nos últimos 2 minutos; uma aba em segundo plano não conta como uso.
- **Só no horário comercial**: o app só avisa dentro do horário padrão do workspace. Se o workspace não tiver horário padrão configurado, os avisos podem chegar a qualquer hora.
- Com a mesma conversa ou sala aberta na tela do app, o app não repete o aviso.
- Salas silenciadas pelo membro não geram push no app.
- Guia completo das notificações do app: [Notificações no app](/docs/app/notificacoes-no-app).

### Restrição de salas e salvamento

- Membros com a restrição **Não pode acessar as salas** no papel não acessam as salas e não recebem push das salas no app (a restrição não vale para o proprietário).
- Ao mudar qualquer opção em **Configurações** → **Notificações**, aparecem **Cancelar** e **Salvar mudanças**. Ao salvar, aparece "Suas notificações foram atualizadas." Ao sair sem salvar, aparece "Você tem mudanças não salvas, tem certeza que deseja sair?"

## Sons

- Os sons de **Configurações** → **Notificações** valem para a conta toda (todos os workspaces) e tocam só com a Kinbox aberta, numa aba só: a última aberta no navegador.
- Os sons de nova mensagem e de nova conversa só tocam com o membro **Disponível** no workspace aberto (inclusive quando a Kinbox o deixou indisponível por inatividade ou pelo horário do papel). A conversa aberta toca mesmo fora da visão ou do filtro; as demais precisam ser conversas que o membro pode ver e que estão na visão ou no filtro selecionado da **Caixa de entrada**. Não importa se a aba está em foco. Essa regra vale só para esses sons da **Caixa de entrada**, não para o som de mensagem de time.

| Opção | Quando toca |
| --- | --- |
| **Quando receber nova mensagem** | Mensagem do contato numa conversa que entra na regra acima (o membro precisa estar **Disponível**) |
| **Quando receber nova mensagem atribuída a mim** | Com **Quando receber nova mensagem** desligada: mensagem do contato numa conversa em que o membro é o responsável (o membro precisa estar **Disponível**) |
| **Quando receber nova conversa** | Conversa nova que entra na visão ou no filtro selecionado, ou sessão nova que começa numa conversa que já existia (o membro precisa estar **Disponível**) |
| **Quando receber mensagem de time** | Mensagem de sala, menção, lembrete de tarefa e aviso de template (não depende da disponibilidade) |
| **Quando ganhar uma negociação** | Ao marcar uma negociação como ganha (som de caixa registradora e aplausos) |
| **Quando receber notificação de outro ambiente** | Essa opção não toca som e não altera os sons acima; para acompanhar outro workspace, troque para ele (veja [Trocar de workspace ou criar outro](/docs/conta/trocar-de-workspace)) |

- **Recursos em teste (podem não aparecer em todos os workspaces):** **Quando receber ligação do WhatsApp** ("Toca e mostra o aviso para atender em qualquer tela") e **Quando receber ligação do WhatsApp em conversa sem responsável** ("Desligado, a ligação aparece só na lista de conversas"). Essas duas valem só para o workspace aberto (ficam junto das opções de push). Sem o aviso, quem pode atender ainda atende pela mensagem da ligação na conversa (veja [Fazer e receber ligações pelo WhatsApp oficial (Beta)](/docs/canais/whatsapp/whatsapp-cloud-api/ligacoes-pelo-whatsapp)).

## Disponibilidade, inatividade e horário

- **Troca manual:** feita na foto no canto superior direito → interruptor **Disponível** (**Disponível** "Recebe novos atendimentos" com bolinha verde / **Indisponível** "Sem novos atendimentos" com bolinha laranja). Vale só para o workspace aberto. Quem fica indisponível manualmente continua assim até alterar manualmente de volta ("Você está indisponível. Seu status permanecerá assim até que você altere manualmente para disponível.").
- **Efeito:** ficar indisponível tira o membro das regras de rodízio entre membros e de "menos atendimentos" da **Atribuição automática** (veja [Estratégias de atribuição automática](/docs/atendimento/estrategias-de-atribuicao)) e silencia os sons de nova mensagem e de nova conversa. Conversas já atribuídas permanecem com o membro, e atribuição manual continua possível. O push (navegador e app) e o som de mensagem de time continuam; para pará-los, é necessário desligá-los em **Notificações**.
- **Horário do papel** (**Limitar horário que pode ficar disponível**): fora do horário definido, o membro fica indisponível automaticamente e volta a ficar disponível no início do horário — apenas se a indisponibilidade tiver sido automática por horário.
- **Indisponível por inatividade** (**Tornar indisponível se inativo.**): configuração do workspace em minutos. Após o tempo sem atividade em todas as abas abertas da Kinbox (mouse, teclado, rolagem, toque ou foco), o membro fica indisponível (e para de ouvir os sons de nova mensagem e de nova conversa) e volta a ficar disponível automaticamente ao interagir novamente. Não afeta quem ficou indisponível manualmente, quem tem **Não torna indisponível se ficar inativo** no papel nem o proprietário.
- **Offline por inatividade** (**Tornar offline se inativo**): configuração do workspace (de 1 a 1444 minutos). Após o tempo sem atividade, a Kinbox desconecta a atualização em tempo real e mostra "Você foi desconectado por inatividade." com o botão **Reconectar**; até clicar em **Reconectar**, nenhum som toca. Não afeta quem tem **Não torna offline se ficar inativo** nem o proprietário.
- **Proprietário:** as restrições do quadro **Restrições** não se aplicam ao proprietário, e ele nunca fica indisponível nem offline por inatividade.

### Mensagens de erro ao alterar disponibilidade

| Mensagem na tela | Causa |
| --- | --- |
| "Você não tem permissão para ficar indisponível" | Papel tem a restrição **Não pode ficar indisponível** |
| "Você não tem permissão para mudar sua disponibilidade. Fale com seu gestor." | Papel tem a restrição **Não pode mudar disponibilidade** |
| "Você não pode ficar disponível fora do horário de trabalho" | Papel tem a restrição **Limitar horário que pode ficar disponível** e a tentativa ocorreu fora do horário |

Veja os guias [Receber notificações no navegador e no celular](/docs/conta/notificacoes) e [Ficar disponível ou indisponível](/docs/conta/disponibilidade).
