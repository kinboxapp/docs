---
title: "Agenda: disponibilidade, permissões, tarifas, reserva de lugares e capacidade"
description: Regras e limites do Kinbox Agenda — disponibilidade por workspace, permissões e o que cada uma mostra, serviços, tarifas adicionais, reserva de lugares, capacidade dos locais, agendamentos, presença, reagendamento, cancelamento, dados exigidos do contato, mensagens de erro e o que a Agenda não faz.
keywords: [kinbox agenda plano, adicione o agenda ao seu plano, liberar potencial agora, permissão gerenciar agendamentos, não vejo agendamentos, limite de pessoas, unir locais, intervalo entre reservas, capacidade do local, ordem de uso, pode ser juntado, ambiente, trocar espaços, selecione no máximo 10 espaços, agenda indisponível, nenhum horário disponível, data de nascimento obrigatória, campo vinculado ao kinbox agenda, fuso horário da agenda, lembrete de agendamento, google calendar agenda, excluir agendamento]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/agendas/EditKingendaService.tsx
  - web:src/pages/settings/agendas/EditKingendaResource.tsx
  - web:src/pages/kingenda/kingendaBookingDetails.tsx
  - web:src/pages/crm/tasks/EditTask.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
  - web:src/hooks/useKingendaEnabled.ts
  - web:src/pages/agents/flow/useFlow.tsx
  - web:src/pages/agents/components/tools/ToolsPicker.tsx
  - api:src/modules/agents/flow/actions/agenda.helper.ts
  - api:src/modules/agents/flow/actions/agenda.operations.ts
