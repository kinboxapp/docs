---
title: "Tarefas: regras, permissões, lembretes e ações em lote"
description: Regras detalhadas das tarefas da Kinbox — permissões, situações e filtros da lista, ações em lote, exportação, valores padrão, prazo, duração e lembrete, subtarefas, comentários, histórico, inscritos e avisos, Iniciar bot e exclusão.
keywords: [tarefas regras, situação pendente atrasado concluída, filtros de tarefas, executar ação em lote, atribuir todas as tarefas, resolver todas as tarefas, exportar tarefas colunas, lembrete não chegou, quem recebe aviso da tarefa, inscritos, seguir tarefa, subtarefa sem prazo, concluir tudo, histórico da tarefa, iniciar bot auto executar, excluir tarefa motivo, proibir excluir tarefas, ver tarefas de outros, agendamentos na lista de tarefas]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/crm/tasks/index.tsx
  - web:src/pages/crm/tasks/TaskStatusDropdown.tsx
  - web:src/pages/crm/tasks/TaskFilters.tsx
  - web:src/pages/crm/tasks/TasksActionsModal.tsx
  - web:src/pages/crm/tasks/TaskModal/Facts.tsx
  - web:src/pages/crm/tasks/TaskModal/Properties.tsx
  - web:src/pages/crm/tasks/TaskModal/Sections.tsx
  - api:src/modules/tasks/tasks.service.ts
  - api:src/modules/tasks/tasks.helper.ts
  - api:src/modules/tasks/tasks-notify.consumer.ts
  - api:src/modules/tasks/tasks-exec.consumer.ts
