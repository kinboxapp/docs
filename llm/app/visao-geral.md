---
title: "App da Kinbox para celular: plataformas, regras por canal, notificações e o que fica no navegador"
description: Referência do app da Kinbox para iPhone e Android com plataformas, formas de entrar, o que existe em cada aba, o que só existe no navegador, regras por canal, mensagens de permissão, notificações e exclusão da conta.
keywords: [app da kinbox, aplicativo, iphone, android, tablet, ipad, o que não tem no app, diferenças iphone android, continuar com apple, desenhar na foto, apagar mensagem no app, reagir no app, mercado livre no app, sms no app, iniciar conversa pelo app, formato ainda não suportado, seu perfil não permite, limite de sessões, notificação no celular, conversas sem responsável, excluir conta]
publico: llm
tipo: referencia
fontes:
  - mobile:src/app/(tabs)/profile/index.tsx
  - mobile:src/domain/messageActions.ts
  - mobile:src/app/active-chat.tsx
  - mobile:src/app/notifications.tsx
  - mobile:src/domain/platformCopy.ts
  - mobile:src/lib/imageEditor.ts
  - mobile:src/lib/deleteAccount.ts
  - api:src/modules/push-notifications/mobile-push.policy.ts
codigo:
  - mobile:src/app/**
  - mobile:src/domain/messageActions.ts
  - mobile:src/domain/inboxFilters.ts
  - mobile:src/domain/platformCopy.ts
  - mobile:src/data/sendPolicy.ts
  - mobile:src/hooks/usePush.ts
  - mobile:src/lib/imageEditor.ts
  - mobile:src/lib/deleteAccount.ts
  - web:src/components/base/MobileApp/**
  - api:src/modules/push-notifications/**
  - api:src/modules/operators/operators.service.ts
verificado_em: 2026-11-26
---

## Plataformas e onde baixar

- O app da Kinbox para celular está disponível para iPhone (iOS 16.4 ou mais novo; "Somente para iPhone" na App Store) e celular Android (Google Play). É grátis e feito para quem já tem conta na Kinbox.
- Funciona apenas em pé e não tem layout para tablet; no tablet, usar a Kinbox no navegador.
- Download: buscar "Kinbox" na App Store ou no Google Play, ou abrir [kinbox.com.br/app](https://www.kinbox.com.br/app/) (página com os selos e QR codes das duas lojas).
- Atalhos na Kinbox no navegador:
  - No computador: sua foto, no canto superior direito → **Baixar app para celular**; busca do topo (**Pesquisar**) → **Baixar app para celular**; tela de entrada → botão **Baixar o app para celular**, se aparecer.
  - No navegador do celular (iPhone ou celular Android, não no tablet): o aviso "O Kinbox tem app para iPhone" (ou "O Kinbox tem app para Android") pode aparecer, com **Usar o app** (abre a loja; se já instalado, a loja mostra **Abrir**) e **Continuar no navegador**; qualquer escolha esconde o aviso por 30 dias.
  - Condição: os atalhos, o botão da tela de entrada e o aviso aparecem apenas na Kinbox com a marca Kinbox (não aparecem, por exemplo, se a empresa usa a Kinbox com outra marca). Se a opção não aparecer, procurar o app nas lojas ou falar com quem administra o workspace.
- Veja [App da Kinbox para celular: o que dá para fazer](/docs/app/visao-geral).

## Entrar na conta e sessões

- Métodos de entrada: e-mail e senha da Kinbox, **Continuar com Google** (iPhone e Android) e, só no iPhone, **Continuar com Apple** (quando o aparelho oferece). No primeiro acesso com Apple, o login é aceito direto quando a Apple informa um e-mail verificado e não oculto (sem a opção de ocultar o e-mail) igual ao e-mail do cadastro na Kinbox. Nos outros casos, é preciso entrar com e-mail e senha ou Google e vincular a Conta Apple em **Você** → **Privacidade**; depois do vínculo, **Continuar com Apple** passa a funcionar.
- Verificação em duas etapas: quando ativa na conta, o app exibe **Verificação em duas etapas** e aceita código do app autenticador ou **Usar um código de recuperação** (vale também após entrar com Google ou Apple). Ligar ou desligar a verificação existe só na Kinbox no navegador ([Ativar a verificação em duas etapas](/docs/conta/verificacao-em-duas-etapas)).
- Recuperação de senha: **Esqueci minha senha** solicita o envio do link no próprio app ("Se houver uma conta com esse e-mail, você receberá um link para criar uma nova senha."), e o link do e-mail abre no navegador para criar a nova senha ([Trocar a senha, recuperar o acesso e sair da conta](/docs/conta/senha-e-sessoes)).
- Mais de um workspace: tela **Escolher workspace** na entrada; a troca posterior fica em **Você** → **Workspaces** ([Trocar de workspace ou criar outro](/docs/conta/trocar-de-workspace)).
- O app não cria conta nem workspace. Mensagens quando a conta não tem workspace (na tela, **ambiente**) ativo — inclusive ao usar Google sem conta cadastrada:
  - "Esta conta não tem acesso a um ambiente ativo. Entre com sua conta de trabalho ou peça acesso ao administrador da sua empresa."
  - "Nenhum workspace disponível para esta conta no aplicativo."
- Sessão vencida: "Sua sessão expirou. Entre novamente."
- Limite de acessos abertos: o app conta como um acesso; ao atingir o limite, exibe **Limite de sessões** — "Gerencie suas sessões no Kinbox web e entre novamente no aplicativo." — e desconecta o app ([Não consigo entrar na Kinbox](/docs/conta/problemas-de-acesso)).

## O que o app tem por aba

- **Conversas:** visões **Tudo**, **Meus**, **Não lidas**, **Seguindo** e **Arquivados** (**Arquivar** resolve a conversa); filtros salvos; busca ("Buscar conversa") e tela **Filtros** (**Grupo**, **Responsável**, **Canal**, **Tag** e **Filtros secundários**: Pendente, Não atribuído, Atribuído, Sem tags, Nunca respondidos, Sessão sem resposta de operador, Janela de resposta expirada, Janela de resposta aberta e Sessão com erro de envio de mensagem); deslizar na lista (**Lida**/**Não lida**, **Arquivar**/**Reabrir**) e, só no iPhone, menu ao tocar e segurar a conversa (**Marcar como lida**/**Marcar como não lida**, **Marcar como pendente**/**Desmarcar pendência**, **Seguir**/**Parar de seguir**, **Arquivar conversa**/**Reabrir conversa**, **Ver detalhes** e **Bloquear**/**Desbloquear**, conforme o papel); no celular Android, usar o deslizar na lista e, dentro da conversa, a barra de ações ou **Dados do contato** → **Mais** (**Seguir**, **Marcar como pendente** e **Bloquear**, conforme o papel); resposta com texto, **Câmera**, **Fotos**, **Arquivos** (até 10 anexos por vez), **Frases rápidas** (pelo **+** ou `/`), **Nota para o time** e áudio; ações da conversa (**Resolver**/**Reabrir**, **Responsável**, **Grupo**, **Tags**, **Dados do contato**, **Pesquisar**, **Agendamentos**, **Mídia, links e docs**, **Negócios**, **Tarefas**, **Sessão**, **Contato**, **Notas do contato**, **Mais** com **Agendar mensagem**, **Executar bot**, **Transferir para outro canal**, **Bloquear**/**Desbloquear** e **Exportar CSV**); iniciar conversa pelo **+** (**Nova mensagem**). Sem internet: "Sem conexão · mostrando conversas salvas" e envio desligado. Veja [Atender conversas pelo app](/docs/app/atender-pelo-celular).
- **Salas:** salas e mensagens diretas da equipe; contador de não lidas na aba (mostra até `99+`); sem internet mostra "Sem conexão · mostrando salas salvas" com envio desligado. Veja [Conversar nas salas: mensagens diretas, menções e threads](/docs/salas/usar-salas).
- **Agenda:** lista apenas as **Tarefas** do próprio membro (não mostra os agendamentos do Kinbox Agenda; [Kinbox Agenda: visão geral](/docs/agenda/kinbox-agenda)) em **Dia** (padrão), **Semana** e **Mês**, com contador de tarefas atrasadas (mostra até `29+`), **Buscar tarefas** (**Abertas** e **Encerradas**) e **Nova tarefa** (nome obrigatório, tipo, dia inteiro, início/término, **Lembrete** (**Na hora**, **5 minutos antes** — o padrão —, **15 minutos antes**, **30 minutos antes**, **1 hora antes** ou **1 dia antes**), status, responsável e **Tarefa obrigatória**; excluir pede **Motivo da exclusão**; veja [Criar e acompanhar tarefas](/docs/tarefas/criando-e-gerenciando-tarefas)).
- **Você:** topo com foto, nome, e-mail, workspace atual e o lápis **Editar perfil** (desativado quando o papel tem a restrição **Não pode mudar informação de perfil**); **Disponível** (mesmo interruptor do navegador, vale só para o workspace aberto; [Ficar disponível ou indisponível](/docs/conta/disponibilidade)); **Meu perfil** (foto, **Nome**, e-mail só leitura, **Celular**, **Segurança** → **Alterar senha**); **Notificações** ([Notificações no app](/docs/app/notificacoes-no-app)); **Workspaces** (trocar workspace); **Aparência** (**Tema de chat**, modo **Igual ao iPhone**/**Igual ao sistema**, **Claro** ou **Escuro**, **Ações da conversa** em **Abaixo do cabeçalho** ou **Acima do campo de mensagem**, e **Mostrar tags** — ajustes locais do aparelho); **Importar contatos do celular** (só com a permissão **Gerenciar Contatos** ou proprietário; [Importar contatos de uma planilha](/docs/clientes/importar-contatos)); **Kinbox no navegador**; **Privacidade** (**Política de privacidade**, **Permissões de IA** com **Revogar permissões** no aparelho, **Vincular Apple**/**Apple vinculada** só no iPhone e **Excluir conta**); **Sair da conta** (remove dados e rascunhos salvos no aparelho e desliga o push neste celular).

