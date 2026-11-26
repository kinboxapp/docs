---
title: Por que a Meta mudou a categoria do meu template?
description: A categoria final do template é decisão da Meta, que pode reclassificá-lo; a Kinbox atualiza a lista e avisa no sino.
keywords: [meta mudou categoria template, template utilidade virou marketing, categoria alterada, recategorização template, utility para marketing, mudar categoria template]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/whatsappApi/sections/TemplatesListSection.tsx
  - web:src/pages/settings/whatsappApi/sections/templateBuilder/constants.tsx
  - api:src/modules/whatsapp-api/services/templates/whatsapp-templates.service.ts
  - api:src/modules/whatsapp-api/services/core/whatsapp-api-notifications.service.ts
codigo:
  - web:src/pages/settings/whatsappApi/sections/TemplatesListSection.tsx
  - web:src/pages/settings/whatsappApi/sections/TemplateBuilder.tsx
  - web:src/pages/settings/whatsappApi/helpers/templates.ts
  - web:src/components-old/header/NotificationDropItem.tsx
  - api:src/modules/whatsapp-api/services/core/whatsapp-api-notifications.service.ts
  - api:src/modules/whatsapp-api/services/templates/whatsapp-templates.service.ts
verificado_em: 2026-11-26
---

## Pergunta
Por que a Meta mudou a categoria do meu template?

## Resposta
A categoria final é decisão da Meta, que pode reclassificar o template durante ou depois da análise (por exemplo, de **Utility** para **Marketing**).

No editor da Kinbox você escolhe entre **Marketing**, **Utility** e **Authentication** (em **Template + Carrossel**, a categoria é sempre **Marketing**, e o botão **Copiar código da oferta** exige **Marketing**). Quando a Meta altera a classificação, a Kinbox apenas reflete a mudança na coluna **Categoria** e avisa no sino com **Categoria alterada:** `"A Meta mudou a categoria do template"`.

A Kinbox não tem ação para pedir a categoria anterior de volta e não cobra pelo envio de templates. Se a nova categoria não atender ao seu uso, edite o conteúdo do template, salve e clique em **Enviar atualização para a Meta**, ou crie um novo template.

Mais detalhes em [Meu template foi rejeitado, pausado ou desativado](/docs/canais/whatsapp/whatsapp-templates/template-rejeitado).

## Variações
- a meta trocou meu template de utilidade para marketing
- categoria do template mudou sozinha
- meu modelo de utilidade virou marketing
- por que meu template foi recategorizado pela meta
- como voltar a categoria do template para utility
- consigo pedir revisão da categoria do template na kinbox