codigo:
  - web:src/pages/kingenda/**
  - web:src/pages/settings/agendas/**
  - web:src/pages/settings/location/**
  - web:src/pages/crm/tasks/EditTask.tsx
  - web:src/components-old/common/BigCalendar/**
  - web:src/lib/kingendaProductSync.ts
  - web:src/lib/kingendaContactSync.ts
  - web:src/hooks/useKingendaEnabled.ts
  - web:src/hooks/useEnsureKingendaWorkspace.ts
  - api:src/modules/agenda/**
  - api:src/modules/agents/flow/actions/agenda.*
verificado_em: 2026-11-26
---

Referência de regras, limites e mensagens do **Kinbox Agenda**. Complementa [Kinbox Agenda: visão geral](/docs/agenda/kinbox-agenda), [Cadastrar serviços e locais](/docs/agenda/servicos-e-locais) e [Criar, reagendar e cancelar agendamentos](/docs/agenda/agendamentos).

## Disponibilidade e agentes de IA

- Cada workspace tem a sua própria Agenda, sem ativação manual: a Kinbox prepara a Agenda do workspace quando o proprietário entra na Kinbox (ou ao criar ou entrar em um workspace novo).
- **Agentes de IA:** as ferramentas **Listar serviços**, **Consultar horários**, **Criar agendamento**, **Listar agendamentos**, **Reagendar** e **Cancelar agendamento** (e os blocos equivalentes do fluxograma) usam a mesma Agenda do workspace. O agente lista, reagenda e cancela apenas agendamentos do contato da conversa, encontrados pelo telefone, e registra uma nota interna na conversa ao criar um agendamento. Veja [Dar ferramentas ao agente: Agenda, Google Calendar e HubSpot](/docs/agente-de-ia/ferramentas) e [Ações do fluxograma](/docs/agente-de-ia/acoes-do-fluxograma).
- As ferramentas e os blocos da Agenda ficam liberados para o agente com o Kinbox Agenda ativo no workspace. Se a tela do agente mostrar o aviso **Adicione o Agenda ao seu plano** (com o botão **Liberar potencial agora**), fale com o suporte da Kinbox.

## Permissões

As três permissões ficam na seção **Agendas** do papel (em **Configurações** → **Ambiente** → **Permissões**). O proprietário do workspace tem as três automaticamente. Veja [Referência de permissões](/docs/administracao/referencia-de-permissoes) e [Criar papéis e permissões](/docs/configuracoes-no-workspace/configurar-permissoes-dos-usuarios).

| Permissão | O que libera | O que acontece sem ela |
| --- | --- | --- |
| **Gerenciar serviços** | **Configurações** → **Agenda** → **Serviços**; cadastrar, editar, ativar e desativar serviços. | O item **Serviços** some do menu; abrir o endereço redireciona para **Configurações**. |
| **Gerenciar locais** | **Configurações** → **Agenda** → **Local**; cadastrar, editar, ativar e desativar locais. | O item **Local** some do menu; abrir o endereço redireciona para **Configurações**. Sem **Gerenciar serviços** nem **Gerenciar locais**, a seção **Agenda** inteira some de **Configurações**. |
| **Gerenciar agendamentos** | Ver agendamentos no **Calendário** e na lista de **Tarefas**; opção **Agendamento** em tarefa nova; botão **Filtros** da Agenda no calendário; ações nos detalhes (confirmar presença, reagendar, cancelar e trocar espaços). | Agendamentos não aparecem no calendário nem na lista de **Tarefas**, a opção **Agendamento** não aparece ao criar tarefa, os filtros da Agenda somem e os detalhes não exibem botões de ação. |

- Para **ver** agendamentos no calendário e na lista de **Tarefas**, é necessário ter **Gerenciar agendamentos**.
- **Sincronização das permissões:** as permissões são aplicadas à Agenda ao salvar o papel ou o membro. Em caso de falha na sincronização, aparecem:
  - ao salvar papel: `"A permissão foi salva, mas não foi possível sincronizar o Kinbox Agenda para todos os membros."`
  - ao salvar membro: `"Membro salvo, mas não foi possível sincronizar as permissões do Kinbox Agenda."`
  - Contorno: salve o papel ou o membro novamente para refazer a sincronização.

## Serviços e tarifas adicionais

| Campo | Limite / regra | Padrão |
| --- | --- | --- |
| **Produto** | Obrigatório; lista apenas produtos ativos. Nome, descrição e preço vêm do produto. Pelo botão **Criar novo produto**, **Vincular ao Kinbox Agenda** abre ligado e travado e o preço inicial sugerido é `200`. Salvar o produto por **Criar novo produto** ou **Editar produto** exige também a permissão **Produtos** do papel ([Referência de permissões](/docs/administracao/referencia-de-permissoes)). | — |
| **Duração padrão (minutos)** | Obrigatório; mínimo `1`; ajuste de `5` em `5`. Com **Reserva de lugares** ligada, precisa ser múltiplo de `5`. | `60` |
| **Horário** | Obrigatório; usa um cadastro de **Configurações** → **Ambiente** → **Horários** com ao menos um dia ativo. Mostra o resumo `"Dias: ... · HH:mm às HH:mm"`. | — |
| **Tarifas adicionais** | Opcional; cada item (**Tarifa adicional N**) exige um **Horário** e um **Valor da tarifa** (mínimo `0`). Novo item começa com o preço do produto. Fora dessas faixas vale o preço padrão do produto. | Nenhuma |
| **Reserva de lugares** | Chave opcional; muda o agendamento para reserva por quantidade de pessoas. | Desligada |
| **Status** | **Ativo** ou **Inativo**. Serviços inativos não aparecem para novos agendamentos nem para vincular a locais. | **Ativo** |

- Serviços não têm **Excluir** nem **Clonar**; apenas **Desativar** e **Ativar**. Ativar ou desativar o serviço ativa ou desativa o produto vinculado junto.
- **Mensagens do cadastro de serviço:**
  - Produto inativo: `"Não é possível associar um produto inativo. Ative o produto antes de vinculá-lo ao serviço."`
  - Horário sem nenhum dia ativo: `"Horário se encontra com valores vazios. Selecione pelo menos um dia da semana."`
  - Duração inválida com reserva de lugares: `"Com reserva de lugares, a duração precisa ser múltipla de 5 minutos."`
  - Falha ao vincular produto: `"Não foi possível vincular o produto ao serviço."`
  - Erro genérico ao salvar: `"Não foi possível salvar."`
  - Falha ao sincronizar produto ao ativar/desativar: `"Serviço atualizado, mas não foi possível sincronizar o produto vinculado."`

## Reserva de lugares

Com **Reserva de lugares** ligada, a Agenda escolhe a combinação de espaços livres com menos lugares sobrando e bloqueia os espaços durante a reserva (a tela do serviço exibe uma linha do tempo de exemplo com **Reserva**, **Intervalo** e **Livre**).

| Onde | Campo | Limite / opções | Padrão |
| --- | --- | --- | --- |
| Serviço | **Limite máximo de pessoas** | `1` a `1000` (mínimo sempre `1`) | `20` |
| Serviço | **Unir locais** | `1` a `5` locais que podem ser combinados para um grupo | `3` |
| Serviço | **Intervalo entre reservas** | `0` a `240` minutos, múltiplo de `5` (`"O intervalo precisa ser múltiplo de 5 minutos."`) | `0` |
| Serviço | **Duração padrão (minutos)** | Múltiplo de `5`; tempo em que os espaços ficam ocupados em cada reserva | `60` |
| Local | **Capacidade** | `1` a `1000` pessoas; prévia visual de até 24 lugares (acima disso, `"+N"`) | `1` |
| Local | **Ordem de uso** | **Usar primeiro** ("Sai antes dos outros"), **Normal** ("Sem preferência") ou **Guardar para o fim** ("Só quando os outros lotarem") | **Normal** |
| Local | **Pode ser juntado** | Permite juntar o local com outros espaços para grupos maiores | Ligado |
| Local | **Ambiente** | Só aparece com **Pode ser juntado** ligado; até `50` caracteres (`"Máximo de 50 caracteres."`). Junta só espaços do mesmo ambiente; vazio junta com qualquer um. | Vazio |

- **Agendamento com reserva de lugares:** troca **Local** e **Horários** por **Pessoas (min–max)** (obrigatório: `"Informe a quantidade de pessoas."`; fora da faixa: `"Informe entre {{min}} e {{max}} pessoas"`) e **Horário** (um único horário por vez; desabilitado até informar as pessoas com `"Informe as pessoas primeiro"`; horários sem vaga mostram o selo **Lotado** e a dica `"Sem espaços livres para essa quantidade de pessoas"`). Os espaços sugeridos aparecem abaixo (`"Sugestão do sistema, confirmada ao salvar."`). Se não houver vaga ao salvar: `"Não há espaços livres para esse horário e quantidade de pessoas. Escolha outro horário."`
- **Trocar espaços:** botão no rodapé de **Detalhes do agendamento**, exibido apenas em serviços com reserva de lugares e status **Confirmado**. Abre a janela **Trocar espaços** com o campo **Espaços** (espaços ocupados aparecem desabilitados como `"ocupado nesse horário"`) e o resumo **Capacidade dos espaços**, **Reserva para** e **Lugares sobrando** / **Lugares faltando**. Regras e mensagens:
  - Mínimo 1 espaço: `"Selecione ao menos um espaço."`
  - Máximo 10 espaços: `"Selecione no máximo 10 espaços."`
  - Espaço ocupado: `"Algum dos espaços escolhidos já está ocupado nesse horário."`
  - Erro genérico: `"Não foi possível trocar os espaços."`
  - Sucesso: `"Espaços atualizados."`

## Locais

- **Campos:** **Nome** (obrigatório), **Localização** (opcional; aparece nos detalhes do agendamento), **Serviços vinculados** (obrigatório, um ou mais serviços ativos; serviços desativados depois aparecem com `(Inativo)`), **Status** (**Disponível**, padrão, ou **Indisponível**) e o bloco **Reserva de lugares** (só aparece se algum serviço vinculado tiver **Reserva de lugares** ligada).
- **Mensagens:** sem serviço escolhido: `"Selecione ao menos um serviço ativo."`; sem nenhum serviço ativo no workspace: `"Nenhum serviço ativo disponível. Crie ou reative um serviço em Agenda > Serviços antes de continuar."`.
- Locais não têm **Excluir** nem **Clonar**; apenas **Desativar** e **Ativar**. Um local **Indisponível** continua na lista, mas fica sem horários livres e aparece desabilitado no agendamento com a dica `"Agenda indisponível"`.
- **Divisão dos horários:** os horários oferecidos em cada local são o expediente do serviço dividido pela **Duração padrão (minutos)** (por exemplo, duração de 60 minutos em expediente de 09:00 às 18:00 oferece blocos de 09:00–10:00 até 17:00–18:00).

## Agendamentos, ações e filtros

- **Múltiplos horários:** em serviços sem reserva de lugares, **Horários** aceita vários horários de uma vez, criando um agendamento separado para cada um. Em serviços com reserva de lugares e ao **Reagendar**, só é possível escolher um horário por vez.
- **Lista de serviços no formulário:** exibe apenas serviços ativos, de 10 em 10 com **Carregar mais**.
- **Selos de horário:** faixas indisponíveis no campo **Horários** aparecem riscadas com **Reservado**, **Pendente** ou **Indisponível** (ou **Lotado** em reserva de lugares). Sem horários livres no dia: `"Nenhum horário disponível"`.
- **Dados exigidos do contato:** nome, telefone, e-mail e data de nascimento, mais os campos personalizados obrigatórios do contato. Em **Novo contato**, **Nome**, **Telefone** e **Data de nascimento** são obrigatórios na tela e **Email** não aparece como obrigatório (só confere o formato: `"Email inválido."`), mas a Agenda exige o e-mail: preencha para o agendamento ser salvo. Contato existente incompleto exibe `"Esse contato ainda não tem os dados que o Kinbox Agenda exige. Preencha para continuar."` e grava o que for preenchido no contato. Contato já vinculado à Agenda não pede esses dados novamente.
- **Mensagens de validação e erro ao criar:** `"Selecione o serviço."`, `"Selecione o local."`, `"Selecione ao menos um horário."`, `"Selecione ou cadastre um contato."`, `"Informe o nome."`, `"Informe o telefone."`, `"Informe um e-mail válido."`, `"Email inválido."`, `"Não foi possível salvar o agendamento."` (seguido do motivo) e `"Não foi possível cadastrar o contato."`. Sucesso: `"Agendamento criado."`.
- **Detalhes do agendamento:** mostra **Serviço**, **Recurso** (o local), **Localização**, **Cliente**, **E-mail**, **Telefone**, **Preço do serviço**, **Preço do agendamento** e, em reserva de lugares, **Pessoas**, **Espaço**/**Espaços** e **Espaço ocupado até**. Se o serviço ou local sofreu alteração depois da criação, aparece o aviso `"Houve mudança no agendamento, analisar se serviço continua disponível."`.
- **Presença (concluir):** status exibidos: **Confirmado** (ao criar), **Cancelado** e **Concluído**. Não há botão **Concluir**: a conclusão é feita pela caixinha **Confirmar presença** (exibida apenas em agendamentos **Confirmado** ou **Concluído**). Marcar muda para **Concluído** (`"Presença confirmada."`); desmarcar (**Desfazer confirmação de presença**) volta para **Confirmado** (`"Confirmação de presença desfeita."`). Erro: `"Só é possível confirmar a presença de agendamentos com status \"Confirmado\"."`.
- **Reagendar:** abre o formulário com o contato somente para leitura, para escolher um único horário. Sucesso: `"Agendamento reagendado."`. Erros: `"Não foi possível reagendar o agendamento."` e, em reserva de lugares sem vaga, `"Não há espaços livres para esse horário e quantidade de pessoas. A reserva original foi mantida."`.
- **Cancelar:** pede confirmação em **Cancelar agendamento?** (`"Ao confirmar, este agendamento será marcado como cancelado. Essa ação não poderá ser desfeita."`), sem motivo e sem desfazer. Sucesso: `"Agendamento cancelado."`; erro: `"Não foi possível cancelar o agendamento."`. Agendamentos não são excluídos.
- **Calendário, lista de Tarefas e exportação:** no calendário (visualizações **Mês**, **Semana**, **Dia** padrão e visualização **Agenda** em lista), **Filtros** filtra por **Local**, **Serviço** e **Status do agendamento** (**Confirmado**, **Cancelado**, **Concluído**), com **Limpar filtros**. Na lista de **Tarefas**, agendamentos **Cancelado** e **Concluído** ficam ocultos até filtrar por **Status do agendamento**; **Tipo** = **Agendamento** libera os filtros **Serviço**, **Local** e **Status do agendamento**. A lista carrega até **500** agendamentos, e a exportação da lista de Tarefas inclui os agendamentos.

