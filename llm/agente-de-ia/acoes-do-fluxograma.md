---
title: "Ações do fluxograma: parâmetros, saídas e limites de cada uma"
description: Referência detalhada de cada ação do fluxograma do agente de IA, com campos, saídas, limites, valores padrão, comportamento no teste e as regras de publicação e de execução.
keywords: [saídas do bloco, condição llm, condição lógica, sem resposta, erro não tratado, transição direta, follow-up, delay, requisição http, publicar fluxograma, erro ao publicar, loop no fluxograma]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/agents/flow/EditFlow.tsx
  - web:src/pages/agents/flow/FlowCanvas.tsx
  - web:src/pages/agents/flow/drawers/EditEdgeDrawer.tsx
  - web:src/pages/agents/components/stages/EditAgentStage.tsx
  - api:src/modules/agents/flow/flow-runner.service.ts
  - api:src/modules/agents/flow/flow-execution.consumer.ts
  - web:src/pages/agents/flow/useFlow.tsx
  - web:src/pages/agents/flow/actions/select-action/SelectAction.form.tsx
  - api:src/modules/agents/flow/actions/meta.registry.ts
codigo:
  - web:src/pages/agents/flow/*.tsx
  - web:src/pages/agents/flow/drawers/**
  - web:src/pages/agents/flow/edges/**
  - web:src/pages/agents/flow/nodes/**
  - web:src/pages/agents/flow/panels/**
  - web:src/pages/agents/flow/actions/**
  - web:src/pages/agents/components/AgentStages.tsx
  - web:src/pages/agents/components/stages/**
  - web:src/pages/agents/components/AIFormItem/**
  - api:src/modules/agents/flow/flow-runner.service.ts
  - api:src/modules/agents/flow/flow-execution.consumer.ts
  - api:src/modules/agents/flow/actions/**
verificado_em: 2026-11-26
---

Referência técnica complementar de [Montar o fluxograma do agente](/docs/agente-de-ia/fluxograma-e-etapas) e [Ações do fluxograma](/docs/agente-de-ia/acoes-do-fluxograma). Vale somente para o **agente de texto** (não existe no agente de voz; fica oculto em agentes **Gerenciado pelo parceiro**).

## Ações do fluxograma: campos, saídas, limites e teste

Legenda das saídas: **D** = **Transição direta**, **LLM** = **Condição LLM**, **L** = **Condição lógica**, **SR** = **Sem resposta**, **E** = **Erro**. No editor, **D**, **LLM**, **L** e **E** podem ser colocadas em qualquer bloco; **SR** existe apenas em **Subagente**, **Coletar dados** e **Aguardar mensagem do cliente**.

Na janela **Selecione uma ação**, as abas são **Top** (todas), **Apps** (**Google Calendar** e **Kinbox Agenda**) e **Core** (demais ações). Um bloco **Ação** vazio fechado sem escolha fica com o aviso `"Necessário selecionar uma ação"`. Todo fluxograma tem um bloco fixo **Início**.

| Ação (aba) | Campos principais | Saídas | Limites, padrões e observações | No teste |
| --- | --- | --- | --- | --- |
| **Subagente** (Core / **+**) | **Instruções** (**Substituir**/**Herdar**), **Conhecimento** (**Herdar conhecimento**), **Ferramentas** (**Herdar ferramentas**), **Modelo LLM** (`Usar modelo padrão do agente`), **Modo silencioso**, follow-ups | LLM, L, D, SR, E | Fica no bloco até uma saída valer. Se já saiu mensagem na mesma rodada, não responde de novo (ver §Execução). | Conversa no chat de teste |
| **Coletar dados** (Core / **+**) | Por dado: **Tipo** (**Temporário**, **Sessão**, **Contato**), **Campo** ou **Nome da variável**, **Descrição** (até 1.000 caracteres), **Exemplos de pergunta**, **Obrigatório**, **Tentar inferir da conversa**, **Valores possíveis** (só Temporário), **Follow-ups** por dado; no bloco: **Instruções**, **Conhecimento**, **Ferramentas**, **Modelo LLM** | D, LLM, L, SR, E | Sem dado: `"Adicione pelo menos 1 dado para coletar"`. Com dado obrigatório pendente, nenhuma saída condicional vale. Ao concluir a coleta, sai sem responder. | Conversa no chat de teste; gravação simulada |
| **Enviar mensagem** (Core) | **Mensagem** (**Manual**/**Prompt AI**/**Auto**), **Anexar documentos**, **Usar template caso conversa expirada** (**Canal** só WhatsApp oficial + template) | D, E | **Mensagem** até 4.000 caracteres. | Aparece no chat de teste; não envia a canal real |
| **Enviar template WhatsApp** (Core) | **Canal** (só WhatsApp oficial), template e variáveis | D, E | Somente canais de WhatsApp oficial. | Simulado |
| **Enviar nota de time** (Core) | **Mensagem** (**Manual**/**Prompt AI**/**Auto**) | D, E | Nota interna (o contato não vê). | Aparece como nota no chat de teste |
| **Transferir** (Core) | **Tipo** (**Membro**, **Grupo**, **Usar atribuição automática**, **Cíclico**, **Cíclico com fila**, **Último membro que atendeu a conversa**), **Membros participantes** (nos cíclicos), **Condições de elegibilidade** (**Membro deve estar disponível**, **Membro deve estar online** nos três últimos tipos) | D, E | **Membro** e **Grupo** desligam o agente na sessão (ver §Transferir). | Simulado |
| **Resolver conversa** (Core) | **Motivo (opcional)** | D, E | Resolve a conversa. | Não executa / simulado |
| **Executar bot** (Core) | **Bot** (**Manual**/**Prompt AI**) | D, E | Passa a conversa para o bot escolhido; um **Encerrar agente** depois não para esse bot. | Não executa / simulado |
| **Encerrar agente** (Core) | Sem campos | Sem saída | Para o agente na conversa sem responder e limpa o estado do fluxo. Dentro de **Executar outro agente**, encerra apenas o outro agente. | Simulado |
| **Definir campos** (Core) | **Campos** (**Add campo**): **Campo** (**Nome**, **E-mail**, **Telefone**, **Notas** ou personalizados) e **Valor** (**Manual**/**Prompt AI**/**Auto**) | D, E | Aviso sem campo: `"Pelo menos um campo é obrigatório"`. | Simulado |
| **Definir tags** (Core) | **Adicionar tags** e **Remover tags** (**Add tag**: **Tag** + **Condição**) | D, E | — | Simulado |
| **Setar variáveis** (Core) | **Variáveis** (**Add variável**): **Nome** (sem espaços, começar com letra ou underscore) e **Valor** | D, E | Variáveis existem somente durante a execução atual desta conversa. | Simulado na sessão de teste |
| **Adicionar no contexto** (Core) | **Conteúdo** | D, E | Contexto existe somente durante a execução atual desta conversa. | Simulado na sessão de teste |
| **Limpar contexto** (Core) | **Mensagem para deixar no contexto (opcional)** | D, E | Em branco limpa totalmente. | Simulado na sessão de teste |
| **Criar negócio** (Core) | **Nome da negociação**, **Funil de vendas**, **Etapa do funil**, **Responsável**, **Grupo**, **Status** (**Aberto**/**Ganho**/**Perdido**), **Motivo de perda**, **Produtos**, tags, campos personalizados | D, E | — | Simulado |
| **Atualizar negócio** (Core) | **Que negócios serão afetados** e campos de **Criar negócio** | D, E | — | Simulado |
| **Criar tarefa** (Core) | **Nome da tarefa**, **Descrição**, **Tipo**, **Responsável**, **Obrigatória**, **Modo de agendamento** (**Daqui X minutos**, **Dias a partir de hoje** + **Horário**, **Em um dia e horário**), **Auto executar** / **Bot** | D, E | Funciona apenas no contexto de uma conversa. | Simulado |
| **Buscar produtos** (Core) | **Termo de busca**, **Preço mínimo**, **Preço máximo**, **Limite** | D, E | **Limite**: 1 a 30 (padrão 10). | Consulta produtos |
| **Requisição HTTP** (Core) | **Método**, **URL**, headers (**Add header**), corpo (JSON) | D, E | Tempo limite **30 segundos**. Use endereço `https`. Falha **não** sai pela seta **Erro**: devolve `success: false` e segue pela saída normal. | **Roda de verdade** (chama a URL externa) |
| **Buscar conhecimento** (Core) | **Modo** (**Buscar nas bases (vetorial)** ou **Texto literal**), **Bases de conhecimento**, **Origem da busca** (**Últimas mensagens do cliente** ou **Termo customizado**), **Quantidade de últimas mensagens do cliente**, **Top K (chunks por base)** | D, E | Padrões: **2** últimas mensagens e **3** trechos por base. **Texto literal**: até **5.000 caracteres** (aviso `"Texto excede 5000 caracteres"`). | Busca nos conhecimentos reais |
| **OCR** (Core) | **Origem do arquivo** (**Último arquivo do contato** ou **URL**), **Tipo de documento**, **Campos**, **Instruções (opcional)**, **Modelo LLM** | D, L, E | Procura nas últimas **30 mensagens**; PDF escaneado até **5 MB** e **30 páginas**; **URL** aceita apenas `https`. | Roda sobre o anexo/URL informado |
| **Executar outro agente** (Core) | **Agente para executar**, **Iniciar em uma ação específica (opcional)** | D, E | Executa o fluxograma do outro agente e volta para a próxima ação quando terminar. Impede excluir o agente referenciado (**Agente em uso**). | Executa no teste |
| **Aguardar mensagem do cliente** (Core) | Follow-ups (opcional) | D, SR, E | Pausa o fluxo até a próxima mensagem do contato, sem chamar a IA nem enviar mensagem. | Pausa no teste |
| **Delay** (Core) | **Duração**, **Unidade** (Segundos/Minutos/Horas/Dias), **Considerar horários** | D, E | **Duração** mínima **1** (sem máximo definido). **Não** conta como bloco de espera para fechar ciclos. | Aguarda o tempo |
| **Setar follow-ups** (Core) | **Follow-ups compartilhados** | D, E | Vale para todos os blocos de espera seguintes até **Limpar follow-ups**. | Roda na simulação |
| **Limpar follow-ups** (Core) | Sem campos | D, E | Desliga a lista compartilhada de **Setar follow-ups**. | Roda na simulação |
| **Pular para ação** (Core) | **Ação de destino** | Sem saída | Redireciona para outro bloco sem seta. | Roda na simulação |
| **Erro não tratado** (Core) | Sem campos | D, E | Recebe erros de blocos sem seta **Erro**. Máximo de 1 por fluxograma. | Roda na simulação |
| **Anotação** (**+** / botão direito) | Texto | Sem saída | Apenas visual; ignorado nas validações de publicação. | Sem efeito |
| **Criar evento** (Apps › Google Calendar) | Conta Google, **Título**, **Início**, **Duração (minutos)**, **Descrição**, **Local**, **Convidados** (e-mails separados por vírgula), calendário (vazio = primário) | D, E | Exige conta Google conectada. | **Roda de verdade** (cria evento real) |
| **Criar evento rápido** (Apps › Google Calendar) | Conta Google, **Texto** | D, E | Exige conta Google conectada. | **Roda de verdade** (cria evento real) |
| **Consultar horários** (Apps › Kinbox Agenda) | **Serviço**, **Profissional**, **Data**, **Máximo de horários** | D, L | Exige o Kinbox Agenda ativo no workspace (sem ele, cadeado e **Liberar potencial agora**). **Máximo de horários**: 1 a 20 (padrão **5**). Em serviços com reserva de lugares, a consulta precisa da quantidade de pessoas, que o bloco não tem como campo nem tira da conversa: a saída traz `success: false` e `errorCode` igual a `party_size_required`, e repetir o bloco não resolve. Para reservas de lugares, use as ferramentas **Consultar horários** e **Criar agendamento** do agente, que aceitam a quantidade de pessoas ([Dar ferramentas ao agente: Agenda, Google Calendar e HubSpot](/docs/agente-de-ia/ferramentas)). | Roda de verdade (somente leitura) |
| **Criar agendamento** (Apps › Kinbox Agenda) | **Serviço**, **Profissional** (opcional; vazio = **Qualquer profissional disponível**), **Início** (término pela duração do serviço) | D, L | Exige o Kinbox Agenda ativo no workspace. Dados que a ação precisa e que não são campos do bloco (o agente obtém sozinho): nome, telefone, e-mail e data de nascimento do contato. Nome, telefone e e-mail vêm do contato; o que faltar no contato é tirado da conversa. A data de nascimento é sempre obtida na conversa (o agente não lê o campo **Data de nascimento** do contato). Se faltar algum dado do contato, a saída traz `success: false` e `errorCode` igual a `missing_contact_data`, com os campos que faltam: ligue essa saída a um bloco que peça os dados ao contato. Em serviços com reserva de lugares, a ação precisa também da quantidade de pessoas, que o bloco não tem como campo nem tira da conversa (da conversa ele tira só os dados do contato): a saída traz `success: false` e `errorCode` igual a `party_size_required`, e repetir o bloco não resolve. Para reservas de lugares, use as ferramentas **Consultar horários** e **Criar agendamento** do agente, que aceitam a quantidade de pessoas ([Dar ferramentas ao agente: Agenda, Google Calendar e HubSpot](/docs/agente-de-ia/ferramentas)). Quando o agendamento é criado, a equipe recebe uma nota interna com o resumo. | **Simulado** (não grava no Agenda) |
| **Listar agendamentos** (Apps › Kinbox Agenda) | **Apenas agendamentos futuros**, **Incluir cancelados** | D, L | Exige o Kinbox Agenda ativo no workspace. | Roda de verdade (somente leitura) |
| **Reagendar** (Apps › Kinbox Agenda) | **Agendamento**, **Novo início**, **Manter o profissional atual** | D, L | Exige o Kinbox Agenda ativo no workspace. | **Simulado** (não altera o Agenda) |
| **Cancelar agendamento** (Apps › Kinbox Agenda) | **Agendamento** | D, L | Exige o Kinbox Agenda ativo no workspace. | **Simulado** (não cancela no Agenda) |

## Setas, ordem de avaliação e variáveis

- **Tipo padrão de uma seta nova:** saindo de **Subagente**, nasce como **Condição LLM**; saindo dos demais blocos, a primeira seta nasce como **Transição direta** e as seguintes como **Condição LLM**.
- **Ordem de avaliação das saídas:**
  1. **Condição lógica**, na ordem (todas as regras de uma condição lógica são combinadas com E/AND).
  2. **Condição LLM** (a IA escolhe uma condição ou nenhuma; na dúvida, escolhe nenhuma).
  3. **Transição direta**, como reserva.
- **Avaliar antes de responder:** disponível apenas em **Condição LLM** e **Condição lógica** saindo de **Subagente** ou **Coletar dados**; se verdadeira, pula a resposta do bloco e segue direto.
- **Sem resposta:** **Duração** padrão `5`; **Unidade** padrão **Minutos** (**Segundos**, **Minutos**, **Horas**, **Dias**); **Repetir** com **Número máximo de tentativas** de `1` a `10`; **Escalonar** dobra o intervalo a cada tentativa (ex.: 5 min → 10 min → 20 min); **Considerar horários** reagenda para a próxima data dentro do horário selecionado caso o tempo acabe fora dele.
- **Modos de preenchimento e variáveis:** **Manual**, **Prompt AI** e **Auto** (nem todo campo oferece **Auto**). **Injetar contexto** lista **Etapas anteriores** (com **Exemplo de Output** e **Última execução**), **Contexto** (fluxo, sessão, contato, negociações e tarefas abertas/fechadas) e **Utilitarios**. Sintaxe de variáveis como `{{$contact.name}}` e saídas anteriores como `{{$node.<id>.output...}}`.

## Regras de publicação e mensagens exatas

O fluxograma só passa a rodar quando o bloco **Início** tem pelo menos uma seta ligada. Não existe rascunho separado: ao publicar aparece `"Fluxograma salvo."` e o desenho entra em vigor imediatamente. Fechar o editor com alterações não publicadas exibe `"Você tem mudanças não salvas, tem certeza que deseja fechar?"`.

Mensagens que bloqueiam a publicação:

| Mensagem exata | Causa |
| --- | --- |
| `"Não é possível publicar: existe um loop infinito no fluxo."` | Existe um ciclo sem nenhum bloco que conte como espera. |
| `"Resolva os problemas de todas as etapas antes de publicar"` | Algum bloco está com aviso (campo obrigatório vazio ou ação não selecionada; a mensagem diz "etapas", mas refere-se aos blocos). |
| `"Configure a condição de saída de todas as conexões antes de publicar"` | Seta de **Condição LLM** sem texto preenchido. |
| `"Informe o nome da condição lógica"` | Seta de **Condição lógica** sem **Nome da condição**. |
| `"Adicione ao menos uma regra (campo + operador) na condição lógica"` | Seta de **Condição lógica** sem nenhuma regra configurada. |
| `'Só pode haver uma única ação de "Erro não tratado" no fluxo'` | Mais de um bloco **Erro não tratado** no fluxograma. |
| `'Só pode haver no máximo uma saída do tipo "{{label}}" por nó'` | Mais de uma saída **Transição direta**, **Erro** ou **Sem resposta** no mesmo bloco. |
| `'Nós com saída "Condição lógica" ou "Condição IA" precisam também de uma saída "Transição direta" como fallback'` | Bloco (exceto **Subagente**, **Coletar dados** e **Aguardar mensagem do cliente**, que ficam esperando o contato) tem saída condicional sem uma **Transição direta** reserva. A tela chama a seta de **Condição LLM**, mas a mensagem exibe `"Condição IA"`. |

Blocos que fecham ciclos sem erro de loop infinito: **Subagente**, **Coletar dados**, **Aguardar mensagem do cliente**, **Pular para ação**, **Executar outro agente**, **Encerrar agente** e **Erro não tratado**. **Delay** não conta. **Anotação** é ignorada nas validações.

## Execução, travas e tratamento de erros

- **Como o fluxograma anda:** a cada mensagem do contato, os blocos rodam em sequência até parar num bloco que conversa (**Subagente** ou **Coletar dados**), num bloco que espera (**Aguardar mensagem do cliente** ou **Delay**) ou no fim do caminho. **Subagente** e **Coletar dados** podem **Substituir** ou **Herdar** as **Instruções**, o **Conhecimento** e as **Ferramentas** do agente principal.
- **Estado da sessão:** guardado por até **7 dias** por sessão. Conversas em andamento continuam do bloco onde pararam com o desenho publicado; sessões novas começam do **Início**.
- **Concorrência:** o agente executa uma rodada por vez por conversa; mensagens recebidas no meio ficam no histórico para a próxima rodada.
- **Interrupção por humano ou resolução:** se um membro assume a conversa ou ela é resolvida durante espera ou execução, a rodada é descartada e os follow-ups pendentes são cancelados.
- **Trava de repetição:** o mesmo bloco rodando mais de **3 vezes** na mesma rodada interrompe o fluxo com erro.
- **Subagente após Enviar mensagem:** se uma mensagem já foi enviada na mesma rodada (por exemplo, por **Enviar mensagem**), um **Subagente** logo em seguida não envia outra resposta na mesma rodada e aguarda o contato. Para falar naquela rodada, coloque o texto nas instruções do **Subagente**.
- **Erros em blocos:** seguem pela seta **Erro** do bloco; sem seta **Erro**, vão para o bloco **Erro não tratado** (se existir). **Exceção:** **Requisição HTTP** que falha não segue pela seta **Erro** — retorna `success: false` e segue pela saída normal; use **Condição lógica** para tratar o resultado.
- **Fim do caminho:** se o fluxo termina sem bloco que conversa e sem **Encerrar agente**, a resposta da rodada vem das instruções principais (ou da etapa escolhida) e o estado do fluxo é limpo.

## Ferramenta HTTP (cartão Ferramentas)

A ferramenta HTTP é cadastrada no workspace em **Selecione uma ferramenta** → **Adicionar ferramenta** e pode ser usada por vários agentes; editar ou excluir muda para todos. Página humana: [Dar ferramentas ao agente](/docs/agente-de-ia/ferramentas).

| Bloco | O que se configura |
| --- | --- |
| **Configuração** | **Nome**, **Descrição** (o que faz e quando usar), **Método** (**GET**, **POST**, **PUT**, **PATCH** ou **DELETE**) e **URL** (use endereço `https`). |
| **Headers** | Cabeçalhos enviados na chamada (**Add header**). |
| **Parâmetros de path** | Valores entre chaves na URL, com tipo e preenchimento por **Prompt do LLM** (a IA tira da conversa) ou **Constante ou variável**. |
| **Parâmetros de query** | Parâmetros de consulta (**Add param**). |
| **Parâmetros do body** | Corpo JSON em **POST**, **PUT** e **PATCH**. |
| **Atribuições de variáveis** | Atualiza variáveis (como campos do contato ou da sessão) com dados da resposta: **Valor** + **JSON Path** (**Add atribuição**). |

- Tempo limite: **30 segundos**. Se a chamada falhar, o agente recebe o erro e segue a conversa.
- No chat de teste a chamada é feita de verdade; só a gravação do resultado no contato ou na sessão é simulada.

## Follow-ups no fluxograma

- Funcionam nos blocos **Subagente**, **Coletar dados** (no bloco e por dado) e **Aguardar mensagem do cliente**, além de **Setar follow-ups** e **Limpar follow-ups**.
- Campos: **Duração** (mínimo `1`, sem máximo definido), **Unidade** (**Segundos**, **Minutos**, **Horas**, **Dias**), **Mensagem** (**Manual**, **Prompt AI** ou **Auto**), anexos e **Usar template caso conversa expirada** (WhatsApp oficial).
- Execução em cascata: o primeiro conta da chegada ao bloco e os seguintes contam a partir do anterior. Ordem de prioridade: follow-ups do dado em coleta → do bloco → da lista de **Setar follow-ups**.
- Qualquer resposta do contato cancela todos os follow-ups pendentes; se um membro assume ou a conversa é resolvida, também são cancelados.
- A seta **Sem resposta** dispara somente depois de todos os follow-ups do bloco.
- Quando a ferramenta **Agendar follow-up** está agendada num bloco de espera, os follow-ups por tempo daquele bloco ficam suspensos até a hora combinada.

## Transferir e Etapas (regras de borda)

- **Transferir:** em **Cíclico com fila**, se não houver membro elegível, a conversa aguarda na fila por ordem de chegada (FIFO). Transferir para **Membro** ou **Grupo** desliga o bot do agente na conversa (o agente para naquela sessão e só volta numa sessão nova). O fluxo continua pela saída do bloco na mesma rodada, mas novas rodadas não executam se o agente tiver sido desligado.
- **Etapas:** o cartão **Etapas** só aparece em agentes que já têm pelo menos uma etapa (não há botão para criar a primeira etapa pela tela; etapas só surgem em agentes existentes, por clone ou importação). Quando o fluxograma não parou em **Subagente** ou **Coletar dados**, o agente lê as últimas **5 mensagens** e escolhe a primeira etapa ativa que passa nos **Dados obrigatórios** (essa escolha gasta saldo). Etapa nova nasce com **Herdar conhecimento** e **Herdar ferramentas** desligados, mas se a etapa não tiver nenhum conhecimento ou ferramenta próprio, o agente usa os do agente principal mesmo assim.