## O que não existe no app

- Criar conta ou criar workspace.
- Ligar ou desligar a verificação em duas etapas.
- Configurações do workspace: canais, membros, papéis, grupos, tags, automações, bot, agentes de IA, horário comercial, assinatura, relatórios, campanhas e tela própria de funis (nos **Dados do contato**, **Negócios** lista as negociações do contato; adicionar depende da permissão do papel).
- Gerenciar sessões/acessos abertos.
- Editar ou cancelar mensagem agendada (a tela **Agendamentos** só lista os status Agendada, Enviada, Falha ao enviar e Repete mensalmente; usar a Kinbox no navegador — [Agendar uma mensagem](/docs/conversas/agendar-mensagem)).
- Detalhes de mensagem interativa recebida ("Mensagem interativa · consulte os detalhes no web.").
- Gerenciar resposta agendada de agente de IA ("Há uma resposta do agente agendada. Gerencie esse envio no web antes de responder.").
- Nas salas: reagir, responder em thread, editar mensagem, fixar, salvar, buscar mensagens dentro da sala, listas **Menções** e **Salvos**, **Auditoria** e seletor **@** para mencionar (veja [Conversar nas salas: mensagens diretas, menções e threads](/docs/salas/usar-salas)).
- Atalho no app para o que fica no navegador: **Você** → **Kinbox no navegador**.

