---
title: "Webhook de leads do RD Station Marketing: o que vira contato e regras"
description: Quais dados do lead do RD Station Marketing viram contato na Kinbox, como contatos existentes e leads sem telefone são tratados e quando o envio não cria contato.
keywords: [webhook rd station, leads do rd, conversão rd station, contato duplicado, lead sem telefone, mobile_phone, personal_phone]
publico: llm
tipo: referencia
fontes:
  - api:src/modules/webhooks/rdstation/rdstation-webhook.consumer.ts
  - api:src/modules/contacts/contacts.repository.ts
codigo:
  - api:src/modules/webhooks/**
  - api:src/modules/contacts/contacts.repository.ts
verificado_em: 2026-11-26
---

Complemento técnico de [Receber leads do RD Station Marketing por webhook](/docs/integracoes/rdstation-marketing-webhook).

- **Formato e campos lidos:** o processamento lê apenas a lista `leads` do corpo da requisição e extrai três campos do topo de cada lead: `name` (nome), `email` (e-mail) e `mobile_phone` (telefone; se vazio, usa `personal_phone`). Campos de formulário, tags, campos personalizados (`cf_`), empresa e origem da conversão não são gravados.
- **Contato existente:** a Kinbox busca contato existente no workspace apenas pelo **telefone** (considerando variações com e sem DDI `55`). Se encontrar um contato, não atualiza nome nem e-mail. Não há busca por e-mail.
- **Lead sem telefone:** sem telefone não há busca de duplicados, então cada conversão recebida cria um novo contato no workspace (gerando contatos duplicados com o mesmo e-mail).
- **Efeito no workspace:** cria apenas o contato (normalizando o telefone); não cria conversa nem envia mensagem.
- **Envio aceito sem contato criado:** o RD pode mostrar o envio como bem-sucedido mesmo quando nenhum contato é criado (por exemplo, webhook em formato diferente do de conversão de leads). Um envio que falha não é refeito.
