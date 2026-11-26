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
- **Links com parâmetros de campanha**, usando o [Redirecionador de WhatsApp](/docs/desenvolvedor/redirecionador-via-whatsapp) (com UTMs e código de rastreio) ou a captura de campanha do [widget](/docs/canais/widget).

Cada sessão guarda uma única origem (uma nova não substitui a anterior), enquanto o perfil do contato acumula todas as origens no histórico.

**Como a Kinbox classifica o canal:** o parâmetro `utm_source` explícito tem prioridade (`google` → **Google Ads**; `facebook`, `instagram`, `fb`, `ig` → **Meta Ads**). Sem `utm_source`, identificadores da Meta (`fbclid` ou ID do anúncio) viram **Meta Ads**; identificadores de clique do Google (`gclid`, `gbraid`, `wbraid`) viram **Google Ads**; anúncios de clique para o WhatsApp sem parâmetros viram **Meta Ads**; e demais combinações aparecem como **Campanha**.

**Filtros, negociações e relatórios:**

- Use os filtros **Criado por Meta Ads** e **Criado por Google Ads** nas conversas (veja [Criar filtros de conversa](/docs/conversas/criar-filtros-de-conversa)) e no funil de vendas.
- Ao criar uma negociação em até 90 dias após a sessão, ela herda a origem (exceto negociações importadas ou de funil operacional) e entra no bloco **Conversão e Pipeline - Meta Ads** ou na aba **Atribuição no Kinbox** do relatório Google Ads (lembre que o relatório Google Ads não tem leads, CPL nem negociações). Para a negociação entrar nesses relatórios, a sessão precisa ter a identificação do anúncio: o ID do anúncio, `ctwa_clid` ou `fbclid` (Meta), ou `gclid`, `gbraid` ou `wbraid` (Google). UTM sozinha não basta.
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
