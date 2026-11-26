---
title: Que arquivos posso mandar e por que o áudio não toca?
description: A Kinbox aceita até 100 MB por arquivo (20 por vez) e áudios gravados de até 25 MB, sujeitos às regras de cada canal; se um áudio não tocar, confira o erro e use Baixar áudio.
keywords: [arquivos aceitos, tamanho máximo arquivo, limite anexo, 100 mb, áudio não toca, áudio não reproduz, baixar áudio, erro ao enviar arquivo]
publico: llm
tipo: faq
fontes:
  - api:src/modules/assets/assets.controller.ts
  - api:src/modules/assets/multipart-files.util.ts
  - web:src/pages/inbox/ChatTextEditorPure.tsx
codigo:
  - api:src/modules/assets/**
  - web:src/pages/inbox/ChatTextEditorPure.tsx
verificado_em: 2026-11-26
---

## Pergunta

Que arquivos posso mandar e por que o áudio não toca?

## Resposta

No editor da Kinbox você pode enviar até 20 arquivos por vez, com limite de 100 MB por arquivo, e gravar áudios de até 25 MB (convertidos automaticamente para o formato aceito pelo WhatsApp oficial). Acima desses limites aparecem os avisos "Arquivo acima do limite de 100 MB" ou "Envie no máximo 20 arquivos por vez".

Além do limite da Kinbox, cada canal aplica regras próprias:

- **WhatsApp por QR Code (Express):** envio de até 16 MB para mídia e até 100 MB para documento; arquivos recebidos acima de 25 MB não chegam.
- **WhatsApp oficial:** segue as regras da Meta.
- Quando o canal recusa um arquivo, a mensagem fica marcada com erro na conversa (passe o mouse sobre o erro ou use **Copiar erro** no menu da mensagem).

Se um áudio não tocar na conversa, verifique primeiro se a mensagem ficou marcada com erro e use **Baixar áudio** no menu da mensagem para reproduzir fora da Kinbox. Se o problema continuar, entre em contato com o suporte. Veja também [Atender uma conversa](/docs/conversas/gerenciar-conversas).

## Variações

- qual o tamanho máximo de arquivo que posso enviar na conversa
- quantos anexos consigo mandar de uma vez
- por que o áudio do cliente não abre nem toca
- meu arquivo deu erro ao enviar no whatsapp
- limite de mb para vídeo e pdf na caixa de entrada
- não consigo ouvir mensagem de voz na kinbox
