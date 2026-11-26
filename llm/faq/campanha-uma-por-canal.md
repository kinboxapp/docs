---
title: Por que minha campanha está "Aguardando outra campanha"?
description: Só uma campanha envia por vez em cada canal; a próxima espera a anterior terminar, ser excluída ou entrar em pausa por horário.
keywords: [aguardando outra campanha, campanha na fila, duas campanhas mesmo canal, campanha esperando, campanha não começa]
publico: llm
tipo: faq
fontes:
  - api:src/modules/campaigns/campaigns.service.ts
  - web:src/pages/crm/campaigns/campaign.helper.tsx
  - web:src/pages/crm/campaigns/index.tsx
codigo:
  - api:src/modules/campaigns/campaigns.service.ts
  - web:src/pages/crm/campaigns/campaign.helper.tsx
verificado_em: 2026-11-26
---

## Pergunta

Por que minha campanha está "Aguardando outra campanha"?

## Resposta

Apenas uma campanha pode ser enviada por vez em cada canal principal (o primeiro canal selecionado em **Canais de disparo**).

Enquanto outra campanha está em **Enviando mensagens** no mesmo canal principal, a nova fica com o status **Aguardando outra campanha** ("Somente uma campanha pode ser executada por vez no mesmo canal"). Ela começa automaticamente assim que a campanha anterior termina, é excluída ou entra em **Aguardando horário**.

Se você clicar em **Pausar** na campanha em andamento, a Kinbox pergunta na janela **Iniciar campanha** se deseja iniciar a campanha que estava esperando. Clicar em **Resumir** na campanha em espera não a coloca na frente enquanto a outra continuar ativa no mesmo canal.

Veja mais em [Velocidade de envio e horário comercial](/docs/campanhas/velocidade-e-horario) e [Minha campanha não envia ou parou](/docs/campanhas/problemas-comuns).

## Variações

- minha campanha ficou parada em aguardando outra campanha
- posso disparar duas campanhas ao mesmo tempo no mesmo whatsapp
- campanha na fila esperando outra terminar
- cliquei em resumir na campanha mas ela não começa
- como fazer a segunda campanha iniciar antes da primeira
- por que minha campanha nova não começou a enviar
