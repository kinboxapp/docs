---
title: "Templates: status, sincronizar com a Meta, exclusão pendente e cabeçalho de mídia"
description: Regras dos templates e carrosséis do WhatsApp oficial na Kinbox, com todos os status, limites, mensagens de erro, notificações e sincronização com a Meta.
keywords: [status do template, rascunho, pendente, submetido, em recurso, sinalizado pela meta, exclusão pendente, permissão de exclusão pendente, sincronizar meta, limite de caracteres, botões do template, copiar código, mídia do cabeçalho, carrossel limites, notificação de template]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/whatsappApi/sections/TemplatesListSection.tsx
  - web:src/pages/settings/whatsappApi/sections/TemplateBuilder.tsx
  - web:src/pages/settings/whatsappApi/sections/templateBuilder/TemplateInfoPanel.tsx
  - web:src/pages/settings/whatsappApi/sections/templateBuilder/TemplateContentPanel.tsx
  - web:src/pages/settings/whatsappApi/sections/templateBuilder/fields/StandardButtonsEditor.tsx
  - web:src/pages/settings/whatsappApi/hooks/domains/useWhatsappTemplates.ts
  - web:src/pages/settings/whatsappApi/sections/CarouselListSection.tsx
  - web:src/pages/settings/whatsappApi/sections/CarouselBuilder.tsx
  - web:src/pages/settings/whatsappApi/helpers/carousels.ts
  - web:src/pages/settings/whatsappApi/components/WhatsappMediaUploadField.tsx
  - api:src/modules/whatsapp-api/services/templates/whatsapp-templates.service.ts
  - api:src/modules/whatsapp-api/services/carousel/whatsapp-carousels.service.ts
  - api:src/modules/whatsapp-api/services/core/whatsapp-api-notifications.service.ts
