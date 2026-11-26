---
title: "Cadências: quando a tarefa nasce, vence, é concluída e roda o bot"
description: Regras detalhadas da cadência dos funis na Kinbox — quando cada tipo de tarefa é criada, prazo e fuso, o que acontece se a negociação sai ou volta para a etapa, tarefa obrigatória, regras do funil ligadas à cadência e execução automática de bot.
keywords: [cadência regras, quando a tarefa da cadência é criada, dias corridos, fim de semana, negociação saiu da etapa, voltou para a etapa, tarefa concluída sozinha, obrigatória para avançar, executar o bot sozinho, bots em fila, criar conversa se não houver, bot da cadência não rodou, todo mês, dias depois, ao entrar]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/crm/tasks/TaskModal/CadenceTemplate.tsx
  - api:src/modules/pipelines/cadence.service.ts
  - api:src/modules/pipelines/cadence-month-day.service.ts
  - api:src/modules/pipelines/cadence-schedule.helper.ts
  - api:src/modules/tasks/cadence.consumer.ts
codigo:
  - web:src/pages/crm/tasks/TaskModal/**
  - web:src/pages/settings/pipelines/PipelineCadenceBoard.tsx
  - api:src/modules/pipelines/cadence.service.ts
  - api:src/modules/pipelines/cadence-month-day.service.ts
  - api:src/modules/pipelines/cadence-schedule.helper.ts
  - api:src/modules/tasks/cadence.consumer.ts
  - api:src/modules/deals/**
verificado_em: 2026-11-26
---

Detalhes de referência de [Cadências: tarefas automáticas por etapa](/docs/crm/cadencias). Veja também [Criar um funil e as etapas](/docs/crm/criar-funil-de-vendas) e [Motivos de perda, campos obrigatórios e regras do funil](/docs/crm/motivos-de-perda-e-regras).

## Permissões, salvamento e atalhos

- **Quem configura:** exige a permissão **Funis** (seção **Gerenciamento do Ambiente**) ou ser proprietário do workspace; não exige **Gerenciar negociações**.
- **Restrição de exclusão:** a restrição **Proibir excluir tarefas** (seção **Tarefas**) oculta as opções de remover modelos da cadência.
- **Gravação:** os botões **Adicionar à etapa** e **Salvar modelo** guardam o modelo apenas na tela; as alterações só são gravadas quando o funil é salvo (**Criar funil** ou **Salvar funil**). Fechar o assistente com alterações pendentes abre **Fechar sem salvar?**. Ao excluir uma etapa do funil, os modelos dela somem da cadência ao salvar.
- **Atalhos no quadro da cadência:** `Ctrl`/`⌘` + clique e `Shift` + clique selecionam modelos; `Ctrl`/`⌘` + `A` seleciona todos; `Ctrl`/`⌘` + `C` copia e `Ctrl`/`⌘` + `V` cola na etapa sob o cursor; `Delete`/`Backspace` exclui; `Esc` limpa a seleção. A barra de seleção oferece **Clonar**, **Excluir** e **Limpar seleção**. Na janela **Modelo de tarefa**, `Enter` no campo de nome ou `Ctrl`/`⌘` + `Enter` salva e `Esc` fecha.
- **Funil Operacional:** o passo chama-se **Cadência operacional** e os textos da tela trocam "negócio" por "ticket".

## Campos e padrões do Modelo de tarefa

| Campo | Opções e valor padrão | Observação |
| --- | --- | --- |
| **Tipo da tarefa** | **Tarefa** (padrão), **Ligar**, **Reunião**, **Deadline**, **Almoço**, **E-mail**, **Iniciar bot** | Apenas **Iniciar bot** executa uma ação automaticamente; os demais definem apenas o ícone e o rótulo da tarefa. |
| **Nome** | Texto livre | Único campo obrigatório (sem nome, o botão de salvar fica desativado). |
| **Quando** | **Ao entrar** (padrão), **Dias depois** (mínimo 1 dia; atalhos 1, 2, 3, 5, 7, 10, 15, 30 e **Outro**), **Todo mês** (dia 1 a 31; atalhos 1, 5, 10, 15, 20, 25, 28, 31 e **Outro**) | Em **Todo mês**, para dias acima de 28 em meses mais curtos, cai no último dia do mês (`"Em meses sem o dia {{day}}, cai no último dia do mês."`). |
| **Responsável** | **Responsável do negócio** (padrão; no operacional, **Responsável do ticket**) ou membro ativo | Se a negociação não tem responsável, a tarefa com **Responsável do negócio** fica sem responsável. |
| **Prioridade** | **Sem prioridade** (padrão), **Urgente**, **Alta**, **Média**, **Baixa** | — |
| **Duração** | **5 min** (padrão), 15 min, 30 min, 45 min, 1 h, 1 h 30, 2 h, 3 h, 4 h, 8 h | Define o término da tarefa (`prazo + duração`); não altera quando a tarefa nasce nem vence. |
| **Lembrete** | **Na hora**, **5 min antes** (padrão), **15 min antes**, **30 min antes**, **1 hora antes**, **1 dia antes** | Aparece apenas quando o prazo é **Num horário fixo** e **Bots em fila** está desligada. |
| **Bot** | Seletor de bots do workspace | Aparece apenas quando o tipo é **Iniciar bot**. |
| **Regras** | **Obrigatória para avançar** (desligada por padrão); em **Iniciar bot**: **Executar o bot sozinho**, **Criar conversa se não houver** (+ **Canal** de **WhatsApp** ou **SMS** dos grupos do membro) e **Bots em fila** (**Intervalo entre os bots**: 1, 2, 5 padrão, 10, 15, 30, 60, 120 ou **Outro**, mínimo 1 min) | Desligar **Executar o bot sozinho** desliga também **Criar conversa se não houver** e **Bots em fila**. Com **Bots em fila** ligada, o modo **Todo mês** fica bloqueado. |

## Quando a tarefa nasce e quando vence

| Modo em **Quando** | Prazo escolhido | Quando a tarefa nasce | Quando a tarefa vence |
| --- | --- | --- | --- |
| **Ao entrar** | **Na hora da entrada** (padrão) | Na entrada na etapa | No momento da entrada |
| **Ao entrar** | **Alguns minutos depois** (mínimo 1 min) | Na entrada na etapa | X minutos depois da entrada |
| **Ao entrar** | **Num horário fixo** | Na entrada na etapa | Hoje no horário escolhido (se já passou, nasce atrasada, salvo regra de bloqueio) |
| **Dias depois** | **No mesmo horário da entrada** (padrão) | No dia N (antes do dia N, não aparece na negociação) | N dias corridos depois, no mesmo horário da entrada |
| **Dias depois** | **Num horário fixo** | No dia N | N dias corridos depois, no horário fixo escolhido |
| **Todo mês** | **No início do dia** (padrão) | No dia escolhido do mês, enquanto a negociação estiver na etapa | No início do dia |
| **Todo mês** | **Num horário fixo** | No dia escolhido do mês, enquanto a negociação estiver na etapa | No horário fixo escolhido |

- **Dias corridos:** a contagem usa dias do calendário — sábados, domingos e feriados contam normalmente (não há modo de dias úteis).
- **Fuso horário:** o horário fixo e o dia do mês seguem o fuso configurado no workspace (padrão `America/Sao_Paulo`).
- **Todo mês na entrada:** se a negociação entra na etapa no próprio dia escolhido, a tarefa nasce na entrada; se entra depois desse dia, nasce apenas no mês seguinte.

## Gatilhos, saída, retorno e alterações

- **O que dispara a cadência:** toda criação de negociação (na etapa inicial) e toda mudança de etapa — pela tela, por [Importar negociações](/docs/crm/importar-negociacoes), por **Mover todos os negócios** em [Ações em lote no funil](/docs/crm/acoes-em-lote) e por [automações](/docs/automacao/gatilhos-e-acoes) (ação **Mudar etapa da negociação**). Reenviar a mesma etapa não dispara.
- **Conferências antes de criar tarefas agendadas:** a Kinbox verifica se a negociação ainda está na etapa, se o modelo ainda existe naquela etapa, se a negociação está **Aberta** (ou se a regra de criar após encerramento está ligada) e se a negociação ainda não recebeu tarefa daquele modelo.
- **Saída da etapa:** as tarefas pendentes criadas pelos modelos da etapa que a negociação deixou são **concluídas automaticamente** (não excluídas nem canceladas), e tarefas agendadas que ainda não nasceram não são mais criadas.
- **Voltar para a etapa:** a negociação não recebe novamente tarefas de **Ao entrar** ou **Dias depois** de modelos que ela já recebeu naquela etapa (mesmo que já tenham sido concluídas). Se sair e voltar antes do dia N de uma tarefa agendada, a tarefa mantém a data original da primeira entrada. Apenas modelos **Todo mês** continuam criando uma tarefa por mês enquanto a negociação permanecer na etapa.
- **Alterar ou excluir modelos:** modelos novos de **Ao entrar** e **Dias depois** valem apenas para as próximas negociações que entrarem na etapa (`"Vale só para os próximos negócios que entrarem na etapa. Tarefas já criadas não mudam."`). Modelos **Todo mês** também se aplicam às negociações que já estão na etapa. Excluir ou mover um modelo para outra etapa impede a criação das tarefas agendadas dele que ainda não nasceram.

## Tarefa obrigatória e regras do funil

- **Obrigatória para avançar:** ao mudar a etapa, qualquer tarefa obrigatória pendente (não concluída e não cancelada) da negociação bloqueia a mudança com `"Você tem tarefas obrigatórias pendentes, não é possível mudar estágio."`. Modelos **Dias depois** só travam a partir do dia em que a tarefa nasce. Concluir ou cancelar a tarefa libera a mudança de etapa.
- **Não executar tarefas anteriores ao horário de mudança de etapa no mesmo dia.:** impede a criação de tarefas com horário fixo cujo horário de hoje já passou no momento da entrada (`"Se um negócio entrar agora, as {{time}} de hoje já passaram: pela regra do funil, a tarefa não é criada."`).
- **Criar tarefas de cadência mesmo após negócio ganho ou perdido.** *(operacional: **Criar tarefas de cadência mesmo após ticket resolvido ou não resolvido.**)*: sem essa regra, tarefas agendadas e mensais não são criadas para negociações já encerradas; com ela ligada, continuam sendo criadas.

## Iniciar bot e lembrete

- **Executar o bot sozinho:** sem essa opção ligada, **Iniciar bot** cria apenas uma tarefa manual. Com ela ligada, no prazo da tarefa (ou imediatamente, se um horário fixo de hoje já passou sem a regra de bloqueio), a Kinbox dispara o bot e marca a tarefa como concluída automaticamente.
- **Conversa usada:** o bot executa na conversa associada à negociação **no momento em que a tarefa nasceu**. Se a negociação não tiver conversa associada, o bot não roda e a tarefa permanece aberta — a menos que **Criar conversa se não houver** esteja ligada com um **Canal** de **WhatsApp** ou **SMS** (dentre os canais dos grupos do membro) e o contato tenha telefone válido; nesse caso, a Kinbox cria a conversa no canal escolhido, associa à negociação e inicia o bot.
- **Bots em fila:** os bots configurados com essa opção em todo o funil rodam um de cada vez, separados pelo intervalo escolhido (padrão 5 minutos). Cada bot ocupa o próximo horário livre do funil após o seu prazo: o primeiro dispara um intervalo depois do prazo, e cada seguinte um intervalo depois do anterior.
- **Lembrete:** disponível apenas com **Num horário fixo** e sem **Bots em fila**. Envia uma notificação na lista de notificações da Kinbox para o responsável X minutos antes do prazo (se a tarefa não estiver concluída nem cancelada e tiver responsável; se o horário do lembrete já passou na criação e o responsável não é quem criou a negociação, a notificação sai na hora).

## Onde ver as tarefas

As tarefas criadas pela cadência aparecem no menu lateral **Tarefas** (ver tarefas de outros membros exige **Pode ver tarefas atribuídas a outros.**), na seção **Tarefas** dentro da negociação e na seção **Tarefas** do painel lateral da conversa (para quem tem **Pode gerenciar as tarefas da conversa.**). No histórico da negociação, a criação aparece registrada com o autor **Cadência**.
