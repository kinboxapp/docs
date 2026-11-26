---
title: "Bitrix24: para que serve cada webhook, regras do quadro e do bot"
description: "Regras técnicas do Bitrix24 na Kinbox: função de cada campo de webhook, barra final na URL, fonte do lead por tag, campo oculto bitrix24_id, ações do bot e casos de borda."
keywords: [bitrix24, crm.lead.add, user.get, webhook url, bitrix24_id, fonte por tag, cria oportunidade no bitrix, atualiza oportunidade no bitrix, cria ou atualiza contato no bitrix]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/integrations/**
  - web:src/components-old/chat/side/integrationApps/Bitrix24App/index.tsx
  - web:src/pages/settings/bot/drawers/integration/ConsultaDealBitrix.tsx
  - web:src/pages/settings/bot/drawers/integration/FieldMapBitrix.tsx
  - api-v0:server/modules/**
  - api-v0:server/services/BitrixService.js
  - api-v0:server/modules/chat/**
codigo:
  - web:src/pages/settings/integrations/**
  - web:src/pages/settings/integrations/bitrix/**
  - web:src/components-old/chat/side/integrationApps/Bitrix24App/**
  - web:src/pages/settings/bot/drawers/integration/ConsultaDealBitrix.tsx
  - web:src/pages/settings/bot/drawers/integration/FieldMapBitrix.tsx
  - api-v0:server/modules/**
  - api-v0:server/services/BitrixService.js
  - api-v0:server/modules/chat/**
verificado_em: 2026-11-26
---

Complemento técnico de [Integrar com o Bitrix24](/docs/integracoes/bitrix24).

## Permissões, conta e função de cada webhook

- **Permissão e conta:** o painel **Bitrix24** (**Configurações** → **Integrações** → **Apps** → **Bitrix24**) exige a permissão **Integrações** ou proprietário. Cada workspace mantém apenas uma integração Bitrix24.
- **Visibilidade do quadro:** o quadro **Bitrix24** aparece no painel **Detalhes** apenas com **Habilitar integração** ligado, e fica oculto para quem tem a restrição **Esconder informações de integração** ou está no modo de treino da Academia.
- **Barra final obrigatória na URL:** cole o endereço completo de cada webhook terminado em `/` (conforme o exemplo do campo). O quadro e as listas de opções concatenam o método diretamente ao final da URL; sem a barra `/`, essas chamadas falham.

| Campo no painel | Onde é usado | Permissões necessárias no Bitrix24 |
| --- | --- | --- |
| **Webhook para API REST de chamada (crm.lead.add)** | Quadro da conversa (criação de lead, leitura de fontes e listagem de campos de lead). Obrigatório quando **Habilitar integração** está ligado. | Acesso ao CRM. |
| **Webhook para API REST de chamada de usuário (user.get)** | Quadro da conversa: atribui o lead criado ao usuário do Bitrix24 com o mesmo e-mail do membro que clicou em **Add lead**. | Acesso a usuários (`user.get`). |
| **Webhook Url** | Ações prontas do Bitrix24 no bot (contatos, negócios, funis e usuários) e listas da gaveta do bot quando o primeiro campo está vazio. | Acesso ao CRM (contatos, negócios e funis) e a usuários. |

- **Preenchimento parcial:**
  - Só **Webhook Url** preenchido: o bot funciona, mas o botão **Add lead** do quadro na conversa fica desativado.
  - Só o primeiro webhook preenchido: o quadro funciona, mas as ações prontas do bot não executam nada.

## Regras do quadro da conversa

- **Vínculo salvo:** ao criar o lead, a Kinbox cria automaticamente o campo personalizado oculto `bitrix24_id` no contato ("Identificador usado para integração com Bitrix24"). **Desfazer integração** limpa apenas o vínculo na Kinbox e não apaga o lead no Bitrix24.
- **Fonte do lead por tag:** se a conversa tiver uma tag ([Criar e usar tags](/docs/configuracoes-no-workspace/criar-e-gerenciar-tags)) com o mesmo nome (sem diferenciar maiúsculas e minúsculas) de uma fonte cadastrada no Bitrix24, o lead criado recebe essa fonte automaticamente.
- **Atribuição de responsável:** com o webhook `user.get` preenchido, o e-mail do membro que clicou em **Add lead** precisa ser idêntico ao e-mail do usuário no Bitrix24; se não encontrar correspondência, o lead fica sem esse responsável definido pela Kinbox.
- **Contato sem nome:** o contato precisa ter nome preenchido antes de clicar em **Add lead**; sem nome, o quadro não conclui a criação e permanece carregando.

## Ações prontas no bot

Disponíveis no bloco **Integração**, grupo **Outros** (veja [Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot); puladas na simulação):

- **Requisitos comuns:** todas as ações exigem **Webhook Url** preenchido no painel **Bitrix24** e telefone cadastrado no contato. Sem um desses dois dados, a ação não faz nada e não exibe aviso.
- **Vínculo separado do quadro:** o bot busca o contato no Bitrix24 pela ligação própria salva pelo bot ou pelo telefone (testando sem DDI e no formato `+<DDI><número>`). Essa ligação aponta para um contato do Bitrix24 e é independente do campo `bitrix24_id` do quadro (que aponta para um lead).
- **Cria ou atualiza contato no Bitrix:** oferece **Mapa de campos** (campos de contato do Bitrix24). Cria o contato (com nome do contato ou telefone, telefone, e-mail e campos mapeados) ou atualiza nome, e-mail e campos mapeados.
- **Cria Oportunidade no Bitrix:** exige **Funil de vendas** (a lista começa com **Padrão**), **Etapa do funil** e **Mapa de campos** (campos de negócio). Só atua se o contato **já existir** no Bitrix24 (caso contrário, não faz nada). Se já houver negócio aberto daquele funil (etapa sem `WON` ou `LOSE`), não cria outro; caso contrário, cria `"Negócio de <nome>"` na etapa escolhida e atribui ao usuário do Bitrix24 com o mesmo e-mail do membro atribuído à conversa.
- **Atualiza Oportunidade no Bitrix:** pede **Funil de vendas**, **Etapa do funil** e **Mapa de campos**. Localiza o primeiro negócio aberto do contato (em qualquer funil), muda para a etapa escolhida (se informada), aplica os campos mapeados e define o responsável pelo e-mail do membro atribuído à conversa.
- **Mapa de campos dos blocos do bot:** o mapa que vale para o bot é o configurado dentro de cada bloco. Além dos campos personalizados do contato, oferece **Nome**, **E-mail**, **Data criação da sessão**, **Data fim da sessão**, **Atendente da sessão** e **Protocolo**:
  - apenas campos preenchidos são enviados;
  - datas da sessão vão como início do dia em UTC;
  - campos do tipo lista no Bitrix24 recebem a opção cujo texto coincide com o valor enviado;
  - **Atendente da sessão** não é enviado como campo mapeado (a atribuição de responsável segue a regra de e-mail do membro atribuído à conversa).
