---
title: Por que não consigo atualizar o relatório de Meta Ads ou Google Ads?
description: Cada workspace tem um limite diário de consultas às plataformas (10 no Meta Ads, 3 no Google Ads) e um intervalo mínimo entre dois Atualizar; os dados já carregados continuam na tela.
keywords: [atualizar relatório meta ads, limite de consultas, botão atualizar desabilitado, google ads não atualiza, dados desatualizados anúncios, consultas por dia]
publico: llm
tipo: faq
fontes:
  - api:src/modules/marketing/dashboard-snapshots/dashboard-snapshots.service.ts
  - api:src/modules/marketing/meta-ads/meta-ads.constants.ts
  - api:src/modules/marketing/google-ads/google-ads.constants.ts
  - web:src/pages/reports/Marketing/MetaAds/components/MarketingSnapshotRefresh.tsx
codigo:
  - api:src/modules/marketing/dashboard-snapshots/**
  - api:src/modules/marketing/meta-ads/meta-ads.constants.ts
  - api:src/modules/marketing/google-ads/google-ads.constants.ts
  - web:src/pages/reports/Marketing/MetaAds/components/MarketingSnapshotRefresh.tsx
verificado_em: 2026-11-26
---

## Pergunta

Por que não consigo atualizar o relatório de Meta Ads ou Google Ads?

## Resposta

Cada workspace tem um limite diário de consultas às plataformas de anúncios — **10 consultas por dia no Meta Ads** e **3 consultas por dia no Google Ads** — além de um intervalo mínimo de **5 minutos** (Meta Ads) ou **15 minutos** (Google Ads) entre dois cliques em **Atualizar**. A cota é do workspace inteiro, separada por app, e os dados já carregados continuam visíveis na tela ("Atualizado em DD/MM HH:mm").

**O que gasta consulta:**

- Primeira abertura de uma conta ou de um período ainda não consultado;
- Reabertura de dados salvos há mais de 48 horas (a Kinbox os renova ao abrir);
- Clique no botão **Atualizar**;
- Trocar para outra conta de anúncios que ainda não tenha dados salvos.

**O que não gasta consulta:** escolher um intervalo dentro de um período já consultado da mesma conta, quando a Kinbox reaproveita os dados salvos sem renová-los, ou consultas que falham (a consulta volta para a cota).

**Mensagens que podem aparecer:**

- `"Limite de {{limit}} consultas por dia atingido. Novas consultas liberam amanhã."` (no botão **Atualizar**) ou `"Limite de consultas de hoje atingido. Os períodos já consultados continuam disponíveis e novas consultas liberam amanhã."`
- `"Aguarde o intervalo entre uma atualização e outra. Os dados salvos continuam disponíveis."`
- `"Outra pessoa deste workspace já está atualizando estes dados. Aguarde alguns segundos e tente novamente."`

O limite diário renova à meia-noite (horário de Brasília). O relatório **Tracking** não tem botão **Atualizar** nem limite de consultas (ele só conta visitantes que deram consentimento de analytics e não identifica o contato).

Para abrir os relatórios em **Relatórios** → **Marketing** é preciso ter a permissão **Gerenciar relatórios**, e ativar ou conectar os apps em **Configurações** → **Integrações** → **Apps** exige a permissão **Integrações** (se o app não aparecer em **Apps**, fale com o suporte; o proprietário pode tudo). Veja mais em [Ler os relatórios de marketing](/docs/marketing/relatorios-de-marketing).

## Variações

- botão atualizar desabilitado meta ads
- limite de consultas atingido
- relatório google ads não atualiza
- quantas vezes posso atualizar o dashboard de anúncios
- dados do meta ads desatualizados
- quando libera o limite de consultas de anúncios
