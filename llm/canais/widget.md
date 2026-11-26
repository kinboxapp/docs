---
title: "Widget: arquivos enviados pelo visitante (tamanho, tipos, limite por minuto) e erros"
description: Regras do chat do site da Kinbox para o visitante, com limites e tipos de arquivo, mensagens de erro, formulário e contato, horário Online, conversa guardada no navegador, campanha, eventos do Google Tag Manager e mensagens do console.
keywords: [widget arquivo, tamanho máximo widget, 10 mb, tipos de arquivo aceitos, arquivo muito grande, tipo de arquivo não permitido, visitante, formulário pré-chat, telefone inválido, informe o telefone, online, relógio do visitante, utm, campanha, google tag manager, datalayer, kinboxevent, openwidget, domain not allowed, widget not found, kinbox license not found]
publico: llm
tipo: referencia
fontes:
  - api:src/modules/channels/widget/widget-upload.constants.ts
  - api:src/modules/channels/widget/widget.controller.ts
  - api:src/modules/channels/widget/widget.service.ts
  - widget:src/upload.ts
  - widget:src/widget.ts
  - widget:src/hooks/useCampaignTracker.ts
codigo:
  - api:src/modules/channels/widget/**
  - api:src/modules/contacts/contacts.repository.ts
  - widget:src/**
  - web:src/pages/settings/widget/**
  - web:src/pages/settings/channels/widget/**
  - api-v0:server/controllers/WidgetController.js
verificado_em: 2026-11-26
---

Detalhes de referência da página humana [Instalar o chat no seu site](/docs/canais/widget).

## Arquivos enviados pelo visitante

- **Tamanho máximo e quantidade:** até 10 MB por arquivo, um arquivo por vez.
- **Como enviar:** pelo botão de clipe ("Enviar imagem ou arquivo") ou colando no campo de mensagem. O botão de clipe fica desativado enquanto um arquivo está sendo enviado ou quando o chat está sem conexão.
- **Áudio:** o visitante não grava áudio no chat do site (não há gravador de áudio no widget).
- **Tipos aceitos:**
  - Imagem: `jpg`, `jpeg`, `png`, `gif`, `webp`.
  - Vídeo: `mp4`.
  - Arquivo: `pdf`, `doc`, `docx`, `xls`, `xlsx`, `ppt`, `pptx`, `txt`, `csv`, `zip`.
- **Verificação de conteúdo:** o conteúdo do arquivo precisa corresponder à extensão (um arquivo apenas renomeado é recusado).
- **Limite por minuto:** até 20 envios de arquivo por minuto a partir do mesmo endereço de internet.

| Mensagem exibida ao visitante | Quando aparece |
| --- | --- |
| `"Arquivo muito grande. O limite é 10 MB."` | O arquivo ultrapassa 10 MB. |
| `"Tipo de arquivo não permitido. Envie imagens, PDF, documentos, planilhas, vídeo MP4 ou ZIP."` | A extensão não está na lista aceita. |
| `"Não foi possível enviar o arquivo. Verifique sua conexão e tente novamente."` | Falha de conexão durante o envio. |
| `"Não foi possível enviar o arquivo. Tente novamente."` | Demais falhas de envio, inclusive ao passar de 20 envios por minuto do mesmo endereço de internet ou quando o conteúdo não bate com a extensão. |

No campo de texto (`"Digite sua mensagem..."`), **Enter** envia, **Shift+Enter** pula linha e há seletor de emojis. Uma mensagem que não sai exibe `"Erro ao enviar"`.

## O que o membro manda e como aparece

- **Tipos exibidos ao visitante:** texto, imagem (abre ao clicar), vídeo, áudio e arquivo (exibe nome e tamanho e abre ao clicar). O membro pode gravar áudio na conversa do widget.
- **Formatação de texto:** suporta `*negrito*`, `_itálico_` e `~riscado~` quando a mensagem não contém link; links ficam clicáveis.
- **Menus do bot:** aparecem como botões clicáveis enquanto o menu for a última mensagem da conversa (o texto também traz as opções numeradas). Clicar em uma opção envia o nome dela como mensagem do visitante (veja [Blocos do bot](/docs/bot/blocos-do-bot)).
- **Chat fechado:** quando chega uma resposta com a janela fechada, o botão mostra a quantidade de não lidas e toca som se **Habilitar sons** estiver ligado ([Configurações do widget](/docs/canais/widget/configuracoes)).
- **Iniciar conversa:** o widget não aparece em **Canal** de [Iniciar uma conversa com um contato](/docs/conversas/iniciar-conversa); a conversa começa quando o visitante escreve ou envia o formulário com mensagem automática ligada.

## Topo do chat

- **Nome:** exibe o nome e sobrenome do último membro que respondeu. Antes da primeira resposta, exibe o **Nome de exibição**; se vazio, exibe `"Suporte"`.
- **Foto:** com **Mostrar avatares dos membros** ligado, exibe a foto do último membro que respondeu; desligado (ou antes de um membro responder), exibe a foto do widget (a imagem de **Usar imagem personalizada** ou a foto do workspace copiada na criação).
- **Status:** exibe `"Online"` com bolinha verde somente quando **Habilitar horário comercial** está ligado, há um horário em **Selecione o horário** e o horário atual está dentro da faixa, comparado de minuto em minuto pelo **relógio do aparelho do visitante** (sem fuso horário próprio). Em qualquer outro caso, exibe a **Mensagem de fora do expediente**.
- **Atendimento fora do horário:** o horário comercial muda apenas o cabeçalho e não fecha o chat; o visitante continua podendo enviar mensagens.
- **Descrição do time:** aparece abaixo do status.
- **Pré-visualização:** com **Habilitar horário comercial** ligado, a **Pré-visualização** mostra `"Online"` independentemente do horário.

## Mensagem inicial

- Exibida na janela do visitante quando ele abre o chat, uma mensagem por vez, com efeito de "digitando" na primeira vez na página.
- Aparece somente para o visitante e não entra na conversa da Kinbox.
- Quando o formulário pré-chat tem campos, a mensagem inicial aparece depois que o visitante clica em **Iniciar**.

## Formulário e contato

- **Quando aparece:** quando há campos em **Formulário** ([Personalizar a aparência, os textos e o formulário do widget](/docs/canais/widget/personalizar)), o visitante ainda não trocou mensagens e ainda não enviou o formulário naquele navegador. Sem campos, o chat abre direto.
- **Validação dos campos:** exibe **Descrição**, os campos na ordem configurada e o botão **Iniciar**. Campos obrigatórios e o formato de **E-mail** são cobrados pelo navegador. No campo **Celular** (seletor de país com Brasil por padrão):
  - `"Informe o telefone"`: campo obrigatório deixado vazio.
  - `"Telefone inválido"`: número do Brasil com menos de 10 dígitos depois de `+55`, ou número de outro país com menos de 6 dígitos.
- **Casamento e criação de contato:** a Kinbox procura um contato com o mesmo e-mail ou celular. Se achar, usa esse contato e preenche apenas os campos que estiverem vazios nele (não substitui nome, e-mail, telefone nem campos já preenchidos). Se não achar, cria um novo contato. Visitantes sem nome aparecem na **Caixa de entrada** como `"Visitante #<número>"`.
- **Campos personalizados:** campos personalizados de **contato** vão para o contato; campos personalizados de **sessão** vão para a sessão junto com a primeira mensagem.
- **Mensagem automática:** com **Enviar mensagem automática ao enviar o formulário** ligado, o widget envia a **Mensagem** em nome do visitante logo após **Iniciar**; a conversa é criada na Kinbox imediatamente e o [bot](/docs/bot/aprender-a-usar-o-bot) do canal já pode atender. Sem ela, a conversa só nasce quando o visitante escreve.

## Conversa guardada no navegador

- A conversa fica guardada no navegador do visitante, separada por widget e por site.
- Ao voltar ao site no mesmo navegador, o visitante vê as 20 mensagens mais recentes e pode rolar para cima para carregar mais.
- Outro navegador, outro aparelho, janela anônima ou limpar os dados do navegador inicia uma conversa nova.
- O chat não envia e-mail nem notificações fora do site para avisar o visitante sobre respostas.
- **Esc** fecha a janela do chat. Em telas com menos de 768 px de largura, o chat aberto ocupa a tela toda.

## Mensagens do console do navegador

Quando o chat não carrega no site, o console do navegador (ferramentas de desenvolvedor) pode mostrar uma destas mensagens (veja [O chat não aparece no meu site](/docs/canais/widget/problemas-comuns)):

| Mensagem no console | Causa | O que fazer |
| --- | --- | --- |
| `"Kinbox license not found"` | O código colado no site está sem a identificação do widget. | Copie o código completo em **Instalação** → **Copiar código** e cole antes de `</body>`. |
| `"Widget not found"` | O widget foi excluído ou o código tem uma identificação inválida. | Abra um widget ativo (ou crie um novo), copie o código e substitua no site. |
| `"Domain not allowed"` | **Restringir domínio** está ligado e o endereço exato do site não está na lista (ou a lista está vazia). | Cadastre o endereço exato (protocolo + domínio + porta, se houver, sem barra no fim e sem caminho; `www` e sem `www` contam separado) ou desligue **Restringir domínio**. |
| `"Kinbox license is invalid or not found"` | Não foi possível carregar as configurações do widget. | Confirme se o widget existe no workspace, copie o código em **Instalação** e substitua no site. |

Quando **Mostrar widget no celular** está desligado e a tela tem menos de 768 px de largura, o chat não aparece e nenhuma mensagem é exibida no console.

## Campanha

- **No chat do site:** sempre ligado, sem opção na tela. O chat captura os parâmetros de campanha da URL da página (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `utm_id`, `gclid`, `gbraid`, `wbraid`, `gad_source`, `gad_campaignid`, `fbclid`, `meta_campaign_id`, `meta_adset_id`, `meta_ad_id`, `campaign_id`, `adset_id`, `ad_id`, `placement` e outros da mesma família) e envia com a próxima mensagem do visitante, registrando-os como origem da sessão e no contato. O parâmetro `fbclid` sozinho não conta como campanha.
- **No balão de WhatsApp:** depende de **Capturar informações de campanha** em **Habilitar balão de WhatsApp** ([Configurações do widget](/docs/canais/widget/configuracoes)). Quando a página abre com parâmetros de campanha na URL, o link leva informações da página; com **Enviar código de rastreio na mensagem** também marcado, o clique registra a campanha e acrescenta `(ref: ...)` no fim do **Texto padrão**. Sem parâmetros na URL, o link do WhatsApp abre normalmente, sem código.

## Eventos para o Google Tag Manager

Em sites que usam Google Tag Manager, o widget envia ao `dataLayer` o evento `KinboxEvent` com os seguintes valores de `eventCategory`:

| `eventCategory` | Quando é disparado |
| --- | --- |
| `kinbox:widget:open` | O visitante abriu o chat. |
| `kinbox:widget:close` | O visitante fechou o chat. |
| `kinbox:widget:whatsapp` | O visitante clicou no balão de WhatsApp. |
| `kinbox:widget:form-submit` | O visitante enviou o formulário pré-chat. |

## Abrir o chat por um botão do site

Para abrir o chat a partir de um botão ou link do próprio site (em conjunto com **Esconder botão do widget**), chame `window.openWidget()` na página.

## Criar, salvar e excluir

- **Criar widget:** campo **Nome** vazio mostra `"Campo obrigatório"`. Erros possíveis na criação: `"Informe o nome do widget"`, `"Não foi possível criar o canal do widget"` e `"Não foi possível criar o widget"`. Sucesso: `"Widget criado."`. Um workspace pode ter vários widgets, sem limite de quantidade e sem cobrança no plano.
- **Salvar:** **Salvar mudanças** mostra `"Configurações salvas"`; **Cancelar** desfaz alterações não salvas. No computador, sair com mudanças pendentes pergunta `"Você tem mudanças não salvas, tem certeza que deseja sair?"` (no celular não pergunta). Campos vazios que impedem salvar (aviso `"Obrigatório."`): **Mensagem inicial** vazia, nome de campo do formulário vazio e **Mensagem** da mensagem automática quando ligada. Mudanças salvas passam a valer no site ao abrir ou recarregar a página.
- **Renomear e copiar ID:** salvar o novo nome exibe `"Nome atualizado"`. **Copiar ID** exibe `"ID do canal (<id>) copiado para clipboard."`.
- **Excluir:** pede confirmação `"Tem certeza que deseja excluir esse canal?"` e exibe `"Excluído."`. Desativa o canal e apaga as configurações do widget: o chat sai de todos os sites com aquele código, as conversas não são apagadas e não é possível recuperar o widget excluído (um novo widget gera um código novo).
- **Permissões:** exige **Gerenciar Canais** ou ser o proprietário do workspace ([Referência de permissões](/docs/administracao/referencia-de-permissoes)). A restrição **Não pode gerenciar widget.** esconde o cartão **Widget**, os widgets da lista e a tela do widget; **Somente pode dar manutenção simples em canais** esconde **Novo canal** e **Excluir**.
