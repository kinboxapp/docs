---
title: Permissões e restrições de conversa e as mensagens de erro de cada uma
description: Referência das permissões, restrições e regras da Caixa de entrada da Kinbox, com o efeito de cada uma na tela, as mensagens de erro e a matriz de diagnóstico de "não consigo responder ou ver".
keywords: [permissões de conversa, restrições, acesso às conversas, global, por grupo, restrito, limitado, esconder mensagens, responder apenas conversas dele, palavras proibidas, mensagem de erro, proprietário do workspace, dono, protocolo, sessão]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/roles/permissionSections.tsx
  - web:src/lib/inboxUtils.ts
  - web:src/pages/inbox/ChatTextEditorPure.tsx
  - web:src/pages/inbox/Chat/index.tsx
  - web:src/pages/inbox/ChatHeader/index.tsx
  - api-v0:server/controllers/CallController.js
  - api-v0:server/modules/scheduler/scheduleCallMessagesScheduler.js
  - web:src/pages/settings/profile/Profile.tsx
  - api-v0:server/services/CustomerPlatformService.js
codigo:
  - web:src/pages/settings/roles/permissionSections.tsx
  - web:src/lib/inboxUtils.ts
  - web:src/pages/inbox/ChatTextEditorPure.tsx
  - web:src/pages/inbox/Chat/index.tsx
  - web:src/pages/inbox/ChatHeader/index.tsx
  - web:src/pages/inbox/MessageDrop.tsx
  - api-v0:server/controllers/CallController.js
  - api-v0:server/modules/scheduler/scheduleCallMessagesScheduler.js
  - api-v0:server/services/CustomerPlatformService.js
verificado_em: 2026-11-26
---

Referência complementar de [Caixa de entrada: visão geral](/docs/conversas/caixa-de-entrada-do-kinbox), [Atender uma conversa: responder, notas, resolver e reabrir](/docs/conversas/gerenciar-conversas), [Atribuir, mover para um grupo ou transferir uma conversa](/docs/conversas/atribuir-e-transferir), [Agendar uma mensagem](/docs/conversas/agendar-mensagem), [Não consigo responder ou ver uma conversa](/docs/conversas/problemas-comuns).

## Visões, contadores e pesquisa

- Visões padrão: **Abertos** (não resolvidas que o membro pode ver; no layout antigo, **Entrada**), **Meus**, **Compartilhados**, **Seguindo** e **Arquivados** (resolvidas).
- **Compartilhados** aparece quando outro membro liga **Compartilhamento de conversas** no próprio perfil (**Configurações** → **Perfil**) e escolhe você no campo **Compartilhamento**: você passa a ver e atender as conversas atribuídas a ele ("Compartilhe suas conversas com outros membros... Útil quando você tiver de ir almoçar"). Não existe compartilhar uma conversa só. A restrição **Não pode compartilhar conversa** tira essa opção do perfil.
- Contadores: só conversas abertas; dica "Conversas abertas: {{count}}"; acima de 999, "Conversas abertas: mais de 999"; quando não dá para contar na hora, "—" com "Esse filtro tem conversas demais para contar agora". **Arquivados** não tem contador.
- Pesquisa geral (**Pesquisar** no topo ou `Ctrl+K` / `⌘K`): contato por nome (mín. 3 letras), telefone (mín. 5 números), e-mail (mín. 3 letras) ou valor exato de campo personalizado; lista as conversas do contato como **Em aberto** ou **Finalizada**.

## Acesso as Conversas

Configurado em **Configurações** → **Ambiente** → **Permissões** (uma opção por papel). A regra abaixo é a que a Kinbox aplica ao montar a lista de conversas, olhando o membro responsável e o grupo da sessão atual. Exemplo: Ana está no grupo Vendas.

| Opção | O membro vê na lista | Exemplo |
| --- | --- | --- |
| **Global** | Todas as conversas | Ana vê tudo |
| **Por Grupo ou sem Grupo** | As conversas dos grupos dele, as sem grupo e as atribuídas a ele | Ana vê as de Vendas, as sem grupo e as dela em qualquer grupo (inclusive as de Suporte atribuídas a ela); não vê as outras de Suporte |
| **Por Grupo** | As conversas dos grupos dele e as atribuídas a ele, mesmo em outro grupo ou sem grupo | Ana vê as de Vendas e as atribuídas a ela (mesmo sem grupo ou em Suporte); não vê as outras sem grupo nem as outras de Suporte |
| **Por Grupo Limitado** | As atribuídas a ele (mesmo fora dos grupos dele) e as sem responsável dos grupos dele | Ana vê as dela e as de Vendas sem responsável; não vê as de Vendas atribuídas a Bruno |
| **Limitado** | As atribuídas a ele e as sem responsável, desde que sem grupo ou de um grupo dele | Ana vê as dela e as sem responsável de Vendas ou sem grupo; não vê nada de Suporte, nem as dela que estejam em Suporte |
| **Restrito** | Só as atribuídas a ele | Ana vê só as dela |

