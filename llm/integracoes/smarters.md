---
title: "Smarters: janelas, opções de renovação e avisos do quadro"
description: "Regras técnicas da Smarters na Kinbox: campos e mensagens de cada ação do quadro, opções de horas do teste, aviso de usuário diferente do telefone e casos de borda."
keywords: [smarters, add teste, renovar cliente, renovar teste, desbloquear confiança, editar cliente, copiar lista, usuário não bate com o telefone]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/integrations/EditSmarters.tsx
  - web:src/components-old/chat/side/integrationApps/**
codigo:
  - web:src/pages/settings/integrations/EditSmarters.tsx
  - web:src/components-old/chat/side/integrationApps/**
verificado_em: 2026-11-26
---

Complemento técnico de [Integrar com a Smarters](/docs/integracoes/smarters).

## Conta, busca e avisos do quadro

- **Permissão e conta:** o painel **Smarters** (**Configurações** → **Integrações** → **Apps** → **Smarters**) exige a permissão **Integrações** ou proprietário. Cada workspace mantém apenas uma integração Smarters.
- **Salvamento sem teste de conexão:** salvar **Chave Pública** e **Chave Privada** no painel não testa as chaves na Smarters. Chaves inválidas e contato sem cadastro ficam visualmente iguais no quadro (exibindo apenas **Add teste**, sem aviso de erro).
- **Visibilidade e desligamento:** o quadro **Smarters** aparece no painel **Detalhes** apenas com **Habilitar integração** ligado, e fica oculto para membros com a restrição **Esconder informações de integração** ou no modo de treino da Academia. Desligar o interruptor oculta o quadro e encerra o uso.
- **Contato sem telefone:** o botão **Add teste** fica desabilitado e nenhuma busca é feita.
- **Aviso de usuário diferente do telefone:** quando o campo **Usuário** devolvido pela Smarters não contém o telefone da conversa, aparece um triângulo vermelho ao lado de **Usuário** com a dica `"O usuário não está batendo com o número de telefone do contato. Confira se o usuário realmente pertence a esse contato. Caso não pertença atualize a página."`. Usuários criados com nome diferente do telefone sempre disparam esse aviso; o quadro tenta uma recarga automática uma vez por conversa.
- **Sem escrita na Kinbox nem bot:** a integração não grava dados nos campos do contato, não envia mensagens ao contato e não tem ação pronta no bot.

## Campos e mensagens de cada ação

- Criar teste, editar, renovar, renovar teste e desbloquear confiança alteram de verdade a conta do cliente final na Smarters assim que são confirmados.
- **Add teste (janela Adicionar usuário Smarters, botão Criar):** cria apenas usuário de teste (a duração do teste é definida pela Smarters).
  - Campos: **Nome de usuário** (obrigatório, `"Escolha um nome de usuário"`, padrão = telefone do contato), **Senha** (obrigatória, `"Escolha uma senha"`, padrão = 8 dígitos aleatórios), **E-mail** (opcional, padrão = e-mail do contato), **Whatsapp** (desabilitado, preenchido com o telefone do contato; obrigatório, `"Escolha um whatsapp"`) e **Canal adulto** (desmarcada por padrão).
  - Sem confirmação extra. Sucesso: `"Usuário criado"`. Falha: mensagem devolvida pela Smarters (ou `"Erro <código>"`); a janela fecha mesmo em falha, perdendo os dados digitados.
- **Editar cliente (janela Editar cliente, botão Editar):** campos **Usuário** (obrigatório, `"Escolha um nome de usuário"`), **Senha** (obrigatória, `"Escolha uma senha"`) e **Canal adulto**; também reenvia o e-mail e o telefone atuais do contato. Sem confirmação extra. Sucesso: `"Cliente editado."`; falha: mensagem da Smarters.
- **Renovar cliente (janela Renovar cliente, botão Renovar):** campos **Nome de usuário** (bloqueado), **Telas** (obrigatório, mínimo 1, `"Escolha quantas telas"`, padrão = telas atuais), **Meses** (obrigatório, mínimo 1, `"Escolha quantos meses quer renovar"`, padrão = 1) e **Canal adulto**. Sem confirmação extra. Sucesso: `"Cliente renovado!"`; falha: mensagem da Smarters (o quadro recarrega nos dois casos).
- **Renovar teste (submenu, só para usuários de teste):** opções exibidas na ordem **1 hora**, **6 horas**, **4 horas** e **24 horas**. Cada opção abre `Renovar +<horas> horas` com **Nome de usuário** (bloqueado), **Canal adulto** e botão **Renovar**. Sucesso: `"Renovado por <horas> horas!"`; falha: mensagem da Smarters.
- **Desbloquear confiança (só para usuários que não são de teste):** abre confirmação **Desbloquear Confiança** com o texto `"Você deseja liberar 3 dias de confiança para o cliente?"` e botão **Sim** (o prazo real é o configurado na Smarters). Sucesso: `"Cliente desbloqueado por 3 dias"`; falha: mensagem da Smarters.
- **Copiar informações e Copiar lista (somente cópia):** **Copiar informações** copia os dados de acesso da conta formatados com asteriscos (`"Informações copiadas para o clipboard"`). **Copiar lista** oferece **Lista de canais (MPEG-TS)**, **Lista de canais (HLS)** e **Lista de canais (SS IPTV)** (`"Lista de canais (…) copiado para o clipboard"`).

## Limitações e casos de borda

- **Dados do contato enviados nas ações:** **Editar cliente** e **Renovar cliente** enviam o telefone e o e-mail que estão no cadastro do contato na Kinbox; alterar o telefone ou o e-mail do contato muda o que é enviado à Smarters.
- **Ações que não existem na Smarters:** o quadro não permite bloquear/desbloquear, apagar usuário, trocar de plano nem ver histórico de canais (recursos presentes na integração com o [Gestor Premium](/docs/integracoes/gestor-premium)).