codigo:
  - web:src/pages/crm/tasks/**
  - web:src/components-old/chat/side/TasksPlugin/**
  - web:src/components-old/common/BigCalendar/**
  - api:src/modules/tasks/*.ts
verificado_em: 2026-11-26
---

Detalhes de referência de [Criar e acompanhar tarefas](/docs/tarefas/criando-e-gerenciando-tarefas).

## Permissões

O item **Tarefas** no menu lateral é aberto a todos os membros (não existe permissão "Gerenciar tarefas"). Na seção **Tarefas** do papel (**Configurações** → **Ambiente** → **Permissões**, veja [Referência de permissões](/docs/administracao/referencia-de-permissoes)):

| Opção | Tipo | Efeito |
| --- | --- | --- |
| **Pode gerenciar as tarefas da conversa.** | libera | Exibe a seção **Tarefas** no painel **Detalhes** da conversa. |
| **Pode ver tarefas atribuídas a outros.** | libera | Exibe na lista de **Tarefas** as tarefas atribuídas a outros membros e o filtro **Membro**. Sem ela, você só vê as tarefas em que é o responsável e o filtro **Membro** não aparece. |
| **Transferir tarefas em massa** | libera | Exibe **Executar ação...** no menu **⋯** do topo da lista, liberando as duas ações em lote (**Atribuir todas as tarefas para um membro** e **Resolver todas as tarefas**). |
| **Proibir excluir tarefas** | restringe | Remove **Excluir** da lista, da janela da tarefa e das subtarefas e impede a exclusão (`"Você não tem permissão para excluir tarefas."`). Nunca se aplica ao proprietário do workspace e não impede excluir comentários ou anexos. |

Os recursos ligados ao **Kinbox Agenda** (tipo **Agendamento**, agendamentos na lista e filtros **Serviço**, **Local** e **Status do agendamento**) aparecem apenas para quem tem a permissão **Gerenciar agendamentos** (seção **Agendas** do papel) ou é o proprietário.

## Status, prioridades e tipos

- **Status:** **Pendente**, **Em andamento**, **Concluída**, **Cancelada**.
- **Prioridades:** **Urgente**, **Alta**, **Média**, **Baixa**, **Sem prioridade** (padrão; o botão de prioridade exibe **Prioridade** quando está sem valor).
- **Tipos:** **Ligar**, **Reunião**, **Agendamento**, **Tarefa** (padrão), **Deadline**, **Almoço**, **E-mail**, **Iniciar bot**.
  - **E-mail** apenas registra o tipo da tarefa e não envia e-mail.
  - **Agendamento** aparece apenas numa tarefa nova e com a permissão **Gerenciar agendamentos**; selecioná-lo troca a janela para o formulário de agendamento do **Kinbox Agenda** ([Criar, reagendar e cancelar agendamentos](/docs/agenda/agendamentos)).
  - **Iniciar bot** aparece apenas quando a tarefa está vinculada a uma conversa.

## Situações da lista

Na ordem exibida pelo seletor (que abre em **Pendente**):

| Situação | O que inclui |
| --- | --- |
| **Concluída** | Tarefas com status **Concluída**. |
| **Pendente** | Tarefas não concluídas e não canceladas (inclui **Em andamento**). |
| **Atrasado** | Tarefas com prazo já vencido que ainda não foram concluídas nem canceladas. |
| **Hoje**, **Amanhã**, **Essa semana**, **Próxima semana**, **Esse mês**, **Próximo mês** | Filtram apenas pelo prazo, no fuso horário do workspace, e incluem também tarefas concluídas e canceladas desse período. |

## Filtros

- **Pesquisar nome...:** busca apenas pelo nome da tarefa.
- **Filtros** → **Filtrar**:
  - **Tipo** (sempre disponível);
  - **Membro** (disponível com **Pode ver tarefas atribuídas a outros.**);
  - **Período:** intervalo de datas e horas do prazo, com os atalhos **Hoje**, **Ontem**, **Últimos 7 dias**, **Últimos 30 dias**, **Esse mês** e **Mês passado**;
  - **Serviço**, **Local** e **Status do agendamento** (**Confirmado**, **Cancelado**, **Concluído**): aparecem com a permissão **Gerenciar agendamentos** e **Tipo** igual a **Agendamento**.

## Lista, cores, ordem e agendamentos

- **Paginação:** 20 tarefas por página.
- **Ordem:** da mais recente para a mais antiga por padrão; quando há agendamentos do **Kinbox Agenda** na lista, a lista inteira é ordenada por prazo.
- **Linhas:** exibem caixinha de conclusão, nome, descrição (ou `↳` com o nome da tarefa principal, nas subtarefas — subtarefas aparecem como linhas próprias), prazo, tipo, negociação ou conversa vinculada, avatar do responsável (dica `"Atribuído a {{name}}"`) e menu **⋯** (**Visualizar** e **Excluir**).
- **Cores do prazo na lista:**
  - **Vermelho:** prazo já vencido (**Ontem**, datas passadas ou hoje com horário já passado);
  - **Verde:** **Hoje** (ou `Hoje às HH:mm` ainda no futuro);
  - **Cor principal:** **Amanhã** e datas futuras;
  - **Cinza, riscada:** tarefa concluída;
  - **`"Sem prazo"`:** subtarefa sem prazo.
  - Na janela da tarefa, o botão do prazo de hoje aparece em laranja.
- **Agendamentos do Kinbox Agenda na lista:** exibem o selo **Kinbox Agenda**, contato e status; a caixinha de conclusão fica desativada e o menu **⋯** oferece apenas **Visualizar**. Na situação **Pendente**, agendamentos concluídos, cancelados e reembolsados ficam de fora, a menos que um **Status do agendamento** seja escolhido nos filtros.
- **Lista vazia:** exibe `"Parece que você ainda não criou nenhuma tarefa..."` e o botão **Criar nova tarefa**.

## Ações em lote

Disponível no menu **⋯** do topo da lista → **Executar ação...** (exige **Transferir tarefas em massa**). Abre **Executar ação em lote** com o campo obrigatório **Ação** e o botão **Executar**:

- **Atribuir todas as tarefas para um membro:** pede **Membro**; durante a execução exibe `"Atribuindo tarefas..."` e ao final `"{{total}} tarefas foram atribuídas"`. Tarefas já atribuídas ao membro escolhido são puladas.
- **Resolver todas as tarefas:** conclui as tarefas; durante a execução exibe `"Resolvendo tarefas..."` e ao final `"{{total}} tarefas foram resolvidas"`. Tarefas já concluídas são puladas. Cada tarefa da lista é concluída por si, sem o **Concluir tudo** da janela: uma subtarefa só é concluída se também estiver na lista com a situação e os filtros aplicados.
- **Alcance:** vale para **todas as tarefas da lista com a situação e os filtros aplicados**, inclusive as das demais páginas. Agendamentos do Kinbox Agenda não entram.
- **Interrupção:** é possível cancelar durante a execução (`"Ação cancelada durante execução"`).

## Exportar

No menu **⋯** do topo da lista → **Exportar** → **CSV** ou planilha do Excel. Exporta todas as tarefas da lista com a situação e os filtros aplicados.

Colunas exportadas:

- **Padrão:** `Tarefa`, `Feito`, `Tipo`, `Responsável`, `Negócio`, `Conversa`, `Contato`, `Criado em`, `Início`, `Fim`, `Origem`, `Serviço`, `Recurso`, `Pessoas`, `Localização`, `Status`, `E-mail`, `Telefone`, `Valor do agendamento`.
- **Com o filtro Tipo = Agendamento:** `Tarefa`, `Feito`, `Contato`, `Data`, `Horário de início`, `Horário de fim`, `Serviço`, `Recurso`, `Pessoas`, `Localização`, `Status`, `E-mail`, `Telefone`.

## Tarefa nova e salvamento

- **Rascunho:** **Nova tarefa** abre com `"· Nova tarefa"` no topo, campo `"O que precisa ser feito?"`, rodapé `"Subtarefas, anexos e comentários ficam disponíveis assim que a tarefa for criada."` e botões **Cancelar** e **Criar tarefa** (desativado sem nome). Atalhos para criar: `Enter` no campo de nome ou `Ctrl + Enter` (`⌘ + Enter` no Mac). Confirmação: `"Tarefa criada"`. Fechar um rascunho com `Esc` ou **✕** descarta sem perguntar.
- **Valores padrão de tarefa nova:** tipo **Tarefa**, **Sem prioridade**, responsável = você (na conversa: o responsável da conversa; na negociação: o responsável da negociação), prazo no próximo horário de 5 em 5 minutos de hoje (ou `09:00` se o dia escolhido não é hoje), **Duração** `5 min`, **Lembrete** `5 min antes`.
- **Salvamento:** depois de criada, toda mudança salva na hora; nome e descrição salvam ao sair do campo.
- **Vínculos:** **Vincular a negócio, conversa ou contato** (ou **+**) permite associar negociação (`"Buscar negócio"`), conversa (por protocolo ou número, ex.: `30041687`) e contato (`"Buscar contato"`). Ao passar o mouse no vínculo: **Abrir negócio**, **Ver conversa**, **Abrir contato** e **Desvincular**.
- **Campos personalizados:** aparecem entre os vínculos e a descrição (apenas os não ocultos; vazio exibe `"Vazio"`; edição com **Salvar**/**Cancelar**). Veja [Criar campos personalizados](/docs/configuracoes-no-workspace/campos-personalizados-no-kinbox).
- **Copiar link:** menu **⋯** da janela → **Copiar link** (aviso `"Link da tarefa copiado"`).