- Seguir uma conversa **não** a traz para a lista: as descrições da tela de **Limitado** e **Restrito** falam em "seguindo", mas o que vale é a tabela acima. A visão **Seguindo** mostra só as conversas seguidas que o membro já vê pelo acesso dele.
- Abrir uma conversa (por link, notificação ou pesquisa): o membro abre as conversas que o acesso do papel mostra na lista, as que ele segue, as compartilhadas com ele e as atribuídas a ele em qualquer grupo. O proprietário e quem tem **Global** abrem tudo. Fora disso, a conversa fecha com "Você não tem permissão para ver essa conversa".
- Proprietário do workspace: tem todas as permissões e não é afetado pelas restrições da seção, com duas exceções que valem também para ele quando o papel dele tem a opção: **Não mostrar sugestões de respostas** e **Não marca como lido ao abrir uma conversa** (veja a [Referência de permissões](/docs/administracao/referencia-de-permissoes)).
- Página de conceito sobre papéis: [Workspace, membros e papéis](/docs/conceitos/workspace-membros-e-papeis).

## Permissões da seção Conversas

| Permissão | Sem ela | Mensagem exata |
| --- | --- | --- |
| **Resolver** | O botão **Resolver** some do cabeçalho da conversa. | — |
| **Responder** | O membro não consegue enviar mensagem ao contato. | "Você não possui permissão para enviar essa mensagem." |
| **Enviar notas privadas** | O membro não consegue enviar nota no modo **Nota pro time**. | "Você não possui permissão para enviar notas." |
| **Deletar mensagens de outros membros** | O membro não consegue excluir mensagens de outros membros. | — |
| **Deletar própria mensagem** | O membro não consegue excluir as próprias mensagens. | — |
| **Iniciar chat ativo** | O botão **Enviar mensagem** (lápis) não aparece na lista. | — |
| **Reabrir** | O membro não consegue reabrir uma conversa resolvida. | "Você não tem permissão para reabrir conversas." |
| **Atribuir** | Os itens do seletor **Atribuir** ficam desativados. | "Você não tem permissão para atribuir conversas." |
| **Mover para grupo** | O membro não consegue mover a conversa para outro grupo. | "Você não tem permissão para mover conversas para grupos." |
| **Iniciar Bot** | O membro não consegue iniciar bot em **Executar bot**. | "Você não tem permissão para iniciar bots." |
| **Agendar mensagem** | O item **Agendar mensagem** fica desativado em **Mais ações**. | — |
| **Transferir conversa** | O item **Transferir para outro canal** fica desativado em **Mais ações**. | — |
| **Ficar invisível quando visualizar conversa** | Quando ativa, outros membros não veem que a pessoa está visualizando a conversa. | — |

## Restrições da seção Conversas