codigo:
  - web:src/pages/settings/whatsappApi/sections/TemplatesListSection.tsx
  - web:src/pages/settings/whatsappApi/sections/TemplateBuilder.tsx
  - web:src/pages/settings/whatsappApi/sections/templateBuilder/**
  - web:src/pages/settings/whatsappApi/hooks/domains/useWhatsappTemplates.ts
  - web:src/pages/settings/whatsappApi/helpers/templates.ts
  - web:src/pages/settings/whatsappApi/helpers/templateButtons.ts
  - web:src/pages/settings/whatsappApi/helpers/templateVariables.ts
  - web:src/pages/settings/whatsappApi/sections/CarouselListSection.tsx
  - web:src/pages/settings/whatsappApi/sections/CarouselBuilder.tsx
  - web:src/pages/settings/whatsappApi/helpers/carousels.ts
  - web:src/pages/settings/whatsappApi/hooks/domains/useWhatsappCarousels.ts
  - web:src/components-old/header/NotificationDropItem.tsx
  - api:src/modules/whatsapp-api/services/templates/whatsapp-templates.service.ts
  - api:src/modules/whatsapp-api/dto/whatsapp-template-draft.zod.ts
  - api:src/modules/whatsapp-api/services/carousel/**
  - api:src/modules/whatsapp-api/dto/whatsapp-carousel-draft.zod.ts
  - api:src/modules/whatsapp-api/services/core/whatsapp-api-notifications.service.ts
verificado_em: 2026-11-26
---

Regras e mensagens dos templates e carrosséis do WhatsApp oficial. Os passos estão em [Criar um template e enviar para aprovação](/docs/canais/criar-templates-dentro-do-kinbox), [Criar um carrossel](/docs/canais/criar-carrossel-dentro-do-kinbox) e [Meu template foi rejeitado, pausado ou desativado](/docs/canais/whatsapp/whatsapp-templates/template-rejeitado).

## Tabela completa de status do template

A coluna **Status** exibe o status informado pela Meta quando ele existe; caso contrário, exibe o status local da Kinbox.

| Status na tela | Significado | Bloqueia edição? |
| --- | --- | --- |
| **Rascunho** | Salvo apenas na Kinbox, ainda não enviado à Meta. | Não |
| **Submetido** | Enviado e em análise na Meta. | Sim |
| **Pendente** | Em análise na Meta. | Sim |
| **Aprovado** | Aprovado pela Meta e liberado para envio. | Não |
| **Rejeitado** | Recusado pela Meta; o motivo vindo da Meta aparece em vermelho abaixo (muitas vezes em inglês). | Não |
| **Pausado** | Pausado pela Meta por qualidade baixa. | Não |
| **Desativado** | Desativado pela Meta. | Não |
| **Em recurso** | Em análise de contestação na Meta (a Kinbox não tem botão para abrir recurso). | Sim |
| **Sinalizado pela Meta** | Sinalizado pela Meta (estado de análise). | Sim |
| **Exclusão pendente** | Exclusão em andamento na Meta. | Sim |
| **Credenciais pendentes** | Pendência técnica de credenciais do canal oficial. | Não |
| **Sincronizado** | Rótulo técnico raro de sincronização. | Não |
| **Desconhecido** | Rótulo técnico raro quando o estado não é reconhecido. | Não |

Quando um template está em estado de análise (**Submetido**, **Pendente**, **Em recurso**, **Sinalizado pela Meta** ou **Exclusão pendente**), o editor exibe o aviso **Template em análise pela Meta** ("Este template está bloqueado até a Meta concluir a análise. Após um status final, você poderá editá-lo e enviá-lo novamente."). Você não pode editar o template enquanto ele estiver em análise.

## Sincronização e atualização de status com a Meta

- **Atualização automática por eventos da Meta**: mudanças de status, categoria e qualidade são aplicadas automaticamente pela Kinbox assim que a Meta notifica.
- **Reconsulta periódica**: a cada **15 minutos**, a Kinbox consulta na Meta os templates em análise enviados nos últimos **30 dias**.
- **Ao abrir a área**: abrir **WhatsApp API** ou a lista **Templates** dispara uma sincronização com a Meta.
- **Sincronizar Meta** (menu de três pontos acima da tabela): sincroniza manualmente e traz inclusive templates criados direto na Meta. Se um template foi apagado na Meta, pode sumir da lista depois da sincronização. Sem canal oficial com acesso válido, a sincronização é ignorada.
- **Mensagens da sincronização na tela**:
  - `"Sync de templates concluído: {{templates}} template(s) em {{channels}} canal(is)."`
  - `"Sync de templates parcial: ..."`
  - `"Sync de templates falhou em {{channels}} canal(is)."`

## Notificações no sino

Mudanças feitas pela Meta em templates (incluindo **Template + Flow** e **Template + Carrossel**) geram notificações no sino do cabeçalho para **todos os membros ativos** do workspace. Flows e carrosséis avulsos não geram notificações. Clicar na notificação leva ao template correspondente.

| Rótulo | Mensagem exibida | Quando dispara |
| --- | --- | --- |
| **Template aprovado:** | `"A Meta aprovou o template"` + nome | Template muda para aprovado (voltar de **Sinalizado pela Meta** para **Aprovado** não notifica como nova aprovação). |
| **Template recusado:** | `"A Meta recusou o template"` + nome (+ `" — "` + motivo) | Template muda para rejeitado. |
| **Template pausado:** | `"A Meta pausou por qualidade baixa o template"` + nome | Template muda para pausado. |
| **Template desativado:** | `"A Meta desativou o template"` + nome | Template muda para desativado. |
| **Qualidade do template:** | `"A qualidade caiu no template"` + nome | Qualidade cai para baixa/vermelha. A nota de qualidade não aparece na lista nem no editor, apenas nesta notificação. |
| **Categoria alterada:** | `"A Meta mudou a categoria do template"` + nome | Meta altera a categoria do template; a coluna **Categoria** é atualizada automaticamente. |

Reimportar um template que já estava em estado final não gera notificação.

## Limites de templates

| Item | Limite / regra |
| --- | --- |
| **Nome do template** | Até 512 caracteres; apenas `a-z`, `0-9` e `_` (sem espaços ou acentos). Mensagem de erro: `"use apenas minúsculas, números e underscore (sem espaços)"`. |
| **Corpo da mensagem** | 1 a 1024 caracteres. |
| **Cabeçalho de texto** | Até 60 caracteres; no máximo 1 variável. Não convive com cabeçalho de mídia. |
| **Rodapé** | Até 60 caracteres. |
| **Botões** | Até 10 botões por template (acima de 3, aparecem em lista no WhatsApp). |
| **Texto do botão** | Até 25 caracteres. |
| **Amostra do código da oferta** | Até 15 caracteres; valor real sem chaves. |
| **Cabeçalho de imagem** | JPG ou PNG, até 5 MB. |
| **Cabeçalho de vídeo** | MP4, até 16 MB. |
| **Cabeçalho de documento** | PDF, até 100 MB. |

### Categorias e idiomas

- Categorias no editor: **Marketing** (padrão), **Utility**, **Authentication**. Na lista aparecem como **Marketing**, **Utility** e **Autenticação**.
- Idiomas no editor: **Português (Brasil)** (padrão), **English (US)** e **Español**.

## Regras de variáveis e mensagens exatas

- Apenas variáveis numéricas (`{{1}}`, `{{2}}`...) estão disponíveis.
- Mensagens exatas de validação:
  - `"As variáveis não podem estar no início ou no fim do corpo da mensagem."`
  - `"Adicione texto de amostra para {{1}}."`
  - `"O cabeçalho pode ter no máximo uma variável."`
  - `"O cabeçalho pode ter no máximo 60 caracteres."`
  - `"O corpo pode ter no máximo 1024 caracteres."`
  - `"Variáveis nomeadas ainda não estão disponíveis nesta versão da API."`

## Regras de botões e mensagens exatas

- Tipos criáveis em **Adicionar botão**: **Personalizado** (resposta rápida), **Acessar o site** (URL estática ou dinâmica) e **Copiar código da oferta**. Em workspaces com ligações em teste, também pode aparecer **Pedir permissão para ligar**.
- Tipos **Ligar no WhatsApp** (com campo **Ativo por** de 7, 15 ou 30 dias) e **Ligar** (telefone) existem apenas para exibir templates importados que já possuíam esses botões; não aparecem em **Adicionar botão**.
- Mensagens exatas de validação:
  - `"Use no máximo um botão de copiar código da oferta."`
  - `"Use no máximo 2 botões de link (URL)."`
  - `"Use no máximo 1 botão de telefone."`
  - `"Os botões de resposta rápida devem ficar juntos, antes ou depois dos demais botões."`
  - `"Botão de copiar código da oferta exige categoria MARKETING."`
  - `"Botão {{index}}: o texto pode ter no máximo {{max}} caracteres."`
  - `"A amostra do código da oferta deve ser um valor real, como SAVE20, sem {{variável}}."`

## Cabeçalho de mídia e mensagens exatas

- Quando **Amostra de mídia · Opcional** está em **Imagem**, **Vídeo** ou **Documento**, o arquivo de exemplo é obrigatório para solicitar aprovação (mesmo que o rótulo mostre "Opcional").
- Mensagens exatas:
  - `"Envie a mídia do cabeçalho antes de solicitar aprovação."`
  - `"Formato não permitido. Use JPG ou PNG."` / `"Imagem deve ter no máximo 5 MB."`
  - `"Formato não permitido. Use MP4."` / `"Vídeo deve ter no máximo 16 MB."`
  - `"Formato não permitido. Use PDF."` / `"Documento deve ter no máximo 100 MB."`

## Edição, envio e exclusão (mensagens exatas)

- **Edição de template que já foi para a Meta**: **Salvar** grava apenas na Kinbox e exibe **Alterações locais não enviadas** ("Estas alterações ainda não foram publicadas na Meta. Envie a atualização quando estiver pronto."). O envio à Meta acontece somente ao clicar em **Enviar atualização para a Meta** (confirmação: `"Enviar as alterações de \"{{name}}\" para a Meta?"`; sucesso: `"Atualização enviada à Meta. Acompanhe a análise aqui."`), retornando o template para **Pendente**.
- **Salvar e submeter**:
  - `"Rascunho do template criado."`
  - `"Rascunho salvo."`
  - `"Template atualizado."`
  - `"Erro ao salvar template."`
  - `"Template enviado à Meta. Acompanhe a aprovação aqui."`
  - `"Falha ao submeter o template."`
  - `"Template em análise pela Meta. Aguarde a Meta concluir a análise para editar ou reenviar."`
  - `"Template inválido para submissão"`
  - `"Submissão ignorada pela Meta: {{reason}}."`
  - Erros devolvidos pela Meta são exibidos conforme retornados.
- **Exclusão**:
  - Confirmação: `"Tem certeza que deseja excluir o template {{name}}?"`; sucesso: `"Template excluído."`. Se o template já foi enviado à Meta, a exclusão apaga o modelo também na Meta e não pode ser desfeita.
  - **Exclusão pendente** (coluna **Status**): indica exclusão em andamento na Meta e bloqueia o template.
  - **Permissão de exclusão pendente** (aviso amarelo no topo da lista): indica que o canal oficial não tem permissão na Meta para excluir templates; a solução é reconectar o canal oficial pela janela da Meta.
  - Quando a Meta recusa a exclusão: `"A Meta negou a exclusão. Reconecte o canal WhatsApp e confira as permissões da WABA no Business Manager."`

## Template + Flow

- Não possui painel **Estrutura de botões**: o botão é configurado pelo campo **Texto do botão** (até 25 caracteres, valor sugerido `"Abrir flow"`).
- Mensagem de erro sem texto do botão: `"Informe o CTA do flow"`.

## Carrossel

- **Status locais**: **Válido**, **Incompleto**, **Vinculado a template**.
- **Categoria**: **Template + Carrossel** é sempre **Marketing** (campo travado).
- **Vínculo**: cada carrossel pode ser vinculado a apenas um template e ambos precisam usar o mesmo canal oficial.
- **Editar carrossel vinculado**: salvar um carrossel **Vinculado a template** devolve o template para rascunho local, mas a lista de templates pode continuar exibindo **Aprovado** (pois prioriza o status da Meta). Para enviar as alterações à Meta, abra o template no editor e clique em **Enviar atualização para a Meta**.
- **Trocar canal do carrossel**: desfaz o vínculo com o template e remove as mídias já enviadas para a Meta, exigindo novo upload.
- **Excluir carrossel**: exclui apenas o rascunho local (`"Carrossel excluído."`) e não altera o template nem a Meta.
- **Coluna Tipo**: exibe o texto fixo em inglês `"Media card carousel"`.
- **Variáveis no corpo do carrossel**: seguem as mesmas regras do template padrão (numéricas, amostra obrigatória, não podem estar no início nem no fim).
- **Mídia dos cards**: imagem JPG ou PNG até 5 MB; vídeo MP4 até 16 MB; falha no envio exibe `"Não foi possível enviar a mídia."`.
- **Botões**: até 2 botões (**Resposta rápida** ou **Acessar site**), repetidos em tipo, ordem e texto em todos os cards. O tipo **Ligar** (telefone) aparece apenas em carrosséis antigos que já o possuíam.
- **Mensagens exatas de validação do carrossel**:
  - `"Informe o nome do carrossel."`
  - `"Nome do carrossel: use no máximo {{max}} caracteres."` (máximo 512)
  - `"Informe o corpo da mensagem."`
  - `"Selecione o canal WhatsApp do carrossel."`
  - `"Carrossel precisa ter entre 2 e 10 cards."`
  - `"Use no máximo 2 botões por card."`
  - `"Botão {{index}}: informe o texto."`
  - `"Card {{index}}: informe a mídia."`
  - `"Card {{index}}: informe o título."`
  - `"Card {{index}}: título deve ter no máximo {{max}} caracteres."` (máximo 120)
  - `"Card {{index}}: descrição deve ter no máximo {{max}} caracteres."` (máximo 160)
  - `"Card {{index}}: informe a URL do botão {{button}}."`
- **Mensagens exatas ao vincular carrossel no template**:
  - `"Selecione um carrossel"`
  - `"Selecione um rascunho de carrossel."`
  - `"O template deve usar o mesmo canal do carrossel."`
  - `"O template e o carrossel precisam usar o mesmo canal WhatsApp."`
  - `"Este carrossel já está vinculado a outro template."`
