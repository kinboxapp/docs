---
title: "QR Code e código de conexão: tempos, formato do número e erros"
description: Detalhes da conexão do WhatsApp por QR Code na Kinbox, com tempos do QR, regras do número, código de conexão e mensagens de erro.
keywords: [qr code expirou, código de conexão, número inválido, nono dígito, canal já está ativo, pending_review, criação do canal]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/channels/whatsapp/AddWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/EditWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/WhatsappPairingCode.tsx
  - api-v0:server/controllers/WaboxController.js
  - wabox:apps/docs/webhooks/instance-status.mdx
codigo:
  - web:src/pages/settings/channels/whatsapp/**
  - api-v0:server/controllers/WaboxController.js
  - api-v0:server/modules/wabox/**
  - api-v0:server/controllers/IntegrationsController.js
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/channels/AddChannelWhatsApp.tsx
  - wabox:apps/engine/internal/config/config.go
verificado_em: 2026-11-26
---

Detalhes técnicos de referência da página humana "Conectar o WhatsApp pelo QR Code" (`/docs/canais/conectar-whatsapp-app`).

## Tempos do QR Code e da criação

- **Atualização na tela**: a imagem do QR Code se atualiza sozinha a cada 10 segundos enquanto o canal está em **Necessário ler QR-Code**.
- **Expiração na conexão Express**: o pareamento por QR Code fica ativo por cerca de 13 minutos (5 ciclos de aproximadamente 2 minutos e 40 segundos). Se o QR não for lido nesse prazo, o pareamento é encerrado, o canal passa para **Desconectado** e o QR some. É preciso clicar em **Reiniciar canal** para gerar um novo QR Code.
- **Criação na conexão Clássica**: pode levar até 10 minutos com o status **Criando...** antes de exibir o QR Code.

## Regras do número e código de conexão

- **Formato aceito (Express e código de conexão)**: de 10 a 15 dígitos incluindo o DDI (exemplo: `+55 11 90000-0001`). A Kinbox remove qualquer caractere que não seja dígito antes de validar.
- **Clássica**: a Kinbox só exige que o número seja preenchido; não confere a quantidade de dígitos.
- **DDI e número fixo**: o código não restringe o DDI nem diferencia número fixo de celular; o número precisa ter uma conta de WhatsApp ativa para fazer o pareamento.
- **Nono dígito (Brasil)**: ao gerar o código de conexão (`XXXX-XXXX`), a Kinbox verifica automaticamente se a conta no Brasil está registrada com ou sem o nono dígito e gera o código para o formato correspondente. A conferência pode falhar; nesse caso o código vale para o número como foi digitado. Se o código não funcionar no celular, gere outro (com o número com ou sem o nono dígito) ou conecte pelo QR Code.
- **Pausa do QR durante o código**: enquanto o painel **Conectar com número de telefone** está aberto (disponível somente na **Express**), a tela para de buscar novos QR Codes para não invalidar o código gerado.
- **Número após conectar**: na **Express**, depois de conectado, o campo **Número** é atualizado automaticamente com o número confirmado pelo WhatsApp. O campo **Número** fica bloqueado na tela do canal; para trocar de número, é preciso criar outro canal.

## Mensagens de erro exatas

| Situação | Mensagem exibida |
| --- | --- |
| Número com menos de 10 ou mais de 15 dígitos (Express ou código de conexão) | `"Número inválido"` |
| Gerar código com canal já conectado | `"Este canal já está conectado"` |
| Gerar código fora do status de pareamento | `"Aguarde o canal ficar pronto para pareamento (status qr_code) e tente novamente"` |
| Falha ao gerar código de conexão | `"Não foi possível gerar o código. Tente novamente."` |
| QR Code expira com a tela do canal aberta | `"QRCode expirou, necessário reiniciar o canal."` |
| Tentativa de ler QR enquanto a Clássica ainda cria | `"Seu ambiente está sendo criado, em até 10 minutos ele estará disponível."` |
| Já existe canal ativo com o número (Express) | `"Este canal já está ativo; verifique antes de tentar novamente"` |
| Canal do número em criação ou com criação inconclusiva (Express) | `"Este canal está em processamento ou possui criação inconclusiva; verifique antes de tentar novamente"` |
| Já existe canal ativo com o número (Clássica) | `"Já existe um canal ativo com esse número [ID]"` |

## Número já usado no workspace

- **Canal ativo com o mesmo número**: a criação é bloqueada com as mensagens da tabela acima.
- **Canal excluído com o mesmo número**: criar um novo canal com o mesmo número reaproveita o registro antigo (mesmo ID e conversas anteriores voltam juntas), inclusive quando o canal anterior era **Clássica** e o novo é criado como **Express**.

## Status crus na criação

Se houver falha ou pendência ao criar um canal **Express**, a lista pode mostrar os status crus `pending_review` ou `error` em vermelho. Não existe ação na tela para corrigir esses estados; o membro deve entrar em contato com o suporte informando o ID do canal (**Copiar ID**).

## Depois de clicar em Conectar canal

- A Kinbox mostra "Canal de WhatsApp criado.". Se o painel do canal não abrir sozinho, a pessoa clica no canal na lista para ver o QR Code.
- O painel do canal não tem um título fixo: o título é a descrição do canal, com o selo **v5** na **Express**.

## Nomes da tela em outros layouts

| Layout novo (computador) | Layout antigo (navegador do celular, menos de 768 px, e marcas brancas) |
| --- | --- |
| **API Oficial** | **WhatsApp Cloud API** |
| **Modo QRCode** | **WhatsApp App** |

O nome "WhatsApp App" também aparecia na central de ajuda antiga para o QR Code.
