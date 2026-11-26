---
title: "Gestor Premium: ações do quadro, limites e menu IPTV × P2P"
description: "Regras técnicas do Gestor Premium na Kinbox: busca do usuário, limites de cada janela, ações só de IPTV, migração e casos de borda."
keywords: [gestor premium, iptv, p2p, renovar, conexões máximas, habilitar teste, migrar cliente, lista ssiptv, histórico de canais, desbloqueio de confiança]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/integrations/EditGestorPremium.tsx
  - web:src/components-old/chat/side/integrationApps/**
codigo:
  - web:src/pages/settings/integrations/EditGestorPremium.tsx
  - web:src/components-old/chat/side/integrationApps/**
verificado_em: 2026-11-26
---

Complemento técnico de [Integrar com o Gestor Premium](/docs/integracoes/gestor-premium).

## Conta e busca do usuário

- **Permissão e conta:** o painel **Gestor Premium** (**Configurações** → **Integrações** → **Apps** → **Gestor Premium**) exige a permissão **Integrações** ou proprietário. Cada workspace mantém apenas uma integração Gestor Premium.
- **Token e Url:** **Token** é obrigatório (`"Coloque seu token"`). **Url** é opcional: se ficar vazio, a Kinbox usa o endereço padrão do serviço; preencha apenas se o seu provedor usa endereço próprio. Salvar não testa o token nem a URL. Com **Token** vazio, o quadro não faz consultas e mantém **Criar usuário** desabilitado.
- **Visibilidade e desligamento:** o quadro **Gestor Premium** aparece no painel **Detalhes** apenas com **Habilitar integração** ligado, e fica oculto para membros com a restrição **Esconder informações de integração** ou no modo de treino da Academia. Como não há ação no bot, desligar o interruptor encerra todo uso.
- **Busca do usuário:** se o contato já tem o campo oculto de integração salvo, o quadro busca por esse identificador; senão, busca pelo telefone do contato (somente números) e salva o campo oculto automaticamente quando encontra. Se o contato não tiver telefone nem vínculo, o quadro não busca.
- **Não encontrado ou credencial inválida:** o quadro exibe apenas **Criar usuário**, sem mensagem de erro.
- **Carregamento de pacotes:** ao abrir qualquer conversa com **Token** configurado, o quadro carrega as listas de pacotes IPTV e P2P (tempo limite de 60 segundos por chamada), o que pode deixar a abertura mais lenta.

## Menu IPTV × P2P

- **Menu IPTV (completo):** **Editar cliente**, **Renovar cliente**, **Renovar teste**, **Adicionar conexão**, **Diminuir conexão**, **Bloquear cliente** / **Desbloquear cliente**, **Desbloqueio de confiança**, **Histórico de canais**, **Adicionar Lista SSIPTV**, **Migrar cliente para P2P**, **Copiar informações**, **Copiar lista** e **Copiar lista curta**.
- **Menu P2P (reduzido):** apenas **Editar cliente**, **Renovar cliente**, **Renovar teste**, **Bloquear cliente** / **Desbloquear cliente**, **Migrar cliente para IPTV** e **Copiar informações**. Em P2P, a tabela com **Canal**, **Pais**, **Conns** e **IP** também não é exibida.
- Não existe ação separada para obter links de playlist além dos submenus **Copiar lista** e **Copiar lista curta** (exclusivos de IPTV; ficam desabilitados até as listas terminarem de carregar).

## Campos, limites e confirmações das janelas

- **Criar usuário (botão Criar):**
  - **Nome de usuário** (obrigatório, `"Escolha um nome de usuário"`, padrão = telefone do contato)
  - **Senha** (obrigatória, `"Escolha uma senha"`, padrão = 8 dígitos aleatórios)
  - **Servidor P2P** (interruptor)
  - **Pacotes** (obrigatório, `"Obrigatório"`; seleção múltipla em IPTV e seleção única em P2P)
  - **Conexões máximas** (1 a 10, padrão 1, só IPTV)
  - **Meses** (1 a 12, obrigatório quando não é teste)
  - **Habilitar Teste** (**ligado por padrão**; com ele ligado, **Meses** e **Conexões máximas** somem e o usuário nasce como teste)
  - Sem confirmação extra. Sucesso: `"Usuário criado."`; grava o campo oculto de integração no contato.
- **Editar cliente (título Editar usuário, botão Salvar):** edita **Nome de usuário**, **Senha** e **Pacotes**; não mostra **Meses**, **Conexões máximas**, **Servidor P2P** nem **Habilitar Teste**. Sucesso: `"Usuário salvo."`.
- **Renovar cliente (título Editar renovação, botão Salvar):** **Meses** (1 a 12, padrão 1), **Conexões máximas** (1 a 10, só IPTV; padrão = conexões atuais ou 4) e **Comprovante** (texto livre opcional). Exibe o aviso retornado pelo serviço.
- **Renovar teste (título Editar renovar teste, botão Salvar):** **Horas** (**4 horas** ou **24 horas**, padrão 4) e **Conexões máximas** (1 a 10). O item fica desabilitado quando o usuário não é de teste.
- **Adicionar conexão / Diminuir conexão (só IPTV):** pedem confirmação (**Sim**) com `"Deseja aumentar o número de conexões desse usuário?"` ou `"Deseja diminuir o número de conexões desse usuário?"`.
- **Bloquear cliente / Desbloquear cliente:** o rótulo muda conforme o status do usuário e pede confirmação (**Sim**) com `"Deseja bloquear esse usuário?"` ou `"Deseja desbloquear esse usuário?"`.
- **Desbloqueio de confiança (só IPTV):** pede confirmação (**Sim**) com `"Deseja desbloquear de confiança esse usuário?"`. A tela não informa quantos dias são liberados.
- **Histórico de canais (só IPTV):** janela somente leitura com **Canal**, **Tempo** e **Stream** e botão **Ok**.
- **Adicionar Lista SSIPTV (só IPTV, botão Salvar):** campo **Código de conexão** (opcional na tela). Aguarda até 90 segundos; se estourar o tempo, mostra `"Servidor não respondeu a tempo, mas talvez operação tenha sido concluída."`.
- **Migrar cliente para P2P / Migrar cliente para IPTV (botão Migrar):** campo obrigatório **Pacotes** com os pacotes do servidor de destino. Selecione o pacote antes de confirmar, pois o item pré-selecionado pode não existir na conta.
- **Copiar informações / Copiar lista / Copiar lista curta:** **Copiar informações** copia os dados de acesso, o endereço e a validade formatados com asteriscos (`"Informações copiadas para o clipboard"`); o endereço copiado segue um valor fixo e não usa o campo **Url** do painel. **Copiar lista** e **Copiar lista curta** (só IPTV) trazem **Lista de canais (MPEG-TS)**, **Lista de canais (HLS)** e **Lista de canais (SS IPTV)** (`"Lista de canais (…) copiado para o clipboard"`).

## Casos de borda

- Ao alternar **Servidor P2P** na janela **Criar usuário** e cancelar sem criar, o quadro pode continuar usando o tipo de servidor escolhido; recarregue o quadro antes de novas consultas ou ações.
- Criar usuário, editar, renovar, renovar teste, ajustar conexões, bloquear, desbloquear, migrar e adicionar lista SSIPTV alteram de verdade a conta do cliente final no momento da confirmação.
- Nenhuma ação envia mensagem automática ao contato e o bot não possui ações prontas do Gestor Premium.