| Restrição | Com ela | Mensagem exata |
| --- | --- | --- |
| **Responder apenas conversas dele** | O membro só responde conversas atribuídas a ele. | "Você não possui permissão para enviar essa mensagem." |
| **Limitar horário que pode responder** | O membro só envia mensagens dentro do horário escolhido no papel. | "Você não pode enviar mensagens esse horário" |
| **Limitar canais que pode responder** | Bloqueia envio em canais fora da lista selecionada. | "Você não pode enviar mensagens para esse canal" |
| **Impedir envio de palavras proibidas** | Bloqueia envio quando o texto contém alguma palavra da lista. | "Você não pode enviar palavras proibidas: {{word}}" |
| **Somente pode iniciar chat ativo com conversa não atribuída a outro membro.** | Bloqueia chat ativo se o número já tem conversa aberta no canal com outro membro. | "{número} - Em atendimento" / "Você não tem permissão para realizar chat ativo para conversas em atendimento" |
| **Somente pode iniciar chat ativo com conversa não atribuída.** | Bloqueia chat ativo se o número já tem conversa aberta no canal com qualquer membro (inclusive o próprio). | "{número} - Em atendimento" |
| **Somente pode iniciar chat ativo com contato sem conversa atribuída.** | Bloqueia chat ativo se o contato já tem conversa aberta com outro membro em qualquer canal. | "{número} - Em atendimento com {nome}" |
| **Somente pode atribuir para quem pertence ao grupo do membro** | A lista de **Atribuir** mostra só membros que dividem algum grupo com quem atribui. | — |
| **Somente pode mover para grupo que pertence** | A lista de **Mover para grupo** mostra só grupos de que o membro faz parte. | — |
| **Não pode ver quem está visualizando a conversa** | Oculta o indicador de quem está visualizando a conversa. | — |
| **Esconder mensagens se não atribuído.** | Esconde o histórico se a conversa não for do membro (sem botão de aceitar) e impede resolver. | "Necessário ser atribuído à conversa para visualizar as mensagens" / "Você só pode resolver essa conversa se for o atendente responsável." |
| **Esconder mensagens se não atribuído, com botão de aceitar.** | Esconde o histórico e exibe sempre o botão **Aceitar conversa**. Se a conversa já tem responsável, o clique mostra "Já existe um membro atendendo esse contato."; sem responsável, atribui a conversa ao membro. | "Necessário ser atribuído à conversa para visualizar as mensagens" / "Já existe um membro atendendo esse contato." |
| **Esconder tags se não for atribuido** | Oculta as tags da conversa até o membro ser atribuído. | — |
| **Não pode remover tags** | Permite adicionar tags na conversa, mas não remover. | — |
| **Não pode executar ações em lote** | Desativa **Executar ação...** no menu **Mais opções** da lista. | — |
| **Não pode compartilhar conversa** | Tira a opção **Compartilhamento de conversas** do perfil do membro. | — |
| **Não pode bloquear conversa** | Desativa **Bloquear** em **Mais ações**. | — |
| **Não pode sincronizar histórico** | Impede usar **Sincronizar histórico** (disponível apenas no WhatsApp por QR Code na conexão Clássica). | — |
| **Não pode exportar para CSV** | Desativa **Exportar para CSV** na conversa e impede **Exportar conversas** em lote. | "Seu perfil não pode exportar conversas." |
| **Não pode transcrever áudio** | O membro não transcreve áudios. | — |
| **Esconder notas do contato**, **Esconder informações do contato**, **Esconder informações da sessão**, **Esconder linha do tempo**, **Esconder informações de integração** | Ocultam as respectivas seções do painel lateral da conversa. | — |
| **Esconder sentimento do cliente**, **Esconder lead score** | Escondem do membro o sentimento e o lead score lidos pelo copiloto (veja [Analisar conversas com IA](/docs/copiloto/analises-de-ia)). | — |

## Regras de atribuição, grupo, bot e transferência

- Atribuir uma conversa a um membro que não faz parte do grupo atual da conversa remove a conversa do grupo.
- Mover uma conversa para um grupo do qual o membro atribuído não faz parte remove a atribuição da conversa.
- Tanto atribuir quanto mover para grupo desligam o bot ativo na conversa e registram uma mensagem de sistema (ex.: "Conversa movida por {membro} para o grupo {nome}").
- Falha ao atribuir: "Não foi possível atribuir a conversa. Tente novamente.".
- **Transferir para outro canal** lista apenas canais de **WhatsApp** (exceto o atual).
  - Opções: **Resolver essa conversa ao transferir** (marcada por padrão) e **Redirecionar para a nova conversa** (desmarcada por padrão); a escolha fica salva no navegador.
  - Sucesso: "Transferido com sucesso.".
  - Erros: "Você está tentando transferir essa conversa para o canal que ela já pertence, escolha outro canal"; "Novo canal não encontrado ou desativado".
  - Histórico: aparece em um bloco ligado à mensagem de sistema "Conversa transferida do canal {canal} por {membro}" na nova conversa (não é copiado como mensagens individuais).
  - WhatsApp oficial como destino: a conversa nova começa sem data de última mensagem do contato, então a janela de 24 h inicia fechada e exige envio de template até o contato responder.

## Sessão, protocolo e tempo de tolerância

- Cada atendimento (sessão) recebe um número de protocolo igual ao ID da sessão, exibido no separador "Nova sessão #N", na coluna **Protocolo** da exportação em lote e na chave **Protocolo** (`{{protocol}}`). Não há formato de protocolo configurável.
- **Tempo de tolerância ao resolver conversa** (**Configurações** → **Ambiente** → **Geral**, em minutos): se o contato enviar nova mensagem antes do prazo definido, a Kinbox reabre a sessão anterior em vez de criar uma nova sessão.
- Visão **Arquivados**: a dica (tooltip) na barra lateral mostra o texto incorreto "Seguindo - Conversas que foram resolvidas.", mas a visão exibe todas as conversas resolvidas que o membro pode ver (não apenas as seguidas).

