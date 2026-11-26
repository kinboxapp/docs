---
title: "Cadastro do WhatsApp oficial pela janela da Meta: etapas, mensagens e erros"
description: O que a Kinbox faz em cada etapa da conexão do WhatsApp oficial, as mensagens que aparecem e o que cada erro quer dizer.
keywords: [erro ao conectar canal de whatsapp, erro ao criar canal, erro ao obter dados do número, erro ao obter access token, conectando canal de whatsapp, cadastro incorporado, embedded signup, reconectar número, limite do plano]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/channels/whatsapp/embed/AddWhatsappEmbedded.tsx
  - web:src/pages/settings/channels/AddChannelWhatsApp.tsx
  - web:src/pages/settings/whatsappApi/WhatsappApiContent.tsx
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/modules/meta/CloudApiClient.js
codigo:
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/channels/AddChannelWhatsApp.tsx
  - web:src/pages/settings/channels/whatsapp/embed/**
  - web:src/pages/settings/channels/whatsappCloud/**
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/modules/meta/CloudApiClient.js
  - api-v0:server/routes/IntegrationsApiRoutes.js
  - api-v0:server/controllers/NewPaymentController.js
verificado_em: 2026-11-26
---

Referência complementar à página humana [Conectar o WhatsApp oficial](/docs/canais/whatsapp-api-oficial-padrao).

## Etapas executadas pela Kinbox após a janela da Meta

Quando você conclui o cadastro na janela da Meta, a aba da Kinbox recebe os identificadores da empresa, da conta do WhatsApp Business e do número escolhidos, e executa quatro etapas no servidor:

1. Troca o código devolvido pela Meta pelo acesso da empresa.
2. Liga o recebimento de mensagens da conta do WhatsApp Business na Kinbox.
3. No modo padrão (sem coexistência), registra o número na API da Meta. No modo de coexistência, pula essa etapa de registro.
4. Lê os dados do número na Meta para preencher **Descrição** (nome verificado) e **Número** (telefone exibido).

Se ocorrer uma falha depois da etapa 2, a Kinbox desfaz automaticamente a ligação do recebimento de mensagens da conta.

## Permissões pedidas na janela da Meta

A janela da Meta solicita três permissões para a Kinbox:

- Gerenciar a conta do WhatsApp Business.
- Enviar mensagens pelo WhatsApp Business.
- Acessar a empresa (portfólio) na Meta.

## Mensagens da tela e o que significam

| Mensagem exibida | Significado |
| --- | --- |
| `"Conectando canal de WhatsApp..."` | A Kinbox está concluindo as etapas da conexão no servidor. A aba não deve ser fechada. |
| `"Canal de WhatsApp conectado."` | Conexão concluída. O canal nasce com status **Conectado** e a tela volta para a lista de canais. |
| `"Erro ao conectar canal de WhatsApp."` | A criação do canal falhou. Aparece junto com a mensagem específica devolvida pelo servidor ou pela Meta. |
| `"Erro ao criar canal"` | O servidor não conseguiu criar o registro do canal. |
| `"Erro ao obter dados do número"` | A Kinbox não conseguiu ler o nome verificado ou o telefone do número na Meta. |
| `"Erro ao obter access token"` | Falha ao trocar o retorno da janela da Meta pelo acesso da empresa. |
| `"Você precisa remover canais de Whatsapp para prosseguir com a contratação"` | O workspace atingiu o limite de canais de WhatsApp ativos do plano (oficiais e por QR Code entram na mesma contagem). |
| Outro texto de erro | Erro devolvido diretamente pela Meta e repassado pela Kinbox sem tradução. |

## Regras de borda do cadastro

- **Fechar a janela da Meta antes do fim:** nenhum canal é criado e nenhum aviso aparece na Kinbox. É preciso clicar em **Conectar WhatsApp** novamente.
- **Reconectar um número que o workspace já teve:** a Kinbox encontra e reaproveita o canal anterior (mantendo o mesmo ID e as conversas), inclusive se o canal foi excluído antes. A checagem de limite do plano continua sendo aplicada: se o plano já estiver no limite, tentar reconectar um número cujo canal ainda está ativo é recusado. O que orientar: liberar um canal de WhatsApp no plano (ou ampliar o limite) ou falar com o suporte. Excluir o canal para liberar o limite funciona (o canal volta reativado, com o mesmo ID e as conversas), mas a exclusão desliga o recebimento de mensagens da conta do WhatsApp Business inteira: antes, conferir se a mesma conta tem outros números conectados na Kinbox. Não sugerir excluir como caminho padrão.
- **Canais antigos cadastrados à mão:** canais conectados pela janela da Meta não exibem campos técnicos no painel. Apenas canais antigos cadastrados manualmente mostram os campos **ID da conta comercial do WhatsApp**, **Identificação do número de telefone**, **Token** e **Webhook** na aba **Geral**.
- **Painel do canal:** se houver erro de preenchimento numa aba que não está aberta, o painel volta sozinho para a aba **Geral**.
