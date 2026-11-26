---
title: "Diagnóstico do agente: saldo, canal com outro agente, gerenciado pelo parceiro, agente em uso"
description: Matriz de diagnóstico do agente de IA da Kinbox, com causa, como confirmar, mensagem exata e o que fazer para cada sintoma.
keywords: [diagnóstico agente, agente não responde, saldo insuficiente, mover canal de agente, também atendido pelo bot, gerenciado pelo parceiro, agente em uso, execução do agente, houve falha durante a execução, logs não encontrados]
publico: llm
tipo: solucao-de-problema
fontes:
  - web:src/pages/agents/components/AgentStatusTag.tsx
  - web:src/pages/agents/components/connections/ConnectionPicker.tsx
  - web:src/pages/agents/useRemoveAgent.tsx
  - api:src/modules/agents/agent.runner.ts
  - api-v0:server/modules/chat/chatBotHandler.js
  - web:src/pages/inbox/AgentExecution/AgentExecutionDrawer.tsx
codigo:
  - web:src/pages/agents/components/AgentStatusTag.tsx
  - web:src/pages/agents/components/connections/**
  - web:src/pages/agents/useRemoveAgent.tsx
  - api:src/modules/agents/agent.runner.ts
  - api:src/modules/agents/agents.service.ts
  - api:src/modules/agents/agent-bot.service.ts
  - api-v0:server/modules/chat/chatBotHandler.js
  - web:src/pages/inbox/AgentExecution/**
verificado_em: 2026-11-26
---

Matriz de diagnóstico complementar de [O agente não responde ou responde errado](/docs/agente-de-ia/problemas-comuns).

## Matriz de diagnóstico

| Se acontece... | Causa | Como confirmar / mensagem exata | O que fazer |
| --- | --- | --- | --- |
| Agente não responde e status está **Sem canais** | Nenhum canal conectado | Cartão **Canais conectados** vazio; interruptor não aparece | Conectar pelo menos um canal no agente. |
| Agente não responde e status está **Pausado** | Interruptor desligado | Dica `"Agente pausado nos canais conectados"` | Ligar o interruptor **Atendendo nos canais conectados**. |
| Agente parou de responder (no canal ou no teste) | Saldo em **R$ 1,00 ou menos** | No teste: **Saldo Insuficiente** / `"O agente não respondeu porque o saldo acabou. Faça uma recarga para continuar."` (em agente gerenciado pelo parceiro, pode ser o saldo da carteira do parceiro) | Conferir em **Configurações** → **Assinatura**, na seção **Carteira** (permissão **Assinatura**), e recarregar (ou acionar o parceiro). |
| Agente não responde num canal que antes atendia | Canal foi movido para outro agente de texto (cada canal tem um único agente de texto para as mensagens; no WhatsApp oficial com ligações, um agente de voz à parte atende as ligações) | Canal sumiu de **Canais conectados**; em **Conectar canal** mostra `"Em uso pelo agente {{name}}"`; mover abre **Mover canal de agente** (`"Cada canal é atendido por um único agente. Ao continuar:"`) | Escolher qual agente deve atender o canal e mover se necessário. |
| Agente conectado e ligado, mas outro fluxo responde no canal | Outro bot ativo está acima na lista de bots | Em **Conectar canal** aparece `"Também atendido pelo bot {{name}}"`; na lista de **Bot**, o bot com etiqueta **Agente de IA** está abaixo de outro bot ativo para o mesmo canal | Subir o bot do agente na lista de bots ou desativar o outro bot. |
| Mensagem nova do contato não chama o agente | Sessão já estava aberta ou foi reaberta (ou mensagem veio do celular do número) | Conversa sem mensagem de início do agente | Esperado: o agente só entra quando o contato abre uma sessão nova. |
| Agente não responde em grupo de WhatsApp | Bot do agente não atende grupos | Conversa é de grupo | Esperado: agente de IA não responde em grupos de WhatsApp. |
| Agente parou no meio da sessão após resposta ou transferência | Um membro respondeu na conversa (nota interna não conta) ou o agente usou **Transferir para humano**, **Mover para grupo** ou **Transferir** (para **Membro** ou **Grupo**) | Mensagem comum de membro ou mensagem de transferência na conversa | Esperado: o agente desliga nessa sessão e só volta numa sessão nova. |
| Agente executa ações, mas não envia mensagens ao contato | **Modo silencioso** ligado | Selo **Silencioso** (`"Não envia mensagens"`) no topo do chat de teste | Desligar **Modo silencioso** em **Abrir configuração** → **Comportamento** e clicar em **Salvar**. |
| Agente não lembra conversas anteriores do contato | **Usar apenas mensagens da sessão atual** ligado | Opção ligada em **Configurações** → **Comportamento** | Desligar a opção se o histórico anterior for necessário. |
| Agente demora para responder | **Agrupar mensagens em sequência** com tempo alto (até 300 s; cada nova mensagem reinicia a espera) | Valor configurado em **Configurações** → **Comportamento** | Reduzir o tempo ou ajustar para `0`. |
| Agente ignora informação que está no conhecimento | Conhecimento ainda processando (`pending`/`ingesting`) ou com erro (`error`) | Ícone girando ou item riscado com selo `"Error"` e dica `"Ocorreu um erro ao treinar o conhecimento"` | Esperar terminar; em caso de erro, remover no **X**, revisar arquivo/URL/legenda e adicionar novamente. |
| Arquivo recusado ao subir no conhecimento | Acima de 5 MB ou formato fora de `.pdf`, `.txt`, `.docx` (inclusive `.md`) | `"O tamanho do arquivo é maior que o permitido. O Máximo é 5MB."` / `"O arquivo não é suportado."` | Reduzir o arquivo ou salvar `.md` como `.txt`. |
| Agente responde sem usar ação do Google Calendar ou HubSpot | Conexão do app está expirada ou pendente | No campo **Conexão** da ferramenta aparece `"(expirada)"` ou `"(pendente)"`; as ações são ignoradas em silêncio sem aviso | Reconectar a conta em **Conexão** (permitir pop-ups; erros possíveis: `"Permita popups para autenticar"`, `"Falha na conexão"`, `"Tempo esgotado para autenticar"`). |
| Ferramenta HTTP aparece sem nome no agente e não roda | A ferramenta HTTP foi excluída do workspace | Item sem nome no cartão **Ferramentas**; agente ignora em silêncio | Retirar o item do agente e cadastrar novamente se necessário. |
| Blocos ou ferramentas do Kinbox Agenda bloqueados | Workspace sem Kinbox Agenda no plano | Aviso `"Adicione o Agenda ao seu plano"` e botão **Liberar potencial agora** | Contratar o Kinbox Agenda no plano. |
| Agente não transfere quando deveria | Ferramenta **Transferir para humano** não adicionada ou **Condição** vaga | Verificar cartão **Ferramentas** e painel **Inspeção** | Adicionar a ferramenta e detalhar a **Condição**. |
| Fluxograma não publica | Bloco incompleto, ciclo sem espera ou regra de saída violada | `"Resolva os problemas de todas as etapas antes de publicar"`, `"Não é possível publicar: existe um loop infinito no fluxo."` e demais mensagens de publicação | Corrigir os blocos/setas indicados (ver [Ações do fluxograma](/docs/agente-de-ia/acoes-do-fluxograma)). |
| Fluxograma parou com erro no meio da execução | Mesmo bloco rodou mais de 3 vezes na mesma rodada, ou bloco falhou sem seta **Erro** | Painel **Execução do agente** / **Inspeção** com erro | Revisar laços e adicionar seta **Erro** ou bloco **Erro não tratado** (lembrando que **Requisição HTTP** com falha segue pela saída normal). |
| Não consegue excluir o agente | Outro bot ou outro agente referencia este agente | Janela **Agente em uso** (`"Tire o agente destes fluxos antes de excluir:"`) ou erro da API `"Este agente é usado em: {{nomes}}. Tire o agente desses fluxos antes de excluir."` (o bot gerenciado do próprio agente não bloqueia) | Remover o agente dos bots (bloco **Agente de IA**) e dos fluxogramas (**Executar outro agente** / **Subagente**) listados e tentar novamente. |
| Não vê o fluxograma, os cartões de edição nem **Inspecionar** na conversa | Agente é **Gerenciado pelo parceiro** (ou é **Agente de voz**, no caso do fluxograma/ferramentas) | Selo **Gerenciado pelo parceiro** ou **Voz** na lista | Em agente gerenciado pelo parceiro, o cliente só pode testar; falar com o parceiro. |
| Erro ao conectar canal no agente | A conexão não foi concluída | Mudança é desfeita e nenhum canal fica conectado | Repetir ou acionar o suporte informando nome do agente e do canal. |
| **Executar bot** ou **Resolver conversa** não fazem nada no teste | Ignorados na simulação | Aviso na **Inspeção**: `"Esta ferramenta não é executada na simulação. Para testar use um canal real nas conexões do agente."` | Testar conectando o agente a um canal real de teste. |
| Ajustes do bloco **Avançado** na simulação não mudam o comportamento | O bloco **Avançado** não muda a resposta do agente no teste | Gaveta **Ajustes da simulação** → **Avançado** | Na simulação, use **Campos da conversa** e **Campos de contato**. |
| Teste criou evento ou chamou sistema real | Google Calendar, HubSpot e ferramenta HTTP / **Requisição HTTP** rodam de verdade no teste (o **Agendar follow-up** dispara só dentro da simulação) | Eventos/chamadas reais durante teste no editor | Testar com dados descartáveis; criar/reagendar/cancelar do **Kinbox Agenda** (ferramentas e fluxograma) são simulados. |
| **Inspecionar** sumiu da conversa | Logs expiraram após 60 dias | Mensagem de início do agente sem botão **Inspecionar** | Esperado: histórico de execução fica disponível por 60 dias. |
| **Agente de voz** não atende ligações | Recurso em teste não liberado, número em coexistência, sem plano de **Ligações WhatsApp** ou saldo em **R$ 0,50 ou menos** sem franquia | `"Ligações do WhatsApp ainda não estão liberadas para este workspace"`, `"Em coexistência com o app WhatsApp Business: {{channels}}. A Meta não oferece ligações nesse modo."`, `"Para usar as ligações, o ambiente precisa assinar um dos planos de Ligações WhatsApp."` | Conferir os requisitos em [Agente de voz para as ligações do WhatsApp (Beta)](/docs/agente-de-ia/agente-de-voz). |

## Estados do painel Execução do agente

Na conversa, passar o mouse sobre a mensagem de sistema de início do agente mostra **Inspecionar** (`"Ver o passo a passo desta execução"`), disponível por **60 dias** (oculto em agentes **Gerenciado pelo parceiro**). As ferramentas acionadas aparecem em **Ferramentas do agente**.

Estados exibidos no painel **Execução do agente**:
- `"Executando..."`
- `"Atendimento processado com sucesso."`
- `"Houve falha durante a execução."`
- `"Sem resposta nesta rodada"`
- `"Nenhuma ação registrada nesta rodada."`
- `"Logs não encontrados"`

## Agente gerenciado pelo parceiro e saldo

Em um agente marcado como **Gerenciado pelo parceiro**, os gastos podem sair da carteira do parceiro em vez da carteira do workspace do cliente. Se a carteira debitada atingir **R$ 1,00 ou menos**, o agente deixa de responder mesmo que o workspace do cliente tenha saldo positivo. O saldo do parceiro não é exibido ao cliente.

## Permissões

- **Agentes de IA** (seção **Gerenciamento do Ambiente**): necessária para ver o item **Agentes de IA** no menu e para criar, editar e excluir agentes. O proprietário do workspace tem todas as permissões.
- **Base de conhecimento**: necessária para criar, renomear e excluir conhecimentos do agente. Quem tem só **Agentes de IA** consegue ligar e tirar conhecimentos que já existem, mas o envio de um conhecimento novo não é concluído.
- **Gerenciar Canais**: necessária para abrir **Gerenciar canais** a partir do seletor, para acessar a aba **Ligações** do canal oficial e para conectar, trocar ou desconectar o WhatsApp oficial de um agente de voz (inclusive pelo cartão **Canais conectados** do editor).
