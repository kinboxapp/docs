---
title: "Zoho CRM: token, renovação, layouts e limites do quadro"
description: "Regras técnicas do Zoho CRM na Kinbox: troca do código gerado, renovação automática do token, busca por telefone e limites dos formulários."
keywords: [zoho, zoho crm, obter token, refresh token, renovação de token, layout dos leads, layout dos negócios, campos de negócios, campos de data]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/integrations/zoho/**
  - web:src/pages/settings/integrations/zoho/EditZohoSettings.tsx
  - web:src/components-old/chat/side/integrationApps/ZohoApp/index.tsx
  - web:src/components-old/chat/side/integrationApps/ZohoApp/**
  - web:src/components-old/chat/side/integrationApps/ZohoApp/ZohoFieldsSection.tsx
codigo:
  - web:src/pages/settings/integrations/zoho/**
  - web:src/components-old/chat/side/integrationApps/ZohoApp/**
  - web:src/hooks/useSocketV2.ts
verificado_em: 2026-11-26
---

Complemento técnico de [Integrar com o Zoho CRM](/docs/integracoes/zoho).

## Credenciais, token e conta

- **Permissão e conta:** o painel **Zoho** (**Configurações** → **Integrações** → **Apps** → **Zoho CRM**) exige a permissão **Integrações** ou proprietário. Cada workspace mantém apenas uma conta Zoho CRM.
- **Código gerado de uso único:** depois de usar **Obter token**, gerar um token novamente exige criar um código novo no Zoho (a validade do código é definida no próprio Zoho).
- **Falha em Obter token:** quando o código está vencido ou **Client ID** / **Client Secret** estão incorretos, a tela não exibe mensagem de erro — **Refresh Token** permanece vazio e **Configurações** continua desativado (e o botão pode permanecer girando em caso de falha na chamada). Gere um código novo no Zoho e tente **Obter token** novamente.
- **Salvar no painel:** tanto o token retornado por **Obter token** quanto os ajustes de **Configurações** só são gravados quando você clica em **Salvar** no painel **Zoho**.
- **Ambiente do Zoho:** a integração se conecta ao ambiente `.com` do Zoho. Contas do Zoho criadas em outro ambiente (data center) podem não funcionar.
- **ID da Organização:** é enviado na troca do código e usado para montar o link **Ver no Zoho** ao editar um negócio. Sem ele, o link abre incorreto, mas o restante da integração funciona.

## Renovação do token

- **Renovação automática:** quando o acesso ao Zoho expira durante o uso do quadro, a Kinbox tenta renovar o acesso sozinha, sem você precisar fazer nada.
- **Quando a renovação falha** (por exemplo, se o **Client Secret** foi alterado ou o acesso foi revogado no Zoho), o quadro mostra `"Erro ao buscar informações de contato do Zoho."`. Para reconectar: abra **Configurações** → **Integrações** → **Apps** → **Zoho CRM**, gere um código novo no Zoho, cole em **Código gerado**, clique em **Obter token** e depois em **Salvar** (precisa da permissão **Integrações** ou ser o proprietário).

## Regras de busca, formulários e limites

- **Escopo da integração:** o Zoho CRM funciona apenas no quadro **Zoho** da conversa; não existem ações do Zoho CRM no bot nem nas automações. Desligar **Habilitar integração** oculta o quadro (que também não aparece para quem tem a restrição **Esconder informações de integração** nem no modo de treino da Academia) e encerra qualquer uso da conexão.
- **Busca sempre por telefone:** não há opções de **Identificador do contato**, **Obrigatoriedade** ou **Tokens reservas** no Zoho. A busca no quadro usa sempre apenas os dígitos do telefone do contato, procurando primeiro em Leads e depois em Contacts.
- **Mapa de campos de Ajustes do Zoho:** fica salvo no painel, mas não altera o que o quadro envia ao Zoho; o formulário de lead usa só os campos do **Layout dos Leads**.
- **Cartão do negócio:** ao passar o mouse sobre um negócio, aparece o cartão **Negócio Zoho** com **Responsável**, **Valor**, **Funil**, **Etapa**, **Fechamento**, **Criado há** e **Criado por**.
- **Layout dos Leads ausente:** sem **Layout dos Leads** escolhido e salvo em **Configurações**, a gaveta **Adicionar Lead** abre sem campos.
- **Campos omitidos nos formulários:** campos de data (como data de fechamento do negócio), campos de pesquisa (lookup), imagem do lead, campos de layout e campos somente leitura não aparecem nos formulários de lead e de negócio do quadro. Se algum deles for obrigatório no Zoho, faça o preenchimento diretamente no Zoho CRM.
- **Edição de negócio existente:** ao abrir um negócio a partir da lista do quadro, o formulário carrega os dados resumidos da listagem (nome, funil, etapa, fechamento, proprietário e valor); campos extras do layout podem abrir vazios, e clicar em **Salvar** envia apenas o que está preenchido no formulário.
