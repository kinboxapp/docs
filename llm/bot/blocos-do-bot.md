---
title: "Blocos do bot: campos, saídas e tempo limite de cada um"
description: Referência detalhada dos blocos do bot da Kinbox, com campos, valores padrão, saídas, tempos limite, mensagens de sistema e regras de borda.
keywords: [saídas do bloco, sem saldo, erro, timeout, tempo esgotado, resposta inválida, número máximo de respostas inválidas, similaridade, coringa, checkpoint, randomizar delay, botões do menu, lista do whatsapp, detecção de loop, palavra-chave global]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/bot/panels/MidLeftPanel.tsx
  - web:src/pages/settings/bot/drawers/EditNodeMenuDrawer.tsx
  - web:src/pages/settings/bot/drawers/EditNodeLLMDrawer.tsx
  - web:src/pages/settings/bot/drawers/EditNodeEndDrawer.tsx
  - api-v0:server/modules/chat/botFlowV2.js
  - api-v0:server/controllers/WbaCloudController.js
  - widget:src/chat/chat-message-menu-options.tsx
codigo:
  - web:src/pages/settings/bot/panels/MidLeftPanel.tsx
  - web:src/pages/settings/bot/drawers/**
  - web:src/pages/settings/bot/nodes/**
  - web:src/pages/settings/bot/BotCanvas.tsx
  - web:src/components-old/forms/ConditionsInput/index.tsx
  - api-v0:server/modules/chat/botFlowV2.js
  - widget:src/chat/chat-message.tsx
verificado_em: 2026-11-26
---

Detalhes técnicos de campos, valores padrão, saídas, limites e regras de borda dos blocos descritos em [Blocos do bot](/docs/bot/blocos-do-bot) e [Criar e publicar um bot](/docs/bot/aprender-a-usar-o-bot).

## Regras gerais do editor e da execução

- **Ordem dos blocos na barra (17):** **Mensagem**, **Agente de IA**, **Mídia**, **Entrada de dados**, **Definir campo**, **Adicionar tag**, **Atendimento**, **Pendência**, **Menu**, **Palavra-chave**, **Decisão**, **Integração**, **Esperar um tempo**, **Ação de CRM**, **Fim do bot**, **Notificar**, **Split**.
- **Ligações:** cada saída aceita apenas uma ligação (`"Só pode haver um caminho saindo de cada nó."`); um bloco não pode se ligar a si mesmo. Ao publicar, ligações que saíam de opções apagadas (opção de menu, palavra-chave, condição de saída ou condição de **Decisão**) são descartadas.
- **Exclusão de blocos:** o botão **Excluir** e a tecla `Delete` apagam o bloco selecionado sem confirmação (reversível com **Desfazer**). **Início do fluxo** não pode ser apagado.
- **Intervalo entre blocos:** o bot aguarda cerca de 1 segundo antes de executar cada bloco que não espera o contato.
- **Blocos que esperam:** **Entrada de dados**, **Menu**, **Agente de IA** e **Esperar um tempo**. Os demais executam e avançam imediatamente.
- **Validação ao publicar ou ligar:**
  - Verifica se há ligação saindo de **Início do fluxo**. Sem ligação: **Publicar** no editor não salva e seleciona o **Início do fluxo**, sem mensagem; o interruptor do editor mostra `'Necessário que todos os caminhos acabem no nó "Fim do Bot" para ativar ou salvar esse Bot.'` e volta para desligado; o interruptor da lista mostra `'Necessário que todos os caminhos acabem no nó "Fim do Bot" para ativar esse Bot.'` sem abrir o editor.
  - Rejeita ciclos fechados apenas entre blocos que não esperam o contato com `"Loop inválido detectado."`.
  - Um bloco sem saída ligada encerra o bot ali e a conversa permanece aberta (exceto **Agente de IA** e **Decisão**, detalhados abaixo).

## Detalhes por bloco

### Mensagem

- **Campos:** **Texto** (aceita chaves `{{...}}`), **Enviar contato** (cartão de contato), **Enviar como nota de time**, **Digitação natural**, **Usar prompt**, **Prompt**, **Temperatura**.
- **Saídas:** 1 saída.
- **Nota de time e menções:** com **Enviar como nota de time** ligado, menções com `@` notificam os membros mencionados. Se o texto contém menção com a opção desligada, a gaveta exibe: `'Para notificar os membros mencionados, ligue "Enviar como nota de time". Sem isso, o cliente recebe o texto da menção.'`.
- **Digitação natural:** simula digitação a cerca de 5 palavras por segundo (300 por minuto), com teto de 25 segundos.
- **Usar prompt:** gera o texto por IA e consome saldo; se não houver saldo ou ocorrer erro da IA, envia o **Texto** padrão.

### Agente de IA

- **Campos principais:** **Agente de IA** (obrigatório; funciona mesmo se o agente estiver pausado nos canais diretos), **Base de conhecimento** (opcional; usa a base de **Configurações** → **Automação** → **Base de conhecimento**, distinta do conhecimento interno do agente), **Instruções extras** (concatenadas às instruções do agente), **Condições de saída** (até 5; cada uma com descrição em texto e modo **Sair direto** ou **Enviar mensagem e sair**), **Executar somente uma vez**, **Considerar última mensagem do contato**, **Digitação natural**.
- **Ajustes em Personalizar** (exibidos após escolher o agente):
  - **Temperatura:** 0 a 1, passo 0,05; preenchida com 0,2 ao ligar **Personalizar**.
  - **Quantidade de mensagens na memória:** 1 a 400, padrão 30.
  - **Considerar mensagens do sistema.**
  - **Considerar apenas mensagens da sessão atual.**
  - **Modelo:** seletor do modelo de IA.
  - **Tempo de espera antes de responder (seg):** 0 a 60, padrão 0.
  - **Habilidades permitidas:** exibido apenas para agentes de versão anterior (opções como **Enviar mensagem**, **Enviar nota de time**, **Atualizar contato**, **Atualizar sessão**, **Executar bot**, **Adicionar tag**, **Resolver conversa**, **Atribuir membro**, **Mover para grupo**, **Buscar produtos**, **Criar negócio**).
- **Saídas:** **Sem saldo**, **Erro**, até 5 **Condições de saída** e **Saída normal** (quando **Executar somente uma vez** está ligado).
- **Regras de borda:**
  - **Considerar última mensagem do contato:** ligado, responde imediatamente à mensagem anterior do contato; desligado, aguarda a próxima mensagem.
  - **Sem saldo:** acionada quando o saldo do workspace (ou do parceiro, em agente gerenciado) está em R$ 1,00 ou menos.
  - **Erro:** envia a mensagem de sistema `"Houve um erro ao processar a mensagem pelo Agente de IA"` e segue por **Erro**.
  - Se **Sem saldo**, **Erro** ou a condição de saída acionada estiver sem ligação, o bot não avança e fica parado no bloco esperando a próxima mensagem (e sem saldo o contato fica sem resposta).
  - Não possui tempo limite próprio: depende de **Expirar Sessão** do bot.
  - Se a conversa já foi resolvida quando o bloco executa, o bot para com `"Execução do bot cancelada, conversa já resolvida"`. Se um membro assumir a conversa enquanto a resposta está sendo gerada, a resposta é descartada.
  - Excluir um agente usado por um bloco **Agente de IA** é recusado com o aviso **Agente em uso**.

### Mídia

- **Campos:** **Anexar arquivo** (1 arquivo por bloco; aviso `"Subindo anexos..."`) e **Enviar como figurinha**.
- **Saídas:** 1 saída.
- **Envio por tipo:** imagem vai como imagem, áudio vai como mensagem de voz gravada, vídeo como vídeo e demais arquivos como documento. Sem arquivo anexado, o bloco não envia nada e segue.

### Entrada de dados

- **Campos:** **Pergunta**, **Tipo da resposta** (campo de destino: **Contato** — **Nome**, **Email**, **Celular**, **Notas** e campos personalizados; **Sessão** — **Checkpoint**, **Avaliação de atendimento**, **Motivo da avaliação** e campos personalizados; **Negócio** — campos personalizados de negociação), **Validar resposta**, **Tipo de validação** (**Celular**, **Email**, **CPF**, **Máscara**, **Expressão regular** para campos de texto), **Mensagem se resposta for inválida:** (padrão `"Resposta inválida. Tente novamente."`). Para campos de escolha e **Avaliação de atendimento**: **Opções**, **Validar similaridade** (padrão 20%, de 0 a 100%) e **Esconder opções**.
- **Saídas:** 1 saída.
- **Regras de validação:**
  - **Email:** contém `@` e `.`, mais de 5 e menos de 100 caracteres.
  - **Celular:** somente dígitos (sem espaço, traço ou parênteses), de 10 a 13 dígitos.
  - **CPF:** CPF válido; aceita pontos e traço na entrada e grava apenas os números.
  - **Nome:** 2 a 127 caracteres.
  - Sem tipo específico: 1 a 512 caracteres. Campo personalizado com validação própria aplica sua validação.
  - Sem **Validar resposta**, qualquer mensagem é gravada (arquivos são gravados como link).
- **Avaliação de atendimento:** grava apenas uma nota por sessão (a segunda é ignorada) e somente se a sessão teve um membro responsável; resposta fora das opções encerra o bloco sem gravar.
- **Regras de borda:** não possui tempo limite próprio (depende de **Expirar Sessão**). Uma **Palavra-chave** do bot desvia o fluxo antes da validação. Mais de 15 respostas inválidas seguidas encerram o bot com `"Número máximo de respostas inválidas excedido"`.

### Definir campo

- **Campos:** **Campo** (grupos **Contato** e **Sessão**, inclusive **Checkpoint**) e **Valor**.
- **Saídas:** 1 saída.
- **Regras:** **Checkpoint** dispensa **Valor** e marca o bloco ligado logo após como ponto de retorno para **Fim do bot** → **Transferir para checkpoint**. Em **Valor**, `{{operator}}` é substituído pelo nome do membro responsável (vazio se não houver). Erro na gravação não para o fluxo.

### Adicionar tag

- **Rótulos:** barra **Adicionar tag**, gaveta **Adicionar tags**, bloco no fluxo **Tags**.
- **Campos:** **Adicionar tags** e **Remover tags** (com opção **Todas as tags**).
- **Saídas:** 1 saída.
- **Regras:** aplica e remove tags da sessão atual. O bloco adiciona primeiro e remove depois: marcar **Todas as tags** em **Remover tags** também remove as tags que o próprio bloco adicionou.

### Atendimento

- **Campos:** **Atribuir para** (**Membro**, **Grupo** ou **Usar atribuição automática** com escolha da regra).
- **Saídas:** 1 saída.
- **Regras:** atribuir pelo bloco mantém o bot ativo na conversa (diferente da atribuição manual feita por um membro na conversa). **Usar atribuição automática** roda a regra escolhida mesmo se ela estiver desligada na lista de regras e registra `"Conversa transferida por [regra] para [destino]"` (ou a mensagem devolvida pela regra). Erro não interrompe o fluxo.

### Pendência

- **Campos:** **Ação** (**Marcar como pendente**, padrão de bloco novo, ou **Remover pendência**).
- **Saídas:** 1 saída.

### Menu

- **Campos:** **Texto**, **Opções** (valor e **Nome da opção**), **Mensagem se resposta for inválida:**, **Validar similaridade** (padrão 20%, de 0 a 100%), **Esconder opções**, **Esperar tempo** (**Duração** padrão 10; **Unidade** em **Segundos**, **Minutos**, **Horas** ou **Dias**, padrão **Segundos**; máximo de 7 dias = 604.800 s, 10.080 min, 168 h ou 7 dias), **Transcrever áudio**, **Considerar última mensagem do contato**, **Usar prompt**, **Prompt**, **Temperatura**.
- **Saídas:** 1 saída por opção + saída extra de tempo (quando **Esperar tempo** está ligado).
- **Apresentação por canal:**
  - **WhatsApp oficial:** até 3 opções, todas com nome de até 20 caracteres, são enviadas como botões; com mais de 3 opções ou com algum nome acima de 20 caracteres (mesmo com até 3 opções), vão como lista com o botão **Opções** e o título `"Escolha uma opção"` (nomes acima de 24 caracteres são cortados no título e exibidos inteiros na descrição).
  - **Chat do site (widget):** o texto do menu traz as opções numeradas, e o widget mostra as opções como botões clicáveis enquanto o menu for a última mensagem da conversa. Clicar numa opção envia o nome dela como mensagem do visitante (veja [Instalar o chat no seu site](/docs/canais/widget)).
  - **WhatsApp por QR Code** (Express e Clássica): enviados como texto, uma opção por linha no formato `"número - nome"`.
  - **Esconder opções:** envia apenas o **Texto**, sem lista e sem botões.
- **Valores especiais e regras:**
  - O valor `timeout` é reservado (`"Valor reservado para rota de timeout."`).
  - O valor `*` funciona como coringa: qualquer resposta que não corresponda a outra opção segue por ela sem enviar mensagem de resposta inválida, e a opção `*` não aparece na lista enviada.
  - **Esperar tempo:** resposta do contato cancela a contagem.
  - **Transcrever áudio:** consome saldo; sem saldo, o áudio não é transcrito e conta como resposta inválida.
  - **Considerar última mensagem do contato:** avalia a mensagem anterior do contato como resposta do menu, sem enviar o texto do menu.
  - **Usar prompt:** consome saldo; sem saldo, envia o texto padrão.
  - Mais de 15 respostas inválidas seguidas encerram o bot com `"Número máximo de respostas inválidas excedido"`.
  - Se a opção escolhida não tiver saída ligada, o bot encerra ali.

### Palavra-chave

- **Campos:** **Opções** (uma saída por palavra). Bloco sem entrada (atalho global do bot).
- **Regras:** compara a mensagem inteira do contato (sem diferenciar maiúsculas/minúsculas ou espaços extras); palavra dentro de uma frase não aciona. Funciona na mensagem que iniciou o bot, nas respostas de **Menu** e **Entrada de dados** e entre blocos.

### Decisão

- **Campos:** listas `"Quando todas as condições são verdadeiras"` e `"E quando qualquer das condições são verdadeiras"`, e o interruptor `"Cada condição do tipo qualquer deve virar uma opção"`.
- **Saídas:** **Sim** e **Não**; no modo individual, 1 saída por condição da lista "qualquer" (vale a primeira verdadeira) e **Nenhum**.
- **Grupos de condição:** **Contexto** (**Horário**, **Tag**), **Contato** (**Tipo de contato**: **Primeira conversa do canal**, **Já conversou no canal**, **Contato novo**, **Contato já cadastrado**; dados e campos personalizados), **Conversa/Sessão** (**Estado** = **Nunca respondidos**, **Origem da sessão**, **Grupo**, **Atribuído**, **Campanha** (compara com uma das campanhas do workspace; veja [Campanhas: visão geral](/docs/campanhas/visao-geral)), **Janela de resposta**, `source_id`, `utm_source`, `utm_medium`, `utm_campaign`, `gclid`, campos de sessão, **Tags**, **Tipo de canal**, **Canal**, **Negócios abertos da conversa**, **Minutos desde sessão criada**, **Avaliação de atendimento**, **Ads** = Google/Meta), **Negócio** (avalia a negociação mais recente da conversa: status, etapa, grupo, responsável, tag, produto) e **Membro** (**Grupo do membro**, **Disponibilidade do membro**).
- **Janela de resposta (**Aberto** / **Fechado**):** no WhatsApp oficial, Instagram e Facebook Messenger, **Aberto** indica menos de 24 horas desde a última mensagem do contato; nos demais canais é sempre **Aberto** (veja [Janela de 24 horas](/docs/canais/whatsapp/whatsapp-cloud-api/janela-de-24-horas)).
- **Regras de borda:** erro na avaliação segue por **Não**. Se a saída escolhida não tiver ligação, o fluxo segue pela outra saída ligada (mantenha as duas saídas ligadas).

### Integração

- **Campos e saídas:** 1 saída única; tipos **Executar código** (padrão), **Chamar endpoint** e **Outros**. Formato completo do JSON, objeto `kinbox` e campos **Json** estão detalhados em [Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot) e [Executar código no bot](/docs/bot/usando-integracao-execucao-codigo).

### Esperar um tempo

- **Tipo de espera:**
  - **Intervalo de tempo:** **Segundos de espera** (padrão 10; de 1 a 604.800 = 7 dias).
  - **Envio de mensagem pelo cliente:** aguarda nova mensagem do contato.
  - **Recebimento de webhook:** aguarda requisição POST externa no **Endereço do webhook** exibido na gaveta (formato da chamada em [Continuar o bot por webhook](/docs/desenvolvedor/webhook-continuar-bot)).
  - **Randomizar delay:** sorteia entre **Tempo mínimo entre envios** e **Tempo máximo entre envios** na **Unidade** escolhida (**Segundos**, **Minutos**, **Horas** ou **Dias**, até 7 dias).
- **Tempo máximo de espera:** disponível para **Envio de mensagem pelo cliente** e **Recebimento de webhook** (**Duração** e **Unidade** em **Minutos**, **Horas** ou **Dias**); cria saída de tempo esgotado. Mínimo efetivo de 60 segundos (valores menores viram 60 s); sem duração preenchida, usa 1 dia. Resposta do contato cancela a contagem.
- **Regras de borda:** em esperas de até 20 segundos, se a conversa for resolvida ou o bot sair da conversa durante a espera, o bot para com `"Execução de delay cancelada: conversa já resolvida"`. Em esperas maiores, se a conversa for resolvida, aparece `"Execução do bot cancelada, conversa já resolvida"`; se outro bot começar, `"Execução do bot cancelada, outro bot já está em execução"`. Bloco sem saída ligada encerra o bot ali.

### Ação de CRM

- **Rótulos:** bloco **Ação de CRM**, gaveta **Ações de CRM**.
- **Ação:** **Criar negócio** (funil, etapa, nome com chaves `{{...}}`, valor/produtos, **Responsável** com **Mesmo da conversa**, **Grupo** com **Algum grupo do membro**, **Tags**, campos personalizados com suporte a `{{operator}}`) ou **Atualizar negócio** (**Que negócios serão afetados**: **Todos os negócios abertos da conversa**, **Todos os negócios abertos da conversa de determinado funil** + **Funil de vendas**, **Todos os negócios abertos do contato**; altera produtos, tags, **Status** **Aberto**/**Ganho**/**Perdido**, **Motivo de perda**, responsável, grupo ou etapa).
- **Saídas:** 1 saída.
- **Mensagens de sistema:** registra `"Criar negócio"` ou `"Atualizar negócio"` ao executar o bloco (ou `"Erro ao criar negócio"` em falha imediata). Depois de executar o bloco, confira no funil o negócio criado ou atualizado.

### Fim do bot

- **Opções:** **Resolver conversa**, **Transferir para outro bot** (com **Agendar para próximo horário comercial** + **Horário** e **Iniciar na última ação executada desse bot**), **Transferir para outro canal**, **Transferir para checkpoint**.
- **Regras:**
  - Sem opções ligadas: encerra o bot, mantém a conversa aberta e zera o contador de loop.
  - **Resolver conversa** tem prioridade: se ligada, resolve a sessão e não executa **Transferir para outro bot** (apenas **Transferir para outro canal** ocorre junto).
  - **Transferir para outro bot:** inicia o bot de destino mesmo se ele estiver desligado, registrando `"Transferido para Bot [nome]"`. Com **Agendar para próximo horário comercial**, transfere na hora se estiver dentro do **Horário** escolhido ou agenda fora dele (`"Bot [nome] agendado para o próximo horário comercial"` ou `"Não foi possível agendar o Bot [nome]"`).
  - **Transferir para checkpoint:** sem checkpoint gravado na sessão, encerra o bot sem voltar.

### Notificar

- **Campos:** **Do canal** (WhatsApp oficial, WhatsApp por QR Code, SMS, e-mail do workspace e e-mail de envio da Kinbox).
  - **WhatsApp oficial:** template aprovado (+ anexo, se o template exigir) e **Para celular** opcional (10 a 13 dígitos com código do país e DDD; vazio envia para o contato em atendimento).
  - **WhatsApp por QR Code** e **SMS:** **Para celular** obrigatório (10 a 13 dígitos) e **Texto** (SMS até 160 caracteres).
  - **E-mail:** **Para e-mail** (aceita `{{email}}`), **Assunto** e **Texto**.
- **Saídas:** 1 saída.
- **Regras:** textos aceitam chaves `{{...}}`. A conversa registra `"Template [nome] enviado"` ou `"Notificação enviada"` antes da entrega; erro no envio não interrompe o fluxo.

### Split

- **Campos:** **Quantidade de caminhos** (mínimo 2).
- **Saídas:** 1 saída por caminho.
- **Regras:** a cada conversa, sorteia uma das saídas ligadas (divisão aproximada, não em rodízio). Saídas sem ligação não entram no sorteio.

## Proteções e mensagens de sistema

| Mensagem na conversa | Quando acontece |
| --- | --- |
| `"Bot [nome] iniciado"` | Bot comum inicia na conversa (bot de agente registra `"Agente [nome] iniciou o atendimento"`). |
| `"Atendente {membro} executou o bot {bot}"` | Membro inicia um bot manualmente por **Executar bot**. |
| `"{Automação nome} executou o bot {bot}"` | Uma automação dispara o bot. |
| `"Bot [nome] não está mais ativo na conversa"` | Outro bot assumiu a conversa antes de o fluxo iniciar. |
| `"Execução de delay cancelada: conversa já resolvida"` | Num **Esperar um tempo** de até 20 segundos, a conversa foi resolvida ou o bot saiu da conversa durante a espera. |
| `"Execução do bot cancelada, conversa já resolvida"` | A conversa foi resolvida durante uma espera de mais de 20 segundos ou antes da resposta do bloco **Agente de IA**. |
| `"Execução do bot cancelada, outro bot já está em execução"` | Outro bot começou durante uma espera de mais de 20 segundos. |
| `"Número máximo de respostas inválidas excedido"` | Mais de 15 respostas inválidas seguidas em **Menu** ou **Entrada de dados**; o bot é encerrado. |
| `"Bot interrompido por detecção de loop"` | Mais de 200 blocos executados seguidos sem passar por **Menu**, **Entrada de dados** ou **Fim do bot** sem transferência; o bot sai da conversa. O contador zera quando um membro manda mensagem, executa um bot ou resolve a conversa. |
| (nenhuma mensagem) | Depois de 200 blocos executados no total desde que o bot começou na conversa (contando todas as voltas, mesmo com **Menu** ou **Entrada de dados** no caminho), o bot para de avançar sozinho, sem aviso. Para continuar, inicie o bot de novo com **Mais ações** → **Executar bot**. |
| `"Essa sessão expirou e foi finalizada"` | Sessão encerrada por **Expirar Sessão** sem **Executar bot ao expirar**. |

## Quando o bot começa e quando sai

- **Início automático:** ocorre apenas quando o **contato** envia a mensagem que abre uma sessão nova em um canal atendido pelo bot, com o bot ligado. Não inicia em sessão aberta ou reaberta (inclusive dentro do **Tempo de tolerância ao resolver conversa**), em mensagem enviada pelo celular do número nem em conversa iniciada por um membro.
- **Prioridade:** a Kinbox percorre os bots ligados na ordem da lista (de cima para baixo) e usa o primeiro que atende ao canal, horário (fuso do workspace) e tipo de conversa. Bot novo, clonado ou importado entra no fim da lista; bot gerenciado por agente de IA entra no topo.
- **Atende todos os canais × Horários e grupos:** **Horários** e **Atende grupos do WhatsApp** só são aplicados quando os canais são escolhidos em **Canais que atende**. Com **Atende todos os canais** ligado, o bot também começa fora dos **Horários** e em grupos do WhatsApp (mesmo com **Atende grupos do WhatsApp** desligado). Para usar horários ou controlar grupos, desligue **Atende todos os canais** e selecione os canais em **Canais que atende**.
- **Início manual ou por automações:** **Mais ações** → **Executar bot** (permissão **Iniciar Bot** ou proprietário; opção desativada em conversas do Mercado Livre), automações, cenários, ações em lote de funil e agentes de IA executam o bot mesmo desligado e ignorando canais e horários. Se a última sessão estiver resolvida, o bot só a reabre com **Reabrir conversa** ligado.
- **Saída do bot:** o bot sai da conversa quando um membro envia mensagem comum (nota pro time não para; se a conversa não tinha responsável, o membro vira responsável), quando um membro atribui ou move para grupo pela conversa, por **Executar bot** → **Atendimento manual** ou troca para outro bot, ao chegar a **Fim do bot** ou a um bloco sem saída, ao expirar a sessão, ao ultrapassar 15 respostas inválidas seguidas ou ao atingir a detecção de loop (200 blocos). Veja também [O bot não ativa, travou ou repete mensagens](/docs/bot/problemas-comuns).

## Expirar Sessão

- **Campos:** horas, minutos, **Mensagem ao expirar**, **Executar bot ao expirar**. Horas e minutos zerados desativam a expiração.
- **Contagem:** inicia quando o bot começa, zera quando o contato responde e recomeça a cada mensagem enviada pelo bot (conta o tempo sem resposta desde a última mensagem do bot). Só vale enquanto o bot está ativo na conversa (mensagem de um membro remove o prazo). A verificação roda a cada minuto (pode ocorrer até cerca de 1 minuto após o prazo).
- **Ação ao expirar:**
  - Com **Executar bot ao expirar**: inicia o bot escolhido na mesma sessão; a sessão não é resolvida e a **Mensagem ao expirar** não é enviada.
  - Sem bot de destino e com **Mensagem ao expirar**: envia a mensagem ao contato e, 2 segundos depois, resolve a sessão com `"Essa sessão expirou e foi finalizada"`.
  - Sem bot de destino e sem mensagem: resolve a sessão com `"Essa sessão expirou e foi finalizada"`.

## O que gasta saldo

Dentro do bot, consomem saldo apenas:

- bloco **Agente de IA** (a cada resposta; exige saldo acima de R$ 1,00);
- **Usar prompt** nos blocos **Mensagem** e **Menu**;
- **Transcrever áudio** no bloco **Menu**;
- botão **Assistente Kin** nos blocos **Integração** (exige saldo acima de R$ 0,10).

Os demais blocos não consomem saldo. Veja [Saldo da carteira e créditos: o que consome](/docs/conceitos/saldo-e-creditos). Para colocar saldo, veja [Adicionar saldo e créditos de SMS](/docs/assinatura/adicionar-saldo); para ser avisado antes de o saldo acabar, veja [Configurar o alerta de saldo](/docs/assinatura/alerta-de-saldo).

## Simulação × conversa real

- **Simular bot** gera um contato e uma conversa fictícios editáveis em **Ver dados do contato** (com **Reiniciar** para alterar durante uma simulação em andamento) e aceita texto, **Enviar áudio** e **Enviar arquivo**.
- **Agente de IA:** não responde na simulação (exibe `"Não posso responder na simulação de bot no momento, somente na aplicação real."`) e não consome saldo.
- **Notificar** e **Ação de CRM:** são pulados na simulação sem executar ações reais.
- **Integração:** **Chamar endpoint** e chamadas `axios` em **Executar código** executam requisições reais na simulação, salvo quando **Pular integrações** está ligado em **Ver dados do contato**; integrações prontas do grupo **Outros** são puladas na simulação.