## Responder citando, excluir mensagem, transcrever áudio e bloquear contato

- **Responder** (citar uma mensagem): só no WhatsApp e no Instagram, em mensagens que passaram pelo canal (têm ID do canal). Em canais de Instagram ligados por uma conexão antiga, feita por integração de terceiro, o item não aparece.
- Anexos: cada arquivo vai como uma mensagem; até 100 MB por arquivo e 20 por vez; áudio gravado até 25 MB.
- Botão **Áudio** do editor (gravar): só no WhatsApp, Instagram, Facebook, Widget e Telegram; não aparece no SMS, no e-mail nem no canal customizado.

- **Excluir mensagem**:
  - WhatsApp por QR Code: o item **Excluir** aparece no menu da mensagem para mensagens enviadas por membro ou bot; exige permissão (**Deletar própria mensagem** ou **Deletar mensagens de outros membros**) e que a mensagem tenha chegado ao canal (possua ID externo).
  - WhatsApp oficial: não permite excluir mensagens.
  - Confirmação: "Tem certeza que deseja excluir essa mensagem? Essa operação não poderá ser desfeita.".
- **Transcrever áudio**:
  - Usa o saldo da carteira do workspace; limite de 1 MB ("O tamanho do arquivo de áudio excede o limite de 1 MB").
  - Sem saldo suficiente, a transcrição não é feita (hoje a tela não mostra aviso).
  - Restrição: com **Não pode transcrever áudio**, o membro não transcreve áudios.
- **Bloquear contato**:
  - **Mais ações** → **Bloquear** / **Desbloquear**.
  - Confirmação ao bloquear: "Tem certeza que deseja bloquear essa conversa? Seu ambiente não receberá novas mensagens dessa conversa." → aviso "Você bloqueou essa conversa.".
  - Confirmação ao desbloquear: "Tem certeza que deseja desbloquear essa conversa? Seu ambiente voltará a receber novas mensagens dessa conversa." → aviso "Você desbloqueou essa conversa.".
  - Efeito: vale por canal — novas mensagens recebidas desse contato naquele canal são descartadas pela Kinbox. Não afirmar que bloqueia o contato no WhatsApp do celular.

## Agendamento de mensagens

- Aviso ao criar: "Agendamento realizado.".
- Conteúdo: texto com frases rápidas, emojis, anexos e chaves `{}`. A janela não tem botão de gravar áudio: para agendar um áudio, escolha uma frase rápida de voz (a janela troca o texto pelo áudio da frase).
- Frequência de conferência: a cada 3 minutos (a mensagem pode sair alguns minutos após o horário agendado).
- Estado do agendamento: a Kinbox marca o agendamento como enviado quando dispara o envio, antes de o canal aceitar a mensagem. Se o canal recusar (ex.: canal desconectado), a mensagem fica com erro na conversa e o agendamento não tenta de novo. Por isso, oriente a conferir a mensagem na conversa (sem erro) em vez de confiar só no agendamento. Uma falha antes do disparo (ex.: dados do contato) é tentada de novo no ciclo seguinte, até 2 vezes.
- Envio: segue o mesmo fluxo do chat ativo em nome de quem agendou; se a conversa estiver resolvida na hora do envio, cria uma nova sessão atribuída a quem agendou.
- Chaves reservadas (como `{{name}}`): trocadas no momento do envio, apenas na primeira ocorrência de cada chave; chaves sem valor somem do texto.
- **Repetir mensalmente**: quando dispara o envio, a Kinbox já cria o agendamento do mês seguinte, mesmo que o canal recuse a mensagem deste mês.
- WhatsApp oficial: se a data agendada cair fora da janela de 24 h (ou se a janela já estiver fechada), exige **Modelo de mensagem** (template).

## Matriz de diagnóstico: não consigo responder ou ver uma conversa

O proprietário do workspace não sofre restrições de papel, com duas exceções que valem também para ele quando o papel dele tem a opção: **Não mostrar sugestões de respostas** e **Não marca como lido ao abrir uma conversa** (veja a [Referência de permissões](/docs/administracao/referencia-de-permissoes)).

