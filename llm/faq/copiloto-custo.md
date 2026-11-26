---
title: O copiloto gasta saldo?
description: Sim. O copiloto consome saldo da carteira do workspace quando uma função ligada roda, quando alguém clica no botão Sugestões e quando o painel Criar com Copiloto é usado nos editores do WhatsApp oficial.
keywords: [copiloto é pago, quanto custa o copiloto, copiloto consome créditos, saldo copiloto, sugestões de resposta gastam saldo, análise de sentimento cobra, como economizar saldo no copiloto, extrato copiloto]
publico: llm
tipo: faq
fontes:
  - api:src/modules/copilot/copilot.service.ts
  - api:src/modules/signals/signals.service.ts
  - api:src/modules/wallet/micro-debit.service.ts
  - web:src/pages/settings/copilot/CopilotChatDrop.tsx
codigo:
  - web:src/pages/settings/copilot/**
  - web:src/lib/copilotChecks.tsx
  - web:src/lib/messageReview.ts
  - web:src/lib/signals.ts
  - api:src/modules/copilot/**
  - api:src/modules/signals/**
  - api-v0:server/services/**
  - api-v0:server/modules/chat/**
verificado_em: 2026-11-26
---

## Pergunta

O copiloto gasta saldo?

## Resposta

Sim. O copiloto consome o saldo da carteira do workspace (chamado de "créditos" nas telas do copiloto) sempre que uma função ligada roda. Funções desligadas não gastam, exceto o botão **Sugestões**, que gera sugestões sob demanda ao ser clicado mesmo sem **Sugestões automáticas** (gerar uma nova sugestão consome saldo), e **Criar com Copiloto** nos editores do WhatsApp oficial, que não depende da tela do Copiloto.

O que consome saldo e como aparece no **Extrato do saldo**:

- **Comandos do menu e sugestões de resposta:** `"Uso do copilot"`. Cada clique em um comando gera e cobra novamente; já a sugestão de resposta para a mesma última mensagem fica guardada por 72 horas sem cobrar de novo ao reabrir a conversa.
- **Transcrição de áudio:** `"Transcrição de áudio"`, quando **Transcrever áudios** está ligado nas sugestões (ou no botão **Transcrever** da mensagem).
- **Análises:** `"Análise de sentimento"`, `"Lead score"`, `"Classificação de intenção"`, `"Cliente preso no bot"` e `"Avaliadores do copiloto"`. Todas as análises ligadas rodam juntas em uma única leitura depois das mensagens do contato (os usos são lançados agrupados no extrato), e a leitura é cobrada mesmo quando o resultado fica indefinido.
- **Avisos e automações:** `"Revisor de mensagens"`, `"Aviso de pendência ao resolver"`, `"Sugestão de retorno"`, `"Rascunho de retorno"` e `"Mensagem de encerramento"`.
- **Editores do WhatsApp oficial (Criar com Copiloto):** `"Uso do copilot (chat)"`.
- **Base de conhecimento:** processar a base em **Configurações** → **Automação** → **Base de conhecimento** não gasta saldo; o uso da base entra no débito normal da resposta.
- **Botão Sugestões sob demanda:** aparece nas conversas elegíveis mesmo sem **Sugestões automáticas** adicionada, e clicar nele gera sugestões (gerar uma nova sugestão consome saldo). Para evitar o uso, ative a restrição **Não mostrar sugestões de respostas** no papel ou limite **Onde o copiloto atua**.

**Limites mínimos de saldo:**

- Com **R$ 0,10 ou menos**, o menu mostra **Seus créditos acabaram** com os comandos desativados e as sugestões não são geradas.
- Comandos, sugestões, análises, avisos, **Não reabrir por agradecimento** e **Criar com Copiloto** só rodam com saldo **acima de R$ 0,20** (sem saldo, nenhum aviso bloqueia o envio ou o encerramento da conversa).
- A transcrição automática de áudios das sugestões exige saldo **acima de R$ 0,90**.

**Como reduzir o consumo:** deixe ligadas apenas as funções usadas, restrinja canais e grupos em **Onde o copiloto atua**, reduza **Quantidade de sugestões** e desligue **Transcrever áudios** ou **Processar imagens** se não precisar deles.

Veja mais em [Saldo da carteira e créditos: o que consome](/docs/conceitos/saldo-e-creditos), [Adicionar saldo e créditos de SMS](/docs/assinatura/adicionar-saldo) e [Configurações do copiloto](/docs/copiloto/configuracoes-de-copiloto).

## Variações

- copiloto é pago?
- quanto custa o copiloto
- copiloto consome créditos
- por que meu saldo está caindo com o copiloto
- sugestões de resposta gastam saldo
- análise de sentimento cobra
- como economizar saldo no copiloto
