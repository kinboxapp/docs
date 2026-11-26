---
title: Como evito que meus e-mails caiam no spam?
description: A Kinbox não tem configuração de entrega ou de autenticação de domínio na tela; por onde a resposta sai depende do tipo de conexão do canal de e-mail.
keywords: [email spam, cair no spam, entregabilidade, spf, dkim, autenticação de domínio, via kinbox, remetente email, campanha por email]
publico: llm
tipo: faq
fontes:
  - api-v0:server/modules/mail*/**
  - api-v0:server/controllers/MailController.js
  - api-v0:server/modules/mail/smtp-client.js
codigo:
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/channels/email/**
  - api-v0:server/controllers/MailController.js
  - api-v0:server/modules/mail*/**
  - api-v0:server/modules/scheduler/MailScheduler.js
  - api-v0:server/modules/accessRestriction/**
verificado_em: 2026-11-26
---

## Pergunta

Como evito que meus e-mails caiam no spam?

## Resposta

A Kinbox não tem configuração de entrega ou de autenticação de domínio (SPF, DKIM) na tela; o que muda por onde a resposta sai é o tipo de conexão do canal de e-mail:

- **Por encaminhamento:** a resposta sai de um endereço da Kinbox, com o nome `<domínio do seu e-mail> via Kinbox` e o seu e-mail como endereço de resposta (não sai do seu domínio nem do seu servidor). Sai em texto simples, com arquivos como link.
- **IMAP/SMTP:** a resposta sai pelo seu próprio servidor de e-mail (SMTP), com o seu endereço, em texto simples e com arquivos como link. A entrega segue as regras do seu provedor e do seu domínio, cuidadas por quem administra o seu e-mail.
- **Outlook:** a resposta sai pela conta Microsoft 365 da caixa conectada, em HTML simples e com arquivos como anexo, e fica salva nos itens enviados.

Para que as respostas saiam pelo seu próprio endereço, use **IMAP/SMTP** ou **Outlook** (veja [Conectar o e-mail: qual opção escolher](/docs/canais/e-mail/visao-geral)). A decisão de entregar na caixa de entrada ou no spam é sempre do provedor de quem recebe.

A Kinbox também não tem campanha (envio em massa) por e-mail: as campanhas funcionam apenas em WhatsApp e SMS (veja [Campanhas: visão geral](/docs/campanhas/visao-geral)).

## Variações

- meus e-mails enviados pela kinbox estão indo para o spam do cliente
- onde configuro spf e dkim na kinbox
- posso autenticar meu domínio de e-mail na kinbox
- como tirar o via kinbox do remetente do e-mail
- faz diferença enviar e-mail por encaminhamento ou por imap/smtp
- a kinbox faz disparo de campanha por e-mail