## Ligações com outras partes da Kinbox

- **Produto ↔ serviço:** todo serviço é ligado a um produto ativo ([Cadastrar produtos](/docs/crm/criar-e-gerenciar-produtos)). Editar o produto atualiza nome, descrição, preço e status do serviço; ativar ou desativar o serviço atualiza o produto. Produto vinculado não é excluído (**Excluir** vira **Desativar produto**).
- **Horário ↔ serviço:** o serviço grava uma cópia dos dias e horas de [Definir os horários de atendimento](/docs/configuracoes-no-workspace/criar-e-gerenciar-horarios) ao ser salvo. Editar o horário em **Configurações** → **Ambiente** → **Horários** (ou por **Editar horário**) não atualiza o serviço sozinho: abra o serviço e clique em **Salvar**. Um horário usado por serviço ativo não pode ser excluído (`"Não é possível excluir: esse horário está em uso pelo serviço \"{{name}}\" do Kinbox Agenda. Troque o horário desse serviço antes de excluir."`) nem ficar sem nenhum dia ativo (`"Esse horário está em uso pelo serviço \"{{name}}\" do Kinbox Agenda e precisa ter pelo menos um dia ativo."`).
- **Contato ↔ cliente da Agenda:** após o primeiro agendamento, o contato fica vinculado ao Kinbox Agenda (chave **Vincular ao Kinbox Agenda** em [Contatos: encontrar, cadastrar, editar e excluir](/docs/conversas/clientes-contatos-e-organizacoes)). Contatos com agendamentos não podem ser excluídos (`"Não é possível excluir: esse contato tem agendamentos vinculados no Kinbox Agenda."`).
- **Campos personalizados criados pela Agenda:** **Data de nascimento** (contato, tipo dia, visível) nasce na primeira vez que alguém com **Gerenciar agendamentos** abre o formulário de agendamento. **Vinculado ao Kinbox Agenda** (contato) e **Serviço Kinbox Agenda vinculado** (produto) são campos de vínculo que não aparecem nos formulários comuns. Em **Campos personalizados** ([Criar campos personalizados](/docs/configuracoes-no-workspace/campos-personalizados-no-kinbox)), os campos da Agenda aparecem com a marca **Obrigatório**, só permitem editar a descrição e não podem ser clonados nem excluídos.
- **Tarefas:** agendamento não é tarefa e não cria tarefa. Ele aparece no calendário e na lista de **Tarefas** apenas para consulta (**Visualizar**, sem **Excluir**). Excluir ou concluir uma tarefa não afeta agendamentos, e agendamentos não entram nos painéis de tarefas dos dashboards.

