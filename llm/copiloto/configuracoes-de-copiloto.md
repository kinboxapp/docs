---
title: "Copiloto: cada recurso, onde atua, saldo mínimo e tempo para a mudança valer"
description: Regras do copiloto da Kinbox para responder dúvidas, com o que cada função faz e quando roda, os limites, o saldo mínimo, as descrições no extrato, as restrições de papel e as mensagens de erro.
keywords: [copiloto não aparece, seus créditos acabaram, saldo insuficiente, escreva um texto para usar essa ação do assistente, sugestões não aparecem, botão sugestões, 60 segundos, onde o copiloto atua, aguardando, sem saldo, analisando, avaliando, já é cliente, revise antes de enviar, ficou algo em aberto, uso do copilot, não mostrar sugestões de respostas, esconder sentimento, esconder lead score]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/copilot/index.tsx
  - web:src/pages/settings/copilot/CopilotChatDrop.tsx
  - web:src/pages/inbox/Chat/CopilotAutoSuggest.tsx
  - web:src/pages/inbox/Chat/useCopilotAutoSuggestion.ts
  - web:src/lib/copilotChecks.tsx
  - web:src/components-old/chat/side/SessionInfoPlugin/SignalFields.tsx
  - api:src/modules/copilot/copilot.service.ts
  - api:src/modules/signals/signals.service.ts
  - api:src/modules/wallet/micro-debit.service.ts
