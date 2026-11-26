---
title: Limite de canais por plano, status da lista e erros de plano
description: Regras de limite de canais de WhatsApp e Instagram por plano, todos os status da lista de canais e as mensagens de erro de plano.
keywords: [limite de canais, plano, whatsapp no plano, linhas de whatsapp, assinatura expirada, status do canal, exportar canais]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
  - api-v0:server/controllers/NewPaymentController.js
codigo:
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/channels/channels.def.tsx
  - web:src/pages/settings/channels/whatsapp/ForwardZapModal.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/routes/IntegrationsApiRoutes.js
verificado_em: 2026-11-26
---

Detalhes de referência da página humana "Canais: conectar e gerenciar" (`/docs/canais/visao-geral`).

## Limite de canais por plano e mensagens de erro

Criar um canal de WhatsApp (oficial ou por QR Code) passa pela checagem do plano. **Recriar** um canal não passa por essa checagem.

- **WhatsApp (assinatura atual)**: conta todos os canais de WhatsApp ativos do workspace, somando oficiais e por QR Code, contra a quantidade contratada de **WhatsApp** (cobrada por linha).
  - Acima do limite (inclusive ao criar um novo canal): `"Você precisa remover canais de Whatsapp para prosseguir com a contratação"`
  - Assinatura vencida há mais de 3 dias: `"Assinatura expirada"`
- **WhatsApp (assinatura antiga)**: mensagens de erro possíveis:
  - `"WhatsApp bloqueado para seu plano atual."`
  - `"Seu plano atual não permite adicionar ou modificar número de whatsapps."`
  - `"Seu plano atual não permite adicionar o novo canal"`
  - `"Sua assinatura expirou"`
- **Instagram**: tem limite próprio e não pode ser adicionado no período de teste grátis:
  - `"Você não pode adicionar canais de Instagram em plano trial"`
- **SMS**: máximo de 1 por workspace (o cartão fica desativado quando o workspace já possui um).
- **Telegram, E-mail, Widget, Facebook e Customizado**: não passam pela checagem de quantidade do plano. O cartão **Widget** não aparece para membros com a restrição `"Não pode gerenciar widget."`

## Todos os status da lista de canais

No layout novo, os textos aparecem com Inicial Maiúscula em cada palavra por CSS (por exemplo, "Necessário Reiniciar Canal").

| Situação | Rótulo na tela | Dica (tooltip) |
| --- | --- | --- |
| Conectado | **Conectado** (no layout novo, selo verde de check) | "Seu canal está conectado e funcionando." |
| Desconectado | **Desconectado** | "Seu canal está desconectado. Verifique sua conexão de internet." |
| Criando | **Criando...** | "Estamos criando seu canal, esse processo poderá demorar até 10 minutos." |
| Reiniciando | **Reiniciando...** | "Estamos reiniciando seu canal, esse processo poderá demorar até 5 minutos." |
| Precisa ler QR | **Necessário ler QR-Code** | "Leia o QRCode com seu celular na página do canal para conectar." |
| Precisa reiniciar | **Necessário reiniciar canal** | 'Vá no seu canal, clique em "ações" e em Reiniciar canal.' |
| Precisa recriar | **Recomendado recriar canal** | 'Canal desatualizado. Vá no seu canal, clique em "ações" e em Recriar canal. Será necessário ler o QRCode novamente.' |
| Outros estados sem rótulo | Código cru em vermelho: `starting`, `connecting`, `pending_review`, `error` | Sem dica |

## Alertas extras na linha do canal

- **Número bloqueado**: ícone vermelho com a dica `"Seu canal foi possivelmente bloqueado pelo WhatsApp"`.
- **Migração em andamento**: ícone de carregamento com a dica `"Em transferência de conversas"`.
- **Aquecedor**: selo **Aquecendo** (`"Canal em aquecimento."`), visível apenas em workspaces com recursos em teste.
- **Clássica antiga**: canal **Clássica** criado antes de 09/01/2023 exibe **Recomendado recriar canal** com a dica `'Canal desatualizado. Recomendado recriar. Vá no seu canal, clique em "ações" e em Recriar canal. Será necessário ler o QRCode novamente.'`

## Filtro e exportação da lista

- O filtro **Status** = **Desconectado** retorna todos os canais que não estão conectados (inclui status como **Necessário ler QR-Code**, **Necessário reiniciar canal**, `starting`, `connecting`, `error`, entre outros).
- A exportação da lista inclui as colunas: ID, Nome, Descrição, Tipo, Telefone, Identificador, Conectado (Sim/Não) e os campos personalizados de canal.

## Excluir e criar novamente com o mesmo número

- **Excluir** um canal de WhatsApp apenas desliga o canal (fica inativo e não apaga as conversas). Na conexão **Express**, a exclusão também remove o canal dos bots que o usavam.
- Criar novamente um canal com o **mesmo número** no mesmo workspace reaproveita o canal excluído: mantém o mesmo ID e traz as conversas antigas de volta, inclusive quando o canal excluído era **Clássica** e o novo canal é criado como **Express**.