## Prazo, duração e lembrete

- **Prazo obrigatório na principal:** a tarefa principal sempre tem prazo; apenas subtarefas exibem **Remover prazo**.
- **Adiar para** (enquanto a tarefa não está concluída nem cancelada): **Em 1 hora**, **Em 3 horas**, **Amanhã de manhã** (`09:00`) e **Próxima semana** (segunda-feira, `09:00`). Exibe aviso `"Prazo: …"` com botão **Desfazer**.
- **Horário:** intervalos de 5 em 5 minutos.
- **Duração:** `5 min` (padrão), `15 min`, `30 min`, `45 min`, `1 h`, `1 h 30`, `2 h`, `3 h`, `4 h`, `8 h`.
- **Lembrete (opções):** **Na hora**, **5 min antes** (padrão), **15 min antes**, **30 min antes**, **1 hora antes**, **1 dia antes**.
- **Regras do lembrete:**
  - Só existe com **horário** no prazo.
  - Tarefa criada por um membro (na tela): só dispara se o momento do aviso (prazo menos o tempo do lembrete) estiver no **futuro** na criação.
  - Tarefa criada automaticamente (por cadência, por agente de IA ou pela API) para um responsável diferente de quem consta como autor: se o momento do aviso já passou, o lembrete chega na hora.
  - Ao alterar o prazo ou o lembrete de qualquer tarefa, o aviso é remarcado e só dispara se o novo momento estiver no **futuro**.
  - Como a tarefa nova vem com prazo no próximo horário de 5 em 5 minutos e lembrete de **5 min antes**, o momento do aviso já passou e não há lembrete sem escolher um horário mais à frente ou um lembrete que caia no futuro.
  - Vai **apenas para o responsável atual** no momento do aviso; não vai se a tarefa estiver concluída, cancelada ou sem responsável. Inscritos não recebem lembrete.
  - Chega **dentro da Kinbox**: no sino de notificações (`"Tarefa próxima:"` com atalhos `"Ver conversa"` e `"Ver negociação"`) e, com a Kinbox aberta, como aviso `"Tarefa próxima!"` com som (segue a opção **Quando receber mensagem de time** em [Receber notificações no navegador e no celular](/docs/conta/notificacoes)).
  - **Não** há push no celular, e-mail, WhatsApp nem aviso de tarefa atrasada (tarefa vencida apenas fica vermelha na lista e aparece em **Atrasado**).