## Diferenças entre iPhone e Android

| Item | iPhone | Celular Android |
| --- | --- | --- |
| Conta Apple | **Continuar com Apple** no login e **Vincular Apple** / **Apple vinculada** em **Você** → **Privacidade** | Não disponível |
| Ações rápidas na lista de **Conversas** | Deslizar na conversa e menu ao tocar e segurar | Só deslizar na conversa; as demais ações ficam, dentro da conversa, na barra de ações ou em **Dados do contato** → **Mais** |
| Editar foto antes de enviar | Recortar, girar e desenhar na foto | Recortar e girar (sem desenho) |
| Rótulos de sistema | **Neste iPhone**, **Igual ao iPhone**, **Abrir Ajustes do iPhone** | **Neste celular**, **Igual ao sistema**, **Abrir Configurações do celular** |
| Visão na **Agenda** | Menu no topo para escolher **Dia**, **Semana** ou **Mês** | Ícone de calendário alterna entre **Dia**, **Semana** e **Mês** |
| Categorias de notificação | Ajustes gerais de notificação no iPhone | Categorias separadas nas configurações do celular: **Mensagens** ("Conversas com clientes"), **Salas** ("Mensagens e menções nas salas internas") e **Atribuições** ("Conversa atribuída a você") |
| Botões na notificação (responder, marcar como lida) | Não disponível (tocar abre o app) | Não disponível (tocar abre o app) |

