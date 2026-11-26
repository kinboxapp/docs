---
title: "Diagnóstico do status do canal QR Code (desconectado, QR expirado, banido, em revisão)"
description: Matriz de diagnóstico do status de um canal de WhatsApp por QR Code na Kinbox, com causa, como confirmar e o que fazer.
keywords: [diagnóstico, desconectado, starting, connecting, pending_review, qr expirou, banido, aparelho removido, mensagem com erro, send_timeout, phone_not_on_whatsapp]
publico: llm
tipo: solucao-de-problema
fontes:
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/settings/channels/whatsapp/EditWhatsApp.tsx
  - web:src/pages/inbox/Conversations/index.tsx
  - api-v0:server/modules/wabox/WaboxStatus.js
  - wabox:apps/docs/webhooks/instance-status.mdx
codigo:
  - web:src/pages/settings/channels/whatsapp/**
  - api-v0:server/controllers/WaboxController.js
  - api-v0:server/modules/wabox/**
  - api-v0:server/controllers/IntegrationsController.js
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/inbox/Conversations/index.tsx
  - wabox:apps/docs/webhooks/instance-status.mdx
verificado_em: 2026-11-26
---

Matriz de diagnóstico complementar à página humana "Meu WhatsApp desconectou" (`/docs/canais/whatsapp/whatsapp-app/como-evitar-que-o-celular-desconecte`).

## Matriz de diagnóstico por status e sinais

Observação importante: na tela de canais, a dica do status **Desconectado** sempre diz `"Seu canal está desconectado. Verifique sua conexão de internet."`, mas na conexão **Express** esse mesmo status cobre queda de rede, QR expirado, aparelho removido no celular e número bloqueado.

| Se a tela mostra | E também ocorre | Causa provável | O que fazer |
| --- | --- | --- | --- |
| **Desconectado** | Volta sozinho para **Conectado** depois de alguns instantes | Queda temporária (internet do celular, celular off-line/desligado por muito tempo ou manutenção) | Aguardar e conferir a internet do celular; se não voltar, clicar em **Reiniciar canal**. |
| **Desconectado** | Logo depois de criar ou reiniciar (~13 min sem ler), sem QR na tela, ou aviso `"QRCode expirou, necessário reiniciar o canal."` | O QR Code da conexão **Express** expirou | Clicar em **Reiniciar canal** para gerar novo QR e ler no celular. |
| **Desconectado** | Não volta sozinho e não há alerta de bloqueio | Várias causas possíveis (celular sem internet, aparelho removido no celular, conexão expirada). O status sozinho não diz qual | 1. Pedir para conferir no WhatsApp do celular, em **Dispositivos conectados**, se a Kinbox ainda está lá. 2. Clicar em **Reiniciar canal**. 3. Se a Kinbox saiu da lista do celular ou o canal pedir QR Code, ler o QR Code de novo. **Desconectar** só quando for conectar do zero: na **Express**, ele encerra a conexão e pede QR Code novo. |
| **Desconectado** | Ícone vermelho `"Seu canal foi possivelmente bloqueado pelo WhatsApp"`, alerta na tela do canal ou faixa `"Possivelmente seu número foi bloqueado pelo WhatsApp."` | Número bloqueado pelo WhatsApp | Conferir no celular (revisão é pelo próprio WhatsApp). Para levar as conversas a outro número, conectar novo canal e usar **Migrar conversas** (conversas de contatos que já existem no canal novo não são migradas; conferir os dois canais antes de excluir o bloqueado). Ver "Meu número foi bloqueado" (`/docs/canais/whatsapp/whatsapp-app/o-que-fazer-se-meu-numero-foi-bloqueado`). |
| **Necessário ler QR-Code** | QR Code visível na tela do canal | Aguardando a leitura do QR Code ou do código de conexão | Abrir o canal e ler o QR Code ou usar **Conectar com número de telefone** (**Express**). |
| `starting` ou `connecting` (cru, em vermelho) | Canal **Express** | Canal carregando ou reconectando | Aguardar alguns instantes. |
| `pending_review` ou `error` (cru, em vermelho) | Logo após criar canal **Express** | Falha ou pendência na criação do canal | Acionar o suporte com o ID do canal (**Copiar ID**); não há ação na tela. |
| **Necessário reiniciar canal** | Canal **Clássica** | A conexão precisa reiniciar | Clicar em **Reiniciar canal**. Se avisar `"Necessário recriar o canal para reiniciar"` (tela do canal) ou `"Necessário recriar o canal e ler o QRcode para reiniciar"` (lista), usar **Recriar**. |
| **Recomendado recriar canal** | Canal **Clássica** (por exemplo, criado ou recriado pela última vez antes de 09/01/2023, ou sem data de **Última vez recriado**) | Canal desatualizado | Usar **Recriar**. Com **Versão** **Multidevice**, a janela mostra **Tipo de conexão**: escolher **Express**. Sem o seletor, o **Recriar** mantém a **Clássica**. |
| **Criando...** ou **Reiniciando...** | — | Operação em andamento (até 10 min criando na **Clássica**; até 5 min reiniciando) | Aguardar a conclusão. |
| **Criando...** | Canal **Clássica** há mais de 10 minutos | Criação travada | Suporte, com o ID do canal. |

## Envio com o canal fora do ar (Express)

- Quando um canal **Express** está desconectado ou bloqueado, a Kinbox recusa o envio imediatamente: a mensagem fica com erro e não entra em fila para reenvio automático quando o canal voltar. Reenviar depois que o canal conectar.
- O motivo do erro aparece ao passar o mouse sobre o aviso da mensagem. Os avisos que a Kinbox mostra hoje (o texto traz um nome interno do sistema, que a doc não reproduz):

| O aviso diz, em resumo | Significa |
| --- | --- |
| que o canal não está conectado | Canal **Express** desconectado ou bloqueado no momento do envio |
| que template ainda não é suportado | Tentativa de mandar template pelo QR Code |
| que o formato de mensagem ainda não é suportado | Tentativa de mandar botões, listas, menu interativo ou localização |
| que o identificador do destinatário é incompatível | Contato com identificador que o QR Code não aceita (raro) |

## Códigos de erro exibidos no aviso da mensagem

Ao passar o mouse sobre o erro de entrega de uma mensagem na conexão **Express**, podem aparecer códigos em inglês:

| Código | Significado |
| --- | --- |
| `phone_not_on_whatsapp` | O número de destino não tem conta no WhatsApp. Confira o número do contato. |
| `media_invalid` | O arquivo passou do limite do motor do WhatsApp por QR Code (16 MB para imagem, áudio, vídeo e figurinha; 100 MB para documento) ou está num formato inválido. |
| `send_timeout` | O WhatsApp não confirmou o envio a tempo (por exemplo, celular muito tempo sem internet). A mensagem pode ter saído: confira na conversa antes de reenviar. |
| `not_allowed` | O WhatsApp recusou o envio por falta de permissão. |
| `send_failed` | O WhatsApp recusou a mensagem por outro motivo. |

Esses códigos aparecem crus, em inglês. Não existe hoje um código específico de bloqueio silencioso: os sinais são mensagens enviadas que não chegam a ser entregues, queda nas respostas e aumento de bloqueios.

## Faixa Telefone desconectado nas conversas

- No topo da lista de conversas, a faixa **Telefone desconectado** exibe uma das mensagens:
  - `"Necessário ler o QR Code do canal {nome}."`
  - `"Necessário reiniciar canal {nome}."`
  - `"Verifique se o aparelho do canal {nome} está conectado à internet."`
  - `"Possivelmente seu número foi bloqueado pelo WhatsApp."` (quando o canal está marcado como bloqueado)
- Membros com a permissão **Gerenciar Canais** veem o link **Configuração do canal** na faixa.
- A restrição **Não pode ver notificações de canal** oculta essas notificações de desconexão na listagem de conversas.
