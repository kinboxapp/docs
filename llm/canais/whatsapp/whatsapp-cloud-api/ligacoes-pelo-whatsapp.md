---
title: "Ligações pelo WhatsApp: permissão do cliente, regras da Meta, SIP e erros"
description: Regras das ligações pelo WhatsApp oficial na Kinbox, com quem recebe o toque, a permissão do contato e os limites da Meta, a franquia do plano, o SIP e todas as mensagens de erro.
keywords: [ligação whatsapp, permissão para ligar, permitir ligações, sem permissão pedir ao cliente, limite de pedidos atingido, permissão retirada, 4 ligações sem resposta, limite de ligações com este cliente, sip ativado, coexistência ligação, franquia de minutos, excedente, chamada perdida, para quem toca]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/channels/whatsappCloud/WhatsappCallingChannelSettings.tsx
  - web:src/components/whatsappCall/CallContactButton.tsx
  - web:src/components/whatsappCall/useWhatsappOutboundCall.tsx
  - web:src/components/whatsappCall/RequestCallPermissionModal.tsx
  - web:src/components/whatsappCall/WhatsappCallManager.tsx
  - api:src/modules/whatsapp-calling/whatsapp-calling.service.ts
  - api:src/modules/whatsapp-calling/whatsapp-call-permission.service.ts
  - api:src/modules/whatsapp-calling/ring-targets.ts
  - api:src/modules/whatsapp-calling/whatsapp-call-voice-plan.service.ts
  - api:src/modules/whatsapp-calling/whatsapp-call-budget.service.ts
