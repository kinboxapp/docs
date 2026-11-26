---
title: "E-mail: erros de IMAP/SMTP e Outlook, atraso da leitura e conta em outro workspace"
description: Regras do canal de e-mail na Kinbox, com as mensagens de erro ao conectar, como e quando cada tipo de conexão lê a caixa, o que entra e como as respostas saem, limites do plano e conta em outro workspace.
keywords: [erro ao testar conexão com o imap/smtp, dados inválidos para imap/smpt, description é obrigatório, erro ao obter token do outlook, essa conta já foi adicionada em outro ambiente, seu plano atual não permite adicionar o novo canal, sua assinatura expirou, 2 minutos, 50 e-mails, 20 e-mails, 10 mb, "re:", notificação kinbox, via kinbox, senha do smtp]
publico: llm
tipo: solucao-de-problema
fontes:
  - web:src/pages/settings/channels/email/EditEmail.tsx
  - api-v0:server/controllers/MailController.js
  - api-v0:server/modules/mail/imap-client.js
  - api-v0:server/modules/accessRestriction/rules.js
  - api-v0:server/modules/chat/auxiliary/sendMessageToClient.js
  - api-v0:server/modules/**
  - api-v0:server/modules/mail/smtp-client.js
  - api-v0:server/controllers/IntegrationsController.js
codigo:
  - web:src/pages/settings/channels/email/**
  - web:src/pages/settings/channels/index.tsx
  - api-v0:server/controllers/MailController.js
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/modules/mail/**
  - api-v0:server/modules/**
  - api-v0:server/modules/scheduler/MailScheduler.js
  - api-v0:server/modules/accessRestriction/**
  - api-v0:server/modules/scheduler/schedulerManager.js
  - api-v0:server/controllers/CallController.js
verificado_em: 2026-11-26
---

Detalhes de referência da página humana [Os e-mails não chegam ou não saem](/docs/canais/e-mail/problemas-comuns).

## Mensagens de erro ao conectar

Ao criar um canal de e-mail, a confirmação mostra `"Canal de E-mail criado."` (**Por encaminhamento** e **IMAP/SMTP**) ou `"Canal de Outlook criado."` (**Outlook**). Em caso de erro, a Kinbox pode exibir:

| Mensagem | Quando aparece | O que fazer |
| --- | --- | --- |
| `"Erro ao testar conexão com o IMAP/SMTP. Verifique os dados da conexão e tente novamente."` | **IMAP/SMTP:** a Kinbox não conseguiu entrar na caixa pelo IMAP. | Conferir **IMAP Host**, **IMAP Porta**, **IMAP Usuário**, **IMAP Senha** e **TLS/SSL**; usar senha de app se o provedor exigir. |
| `"Campo obrigatório"` | Campo obrigatório vazio no formulário. | Preencher o campo. |
| `"description é obrigatório"` | **IMAP/SMTP** enviado sem **Descrição**. | Preencher **Descrição** e conectar de novo. |
| `"Dados inválidos para IMAP/SMPT"` | **IMAP/SMTP** com apenas um dos blocos preenchido. | Preencher os blocos **IMAP** e **SMTP** completos. |
| Mensagem de erro da Microsoft (em inglês) ou `"Erro ao obter token do Outlook"` | **Outlook:** a Microsoft recusou o acesso ou a leitura da Caixa de Entrada. | Conferir **Tenant ID**, **Client ID**, **Client Secret**, **Graph Sender** e se o aplicativo tem permissão para ler, marcar como lido e enviar e-mails na caixa. |
| `"Essa conta já foi adicionada em outro ambiente"` | O endereço já está em um canal ativo de outro workspace ("ambiente", na tela). | Excluir o canal no outro workspace (com acesso lá) e conectar de novo neste. |
| `"Seu plano atual não permite adicionar o novo canal"` | Teste grátis com 3 canais de e-mail ativos (ou assinatura antiga no teto de 10). | Excluir um canal de e-mail ou alterar o plano em [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano). |
| `"Sua assinatura expirou"` | Assinatura vencida a partir do quarto dia após o vencimento. | Regularizar em [Minha assinatura venceu ou o pagamento falhou](/docs/assinatura/assinatura-vencida). |

No **IMAP/SMTP**, apenas a entrada pelo **IMAP** é testada ao conectar; o **SMTP** não é testado na criação e falhas nele só aparecem ao enviar respostas.

## Leitura da caixa por tipo de conexão

| Regra | **Por encaminhamento** | **IMAP/SMTP** | **Outlook** |
| --- | --- | --- | --- |
| **Frequência** | Na chegada (assim que o provedor encaminha; não há leitura periódica). | A cada 2 minutos (uma leitura por vez em cada canal). | A cada 2 minutos (uma leitura por vez em cada canal). |
| **Pasta e recorte** | Apenas o que o provedor encaminhar para o endereço gerado pela Kinbox. | Apenas a pasta de entrada (INBOX), apenas e-mails não lidos, a partir do **dia** da conexão (ou da última reconexão), sem horário — não lidos recebidos mais cedo no mesmo dia também entram. | Apenas a Caixa de Entrada, apenas e-mails não lidos recebidos **no mesmo dia** (a partir da meia-noite do dia da leitura). |
| **Limite e ordem por leitura** | Não se aplica. | Até **50 e-mails** por leitura, dos mais antigos para os mais novos; os demais entram nas leituras seguintes. | Até **20 e-mails** por leitura, dos mais novos para os mais antigos; os demais não lidos do dia entram nas leituras seguintes. |
| **Marcação e comportamento em erro** | — | Marca como lido após importar. Se der erro ao importar, continua não lido e entra na leitura seguinte. | Marca como lido após importar. Ignora e-mails enviados pelo próprio **Graph Sender**. |
| **E-mail lido antes fora da Kinbox** | Entra se o provedor encaminhar. | Não entra. | Não entra. |
| **Status do canal em erro** | Nasce **Conectado** e não muda sozinho. | Nasce **Conectado** e não muda sozinho (erro de leitura não altera o selo). | Nasce **Conectado** e não muda sozinho (erro de leitura não altera o selo). |

## O que entra nas conversas

- **Identificação e cabeçalho (todos os tipos):** cada e-mail recebido vira mensagem na conversa do contato naquele canal; o contato é identificado pelo endereço de e-mail do remetente (com o nome do remetente). O balão na [Caixa de entrada](/docs/conversas/caixa-de-entrada-do-kinbox) mostra **Para:**, **De:** e **Assunto:**.
- **Por encaminhamento:** traz o texto do e-mail (versão HTML ou, sem ela, texto simples, removendo o trecho citado de respostas anteriores do Outlook/Hotmail) e anexos (imagens como imagem e demais arquivos como arquivo). O assunto é guardado com até 150 caracteres. São descartados: e-mails enviados do domínio de envio da Kinbox, e-mails enviados pelo mesmo endereço escrito na **Descrição** (evita repetir mensagens enviadas pela própria Kinbox que retornaram pelo encaminhamento), e-mails sem conteúdo e mensagens enviadas para um endereço que não pertence a nenhum canal ativo.
- **IMAP/SMTP:** traz o texto do e-mail (versão HTML) e os anexos na mesma mensagem.
- **Outlook:** traz apenas o **começo do texto** de cada e-mail (a prévia gerada pela Microsoft, cortada na primeira linha em branco) e anexos de até **10 MB** cada; anexos maiores ficam de fora sem aviso.

## Como as respostas saem e erros no envio

- **Assunto da resposta:** sai com o assunto do e-mail precedido de `"Re: "` (se ainda não começar com isso); sem assunto, sai como `"Notificação Kinbox"`. Em conversas iniciadas pela Kinbox ([Iniciar uma conversa com um contato](/docs/conversas/iniciar-conversa)), usa o **Assunto** digitado, sem `"Re: "` (ao enviar, a tela mostra `"Mensagem enviada para o e-mail"`).
- **Por encaminhamento:** sai de um endereço da Kinbox com o nome `<domínio do seu e-mail> via Kinbox` e o endereço de resposta ("responder para") definido pelo primeiro e-mail escrito na **Descrição** (ou, sem endereço na **Descrição**, o endereço para o qual o contato escreveu). Segue no mesmo fio do e-mail do contato. Sai em texto simples e arquivos vão como link no corpo. Não sai do servidor do provedor nem fica na pasta de enviados dele. Veja [Conectar o e-mail por encaminhamento](/docs/canais/e-mail/por-encaminhamento).
- **IMAP/SMTP:** sai pelo servidor SMTP configurado (**SMTP Host**, **SMTP Porta**, **TLS/SSL**, **SMTP Usuário**), com o endereço para o qual o contato escreveu (ou o endereço do canal) como remetente. **A Kinbox usa a senha informada em IMAP Senha também para enviar**; o valor digitado em **SMTP Senha** não é usado no envio. Se o provedor exigir senhas diferentes para receber e para enviar, as respostas ficam com erro. Antes de cada envio, a Kinbox confere a entrada no SMTP. Sai em texto simples, com arquivos como link, e a Kinbox não grava cópia na pasta de enviados pela conexão IMAP. Veja [Conectar o e-mail por IMAP/SMTP](/docs/canais/e-mail/por-imap).
- **Outlook:** sai pela própria conta do **Graph Sender**, em HTML simples, com arquivos enviados como anexo, e fica salva nos itens enviados da conta. Veja [Conectar o Outlook (Microsoft 365)](/docs/canais/e-mail/outlook).
- **Erros no envio (todos os tipos):** a mensagem fica com o ícone de erro e mostra o motivo ao passar o mouse, precedido de `"#2 Error:"`. No **IMAP/SMTP**, quando o servidor recusa o destinatário, o motivo é `"Erro ao enviar e-mail"` (sem ponto final). No **Outlook**, quando a Microsoft não devolve motivo, é `"Erro ao enviar e-mail."` (com ponto final).

## Acesso do Outlook

Na conexão **Outlook**, a Kinbox guarda o acesso obtido no momento da conexão e não renova esse acesso sozinha. Quando a Microsoft encerra esse acesso, a leitura para e as respostas ficam com erro (com a mensagem da Microsoft), enquanto o canal permanece com status **Conectado**.

Para restabelecer, conecte de novo com os mesmos dados em **Configurações** → **Chat** → **Canais** → **Novo canal** → **E-mail** → **Outlook**, usando o mesmo **Graph Sender**: o mesmo canal é atualizado com acesso novo.

## Mesma conta em outro workspace e no mesmo workspace

- **Em outro workspace:** se o endereço (**IMAP Usuário**, **Graph Sender** ou endereço de encaminhamento) já é canal ativo de outro workspace, a criação falha com `"Essa conta já foi adicionada em outro ambiente"`.
- **No mesmo workspace (IMAP/SMTP e Outlook):** conectar de novo um endereço que já é ou foi canal deste workspace (mesmo após exclusão) reaproveita o mesmo canal, que fica ativo e **Conectado**, com os novos dados e a nova **Descrição**, mantendo as conversas. No **IMAP/SMTP**, a leitura passa a contar a partir do dia da nova conexão.
- **No mesmo workspace (Por encaminhamento):** cada criação gera um endereço de encaminhamento novo em um novo canal.

## Editar, excluir e permissões

- **Identificação na lista:** a linha mostra a **Descrição** em cima (com a primeira letra de cada palavra em maiúscula) e o endereço do canal embaixo (endereço de encaminhamento gerado, **IMAP Usuário** ou **Graph Sender**). A pesquisa da lista encontra pelos dois.
- **Menu da linha:** oferece **Editar**, **Copiar ID** (exibe `"ID do canal (<id>) copiado para clipboard."`) e **Excluir** (confirmação `"Tem certeza que deseja excluir esse canal?"`). Canais de e-mail não têm **Desconectar**, **Reiniciar**, **Recriar** nem **Migrar conversas**.
- **Painel do canal:** salvar grava apenas **Descrição** e eventuais [campos personalizados](/docs/configuracoes-no-workspace/campos-personalizados-no-kinbox) de canal. No **IMAP/SMTP**, os blocos **IMAP** e **SMTP** são somente leitura e a senha não é exibida. No **Por encaminhamento**, **Configurações de Encaminhamento** é somente leitura. No **Outlook**, o painel também exibe **Configurações de Encaminhamento** com o **Graph Sender** e o texto sobre encaminhamento, que não se aplica ao Outlook. Para trocar senha, host, porta ou **Client Secret**, conecte de novo com o mesmo **IMAP Usuário** ou **Graph Sender**.
- **Excluir:** deixa o canal inativo e desconectado sem apagar as conversas. Canais inativos não leem IMAP/Outlook e descartam e-mails encaminhados. No encaminhamento, desligue também o encaminhamento no provedor.
- **Quem pode:** proprietário do workspace ou membro com a permissão **Gerenciar Canais** ([Criar papéis e permissões](/docs/configuracoes-no-workspace/configurar-permissoes-dos-usuarios)). Com a restrição **Somente pode dar manutenção simples em canais**, **Novo canal** e **Excluir** não aparecem.

## Limites do plano

Os três tipos (**Por encaminhamento**, **IMAP/SMTP** e **Outlook**) passam pela mesma checagem de limite, que conta apenas canais de e-mail ativos (excluídos não contam) e roda antes de outras validações — inclusive ao reconectar uma caixa já cadastrada:

- **Teste grátis:** até **3** canais de e-mail ativos. Com 3 canais ativos no teste grátis, nem a reconexão passa.
- **Assinatura paga atual em dia:** sem limite de quantidade de canais de e-mail.
- **Assinatura antiga paga:** até **10** canais de e-mail ativos.
- **Assinatura vencida (a partir do quarto dia):** bloqueada com `"Sua assinatura expirou"`.

Veja [Canais: conectar e gerenciar](/docs/canais/visao-geral) e [Conectar o e-mail: qual opção escolher](/docs/canais/e-mail/visao-geral).

## O que não existe no canal de e-mail

- Tela ou configuração de SPF, DKIM ou outra autenticação de domínio na Kinbox.
- Assinatura de e-mail, cópia (Cc) ou cópia oculta (Cco) ao responder pela tela.
- Opção **Restringir visibilidade** para limitar o canal de e-mail por grupo (ela existe em outros canais; veja [Criar grupos de atendimento](/docs/configuracoes-no-workspace/criar-e-gerenciar-grupos)).
- Importação de e-mails antigos (histórico anterior da caixa).
