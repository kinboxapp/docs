---
title: "Mensagens no QR Code: avisos exatos, tipos descartados e respostas a mensagens antigas"
description: Lista detalhada do que o WhatsApp por QR Code (Express) envia, recebe, transforma em texto ou ignora, com os avisos exatos que aparecem na conversa.
keywords: [aviso na conversa, mensagem não pode ser exibida, cobrança pix, enquete, produto do catálogo, status, newsletter, arquivo grande, 16 mb, 100 mb, 25 mb]
publico: llm
tipo: referencia
fontes:
  - api-v0:server/modules/wabox/WaboxSender.js
  - api-v0:server/modules/wabox/WaboxEvents.js
  - api-v0:server/modules/wabox/WaboxClient.js
  - web:src/pages/settings/channels/whatsapp/EditWhatsApp.tsx
  - wabox:apps/docs/resources/limitations.mdx
codigo:
  - api-v0:server/modules/wabox/WaboxSender.js
  - api-v0:server/modules/wabox/WaboxEvents.js
  - api-v0:server/modules/wabox/WaboxClient.js
  - web:src/pages/settings/channels/whatsapp/EditWhatsApp.tsx
  - wabox:apps/docs/resources/limitations.mdx
  - wabox:apps/engine/internal/wa/whatsmeow/**
verificado_em: 2026-11-26
---

Detalhes completos de referência da página humana "O que funciona e o que não funciona no WhatsApp QR Code" (`/docs/canais/whatsapp/whatsapp-app/o-que-funciona`). Escopo: conexão **Express**.

## Envio (Express)

| Tipo de mensagem | Suportado | Limite / comportamento |
| --- | --- | --- |
| Texto | Sim | — |
| Imagem | Sim | Aceita legenda. Limite de 16 MB no envio. |
| Vídeo | Sim | Aceita legenda. Limite de 16 MB no envio. |
| Áudio | Sim | Enviado como mensagem de voz. Limite de 16 MB. Não aceita legenda: o texto vai em mensagem separada logo depois do áudio. |
| Documento | Sim | Aceita legenda. Limite de 100 MB no envio. |
| Figurinha (sticker) | Sim | Limite de 16 MB no envio. |
| Contato | Sim | — |
| Reação | Sim | — |
| Responder citando mensagem | Sim | Sempre é enviada; se a mensagem original for antiga e não estiver mais em cache, a citação pode ir sem o conteúdo. |
| Menção com `@` em grupos | Sim | — |
| Menus do bot | Como texto | As opções são enviadas como texto, uma por linha (não como botões interativos). |
| Template (aprovado pela Meta) | Não | Recusado pela Kinbox; a mensagem fica com erro. |
| Botões, listas, menus interativos, localização | Não | Recusado pela Kinbox; a mensagem fica com erro. |

- Com o canal desconectado ou bloqueado, o envio é recusado na hora; a mensagem fica com erro e não é reenviada sozinha quando o canal reconecta.

## Recebimento (Express) — avisos exatos e tipos descartados

| O que o contato envia | O que aparece na Kinbox |
| --- | --- |
| Texto, imagem, vídeo, áudio, documento, figurinha | A mensagem com a mídia (arquivos de até 25 MB). |
| Arquivo maior que 25 MB | O download falha e a mensagem inteira (incluindo legenda) não chega na Kinbox, sem aviso na conversa. |
| Mídia sem link disponível | Um texto avisando que a mídia não está disponível. |
| Localização, contato (um ou vários), pedido do catálogo | A mensagem com o conteúdo. |
| Resposta a botão ou lista | O texto da resposta. |
| Enquete | Texto `"Enquete: ..."` com as opções. |
| Produto do catálogo | Texto `"Produto do catálogo: ..."` com descrição, valor e link. |
| Cobrança PIX com dados | Texto `"Chave PIX"` com favorecido, chave, valor e PIX copia e cola. |
| Cobrança PIX sem dados | `"O cliente enviou uma cobrança PIX que não pode ser exibida neste canal. Solicite o envio da chave PIX como texto ou do QR Code como imagem."` |
| Outro conteúdo interativo sem texto | `"O cliente enviou um conteúdo interativo que não pode ser exibido neste canal. Solicite o reenvio das informações como texto ou imagem."` |
| Mensagem que o WhatsApp só mostra no celular | `"O WhatsApp não mostra esta mensagem em aparelhos conectados. Veja o conteúdo no celular."` |
| Mensagem agendada no WhatsApp | `"Mensagem agendada no WhatsApp. O conteúdo só aparece no celular até a hora do envio."` |
| Outro tipo não suportado | `"Esta mensagem não pode ser exibida neste canal. Veja o conteúdo no WhatsApp do celular."` |
| Mensagem editada | A mensagem é atualizada na Kinbox e marcada como editada, preservando o texto anterior. |
| "Apagar para todos" | A mensagem fica marcada como apagada na Kinbox. |
| Reação | Aparece vinculada à mensagem reagida. |
| Status (stories) dos contatos, canais (newsletters), avisos do WhatsApp (inclusive chamadas), cabeçalho de álbum | Ignorados; não entram na Kinbox. |

## Tiques, grupos, leitura e celular

- **Confirmação de entrega e leitura (tiques)**: funciona em conversas individuais; conversas de grupo ficam sem tiques.
- **Grupos**: ignorados por padrão até serem marcados em **Permitir Grupos de WhatsApp** (a lista vem vazia se o canal estiver desconectado). O contato da conversa é o grupo (sem telefone) e quem escreveu aparece na mensagem.
- **Menções em grupo**: quando o WhatsApp oculta o número de um participante, a Kinbox exibe `"Participante (final do identificador)"`.
- **Auto-leitura desligada**: a Kinbox não marca automaticamente as mensagens como lidas no celular.
- **Mensagens enviadas pelo celular**: entram na conversa da Kinbox, exceto em conversas em que o WhatsApp informa apenas o identificador de privacidade do contato (sem número), que são descartadas.
- **Notificações no celular**: na conexão **Express**, a Kinbox mantém o número online no WhatsApp para mostrar se o contato está online; por esse motivo, o celular costuma parar de receber notificações do WhatsApp.
