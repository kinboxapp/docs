---
title: "HubSpot: regras de busca, ajustes, bot e automações"
description: "Regras técnicas do HubSpot na Kinbox: OAuth do app nos fluxos, modos de identificador, Mapa de campos, Tokens reservas, busca por telefone, ações do bot, automações e limites."
keywords: [hubspot, identificador do contato, campo de sincronização, mapa de campos, tokens reservas, utm hubspot, consulta contato hubspot, consulta negócio hubspot, automação hubspot, itens de linha]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/integrations/hubspot/**
  - web:src/pages/settings/integrations/hubspot/EditHubspotSettings.tsx
  - web:src/components-old/chat/side/integrationApps/HubspotApp/**
  - web:src/components-old/chat/side/integrationApps/HubspotApp/modals/AddDealModal.tsx
  - api-v0:server/controllers/**
  - api-v0:server/services/HubSpotGeneralService.js
  - api-v0:server/modules/chat/**
  - api-v0:server/controllers/AutomationEventsController.js
codigo:
  - web:src/pages/settings/integrations/hubspot/**
  - web:src/components-old/chat/side/integrationApps/HubspotApp/**
  - web:src/pages/settings/bot/drawers/integration/CreateOrUpdateObjectHubspot.tsx
  - web:src/pages/settings/bot/drawers/integration/ConsultaDealHubspot.tsx
  - web:src/components-old/forms/ActionsInput/ActionIntegrations.tsx
  - api-v0:server/modules/**
  - api-v0:server/services/HubSpotGeneralService.js
  - api-v0:server/controllers/**
  - api-v0:server/modules/chat/**
  - api-v0:server/controllers/AutomationEventsController.js
verificado_em: 2026-11-26
---

Complemento técnico de [Integrar com o HubSpot](/docs/integracoes/hubspot).

## Token, Instalar App no Hubspot e Habilitar integração

- **Token obrigatório:** tudo o que a integração faz no HubSpot (quadro da conversa, **Ajustes do Hubspot**, bot, automações e ações dos fluxos de trabalho do HubSpot) depende do **Token** configurado no painel **Hubspot** (**Configurações** → **Integrações** → **Apps** → **Hubspot**, exige permissão **Integrações** ou proprietário).
- **O que Instalar App no Hubspot faz:** grava apenas o número do portal na integração HubSpot do workspace (criando uma integração desligada se ainda não existir) para que o app da Kinbox apareça nos fluxos de trabalho do HubSpot. Ele não guarda nem usa token OAuth e **não substitui o Token**.
- **Ações nos fluxos de trabalho do HubSpot:** permitem executar um bot, atribuir atendimento (membro, grupo ou regra de atribuição), adicionar tag e resolver a conversa, e criar ou atualizar o contato na Kinbox a partir do contato do HubSpot. Essas ações usam o **Token** do painel para ler o contato ou o negócio no HubSpot e exigem que o contato do HubSpot tenha telefone. As listas de opções (bots, canais, membros, grupos, regras e tags) trazem `"- Nenhum -"` no topo. O contato criado ou atualizado por essas ações aparece na Kinbox alguns segundos depois.
- **Efeito de desligar Habilitar integração:** esconde o quadro **Hubspot** nas conversas (que também não aparece para quem tem a restrição **Esconder informações de integração** nem no modo de treino da Academia). Bot, automações e ações dos fluxos de trabalho do HubSpot continuam usando o **Token** salvo mesmo com **Habilitar integração** desligado; para pará-los, retire essas ações dos bots, das automações e dos fluxos do HubSpot (o painel não salva sem o **Token**).
- **Salvar ajustes:** clicar em **Salvar** em **Ajustes do Hubspot** só devolve os valores ao painel principal; é obrigatório clicar em **Salvar** no painel **Hubspot** para gravar.

## Ajustes do Hubspot

- **Campos de Formulário do Contato:** lista todas as propriedades de contato do HubSpot, menos nome e sobrenome (que o formulário já tem).
- **Campos de Formulário do Negócio:** lista as propriedades de negócio editáveis, menos nome e valor; funil, etapa e responsável já fazem parte do formulário.
- **Obrigatoriedade:** cada linha liga uma etapa (**Selecione uma etapa**, no formato "Funil - Etapa") a um campo (**Selecione um campo de negócio**, entre os escolhidos em **Campos de Formulário do Negócio**); clique em **Add** para mais linhas.
- **Mapa de campos:** botão **Campo** para escolher campos personalizados de contato ou de sessão da Kinbox e ligar cada um a uma propriedade em **Selecione um campo do Hubspot**.

## Identificador do contato e busca

| Modo em **Identificador do contato** | Como o quadro busca o contato no HubSpot | Regras |
| --- | --- | --- |
| **Celular** *(padrão)* | 1) Abre pelo ID do HubSpot já salvo no contato da Kinbox; 2) se não houver ou se o ID não existir mais no HubSpot (mesclado/excluído), busca pelo telefone e salva o ID encontrado. | Tolera o nono dígito em celulares brasileiros (12 ou 13 dígitos). Com duplicados no HubSpot, escolhe o modificado mais recentemente. Libera o botão **Trocar contato vinculado**. |
| **Id do contato do Hubspot** | Busca pelo ID armazenado no campo personalizado escolhido em **Campo de sincronização**. | Ao criar contato pelo quadro, o ID criado é gravado nesse campo. Sem o campo configurado, exibe `"Campo personalizado de sincronização com Hubspot não encontrado"`. |
| **Campo personalizado** | Busca no HubSpot o contato cuja propriedade mapeada para o **Campo de sincronização** (em **Mapa de campos**) tem o mesmo valor. | Exige que o campo esteja mapeado em **Mapa de campos** (sem o mapa, nada é encontrado). Nesse modo, o contato ainda precisa ter telefone. |

## Mapa de campos, UTMs, Tokens reservas e cache

- **Usos do Mapa de campos:**
  - **Quadro da conversa:** pré-preenche o formulário **Adicionar Contato** quando a propriedade do HubSpot também está selecionada em **Campos de Formulário do Contato**.
  - **Bot (`Consulta contato no HubSpot`):** envia os valores mapeados ao criar ou atualizar o contato no HubSpot.
  - **Fluxos de trabalho do HubSpot:** caminho inverso — propriedades do HubSpot preenchem os campos personalizados mapeados na Kinbox.
  - **Identificador por Campo personalizado:** define qual propriedade do HubSpot corresponde ao **Campo de sincronização**.
- **Parâmetros de anúncio (UTM / gclid):** se propriedades com os nomes internos `utm_source`, `utm_campaign`, `utm_medium`, `utm_term`, `utm_content`, `gclid` (e afins) existirem no HubSpot e estiverem em **Campos de Formulário do Contato**, o formulário **Adicionar Contato** já vem preenchido com a origem do anúncio da conversa.
- **Tokens reservas:**
  - **No bot, nas automações e nas ações de fluxo de trabalho:** quando há tokens cadastrados em **Tokens reservas**, cada chamada sorteia **apenas entre os tokens reservas** e deixa de usar o **Token** principal.
  - **No quadro da conversa:** usa sempre o **Token** principal (os tokens reservas não são usados no quadro).
  - **Um token por campo:** coloque um único token em **Token** e em cada linha de **Tokens reservas**. Vários tokens separados por vírgula no campo **Token** só funcionam no quadro; no bot, nas automações e nos fluxos de trabalho o campo é usado inteiro e as chamadas falham.
- **Cache de propriedades nos ajustes:** a lista de campos do HubSpot carregada em **Ajustes do Hubspot** fica em cache até recarregar a página do navegador. Propriedades recém-criadas no HubSpot só aparecem após recarregar o navegador.

## Ações no bot

Disponíveis no bloco **Integração**, grupo **Outros** (veja [Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot); puladas na simulação):

- **Consulta contato no HubSpot:** tem a opção **Não sobrescrever nome do contato no Hubspot**. Procura pelo ID já guardado ou por e-mail/telefone (até 3 tentativas). Se não existir, cria com status de lead `"NEW"`, nome dividido em nome e sobrenome e, como responsável, o usuário do HubSpot com o mesmo e-mail do membro atribuído; se existir, atualiza. Envia os campos do **Mapa de campos**, envia telefones brasileiros com `+55` (celulares com o nono dígito; telefones fixos sem ele) e grava mensagem de sistema na conversa (`"Contato criado no Hubspot"`, `"Contato atualizado no Hubspot"` ou `"Erro ao criar contato no Hubspot -> …"`). Sem e-mail e sem telefone, não faz nada.
- **Consulta negócio no HubSpot:** pede **Funil de vendas** e **Etapa do funil**. Consulta negócios abertos do contato; se não encontrar, cria um novo negócio na etapa escolhida; se encontrar, não faz nada.
- **Atualiza negócio no HubSpot:** pede **Funil de vendas** e **Etapa do funil** para atualizar o negócio.
- **Cria ou atualiza Objeto no HubSpot:** pede **Objeto**, **Campo customizado do ID do objeto** e **Mapa de campos** (oferece **Nome**, **E-mail**, **Data criação da sessão**, **Data fim da sessão**, **Atendente da sessão** e campos personalizados).

## Ações nas automações

Na ação **Integração** das automações:

- **Mudar etapa do negócio no Hubspot:** a opção aparece na lista, mas não altera a etapa do negócio. Para mudar a etapa, use a ação do bot **Atualiza negócio no HubSpot**.
- **Atualizar responsável do negócio:** campo **Novo responsável** (vazio usa o responsável atual da conversa). Altera o responsável do negócio aberto do contato e registra `"Proprietário atualizado no Hubspot"`.
- **Salvar mensagens no negócio do Hubspot** e **Salvar mensagens no contato do Hubspot:** gravam até 50 mensagens da conversa como nota no negócio aberto ou no contato, no formato `DD/MM/AAAA HH:mm - (Operador) Nome: texto` (mensagens do contato com `(Cliente)` e automáticas com `(Sistema)`; só mensagens de texto), e registram `"Salvando anotações no Hubspot"`. Só gravam no HubSpot se o contato da Kinbox já tiver um ID de contato do HubSpot vinculado (sem vínculo, nada é gravado no HubSpot, embora a mensagem apareça na conversa).

## Limites e casos de borda do quadro

- **Negócios exibidos:** o quadro mostra todos os negócios associados ao contato (abertos e fechados).
- **Erros da API do HubSpot:** aparecem como aviso com prefixo `"Hubspot"` seguido da mensagem original do HubSpot em inglês.
- **Contato já existente ao criar:** se o contato já existir no HubSpot (por exemplo, mesmo e-mail), o HubSpot recusa a criação, o aviso aparece e o quadro não vincula o contato automaticamente. Use **Trocar contato vinculado** (no modo **Celular**) para ligar ao contato existente.
- **Itens de linha ao editar negócio:** nos itens já salvos, **Preço** e **Quantidade** ficam desativados. Para trocar um item, exclua-o e adicione outro: excluir pede "Tem certeza que deseja excluir esse item de linha? Não poderá desfazer.", vale na hora e avisa "Item de linha excluído.".
- **Limites de listagem:** funis e produtos listam até 99 itens; propriedades de objeto no bot listam até 999 itens; a lista de **Responsável** traz todos os usuários do HubSpot.
- **Ver no Hubspot:** só abre o negócio certo ao editar um negócio já salvo; na criação, o link ainda não aponta para um negócio.
- **Cartão do negócio:** ao passar o mouse sobre um negócio da lista, aparece o cartão **Negócio** com **Status** (**Ganho**, **Perdido** ou **Aberto**), **Responsável**, **Valor**, **Funil**, **Etapa** e **Criado há**.
- **Criar Contato desativado:** o botão fica desativado com a dica "Contato não possui número de telefone" quando o contato não tem telefone. A janela **Adicionar Contato** envia junto o telefone e o e-mail do contato.
- **Trocar contato vinculado:** busca contatos do HubSpot por nome, e-mail ou telefone (até 20 resultados), marca o atual como **Vinculado** e grava a escolha com **Vincular** no contato da Kinbox. Só aparece no modo **Celular**.
- **Responsável sugerido:** ao criar um negócio, **Responsável** vem preenchido com o usuário do HubSpot que tem o mesmo e-mail do membro logado. O quadro recarrega cerca de 5 segundos depois de salvar.
- **Obrigatoriedade:** as regras configuradas em **Obrigatoriedade** valem apenas no formulário de negócio do quadro da conversa (não no HubSpot nem no bot).
