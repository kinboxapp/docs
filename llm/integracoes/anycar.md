---
title: "Anycar: tipos de consulta, mensagens e ação do bot"
description: "Regras técnicas da Anycar na Kinbox: os tipos de consulta, formatos de placa aceitos, mensagens de erro, resultado da consulta e o que a ação RENAJUD Plus do bot envia e grava."
keywords: [anycar, tipos de consulta, renajud plus, placa inválida, consulta demorou, resultado da consulta, campo placa, bot anycar]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/integrations/EditAnycar.tsx
  - web:src/components-old/chat/side/integrationApps/**
  - api-v0:server/modules/chat/**
codigo:
  - web:src/pages/settings/integrations/EditAnycar.tsx
  - web:src/components-old/chat/side/integrationApps/**
  - api-v0:server/modules/**
  - api-v0:server/services/**
verificado_em: 2026-11-26
---

Complemento técnico de [Integrar com a Anycar](/docs/integracoes/anycar).

## Conta, placa e visibilidade

- **Permissão e conta:** o painel **Anycar** (**Configurações** → **Integrações** → **Apps** → **Anycar**) exige a permissão **Integrações** ou proprietário. Cada workspace mantém apenas uma integração Anycar.
- **Visibilidade e desligamento:** o quadro **Anycar** aparece no painel **Detalhes** apenas com **Habilitar integração** ligado, e fica oculto para membros com a restrição **Esconder informações de integração** ou no modo de treino da Academia. Desligar **Habilitar integração** oculta o quadro e também impede a ação **Consulta RENAJUD Plus na Anycar** no bot (que passa a enviar a mensagem de falha ao cliente).
- **Placa e tempo limite (RENAJUD Plus):** exige **Habilitar integração** ligado e **Api Key** preenchida, aceita placa no formato antigo (3 letras e 4 números, com ou sem hífen) ou no padrão Mercosul (por exemplo, `ABC1D23`), normaliza letras minúsculas e espaços nas pontas e tem tempo limite de 15 segundos.
- **Sem persistência pelo quadro:** consultas pelo quadro não alteram o contato nem enviam mensagens ao cliente; apenas o último **Tipo de consulta** escolhido fica lembrado.

## Tipos de consulta no quadro

O padrão selecionado é **RENAJUD Plus**. Os 25 tipos disponíveis em **Tipo de consulta** são:

- **RENAJUD Plus**
- **Estadual - TODAS UF´s**
- **Estadual - RS**
- **Estadual - MG**
- **Crlv (SP)**
- **Crlv (MG)**
- **Crlv (MS)**
- **Crlv (Nacional) [PI,PR,RN,PA,RR,AP,MA,TO,MT,DF,MS,CE]**
- **Agregados - Própria (Placa)**
- **Agregados + Renavam (Placa)**
- **Fipe (Placa)**
- **Proprietário atual V3**
- **Histórico Proprietários**
- **Nacional V1**
- **Nacional V2**
- **Nacional V3**
- **Gravame**
- **Recall**
- **Indice de Risco**
- **Renainf (Multas)**
- **Sinistro**
- **Leilão - Base 1**
- **Leilão - Base 2**
- **Leilão - Própria**
- **Roubo e Furto**

## Formato do resultado e mensagens do quadro

- **Janela Resultado:** exibe os campos devolvidos pela Anycar trocando `_` por espaço nos nomes, valores vazios como `—`, valores verdadeiro/falso como `Sim`/`Não` e listas como `Item 1`, `Item 2`. Quando não vêm detalhes, mostra `"Consulta concluída sem dados detalhados."`.
- **Mensagens de validação e erro:**
  - Sem tipo selecionado: `"Selecione um tipo de consulta."`
  - Sem placa: `"Você precisa preencher a placa do veículo."`
  - Sem **Api Key** nos tipos que não são **RENAJUD Plus**: `"Você precisa configurar a chave de API do Anycar."`
  - Sem **Api Key** ou integração desligada em **RENAJUD Plus**: `"A integração Anycar não está configurada para este workspace."`
  - Placa fora do padrão: `"Placa inválida. Revise e tente novamente."`
  - Resposta da Anycar sem sucesso ou sem dados: `"A Anycar não conseguiu concluir a consulta. Tente novamente."` (ou a mensagem devolvida pela Anycar / `"Não foi possível concluir a consulta."`).
  - Tempo limite acima de 15 segundos: `"A consulta demorou mais que o esperado. Tente novamente."`
  - Outros erros: `"Não foi possível realizar a consulta no momento."`

## Ação no bot: Consulta RENAJUD Plus na Anycar

Única ação pronta da Anycar no bloco **Integração** do bot, grupo **Outros** (sem campos próprios na gaveta; pulada no **Simular bot** — veja [Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot)).

- **Leitura da placa:** lê o campo personalizado ativo e preenchido do contato cuja **Chave reservada** é `placa` (um campo chamado "Placa" gera essa chave; veja [Criar campos personalizados](/docs/configuracoes-no-workspace/campos-personalizados-no-kinbox)).
- **Envio ao cliente:** envia o resultado formatado em linhas na conversa, como mensagem do bot para o cliente, com o título `"Consulta RENAJUD Plus"`. Quando o texto é longo, divide em mensagens de até cerca de 3.450 caracteres (continuações com o título `"Continuação da consulta RENAJUD Plus"`).
- **Gravação no contato (`rejanud_plus`):** se existir no contato um campo personalizado com a **Chave reservada** `rejanud_plus` (escrito exatamente assim, com `rejanud`), o bot grava nele o resultado completo em JSON, desde que não ultrapasse 8.192 caracteres. Se o campo não existir ou se o resultado passar de 8.192 caracteres, nada é gravado e nenhum aviso aparece.
- **Falha no bot:** em caso de placa vazia ou inválida, integração desligada ou sem chave, ou falha na Anycar, o bot envia ao cliente na conversa: `"Não foi possível realizar a consulta RENAJUD Plus no momento."`.