## Subtarefas e conclusão

- **Aba Subtarefas:** mostra contador `feitas/total` e barra de progresso que fica verde ao chegar em 100%. Campo `"Quebre a tarefa em partes: digite e aperte Enter"` (depois `"Adicionar subtarefa"`), limite de **300 caracteres**.
- **Herança:** a subtarefa nasce com o mesmo responsável da tarefa principal (`"Responsável: {{name}} (o mesmo da tarefa)"`), **sem prazo** e sem os vínculos da principal.
- **Edição e limite:** clicar no nome abre a janela própria (status, prioridade, prazo, comentários, anexos); **←** volta para a tarefa principal (`"Voltar para a tarefa (Esc)"`). Apenas **um nível** é permitido: dentro de uma subtarefa não há aba **Subtarefas**.
- **Concluir tudo:** ao concluir pela janela uma tarefa com subtarefas abertas (canceladas não contam), aparece `"Ainda há 1 subtarefa aberta"` / `"Ainda há {{count}} subtarefas abertas"`, `"Ela será concluída junto com a tarefa."` / `"Elas serão concluídas junto com a tarefa."` e os botões **Concluir tudo** e **Cancelar**. Concluir pela caixinha da lista conclui só a tarefa clicada, sem as subtarefas; **Resolver todas as tarefas** também não conclui subtarefas junto com a principal (só as que estiverem na lista com os filtros aplicados).

## Anexos e comentários

- **Anexos:** na aba **Anexos**, use **Anexar arquivo** ou arraste arquivos diretamente para a janela da tarefa. Remover usa `"Remover anexo"` → `"Remover {{name}} da tarefa?"`.
- **Comentários:** na aba **Comentários**, caixa `"Escreva um comentário… use @ para mencionar"` (vazio: `"Nenhum comentário ainda"`). Reações disponíveis: 👍, 🎉, 👀 e 🙏 (clicar de novo remove). Apenas os próprios comentários podem ser editados ou excluídos (excluir pede `"Essa operação não poderá ser desfeita."`). Quem comenta e quem é mencionado entram automaticamente nos inscritos. Limite: **500 comentários** por tarefa.

## Histórico

A aba **Histórico** mostra até **200 itens**, do mais recente para o mais antigo (vazio: `"Nenhuma alteração registrada."`), com autor `"Você"`, primeiro nome, `"Alguém"` ou `"Automação"`.

- **Registra:** `"criou a tarefa"`, `"mudou o status para …"`, `"passou para …"` (responsável), `"mudou a prioridade para …"`, `"mudou o prazo para …"`, `"removeu o prazo"`, `"anexou …"`, `"inscreveu …"`, `"removeu … dos inscritos"`, `"adicionou a subtarefa …"`, `"concluiu a subtarefa …"`.
- **Não registra:** mudança de nome, descrição, tipo, vínculos, campos personalizados, remoção de anexo nem comentários.

## Inscritos e avisos

