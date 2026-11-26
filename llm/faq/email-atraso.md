---
title: Por que os e-mails demoram a aparecer na Kinbox?
description: "Depende do tipo de conexão: no encaminhamento o e-mail entra quando o provedor encaminha, enquanto no IMAP/SMTP e no Outlook a Kinbox lê a caixa a cada 2 minutos."
keywords: [email demora, e-mail atrasado, demora para chegar email, leitura de email, 2 minutos, email não chega, imap demora, outlook demora, encaminhamento demora]
publico: llm
tipo: faq
fontes:
  - api-v0:server/modules/scheduler/schedulerManager.js
  - api-v0:server/modules/scheduler/MailScheduler.js
  - api-v0:server/modules/mail/imap-client.js
  - api-v0:server/controllers/MailController.js
codigo:
  - web:src/pages/settings/channels/email/**
  - web:src/pages/settings/channels/index.tsx
  - api-v0:server/controllers/MailController.js
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/modules/mail/**
  - api-v0:server/modules/scheduler/MailScheduler.js
  - api-v0:server/modules/accessRestriction/**
verificado_em: 2026-11-26
---

## Pergunta

Por que os e-mails demoram a aparecer na Kinbox?

## Resposta

Depende do tipo de conexão do canal de e-mail: no **Por encaminhamento**, o e-mail entra assim que o seu provedor encaminha, enquanto no **IMAP/SMTP** e no **Outlook** a Kinbox lê a caixa **a cada 2 minutos**.

- **Por encaminhamento:** se há demora, o atraso ocorre no encaminhamento feito pelo seu provedor de e-mail.
- **IMAP/SMTP:** a leitura roda a cada 2 minutos e importa até **50 e-mails por leitura** (dos mais antigos para os mais novos); se chegarem muitos e-mails de uma vez, os restantes entram nas leituras seguintes.
- **Outlook:** a leitura roda a cada 2 minutos e importa até **20 e-mails por leitura** (dos mais novos para os mais antigos); os demais não lidos podem entrar nas leituras seguintes, desde que ainda sejam do dia. Os 2 minutos são o intervalo entre leituras, não um prazo de entrega.

Quando o e-mail não chega nunca, as causas variam conforme o tipo de conexão:

- **IMAP/SMTP e Outlook:** só entram e-mails **não lidos** que estejam na pasta de entrada (INBOX / Caixa de Entrada). E-mail aberto antes em outro programa ou movido para spam ou outra pasta não entra.
- **IMAP/SMTP:** só entram e-mails recebidos a partir do **dia** da conexão (ou da última reconexão). Se a senha da caixa mudou no provedor, a leitura para sem aviso; conecte de novo com o mesmo **IMAP Usuário** e a nova senha.
- **Outlook:** só entram e-mails recebidos **hoje**; um e-mail que ficar sem ler de um dia para o outro não entra mais. Se o acesso acabou (a Kinbox não renova esse acesso sozinha), a leitura para; conecte de novo com os mesmos dados e o mesmo **Graph Sender**.

O selo **Conectado** do canal de e-mail não confirma que a leitura está funcionando. Veja o diagnóstico completo em [Os e-mails não chegam ou não saem](/docs/canais/e-mail/problemas-comuns).

## Variações

- quanto tempo leva para o e-mail cair na caixa de entrada da kinbox
- e-mail recebido está atrasando para aparecer na kinbox
- qual é o intervalo de leitura de e-mails no imap e no outlook
- meu cliente mandou e-mail faz tempo e não apareceu na kinbox
- e-mail encaminhado demora para chegar na kinbox
- por que os e-mails do outlook param de chegar depois de um tempo
