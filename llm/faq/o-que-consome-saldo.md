---
title: O que gasta o saldo da carteira?
description: O saldo da carteira paga os recursos de IA (agentes, copiloto, análises, transcrição) e as ligações; SMS usa créditos próprios e templates do WhatsApp oficial não descontam da carteira.
keywords: [saldo, carteira, consumo, o que gasta, créditos, saldo diminuindo, custo da ia, sms, template]
publico: llm
tipo: faq
fontes:
  - web:src/pages/reports/WalletUsage/wallet-usage.helper.ts
  - api:src/modules/agents/agent.runner.ts
  - api-v0:server/controllers/WbaCloudController.js
  - web:src/pages/settings/billing/BillingV2.tsx
codigo:
  - web:src/pages/settings/billing/BillingV2.tsx
  - web:src/pages/settings/billing/AddBalanceModal/index.tsx
  - web:src/pages/settings/billing/WalletAlertModal.tsx
  - web:src/pages/reports/WalletUsage/wallet-usage.helper.ts
  - web:src/pages/settings/copilot/CopilotChatDrop.tsx
  - api:src/modules/agents/agent.runner.ts
  - api:src/modules/signals/signals.definitions.ts
  - api:src/modules/voip/voip.service.ts
  - api:src/modules/whatsapp-calling/whatsapp-calling.service.ts
  - api-v0:server/auxiliary/walletDefaults.js
verificado_em: 2026-11-26
---

## Pergunta

O que gasta o saldo da carteira?

## Resposta

O saldo da carteira paga os recursos de inteligência artificial (agentes de IA, copiloto, análises e transcrição) e as ligações; o envio de SMS usa **Créditos de SMS** separados.

O consumo do saldo se divide nestas categorias:

- **Agente de IA**: respostas dos agentes de IA (inclusive quando usados pelo bloco **Agente de IA** do bot) e processamento do **conhecimento** dos agentes de IA.
- **Copiloto**: comandos, chat do copiloto, avaliadores e revisor de mensagens (apenas quando ativados, exceto o botão **Sugestões**, que gera sugestões sob demanda ao ser clicado mesmo sem **Sugestões automáticas** (e gasta saldo), e **Criar com Copiloto** nos editores do WhatsApp oficial, que não depende da tela do Copiloto; veja [Configurações do copiloto](/docs/copiloto/configuracoes-de-copiloto)).
- **Análises** (recursos do **Copiloto**, quando ligados): **Análise de sentimento**, **Lead score**, **Classificação de intenção**, **Cliente preso no bot**, **Sugestão de retorno**, **Aviso ao resolver** e **Não reabrir por agradecimento**.
- **Voz e áudio**: transcrição de áudios; nas ligações do WhatsApp, o atendimento por IA fora da franquia, a transcrição pedida pelo botão **Transcrever** e o resumo da transcrição (a gravação e a transcrição automática estão incluídas no plano de ligações; ligações não atendidas não cobram); no VoIP, a transcrição e o resumo das ligações.
- **Outros**: ligações por telefone (VoIP), minutos excedentes do plano de ligações do WhatsApp e geração de FAQ a partir das conversas.
- **Mensagens**: o relatório **Saldo** tem essa sexta categoria, para mensagens cobradas por envio. Hoje, as mensagens de template do WhatsApp oficial não descontam da carteira, então ela costuma ficar vazia.

**O que não gasta saldo**: envios de SMS (usam **Créditos de SMS**), templates do WhatsApp oficial (não descontam da carteira), bots sem o bloco **Agente de IA**, **Automações**, **Cenários** e **Atribuição automática**.

Quando o saldo fica muito baixo, perto de zero, o agente de IA para de responder (no teste do agente aparece **Saldo Insuficiente** e "O agente não respondeu porque o saldo acabou. Faça uma recarga para continuar."). O copiloto passa a mostrar **Seus créditos acabaram** (nas telas do copiloto, "créditos" é o saldo da carteira) e as ligações por telefone são encerradas se o saldo acabar. Em agentes gerenciados por um parceiro, o consumo pode sair da carteira do parceiro em vez da carteira do workspace.

Para acompanhar os gastos, consulte **Relatórios** → **Saldo** (por categoria) e o **Extrato do saldo**. A recarga é feita por **Pix** em **Configurações** → **Assinatura** → **Carteira** → **Adicionar saldo** (**Assinatura** só aparece para quem tem acesso ao financeiro).

Veja mais detalhes em [Saldo da carteira e créditos: o que consome](/docs/conceitos/saldo-e-creditos).

## Variações

- por que meu saldo está diminuindo
- o que desconta da carteira da kinbox
- a inteligência artificial da kinbox cobra saldo
- quanto gasta o agente de ia
- sms usa o saldo da carteira
- template do whatsapp oficial desconta do saldo
- o que para de funcionar quando o saldo acaba