codigo:
  - web:src/pages/settings/copilot/**
  - web:src/pages/inbox/Chat/CopilotAutoSuggest.tsx
  - web:src/pages/inbox/Chat/CopilotSuggestions.tsx
  - web:src/pages/inbox/Chat/useCopilotAutoSuggestion.ts
  - web:src/pages/inbox/Chat/ScheduleSuggestion.tsx
  - web:src/pages/inbox/ChatTextEditorPure.tsx
  - web:src/lib/copilotChecks.tsx
  - web:src/lib/messageReview.ts
  - web:src/lib/signals.ts
  - web:src/hooks/useSessionSignals.ts
  - web:src/components-old/chat/side/SessionInfoPlugin/SignalFields.tsx
  - web:src/components-old/inbox/ConversationItem/SignalBadges.tsx
  - web:src/components-old/chat/useQuickPhraseSuggestions.ts
  - api:src/modules/copilot/**
  - api:src/modules/signals/**
  - api:src/modules/assist/assist.service.ts
  - api:src/modules/wallet/micro-debit.service.ts
  - api-v0:server/services/**
  - api-v0:server/modules/chat/**
verificado_em: 2026-11-26
---

Detalhes de referência das páginas [Configurações do copiloto](/docs/copiloto/configuracoes-de-copiloto) e [Usar o copiloto na conversa](/docs/copiloto/usar-o-copiloto-de-ia).

## Salvar e tempo para valer

- Todas as funções começam desligadas em **Configurações** → **Automação** → **Copiloto** (acesso com permissão **Copiloto** na seção **Gerenciamento do Ambiente** ou proprietário). As configurações valem para o workspace inteiro.
- **Adicionar**, **Concluir** e **Excluir** alteram apenas a tela atual. Nada entra em vigor antes de clicar em **Salvar mudanças** na barra inferior (**Cancelar** desfaz).
- Ao salvar, aparece `"Configurações salvas. As mudanças podem levar até 60 segundos para fazer efeito."`.
- O salvamento aplica apenas o que foi alterado na sessão aberta sobre o que já estava salvo, evitando sobrescrever mudanças salvas por outra pessoa ao mesmo tempo.
- Fechar uma função com alterações pendentes mostra **Sair sem salvar?** (`"As alterações nesta função serão descartadas."`, botões **Sair** e **Continuar editando**). Sair da página sem salvar exibe `"Você tem mudanças não salvas, tem certeza que deseja sair?"`.
- Excluir uma função pede confirmação: `"Excluir esta função? O copiloto deixa de fazer isso."`. Para **Avaliadores**, o aviso é `"Excluir os avaliadores? Todos os avaliadores configurados serão removidos."`.

## Escopo (**Onde o copiloto atua**)

- Função desligada ou **Canais** e **Grupos** vazios: todas as conversas do workspace.
- Só **Canais** preenchido: conversas desses canais, em qualquer grupo ou sem grupo.
- Só **Grupos** preenchido: apenas conversas em um desses grupos; conversas sem grupo (por exemplo, ainda no bot) ficam de fora.
- **Canais** e **Grupos** preenchidos: a conversa precisa atender aos dois critérios (canal **e** grupo).
- Trocar o grupo de uma conversa passa a valer na próxima leitura do copiloto. Fora do escopo, o menu do copiloto some do editor e o bloco **Sugestões** não aparece.

## Mapa de funções, condições e extrato

| Função / recurso | Onde aparece | Condições extras | Descrição no **Extrato do saldo** |
| --- | --- | --- | --- |
| **Onde o copiloto atua** | Limita todas as funções | — | Não gera cobrança |
| **Sugestões automáticas** | Bloco **Sugestões** acima do editor | Última mensagem do contato, conversa aberta, sem bot, no escopo, sem restrição **Não mostrar sugestões de respostas**, saldo acima de R$ 0,20 | `"Uso do copilot"` (e `"Transcrição de áudio"` ao transcrever áudios) |
| Frases rápidas sugeridas (opção **Sugerir frases rápidas**) | Topo da janela **Frases rápidas** | **Sugestões automáticas** e **Sugerir frases rápidas** ligadas, frases cadastradas, conversa no escopo, saldo acima de R$ 0,20 | `"Uso do copilot"` |
| **Comandos de chat** | Ícone de estrelas (**Copiloto**) no editor de conversas e de campanhas por WhatsApp por QR Code ou SMS | Função adicionada; nas conversas, a conversa precisa estar no escopo | `"Uso do copilot"` |
| **Análise de sentimento** | Cartão **Sessão** e lista de conversas abertas (só Irritado/Impaciente) | Mensagem do contato, conversa aberta, no escopo | `"Análise de sentimento"` |
| **Avaliadores** | Campo personalizado da sessão/contato e tags da conversa | Até 10 avaliadores; campo ativo; campo de contato exige contato | `"Avaliadores do copiloto"` |
| **Revisor de mensagens** | Janela **Revise antes de enviar** | Resposta de texto com 12+ caracteres (não nota interna), no escopo, ao menos 1 categoria/regra ativa | `"Revisor de mensagens"` |
| **Aviso ao resolver** | Janela **Ficou algo em aberto?** | Botão **Resolver** na conversa aberta (não roda em lote nem ao reabrir), no escopo | `"Aviso de pendência ao resolver"` |
| **Sugestão de retorno** | Faixa **Ficou um retorno combinado** acima do editor | Sem bot/agente atendendo, sem agendamento pendente, 1 vez por sessão, permissão **Agendar mensagem** | `"Sugestão de retorno"` (detecção) e `"Rascunho de retorno"` (rascunho) |
| **Não reabrir por agradecimento** | Mensagem de sistema na conversa resolvida | Até 24 h após resolver, só texto de até 2.000 caracteres do contato, no escopo | `"Mensagem de encerramento"` |
| **Cliente preso no bot** | 🆘 na lista e cartão **Sessão** | Só enquanto bot/agente atende e após resposta do contato ao bot, 1 vez por sessão | `"Cliente preso no bot"` |
| **Classificação de intenção** | Cartão **Sessão** e tag opcional na conversa | No início da sessão (até decidir ou 5 leituras), no escopo | `"Classificação de intenção"` |
| **Lead score** | Cartão **Sessão** e lista de conversas abertas (só Quente/Excelente) | Conversa com contato sem negociação ganha, no escopo | `"Lead score"` |
| **Criar com Copiloto** (editores do WhatsApp oficial) | Painel lateral em templates, Flows e carrossel | Independente da tela do Copiloto; exige saldo acima de R$ 0,20 | `"Uso do copilot (chat)"` |

## Menu do copiloto (**Comandos de chat**)

- Só aparece com **Comandos de chat** adicionada: no editor das conversas (nas conversas, a conversa precisa estar no escopo de **Onde o copiloto atua**) e no campo **Mensagem** das [campanhas](/docs/campanhas/campanhas-no-kinbox) por WhatsApp por QR Code ou SMS.
- Estrutura: título **Copiloto**, ícone `?` (**Central de ajuda**), busca **Pesquisar ação** (filtra pelo nome; sem resultado mostra `"Nada encontrado"`), navegação por setas e `Enter`, e grupos **Personalizado**, **Conversa**, **Mudar texto**, **Mudar tom para** e **Gerar texto**.
- Enquanto um comando está em execução, o botão não abre outro.
- **Resumir sessão** (grupo **Conversa**): não precisa de texto no editor; lê até as **100 mensagens** mais recentes da sessão atual; se não houver mensagem de texto na sessão, mostra `"Nenhuma mensagem encontrada"`.
- **Mudar texto**, **Mudar tom para** e **Personalizado**: exigem texto no editor; com o campo vazio mostram `"Escreva um texto para usar essa ação do assistente."`.
- **Traduzir**: abre **Traduzir texto** (`"Traduzir para qual lingua?"`, botão **Traduzir**) aceitando qualquer idioma digitado.
- **Gerar texto** (**Promocional**, **Pedido de desculpas**, **Felicitação**): não precisa de texto no editor; abre janela pedindo contexto (campo obrigatório com validação `"Campo obrigatório"` e botão **Gerar texto**).
- Resultado substitui o texto do editor; se havia texto antes, exibe `"Copiloto alterou o texto"` com **Desfazer**.
- Cada clique em um comando gera e cobra novamente (não reaproveita resultado anterior).

## Comandos personalizados e comandos padrão

- Não há limite de quantidade para comandos personalizados.
- Campos obrigatórios: **Nome** (`"Nome é obrigatório"`) e **Prompt**.
- **Chaves reservadas** (`{ }`): **Contexto** (**Texto digitado** `{{editor_text}}`), **Sessão da conversa** (**Protocolo** e campos personalizados de sessão) e **Contato** (**Nome**, **Primeiro nome**, **E-mail**, **Telefone** e campos personalizados de contato).
- Apenas a **primeira ocorrência** de `{{editor_text}}` no prompt é substituída pelo texto do editor. Se o prompt não contiver `{{editor_text}}`, o texto digitado não é enviado, embora o comando continue exigindo algum texto no editor para rodar.
- **Comandos padrão:** cada comando pode ser ativado, desativado ou arrastado para mudar a ordem dentro do grupo; cada grupo tem **Desativar todos** / **Ativar todos**; grupos sem nenhum comando ativo somem do menu; **Restaurar padrão** volta todos os comandos ligados na ordem original.
- Comandos personalizados não consultam base de conhecimento nem imagens.

## Sugestões de resposta e frases rápidas

- **Quando o bloco Sugestões aparece:** última mensagem (de texto/mídia, sem contar notas e eventos) é do contato, conversa não está resolvida, bot não está atendendo, conversa está em **Onde o copiloto atua** e o papel do membro não tem a restrição **Não mostrar sugestões de respostas**.
- **Com Sugestões automáticas ligada:** as sugestões são geradas ao abrir a conversa. Com saldo de R$ 0,20 ou menos, nada é gerado e o bloco **Sugestões** não aparece.
- **Sob demanda:** mesmo sem **Sugestões automáticas** adicionada, o botão **Sugestões** aparece nas mesmas condições acima e gera sugestões ao clicar (consumindo saldo). Com saldo de R$ 0,20 ou menos, o botão pode continuar aparecendo, mas o clique não gera sugestões. Para escondê-lo, use a restrição **Não mostrar sugestões de respostas** no papel ou restrinja **Onde o copiloto atua**.
- **O que lê:** até **100 mensagens** da sessão atual (contato, membros e bot).
  - **Processar imagens** (padrão ligado): analisa apenas imagens enviadas pelo contato.
  - **Transcrever áudios** (padrão ligado): transcreve os áudios presentes entre as **5 mensagens mais recentes** (inclusive de membros), mostra `"Transcrevendo áudios"` e salva a transcrição na mensagem.
  - Arquivos, vídeos, localização, stories e pedidos entram apenas como indicação de envio.
- **Opções e limites:** **Instruções extras** até **10.000 caracteres**; **Criatividade** de `0` a `1,2` (passos de `0,2`: **Muito conservador**, **Conservador**, **Neutro** = `0,4` padrão, **Criativo**, **Muito criativo**, **Super criativo**, **Doido varrido**); **Quantidade de sugestões** de `1` a `3` (padrão `1`).
- **Personalizar por grupo:** usa o grupo do **membro em atendimento** (não o grupo da conversa). Vale a primeira regra que tiver um grupo do membro. A base de conhecimento configurada em uma regra vale mesmo com **Usar base de conhecimento** desligado no padrão.
- **Reaproveitamento e tempo limite:** a sugestão gerada para a mesma última mensagem fica guardada por **72 horas** (não gera nem cobra novamente ao reabrir a conversa). Se a geração passar de **30 segundos**, nenhuma sugestão é exibida.
- **Frases rápidas sugeridas:** com **Sugestões automáticas** e **Sugerir frases rápidas** (padrão ligado) ativas, sugere até **3 frases** no topo de **Frases rápidas**, fazendo uma consulta por sessão e última mensagem. Exige frases rápidas cadastradas, conversa no escopo e saldo acima de R$ 0,20.

## Análises automáticas

Detalhes de configuração em [Analisar conversas com IA: sentimento, avaliadores, intenções e lead score](/docs/copiloto/analises-de-ia).

- **Ritmo de leitura:** dispara **20 segundos** depois da última mensagem do contato (várias mensagens seguidas geram uma única leitura). Mensagens de membros não disparam análises (apenas a detecção da **Sugestão de retorno**).
- **Leitura única:** todas as análises ligadas (incluindo avaliadores de início e a cada mensagem) são avaliadas na mesma leitura da conversa.
- **Conteúdo lido:** até as **20 mensagens mais recentes** da sessão, com até **1.000 caracteres** cada (texto do contato, membro e bot; áudio entra pela transcrição; notas internas, mensagens de sistema, mensagens apagadas, imagens e arquivos ficam de fora). Sem mensagem de texto do contato nesse trecho, não analisa.
- **Sessão resolvida:** não é lida, exceto por avaliadores com gatilho **Ao resolver** (rodam **5 segundos** após resolver, lendo as últimas 20 mensagens da sessão).
- **Cobrança e falhas:** cobra a leitura mesmo quando o resultado vem indefinido ou sem certeza suficiente para gravar. Os usos são somados e lançados agrupados por descrição no extrato. Em caso de falha, tenta até **3 vezes** com espera crescente; se falhar todas, nada é gravado.
- **Regras específicas por análise:**
  - **Análise de sentimento:** 5 níveis (**Irritado**, **Impaciente**, **Neutro**, **Satisfeito**, **Encantado**) mais **Indefinido**; vale por sessão; tendência (**Melhorando** / **Piorando**) compara com a média das até 3 leituras anteriores; roda também durante o bot; lista de conversas mostra só **Irritado** e **Impaciente** em conversas abertas.
  - **Classificação de intenção:** até **10 intenções** mais **Outro** (fixo); nome até **60 caracteres**, descrição até **300 caracteres**; validações `"Dê um nome para a intenção"` e `"Já existe uma intenção com esse nome"`. Roda também durante o bot e trava na primeira intenção identificada com certeza (uma vez por sessão). Após **5 leituras** sem certeza, para de consultar e a linha pode continuar em **Analisando** até o fim da sessão. Quando há tag vinculada, tenta aplicá-la até 5 vezes (disparando automações de tag); se falhar, mostra `"Não foi possível aplicar a tag {{tag}}."`. **Outro** não aplica tag.
  - **Lead score:** nota de `0` a `100` em 4 faixas (`0–16` **Frio**, `17–49` **Morno**, `50–83` **Quente**, `84–100` **Excelente**), com tendência **Esquentando** / **Esfriando**. **Seu cliente ideal** até **1.500 caracteres**; critérios personalizados por faixa até **400 caracteres** cada. Salvo no **contato** (uma nova sessão já exibe a última nota). Contatos com negociação ganha em qualquer funil não são avaliados (**Já é cliente**), nem conversas sem contato. Roda também durante o bot; lista de conversas mostra só **Quente** e **Excelente** em conversas abertas.
  - **Cliente preso no bot:** roda apenas enquanto um bot ou agente de IA atende e depois que o contato responde ao bot (a mensagem que iniciou o bot não conta). Detecta uma vez por sessão. **Só sinalizar** (padrão) marca com 🆘; **Passar para humano** interrompe o bot, registra `"Bot interrompido pelo Copiloto: o cliente parecia preso no atendimento automático."` e transfere para **Mover para o grupo** (se preenchido, disparando automações de grupo). Se um humano já tiver assumido ou a conversa estiver resolvida, nenhuma ação é executada. O 🆘 some da lista e do cartão quando um membro responde (a detecção continua no relatório).
  - **Avaliadores:** até **10 avaliadores** (`"Limite de 10 avaliadores. Remova um avaliador para criar outro."`). **Nome** até **60 caracteres**; **O que avaliar** até **1.000 caracteres**; **Nome do campo** novo até **60 caracteres**. Gatilhos: **No início da conversa** (repete até decidir ou atingir 5 leituras, uma vez por sessão), **A cada mensagem** (atualiza a cada mensagem do contato, inclusive durante o bot) e **Ao resolver** (5 s após resolver, lê últimas 20 mensagens). Saída em **Campo personalizado** (número/decimal, seleção única, seleção múltipla ou sim/não, em **Sessão** ou **Contato**) ou **Tags** (dispara automações de tag). Campo novo só é criado ao clicar em **Salvar mudanças** (`"Não foi possível criar o campo personalizado. Tente de novo."`). Se o campo for apagado depois, o avaliador mostra `"Campo removido"` e deixa de rodar. Campo de **Contato** só grava se a conversa tiver contato. **Nota** grava valor inteiro na faixa escolhida (padrão `0` a `10`); **Seleção única** e **Sim/não** só gravam quando há boa certeza; **Seleção múltipla** e **Tags** marcam cada item com boa certeza. **Pular contatos com negociação ganha** ignora contatos com negociação ganha em qualquer funil. Validações do editor: `"Dê um nome para o avaliador"`, `"Escreva o que o copiloto deve avaliar"`, `"Dê um nome para o campo"`, `"Adicione as opções"`, `"Escolha o campo"`, `"Escolha a tag"`, `"Escreva a condição"`.

### Modelos prontos de avaliador

| Grupo | Modelo | Quando avalia | Onde salva |
| --- | --- | --- | --- |
| Qualidade do atendimento | **Nota do atendimento** | Ao resolver | Campo "Nota do atendimento" (Sessão, Nota 0–10) |
| Qualidade do atendimento | **Problema resolvido?** | Ao resolver | Campo "Problema resolvido" (Sessão, Sim/não) |
| Qualidade do atendimento | **Pontos a melhorar** | Ao resolver | Campo "Pontos a melhorar" (Sessão, Seleção múltipla) |
| Vendas | **Motivo de perda** | Ao resolver (já vem com **Pular contatos com negociação ganha**) | Campo "Motivo de perda" (Sessão, Seleção única) |
| Vendas | **Objeções do cliente** | A cada mensagem | Campo "Objeções" (Sessão, Seleção múltipla) |
| Vendas | **Pediu desconto?** | A cada mensagem | Campo "Pediu desconto" (Sessão, Sim/não) |
| Vendas | **Oportunidade futura** | Ao resolver | Campo "Oportunidade futura" (Contato, Sim/não) |
| Suporte | **Urgência** | No início da conversa | Campo "Urgência" (Sessão, Seleção única) |
| Relacionamento | **Risco de cancelamento** | A cada mensagem | Campo "Risco de cancelamento" (Contato, Nota 0–10) |
| Relacionamento | **Não quer receber mensagens** | A cada mensagem | Campo "Não contatar" (Contato, Sim/não) |

Se o workspace já tem um campo com o mesmo nome e tipo, o modelo usa esse campo. Depois de **Salvar avaliador**, é preciso clicar em **Adicionar** (ou **Concluir**) na janela da função e em **Salvar mudanças** na página.

## Estados do cartão Sessão

As linhas do copiloto aparecem no topo do cartão **Sessão** na ordem **Atendimento automático** (só quando detectado), **Intenção**, **Sentimento** e **Lead score**.

| Estado / texto | Significado |
| --- | --- |
| **Aguardando** | `"Aguardando mensagens do cliente para analisar."` |
| **Sem saldo** | `"Sem saldo para a análise do copiloto."` (com **Recarregar créditos** para quem tem acesso ao financeiro). Aparece com saldo de R$ 0,20 ou menos, nas linhas que ainda não têm leitura; resultados já registrados continuam aparecendo. |
| **Analisando** | `"O copiloto ainda não tem certeza da intenção. Palpite: {{name}}"` (ou após 5 leituras sem certeza). |
| **Avaliando** | `"O copiloto ainda não tem confiança para avaliar este lead."` |
| **Já é cliente** | `"Este contato já é cliente (tem negociação ganha), então o lead score não é mais analisado."` |
| **🆘 Precisa de humano** | Detectado em **Atendimento automático**; mostra se o bot foi interrompido (`"O Copiloto interrompeu o bot e passou a conversa para humano."`), se está em andamento (`"O Copiloto está passando a conversa para humano."`), se o bot já havia parado (`"O bot já tinha parado quando o Copiloto foi passar a conversa para humano."`) ou se falhou (`"O Copiloto não conseguiu passar a conversa para humano. Transfira manualmente."`). |

## Avisos ao membro e Não reabrir por agradecimento

Nenhum aviso bloqueia o membro: sem saldo, fora do escopo, com erro ou ao atingir o tempo limite, a mensagem é enviada, a conversa é resolvida, o agendamento abre vazio ou a conversa reabre normalmente.

- **Revisor de mensagens:**
  - Roda ao enviar resposta com texto de **12 caracteres ou mais** (revisa até os primeiros **2.000 caracteres**, lendo as últimas 20 mensagens da sessão como contexto; não revisa notas internas nem mídias).
  - 5 categorias (**Tom inadequado**, **Promessas comerciais** e **Perguntas não respondidas** começam ligadas; **Informações sensíveis** e **Padrão de comunicação da empresa** começam desligadas), com até **12 itens** de até **100 caracteres** por categoria (`"Limite de 12 itens atingido. Remova um item para adicionar outro."`, `"Sem itens, esta categoria não é verificada."`).
  - Até **5 regras personalizadas**: **Nome da regra** (até 40 caracteres), **O que o revisor deve verificar** (até 300 caracteres) e até **12 Exemplos** (opcional, até 200 caracteres cada). Validações: `"Dê um nome para a regra"`, `"Já existe uma regra com esse nome"`, `"Descreva o que o revisor deve verificar"`.
  - Com aviso, abre **Revise antes de enviar** (**Editar mensagem** / **Enviar mesmo assim**) com as mensagens de categoria (`"Pode soar ríspida ou impaciente."`, `"Faz uma promessa comercial ao cliente."`, `"Não responde a uma pergunta que o cliente fez."`, `"Pode expor uma informação sensível."`, `"Pode fugir do padrão de comunicação da empresa."`) ou a descrição da regra personalizada.
  - Tempo máximo de espera: **3,5 segundos**. Passando disso ou em caso de falha, envia sem aviso.
  - Itens iniciais de **O que será verificado** por categoria:

    | Categoria | Começa | Itens iniciais |
    | --- | --- | --- |
    | **Tom inadequado** | Ligada | Resposta seca ou monossilábica; Ironia ou sarcasmo; Culpar o cliente; Impaciência com o cliente |
    | **Promessas comerciais** | Ligada | Desconto; Prazo de entrega ou de solução; Reembolso ou devolução; Brinde; Condição especial de pagamento |
    | **Perguntas não respondidas** | Ligada | Sem lista editável |
    | **Informações sensíveis** | Desligada | Senha ou código de acesso; Token ou chave de API; Número completo de cartão; Dados pessoais de outro cliente |
    | **Padrão de comunicação da empresa** | Desligada | Abreviações como "vc", "pq" ou "tb"; Gírias ou linguagem informal demais; Excesso de emojis; Mensagem toda em letras maiúsculas |

- **Aviso ao resolver:**
  - Roda apenas ao clicar em **Resolver** na conversa aberta (ações em lote na lista e reabertura não passam pela verificação). Lê as últimas 20 mensagens da sessão.
  - Com pendência de certeza alta, abre **Ficou algo em aberto?** com um dos motivos (`"O cliente fez uma pergunta que ainda não foi respondida."`, `"Foi prometido um retorno ao cliente que ainda não aconteceu."`, `"O cliente parece estar aguardando alguma ação do atendimento."`), `"Quer resolver a conversa mesmo assim?"` e os botões **Voltar para a conversa** e **Resolver mesmo assim**.
  - Tempo máximo de espera: **3,5 segundos**.
- **Sugestão de retorno:**
  - Lê **20 segundos** depois de mensagens do contato e do membro; não roda com bot ou agente de IA atendendo nem quando já existe mensagem agendada pendente; sugere no máximo **1 vez por sessão** (mesmo se dispensada).
  - Faixa **Ficou um retorno combinado** (**Agendar** / **Dispensar**) aparece apenas para quem tem a permissão **Agendar mensagem**, com conversa aberta e sem agendamento pendente. **Dispensar** ou concluir o agendamento remove a faixa para todos.
  - Ao clicar em **Agendar**, exibe `"O copiloto está preparando a sugestão..."` e preenche **Data** (no fuso do workspace, sempre futura; **09:00** quando não há horário combinado; primeiro dia útil quando não há dia exato) e texto apenas se o membro ainda não tiver editado os campos. Se falhar ou passar de **20 segundos**, mostra `"Não foi possível gerar a sugestão. Preencha o agendamento manualmente."`.
  - No **WhatsApp oficial**, quando a data fica fora da janela de 24 horas, sugere um template aprovado e preenche as variáveis (ficam de fora templates com arquivo no cabeçalho, carrossel, botão com variável ou Flow). Sem template compatível, mostra `"Nenhum modelo aprovado combina com este retorno. Fora da janela de 24h do WhatsApp, escolha um modelo para enviar."`.
- **Não reabrir por agradecimento:**
  - Condições conjuntas: função ligada, mensagem do contato recebida em até **24 horas** após resolver a última sessão, mensagem **apenas de texto** com até **2.000 caracteres** (áudio, imagem, arquivo, figurinha ou texto maior reabrem normalmente), conversa dentro do escopo, saldo acima de R$ 0,20, e conteúdo classificado com certeza muito alta como apenas agradecimento, confirmação, despedida ou reação (qualquer pergunta, pedido, problema ou assunto novo reabre). Lê as últimas **10 mensagens** da sessão resolvida como contexto.
  - Quando mantida resolvida: não reabre nem cria sessão, não marca como não lida nem pendente, registra a mensagem de sistema `"Mensagem de encerramento: a conversa continua resolvida (Copiloto)"` e contabiliza em **Reaberturas evitadas**.
  - Tempo máximo de espera: **1,5 segundo**; em caso de demora ou falha, a conversa reabre normalmente.

## Saldo mínimo por função

Nas telas do copiloto, "créditos" significa o [saldo da carteira](/docs/conceitos/saldo-e-creditos) em reais.

| Saldo na carteira | Comportamento |
| --- | --- |
| **R$ 0,10 ou menos** | O menu do copiloto exibe **Seus créditos acabaram** com os comandos desativados, botão **Comprar créditos** (para quem não acessa o financeiro: `"Fale com um administrador para colocar créditos no ambiente."`) e dica `"Copiloto (Pouco ou nenhum crédito restante)"`. Sugestões de resposta e frases rápidas sugeridas não são geradas. |
| **Entre R$ 0,11 e R$ 0,20** | O menu abre normalmente, mas clicar em um comando mostra `"Saldo insuficiente."`. Sugestões de resposta, frases rápidas sugeridas, análises, avisos, **Não reabrir por agradecimento** e **Criar com Copiloto** não rodam (todos exigem saldo **acima de R$ 0,20**). As linhas do cartão **Sessão** que ainda não têm leitura mostram **Sem saldo**; resultados já registrados continuam aparecendo. |
| **R$ 0,90 ou menos** | A transcrição automática de áudios das sugestões não roda (exige saldo **acima de R$ 0,90**). Com **Transcrever áudios** ligado e um áudio entre as mensagens recentes, as sugestões daquela conversa também param de aparecer, sem aviso. |

Uma recarga ou o fim do saldo pode levar até **30 segundos** para refletir nas análises. O botão **Comprar créditos** leva ao **Extrato do saldo** — para fazer a recarga, acesse **Configurações** → **Assinatura** → **Adicionar saldo** (veja [Adicionar saldo e créditos de SMS](/docs/assinatura/adicionar-saldo)).

## Restrições de papel

- **Não mostrar sugestões de respostas** (seção **Copiloto** do papel; texto da tela: `"Não aparecer sugestões de respostas no chat e nem o botão para sugerir respostas."`) vale para o bloco e o botão **Sugestões**; o menu de comandos depende da função **Comandos de chat**. Vale também para o proprietário quando o papel dele tem essa restrição.
- **Esconder sentimento do cliente** e **Esconder lead score** (quadro **Restrições** da seção **Conversas** do papel). Veja [Criar papéis e permissões](/docs/configuracoes-no-workspace/configurar-permissoes-dos-usuarios).

## Relatório

- **Relatórios** → **Copiloto**: exige a permissão **Gerenciar relatórios** e ao menos uma aba disponível (sem nenhuma função ligada, mostra `"Ligue um recurso do copiloto em Configurações → Copiloto para ver os relatórios."`). Abas disponíveis: **Qualidade** (quando um dos modelos **Nota do atendimento**, **Problema resolvido?** ou **Pontos a melhorar** está ligado salvando em campo), **Sentimento**, **Intenções**, **Lead score** e **Atendimento automático** (com **Cliente preso no bot** ou **Não reabrir por agradecimento**). Desligar a função oculta a aba correspondente.

## Problemas comuns

| Sintoma | Causas mais comuns |
| --- | --- |
| Botão do copiloto não aparece no editor | Função **Comandos de chat** não adicionada/salva, conversa fora de **Onde o copiloto atua**, ou a mudança foi salva há menos de 60 segundos. |
| Menu mostra **Seus créditos acabaram** | Saldo da carteira em R$ 0,10 ou menos. |
| Comando mostra `"Saldo insuficiente."` | Saldo da carteira em R$ 0,20 ou menos. |
| Comando mostra `"Escreva um texto para usar essa ação do assistente."` | Editor vazio ao acionar um comando de **Mudar texto**, **Mudar tom para** ou **Personalizado**. |
| Bloco **Sugestões** não aparece | Última mensagem é de membro, conversa resolvida, bot atendendo, conversa fora de **Onde o copiloto atua**, restrição **Não mostrar sugestões de respostas** no papel ou, com **Sugestões automáticas** ligada, saldo em R$ 0,20 ou menos. |
| Botão **Sugestões** aparece, mas o clique não gera nada | Saldo da carteira em R$ 0,20 ou menos. |
| Sugestões pararam de aparecer numa conversa com áudio | Saldo da carteira entre R$ 0,11 e R$ 0,90 com **Transcrever áudios** ligado: o áudio recente não é transcrito e as sugestões daquela conversa param, sem aviso. Adicione saldo ou desligue **Transcrever áudios**. |
| Sugestão ignora a base de conhecimento | Base em status diferente de **Pronto** (ver [Base de conhecimento do bot e do copiloto](/docs/copiloto/base-de-conhecimento)), interruptor desligado ou regra de **Personalizar por grupo** apontando para outra base. |
| Cartão **Sessão** fica em **Aguardando** | Nenhuma mensagem de texto do contato ainda, ou conversa fora de **Onde o copiloto atua**. |
| Cartão **Sessão** mostra **Sem saldo** | Saldo da carteira em R$ 0,20 ou menos; aparece nas linhas que ainda não têm leitura. |
| Intenção continua em **Analisando** ou não muda | Ainda sem certeza (ou parou após 5 leituras sem certeza). Depois de definida com certeza, a intenção trava até o fim da sessão. |
| Lead score mostra **Já é cliente** ou **Avaliando** | Contato já tem negociação ganha em algum funil (**Já é cliente**) ou ainda não há confiança suficiente (**Avaliando**). |
| 🆘 sumiu da conversa | Um membro respondeu a conversa (o alerta some da lista e do cartão, mas continua no relatório). |
| Avaliador não preencheu o campo ou tag | Avaliador desligado, campo excluído (`"Campo removido"`), falta de certeza suficiente (em seleção/sim-não), contato com negociação ganha com **Pular contatos com negociação ganha** ligado, ou campo de contato em conversa sem contato. |
| **Revisor de mensagens** não avisou | Mensagem com menos de 12 caracteres, nota interna, mídia, categoria/regra desativada ou sem itens, saldo de R$ 0,20 ou menos, ou tempo limite de 3,5 s excedido. |
| **Aviso ao resolver** não apareceu | Conversa resolvida por ação em lote na lista (em vez do botão **Resolver** na conversa aberta), sem pendência de certeza alta, saldo baixo ou tempo limite de 3,5 s excedido. |
| Conversa reabriu mesmo com "obrigado" | Passaram mais de 24 h desde que foi resolvida, mensagem contém áudio/imagem/arquivo/figurinha ou mais de 2.000 caracteres, há pergunta/pedido junto ao agradecimento, saldo baixo ou tempo limite de 1,5 s excedido. |

## O que não existe

- Configuração de funções do copiloto por membro individual (exceto **Personalizar por grupo** nas sugestões e as restrições de papel).
- Permissão por comando individual do menu (as antigas permissões do Assistente Kin por comando não existem mais).
- Campo **Máximo de tokens** em **Sugestões automáticas** (removido).
- Limite fixo de quantidade para comandos personalizados.
