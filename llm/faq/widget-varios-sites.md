---
title: Posso usar o mesmo widget em vários sites?
description: Sim, desde que Restringir domínio esteja desligado ou inclua todos os endereços, mas todas as conversas chegam com o mesmo nome e é recomendado criar um widget por site.
keywords: [mesmo widget em vários sites, vários sites um widget, múltiplos sites widget, quantos widgets posso criar, limite de widget, restringir domínio vários sites, landing page widget]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/channels/widget/AddWidget.tsx
  - api:src/modules/channels/widget/widget.service.ts
  - widget:src/widget.ts
codigo:
  - web:src/pages/settings/channels/widget/**
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/settings/widget/index.tsx
  - web:src/pages/settings/widget/RenameWidgetModal.tsx
  - api:src/modules/channels/widget/widget.service.ts
  - api:src/modules/channels/widget/widget.controller.ts
  - widget:src/widget.ts
verificado_em: 2026-11-26
---

## Pergunta

Posso usar o mesmo widget em vários sites?

## Resposta

Sim, o mesmo código de widget funciona em vários sites, desde que **Restringir domínio** esteja desligado ou inclua todos os endereços exatos na lista (com o protocolo que cada site usa, com ou sem `www` conforme ele abre e a porta, se houver, sem barra no fim e sem caminho).

Antes de reutilizar o mesmo código, considere dois efeitos:

- **Identificação na equipe:** todas as conversas chegam no mesmo canal, com o nome daquele widget, sem distinguir de qual site vieram. Por isso a própria Kinbox recomenda criar um widget para cada site ou landing page, cada um com aparência e textos próprios.
- **Mesmo visitante em dois sites:** a conversa fica guardada no navegador por site. O visitante que conversou num site não vê esse histórico no outro: lá o chat começa do zero.

Você pode criar quantos widgets quiser no mesmo workspace, sem limite de quantidade e sem cobrança adicional no plano. Veja [Instalar o chat no seu site](/docs/canais/widget) e [Configurações do widget](/docs/canais/widget/configuracoes).

## Variações

- dá para colar o mesmo código do chat em dois domínios diferentes
- posso usar o mesmo widget em várias landing pages
- preciso criar um widget novo para cada site
- tem limite de quantos widgets posso criar na kinbox
- se eu colocar o mesmo widget em dois sites o histórico continua entre eles
- a kinbox cobra por cada widget criado
