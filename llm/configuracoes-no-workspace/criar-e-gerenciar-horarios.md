---
title: "Horários: regras de dentro e fora do horário, fuso, exclusão e efeito em permissões e mensagens automáticas"
description: Referência dos horários de atendimento da Kinbox com como o horário é avaliado, os limites dos campos, as travas ao excluir, a falta de feriados e o efeito nas permissões de resposta, acesso e disponibilidade e na mensagem de fora do horário.
keywords: [horário comercial detalhes, fora do horário, mensagem fora do horário, feriado, fuso horário do workspace, horário padrão não exclui, horário usado pelo bot, limitar horário que pode responder, fora do horário de acesso, você não pode enviar mensagens esse horário, 23:59]
publico: llm
tipo: referencia
fontes:
  - api-v0:server/modules/conditionProcessor.js
  - api-v0:server/controllers/WorkHourController.js
  - api-v0:server/controllers/EventsController.js
  - api-v0:server/modules/chat/auxiliary/sendMessageByClient.js
  - web:src/pages/settings/businesshours/index.tsx
  - web:src/pages/settings/businesshours/DayBlock.tsx
codigo:
  - web:src/pages/settings/businesshours/**
  - web:src/pages/settings/workspace/index.tsx
  - web:src/hooks/useBusinessHoursAccessLock.ts
  - web:src/hooks/useAutoAvaliableBusinessHours.tsx
  - api-v0:server/modules/conditionProcessor.js
  - api-v0:server/controllers/WorkHourController.js
  - api-v0:server/controllers/EventsController.js
verificado_em: 2026-11-26
---

Referência complementar de [Definir os horários de atendimento](/docs/configuracoes-no-workspace/criar-e-gerenciar-horarios) e [As conversas não chegam para mim ou para a equipe](/docs/atendimento/problemas-comuns).

## Como o horário é avaliado e fuso horário

- **Quem pode gerenciar:** em **Configurações** → **Ambiente** → **Horários**, o proprietário ou quem tem a opção **Horários** ("Ver, adicionar, editar e excluir horário comercial.") na seção **Gerenciamento do Ambiente** do papel (na tela, **Permissão**). Em **Configurações** → **Ambiente** → **Geral**, o proprietário ou quem tem a opção **Workspace** ("Alterar informações de workspace.") em **Gerenciamento do Ambiente**.
- **Estrutura:** cada horário tem um nome, os dias da semana ligados (de **Segunda** a **Domingo**) e uma ou mais faixas de hora por dia. Intervalos (como almoço) são definidos adicionando duas ou mais faixas no mesmo dia. Tudo fora das faixas conta como fora do horário.
- **Limites inclusivos:** o minuto de início e o minuto de fim contam como **dentro** do horário (por exemplo, `09:00` até `12:00` inclui `09:00` e `12:00`).
- **Fuso horário:** no bot, nas automações, nas campanhas, nas restrições do papel e na **Mensagem quando fora do horário comercial**, as faixas de hora são avaliadas no **Fuso horário** configurado em **Configurações** → **Ambiente** → **Geral**, no cartão **Preferências** ("Escolha o fuso horário que deseja operar o seu ambiente"). Na condição **Horário** com **está fora de**, a hora usa esse fuso, mas o dia da semana não passa pelo ajuste de fuso: perto da meia-noite, o dia considerado pode ser outro. No chat do site, o status "Online" de **Habilitar horário comercial** usa o relógio do aparelho do visitante (veja [Configurações do widget: domínios, horário, celular e balão do WhatsApp](/docs/canais/widget/configuracoes)).

## Campos, limites e mensagens da tela

- **Valores de hora:** de `0:00` a `23:45`, de 15 em 15 minutos, mais `23:59`. O campo de fim (**até**) oferece apenas horas posteriores ao início.
- **Mensagens de validação:**
  - Sem nome: `"Por favor digite um nome."`
  - Dia ligado sem faixa: `"Adicione pelo menos um horário de funcionamento."`
  - Faixa sem início ou sem fim: `"Escolha o horário"`
  - Horário em uso por serviço do Kinbox Agenda salvo sem nenhum dia ativo: `'Esse horário está em uso pelo serviço "{{name}}" do Kinbox Agenda e precisa ter pelo menos um dia ativo.'`
- **Ações da tela:** salvar exibe `"Horário criado."` (novo) ou `"Horário salvo."` (edição). Fechar com alterações sem salvar mostra `"Fechar sem salvar?"` / `"Você vai perder as alterações se não salvar primeiro."` / **Prosseguir**. Clonar abre com `"Cópia de {nome}"`. A tela **Horários** não possui exportação.

## Horário padrão e o que o workspace já traz

- Em geral, um workspace (na tela, **ambiente**) novo já nasce com o horário **Horário Comercial Relatório** (segunda a sexta, de `08:00` até `18:00`), escolhido como **Horário comercial** em **Configurações** → **Ambiente** → **Geral**.
- O horário selecionado em **Horário comercial** exibe a marca **Horário Padrão** na lista de **Horários**.

## Onde o horário é usado e efeito nas permissões

- **Horário comercial do workspace** (**Configurações** → **Ambiente** → **Geral**): base para o cálculo de TME, TMP e TMA nos relatórios e para a **Mensagem quando fora do horário comercial**.
- **Bot:** o campo **Horários** faz o bot iniciar sozinho apenas dentro dos horários escolhidos (não vale quando **Atende todos os canais** está ligado), e o bloco **Decisão** aceita a condição **Horário**; veja [Criar e publicar um bot](/docs/bot/aprender-a-usar-o-bot) e [Blocos do bot](/docs/bot/blocos-do-bot).
- **Condição Horário** ("está dentro de" / "está fora de", grupo **Contexto**): disponível em automações, no bot (veja [Blocos do bot](/docs/bot/blocos-do-bot)), nas etapas do agente de IA e em metas.
- **Campanhas:** o campo **Horário comercial** pausa a campanha fora do horário e retoma sozinho no próximo período; veja [Velocidade de envio e horário comercial](/docs/campanhas/velocidade-e-horario).
- **Chat do site (widget):** **Habilitar horário comercial** ("Mostra que os membros estão online durante o horário comercial").
- **Kinbox Agenda:** define o horário de funcionamento dos serviços.
- **Atribuição automática:** nenhuma estratégia de atribuição automática consulta horários diretamente (veja [Estratégias de atribuição automática](/docs/atendimento/estrategias-de-atribuicao)).
- **Papel (Permissão)** — três restrições usam um horário cadastrado (veja [Referência de permissões](/docs/administracao/referencia-de-permissoes) e [Ficar disponível ou indisponível](/docs/conta/disponibilidade)):
  - **Limitar horário que pode responder:** fora do horário, o envio de mensagem é bloqueado com a mensagem `"Você não pode enviar mensagens esse horário"`.
  - **Limitar horário de acesso ao ambiente:** fora do horário, o membro vê a tela **Fora do horário de acesso** em vez do workspace.
  - **Limitar horário que pode ficar disponível:** impede ficar disponível fora do horário (`"Você não pode ficar disponível fora do horário de trabalho"`) e alterna automaticamente o status **Disponível** quando o navegador do membro está aberto — é apenas por meio dessa mudança de disponibilidade que o horário do papel afeta a atribuição automática.

## Exclusão

- Confirmação: `"Tem certeza que deseja excluir esse horário?"` e, após confirmar, `"Excluído."`.
- A exclusão é impedida em três casos:
  - **Horário comercial do workspace:** `"Não é possível remover o horário padrão usado para calcular relatórios. Primeiro vá nas configurações do ambiente e escolha outro horário para ser o padrão."`
  - **Em uso por serviço ativo do Kinbox Agenda:** `'Não é possível excluir: esse horário está em uso pelo serviço "{{name}}" do Kinbox Agenda. Troque o horário desse serviço antes de excluir.'`
  - **Em uso por algum bot:** a Kinbox impede a exclusão e exibe um aviso informando o nome do bot e orientando a desassociar o horário em **Configurações** → **Automação** → **Bot** antes de tentar novamente.
- Campanhas, automações, condições e papéis que usam o horário não bloqueiam a exclusão; troque o horário nesses recursos antes de excluir.

## Mensagens automáticas em Geral

No cartão **Caixa de Entrada** de **Configurações** → **Ambiente** → **Geral** (nas configurações gerais do workspace):

- **Mensagem quando fora do horário comercial** ("Envia um texto automaticamente quando o contato manda mensagem fora do horário comercial padrão"):
  - só funciona com um **Horário comercial** escolhido em **Geral**;
  - só é enviada em conversas que já têm um membro responsável (se uma regra ligada de atribuição automática atribuir um membro na primeira mensagem de uma sessão nova, o responsável já estará preenchido e a mensagem pode sair nessa primeira mensagem; conversas sem responsável ou apenas com grupo não recebem);
  - sai a cada mensagem enviada pelo contato fora do horário;
  - a verificação de dentro ou fora do horário para essa mensagem é atualizada no máximo a cada 60 segundos;
  - é enviada como mensagem de bot.
- **Mensagem quando membro indisponível** ("Envia um texto automaticamente quando o contato manda mensagem para membro atribuído que está indisponível"):
  - só sai em conversas com membro responsável que esteja indisponível, também a cada mensagem do contato;
  - quando a mensagem chega fora do horário comercial e o membro responsável também está indisponível, **Mensagem quando fora do horário comercial** tem prioridade.

## Feriados e relatórios

- **Feriados:** não há cadastro de feriados nem de exceções por data; os horários funcionam apenas por dia da semana. Como contorno, edite o horário antes do feriado e restaure depois (isso afeta todos os recursos que usam o horário), ou crie um horário separado para o período e troque apenas nos lugares desejados.
- **Relatórios:** trocar o **Horário comercial** do workspace não recalcula sessões antigas nos relatórios.
