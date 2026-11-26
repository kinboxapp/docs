---
title: Preciso de um plano para fazer ligações pelo WhatsApp?
description: Sim, receber e fazer ligações pelo WhatsApp oficial (Beta) exige o plano Ligações WhatsApp; já as ligações por telefone (VoIP) usam apenas o saldo da carteira.
keywords: [plano ligações whatsapp, precisa de plano para ligar, quanto custa ligação whatsapp, franquia de minutos, franquia de minutos whatsapp, pagar ligação whatsapp, custo ligação whatsapp, voip precisa de plano]
publico: llm
tipo: faq
fontes:
  - web:src/components/whatsappCall/VoicePlanRequiredModal.tsx
  - web:src/components/whatsappCall/VoicePlansModal.tsx
  - api:src/modules/whatsapp-calling/whatsapp-call-voice-plan.service.ts
  - api:src/modules/whatsapp-calling/whatsapp-call-budget.service.ts
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

Preciso de um plano para fazer ligações pelo WhatsApp?

## Resposta

Sim. Fazer ligações, receber ligações e usar o agente de voz pelo WhatsApp oficial exigem o plano **Ligações WhatsApp**, contratado em **Configurações** → **Assinatura** por quem cuida da assinatura. Sem o plano, ativar as opções da aba **Ligações** abre o aviso **Ligações pelo WhatsApp** e o menu de ligar mostra `"Disponível nos planos de Ligações WhatsApp"`.

- **Como o plano funciona:** inclui uma franquia mensal de minutos atendidos pela equipe (ligações feitas e recebidas, contadas por minuto iniciado), compartilhada entre os canais de WhatsApp do workspace e renovada a cada ciclo, sem acumular sobras para o mês seguinte. O excedente sai do [saldo da carteira](/docs/conceitos/saldo-e-creditos). A gravação e a transcrição automática estão incluídas no plano; o resumo por IA e a transcrição pedida pelo botão **Transcrever** gastam saldo da carteira. Quando o plano inclui minutos de IA, cada minuto de IA consome mais de um minuto da franquia, conforme o plano. As tarifas oficiais da Meta são cobradas diretamente pela Meta, à parte da mensalidade do plano.
- **Outros requisitos:** as ligações pelo WhatsApp são um recurso em teste (**Beta**) — confirme com o suporte se o recurso está liberado no seu workspace antes de contratar o plano. Também é preciso ter um canal de **WhatsApp oficial** sem [coexistência](/docs/canais/whatsapp-api-oficial-coexistente) e franquia sobrando ou saldo na carteira.
- **Ligação por telefone (VoIP):** não precisa do plano **Ligações WhatsApp** — usa apenas o saldo da carteira por minuto de ligação atendida e exige a permissão **Pode ligar para o contato** (ou ser proprietário).

Veja os planos em [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano) e mais detalhes em [Ligações na Kinbox: WhatsApp oficial e telefone](/docs/canais/ligacoes/visao-geral) e [Fazer e receber ligações pelo WhatsApp oficial (Beta)](/docs/canais/whatsapp/whatsapp-cloud-api/ligacoes-pelo-whatsapp).

## Variações

- ligações pelo whatsapp estão incluídas no plano padrão da kinbox
- dá para ligar pelo whatsapp usando só saldo da carteira
- como funciona a franquia de minutos das ligações do whatsapp
- minutos que sobram nas ligações do whatsapp acumulam para o próximo mês
- o voip da kinbox também exige plano de ligações
- a gravação e a transcrição do whatsapp são cobradas fora do plano
