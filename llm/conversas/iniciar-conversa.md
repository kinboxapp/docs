---
title: "Iniciar conversa: canais aceitos, limite de números e erros"
description: Regras do Enviar mensagem (chat ativo) da Kinbox, com canais aceitos, restrições de chat ativo, limite de números no WhatsApp por QR Code, template no oficial e mensagens de erro.
keywords: [chat ativo, mensagem ativa, enviar mensagem, limite de números, mais de 10 números, apenas receptivo, em atendimento, campos obrigatórios no chat ativo, não é possível enviar mensagem para esse número]
publico: llm
tipo: referencia
fontes:
  - web:src/components-old/inbox/NewMessageModal/index.tsx
  - web:src/components-old/inbox/NewMessageModal/NewMessageTemplate.tsx
  - web:src/pages/inbox/Conversations/index.tsx
  - api-v0:server/controllers/CallController.js
  - api-v0:server/controllers/SmsController.js
codigo:
  - web:src/components-old/inbox/NewMessageModal/**
  - web:src/pages/inbox/Conversations/index.tsx
  - web:src/pages/settings/workspace/index.tsx
  - web:src/pages/settings/channels/whatsapp/EditWhatsApp.tsx
  - api-v0:server/controllers/CallController.js
verificado_em: 2026-11-26
---

Referência complementar de `docs/conversas/iniciar-conversa`.

## Canais aceitos e excluídos

- **Aceitos:** **WhatsApp** (oficial e por QR Code), **SMS** e **E-mail**.
- **Excluídos:** Instagram, Facebook, Telegram, Widget e demais canais não aparecem no campo **Canal**.
- **SMS:** cada mensagem consome **Créditos de SMS** (não o saldo da carteira). O SMS é só texto: a janela não mostra **Anexar** nem **Gravar Áudio** para canal de SMS.
- **Apenas Receptivo:** canais marcados com **Apenas Receptivo** ("Com essa opção marcada, o canal não pode enviar mensagem ativa e nem ser usado em campanhas.") não aparecem na lista **Canal**. Se uma requisição tentar usar esse canal pela API, retorna: "Esse canal não tem permissão para chat ativo".

## Permissões e restrições

- **Iniciar chat ativo:** sem ela, o botão **Enviar mensagem** não aparece na lista de conversas.
- **Limitar canais que pode responder:** exibe no campo **Canal** apenas os canais permitidos para o papel.
- **Limitar horário que pode responder:** fora do horário permitido, bloqueia com "Você não pode enviar mensagens esse horário".
- **Restrições de chat ativo** (verificadas número a número):
  - **Somente pode iniciar chat ativo com conversa não atribuída a outro membro.** — se o número já tem conversa aberta nesse canal atribuída a outra pessoa (ex.: Mariana já atende `+55 11 90000-0001` nesse WhatsApp), bloqueia com "{número} - Em atendimento". O servidor também valida esta restrição com "Você não tem permissão para realizar chat ativo para conversas em atendimento".
  - **Somente pode iniciar chat ativo com conversa não atribuída.** — bloqueia se o número já tem conversa aberta nesse canal atribuída a qualquer pessoa, inclusive o próprio membro (ex.: você mesmo já tem conversa aberta com `+55 11 90000-0001`), com "{número} - Em atendimento".
  - **Somente pode iniciar chat ativo com contato sem conversa atribuída.** — bloqueia se o contato já tem conversa aberta atribuída a outro membro em **qualquer** canal (ex.: Carlos está em atendimento com outra pessoa em outro canal), com "{número} - Em atendimento com {nome}".

## Vários números (separados por vírgula)

- **WhatsApp por QR Code:**
  - **1 a 3 números:** envia diretamente.
  - **4 a 10 números sem a permissão Campanhas:** bloqueado com "Você não tem permissão para enviar mensagem ativa para mais de um número ao mesmo tempo. Necessário a permissão de Gerenciar campanhas.".
  - **4 a 10 números com a permissão Campanhas:** exibe confirmação **Tem certeza?** com o texto "Enviar a mesma mensagem para muitos números em um curto intervalo de tempo pode gerar bloqueio do seu número pelo WhatsApp, tem certeza que deseja continuar?" (botão **Sim**).
  - **Mais de 10 números:** bloqueado com "Proibido. Para enviar para mais de 10 números crie uma campanha.".
- **WhatsApp oficial e SMS:** a tela não aplica esse limite de quantidade de números separados por vírgula (envia um disparo por número). Para envios em volume, orientar **Campanhas**.

## WhatsApp oficial e campos obrigatórios

- **WhatsApp oficial:** substitui o texto livre por **Modelo de mensagem** ("Escolha um modelo de mensagem"), com **Cabeçalho**, **Corpo**, **Botões**, **Anexo** e **Pré-visualização**.
- **Campos obrigatórios no chat ativo** (**Configurações** → **Ambiente** → **Geral**, "Ao fazer chat ativo é obrigatório preencher os campos selecionados"): os campos selecionados aparecem na janela **Enviar mensagem** como obrigatórios.

## Comportamento após envio

- Sem conversa aberta com o contato naquele canal: cria uma sessão nova **atribuída a quem enviou**, sem grupo e sem bot.
- Com conversa aberta naquele canal: a mensagem entra na última sessão não resolvida existente.
- Se algum número falhar, a janela não fecha e lista os números com erro.

## Avisos e mensagens exatas

| Situação | Mensagem exata |
| --- | --- |
| Envio para contato selecionado | "Mensagem enviada para {{name}}." + "Clique aqui" "para ir para a conversa." |
| Envio para número digitado | "Mensagem enviada para o número {número}" |
| Envio para e-mail | "Mensagem enviada para o e-mail {email}" |
| Lista de falhas no envio múltiplo | "Os seguintes números tiveram erros ao enviar. Verifique se os números estão corretos:" |
| Número inválido ou sem WhatsApp | "Não é possível enviar mensagem para esse número" |
| Fora do horário permitido | "Você não pode enviar mensagens esse horário" |
| Canal bloqueado para ativo (API) | "Esse canal não tem permissão para chat ativo" |
| Número já em atendimento | "{número} - Em atendimento" / "{número} - Em atendimento com {nome}" |
| Bloqueio de chat ativo no servidor | "Você não tem permissão para realizar chat ativo para conversas em atendimento" |
| QR Code com 4 a 10 números sem **Campanhas** | "Você não tem permissão para enviar mensagem ativa para mais de um número ao mesmo tempo. Necessário a permissão de Gerenciar campanhas." |
| QR Code com mais de 10 números | "Proibido. Para enviar para mais de 10 números crie uma campanha." |
