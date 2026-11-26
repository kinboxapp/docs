---
title: Onde ficam as gravações das ligações?
description: As gravações ficam na mensagem da ligação dentro da conversa (painel Ligação de voz) e em Relatórios → Ligações, quando a gravação estava ativada antes da ligação.
keywords: [gravação de ligação, onde fica gravação, baixar gravação, ouvir ligação, áudio da ligação, gravar chamadas, gravar ligações, transcrição ligação]
publico: llm
tipo: faq
fontes:
  - web:src/pages/inbox/MessageVoipCall.tsx
  - web:src/pages/settings/channels/voip/VoipCallDetailsDrawer.tsx
  - web:src/pages/reports/ReportVoip/index.tsx
  - web:src/pages/settings/channels/voip/voip.helper.ts
codigo:
  - web:src/components/whatsappCall/**
  - web:src/pages/settings/voip/**
  - web:src/pages/settings/channels/voip/**
  - web:src/pages/settings/channels/whatsappCloud/WhatsappCallingChannelSettings.tsx
  - web:src/pages/inbox/MessageVoipCall.tsx
  - api:src/modules/voip/**
  - api:src/modules/whatsapp-calling/**
verificado_em: 2026-11-26
---

## Pergunta

Onde ficam as gravações das ligações?

## Resposta

As gravações ficam primeiro na mensagem da ligação dentro da conversa (**Ligação de voz**, **Ligação recebida pelo WhatsApp** ou **Ligação feita pelo WhatsApp**): clique nela para abrir o painel **Ligação de voz**, com o áudio e **Baixar áudio**. Quem tem a permissão **Gerenciar relatórios** também encontra as gravações em **Relatórios** → **Ligações** ([Relatório de ligações](/docs/relatorios/ligacoes); opções **Baixar** e **Ver**; na exportação, a coluna **Gravação** traz o link).

- **Quando a gravação existe:** apenas quando a opção já estava ligada antes da ligação — **Gravar ligações** na aba **Ligações** do canal de WhatsApp oficial (recurso em teste com plano **Ligações WhatsApp**) ou **Gravar chamadas** em **Configurações** → **Chat** → **Voip** (no VoIP).
- **Quando não há gravação:** se a opção estava desligada; no WhatsApp oficial, se o navegador de quem atendeu falhou ao enviar o áudio no fim (`"Não foi possível enviar a gravação da ligação"`); no VoIP, quando **Usar SIP reserva** está ligada.
- **Transcrição, resumo e download:** no WhatsApp oficial, a gravação e a transcrição automática estão incluídas no plano **Ligações WhatsApp**; o resumo gasta saldo da carteira, e a transcrição e o resumo podem aparecer um pouco depois do áudio. Enquanto a transcrição automática não chega, o painel mostra o botão **Transcrever** no lugar dela. Aguarde alguns minutos e abra de novo; só clique se ela não aparecer, porque o botão usa o saldo da carteira, mesmo com o plano. No VoIP, a transcrição e o resumo são gerados clicando em **Transcrever** no painel **Ligação de voz** e gastam saldo. O arquivo baixado tem o nome `ligacao-voip-<id>` com a extensão do áudio.

Veja mais em [Ligações na Kinbox: WhatsApp oficial e telefone](/docs/canais/ligacoes/visao-geral) e [Configurações de VoIP: gravação, resumo por IA e SIP reserva](/docs/canais/ligacoes/configuracoes-voip).

## Variações

- como ouvir a gravação de uma ligação na kinbox
- onde baixar o áudio de uma chamada voip
- onde encontrar gravações das ligações do whatsapp
- por que minha ligação não tem gravação disponível
- como exportar links das gravações de chamadas
- onde fica a transcrição e o resumo da ligação
