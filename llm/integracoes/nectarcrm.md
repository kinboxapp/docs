---
title: "NectarCRM: tokens por membro, campos enviados e casos de borda"
description: Regras do NectarCRM na Kinbox, com token por membro, campos segmento e origem, efeito do Salvar dados no Segmento e criação de contatos sem busca de duplicados.
keywords: [nectarcrm, nectar crm, token por membro, segmento, origem, salvar dados, add contato, contato duplicado nectar]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/integrations/EditNectarCRM.tsx
  - web:src/components-old/chat/side/integrationApps/NectarCRMApp/**
codigo:
  - web:src/pages/settings/integrations/EditNectarCRM.tsx
  - web:src/components-old/chat/side/integrationApps/NectarCRMApp/**
verificado_em: 2026-11-26
---

Complemento técnico de [Integrar com o NectarCRM](/docs/integracoes/nectarcrm).

- **Uma conta por workspace:** cada workspace tem uma única integração NectarCRM, com um campo de token por membro. Cada membro precisa do próprio token na linha dele para o botão **Add contato** ficar ativo.
- **Vínculo e campos enviados:** a ligação do contato fica salva no campo personalizado oculto `nectarcrm_id`, criado automaticamente no primeiro uso. Em **Add contato**, se o contato da Kinbox tiver campos personalizados com as chaves `segmento` e `origem`, esses valores são enviados como Segmento e Origem no NectarCRM.
- **Atenção ao Salvar dados:** a ação **Salvar dados** envia nome, telefone, e-mail e o valor do campo `origem`, e **substitui o Segmento do contato no NectarCRM pelo texto fixo `"WhatsApp/Kinbox"`**.
- **Sem busca de duplicados:** **Add contato** não procura contato existente no NectarCRM e sempre cria um novo. Se você usar **Desfazer integração** e clicar em **Add contato** novamente, será criado um segundo contato no NectarCRM.
- **Membro sem token em contato já ligado:** ao abrir a conversa de um contato já vinculado, o quadro tenta consultar o NectarCRM sem token, exibe o erro retornado pelo NectarCRM e deixa os campos vazios.
- **Limite de uso:** as consultas do quadro ao NectarCRM têm limite de uso. Se aparecer erro de limite, espere um minuto e tente de novo.
- **Bot e automações:** o NectarCRM não tem ações no bot nem nas automações.