No sino do topo da janela (**Inscritos**): botões **Seguir**/**Seguindo**, **Adicionar pessoa** → **Adicionar**, `"Remover dos inscritos"` e marcas `"criou"` e `"responsável"`.

- **Quem entra automaticamente:** quem criou a tarefa, o responsável (e o novo responsável ao trocar), quem comenta e quem é mencionado.
- **Avisos (no sino e na tela, sempre exceto para quem fez a ação):**
  - Tarefa **concluída** → todos os inscritos (`"concluiu a tarefa"`);
  - **Comentário** → todos os inscritos (`"comentou na tarefa"`);
  - **Menção** (`@`) → o membro mencionado (`"mencionou você em uma tarefa"`);
  - **Atribuída ou reatribuída** → apenas o novo responsável (`"atribuiu uma tarefa a você"`).
- Adicionar alguém manualmente em **Adicionar pessoa** não envia aviso. Inscritos não recebem lembrete de prazo.

## Iniciar bot

O tipo **Iniciar bot** aparece apenas quando a tarefa está vinculada a uma conversa (veja [Bot: visão geral](/docs/bot/visao-geral)):

- **Bot** (`"Buscar bot"`): bot a executar.
- **Auto executar:** no horário do prazo, a Kinbox inicia o bot na conversa vinculada e marca a tarefa como concluída. Se a tarefa for concluída antes do prazo, o bot não roda.

## Onde criar

- **Lista de Tarefas:** botão **Nova tarefa**.
- **Conversa:** painel **Detalhes** → **Tarefas** → **+** (exige **Pode gerenciar as tarefas da conversa.**); já vinculada à conversa e ao contato, com responsável da conversa ou você. Veja [Caixa de entrada: visão geral](/docs/conversas/caixa-de-entrada-do-kinbox).
- **Negociação:** botão **Tarefa** abaixo da caixa de comentário; vinculada à negociação, ao contato e à conversa associada, com o responsável da negociação. Veja [Trabalhar com negociações no funil](/docs/crm/gerenciando-funil-de-vendas).
- **Perfil do contato:** aba **Tarefas**. Veja [Contatos: encontrar, cadastrar, editar e excluir](/docs/conversas/clientes-contatos-e-organizacoes).
- **Calendário** (ícone no topo da tela): clicar em um horário cria a tarefa nesse horário; clicar em um dia inteiro cria às `09:00` (ou no próximo horário de 5 em 5 minutos, se for hoje). No calendário também é possível arrastar para outro horário e esticar para alterar a duração.
- **Cadência de funil:** tarefas criadas automaticamente por etapa mostram `"Cadência"` no rodapé (e `"Obrigatória"` quando impedem a mudança de etapa enquanto pendentes; cancelada não trava). Veja [Cadências: tarefas automáticas por etapa](/docs/crm/cadencias).

## Excluir

Pela lista (**⋯** → **Excluir**) ou pela janela (**⋯** → **Excluir tarefa** / **Excluir subtarefa**). Abre `"Excluir tarefa"` com `"Essa operação não poderá ser desfeita. Por favor, informe o motivo da exclusão:"`, campo obrigatório `"Motivo da exclusão..."` e **Excluir** (confirmação `"Excluído."`).

A exclusão não tem volta e apaga junto subtarefas, comentários e histórico. Excluir uma negociação também apaga as tarefas ligadas a ela.

## Mensagens da tela

| Mensagem | O que significa |
| --- | --- |
| `"Não foi possível criar a tarefa."` | Falha ao criar a tarefa. |
| `"Nenhuma conversa encontrada com esse protocolo."` | O protocolo ou número digitado ao vincular uma conversa não corresponde a nenhuma conversa. |
| `"Uma subtarefa não pode ter subtarefas"` | Tentativa de criar subtarefa dentro de outra subtarefa (apenas um nível é permitido). |
| `"Motivo da exclusão é obrigatório."` | Tentativa de excluir a tarefa sem preencher **Motivo da exclusão...**. |
| `"Você não tem permissão para excluir tarefas."` | Seu papel tem a restrição **Proibir excluir tarefas**. |
| `"Você não tem permissão para editar essa tarefa"` | Seu papel não tem **Pode ver tarefas atribuídas a outros.** e a tarefa é de outro membro. |
| `"Você tem tarefas obrigatórias pendentes, não é possível mudar estágio."` | Existe tarefa obrigatória de cadência pendente na negociação; conclua ou cancele para mudar de etapa. |
| `"Valor inválido"` | Valor incompatível com o tipo de um campo personalizado da tarefa. |
| `"Ocorreu um erro ao exportar os dados"` | Falha ao exportar a lista de tarefas. |