## Conversas no app: regras por canal

| Ação ou limite | Regra por canal |
| --- | --- |
| **Responder** (citar) | Só WhatsApp e Instagram oficial. No Mercado Livre, toque e segure na pergunta do cliente ("Toque e segure na pergunta que deseja responder."). |
| Reagir a uma mensagem | Só WhatsApp. |
| **Apagar** mensagem | No WhatsApp por QR Code, apaga uma mensagem enviada pela equipe: a do próprio membro, com **Deletar própria mensagem**; a de um colega, com **Deletar mensagens de outros membros**. O WhatsApp oficial não permite apagar. |
| Anexos e áudio | Até 10 anexos por vez (cada anexo vira uma mensagem). Mercado Livre e SMS não aceitam anexo nem áudio ("Este canal não permite enviar anexos. Remova os anexos para enviar o texto."). |
| Janela de 24 horas | Só no WhatsApp oficial: após 24 horas sem mensagem do contato, o campo é trocado por "A janela de atendimento encerrou. Envie um modelo aprovado para retomar a conversa." com **Escolher modelo** ([Janela de 24 horas: quando é preciso usar um template](/docs/canais/whatsapp/whatsapp-cloud-api/janela-de-24-horas)). |
| Iniciar conversa (**Nova mensagem**) | Só WhatsApp, e-mail e SMS permitidos ao papel. Sem canal elegível: "Nenhum canal habilitado para iniciar conversas. Os demais canais recebem respostas dentro de cada atendimento." ([Iniciar uma conversa com um contato](/docs/conversas/iniciar-conversa)). |
| **Modelo aprovado** no WhatsApp oficial | Obrigatório para iniciar conversa. Ao agendar, o modelo aprovado substitui o campo de texto quando o horário cai fora da janela de 24 horas (inclusive quando o contato nunca enviou mensagem) ou quando **Repetir mensalmente** está ligado, mesmo dentro da janela ("Para este horário, o WhatsApp exige um modelo aprovado."). Formatos não aceitos no app aparecem como "Formato ainda não suportado" (enviar pelo navegador). Sem modelos: "Nenhum modelo disponível neste canal." ([Enviar um template aprovado](/docs/canais/whatsapp/whatsapp-templates/enviar-template)). |
| **Transferir para outro canal** | Só para outro número de WhatsApp, com o botão **Transferir conversa**. A opção **Resolver esta conversa** aparece só quando o papel permite resolver e não há campos obrigatórios pendentes (veja [Atribuir, mover para um grupo ou transferir uma conversa](/docs/conversas/atribuir-e-transferir)). |
| **Agendar mensagem**, **Executar bot** e **Exportar CSV** | Aparecem só se o papel permitir e não aparecem no Mercado Livre. |
| Mensagens de erro de envio por canal | "Este canal permite apenas texto." (SMS com anexo ou áudio); "Selecione a pergunta que deseja responder." (Mercado Livre, sem escolher a pergunta); "A janela do WhatsApp encerrou. Envie um modelo aprovado." (WhatsApp oficial após 24 horas). |
| Telefone ao iniciar conversa | Exige código do país e DDD (exemplo: `+55 11 90000-0001`). |

## Mensagens de permissão e restrição no app

Quando o papel do membro bloqueia uma ação no app, o ajuste deve ser pedido a quem administra o workspace (veja [Referência de permissões](/docs/administracao/referencia-de-permissoes)).

