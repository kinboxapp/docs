---
title: "Permissões do papel: o efeito de cada opção, papéis prontos, licenças e mensagens"
description: Referência das opções de um papel de permissão da Kinbox com o efeito de cada uma na tela, os papéis que vêm prontos, as regras de licença e de propriedade, as mensagens de membros e a matriz de "membro não entra ou não vê".
keywords: [efeito das permissões, papel padrão, administrador, supervisor, atendente, licença de membro, número limite de operadores atingido, já existe um convite para esse operador, resetar senha de membro, tornar proprietário, sessão expirada, nenhum ambiente ativo, fora do horário de acesso, item não aparece em configurações]
publico: llm
tipo: referencia
fontes:
  - KIN-7799
  - kinboxapp/kinbox-web#873
  - web:src/pages/settings/roles/permissionSections.tsx
  - web:src/pages/settings/roles/EditRole.tsx
  - web:src/pages/settings/members/index.tsx
  - web:src/pages/settings/members/EditMember.tsx
  - api:src/modules/workspace-defaults/workspace-defaults.constants.ts
  - api-v0:server/controllers/OperatorController.js
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/controllers/RolesController.js
codigo:
  - web:src/pages/settings/roles/**
  - web:src/pages/settings/members/**
  - web:src/pages/settings/profile/**
  - web:src/pages/settings/index.tsx
  - web:src/layouts/BaseLayout.tsx
  - web:src/lib/helper.tsx
  - web:src/lib/ownerPreferences.ts
  - web:src/hooks/useToggleAvaliable.ts
  - web:src/hooks/useBusinessHoursAccessLock.ts
  - api:src/modules/workspace-defaults/**
  - api-v0:server/controllers/OperatorController.js
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/controllers/RolesController.js
  - api-v0:server/middlewares/MiddlewaresService.js
  - web:src/pages/reports/useReports.tsx
  - web:src/pages/reports/ReportOverview/IndividualSummaries.tsx
verificado_em: 2026-11-26
---

Referência complementar de [Gerenciar membros](/docs/configuracoes-no-workspace/gerenciar-membros), [Criar papéis e permissões](/docs/configuracoes-no-workspace/configurar-permissoes-dos-usuarios), [Licenças, desativar membros e transferir a propriedade](/docs/administracao/licencas-e-propriedade), [Referência de permissões](/docs/administracao/referencia-de-permissoes), [O convite não chegou ou o membro não consegue entrar](/docs/administracao/problemas-com-membros) e [Workspace, membros e papéis](/docs/conceitos/workspace-membros-e-papeis).

## Papéis prontos

Um workspace (na tela, **ambiente**) novo vem com papéis prontos definidos pela Kinbox — em geral **Administrador**, **Supervisor** e **Atendente** — que podem ser editados, clonados ou excluídos (quando não estão em uso).

| Papel | Descrição na tela | O que libera e o que não libera |
| --- | --- | --- |
| **Administrador** | "Acesso total, inclusive cobrança e configurações" | Libera tudo o que o Supervisor tem, mais **Assinatura**, **Permissões**, **Auditoria**, **Agentes de IA**, **Automações**, **Base de conhecimento** e **Metas**. |
| **Supervisor** | "Acompanha a equipe, relatórios e filas" | Libera **Global** nas conversas e ações de conversa (resolver, responder, notas, chat ativo, reabrir, atribuir, mover para grupo, bot, agendar); **Gerenciar relatórios**, **Campanhas**, **Filtros**, **Workspace**, **Gerenciar Canais**, **Membros**, **Grupos**, **Horários**, **Tags**, **Frases Rápidas**, **Atribuição automática**, **Bot**, **Copiloto**, **Campos**, **Gerenciar Contatos** (que também libera as organizações enquanto **Gerenciar Organizações** não for salva no papel), **Integrações**, **Salas**, **Agendamentos**, **Gerenciar negociações**, **Funis**, **Produtos**, **Cenários**, tarefas de outros e negociações/tarefas da conversa. **Não** libera **Assinatura**, **Permissões**, **Auditoria**, **Agentes de IA**, **Automações**, **Base de conhecimento** nem **Metas**. |
| **Atendente** | "Atende conversas e gerencia negociações" | Libera **Por Grupo ou sem Grupo** nas conversas e as mesmas ações de conversa do Supervisor, **Salas**, **Tags**, **Frases Rápidas**, **Filtros** e **Gerenciar negociações**. **Não** libera relatórios, contatos, canais nem configurações do workspace. |

## Regras do editor de papéis

- **Onde fica:** **Configurações** → **Ambiente** → **Permissões** (exige a permissão **Permissões** ou ser o proprietário). Na tela, o papel se chama **Permissão**: botão **Nova permissão**, painel **Criar permissão** / **Editar permissão**, busca `"Pesquisar por nome"`.
- **Campos:** **Nome** (obrigatório; vazio exibe `"Por favor digite um nome."`), **Descrição** (`"(Opcional) Para ajudar a identificar o que essa permissão faz."`), bloco **Permissões** com um ícone ao lado do título (dica **Expandir tudo** / **Recolher tudo**) e seções na ordem da tela: **Home**, **Acesso as Conversas**, **Conversas**, **Negociações**, **Tarefas**, **Contatos**, **Relatórios**, **Canais**, **Gerenciamento do Ambiente**, **Agendas**, **Copiloto**, **Outros** e **Parceria** (só em workspace de parceiro). No layout antigo (tela de celular e marcas brancas), a seção **Gerenciamento do Ambiente** se chama **Gerenciar Ambiente**.
- **Home:** só aparece para o proprietário ou quem tem **Gerenciar relatórios**. Opções: **Caixa de entrada** (padrão; `"Abre a caixa de entrada como primeira tela."`) ou **Dashboard** (`"Abre um dashboard como primeira tela."`; trancado com `"Ative a permissão \"Gerenciar relatórios\" para liberar esta opção."` enquanto **Gerenciar relatórios** está desmarcada), com **Dashboard inicial** (`"Ao escolher dashboard, a snapshot mais recente será aberta automaticamente."`). A página inicial definida no papel é ignorada para o proprietário.
- **Papel novo já vem marcado com:** **Global**, **Responder**, **Iniciar chat ativo**, **Resolver**, **Enviar notas privadas**, **Reabrir**, **Categorizar**, **Atribuir**, **Mover para grupo**, **Iniciar Bot**, **Agendar mensagem**, **Alterar propriedades do contato** e **Mesclar contatos**.
- **Restrições:** ficam com marca vermelha quando ligadas. Dentro de **Conversas** e de **Outros**, um quadro chamado **Restrições** agrupa restrições adicionais. O proprietário passa em todas as permissões e não sofre restrições de papel — inclusive **Não mostrar sugestões de respostas** (seção **Copiloto**) e **Não marca como lido ao abrir uma conversa** não valem mais pelo papel para ele. Para não marcar conversas como lidas ao abrir no navegador, o proprietário usa a opção pessoal **Não marca como lido ao abrir uma conversa** em **Configurações** → **Perfil** ([Editar seu perfil](/docs/configuracoes-no-workspace/configurar-o-perfil-do-usuario)).
- **Opções mutuamente exclusivas:** as 6 opções de **Acesso as Conversas** (sempre fica uma marcada); **Restringir relatórios aos grupos do membro** × **Restringir relatórios ao membro** (ambas podem ficar desmarcadas); **Pode inspecionar clientes (Básico)** × **Pode inspecionar clientes (Avançado)**.
- **Opções que abrem campo extra:** **Limitar horário que pode responder**, **Limitar horário de acesso ao ambiente** e **Limitar horário que pode ficar disponível** (escolhem um horário de **Horários**); **Limitar canais que pode responder** (canais); **Impedir envio de palavras proibidas** (lista de palavras); **Limitar ambientes que pode visualizar** (ambientes).
- **Permissão exclusiva do proprietário para marcar:** só o proprietário pode marcar **Pode resetar senha de membros**.
- **Avisos do editor:**
  - Fechar sem salvar: `"Fechar sem salvar?"` / `"Você vai perder as alterações se não salvar primeiro."` / **Prosseguir**.
  - Ao criar ou salvar: `"Permissão criado."` / `"Permissão salvo."`.
  - Kinbox Agenda: se ao salvar aparecer `"A permissão foi salva, mas não foi possível sincronizar o Kinbox Agenda para todos os membros."`, salve o papel de novo.
- **Editar um papel encerra a sessão de quem o usa:** na próxima vez que o membro abrir ou atualizar a Kinbox, a sessão termina e ele entra novamente já com as permissões novas. O proprietário não é afetado.
- **Clonar:** abre **Criar permissão** com `"Cópia de {nome}"` e as mesmas opções.
- **Excluir:** confirmação `"Tem certeza que deseja excluir essa permissão?"`. Papel em uso não pode ser excluído: `"Não é possível excluir uma permissão que está sendo usada por um membro."` (troque antes o papel dos membros).

## Acesso as Conversas

Uma opção por papel (padrão em papel novo: **Global**; padrão do **Atendente**: **Por Grupo ou sem Grupo**). Exemplo: Ana está no grupo Vendas.

| Opção | Texto da tela | O membro vê na lista | Exemplo |
| --- | --- | --- | --- |
| **Global** | "Pode ver todas as conversas." | Todas as conversas | Ana vê tudo |
| **Por Grupo ou sem Grupo** | "Pode ver as conversas de seus grupos ou sem grupo ou atribuídas a ele." | As conversas dos grupos dele, as sem grupo e as atribuídas a ele | Ana vê as de Vendas, as sem grupo e as dela em qualquer grupo; não vê as outras de Suporte |
| **Por Grupo** | "Pode ver apenas as conversas de seus grupos ou atribuídas a ele." | As conversas dos grupos dele e as atribuídas a ele, mesmo em outro grupo ou sem grupo | Ana vê as de Vendas e as atribuídas a ela; não vê as outras sem grupo nem as outras de Suporte |
| **Por Grupo Limitado** | "Pode ver apenas as conversas de seus grupos atribuídas a ele ou sem atribuição." | As atribuídas a ele (mesmo fora dos grupos dele) e as sem responsável dos grupos dele | Ana vê as dela e as de Vendas sem responsável; não vê as de Vendas atribuídas a Bruno |
| **Limitado** | "Ver apenas as conversas atribuídas a ele ou seguindo ou sem atribuição." | As atribuídas a ele e as sem responsável, desde que sem grupo ou de um grupo dele | Ana vê as dela e as sem responsável de Vendas ou sem grupo; não vê nada de Suporte, nem as dela que estejam em Suporte |
| **Restrito** | "Pode ver apenas as conversas atribuídas a ele ou seguindo." | Só as atribuídas a ele | Ana vê só as dela |

- Seguir uma conversa não a traz para a lista (mesmo que as descrições de **Limitado** e **Restrito** falem em "seguindo").
- Abrir uma conversa por link, notificação ou pesquisa também vale para as conversas que o membro segue e as compartilhadas com ele; o proprietário e quem tem **Global** abrem todas. Fora disso, aparece `"Você não tem permissão para ver essa conversa"`.
- Para as demais regras, permissões, restrições e mensagens da seção **Conversas**, veja [Caixa de entrada: visão geral](/docs/conversas/caixa-de-entrada-do-kinbox) e a referência de permissões e restrições de conversa que acompanha essa página.

## Efeito de cada opção

### Negociações

| Opção | Efeito na tela | Mensagem |
| --- | --- | --- |
| **Gerenciar negociações** | Mostra **Funis** no menu lateral; permite adicionar, importar, editar e excluir negociações. | — |
| **Não pode ver negociações atribuídas a outros.** | Oculta do funil negociações atribuídas a outro membro. | — |
| **Não pode ver negociações sem atribuição** | Oculta do funil negociações sem atribuição. | — |
| **Não pode ver negociações de grupos que não pertence** | Oculta do funil negociações em grupos dos quais o membro não participa. | — |
| **Não pode ver negociações sem grupo** | Oculta do funil negociações sem grupo. | — |
| **Não pode excluir negociação** | Tira a opção de exclusão na negociação. | — |
| **Não pode exportar negociações** | Desativa a exportação no funil. | — |
| **Não pode voltar para etapa anterior** | Impede mover a negociação para etapa anterior do funil. | — |
| **Não pode criar negócio se já contato tiver um negócio aberto** | Bloqueia criar negócio se já houver negócio aberto para o mesmo contato. | — |
| **Não pode criar negócio se já contato tiver negócio aberto para outro agente** | Permite criar vários negócios para o mesmo contato quando os abertos estão atribuídos ao membro; bloqueia se houver negócio aberto atribuído a outro membro. | — |
| **Pode gerenciar as negociações da conversa.** | Mostra o painel de negociações nos detalhes da conversa. | — |

### Tarefas

O menu lateral **Tarefas** aparece para todos os membros.

| Opção | Efeito na tela | Mensagem |
| --- | --- | --- |
| **Pode gerenciar as tarefas da conversa.** | Mostra o painel de tarefas nos detalhes da conversa. | — |
| **Pode ver tarefas atribuídas a outros.** | Sem ela, a lista de **Tarefas** mostra apenas as tarefas do próprio membro. | — |
| **Transferir tarefas em massa** | Libera atribuir várias tarefas de uma vez pelo menu de ações em lote. | — |
| **Proibir excluir tarefas** | Impede excluir tarefas na lista e na edição. | — |

### Contatos

| Opção | Efeito na tela | Mensagem |
| --- | --- | --- |
| **Gerenciar Contatos** | Com ela ou com **Gerenciar Organizações**, mostra **Clientes** no menu lateral; permite adicionar, importar, editar e excluir contatos. | — |
| **Gerenciar Organizações** | Com ela ou com **Gerenciar Contatos**, mostra **Clientes** no menu lateral; permite gerenciar organizações e vincular contatos. Papéis antigos sem essa opção salva herdam o valor de **Gerenciar Contatos**. | — |
| **Não pode exportar contatos** | Desativa a exportação de contatos e organizações. | — |
| **Mesclar contatos** | "Pode mesclar dois contatos." | — |
| **Ver telefone de contatos privados** | Em contatos marcados como **Contato privado**, sem essa opção o telefone e o e-mail ficam ocultos. | — |
| **Alterar propriedades do contato** | Sem ela, os campos do contato no painel da conversa ficam somente leitura. | — |
| **Esconder telefone** | Oculta o telefone do contato nas telas de atendimento, contatos e negociações. | — |
| **Proibir alterar celular** | Desativa o campo de celular na edição e no painel do contato. | — |
| **Pode ligar para o contato** | Libera o botão de ligar para o contato. | — |

### Relatórios

O que cada relatório mostra com estas opções: [Como os relatórios contam sessões e tempos](/docs/relatorios/como-funcionam) e [Exportar relatórios e quem pode ver cada um](/docs/relatorios/exportar-e-permissoes).

| Opção | Efeito na tela | Mensagem |
| --- | --- | --- |
| **Gerenciar relatórios** | Mostra **Relatórios** no menu lateral e libera a opção **Dashboard** na seção **Home**. | — |
| **Não pode exportar relatórios** | Impede exportar a lista de sessões dos relatórios. | — |
| **Não pode criar ou excluir Dashboard** | "Membro fica impossibilitado de criar ou excluir dashboards." | — |
| **Restringir relatórios aos grupos do membro** | Em relatórios de sessões como **Visão geral** e **Produtividade**, mostra só as sessões dos grupos do membro; na **Atribuição**, as sessões que estão ou já estiveram nos grupos dele (exclui **Restringir relatórios ao membro**). Detalhes em [Como os relatórios contam sessões e tempos](/docs/relatorios/como-funcionam). | Sem grupo, o relatório não abre e aparece um aviso de que o membro não pertence a nenhum grupo. |
| **Restringir relatórios ao membro** | Em relatórios de sessões como **Visão geral** e **Produtividade**, mostra só as sessões em que o membro é o responsável atual; na **Avaliação**, só as avaliações registradas para ele; na **Presença**, só a presença dele (exclui **Restringir relatórios aos grupos do membro**). Detalhes em [Como os relatórios contam sessões e tempos](/docs/relatorios/como-funcionam). | — |

### Canais

| Opção | Efeito na tela | Mensagem |
| --- | --- | --- |
| **Gerenciar Canais** | Mostra **Configurações** → **Chat** → **Voip** e **Canais** e **Configurações** → **Automação** → **WhatsApp API**. | — |
| **Somente pode ver canais na lista se estiver no grupo do canal** | Restringe a lista de canais aos canais com restrição de visibilidade em que o membro pertence a um dos grupos permitidos. | — |
| **Não pode ver notificações de canal** | Oculta a faixa **Telefone desconectado** na lista de conversas. | — |
| **Somente pode dar manutenção simples em canais** | Oculta os botões de adicionar novo canal e de excluir canal; permite desconectar, reiniciar, sincronizar histórico e recriar o canal. | — |

### Gerenciamento do Ambiente

| Opção | Efeito na tela | Mensagem |
| --- | --- | --- |
| **Salas** | Libera criar, editar, clonar, ordenar e excluir salas de bate-papo. Veja [Conversar nas salas: mensagens diretas, menções e threads](/docs/salas/usar-salas). | — |
| **Assinatura** | Mostra **Configurações** → **Assinatura**. | — |
| **Campanhas** | Mostra **Campanhas** no menu lateral. | — |
| **Proibir criar campanha de WhatsApp** | Impede criar campanhas de WhatsApp. | `"Você não tem permissão para criar campanhas de WhatsApp."` |
| **Agendamentos** | No layout antigo (tela de celular e marcas brancas), libera as abas **Individual** e **Por API** de **Campanhas**; a página exige também **Campanhas**. No layout atual essas abas não aparecem: agendar uma mensagem é feito na conversa, com a permissão **Agendar mensagem** (seção **Conversas**). | — |
| **Filtros** | Libera adicionar, editar e excluir filtros públicos da **Caixa de entrada**. | — |
| **Workspace** | Mostra **Configurações** → **Ambiente** → **Geral**. | — |
| **Permissões** | Mostra **Configurações** → **Ambiente** → **Permissões**. | — |
| **Membros** | Mostra **Configurações** → **Ambiente** → **Membros**. | — |
| **Agentes de IA** | Mostra **Configurações** → **Automação** → **Agentes de IA**. | — |
| **Grupos** | Mostra **Configurações** → **Ambiente** → **Grupos**. | — |
| **Horários** | Mostra **Configurações** → **Ambiente** → **Horários**. | — |
| **Campos** | Mostra **Configurações** → **Ambiente** → **Campos personalizados**. | — |
| **Tags** | Mostra **Configurações** → **Ambiente** → **Tags**. | — |
| **Frases Rápidas** | Mostra **Configurações** → **Ambiente** → **Frases rápidas**. | — |
| **Atribuição automática** | Mostra **Configurações** → **Automação** → **Atribuição automática**. | — |
| **Automações** | Mostra **Configurações** → **Automação** → **Automações**. | — |
| **Bot** | Mostra **Configurações** → **Automação** → **Bot**. | — |
| **Copiloto** | Mostra **Configurações** → **Automação** → **Copiloto**. | — |
| **Cenários** | Mostra **Configurações** → **Automação** → **Cenários** ([Cenários: visão geral](/docs/cenarios/visao-geral)). | — |
| **Integrações** | Mostra **Configurações** → **Integrações** → **Apps** ([Apps e integrações: instalar e usar](/docs/integracoes/visao-geral)), **Plugins**, **API Tokens** e **MCP**, e **Configurações** → **Marketing** → **Tracking**. | — |
| **Auditoria** | Mostra **Configurações** → **Auditoria**. | — |
| **Funis** | Mostra **Configurações** → **CRM** → **Funis**. | — |
| **Produtos** | Mostra **Configurações** → **CRM** → **Produtos**. | — |
| **Metas** | Mostra **Metas** no menu lateral. | — |
| **Base de conhecimento** | Mostra **Configurações** → **Automação** → **Base de conhecimento**. | — |

### Agendas

| Opção | Efeito na tela | Mensagem |
| --- | --- | --- |
| **Gerenciar agendamentos** | Permite ver agendamentos do Kinbox Agenda no calendário e na lista de **Tarefas** e criar, reagendar e cancelar agendamentos; sem ela, a pessoa não vê agendamentos ([Kinbox Agenda: visão geral](/docs/agenda/kinbox-agenda#quem-pode-usar)). | — |
| **Gerenciar locais** | Permite cadastrar, editar, ativar e desativar locais do Kinbox Agenda e mostra **Configurações** → **Agenda** → **Local**. | — |
| **Gerenciar serviços** | Permite cadastrar, editar, ativar e desativar serviços do Kinbox Agenda e mostra **Configurações** → **Agenda** → **Serviços**. | — |

### Copiloto

| Opção | Efeito na tela | Mensagem |
| --- | --- | --- |
| **Não mostrar sugestões de respostas** | Oculta sugestões de respostas no chat e o botão para sugerir respostas. Vale apenas para membros que não são o proprietário (para o proprietário, o bloco aparece sempre que o copiloto está habilitado). Veja [Usar o copiloto na conversa](/docs/copiloto/usar-o-copiloto-de-ia). | — |

### Outros

| Opção | Efeito na tela | Mensagem |
| --- | --- | --- |
| **Pode Bloquear bots** | Mostra a opção de bloquear bot com senha na lista de bots. | — |
| **Não torna indisponível se ficar inativo** | Impede que a regra de inatividade do workspace deixe o membro indisponível. | — |
| **Não torna offline se ficar inativo** | Impede que a regra de inatividade do workspace deixe o membro offline. | — |
| **Pode resetar senha de membros** | Libera **Resetar senha** na lista de membros (só o proprietário pode marcar). | — |
| **Auditar mensagens diretas** | Libera leitura em modo somente leitura das mensagens diretas nas salas (mensagens diretas envolvendo o proprietário ficam de fora). Veja [Auditar as mensagens diretas dos membros](/docs/salas/auditar-mensagens-diretas). | — |
| **Limitar horário de acesso ao ambiente** *(Restrições)* | Fora do horário escolhido (pelo fuso horário do workspace), substitui o workspace pela tela de bloqueio **Fora do horário de acesso**, com os horários, `"Ou escolha outro ambiente para continuar."` e **Sair**. | `"Seu perfil só pode acessar o ambiente {nome do workspace} dentro do horário comercial."` |
| **Limitar horário que pode ficar disponível** *(Restrições)* | Impede ativar disponibilidade fora do horário escolhido. | `"Você não pode ficar disponível fora do horário de trabalho"` |
| **Não pode ficar indisponível** *(Restrições)* | Impede alterar disponibilidade para ausente. | `"Você não tem permissão para ficar indisponível"` |
| **Não pode mudar disponibilidade** *(Restrições)* | Impede alterar a disponibilidade. | — |
| **Não pode mudar informação de perfil** *(Restrições)* | Bloqueia editar informações em **Perfil** neste workspace. | `"O seu gestor desabilitou a edição de informações do seu perfil. Entre em contato com o gestor para mais informações."` |
| **Não pode acessar as salas** *(Restrições)* | Oculta o ícone **Salas** e bloqueia notificações das salas. Veja [Salas: o chat interno da equipe](/docs/salas/visao-geral). | — |
| **Só pode ver membros que sejam dos seus grupos nos DMs.** *(Restrições)* | Limita mensagens diretas nas salas aos membros que compartilham algum grupo. Veja [Conversar nas salas: mensagens diretas, menções e threads](/docs/salas/usar-salas). | — |
| **Somente pode ver frases rápidas na lista se estiver no grupo da frase rápida** *(Restrições)* | Mostra na lista apenas frases rápidas com restrição de visibilidade de grupos aos quais o membro pertence. | — |
| **Não marca como lido ao abrir uma conversa** *(Restrições)* | Evita marcar a conversa como lida automaticamente ao abri-la. Vale pelo papel apenas para membros que não são o proprietário. Para o proprietário, a opção fica em **Configurações** → **Perfil** (cartão **Preferências**, abaixo de **Idioma**, visível só para o proprietário; salva ao alternar, sem botão; herda o valor do papel antigo até o primeiro clique; se o salvamento falhar, o interruptor volta, aparece `"Não foi possível salvar as preferências."` e até recarregar a página a conversa pode usar o valor não salvo; vale apenas no navegador — no app do celular o proprietário continua marcando a conversa como lida). | — |
| **Não mostrar aviso de ambiente expirando.** *(Restrições)* | Oculta o banner de aviso no topo da tela quando o workspace está prestes a expirar. | — |
| **Não pode gerenciar widget.** *(Restrições)* | Esconde o cartão **Widget** em **Conectar novo canal**, os widgets da lista de **Canais** e a tela do widget (abrir a tela volta para **Canais**). Veja [Instalar o chat no seu site](/docs/canais/widget). | — |

### Parceria

Seção exibida apenas em workspaces de parceiro. **Pode inspecionar clientes (Básico)**, **Pode inspecionar clientes (Avançado)** e **Pode resetar senha de membros** (de clientes) aparecem apenas quando a parceria não é só de indicação; **Básico** e **Avançado** se excluem entre si. Detalhes do painel em [Painel do parceiro: visão geral](/docs/programa-de-parceiros/visao-geral) e [Inspecionar o workspace de um cliente](/docs/programa-de-parceiros/inspecionar-cliente).

| Opção | Efeito na tela | Mensagem |
| --- | --- | --- |
| **Pode acessar painel de parceria** | Mostra **Parceria** no menu lateral. | — |
| **Pode visualizar faturas** | Permite visualizar faturas no painel de parceria. | — |
| **Pode inspecionar clientes (Básico)** | "Pode acessar ambiente de inspeção de clientes, mas não pode ver informações de assinatura." | — |
| **Pode inspecionar clientes (Avançado)** | "Pode acessar ambiente de inspeção de clientes e pode ver e alterar informações de assinatura." | — |
| **Pode resetar senha de membros** | "Pode resetar senha de membros de clientes." | — |
| **Limitar ambientes que pode visualizar** | Restringe o painel de parceria aos ambientes selecionados. | — |

## Não vejo um item do menu ou de Configurações

| Item ausente | Opção necessária no papel |
| --- | --- |
| **Configurações** → **Ambiente** → **Geral** | **Workspace** |
| **Configurações** → **Ambiente** → **Membros** | **Membros** |
| **Configurações** → **Ambiente** → **Permissões** | **Permissões** |
| **Configurações** → **Ambiente** → **Grupos** | **Grupos** |
| **Configurações** → **Assinatura** | **Assinatura** |
| **Configurações** → **Auditoria** | **Auditoria** |
| **Configurações** → **Chat** → **Voip** e **Canais**; **Configurações** → **Automação** → **WhatsApp API** | **Gerenciar Canais** |
| **Configurações** → **Ambiente** → **Horários**, **Campos personalizados**, **Tags**, **Frases rápidas**; **Configurações** → **Automação** → **Atribuição automática**, **Base de conhecimento** | **Horários**, **Campos**, **Tags**, **Frases Rápidas**, **Atribuição automática**, **Base de conhecimento** |
| **Configurações** → **Automação** → **Agentes de IA**, **Automações**, **Bot**, **Copiloto**, **Cenários** | **Agentes de IA**, **Automações**, **Bot**, **Copiloto**, **Cenários** |
| **Configurações** → **Integrações** → **Apps**, **Plugins**, **API Tokens**, **MCP**; **Configurações** → **Marketing** → **Tracking** | **Integrações** |
| **Configurações** → **CRM** → **Funis** e **Produtos** | **Funis** e **Produtos** |
| **Configurações** → **Agenda** → **Local** e **Serviços** | **Gerenciar locais** e **Gerenciar serviços** |
| **Funis** no menu lateral | **Gerenciar negociações** |
| **Clientes** no menu lateral | **Gerenciar Contatos** ou **Gerenciar Organizações** |
| **Relatórios** no menu lateral | **Gerenciar relatórios** |
| **Campanhas** no menu lateral | **Campanhas** |
| Abas **Individual** e **Por API** em **Campanhas** (layout antigo) | **Campanhas** e **Agendamentos** juntas |
| **Metas** no menu lateral | **Metas** |
| **Parceria** no menu lateral | **Pode acessar painel de parceria** (em workspace de parceiro) |
| Ícone **Salas** | Remover a restrição **Não pode acessar as salas** (criar/excluir salas exige **Salas**) |
| **Widget** em **Conectar novo canal** | Remover a restrição **Não pode gerenciar widget.** |

## Membros: convite, edição, exclusão e senha

- **Tela Membros** (**Configurações** → **Ambiente** → **Membros**, exige **Membros** ou ser o proprietário):
  - Busca `"Pesquisar por nome ou e-mail"` também encontra pelo nome do papel (para o proprietário, o filtro de papel não considera papel).
  - Filtro **Tudo**: **Tudo**, **Ativo** (ativo e já aceitou), **Inativo**, **Convite enviado** (ativo e ainda não aceitou), **Online**, **Offline**.
  - Situações: **Online**; `"~há X"` (`"Tempo desde a última vez que membro esteve online."`); **Convidado** (`"Foi enviado e-mail convidando a pessoa para a platforma mas ela ainda não aceitou."`); **Inativo** (linha riscada e apagada). Escudo verde: `"Verificação em duas etapas ativa"`.
  - **Exportar** (menu **⋮** → **Exportar** → **CSV** ou **Excel**): arquivo `membros` com colunas ID, Nome, Email, Permissão (exibe **Proprietário** para o proprietário), Online, Último login, Última vez online, Data de criação, Data do convite, Ativo, Verificação em duas etapas, Grupos e campos personalizados de membro.
- **Convite:**
  - E-mail enviado pela Kinbox (endereço que não recebe respostas) com assunto `"Convite para se juntar ao workspace {nome do workspace}"`.
  - Aviso após convidar: **Convite enviado** — `"{nome} deve se cadastrar no link que foi enviado para o e-mail {e-mail} para entrar no sistema."`.
  - Pessoa sem conta: fica **Convidado** até concluir **Complete seu cadastro** (**Nome**, **E-mail de trabalho** bloqueado, **Senha**, `"Li e aceito os Termos e Condições"`, **Finalizar cadastro**; depois tela **Proteja sua conta** com **Ativar agora** / **Agora não**) e fica ativa e disponível.
  - Pessoa que já participa de outro workspace: entra direto (sem passar por **Convidado**); o e-mail apenas avisa e leva para o login; o workspace novo aparece em **Escolha um ambiente** ou no botão do ambiente no topo.
  - O link do convite não expira. **Reenviar convite** (`"Deseja reenviar o convite para esse membro?"` → **Sim** → `"Convite reenviado com sucesso!"`) reenvia o mesmo link. Não existe ação para cancelar convite: exclua o membro convidado.
  - Erros do convite: `"Por favor digite um nome."`, `"Por favor digite um e-mail."`, `"Por favor escolha uma permissão."`, `"Já existe um convite para esse operador"`, `"Desculpe, esse e-mail já está em uso, por favor tente utilizar outro"`, `"Número limite de operadores atingido"`, `"Assinatura expirada"` (vencida há mais de 3 dias).
- **Edição e clonagem:**
  - **E-mail** fica sempre bloqueado na edição; para corrigir e-mail errado, exclua o membro e convide de novo.
  - **Grupos** em **Editar membro** é somente leitura (`"Grupos que o membro pertence. Para editar vá nas configurações de grupo do seu ambiente."`; `"Nenhum grupo"` quando vazio).
  - Enquanto o convite não foi aceito, alterações em nome e foto não são aplicadas.
  - O membro não troca o próprio papel (**Permissão** fica bloqueado ao editar a si mesmo). Para o proprietário, **Permissão** também fica sempre bloqueado mostrando **Proprietário** fixo (com ícone de coroa), **Nome** fica bloqueado e **Disponível** / **Ativo** não aparecem. O menu do avatar também mostra **Proprietário** abaixo do nome.
  - **Ativo**: `"Somente membros ativos conseguem logar no sistema."` (desligado = **Inativo**, libera licença).
  - **Disponível**: o texto da tela fala em notificações (`"Somente membros disponíveis recebem notificações e estão elegíveis para receber novos atendimentos na atribuição automática."`): **Disponível** vale para as regras de rodízio entre membros e de "menos atendimentos" da atribuição automática, que só escolhem membros disponíveis (veja [Estratégias de atribuição automática](/docs/atendimento/estrategias-de-atribuicao)), e para os sons de nova mensagem e de nova conversa. **Atribuir para um membro** atribui mesmo a indisponível. O push (navegador e app) não depende de **Disponível**. A atribuição manual continua possível.
  - **Clonar**: abre **Convidar membro** com `"Cópia de {nome}"`, o mesmo e-mail e o mesmo papel (troque o e-mail para evitar `"Já existe um convite para esse operador"`).
- **Desconectar, desativar, reativar e excluir:**
  - **Desconectar** (desativada se offline ou proprietário): `"Tem certeza que deseja desconectar esse membro do ambiente? Ele poderá logar-se novamente."`. O membro vê `"Você foi deslogado por um gestor..."` e sai em 3 segundos.
  - **Desativar** (proprietário: `"Você não pode desativar o proprietário do ambiente."`): abre **Desativar membro** com `"Antes de excluir o membro {nome}, você deseja realizar alguma ação com as atribuições dele?"`, **Excluir agendamentos** (`"Os agendamentos de mensagens ainda não enviadas serão excluídos."`) e **Transferir atribuições** (`"As conversas e negociações abertas atribuídas a este membro serão transferidas para os membros selecionados de forma cíclica."`, dica `"Deixar em branco apenas retira a atribuição"`). Aviso: `"O membro {nome} foi desativado no ambiente!"`. Desligar **Ativo** em **Editar membro** não oferece essas opções.
  - Sessão do membro desativado: quando o membro abre ou atualiza a página, a Kinbox exibe `"Você não tem permissão para acessar este workspace."` e encerra a sessão. Ao entrar sem outro workspace ativo, vê **Nenhum ambiente ativo** (`"Os ambientes da sua conta foram desativados ou seu acesso foi removido. Crie um novo ambiente para continuar."` / `"Esperava ver um ambiente aqui? Peça ao administrador da sua empresa para te convidar de novo."`).
  - **Reativar**: `"Tem certeza que deseja reativar esse membro no ambiente? Ele poderá logar-se novamente."` → `"O membro {nome} foi reativado no ambiente!"`. Com assinatura vencida, falha com `"Sua assinatura expirou"`. Pode falhar também quando não há licença livre: `"Seu plano atual não permite ativar ou adicionar agentes."`.
  - **Excluir** (proprietário: `"Você não pode excluir o proprietário do ambiente."`): mesmas opções de **Excluir agendamentos** e **Transferir atribuições** (progresso `"Excluindo agendamentos"`, `"Transferindo conversas"`, `"Transferindo negócios"`; cancelar mostra `"Ação abortada durante execução"`; cancelar não desfaz o que já foi feito: agendamentos já excluídos e atribuições já transferidas continuam assim, e o membro não é desativado nem excluído). Remove o membro do workspace e dos grupos, apaga convite pendente e tira o membro do histórico de todas as sessões do workspace, inclusive as resolvidas. A conta na Kinbox permanece ativa para outros workspaces.
- **Resetar senha:**
  - Só aparece para o proprietário ou quem tem **Pode resetar senha de membros** (marcada só pelo proprietário), em membros que já aceitaram o convite.
  - Janela **Resetar senha**: `"Tem certeza que deseja resetar a senha do membro {nome}?"`, campo **Nova senha** e aviso `"Senha resetada com sucesso"`.
  - A Kinbox gera uma senha nova e envia para o e-mail do membro com o assunto `"[Kinbox] - Redefinição de senha"` (o valor digitado em **Nova senha** não é utilizado).
  - Condições obrigatórias: membro ativo (não **Inativo**), que participa só deste workspace, já aceitou o convite e não é o proprietário. Erros:
    - `"Operador não encontrado"` (membro **Inativo**: reative antes)
    - `"Não é possível redefinir a senha de um operador que participa de outros ambientes"`
    - `"O operador ainda não aceitou o convite"`
    - `"Não é possível redefinir a senha do proprietário do ambiente"`

## Licenças e propriedade

- **Licença** = vaga de membro no plano (**Configurações** → **Assinatura**, linha de licenças de membro).
- Contam todos os membros com acesso ativo, inclusive o proprietário e os convidados que ainda não aceitaram o convite. Membros **Inativo** não contam.
- Total permitido = licenças contratadas + licenças de cortesia do plano, quando houver.
- No limite, convidar falha com `"Número limite de operadores atingido"`. Com assinatura vencida há mais de 3 dias ([Minha assinatura venceu ou o pagamento falhou](/docs/assinatura/assinatura-vencida)), convidar falha com `"Assinatura expirada"` e reativar falha com `"Sua assinatura expirou"`.
- Mais licenças: **Configurações** → **Assinatura** → **Mudar plano**, cartão **Membros** (exige **Assinatura** ou ser o proprietário; o número de licenças não pode ficar abaixo do total de membros ativos). Em teste grátis ou com a assinatura cancelada, o botão é **Assinar um plano**. Quando o plano é gerenciado por um parceiro, nenhum dos dois botões aparece: a mudança é feita com o parceiro. Veja [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano).
- **Exclusivo do proprietário:** excluir o workspace, transferir a propriedade, marcar **Pode resetar senha de membros** e ver a opção **Não marca como lido ao abrir uma conversa** em **Configurações** → **Perfil** (cartão **Preferências**, abaixo de **Idioma**; salva ao alternar, herda o valor do papel antigo até o primeiro clique e não vale no app do celular). Ele não sofre restrições de papel (nem **Não mostrar sugestões de respostas**, nem **Não marca como lido ao abrir uma conversa**, nem a página inicial **Home** do papel) e não pode ser desativado, desconectado nem excluído.
- **Transferir propriedade:** só o proprietário vê **Tornar proprietário**, e apenas em membro ativo que já aceitou o convite. Janela **Transferir propriedade** (caixa de ciência obrigatória; sem marcar: `"Confirme que está ciente para continuar."`) → **Confirmar senha** (**Senha atual** → **Transferir propriedade**) → `"Propriedade transferida com sucesso!"`.
  - O escolhido vira **Proprietário** (sem papel); o antigo proprietário recebe o papel que o novo proprietário tinha; ambos são desconectados. Ação irreversível pela tela (só o novo proprietário pode transferir de volta).
  - Erros: `"Senha incorreta"` e `"O proprietário deve ser um operador ativo e já ter aceitado o convite"`.

## Matriz: membro não entra, não vê ou não consegue convidar

| Se... | Causa | Então orientar |
| --- | --- | --- |
| Convite não chegou e o membro está **Convidado** | E-mail errado, spam ou filtro corporativo | Conferir o e-mail na lista; procurar no spam `"Convite para se juntar ao workspace {nome}"`, enviado pela Kinbox; usar **Reenviar convite** (link não expira). Se o e-mail estiver errado, excluir e convidar de novo. |
| Pessoa diz que não recebeu link de cadastro, mas não aparece como **Convidado** | O acesso já está liberado: ela já concluiu o cadastro ou já participava de outro workspace na Kinbox e entrou direto | Perguntar se concluiu o cadastro. Entrar com o login de sempre e selecionar o workspace em **Escolha um ambiente** ou no botão do ambiente no topo. |
| Convite falha com `"Número limite de operadores atingido"` | Todas as licenças de membro em uso (proprietário e convidados contam; inativos não contam) | Conferir licenças em **Configurações** → **Assinatura**; desativar quem não usa ou aumentar licenças em **Mudar plano** (em teste grátis ou assinatura cancelada, **Assinar um plano**; plano gerenciado por parceiro: falar com o parceiro). |
| Convite falha com `"Já existe um convite para esse operador"` | Já existe membro com esse e-mail no workspace (ativo, **Inativo** ou **Convidado**) | Pesquisar o e-mail com filtro **Tudo**: se **Inativo**, **Reativar**; se **Convidado**, **Reenviar convite**. |
| Convite falha com `"Assinatura expirada"` ou reativação falha com `"Sua assinatura expirou"` | Assinatura vencida há mais de 3 dias | Regularizar a assinatura do workspace. |
| Membro vê **Nenhum ambiente ativo** ao entrar | Foi desativado ou excluído do workspace e não tem outro ativo | Conferir a lista com filtro **Tudo**: se **Inativo**, **Reativar**; se excluído, convidar novamente. |
| Membro vê `"Você foi deslogado por um gestor..."` | Alguém usou **Desconectar** | Entrar novamente. |
| Membro precisa entrar de novo depois de uma alteração | O papel dele foi editado ou a propriedade foi transferida | Entrar novamente para aplicar as novas permissões. |
| Encerrar na hora a sessão de um membro desativado | `"Você não tem permissão para acessar este workspace."` aparece quando ele abre ou atualiza a página | Usar **Desconectar** (membro **Online**) para encerrar a sessão na hora. |
| Membro vê **Fora do horário de acesso** | Papel tem **Limitar horário de acesso ao ambiente** | Aguardar o horário permitido (fuso do workspace) ou ajustar o horário/papel. |
| Membro não vê tela de **Configurações** ou item do menu | Falta a permissão correspondente no papel | Marcar a opção conforme o mapa acima e pedir ao membro para entrar de novo. |
| Membro não vê conversas esperadas | **Acesso as Conversas**, grupos do membro ou grupo/responsável da conversa | Revisar **Acesso as Conversas**, grupos em **Grupos** e atribuição; consultar [Não consigo responder ou ver uma conversa](/docs/conversas/problemas-comuns). |
| Membro não recebe conversas nas regras de atribuição automática que escolhem um membro entre vários, nem os sons de nova mensagem e de nova conversa | **Disponível** desligado em **Editar membro** | Ligar **Disponível** e salvar. Falta de push não depende disso: conferir [Notificações](/docs/conta/notificacoes) do membro. |
| **Resetar senha** falha com erro de outros ambientes, convite pendente ou proprietário | Membro participa de outros workspaces, não aceitou o convite ou é o proprietário | Outro workspace ou proprietário: a própria pessoa troca a senha na conta. Convidado: usar **Reenviar convite**. |
| Membro não sabe a senha após **Resetar senha** | A Kinbox envia uma senha gerada por e-mail (`"[Kinbox] - Redefinição de senha"`) e não usa o campo **Nova senha** | Procurar o e-mail de redefinição, entrar com a senha enviada e alterar depois no perfil. |