## Horário, avisos e recursos inexistentes

- **Horário sem fuso:** os horários da Agenda são os da tela, sem conversão de fuso horário (os agentes de IA usam o horário de Brasília).
- **Nenhum aviso automático ao contato:** criar, reagendar, cancelar ou confirmar presença não envia lembrete, confirmação nem aviso ao contato, e o membro também não recebe lembrete de agendamento. O único registro automático é a nota interna na conversa quando o agente de IA cria o agendamento. Contorno: mandar mensagem na conversa ou usar [Agendar uma mensagem](/docs/conversas/agendar-mensagem) (mensagens agendadas não acompanham alterações no agendamento).
- **Sem Google Calendar, iCal, link público nem cobrança:** a Agenda não sincroniza com o Google Calendar, não exporta `.ics`, não tem página para o cliente agendar sozinho e não realiza cobranças. O Google Calendar existe na Kinbox apenas como ferramenta separada do agente de IA ([Dar ferramentas ao agente: Agenda, Google Calendar e HubSpot](/docs/agente-de-ia/ferramentas)).

## Diagnóstico rápido

| Sintoma | Causa | O que fazer |
| --- | --- | --- |
| Não vejo **Agenda** em **Configurações** | Faltam **Gerenciar serviços** e/ou **Gerenciar locais** no papel | Peça a permissão a quem administra o workspace em **Configurações** → **Ambiente** → **Permissões**. |
| Não aparece **Agendamento** ao criar tarefa ou não vejo agendamentos no calendário | Falta **Gerenciar agendamentos** no papel | Peça a permissão **Gerenciar agendamentos** a quem administra o workspace. |
| Tela do agente mostra **Adicione o Agenda ao seu plano** | O Kinbox Agenda não está ativo no workspace | Fale com o suporte da Kinbox. |
| Erro ao sincronizar permissões do Kinbox Agenda | Falha pontual ao salvar papel ou membro | Salve o papel ou o membro novamente para refazer a sincronização. |
| Não acho o produto ao criar o serviço | O campo **Produto** lista apenas produtos ativos | Ative o produto em **Configurações** → **CRM** → **Produtos** ou use **Criar novo produto**. |
| Serviço não aparece ao criar local ou ao agendar | O serviço está **Inativo** | Ative o serviço em **Configurações** → **Agenda** → **Serviços**. |
| Mudei o horário e a Agenda continua com o antigo | O serviço guarda a cópia do horário no momento em que é salvo | Abra o serviço em **Configurações** → **Agenda** → **Serviços** e clique em **Salvar**. |
| Com **Reserva de lugares**, não salva a duração | A duração precisa ser múltipla de 5 minutos | Ajuste **Duração padrão (minutos)** para um múltiplo de 5. |
| Local desabilitado com `"Agenda indisponível"` | Local sem horário livre no dia (ocupado, fora do expediente do serviço ou **Indisponível**) | Escolha outro dia ou local, ou confira o status em **Configurações** → **Agenda** → **Local**. |
| `"Nenhum horário disponível"` ao agendar | Dia fora do expediente do serviço ou todos os horários ocupados | Escolha outra data ou outro local. |
| Formulário pede e-mail e data de nascimento do contato | A Agenda exige nome, telefone, e-mail e data de nascimento | Preencha os campos no próprio formulário; os dados ficam salvos no contato. |
| Não consigo excluir serviço, local ou agendamento | A Agenda não oferece exclusão | Desative serviços e locais; cancele agendamentos. |
| Não consigo excluir produto, horário ou contato | Item vinculado ao Kinbox Agenda (serviço, serviço ativo ou contato com agendamentos) | Desative o produto; troque o horário do serviço ativo antes de excluir o horário; contatos com agendamentos não podem ser excluídos. |
| Cliente não recebeu confirmação nem lembrete | A Kinbox não manda avisos automáticos de agendamento ao contato | Envie uma mensagem na conversa ou use [Agendar uma mensagem](/docs/conversas/agendar-mensagem). |
| Horário diferente do combinado com cliente em outro fuso | Os horários da Agenda são gravados sem conversão de fuso | Confirme o horário local com o contato; a Agenda exibe exatamente o horário escolhido na tela (e agentes de IA usam horário de Brasília). |
