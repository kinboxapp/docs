---
title: Posso importar os contatos do meu celular?
description: Sim, pelo app da Kinbox para celular se o seu papel tiver Gerenciar Contatos (ou se você for o proprietário); no navegador, exporte a agenda para CSV e importe a planilha.
keywords: [importar contatos do celular, agenda do telefone, sincronizar contatos do celular, puxar contatos do celular, subir contatos da agenda, importar agenda]
publico: llm
tipo: faq
fontes:
  - mobile:src/app/(tabs)/profile/index.tsx
  - mobile:src/app/import-contacts.tsx
  - mobile:src/app/(tabs)/_layout.tsx
  - api:src/modules/contact-imports/contact-imports.service.ts
codigo:
  - mobile:src/app/import-contacts.tsx
  - mobile:src/app/(tabs)/profile/index.tsx
  - mobile:src/app/(tabs)/_layout.tsx
  - mobile:src/domain/phoneContacts.ts
  - api:src/modules/contact-imports/**
verificado_em: 2026-11-26
---

## Pergunta

Posso importar os contatos do meu celular?

## Resposta

Sim, pelo app da Kinbox para celular, desde que o seu papel tenha a permissão **Gerenciar Contatos** ou você seja o proprietário do workspace (sem essa permissão, a opção não aparece).

No app, abra a aba **Você** e toque em **Importar contatos do celular**. Depois de conceder acesso em "Permitir acesso aos contatos", o app lista os contatos da agenda que têm telefone ("Os contatos da agenda com telefone aparecerão aqui."), oferece **Selecionar todos** e **Desmarcar todos**, e conclui em **Importar**.

Antes de enviar, o app pede confirmação informando que os contatos selecionados serão adicionados ao workspace e que quem já estiver na Kinbox com o mesmo telefone não será duplicado: contatos com telefone já cadastrado são ignorados e não são atualizados. Se houver erro no meio do processo, você pode tentar de novo ("Você pode tentar de novo: quem já foi enviado não será duplicado.").

No navegador não existe importação direta da agenda do celular: exporte os contatos da sua agenda para um arquivo CSV e importe a planilha pela Kinbox em [Importar contatos de uma planilha](/docs/clientes/importar-contatos).

## Variações

- importar agenda do telefone para a Kinbox
- sincronizar contatos do celular com o workspace
- puxar contatos salvos no celular
- subir contatos da agenda pelo aplicativo
- passar números do celular para a lista de contatos
