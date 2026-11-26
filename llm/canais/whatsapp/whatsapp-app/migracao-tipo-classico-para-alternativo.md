---
title: "Conexão Clássica: sincronizar histórico, atualizar e recriar"
description: Regras da conexão Clássica do WhatsApp por QR Code na Kinbox, com sincronizar histórico, atualizar canal, recriar e migrar para a Express.
keywords: [clássica, multidevice, sincronizar histórico, atualizar canal, atualização disponível, recriar, recomendado recriar canal, campanha clássica]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/channels/whatsapp/RecreateWhatsAppConfirm.tsx
  - web:src/pages/settings/channels/whatsapp/EditWhatsApp.tsx
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/controllers
  - web:src/pages/settings/channels/whatsapp/SyncZapHistoryModal.tsx
  - web:src/pages/settings/channels/whatsapp/ChannelVersionUpdate.tsx
codigo:
  - web:src/pages/settings/channels/whatsapp/RecreateWhatsAppConfirm.tsx
  - web:src/pages/settings/channels/whatsapp/EditWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/AddWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/ChannelVersionUpdate.tsx
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/controllers/**
  - web:src/pages/settings/channels/whatsapp/SyncZapHistoryModal.tsx
verificado_em: 2026-11-26
---

Detalhes de referência sobre a conexão **Clássica**, complementares à página humana "Migrar da conexão Clássica para a Express" (`/docs/canais/whatsapp/whatsapp-app/migracao-tipo-classico-para-alternativo`).

## Sincronizar histórico (somente Clássica)

- Disponível apenas em canais **Clássica** com status **Conectado** (não existe na conexão **Express**, onde a opção não aparece e a sincronização é recusada).
- Texto da janela: `"Sincroniza seu histórico de conversas do Whatsapp com o Kinbox. Esse processo pode levar vários minutos."`
- Campos:
  - **Quantidade de conversas** ("Mais recentes"): `10`, `200`, `500` (padrão), `1000`, `2000`, `5000` ou `10000`.
  - **Quantidade de mensagens por conversa**: `20` (padrão) ou `40`.
- Ao clicar em **Sincronizar**, aparece o aviso `"Sincronizando conversas... 0%"`. O processo pode não trazer todo o histórico.

## Atualizar canal (somente Clássica)

- Ao lado do **Status**, a tela exibe **Atualizado** (`"Canal na versão mais recente"`) ou **Atualização disponível** (`"Existe uma versão mais nova do canal disponível"`).
- Quando há atualização, aparece no topo o alerta `"Nova versão do canal disponível."` com o texto `"Atualize para receber as melhorias e correções mais recentes do WhatsApp."` e o botão **Atualizar canal**.
- A confirmação **Atualizar canal?** exibe: `"O canal ficará indisponível por alguns instantes durante a atualização. Talvez seja necessário ler o QR Code novamente para reconectar."` e `"Recomendamos fazer isso fora do horário de pico de atendimento."`, com os botões **Atualizar agora** e **Cancelar**.
- A ação recria o canal mantendo a conexão **Clássica**. Canais **Express** não possuem atualização de versão.

## Recriar na Clássica e migração para Express

- A janela **Por favor, confirme** mostra o texto: `"Tem certeza que deseja recriar esse canal? Esse processo demora até 10 minutos, seu canal ficará indisponível durante esse tempo e você deverá ler o QRCode novamente no final do processo."`
- Só em canais **Clássica** com **Versão** = **Multidevice** a janela traz o seletor **Tipo de conexão** (**Express** marcado por padrão, **Clássica** como opção). Canal com **Versão antiga** não vê o seletor: não dá para passar para a **Express** pelo **Recriar**; orientar a falar com o suporte.
  - **Migrando para Express**: converte o mesmo registro do canal (mesmo ID, conversas e configurações). O ambiente antigo só é desligado depois que a **Express** foi criada. Se a criação falhar, o canal pode ficar como estava ou com o status cru `pending_review`: conferir o status e, se aparecer `pending_review`, falar com o suporte com o ID do canal. Se o selo **v5** não aparecer e a **Versão** continuar **Multidevice**, a troca não aconteceu: tentar de novo ou falar com o suporte. Em seguida, o canal fica **Desconectado** até pedir o novo QR Code.
  - **Recriando como Clássica**: o canal entra em **Criando...** (até 10 minutos) e pede leitura de QR Code novamente.
- Na troca para **Express**, o número salvo no canal precisa ter de 10 a 15 dígitos (com DDI); senão, a troca falha com `"Número inválido"` e o canal continua **Clássica**. Orientar a falar com o suporte.
- Canal **Clássica** sem data de **Última vez recriado** também cai nas verificações por data: mostra **Recomendado recriar canal** e não pode ser usado em campanhas até ser recriado.
- Se o canal ainda estiver em criação ao tentar recriar, exibe: `"Este canal ainda se encontra em processamento. Por favor tente novamente em instantes."`
- **Recriar** não consome uma linha nova do plano.
- Em canais **Express**, **Recriar** apenas reinicia a conexão do número (equivalente a **Reiniciar canal**), não exibe o seletor **Tipo de conexão** e não atualiza a data de **Última vez recriado**.
- "Alternativa" / "Alternativo" era o nome antigo da conexão **Express**.

## Recomendado recriar canal e `recreate_required`

- Canais **Clássica** criados ou recriados pela última vez antes de 09/01/2023 (data de **Última vez recriado**) exibem **Recomendado recriar canal** na lista.
- Quando o canal exige recriação (`recreate_required`), tentar **Reiniciar canal** exibe `"Necessário recriar o canal para reiniciar"` (na tela do canal) ou `"Necessário recriar o canal e ler o QRcode para reiniciar"` (na lista de canais).

## Campanhas com Clássica antiga

- Canais **Clássica** com **Versão** **Multidevice** criados ou recriados pela última vez até 27/01/2024 (data de **Última vez recriado**), ou sem essa data, não podem ser usados em campanhas; a tela exibe `"Necessário recriar esse canal para usar as campanhas."`
- Campanhas com vários canais de QR Code exigem que todos sejam do mesmo tipo (todos **Express** ou todos **Clássica** com **Versão** **Multidevice**).

## Voltar da Express para a Clássica

- Não existe pelo **Recriar** (o seletor não aparece em canais **Express**).
- Contorno que o código permite: excluir o canal e criar de novo com o mesmo número escolhendo **Clássica** em **Opções avançadas**. O canal volta com o mesmo ID e as conversas, mas:
  - excluir um canal **Express** tira o canal de todos os bots; é preciso ligar o canal aos bots de novo;
  - o número fica sem enviar e receber pela Kinbox até ler o QR Code (até 10 minutos de **Criando...** na **Clássica**).
- A Kinbox recomenda a **Express**; não sugerir o contorno sem a pessoa pedir.
