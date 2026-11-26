---
title: Posso receber ligações de telefone (VoIP) na Kinbox?
description: Não, o VoIP da Kinbox apenas faz ligações para o telefone do contato; para receber ligações na Kinbox, use as ligações pelo WhatsApp oficial (Beta).
keywords: [receber ligação voip, atender telefone na kinbox, número voip kinbox, telefone receptivo, ligação recebida telefone, voip recebe chamada]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/voip/index.tsx
  - web:src/pages/settings/channels/AddChannel.tsx
  - api:src/modules/voip/voip.service.ts
  - api:src/modules/whatsapp-calling/whatsapp-calling.service.ts
codigo:
  - web:src/components/whatsappCall/CallContactButton.tsx
  - web:src/components-old/chat/side/DetailsTitle.tsx
  - web:src/pages/settings/channels/voip/**
  - web:src/pages/inbox/MessageVoipCall.tsx
  - api:src/modules/voip/**
verificado_em: 2026-11-26
---

## Pergunta

Posso receber ligações de telefone (VoIP) na Kinbox?

## Resposta

Não. A Kinbox não tem recebimento de ligações por telefone (VoIP) nem oferece um número VoIP para o contato ligar — o VoIP da Kinbox apenas **faz** ligações do navegador para o telefone fixo ou celular do contato (usando saldo da carteira e a permissão **Pode ligar para o contato** ou proprietário).

- **Alternativa:** para receber e atender ligações na Kinbox pelo navegador, use as ligações pelo **WhatsApp oficial** — um recurso em teste (**Beta**) que funciona apenas em canal de WhatsApp oficial sem coexistência, exige o plano **Ligações WhatsApp** e franquia ou saldo, e toca apenas para quem tem a permissão **Responder** (ou é proprietário), está online e disponível (interruptor **Disponível** ligado; veja [Ficar disponível ou indisponível](/docs/conta/disponibilidade)) e fora de outra ligação.
- **WhatsApp por QR Code:** canais por QR Code não fazem nem recebem ligações na Kinbox (veja [O que funciona e o que não funciona no WhatsApp por QR Code](/docs/canais/whatsapp/whatsapp-app/o-que-funciona)).

Veja mais em [Ligar para um contato por telefone (VoIP)](/docs/canais/ligacoes/ligar-por-telefone) e [Fazer e receber ligações pelo WhatsApp oficial (Beta)](/docs/canais/whatsapp/whatsapp-cloud-api/ligacoes-pelo-whatsapp).

## Variações

- dá para atender chamada telefônica na kinbox
- a kinbox tem número voip para receber ligações
- consigo receber ligação de celular ou fixo pelo voip da kinbox
- existe canal de telefone receptivo na kinbox
- cliente ligou para meu telefone e não tocou na kinbox
- como receber ligações na kinbox