codigo:
  - web:src/pages/settings/channels/whatsappCloud/WhatsappCallingChannelSettings.tsx
  - web:src/pages/settings/channels/whatsappCloud/EditWhatsappCloud.tsx
  - web:src/components/whatsappCall/**
  - web:src/lib/whatsappCall.ts
  - web:src/pages/settings/channels/voip/WhatsAppCall.tsx
  - web:src/pages/settings/channels/voip/WhatsAppOutboundCall.tsx
  - web:src/pages/inbox/MessageVoipCall.tsx
  - api:src/modules/whatsapp-calling/**
  - api:src/modules/whatsapp-calling/whatsapp-call-voice-plan.service.ts
  - api:src/modules/whatsapp-calling/whatsapp-call-budget.service.ts
  - api:src/modules/whatsapp-api/utils/call-permission-template.ts
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/controllers/v1IntegrationController.js
verificado_em: 2026-11-26
---

Detalhes de referência da página [Fazer e receber ligações pelo WhatsApp oficial (Beta)](/docs/canais/whatsapp/whatsapp-cloud-api/ligacoes-pelo-whatsapp).

## Requisitos

| Requisito | Regra |
| --- | --- |
| Recurso em teste (**Beta**) | Precisa estar liberado no workspace. Sem liberação, a aba **Ligações** e a opção **Ligar pelo WhatsApp** não aparecem (e a tentativa exibe `"Ligações do WhatsApp ainda não estão liberadas para este workspace"`). |
| Canal | Apenas **WhatsApp oficial** sem [coexistência](/docs/canais/whatsapp-api-oficial-coexistente). O WhatsApp por QR Code não tem ligações pela Kinbox (veja [O que funciona e o que não funciona no WhatsApp por QR Code](/docs/canais/whatsapp/whatsapp-app/o-que-funciona)). |
| Plano | Plano **Ligações WhatsApp** contratado em **Configurações** → **Assinatura** por quem cuida da assinatura ([Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano)). |
| Franquia ou saldo | Franquia de minutos sobrando no plano **ou** saldo de pelo menos **R$ 0,50** na carteira ([Adicionar saldo e créditos de SMS](/docs/assinatura/adicionar-saldo)). |
| Permissões | Configurar a aba **Ligações**, desativar SIP e criar o template pela janela da conversa exigem **Gerenciar Canais** ou proprietário ([Referência de permissões](/docs/administracao/referencia-de-permissoes)). Atender exige **Responder** ou proprietário. O membro na conversa pode ligar pelo WhatsApp (a permissão **Pode ligar para o contato** vale apenas para o VoIP). |
| Microfone | Liberado no navegador de quem faz ou atende ligações. Sem acesso ao microfone: `"Ative o microfone para fazer ligações"` ou `"Ative o microfone para receber ligações"`. |

## Opções da aba Ligações e efeitos

- Cada interruptor salva imediatamente com o aviso `"Configuração de ligações atualizada."` (independente do botão **Salvar** do rodapé do painel do canal).
- **Receber ligações:** ativa as ligações do número na Meta. Se for desligada, as demais opções e o cartão **IA atende as ligações** somem, e **Fazer ligações** também é desligada.
- **Mostrar botão de ligar no WhatsApp do cliente:** vem ligada por padrão. Controla a exibição do ícone de ligar na conversa e no perfil da empresa no WhatsApp do contato; desligada, o contato só liga por botões de ligação enviados em mensagens. A alteração pode levar alguns dias para aparecer no celular do contato.
- **Gravar ligações:** vem desligada por padrão. Grava as ligações atendidas e gera transcrição e resumo automaticamente.
- **Fazer ligações:** libera **Ligar pelo WhatsApp** na conversa. Ao ativar, a Kinbox cria automaticamente o template padrão de pedido de permissão (`"Olá! Podemos te ligar por aqui no WhatsApp para continuar seu atendimento?"`, com botão de permitir ligações, categoria utilidade, pt-BR) e envia para aprovação da Meta. Também libera na Meta a permissão de retorno para quem ligou para a empresa.
- **Template de pedido de permissão:** exibido abaixo de **Fazer ligações** com os estados **não criado** (botão **Criar template**), **em análise**, **aprovado** ou **rejeitado** (com o motivo entre parênteses e botão **Reenviar template**). Ao enviar: `"Template enviado para aprovação da Meta. Costuma levar alguns minutos."`. Se a criação automática falhar: `"Não foi possível criar o template de pedido de permissão: <erro>"`. O template também pode ser criado com a opção **Pedir permissão para ligar** (veja [Criar um template e enviar para aprovação](/docs/canais/criar-templates-dentro-do-kinbox)).

## Para quem toca (ligações recebidas)

- Toca apenas para membros que podem atender: proprietário do workspace ou membro com a permissão **Responder**, online e disponível (interruptor **Disponível** ligado; veja [Ficar disponível ou indisponível](/docs/conta/disponibilidade)) e fora de outra ligação.
- Quem tem só a opção **Responder apenas conversas dele** (no lugar de **Responder**) nunca recebe o toque de ligação do WhatsApp, nem nas conversas atribuídas a ele.
- **Conversa com responsável que pode atender:** toca apenas para esse responsável.
- **Conversa sem responsável (ou responsável indisponível):** toca para todos que podem atender e têm permissão para ver conversas sem atribuição, conforme o escopo de visão do papel e o grupo da conversa.
- **Proprietário e acesso Global:** na conversa sem responsável disponível, entre os que podem atender, toca também para o proprietário e para quem tem acesso **Global** às conversas. O proprietário e quem tem acesso **Global** também podem atender pela mensagem da conversa, mesmo que a ligação não tenha tocado para eles.
- **Na conversa:** enquanto toca, a mensagem da ligação aparece como **Ligação do WhatsApp** (`"Tocando..."`) com **Recusar** e **Atender** para quem pode atender; depois vira **Ligação recebida pelo WhatsApp**. Esse é o caminho de atender que não depende das preferências de notificação.
- **Aviso na tela:** aparece um cartão em qualquer tela da Kinbox com nome e foto do contato, `"Ligação do WhatsApp"` e os botões **Recusar** e **Atender**. O som toca em apenas uma aba. Se a aba estiver em segundo plano e as notificações do navegador estiverem permitidas, aparece também uma notificação do navegador.
- **Preferências pessoais** (em **Configurações** → **Notificações**, disponíveis com o recurso em teste; veja [Notificações](/docs/conta/notificacoes)):
  - **Quando receber ligação do WhatsApp:** `"Toca e mostra o aviso para atender em qualquer tela"`.
  - **Quando receber ligação do WhatsApp em conversa sem responsável:** `"Desligado, a ligação aparece só na lista de conversas"`.

## Atender, recusar e tempo de toque

- Quando o contato liga pelo WhatsApp, a ligação entra como mensagem na conversa dele (abrindo ou criando a conversa). Um bot ativo na conversa não responde e sai da conversa.
- **Atender:** o primeiro membro a clicar em **Atender** fica com a ligação (`"Conectando…"` na janela) e a conversa passa a ser atribuída a ele. Quem tentar atender depois vê `"Outro atendente já atendeu esta ligação"`.
- **Recusar:** apenas remove o aviso da tela de quem clicou. A ligação só é recusada no WhatsApp quando todos os membros para quem tocou recusam; se o canal tiver agente de voz ligado, a ligação pode passar para o agente de voz (veja [Agente de voz para as ligações do WhatsApp (Beta)](/docs/agente-de-ia/agente-de-voz)).
- **Tempo de toque:**
  - **Ligação recebida:** a Meta desiste após cerca de **60 segundos** sem atendimento; a conversa registra **Chamada perdida** e dispara o gatilho de automação **Chamada perdida**.
  - **Ligação feita pelo membro:** desiste após **45 segundos** sem resposta. Avisos possíveis: `"O cliente não atendeu"` e `"O cliente recusou a ligação"`.
- Ao fazer uma ligação pelo WhatsApp, a mensagem **Ligação feita pelo WhatsApp** entra na conversa sem enviar texto ao contato; a conversa é reaberta e atribuída como em uma mensagem enviada pelo membro. Fechar ou recarregar a aba do navegador durante qualquer ligação do WhatsApp em andamento (recebida e atendida, ou feita) pede confirmação e encerra a ligação.
- Cada membro mantém apenas uma ligação ativa por vez (`"Encerre a ligação atual antes de iniciar outra"`), e não é possível resolver uma conversa enquanto uma ligação do WhatsApp está em andamento (`"Encerre a ligação antes de resolver a conversa"`).

## Estados do menu Ligar pelo WhatsApp

| Texto exibido abaixo de **Ligar pelo WhatsApp** | Significado e ação |
| --- | --- |
| `"Sem permissão. Pedir ao cliente"` | O contato ainda não permitiu ligações. Clicar abre **Pedir permissão para ligar**. |
| `"Sem permissão. Pedidos esgotados por enquanto"` | Limite de pedidos de permissão da Meta atingido; aguardar a data exibida na janela de pedido. |
| `"Permitido até <data>"` | Permissão temporária válida por 7 dias a partir da aceitação. Clicar inicia a ligação. |
| `"O cliente permitiu ligações"` | Permissão permanente ativa. Clicar inicia a ligação. |
| `"Não atendeu as <quantidade> últimas ligações"` | Aviso amarelo sobre ligações recentes sem resposta. |
| `"Permissão retirada: 4 ligações sem resposta"` | Aviso vermelho: o WhatsApp retirou a permissão; é preciso pedir de novo. |
| `"Limite de ligações. Tente depois de <data>"` | Limite de ligações com esse contato atingido; aguardar a data informada. |
| `"Disponível nos planos de Ligações WhatsApp"` | Workspace sem plano **Ligações WhatsApp**. Clicar abre o aviso **Ligações pelo WhatsApp**. |
| `'Ative "Fazer ligações" nas configurações do canal'` | Opção **Fazer ligações** (ou **Receber ligações**) desligada na aba **Ligações** do canal. |
| `"A Meta não oferece ligações em números em coexistência com o app WhatsApp Business"` | Número em coexistência; não permite ligações pela Kinbox. |
| `"O contato não tem número de WhatsApp"` | Contato sem número de WhatsApp (apenas nome de usuário). |
| `"Ligações pelo WhatsApp não estão ativas neste canal"` | O canal da conversa não está pronto para ligações pelo WhatsApp (por exemplo, recurso em teste não liberado). |

## Pedido de permissão e limites da Meta

Na janela **Pedir permissão para ligar** (`"O WhatsApp só deixa a empresa ligar depois que o cliente permite. Ele recebe uma mensagem com o botão de permitir."`), o envio depende da [janela de 24 horas](/docs/canais/whatsapp/whatsapp-cloud-api/janela-de-24-horas):

| Situação da janela | Como o pedido é enviado | Mensagens na janela |
| --- | --- | --- |
| Dentro das 24 horas | Mensagem gratuita com campo **Mensagem** editável (até 1.024 caracteres; padrão `"Podemos te ligar por aqui no WhatsApp?"`). | `"Grátis: o cliente falou com você nas últimas 24h, então o pedido vai como mensagem."` |
| Fora das 24 horas (com template aprovado) | Prévia do template aprovado com o botão **Permitir ligações** (permite escolher se houver mais de um). | `"O cliente não fala com você há mais de 24h: o pedido vai como template, cobrado pela Meta como uma mensagem."` |
| Fora das 24 horas (sem template aprovado) | Sem envio até aprovação. Quem tem **Gerenciar Canais** vê **Criar template agora** ou **Reenviar template**; os demais veem `"Peça a um administrador para criar o template nas configurações do canal."`. | `"O cliente não fala com você há mais de 24h"` seguido de `"O template de pedido de permissão está em análise pela Meta. Costuma levar alguns minutos."`, `"Fora da janela de 24h, o pedido precisa de um template aprovado pela Meta."` ou `"A Meta rejeitou o template de pedido de permissão."` |

- **Confirmação do envio:** `"Pedido enviado. Quando o cliente permitir, você poderá ligar."`.
- **Limite de pedidos (regra da Meta):** quando atingido, a janela exibe `"Limite de pedidos atingido (1 por dia e 2 por semana)."` e `"Tente de novo depois de <data>."`, com o botão **Enviar pedido** desativado.
- **Validade da permissão:** a permissão temporária vale **7 dias** a partir do momento em que o contato permitiu; a permanente não expira.
- **Permissão retirada:** quando retirada após 4 ligações seguidas sem resposta, a janela exibe `"O WhatsApp retirou a permissão em <data>, depois de 4 ligações seguidas sem resposta. Combine um horário por mensagem antes de pedir de novo."`.

## Avisos de ligações sem resposta

- **Após 2 ligações feitas seguidas sem resposta:** entra na conversa a nota `"O cliente não atendeu as 2 últimas ligações. O WhatsApp vai pedir para ele rever a permissão de ligações. Com mais 2 sem resposta, a permissão é retirada."`.
- **Antes da 4ª ligação feita seguida sem resposta:** abre a janela **Esta pode ser a última tentativa** (`"<x> de <total> sem resposta"`, `"Se o cliente não atender esta ligação, o WhatsApp retira a permissão e você vai precisar pedir de novo."`, `"Dica: mande uma mensagem combinando um horário antes de ligar."`), com os botões **Cancelar** e **Ligar mesmo assim**.

## Bloqueios e mensagens de erro

| Mensagem | Causa |
| --- | --- |
| `"Este canal não está configurado para fazer ligações"` | **Receber ligações** ou **Fazer ligações** desligada na aba **Ligações** do canal. |
| `"Ligações do WhatsApp ainda não estão liberadas para este workspace"` | Recurso em teste (**Beta**) não liberado no workspace. |
| `"Contrate um plano de Ligações WhatsApp para fazer ligações"` / aviso **Ligações pelo WhatsApp** (`"Para usar as ligações, o ambiente precisa assinar um dos planos de Ligações WhatsApp."`; para quem não cuida da assinatura: `"Peça para o gestor do ambiente assinar um plano de Ligações WhatsApp em Configurações > Assinatura."`) | Workspace sem o plano **Ligações WhatsApp**. |
| `"Você já está em uma ligação"` / `"Encerre a ligação atual antes de iniciar outra"` | O membro já está em outra ligação (WhatsApp ou VoIP). |
| `"Este contato já está em uma ligação"` | O contato já está em uma ligação ativa. |
| `"Você precisa ter mais saldo na carteira para fazer ligações."` / `"Saldo insuficiente para ligar"` | Sem franquia sobrando e saldo na carteira abaixo de **R$ 0,50**. |
| `"O cliente ainda não permitiu receber ligações"` | O contato ainda não aceitou o pedido de permissão. |
| `"Este contato não tem número de WhatsApp"` | Contato sem número de telefone/WhatsApp. |
| `"Limite de ligações com este cliente atingido. Tente depois de <data>."` | Limite da Meta para ligações com esse contato atingido. |
| `"Ative o microfone para fazer ligações"` / `"Ative o microfone para receber ligações"` | Acesso ao microfone bloqueado no navegador. |
| `"A conexão de áudio da ligação falhou"` | Falha na conexão de áudio durante a ligação. |
| `"Não foi possível ligar para o cliente"` | Falha ao iniciar a ligação. |
| `"Outro atendente já atendeu esta ligação"` | Outro membro atendeu a ligação recebida antes. |
| `"Gravação desativada: saldo insuficiente"` | Gravação ligada, mas o workspace está sem o plano **Ligações WhatsApp** e com saldo de R$ 0,50 ou menos. Com o plano, a gravação é sempre liberada. |
| `"Não foi possível enviar a gravação da ligação"` | O navegador de quem atendeu não conseguiu enviar o áudio gravado no fim da ligação. |
| `"Encerre a ligação antes de resolver a conversa"` | Tentativa de resolver a conversa com ligação do WhatsApp em andamento. |

## SIP ativado na Meta

- Se o número de WhatsApp oficial estiver com SIP ativado na Meta (as ligações vão para outro provedor), a aba **Ligações** informa que a Kinbox não consegue fazer nem receber ligações e exibe o botão **Desativar SIP**.
- Ao clicar em **Desativar SIP**, abre a confirmação **Desativar o SIP deste número?**: `"O provedor SIP deixa de receber as ligações deste número. Dá para reativar depois no provedor."` (**Desativar SIP** / **Cancelar**). Depois de confirmar: `"SIP desativado. As ligações voltam a passar pelo Kinbox."`.
- Ao tentar ligar para um contato com SIP ativo, abre a janela **Este número está com SIP ativado** com **Desativar SIP e ligar** (para quem tem **Gerenciar Canais** ou é proprietário) ou `"Peça a quem gerencia os canais para desativar o SIP na configuração do canal."` e **Entendi**.

## Coexistência

- Em números em [coexistência](/docs/canais/whatsapp-api-oficial-coexistente), a aba **Ligações** exibe **A Meta não oferece ligações neste número**: `"O número está em coexistência: usa o app WhatsApp Business no celular e a API oficial ao mesmo tempo. Nesse modo, as ligações ficam só no app do celular e não chegam ao Kinbox. Para receber ligações aqui, use o número só na API oficial, sem o app WhatsApp Business."`.
- Os interruptores **Receber ligações** e **Fazer ligações** só podem ser desligados nesse modo.
- A Kinbox consulta a Meta ao abrir a aba **Ligações** para verificar se o número está em coexistência (mantendo o resultado por 1 hora para as demais telas).

## Plano, franquia e saldo acabando

- **Franquia mensal:** o plano **Ligações WhatsApp** inclui minutos atendidos pela equipe (ligações feitas e recebidas, contados por minuto iniciado) e, conforme o plano, minutos de IA (cada minuto de IA consome mais de um minuto da franquia, na proporção indicada na tela de planos). A franquia é compartilhada entre os canais de WhatsApp do workspace, renova a cada ciclo da assinatura e os minutos não usados não acumulam para o mês seguinte.
- **Alertas de franquia:** quando o consumo da franquia do ciclo atinge **80%** (`"Você já usou 80% dos minutos do plano de ligações deste ciclo."`) e **100%** (`"Os minutos do plano de ligações deste ciclo acabaram. As próximas ligações usam o saldo da carteira, pelo preço do excedente."`), chega um aviso uma vez por ciclo, por notificação na Kinbox e por e-mail, para as mesmas pessoas que recebem o alerta de saldo: o proprietário e os membros com a permissão **Assinatura** (veja [Configurar o alerta de saldo](/docs/assinatura/alerta-de-saldo)).
- **Excedente:** minutos além da franquia saem do [saldo da carteira](/docs/conceitos/saldo-e-creditos) com a descrição `"Excedente do plano de ligações do WhatsApp"`.
- **Mínimo sem franquia:** sem franquia disponível, é necessário ter saldo de pelo menos **R$ 0,50** na carteira para fazer ou receber ligações. Ligação recebida sem plano, ou sem franquia nem saldo, é recusada na Meta e registrada na conversa como **Chamada perdida**.
- **Gravação, transcrição e resumo:** gravação e transcrição automática estão incluídas no plano **Ligações WhatsApp** (a transcrição pedida pelo botão **Transcrever** usa o saldo; veja **Gravação** abaixo). O **resumo** gerado por IA é cobrado do saldo da carteira como `"Resumo da transcrição de chamada de voz"`. Ligações não atendidas não consomem franquia nem saldo.
- **Tarifas da Meta:** cobradas diretamente pela Meta, à parte da mensalidade do plano.
- **Saldo de ligações acabando:** 30 segundos antes de a franquia e o saldo da carteira acabarem durante uma ligação, aparece a faixa vermelha `"Saldo de ligações esgotado. A ligação será encerrada em <segundos> s."` com o link **Adicionar saldo** (para quem cuida da assinatura). Recarregar antes do término remove o aviso; se acabar, a ligação é encerrada e a conversa recebe `"Ligação encerrada: o saldo de ligações (franquia do plano e carteira) acabou."`.

## Gravação

- Em ligações atendidas por pessoas, a gravação é feita no navegador de quem atendeu e enviada no encerramento (se falhar: `"Não foi possível enviar a gravação da ligação"`). Em ligações atendidas pelo agente de voz, a gravação cobre a ligação inteira.
- No painel **Ligação de voz**, ficam disponíveis o player, **Baixar áudio** (arquivo `ligacao-voip-<id>.<extensão>`), **Resumo** (com sentimento **Positivo**, **Negativo** ou **Neutro**) e **Transcrição**. Se a transcrição automática tiver falhado, aparece o botão **Transcrever**: essa transcrição feita pelo botão exige saldo na carteira acima de **R$ 0,20** e é cobrada do saldo por minuto de áudio (`"Transcrição de chamada de voz"`), mesmo com o plano; sem saldo: `"Saldo insuficiente"`; se falhar: `"Não foi possível transcrever a chamada"`. As gravações também aparecem em **Relatórios** → **Ligações** com filtros `"WhatsApp: feitas"` e `"WhatsApp: recebidas"`.

## Agente de voz

Para configurar e usar um agente de IA nas ligações recebidas pelo WhatsApp oficial, veja [Agente de voz para as ligações do WhatsApp (Beta)](/docs/agente-de-ia/agente-de-voz).
