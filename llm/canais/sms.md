---
title: "SMS: créditos, contador de 160 caracteres, erros de envio e um canal por workspace"
description: Regras do SMS na Kinbox, com o consumo de créditos, pacotes e liberação, contador de caracteres na conversa e na campanha, mensagens de erro de envio e de compra, e um canal por workspace.
keywords: [sms sem créditos, sem créditos disponíveis, 160 caracteres, 70 caracteres acento, contador sms, limite de envio de sms por minuto, número inválido sms, compra de sms desabilitada, pacotes de sms, 100 mil créditos, liberar créditos, um canal de sms, sms emoji, você precisa configurar um canal de sms]
publico: llm
tipo: referencia
fontes:
  - api-v0:server/controllers/SmsController.js
  - api-v0:server/controllers/TransactionOrderController.js
  - web:src/pages/settings/channels/sms/BuySmsModal/index.tsx
  - web:src/lib/sms_counter.jsx
  - web:src/components-old/chat/side/DetailsTitle.tsx
  - api:src/modules/campaigns/campaigns.service.ts
codigo:
  - web:src/pages/settings/channels/sms/**
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/lib/sms_counter.jsx
  - web:src/components-old/chat/side/DetailsTitle.tsx
  - web:src/pages/settings/billing/AddBalanceModal/AddSmsCreditModal.tsx
  - api-v0:server/controllers/SmsController.js
  - api-v0:server/controllers/TransactionOrderController.js
  - api-v0:server/modules/sms/**
  - api:src/modules/campaigns/campaigns.service.ts
verificado_em: 2026-11-26
---

Detalhes de referência da página [Usar SMS: criar o canal e comprar créditos](/docs/canais/sms).

## Canal

- **Limite por workspace:** 1 canal de SMS por workspace. Com um canal de SMS ativo, o cartão **SMS** fica desativado e vai para o fim da lista em **Conectar novo canal**.
- **Criação:** não exige créditos para criar. O canal nasce com o nome `SMS`, status **Conectado** e aviso `"Canal de SMS criado."`.
- **Lista de canais:** a linha exibe **SMS** e, logo abaixo, `<n> créditos` com os **Créditos de SMS** atuais do workspace.
- **Ações na lista:** menu de três pontos com **Copiar ID** (`"ID do canal (<id>) copiado para clipboard."`) e **Excluir** (`"Tem certeza que deseja excluir esse canal?"`). **Excluir** desliga o canal e mantém as conversas.
- **Permissões:** abrir **Canais**, criar e excluir o canal exige a permissão **Gerenciar Canais** ou ser proprietário do workspace; **Somente pode dar manutenção simples em canais** esconde **Novo canal** e **Excluir**.

## Créditos

- **Consumo:** 1 crédito de SMS por mensagem enviada, tanto na conversa quanto em campanhas. O crédito é descontado antes do envio e não é devolvido se o envio falhar.
- **Separado do saldo da carteira:** **Créditos de SMS** são separados do saldo em reais da carteira; o saldo da carteira não compra créditos de SMS pela tela. Veja [Saldo da carteira e créditos: o que consome](/docs/conceitos/saldo-e-creditos).
- **Dois caminhos de compra (mesmo saldo de créditos):**
  - **Pelo canal:** **Configurações** → **Chat** → **Canais** → linha **SMS** → **Comprar créditos**. Se o botão **Comprar créditos** não aparecer, fale com quem gerencia o seu plano ou compre pela **Assinatura**.
  - **Pela assinatura:** **Configurações** → **Assinatura** → **Carteira** → **Adicionar crédito** (exige a permissão **Assinatura** ou ser proprietário). Veja [Adicionar saldo e créditos de SMS](/docs/assinatura/adicionar-saldo).
- **Pacotes e pagamento:** pacotes de 1 mil a 1 milhão de créditos (1.000, 3.000, 5.000, 10.000, 15.000, 20.000, 30.000, 50.000, 75.000, 100.000, 500.000 e 1.000.000; padrão 1.000), pagos via **Pix** (**Comprar com PIX**). Com o painel aberto, a Kinbox confere o pagamento a cada 10 segundos e exibe **Pago** sobre o QR Code ao confirmar.
- **Acima de 100 mil créditos e liberação:** para comprar acima de 100 mil créditos, fale com o suporte. Após a confirmação do pagamento, os créditos podem levar até **1 dia útil** para liberar.
- **Histórico pelo canal:** **Ver histórico** abre **Histórico de transações de SMS** com **Status** (como **Aguardando pagamento** e **Aprovada**), **Créditos**, **Valor**, **Data**, ação **Ver QRCode** no menu da linha e **Carregar mais**.
- **Erro na compra:** se aparecer `"Compra de novas SMS's está desabilitada no momento"`, fale com o suporte.
- **SMS no plano:** o plano pode incluir SMS mensais na assinatura (cartão **SMS** em [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano)).

## Escrever um SMS

| Regra | Na conversa | Na campanha |
| --- | --- | --- |
| Anexos | Não (botão **Anexar** não aparece) | Não |
| Gravar áudio | Não (botão **Áudio** não aparece) | Não |
| Contador | `(n/160)`; cai para 70 com letras acentuadas (ex.: `ã`, `ç`, `é`) e fica vermelho quando passa | `(n/160)`; com acentos, o contador ao lado de **Mensagem** pode ficar vermelho antes de 160 |
| Limite e corte em 160 caracteres | Não bloqueia nem corta | Bloqueia acima de 160 ao criar (`"Mensagem de SMS não pode conter mais de 160 caracteres."`) e corta em 160 após substituir variáveis |
| Emojis | — | Bloqueado (`"Mensagem não pode conter emojis."`) |

- **Menu do bot por SMS:** vira texto com as opções listadas em linhas.
- **Arquivo de frase rápida ou bot:** vai como link no texto da mensagem.
- Veja também [Criar uma campanha por SMS](/docs/campanhas/campanha-de-sms).

## Enviar para um contato

- Exige a permissão **Iniciar chat ativo** (ou ser proprietário).
- Na conversa, o painel do contato mostra **Enviar SMS** quando o contato tem celular cadastrado e abre a janela de nova mensagem com o canal de SMS. Também é possível iniciar pela janela **Enviar mensagem** da **Caixa de entrada** escolhendo o canal de SMS ([Iniciar uma conversa com um contato](/docs/conversas/iniciar-conversa)).
- Sem a permissão **Iniciar chat ativo**, o botão fica desabilitado com a dica `"Você não tem permissão para iniciar conversas no SMS."`.
- Sem um canal de SMS ativo no workspace, clicar em **Enviar SMS** exibe `"Você precisa configurar um canal de SMS para enviar mensagens."`.

## Erros de envio

| Mensagem | Causa | O que fazer |
| --- | --- | --- |
| `"Sem créditos disponíveis"` | O workspace não tem **Créditos de SMS**; na conversa a mensagem fica com erro. | Compre créditos de SMS pelo painel **Canal de SMS** ou em **Assinatura** → **Carteira**. |
| `"Mensagem inválida, número inválido ou você não tem permissão para enviar SMS para este número"` | O envio foi recusado pelo número de destino ou pelo conteúdo da mensagem. | Confira se o número de celular do contato está correto e revise o texto. |
| `"Você atingiu o limite de envio de SMS por minuto"` | Muitos disparos de SMS em pouco tempo. | Aguarde um pouco e tente enviar novamente. |
| `"Sem saldo de créditos SMS suficiente."` | Tentativa de criar campanha por SMS sem créditos disponíveis no workspace. | Compre créditos de SMS antes de criar a campanha. |

## Respostas

- As respostas enviadas pelo contato chegam na mesma conversa de SMS na **Caixa de entrada**.

## Número do WhatsApp

- O SMS não usa o número de WhatsApp do workspace: são canais independentes.
