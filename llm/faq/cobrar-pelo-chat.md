---
title: Posso cobrar o cliente pela conversa (Pix ou boleto)?
description: Em parte. A Kinbox não gera Pix, link de pagamento nem cobrança no cartão; com integrações, dá para gerar boleto do Banco Inter na conversa e o bot enviar boletos do Asaas ou da Hinova.
keywords: [cobrar pelo chat, pix pelo whatsapp, link de pagamento, boleto pela conversa, segunda via pelo bot, cobrança no whatsapp, checkout, cartão de crédito]
publico: llm
tipo: faq
fontes:
  - web:src/components-old/chat/side/integrationApps/**
  - api-v0:server/auxiliary/BotIntegrations.js
  - api-v0:server/modules/chat/**
codigo:
  - web:src/pages/settings/integrations/EditBancoInter.tsx
  - web:src/pages/settings/integrations/EditAsaas.tsx
  - web:src/pages/settings/integrations/EditHinova.tsx
  - web:src/components-old/chat/side/integrationApps/**
  - api-v0:server/modules/**
verificado_em: 2026-11-26
---

## Pergunta

Posso cobrar o cliente pela conversa (Pix ou boleto)?

## Resposta

Em parte: a Kinbox não gera Pix, link de pagamento nem cobrança no cartão, mas três integrações ajudam com boleto.

- **[Integrar com o Banco Inter](/docs/integracoes/banco-inter):** o membro gera um boleto de cobrança pelo quadro **Banco Inter** na conversa, copia a **Linha Digitável** ou baixa o PDF (`boleto.pdf`) e envia ao cliente manualmente. Não gera Pix, não envia o boleto sozinha, não consulta nem cancela boletos e não tem ação no bot.
- **[Integrar com o Asaas](/docs/integracoes/asaas):** o bot envia ao cliente a segunda via dos boletos em aberto (pendentes ou vencidos) cadastrados no Asaas, buscando pelo campo personalizado `cpf` do contato (ação **Consulta boletos ASAAS**). Não tem quadro na conversa e não gera boleto novo.
- **[Integrar com a Hinova](/docs/integracoes/hinova):** o bot consulta os boletos do associado no sistema SGA pelo campo personalizado `cpf` do contato e envia ao cliente dados do boleto, link, linha digitável e PDF (ação **Consulta boletos SGA**, até 4 boletos). Não tem quadro na conversa e não gera boleto novo nem Pix.

O que **não existe** de forma nativa na Kinbox para cobrar clientes finais:

- Geração de Pix (QR Code, "copia e cola" ou chave) na conversa.
- Link de pagamento ou página de checkout.
- Cobrança por cartão de crédito.
- Confirmação automática de pagamento ("pago") na conversa ou lembrete automático de vencimento por essas integrações.
- Envio de cobrança Pix nativa pelo botão de pagamento do WhatsApp.

Quando o **cliente** envia uma cobrança Pix pelo WhatsApp por QR Code, ela aparece como texto na conversa (veja [O que funciona e o que não funciona no WhatsApp por QR Code](/docs/canais/whatsapp/whatsapp-app/o-que-funciona)).

Se você usa outro sistema de cobrança (Pix, boleto ou link de pagamento), existem outras vias para conectar o seu próprio provedor:

- **No bot:** use **Chamar endpoint** (ou **Executar código**) no bloco **Integração** para chamar a API do seu sistema de cobrança e devolver o texto ou link ao cliente (veja [Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot)).
- **No painel da conversa:** crie um plugin para abrir o seu sistema ao lado da conversa (veja [Criar um plugin para o painel da conversa](/docs/desenvolvedor/criando-plugin-integracao)).
- **Fora do bot:** use webhooks e requisições HTTP com **Cenários** ou integre pela API pública (veja [Cenários: visão geral](/docs/cenarios/visao-geral) e [Para desenvolvedores: API, plugins, MCP e links](/docs/desenvolvedor/visao-geral)).

Se você procura boletos, Pix ou cartão da mensalidade da própria Kinbox, veja [Faturas, boletos e nota fiscal](/docs/assinatura/faturas).

## Variações

- dá para mandar pix pelo chat da kinbox
- a kinbox gera qr code pix ou link de pagamento
- como cobrar cliente pelo whatsapp na kinbox
- dá para gerar boleto dentro da conversa
- como enviar segunda via de boleto pelo bot
- a kinbox integra com asaas ou banco inter
- dá para cobrar cartão de crédito pela conversa
- a kinbox avisa automaticamente quando o cliente paga o boleto
