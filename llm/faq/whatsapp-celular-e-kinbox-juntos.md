---
title: Posso usar o WhatsApp no celular e na Kinbox ao mesmo tempo?
description: Sim, você pode usar o WhatsApp no celular junto com a Kinbox no QR Code, e as mensagens enviadas pelo celular entram na conversa, mas o celular costuma parar de receber notificações.
keywords: [usar celular junto, whatsapp no celular e na kinbox, notificações pararam no celular, mensagem enviada pelo celular, marcar como lida]
publico: llm
tipo: faq
fontes:
  - api-v0:server/controllers/WaboxController.js
  - api-v0:server/modules/wabox/WaboxEvents.js
  - api-v0:server/modules/wabox/WaboxClient.js
  - wabox:apps/docs/resources/limitations.mdx
codigo:
  - api-v0:server/modules/wabox/WaboxSender.js
  - api-v0:server/modules/wabox/WaboxEvents.js
  - api-v0:server/modules/wabox/WaboxClient.js
  - web:src/pages/settings/channels/whatsapp/EditWhatsApp.tsx
  - wabox:apps/docs/resources/limitations.mdx
  - wabox:apps/engine/internal/wa/whatsmeow/**
verificado_em: 2026-11-26
---

## Pergunta

Posso usar o WhatsApp no celular e na Kinbox ao mesmo tempo?

## Resposta

Sim. No WhatsApp por QR Code (conexão **Express**), você pode continuar usando o WhatsApp no celular enquanto atende pela Kinbox, e as mensagens enviadas pelo celular entram na conversa da Kinbox.

Pontos importantes desse uso conjunto:
- **Exceção de privacidade**: em conversas em que o WhatsApp informa apenas o identificador de privacidade do contato (sem número de telefone), as mensagens enviadas pelo celular não entram na Kinbox.
- **Notificações no celular**: na conexão **Express**, a Kinbox mantém o número online no WhatsApp para exibir se o contato está online; por isso, o celular costuma parar de receber notificações do WhatsApp.
- **Leitura**: a Kinbox não marca automaticamente as mensagens como lidas no celular.
- **Manutenção no celular**: abra o WhatsApp no celular de tempos em tempos para manter o aparelho principal ativo.

Veja todos os detalhes em [O que funciona e o que não funciona no WhatsApp por QR Code](/docs/canais/whatsapp/whatsapp-app/o-que-funciona).

## Variações

- se eu responder pelo celular aparece na kinbox
- posso abrir o whatsapp no telefone com a kinbox conectada
- por que o meu celular parou de tocar notificação do whatsapp depois de conectar na kinbox
- se eu ler a mensagem no celular ela deixa de aparecer na kinbox
- a kinbox marca as mensagens como lidas no celular sozinha