| Mensagem na tela | O que fazer |
| --- | --- |
| "Sem acesso à caixa" — "Seu perfil não permite acessar a caixa deste workspace." | Trocar de workspace em **Trocar workspace** ou pedir liberação da **Caixa de entrada** a quem administra o workspace. |
| "Você não tem permissão para esta ação." | Pedir a permissão correspondente a quem administra o workspace. |
| "Você não tem permissão para enviar esta mensagem." | Pedir permissão de envio a quem administra o workspace. |
| "Este contato está bloqueado." | Desbloquear o contato para voltar a enviar mensagens. |
| "Seu perfil não pode enviar mensagens neste canal." | Pedir liberação do canal no papel a quem administra o workspace. |
| "Seu perfil permite enviar mensagens apenas no horário de atendimento." | Aguardar o horário permitido ou pedir ajuste no papel a quem administra o workspace. |
| "A mensagem contém uma expressão restrita pelas regras do workspace." | Remover ou alterar o termo bloqueado pelas regras do workspace. |
| "Assuma este atendimento para visualizar as mensagens." | Tocar em **Assumir conversa** (se o papel permitir atribuir) ou pedir que a conversa seja atribuída a você. |
| "Assuma a conversa antes de resolver." | Assumir a conversa antes de resolver ou arquivar. |
| "Seu perfil não permite iniciar conversas." | Pedir a permissão de iniciar conversas a quem administra o workspace. |
| "Este contato já está em atendimento. As permissões do seu perfil impedem iniciar outra conversa." | O papel só permite iniciar conversa com contatos livres; pedir ajuste a quem administra o workspace. |
| "Seu perfil não permite alterar esta tag." | Pedir ajuste de permissão de tags a quem administra o workspace. |
| "Seu perfil não permite agendar mensagens." / "Seu perfil não permite transferir conversas." / "Seu perfil não permite executar bots." / "Seu perfil não permite exportar conversas." | Pedir a respectiva permissão a quem administra o workspace. |
| "Seu perfil não permite mudar sua disponibilidade. Fale com seu gestor." / "Seu perfil não permite ficar indisponível." / "Seu perfil só permite ficar disponível no horário de atendimento." | Restrição de disponibilidade no papel ([Ficar disponível ou indisponível](/docs/conta/disponibilidade)); pedir ajuste a quem administra. |
| "Sua função não permite alterar os dados do perfil." | Papel tem a restrição **Não pode mudar informação de perfil**; pedir ajuste a quem administra o workspace. |

## Notificações no app

