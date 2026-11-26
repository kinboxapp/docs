---
title: Quanto tempo a Meta leva para aprovar um template?
description: O prazo de aprovação de templates é definido pela Meta; a Kinbox acompanha o status automaticamente e avisa quando o resultado sai.
keywords: [tempo aprovação template, quanto tempo demora aprovar template, template pendente, demora meta aprovar, aprovação modelo whatsapp, sincronizar meta]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/whatsappApi/sections/TemplatesListSection.tsx
  - web:src/pages/settings/whatsappApi/hooks/useWhatsappApiData.ts
  - api:src/modules/whatsapp-api/services/templates/whatsapp-templates.service.ts
  - api:src/modules/whatsapp-api/services/core/whatsapp-api-notifications.service.ts
codigo:
  - web:src/pages/settings/whatsappApi/sections/TemplatesListSection.tsx
  - web:src/pages/settings/whatsappApi/sections/TemplateBuilder.tsx
  - web:src/pages/settings/whatsappApi/sections/templateBuilder/**
  - web:src/pages/settings/whatsappApi/hooks/domains/useWhatsappTemplates.ts
  - web:src/pages/settings/whatsappApi/helpers/templates.ts
  - web:src/pages/settings/whatsappApi/helpers/templateButtons.ts
  - web:src/pages/settings/whatsappApi/helpers/templateVariables.ts
  - web:src/components-old/header/NotificationDropItem.tsx
  - api:src/modules/whatsapp-api/services/templates/whatsapp-templates.service.ts
  - api:src/modules/whatsapp-api/dto/whatsapp-template-draft.zod.ts
  - api:src/modules/whatsapp-api/services/core/whatsapp-api-notifications.service.ts
verificado_em: 2026-11-26
---

## Pergunta
Quanto tempo a Meta leva para aprovar um template?

## Resposta
O prazo é da Meta; a Kinbox não define nem acelera a análise.

Enquanto a Meta avalia o modelo, o template aparece com status **Pendente** (ou **Submetido**) em **Configurações** → **Automação** → **WhatsApp API** → **Templates** e fica bloqueado para edição até receber um status final.

A Kinbox atualiza o status automaticamente assim que a Meta responde, reconsulta a cada 15 minutos os templates em análise enviados nos últimos 30 dias e envia uma notificação no sino (**Template aprovado:** ou **Template recusado:**). Você também pode forçar a atualização usando **Sincronizar Meta** no menu de três pontos acima da tabela.

Mais detalhes nas páginas "Criar um template e enviar para aprovação" e "Meu template foi rejeitado, pausado ou desativado".

## Variações
- quanto tempo demora a aprovação de um modelo de mensagem
- meu template ficou parado em pendente
- quando meu template vai ser aprovado no whatsapp
- a meta ainda não aprovou meu template
- tem como acelerar a aprovação de template na kinbox
- aprovação do template está demorando muito
