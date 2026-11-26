---
title: "WhatsApp Flows: regras e limites do editor"
description: Limites, status, mensagens de erro e regras de publicação, requisição e resposta dos WhatsApp Flows na Kinbox.
keywords: [flow inválido, limite de componentes, publicar flow erro, nome do flow duplicado, flow descontinuado, pendente credenciais, requisição flow, teste da requisição, importar json, exportar json, resposta do flow, flow token, imagem 1 mb]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/whatsappApi/sections/FlowsSection.tsx
  - web:src/pages/settings/whatsappApi/sections/FlowCreateSection.tsx
  - web:src/pages/settings/whatsappApi/flow/WhatsappFlowEditor.tsx
  - web:src/pages/settings/whatsappApi/flow/WhatsappNodeForm.tsx
  - web:src/pages/settings/whatsappApi/flow/WhatsappDataExchangeModal.tsx
  - web:src/pages/settings/whatsappApi/hooks/domains/useWhatsappFlows.ts
  - web:src/pages/settings/whatsappApi/helpers/flowValidationRules.ts
  - web:src/pages/inbox/MessageContent.tsx
  - api:src/modules/whatsapp-api/services/flow/whatsapp-flow-publications.service.ts
  - api:src/modules/whatsapp-api/services/flow/whatsapp-flow-builder.service.ts
  - api-v0:server/controllers/WbaCloudController.js
