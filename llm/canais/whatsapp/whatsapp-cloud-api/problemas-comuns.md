---
title: Avisos da verificação na Meta e erros de envio do WhatsApp oficial
description: Matriz de diagnóstico do WhatsApp oficial na Kinbox, com os avisos do canal, o formato dos erros de envio, o opt-out de marketing e o que o status do canal não mostra.
keywords: [canal sem webhooks configurados, canal com mais de um app conectado, erro ao enviar mensagem, opt-out, "131050", status conectado, excluir canal, conta do whatsapp business, diagnóstico]
publico: llm
tipo: solucao-de-problema
fontes:
  - web:src/pages/settings/channels/whatsapp/embed/AddWhatsappEmbedded.tsx
  - web:src/pages/settings/channels/whatsappCloud/EditWhatsappCloud.tsx
  - web:src/pages/inbox/ChatHeader/index.tsx
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/controllers/IntegrationsController.js
codigo:
  - web:src/pages/settings/channels/whatsapp/embed/**
  - web:src/pages/settings/channels/whatsappCloud/**
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/inbox/Message.tsx
  - web:src/pages/inbox/ChatHeader/index.tsx
  - api-v0:server/controllers/WbaCloudController.js
  - api-v0:server/controllers/IntegrationsController.js
  - api-v0:server/modules/meta/CloudApiClient.js
verificado_em: 2026-11-26
---

Matriz de diagnóstico complementar à página humana [Problemas ao conectar ou enviar pelo WhatsApp oficial](/docs/canais/whatsapp/whatsapp-cloud-api/problemas-comuns). Para erros específicos das etapas de conexão, consulte também a referência de cadastro (etapas, mensagens e erros) de [Conectar o WhatsApp oficial](/docs/canais/whatsapp-api-oficial-padrao).

## Como funciona a verificação automática do canal

Toda vez que o painel de um canal oficial é aberto, a Kinbox consulta na Meta quais apps recebem as mensagens da conta do WhatsApp Business e exibe, se houver problema, um aviso amarelo no topo da aba **Geral** acompanhado de `"Em caso de dúvida entre em contato com o nosso suporte"`.

- A verificação refaz a lista a cada abertura do painel. Ela só conta quantas integrações estão ligadas à conta: não confere se a que ficou é a Kinbox. Com uma integração só (mesmo que seja outra plataforma), nenhum aviso aparece.
- Se a consulta à Meta falhar, o aviso salvo antes não é atualizado (pode estar velho ou faltar).
- Por isso, a ausência de aviso não prova que a Kinbox recebe as mensagens: confirmar qual integração ficou na Meta e testar o recebimento mandando uma mensagem de outro celular.

## Matriz de diagnóstico

| Sintoma | Causa | Como confirmar | O que fazer |
| --- | --- | --- | --- |
| `"Erro ao conectar canal de WhatsApp."` ao conectar | A Meta ou a Kinbox recusou o cadastro. | Ler a mensagem específica exibida junto (erros detalhados na referência de cadastro de [Conectar o WhatsApp oficial](/docs/canais/whatsapp-api-oficial-padrao)). | Corrigir o motivo apontado na Meta ou no plano e tentar conectar novamente; se repetir, acionar o suporte. |
| `"Você precisa remover canais de Whatsapp para prosseguir com a contratação"` ao conectar ou reconectar | O plano atingiu o limite de canais de WhatsApp ativos (oficiais e por QR Code entram na mesma contagem). Vale inclusive ao reconectar um número cujo canal ainda está ativo. | Conferir quantos canais de WhatsApp ativos existem na lista de canais. | Liberar um canal de WhatsApp no plano ou ampliar o limite. Se for o mesmo número de um canal ativo, não sugerir excluir como caminho padrão: excluir desliga o recebimento de toda a conta do WhatsApp Business; conferir antes se a conta tem outros números conectados e, na dúvida, acionar o suporte. |
| Clicar em **Conectar WhatsApp** não faz nada ou fechar a janela da Meta não dá retorno | Pop-up bloqueado no navegador, ou janela da Meta fechada antes do fim (sem aviso e sem criar canal). | Verificar bloqueador de pop-up do navegador; confirmar se a janela da Meta foi concluída até o fim. | Liberar pop-ups para a Kinbox e clicar em **Conectar WhatsApp** de novo. |
| Aviso `"Canal sem webhooks configurados."` no painel do canal | Nenhum app está ligado ao recebimento de mensagens da conta do WhatsApp Business (a Kinbox não recebe mensagens). Pode acontecer se o acesso da Kinbox foi retirado na Meta ou se outro canal da mesma conta foi excluído na Kinbox. | Abrir a aba **Geral** do canal e ver o aviso amarelo. | Reconectar o mesmo número pela **API Oficial** (reaproveita o canal, mantém as conversas e religa o recebimento). Atenção ao limite do plano se o canal estiver ativo. Se persistir, suporte. |
| Aviso `"Canal com mais de um App conectado. Uma ação é necessária para evitar indisponibilidade do canal."` | Outra plataforma ou integração também está ligada à mesma conta do WhatsApp Business na Meta (comum após migração de outro provedor). | Abrir a aba **Geral** do canal e ver o aviso amarelo. | Remover o acesso da outra plataforma à conta do WhatsApp Business (na Meta ou na outra plataforma) ou acionar o suporte. Depois, confirmar na Meta qual integração ficou e testar o recebimento; o aviso sumir não prova que a Kinbox ficou ligada. |
| Outro canal da mesma conta do WhatsApp Business parou de receber depois de excluir um canal | A ação **Excluir** desliga o recebimento de mensagens da conta do WhatsApp Business inteira na Kinbox, afetando outros números da mesma conta conectados no workspace. | Abrir o outro canal afetado: ele passa a mostrar `"Canal sem webhooks configurados."`. | Reconectar o canal que ficou ativo pela **API Oficial** (observando o limite do plano). |
| A conversa não deixa digitar e mostra apenas **Enviar template** | Janela de 24 horas fechada (passaram 24 h da última mensagem do contato, ou o contato ainda não respondeu). | Topo mostra `"A janela de tempo para respostas foi encerrada."` ou rodapé mostra `"Resolvida · janela de 24h encerrada"`. | Enviar um template aprovado. O editor volta quando o contato responder (ver [Janela de 24 horas: quando é preciso usar um template](/docs/canais/whatsapp/whatsapp-cloud-api/janela-de-24-horas)). |
| Mensagem enviada fica com ícone de erro | A Meta recusou o envio (na hora ou após o envio). | Passar o mouse sobre o aviso da mensagem: falha imediata aparece como `"(código tipo) detalhe"` vindo da Meta; falha após o envio mostra o título do erro da Meta (sem tradução); sem detalhe aparece `"Erro ao enviar mensagem"`. | Verificar o texto do erro da Meta (por exemplo, janela fechada ou restrição na Meta). |
| Mensagem de marketing falha e aparece selo **Opt-out** | A Meta devolveu o código `131050`, indicando que o contato pediu para não receber marketing desse número. É o único código de erro da Meta tratado especificamente pela Kinbox. | Topo da conversa mostra o selo **Opt-out** com a dica `"Esse contato optou por não receber marketing desse canal"`. | Não enviar templates de marketing para esse contato por esse canal. |
| Canal aparece **Conectado**, mas mensagens não chegam | O status do WhatsApp oficial nasce **Conectado** e não muda com eventos da Meta (a Kinbox não trata eventos de conta, qualidade ou limite da Meta). | Abrir a aba **Geral** para checar avisos amarelos e conferir diretamente na Meta se há restrição na conta ou no número. | Resolver eventual aviso na Kinbox ou verificar a restrição na Meta. |
| **Atualizar registro** deu erro | A Meta recusou o registro do número. | Mensagem de erro exibida na tela após `"Atualizando registro..."`. | Não usar **Atualizar registro** em canal de coexistência. Em canal padrão, acionar o suporte se o erro continuar. |
| Canal excluído precisa voltar | O canal foi desativado na Kinbox, mas as conversas permanecem no histórico. | Canal não aparece mais ativo na lista. | Conectar o mesmo número novamente pela **API Oficial**; se houver canal de WhatsApp livre no plano, a Kinbox reaproveita o canal antigo com as conversas. |
| Contato aparece sem número de telefone | Em alguns casos a Meta envia apenas um identificador de usuário em vez do telefone. | A conversa entra normalmente e a Kinbox identifica o contato por esse identificador. | Comportamento esperado quando a Meta não informa o número de telefone. |

## Janela de 24 horas: detalhe raro

- Ao agendar uma mensagem num canal oficial com sugestão do copiloto, se o retorno sugerido cai fora da janela e nenhum template aprovado combina, aparece o aviso `"Nenhum modelo aprovado combina com este retorno. Fora da janela de 24h do WhatsApp, escolha um modelo para enviar."` (ver [Janela de 24 horas: quando é preciso usar um template](/docs/canais/whatsapp/whatsapp-cloud-api/janela-de-24-horas)).
