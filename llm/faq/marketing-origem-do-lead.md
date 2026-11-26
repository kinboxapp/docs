---
title: Como sei de qual anúncio veio o contato?
description: A origem aparece no painel Anúncios do contato e no painel Detalhes da conversa (Meta Ads, Google Ads ou Campanha) quando o contato chega por anúncio de clique para o WhatsApp ou por link com parâmetros de campanha.
keywords: [origem do lead, de qual anúncio veio, campanha de origem, anúncio clique para whatsapp, ctwa, utm, criado por meta ads, criado por google ads, rastrear lead]
publico: llm
tipo: faq
fontes:
  - web:src/pages/crm/contacts/people/ContactProfile/ContactDetails.tsx
  - web:src/components-old/chat/side/SessionInfoPlugin/CampaignBox.tsx
  - web:src/lib/referralChannel.ts
  - web:src/components-old/forms/FiltersInput/session.filter.tsx
  - api:src/modules/deals/deal-attribution.helper.ts
  - api-v0:server/modules/chat/auxiliary/parser.js
codigo:
  - web:src/pages/crm/contacts/people/ContactProfile/**
  - web:src/components-old/chat/side/SessionInfoPlugin/**
  - web:src/lib/referralChannel.ts
  - api:src/modules/deals/deal-attribution.helper.ts
  - api:src/modules/tracking/**
  - api-v0:server/modules/chat/auxiliary/parser.js
verificado_em: 2026-11-26
---

## Pergunta

Como sei de qual anúncio veio o contato?

## Resposta

Você vê a origem no perfil do contato — no painel **Anúncios**, que aparece quando o contato chegou por anúncio — e na conversa, no painel **Detalhes** da sessão, onde aparece o selo **Meta Ads**, **Google Ads** ou **Campanha** (passe o mouse sobre ele para ver **Título**, **Corpo**, **Origem**, **Mídia** e os parâmetros).

A origem é gravada quando o contato inicia conversa por:

- **Anúncio de clique para o WhatsApp da Meta** (no WhatsApp oficial — que também exibe o cartão do anúncio na conversa — e no WhatsApp por QR Code, com título, imagem e link do anúncio).
- **Links com parâmetros de campanha**, usando o [Redirecionador de WhatsApp](/docs/desenvolvedor/redirecionador-via-whatsapp) (com UTMs e código de rastreio) ou a captura de campanha do [widget](/docs/canais/widget/configuracoes).

Cada sessão guarda uma única origem (uma nova não substitui a anterior), enquanto o perfil do contato acumula todas as origens no histórico.

**Como a Kinbox classifica o canal (nesta ordem):**

1. Com `utm_source` preenchido (exceto `whatsapp` e `kinbox`, que não dizem de onde veio o clique): `google` → **Google Ads**; valores da Meta (como `facebook`, `instagram`, `fb`, `ig`, `meta`) → **Meta Ads**; qualquer outro valor → **Campanha**.
2. Sem `utm_source` (ou com `whatsapp`/`kinbox`): identificadores da Meta (como `fbclid` ou o ID do anúncio no link) → **Meta Ads**; identificadores de clique do Google (`gclid`, `gbraid`, `wbraid`) ou `utm_campaign` sozinho → **Google Ads**; anúncio de clique para o WhatsApp sem parâmetros → **Meta Ads**.

Exemplo: um link com `utm_campaign` e sem `utm_source` mostra o selo **Google Ads** e entra no filtro **Criado por Google Ads**, mas não aparece na aba **Atribuição no Kinbox**, que exige um identificador de clique do Google.

**Filtros, negociações e relatórios:**

- Use os filtros **Criado por Meta Ads** e **Criado por Google Ads** nas conversas (veja [Criar filtros de conversa](/docs/conversas/criar-filtros-de-conversa)) e no funil de vendas.
- **Origem da negociação:** ao criar a negociação, ou ao ligá-la a uma conversa se ela ainda não tiver origem, a Kinbox busca a origem nas sessões dos últimos 90 dias (exceto negociações importadas ou de funil operacional). Só chega à negociação a origem com identificação do anúncio da Meta (ID do anúncio, `ctwa_clid` ou `fbclid`) ou do clique do Google (`gclid`, `gbraid` ou `wbraid`); UTM sozinha não basta. Com essa origem, a negociação entra no filtro **Criado por Meta Ads** ou **Criado por Google Ads** do funil.
- **Bloco Conversão e Pipeline - Meta Ads:** só conta negociações com o ID do anúncio de clique para o WhatsApp de um anúncio da conta (e da campanha, se filtrada) escolhida no relatório. `fbclid` ou `ctwa_clid` sozinhos dão a origem Meta Ads à negociação, mas ela não entra nesse bloco.
- **Aba Atribuição no Kinbox (Google Ads):** lista as conversas do período com `gclid`, `gbraid` ou `wbraid`, mesmo sem negociação; quando há negociação ligada, a linha aparece como **Negócio**. O relatório Google Ads não tem leads, CPL nem métricas de funil e pipeline.
- Ver os relatórios em **Relatórios** → **Marketing** exige a permissão **Gerenciar relatórios**; ativar e conectar apps em **Configurações** → **Integrações** → **Apps** exige **Integrações** (se o app não aparecer em **Apps**, fale com o suporte; o proprietário pode tudo).

**Quando não é possível identificar a origem:**

- O **Tracking** do site só conta visitantes anônimos com consentimento de analytics e não identifica o contato nem liga visita a conversa.
- O contato chegou sem anúncio e sem parâmetros de campanha.
- O código de rastreio `(ref: ...)` foi apagado da mensagem pelo cliente, venceu (vale 7 dias) ou já havia sido usado.

Veja mais em [Medir anúncios e o site com a Kinbox](/docs/marketing/visao-geral) e [Ler os relatórios de marketing](/docs/marketing/relatorios-de-marketing).

## Variações

- de onde veio o lead
- qual campanha trouxe o cliente
- ver anúncio de origem do contato
- lead veio do instagram ads
- rastrear origem do contato whatsapp
- saber se o contato veio do google ads