- **Primeira vez por workspace:** ao abrir um workspace pela primeira vez num aparelho (o registro do primeiro uso fica no aparelho, por conta e workspace), o app pede a permissão de notificações do sistema, se ainda não foi dada, e, só com ela concedida, liga **Receber notificações**, **Novas mensagens**, **Atribuídas a mim** e **Mensagens diretas e menções** para aquele workspace, sem desligar outros avisos já ligados. Se **Receber notificações** já estava ligado na conta, nada muda; se a permissão for recusada (ou já tiver sido negada de vez no sistema), os avisos ficam como estavam. Essa etapa roda uma vez por workspace em cada aparelho; depois, ligar ou desligar é em **Você** → **Notificações**. Workspaces nunca abertos no app começam desligados: é preciso abrir cada workspace uma vez em **Você** → **Workspaces**.
- **O que cada aviso cobre:** **Novas mensagens** avisa só das conversas em que o membro é o responsável (conversas sem responsável não geram aviso no app); **Atribuídas a mim** avisa quando uma conversa é atribuída ao membro; **Mensagens diretas e menções** avisa mensagens diretas e menções nas salas (quem tem a restrição **Não pode acessar as salas** não recebe avisos de salas, menos o proprietário).
- **Alcance das opções:** todas as opções da tela **Notificações** (inclusive **Receber notificações**, **Quando receber** e **Só no horário comercial**, na seção **Neste iPhone** / **Neste celular**) valem para o workspace aberto e para a conta inteira, em todos os celulares em que o membro usa o app; para ajustar outro workspace, trocar de workspace e abrir **Notificações** de novo. A permissão de notificações é do aparelho e vale para todos os workspaces.
- **Vínculo com o navegador:** **Novas mensagens**, **Atribuídas a mim** e **Mensagens diretas e menções** valem para o workspace atual e são as mesmas opções de **Configurações** → **Notificações** no navegador (**Mensagem**, **Atribuído** e **Mensagem de time**). **Receber notificações**, **Quando receber** e **Só no horário comercial** existem só no app e são independentes de **Habilitar notificações de desktop** ([Receber notificações no navegador e no celular](/docs/conta/notificacoes)).
- **Quando receber:** **Quando não estiver usando o web** (padrão: silencia o app enquanto há aba da Kinbox visível, em foco e com uso nos últimos 2 minutos; aba em segundo plano não silencia; usar o navegador num workspace só silencia os avisos daquele workspace) ou **Sempre** (avisa mesmo com a Kinbox aberta no navegador).
- **Só no horário comercial:** segue o horário padrão do workspace configurado na Kinbox no navegador ([Definir os horários de atendimento](/docs/configuracoes-no-workspace/criar-e-gerenciar-horarios)); sem horário padrão configurado, os alertas chegam a qualquer hora.
- **Vários workspaces:** o app envia alertas de todos os workspaces em que as notificações estão ligadas. Tocar no aviso troca de workspace automaticamente se necessário; sem acesso, mostra "Conversa indisponível" ou "Sala indisponível" — "Você não tem mais acesso a este workspace."
- **Supressão e saída:** conversa ou sala aberta no app não repete aviso; salas silenciadas não geram alerta; ficar **Indisponível** não silencia o push ([Ficar disponível ou indisponível](/docs/conta/disponibilidade)). Sair da conta no app ou excluir a conta desliga os avisos neste celular.
- **Diagnóstico:** sem permissão no aparelho, nenhum workspace avisa naquele celular; se só um workspace não avisa, abrir esse workspace no app e conferir em **Você** → **Notificações** o interruptor **Receber notificações** e o tipo de aviso esperado (**Novas mensagens**, **Atribuídas a mim** ou **Mensagens diretas e menções**).
- **Permissão negada no aparelho:** ao tentar ligar **Receber notificações**, exibe "As notificações estão desativadas nos Ajustes do iPhone." (no Android, "As notificações estão desativadas nas Configurações do celular."); liberar via **Abrir Ajustes do iPhone** / **Abrir Configurações do celular**.
- Não há botões na notificação (responder ou marcar como lida); tocar abre o app. No Android, os avisos ficam nas categorias do sistema **Mensagens**, **Salas** e **Atribuições**.
- Veja [Notificações no app](/docs/app/notificacoes-no-app).

## Excluir a conta

- Disponível no app em **Você** → **Privacidade** → **Excluir conta** para qualquer membro, menos o proprietário de um workspace ativo (recusado com "Você é dono de um workspace. Transfira a propriedade para outro membro antes de excluir sua conta."). O proprietário precisa transferir a propriedade ([Licenças, desativar membros e transferir a propriedade](/docs/administracao/licencas-e-propriedade)) ou excluir o workspace antes ([Excluir o workspace](/docs/administracao/excluir-workspace)).
- Ação irreversível: apaga nome, e-mail, telefone, CPF, foto, cargo, biografia, senha, vínculo com a Conta Apple (se houver), acesso a todos os workspaces e grupos e registros do celular para notificações.
- O que continua com a empresa: conversas, mensagens e registros feitos nos workspaces permanecem com o nome "Usuário excluído". As conversas em aberto atribuídas ao membro ficam sem responsável.
- E-mail livre: após a exclusão, o e-mail fica livre para um novo cadastro; voltar a um workspace exige novo convite de quem administra.
- Sem o app ou sem conseguir entrar: dentro da Kinbox no navegador não existe botão para excluir a conta; usar o formulário público em [kinbox.com.br/delete-account](https://www.kinbox.com.br/delete-account/) (a Kinbox responde para o e-mail da conta).
- Diferença entre ações: **Sair da conta** apenas desconecta o aparelho; sair de um workspace exige que quem administra desative ou exclua o membro; excluir o workspace inteiro é ação exclusiva do proprietário.
- Veja [Excluir sua conta pelo app](/docs/app/excluir-conta).
