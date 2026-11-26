---
title: Limite de canais por plano, status da lista e erros de plano
description: Regras de limite de canais de WhatsApp e Instagram por plano, todos os status da lista de canais e as mensagens de erro de plano.
keywords: [limite de canais, plano, whatsapp no plano, linhas de whatsapp, assinatura expirada, status do canal, exportar canais]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
  - api-v0:server/controllers/NewPaymentController.js
codigo:
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/channels/channels.def.tsx
  - web:src/pages/settings/channels/whatsapp/ForwardZapModal.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/routes/IntegrationsApiRoutes.js
verificado_em: 2026-11-26
---

Detalhes de referência da página humana "Canais: conectar e gerenciar" (`/docs/canais/visao-geral`).

## Limite de canais por plano e mensagens de erro

Criar um canal de WhatsApp (oficial ou por QR Code) passa pela checagem do plano. **Recriar** um canal não passa por essa checagem.

- **WhatsApp (assinatura atual)**: conta todos os canais de WhatsApp ativos do workspace, somando oficiais e por QR Code, contra a quantidade contratada de **WhatsApp** (cobrada por linha).
  - Acima do limite (inclusive ao criar um novo canal): `"Você precisa remover canais de Whatsapp para prosseguir com a contratação"`
  - Assinatura vencida há mais de 3 dias: `"Assinatura expirada"`
- **WhatsApp (assinatura antiga)**: mensagens de erro possíveis:
  - `"WhatsApp bloqueado para seu plano atual."`
  - `"Seu plano atual não permite adicionar ou modificar número de whatsapps."`
  - `"Seu plano atual não permite adicionar o novo canal"`
  - `"Sua assinatura expirou"`
- **Instagram**: tem limite próprio e não pode ser adicionado no período de teste grátis:
  - `"Você não pode adicionar canais de Instagram em plano trial"`
- **SMS**: máximo de 1 por workspace (o cartão fica desativado quando o workspace já possui um).
- **Telegram, E-mail, Widget, Facebook e Customizado**: não passam pela checagem de quantidade do plano. O cartão **Widget** não aparece para membros com a restrição `"Não pode gerenciar widget."`

## Todos os status da lista de canais

No layout novo, os textos aparecem com Inicial Maiúscula em cada palavra por CSS (por exemplo, "Necessário Reiniciar Canal").

| Situação | Rótulo na tela | Dica (tooltip) |
| --- | --- | --- |
| Conectado | **Conectado** (no layout novo, selo verde de check) | "Seu canal está conectado e funcionando." |
| Desconectado | **Desconectado** | "Seu canal está desconectado. Verifique sua conexão de internet." |
| Criando | **Criando...** | "Estamos criando seu canal, esse processo poderá demorar até 10 minutos." |
| Reiniciando | **Reiniciando...** | "Estamos reiniciando seu canal, esse processo poderá demorar até 5 minutos." |
| Precisa ler QR | **Necessário ler QR-Code** | "Leia o QRCode com seu celular na página do canal para conectar." |
| Precisa reiniciar | **Necessário reiniciar canal** | 'Vá no seu canal, clique em "ações" e em Reiniciar canal.' |
| Precisa recriar | **Recomendado recriar canal** | 'Canal desatualizado. Vá no seu canal, clique em "ações" e em Recriar canal. Será necessário ler o QRCode novamente.' |
| Necessário relogar (outros canais) | **Necessário relogar** | "Necessário reenviar suas credenciais." |
| Credenciais inválidas (outros canais) | **Credenciais inválidos** (assim, no masculino) | Sem dica |
| Código inválido (outros canais) | **Código inválido** | Sem dica |
| Código requerido (outros canais) | **Código requerido** | Sem dica |
| Outros estados sem rótulo | Código cru em vermelho: `starting`, `connecting`, `pending_review`, `error` | Sem dica |

## Alertas extras na linha do canal

- **Número bloqueado**: ícone vermelho com a dica `"Seu canal foi possivelmente bloqueado pelo WhatsApp"`.
- **Migração em andamento**: ícone de carregamento com a dica `"Em transferência de conversas"`.
- **Aquecedor**: selo **Aquecendo** (`"Canal em aquecimento."`), visível apenas em workspaces com recursos em teste.
- **Clássica antiga**: canal **Clássica** criado antes de 09/01/2023 exibe **Recomendado recriar canal** com a dica `'Canal desatualizado. Recomendado recriar. Vá no seu canal, clique em "ações" e em Recriar canal. Será necessário ler o QRCode novamente.'`

## Filtro e exportação da lista

- O filtro **Status** = **Desconectado** retorna todos os canais que não estão conectados (inclui status como **Necessário ler QR-Code**, **Necessário reiniciar canal**, `starting`, `connecting`, `error`, entre outros).
- A exportação da lista inclui as colunas: ID, Nome, Descrição, Tipo, Telefone, Identificador, Conectado (Sim/Não) e os campos personalizados de canal.

## Excluir e criar novamente com o mesmo número

- **Excluir** um canal de WhatsApp apenas desliga o canal (fica inativo e não apaga as conversas). Na conexão **Express**, a exclusão também remove o canal dos bots que o usavam.
- Excluir um canal **Clássica** não tira o canal dos bots (diferente da **Express**); não prometa nada sobre bots depois de excluir um canal **Clássica**.
- Criar novamente um canal com o **mesmo número** no mesmo workspace reaproveita o canal excluído: mantém o mesmo ID e traz as conversas antigas de volta, inclusive quando o canal excluído era **Clássica** e o novo canal é criado como **Express**.

## Migrar conversas: o que não é migrado

- **Migrar conversas** (lista) / **Migrar** (painel do canal) move, uma a uma, as conversas do canal de origem para o canal escolhido em **Migrar para:** (só canais de WhatsApp ativos do workspace, oficiais ou por QR Code).
- Se o contato **já tem conversa no canal de destino**, a conversa dele é pulada e fica no canal de origem. Por isso a migração pode não levar tudo: confira o histórico nos dois canais antes de excluir o canal de origem.
- Enquanto migra, a linha do canal de origem mostra o ícone "Em transferência de conversas". Pode levar algumas horas.
- Só um processo de migração por canal de origem por vez: um segundo pedido recebe "Já existe um processo de transferência de conversas para este canal em andamento".
- As conversas migradas parecem ter sido sempre do canal de destino.

## Permissões que afetam canais

| Permissão ou restrição (seção **Canais**) | Efeito |
| --- | --- |
| **Gerenciar Canais** | "Ver, adicionar, editar e excluir canais." Sem ela, a tela de canais não abre. O dono do workspace sempre pode. |
| **Somente pode dar manutenção simples em canais** | "Membro pode apenas desconectar, reiniciar, sincronizar histórico e recriar o canal." Some o **Novo canal** e o **Excluir**; **Migrar** fica desativado; as opções do canal ficam desativadas; salvar mostra "Você não tem permissão para editar o canal". |
| **Somente pode ver canais na lista se estiver no grupo do canal** | O membro só vê os canais com **Restringir visibilidade** ligado para um grupo de membros dele. **Migrar** e **Salvar** ficam desativados. |
| **Não pode ver notificações de canal** | Esconde a faixa **Telefone desconectado** da lista de conversas. |
| **Não pode gerenciar widget.** | Esconde os canais de widget e o cartão **Widget**. |
