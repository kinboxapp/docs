---
title: O canal aparece conectado, mas as mensagens não chegam
description: Não existe uma causa única; pode ser bloqueio silencioso ou erro no número de destino no envio, ou grupo desmarcado, tipo ignorado ou arquivo acima de 25 MB no recebimento.
keywords: [mensagens não chegam, canal conectado não recebe, canal conectado não envia, um tique só, bloqueio silencioso, arquivo não chega, 25 mb, grupo não aparece]
publico: llm
tipo: faq
fontes:
  - api-v0:server/modules/wabox/WaboxEvents.js
  - web:src/pages/settings/channels/whatsapp/EditWhatsApp.tsx
  - wabox:apps/docs/guides/best-practices.mdx
codigo:
  - web:src/pages/settings/channels/whatsapp/**
  - api-v0:server/controllers/WaboxController.js
  - api-v0:server/modules/wabox/**
  - api-v0:server/controllers/IntegrationsController.js
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/inbox/Conversations/index.tsx
  - wabox:apps/docs/webhooks/instance-status.mdx
verificado_em: 2026-11-26
---

## Pergunta

O canal aparece conectado, mas as mensagens não chegam

## Resposta

Não há uma única causa: mesmo com o canal **Conectado**, o motivo varia conforme as mensagens estejam falhando no **envio** ou deixando de aparecer no **recebimento**.

- **Mensagens que você envia e não chegam:**
  - **Sinais de bloqueio silencioso**: mensagens ficam só com um tique (enviadas sem entrega), há queda de respostas ou aumentam os bloqueios. Nesse caso, interrompa disparos em massa e deixe o número descansar por alguns dias (veja [Como evitar que o número seja bloqueado](/docs/canais/whatsapp/whatsapp-app/como-nao-ter-numero-bloqueado-whatsapp)).
  - **Número sem WhatsApp ou envio não permitido**: passe o mouse sobre o erro da mensagem para verificar códigos como `phone_not_on_whatsapp` (número sem conta de WhatsApp), `not_allowed` (o WhatsApp recusou o envio por falta de permissão), `media_invalid` (arquivo acima do limite ou inválido) ou `send_timeout` (o WhatsApp não confirmou a tempo; a mensagem pode ter saído).
- **Mensagens que o contato envia e não aparecem na Kinbox:**
  - **Conversa de grupo**: por padrão, a Kinbox ignora grupos até você marcar o grupo em **Permitir Grupos de WhatsApp**.
  - **Tipo ignorado**: status (stories), canais (newsletters), avisos do WhatsApp (incluindo chamadas) e cabeçalho de álbum não entram na Kinbox.
  - **Arquivo maior que 25 MB**: na conexão **Express**, arquivos recebidos acima de 25 MB falham no download e a mensagem inteira (incluindo legenda) não chega na Kinbox, sem aviso na conversa.
  - **Mensagem enviada pelo celular em conversa só com identificador de privacidade**: quando o WhatsApp não informa o número do contato, mensagens enviadas pelo celular nessa conversa são descartadas.

Se o canal também alternar para fora do ar ou mostrar avisos de conexão, veja [Meu WhatsApp desconectou](/docs/canais/whatsapp/whatsapp-app/como-evitar-que-o-celular-desconecte) e [O que funciona e o que não funciona no WhatsApp QR Code](/docs/canais/whatsapp/whatsapp-app/o-que-funciona).

## Variações

- meu whatsapp está conectado mas não recebe mensagem
- mando mensagem pela kinbox e fica só com um tique
- cliente enviou um arquivo grande no whatsapp e não apareceu
- por que algumas mensagens do whatsapp não entram na kinbox
- canal verde conectado mas o cliente não recebe minhas mensagens
- mensagem enviada pelo whatsapp está dando erro mesmo conectado