codigo:
  - web:src/pages/settings/whatsappApi/sections/FlowsSection.tsx
  - web:src/pages/settings/whatsappApi/sections/FlowCreateSection.tsx
  - web:src/pages/settings/whatsappApi/flow/**
  - web:src/pages/settings/whatsappApi/hooks/domains/useWhatsappFlows.ts
  - web:src/pages/settings/whatsappApi/helpers/flows.ts
  - web:src/pages/settings/whatsappApi/helpers/flowJson.ts
  - web:src/pages/inbox/MessageContent.tsx
  - api:src/modules/whatsapp-api/services/flow/**
  - api:src/modules/whatsapp-api/controllers/flow/**
verificado_em: 2026-11-26
---

Referência técnica complementar à página humana "Criar WhatsApp Flows (formulários no WhatsApp)".

## Estados (Status × Publicação Meta)

- **Status** (estado local na Kinbox): **Rascunho**, **Válido**, **Inválido**, **Publicado**, **Descontinuado**, **Pendente credenciais**, **Erro**.
  - Um Flow nasce **Rascunho**; ao salvar, passa para **Válido** ou **Inválido** conforme a validação automática (salvar com estrutura inválida não bloqueia a gravação; o bloqueio ocorre na publicação). Depois de publicado fica **Válido** na Kinbox e **Publicado** em **Publicação Meta**; ao descontinuar, ambos passam para **Descontinuado**.
- **Publicação Meta**: **Não publicado**, **Rascunho**, **Publicado**, **Descontinuado**, **Limitado**, **Bloqueado**, **Pendente credenciais**, **Erro**. Mudanças remotas da Meta (como **Limitado** ou **Bloqueado**) são atualizadas automaticamente.
- **Ativos / Inativos**: Flows clonados nascem inativos e Flows descontinuados viram inativos; não há controle na tela para ativar ou desativar manualmente.
- **Descontinuado**: bloqueia edição, publicação e ativação (`"Flow descontinuado não pode ser editado, publicado ou ativado novamente."`). Restam apenas **Clonar** e **Exportar JSON**.
- **Excluir vs. Descontinuar**: apenas Flows não publicados podem ser excluídos (também apaga eventual rascunho na Meta e requisições salvas). Flows publicados precisam ser descontinuados (`"Flows publicados ou descontinuados não podem ser excluídos. Descontinue Flows publicados e mantenha o histórico sincronizado com a Meta."`); descontinuar rascunho pela API retorna `"Apenas Flows publicados na Meta podem ser descontinuados. Rascunhos devem ser excluídos."`.

## Limites do editor e da validação

| Item | Limite / regra |
| --- | --- |
| JSON do Flow | Até 10 MB |
| Componentes por tela | Até 50 |
| Botão de rodapé por tela | 1 (texto do botão até 35 caracteres; checado pela API) |
| Imagens por tela | Até 3 (JPG ou PNG até 1 MB; acima de 300 KB gera aviso de recomendação da Meta) |
| Links por tela | Até 2 (texto do link até 25 caracteres) |
| Componentes **Aceitar** por tela | Até 5 (rótulo até 120 caracteres) |
| Nome da tela | Até 80 caracteres (vazio exibe `tela_1`, `tela_2`...) |
| **Título grande** / **Título pequeno** | Até 80 caracteres (sem negrito ou itálico; aceita emoji) |
| **Corpo** | Até 4096 caracteres |
| **Legenda** | Até 409 caracteres |
| Rótulo: **Resposta curta**, **Parágrafo**, **Lista suspensa** | Até 20 caracteres |
| Rótulo: **Seletor de data** | Até 40 caracteres |
| Rótulo: **Escolha única**, **Múltipla escolha** | Até 30 caracteres |
| Rótulo: **Foto**, **Documento**, **Chips**, **Lista de navegação** | Até 80 caracteres |
| **Texto de ajuda** | Até 80 caracteres |
| Descrição de **Foto** / **Documento** | Até 300 caracteres |
| Opções: **Lista suspensa** / **Faixa numérica** | Até 200 opções (título da opção até 30; descrição até 300) |
| Opções: **Escolha única** / **Múltipla escolha** | Até 20 opções (título até 30; descrição até 30) |
| Opções: **Chips** | De 2 a 20 opções (título até 30; descrição até 300) |
| **Documento** | Mín. docs de 0 a 30; Máx. docs de 1 a 30; máx. maior ou igual ao mín. |
| **Mín. caracteres** / **Máx. caracteres** | Inteiros maiores ou iguais a 0; máx. maior ou igual ao mín. |
| Histórico de desfazer | Até 30 passos no editor |

Quando um texto contém variável dinâmica, a validação conta apenas o texto fixo e pode alertar que o valor preenchido pode ultrapassar o limite.

## Nome duplicado

- Não é permitido repetir o nome de outro Flow na mesma conta do WhatsApp oficial (a comparação ignora maiúsculas/minúsculas e espaços repetidos).
- Validado ao criar com canal, renomear, associar canal e publicar: `"Já existe um Flow com esse nome nessa conta WhatsApp Business."`
- Se não for possível identificar a conta do canal: `"Não foi possível identificar a conta WhatsApp Business desse canal."`

## Publicação e atualizações

- **Conflitos de nome na Meta**: se já existir um Flow remoto com o mesmo nome na conta, a Kinbox tenta reaproveitá-lo. Em caso de conflito, exibe:
  - `"Existe mais de um Flow remoto chamado \"{{flowName}}\" na WABA {{wabaId}}. Sincronize os Flows ou escolha um nome único antes de publicar."`
  - `"A Meta informou que já existe um Flow chamado \"{{flowName}}\", mas ele não apareceu na listagem da WABA {{wabaId}}. Sincronize os Flows ou escolha outro nome."`
- **Sem canal oficial**: `"Nenhum canal oficial disponível para publicar o Flow."`
- **Pendente credenciais**: quando o canal oficial não tem acesso válido à Meta para publicar, o Flow fica salvo com o status **Pendente credenciais**; o aviso da tela pode mostrar o código `missing_credentials` em vez do texto "Flow salvo, mas aguardando credenciais Meta para publicar.".
- **Categoria inválida**: `"Categoria de Flow inválida: {{category}}"`
- **Requisição na publicação**: Flows com requisição externa exigem que a URL pública HTTPS da Kinbox usada pela Meta esteja configurada corretamente (mensagens possíveis: `"Flow usa data_exchange, mas não possui endpoint configurado."`, `"Flow usa data_exchange e a Meta exige endpoint público HTTPS para publicar."`, `"Flow usa data_exchange, mas o endpoint configurado não é público."`).
- **Flow publicado não recebe alterações posteriores**: depois de publicado, **Publicar** desaparece do menu e novas edições salvas no editor não são enviadas à Meta. Para alterar um Flow publicado, clique em **Clonar** (o clone nasce sem canal e inativo), abra **Editar** para associar o canal, faça as alterações e publique o clone para usá-lo no template.
- **Trocar canal em Editar**: trocar o canal de um Flow que já tinha canal cria uma cópia associada ao novo canal (`"Flow duplicado e associado ao canal."`). Em um Flow sem canal, apenas associa (`"Flow associado ao canal."`).
- **Sincronizar Meta**: `"Sync de flows concluído."` ou `"Sync de flows parcial: {{synced}} flow(s) sincronizado(s), {{failed}} com erro."`. Flows criados direto na Meta e sincronizados têm as telas reconstruídas no editor a partir do JSON.

## Requisição (chamada externa)

- **Métodos**: GET, POST (padrão), PUT e PATCH.
- **URL**: obrigatória (`"Informe a URL"`); aceita variáveis de dados e precisa estar acessível pela internet. URL inválida retorna `"URL externa de Data Exchange inválida."`.
- **Autenticação**: Nenhuma, Bearer, Basic ou Headers customizados. Novos cabeçalhos nascem marcados como **Segredo** (assim como Bearer e Basic), ficam cifrados e são exibidos como `********`.
- **Timeout (ms)**: de **1000** a **30000** ms (padrão **8000** ms; valores fora da faixa são ajustados para os limites).
- **Teste obrigatório**: é obrigatório clicar em **Testar** antes de salvar, e qualquer alteração exige um novo teste (`"Teste a chamada antes de salvar esta configuração."` / `"Teste a chamada para poder salvar."`). Sucesso: `"Chamada de teste executada."`; falha: `"Falha ao testar Data Exchange."`. Outros erros: `"Payload de teste precisa ser um JSON válido."`, `"Revise os campos obrigatórios antes de testar."`, `"JSON customizado inválido."`, `"Não foi possível identificar a integração. Feche e reabra a configuração."`, `"Salve o Flow antes de testar o Data Exchange."`.
- **Saídas e falha**: ao escolher o primeiro campo da resposta, a Kinbox cria automaticamente as telas **Sucesso** e **Erro**. Se a chamada falhar (resposta diferente de 2xx, timeout ou URL inválida), o fluxo segue pela saída de erro com a mensagem retornada pelo sistema externo ou `"Falha ao executar Data Exchange."`. Sem tela ligada na saída, o simulador avisa `"Nenhuma tela conectada para essa saída."`.
- **Atualizar ao selecionar**: disponível em campos de seleção (exceto **Aceitar**) e **Seletor de data**; envia todos os campos da tela (modo automático) ou campos customizados e atualiza a mesma tela sem criar saída no canvas. Sem requisição na tela, exibe `"Nenhuma integração criada nesta tela."`.

## Navegação e botão (casos de borda)

- A ordem das telas segue o caminho ligado a partir do card **Início**, não a posição visual no canvas.
- Uma tela ligada a outra navega para ela mesmo que a ação do botão esteja marcada como **Finalizar**. Uma tela sem ligação seguinte é tratada como tela final (encerra o Flow).
- Definir a ação como **Navegar** sem ligar a outra tela gera erro de validação (`"{{label}}.on-click-action.next.name é obrigatório."`).
- Texto padrão do botão quando não configurado: `"Continuar"` (com próxima tela), `"Enviar"` (tela final) ou `"Atualizar"` (com requisição).

## Importar e exportar JSON

- **Exportar JSON** (menu da linha na lista): copia o JSON completo do editor para a área de transferência (`"JSON copiado."`; não baixa arquivo).
- **Copiar Flow JSON** (barra do editor): copia apenas o JSON do Flow no formato da Meta (`"Flow JSON copiado."`).
- **Importar ou colar JSON** (arquivo `.json` ou colar texto, versão `7.3`): substitui o conteúdo atual do canvas e exige clicar em **Salvar** depois (`"Flow JSON importado. Clique em Salvar para persistir."`; com avisos: `"Flow JSON importado com {{count}} aviso(s). {{warning}}"`).
- Erros de importação: `"Cole um Flow JSON antes de importar."`, `"Não foi possível importar o Flow JSON."`, `"Verifique se o arquivo contém o JSON do flow com screens."`, `"Não foi possível ler o arquivo."`.

## Resposta do Flow na conversa

- A resposta do contato chega com o botão **Ver resposta** (na lista de conversas aparece como `"Resposta enviada"`).
- A janela **Resposta do Flow** exibe a data de resposta, o **Flow Token** (copiável) e cada campo com o **Nome técnico** e o valor preenchido (Sim/Não para aceite; itens de listas separados por vírgula).
- Em Flows de várias telas, confira no simulador quais campos chegam na resposta final.
- As respostas não preenchem campos do contato nem disparam bot ou cenário automaticamente; para enviar dados durante o preenchimento, use uma **Requisição**.

## Mensagens de erro e sucesso

- **Imagem**: arquivo acima de 5 MB exibe `"Imagem deve ter no máximo 5 MB."`; entre 1 MB e 5 MB exibe `"Imagem de Flow deve ter no máximo 1 MB."`. Pela API: `"{{path}}: tipo de imagem não suportado. Use JPEG ou PNG."`, `"{{path}}: imagem excede o limite: {{actual}}/{{limit}} bytes."`, `"{{path}}: imagem com {{bytes}} bytes; a Meta recomenda até 300 KB para Flow Image."`.
- **Validação de campos no editor**: `"Configure nome e rótulo"`, `"Configure a seleção"`, `"Configure a lista"`, `"Configure os chips"`, `"Configure o link"`, `"Informe o texto"`, `"{{label}} deve ser um número inteiro maior ou igual a 0."`, `"Máx. caracteres deve ser maior ou igual ao mínimo."`, `"{{label}} deve ser um número inteiro entre {{min}} e {{max}}."`, `"Máx. docs deve ser maior ou igual ao Mín. docs."`, `"Informe o mínimo de documentos"`, `"Informe o máximo de documentos"`, `"{{label}} excede o limite: {{actual}}/{{limit}} caracteres."`.
- **Validação da API na publicação** (`"Flow inválido: ..."`): `"{{path}} excede o limite: {{actual}}/{{limit}} itens."`, `"{{path}} precisa ter pelo menos {{limit}} itens; atual: {{actual}}."`, `"{{screenId}} é terminal e precisa de um Footer."`, `"Pelo menos uma tela precisa ser terminal."`, `"{{label}} precisa de name e label."`, `"{{label}}.data-source precisa ter opções ou ${data.campo}."`, `"{{label}}.on-click-action.next.name é obrigatório."`.
- **Ações da lista e do editor**: `"Flow salvo."`, `"Flow atualizado."`, `"Flow clonado."`, `"Flow excluído."`, `"Flow descontinuado."`, `"Flow publicado."`, `"Nenhuma alteração para salvar."`, `"Não foi possível publicar o Flow."`, `"Não foi possível alterar o status do flow."`, `"Não foi possível descontinuar o Flow na Meta."`, `"A Meta não confirmou a descontinuação do Flow."`, `"Não foi possível deletar o Flow na Meta."`, `"A Meta não confirmou a exclusão do Flow."`, `"A API não confirmou a exclusão do Flow."`, `"A API não confirmou a descontinuação do Flow."`, `"Flow não encontrado"`.