| Se o usuário vê | Causa | O que orientar |
| --- | --- | --- |
| Editor sumiu, faixa "Essa conversa foi encerrada." e botão **Reabrir conversa** | Conversa resolvida (fora do caso do WhatsApp oficial com janela fechada, abaixo) | Clicar em **Reabrir conversa** (exige permissão **Reabrir**; sem ela: "Você não tem permissão para reabrir conversas."). |
| "Você não possui permissão para enviar essa mensagem." | Sem permissão **Responder**, ou com **Responder apenas conversas dele** em conversa não atribuída ao membro | Pedir atribuição da conversa ou pedir ao administrador para ajustar o papel. |
| "Você não possui permissão para enviar notas." | Sem permissão **Enviar notas privadas** | Pedir a permissão ao administrador. |
| "Você não pode enviar mensagens para esse canal" | Restrição **Limitar canais que pode responder** sem incluir esse canal | Administrador incluir o canal no papel. |
| "Você não pode enviar mensagens esse horário" | Restrição **Limitar horário que pode responder** fora do horário configurado | Aguardar o horário permitido ou ajustar o papel. |
| "Você não pode enviar palavras proibidas: {{word}}" | Restrição **Impedir envio de palavras proibidas** | Reescrever a mensagem sem a palavra indicada. |
| "Necessário ser atribuído à conversa para visualizar as mensagens" (com ou sem **Aceitar conversa**) | Restrição **Esconder mensagens se não atribuído.** ou **...com botão de aceitar.** | Clicar em **Aceitar conversa** (se ninguém atende; se já houver atendente aparece "Já existe um membro atendendo esse contato.") ou pedir atribuição. |
| "Você não tem acesso ao canal desta conversa" | Canal com **Restringir visibilidade** e membro fora dos grupos permitidos | Administrador adicionar o membro a um dos grupos do canal. |
| Conversa abre e fecha com "Você não tem permissão para ver essa conversa" | **Acesso as Conversas** do papel não inclui a conversa | Pedir a atribuição da conversa ou ajuste do **Acesso as Conversas** no papel. |
| Conversa não aparece na lista | Está em outra visão (ex.: **Arquivados**), fora do filtro atual ou fora do **Acesso as Conversas** (seguir não traz a conversa para a lista) | Buscar na pesquisa geral (`Ctrl+K` / `⌘K`) ou conferir **Arquivados**; se for o acesso, pedir a atribuição ou ajuste do papel. |
| WhatsApp oficial, conversa **aberta**: faixa "A janela de tempo para respostas foi encerrada." e, no lugar do editor, **Enviar template** e **Enviar nota de time** | Passaram 24 h desde a última mensagem do contato, ou ele nunca escreveu | Enviar um template aprovado pela Meta. O texto livre só volta quando o contato responder. |
| WhatsApp oficial, conversa **resolvida**: "Resolvida · janela de 24h encerrada", **Enviar template** como botão principal e **Reabrir conversa** / **Enviar nota de time** no menu ao lado | Mesma causa, com a conversa resolvida | Enviar um template. Reabrir a conversa não devolve o texto livre: só a resposta do contato. |
| Faixa **Telefone desconectado** no topo da lista (some com **Não pode ver notificações de canal**) | Canal de WhatsApp por QR Code desconectado | Quem tem permissão de gerenciar canais precisa reconectar o aparelho nas configurações do canal. |
| Mensagem marcada com erro ("Erro ao enviar mensagem" ou descrição; "Tentando reenviar... (Tentativa N/4)") | O canal recusou o envio | Passar o mouse ou usar **Copiar erro** no menu da mensagem; a Kinbox faz até 4 tentativas de envio (a tela mostra "Tentativa N/4"). |
| Ícone **Bloqueado** no cabeçalho e contato não envia novas mensagens | Conversa bloqueada naquele canal | **Mais ações** → **Desbloquear**. |
| "Conversas restritas pelo cliente" ("O cliente não permite que o parceiro veja as conversas deste ambiente. Relatórios e configurações continuam disponíveis.") | Cliente desativou **Permitir que o parceiro veja as conversas** em **Configurações** → **Ambiente** → **Geral** | Pedir ao cliente para ativar a opção. |
| Ao resolver: "Campo obrigatório {{name}} não foi setado." | Campo personalizado obrigatório para resolver está vazio | Preencher o campo destacado no painel lateral e resolver novamente. |
| Ao resolver: "Você só pode resolver essa conversa se for o atendente responsável." | Restrição **Esconder mensagens se não atribuído.** em conversa de outra pessoa | Pedir a atribuição da conversa. |
| Ao resolver: "Encerre a ligação antes de resolver a conversa" | Ligação de WhatsApp em andamento | Encerrar a ligação antes de resolver. |
| Botão **Resolver** ou **Enviar mensagem** ausente, ou itens de **Mais ações** desativados | Falta da permissão correspondente ou restrição ativa no papel | Pedir ao administrador para revisar o papel. |
