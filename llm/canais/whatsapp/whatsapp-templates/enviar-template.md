---
title: "Envio de template: lista de aprovados, variáveis por lugar, erros e bordas"
description: Detalhes do envio de templates do WhatsApp oficial na Kinbox, com a origem da lista, como as variáveis são trocadas em cada lugar, mensagens de erro e casos de borda.
keywords: [template não aparece, template aprovado não aparece, variável não trocou, first_name no template, variável na campanha, coluna do arquivo, anexo do cabeçalho, necessário escolher um anexo, número não cadastrado no whatsapp, apenas receptivo template, enviar template api]
publico: llm
tipo: referencia
fontes:
  - web:src/components-old/inbox/NewMessageModal/index.tsx
  - web:src/components-old/inbox/NewMessageModal/NewMessageTemplate.tsx
  - web:src/components-old/inbox/ScheduleMessageModal/index.tsx
  - web:src/pages/crm/campaigns/AddCampaign/CampaingMessageInput.tsx
  - web:src/components-old/forms/ActionsInput/ActionScheduleTemplate.tsx
  - web:src/pages/settings/bot/drawers/EditNodeNotifyDrawer.tsx
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/controllers/CallController.js
  - api:src/modules/messages/v1/messages.public.controller.ts
codigo:
  - web:src/components-old/inbox/NewMessageModal/**
  - web:src/components-old/inbox/ScheduleMessageModal/index.tsx
  - web:src/lib/whatsappTemplateSend.ts
  - web:src/pages/crm/campaigns/AddCampaign/**
  - web:src/components-old/forms/ActionsInput/**
  - web:src/pages/settings/bot/drawers/EditNodeNotifyDrawer.tsx
  - web:src/pages/settings/workflows/entities/conversation/send-message/**
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/controllers/CallController.js
  - api-v0:server/controllers/CampaignController.js
verificado_em: 2026-11-26
---

Detalhes do envio de templates aprovados do WhatsApp oficial. O passo a passo está em [Enviar um template aprovado](/docs/canais/whatsapp/whatsapp-templates/enviar-template).

## Origem da lista de templates aprovados

- Todas as telas de envio consultam na Meta apenas templates com status **Aprovado**, até o limite de **800** modelos por conta do WhatsApp oficial.
- A lista fica guardada em cache por **15 minutos** por canal.
- O cache é limpo ao criar, editar ou excluir um template pela Kinbox e quando a Meta notifica mudança de status. Se a mesma conta do WhatsApp oficial tiver mais de um canal conectado, todos compartilham a mesma lista de templates, mas a limpeza por notificação limpa primeiro um canal — outro canal da mesma conta pode levar até 15 minutos para mostrar um template recém-aprovado.
- Não há filtro por idioma nem por categoria: um template com o mesmo nome em dois idiomas aparece duas vezes apenas pelo nome (em ordem alfabética, com busca por nome).
- O botão de copiar em cada opção do seletor copia `"nome - ID: id"` (`"Copiado para o clipboard"`).
- Erros de carregamento: `"Id é obrigatório"`, `"Canal não encontrado"` (canal inativo ou de outro workspace) e, nos Cenários, `"Não foi possível carregar os modelos deste canal."`.

## Variáveis por lugar de envio

| Lugar | Como preencher | O que é trocado |
| --- | --- | --- |
| Conversa (**Enviar mensagem**), **Agendar mensagem**, automações e bloco **Notificar** do bot | Texto fixo ou chave do contato (digitada manualmente; não há seletor de chaves). | Chaves do contato são trocadas apenas em **Corpo** e **URL** do botão. Em **Cabeçalho**, vai o texto digitado literalmente. |
| Campanha | Texto fixo ou `{{2}}`, `{{3}}`... conforme as colunas do arquivo (`{{1}}` é o número). | Apenas `{{n}}` numérico é trocado (em cabeçalho, corpo e URL). Chaves do contato não são trocadas, mesmo usando a fonte **Contatos** (use o `{{n}}` da coluna escolhida). |
| Cenários | Variáveis do cenário. | Trocadas em todos os campos (cabeçalho, corpo, botões e **URL da mídia**). |
| Agentes de IA | Valor fixo ou preenchimento gerado pela IA. | Preenchido pela configuração da ação do agente. |

- **Chaves do contato aceitas** (no corpo e na URL do botão, fora de campanhas): `{{name}}`, `{{first_name}}`, `{{last_name}}`, `{{email}}`, `{{phone}}`, `{{protocol}}`, `{{operator}}` e a chave de cada campo personalizado. Chave sem valor vira texto vazio.
- **Pré-visualização**: não substitui chaves do contato; apenas na campanha substitui `{{n}}` pelos valores da primeira linha do arquivo.
- **Campos em branco**: a tela não bloqueia campos de variável vazios, mas a Meta pode recusar o envio.
- **Variáveis nomeadas** (por exemplo `{{nome_cliente}}` criadas direto na Meta): não ganham campo de preenchimento na tela de envio.

## Como o template aparece na conversa

- **Template comum**: o balão mostra o anexo do cabeçalho (se houver) e o texto do corpo com as variáveis preenchidas. Cabeçalho de texto, rodapé e botões não aparecem no balão.
- **Template + Flow**: cartão com o texto e o botão do Flow; clicar no botão abre a pré-visualização do Flow.
- **Template + Carrossel**: cartões lado a lado.
- **Erro na Meta**: o balão fica com o ícone de erro; o motivo aparece ao passar o mouse.
- O template entra na conversa do contato naquele canal: na sessão aberta, se houver; se a última sessão estava resolvida, começa uma sessão nova atribuída a quem enviou.

## Bot, cenários e agentes de IA

- **Bot (bloco Notificar)**: escolher um canal oficial em **Do canal** troca o texto livre pelo seletor de template. **Para celular** é opcional ("Incluir código do país e ddd"); em branco, o template vai para o contato que o bot está atendendo. Número inválido: "Digite um celular válido".
- **Cenários (ação Enviar mensagem de conversa)**: com canal oficial é sempre template. Campos: **Modelo de mensagem** (obrigatório), **Cabeçalho** `{{n}}`, **Corpo** `{{n}}`, botões e, para cabeçalho de mídia, **URL da mídia** (obrigatório) e **Nome do arquivo** (documento). A mídia é um link, não um upload. O canal usado é o da conversa referenciada, quando ela tem um. A ação de criar conversa dos Cenários não tem seletor de template.
- **Agentes de IA**: ação **Enviar template WhatsApp** ("O template aprovado é enviado sempre — dentro ou fora da janela de 24h do WhatsApp."), com campos de cabeçalho e corpo fixos ou gerados pela IA; e a opção **Usar template caso conversa expirada** em **Enviar mensagem** e nos follow-ups.
- **Automação Iniciar conversa**: só existe no gatilho **Tempo sem conversa ao criar contato**; com canal oficial em **Canal**, o template aparece no lugar de **Texto** e pode rodar um bot junto.
- **Automação Agendar mensagem template**: **Para quando?** (próximo horário comercial, depois de um tempo, próximo dia da semana e horário), **Canal** (só oficiais) e o template.

## Erros exatos ao enviar

Na janela **Enviar mensagem**, erros por número aparecem sob `"Os seguintes números tiveram erros ao enviar. Verifique se os números estão corretos:"` no formato `"{número} - {erro}"`:

- `"Número de telefone inválido"`
- `"Esse canal não tem permissão para chat ativo"` (canal marcado como **Apenas Receptivo**)
- `"Número não cadastrado no whatsapp"`
- `"Você não tem permissão para realizar chat ativo para conversas em atendimento"`
- `"Você não pode enviar mensagens esse horário"` (restrição **Limitar horário que pode responder**)
- `"Em atendimento"` / `"Em atendimento com {nome}"`
- `"Necessário escolher um anexo"` (cabeçalho de mídia sem arquivo; também no **Agendar mensagem**, na campanha e no bloco **Notificar**)
- `"Escolha um modelo de mensagem"` (no **Agendar mensagem** fora da janela)
- `"Template carrossel sem cards para envio."`
- `"O canal de disparo escolhido está desconectado."` (na campanha)
- `"Digite um celular válido"` (no bloco **Notificar** do bot)
- `"Template não informado para envio de mensagem."` (nos Cenários)

Vários números separados por vírgula na janela **Enviar mensagem**: o limite de 10 números e o aviso de risco de bloqueio valem apenas para WhatsApp por QR Code; no WhatsApp oficial a tela não impõe limite.

## Erros depois do envio

- O erro devolvido pela Meta não volta na resposta imediata da janela **Enviar mensagem**: o aviso de sucesso (`"Mensagem enviada para {nome}..."` ou `"Mensagem enviada para o número {número}"`) aparece normalmente e, se a Meta recusar, o balão da conversa exibe o ícone de erro com o motivo vindo da Meta ao passar o mouse.
- **Template alterado, excluído, pausado ou desativado após ser salvo** em automação, bot, campanha ou agendamento: a Kinbox envia a referência salva sem revalidar o status antes e a Meta recusa a entrega. Apenas o carrossel confere o template aprovado na hora do envio (`"Template aprovado não corresponde ao template informado"`).
- **Falha ao montar o template**: `"Erro ao processar template"`.
- **Erros específicos de carrossel no envio**:
  - `"O carrossel deve possuir entre 2 e 10 cards"`
  - `"Valores do BODY principal não correspondem ao template aprovado"` (variável do corpo principal vazia ou com `{{...}}` sem trocar)
  - `"BODY dinâmico não suportado no card {n}"`
  - `"URL dinâmica não suportada no card {n}"`
  - `"URL de mídia inválida"` (a mídia de cada card precisa ser URL HTTPS pública)

## Cabeçalho de mídia e botões

- **Cabeçalho de mídia**: o tipo de mídia enviado é inferido pela extensão do arquivo anexado, e a tela não bloqueia tipo diferente — anexe sempre o mesmo tipo configurado no cabeçalho do template (imagem, vídeo ou documento). Na **Pré-visualização**, apenas imagem mostra a figura; vídeo e documento exibem ícone padrão.
- **Botões**: apenas o primeiro valor da URL dinâmica de cada botão é enviado à Meta; campos de texto de botão não são enviados.
- **Template + Flow**: não exibe campos extras no envio; a Kinbox gera o token do Flow e envia os dados iniciais do botão automaticamente.

## Campanhas, automações, bot e canal Apenas Receptivo

- **Campanhas**: usa um único canal oficial por campanha. Quando a Meta recusa o disparo de um destinatário, a coluna **Detalhes** exibe o motivo retornado pela Meta ou `"Falha interna ao enviar a mensagem"`. A conversa só é criada quando o contato responde, já trazendo o balão do template disparado.
- **Automações**: nas ações **Agendar mensagem template** e **Iniciar conversa**, use templates sem mídia no cabeçalho. Validações de configuração: `"Informe o template"` e `"Informe a mensagem (ou o template no canal oficial)"`.
- **Bot (bloco Notificar)**: com carrossel exige canal e template (`"Template e canal são obrigatórios para notificação de carrossel"`). O envio registra a nota `"Template [nome] enviado"` na conversa.
- **Canal Apenas Receptivo**: não aparece na lista de canais de **Enviar mensagem** e o envio é recusado com `"Esse canal não tem permissão para chat ativo"`. Em uma conversa desse canal com a janela de 24 horas fechada, não é possível enviar template.
- **Onde não existe seletor de template**: ações de automação **Enviar mensagem** e **Agendar mensagem** (texto) e ação de criar conversa nos Cenários.

## API pública

- `POST /v1/messages/send`: aceita o objeto `template` (`id`, `name`, `language`, `components`, `bodyFields`) para enviar templates em canais de WhatsApp oficial (obrigatório fora da janela de 24 h). Erros: `"Invalid template id"`, `"Templates are only available for official WhatsApp channels"`, `"template.components or message is required"`.
- `GET /v1/channels/{id}/templates`: lista os templates aprovados do canal (cache de 15 minutos).
- Campanhas criadas pela API pública também aceitam `template`.
