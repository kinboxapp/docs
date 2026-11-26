---
title: Como escondo o telefone do contato de alguns atendentes?
description: Ative a restrição Esconder telefone no papel desses membros ou marque o contato como Contato privado; o proprietário do workspace sempre vê todos os dados.
keywords: [esconder telefone, ocultar celular do contato, atendente não ver número, esconder whatsapp do cliente, contato privado, ver telefone de contatos privados, proibir alterar celular, não pode exportar contatos]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/roles/permissionSections.tsx
  - web:src/pages/crm/contacts/EditContact.tsx
  - web:src/pages/crm/contacts/people/ContactProfile/ContactDetails.tsx
  - web:src/pages/crm/contacts/people/list/PersonRow.tsx
  - web:src/pages/crm/contacts/shared/exportContacts.ts
codigo:
  - web:src/pages/crm/contacts/index.tsx
  - web:src/pages/crm/contacts/people/**
  - web:src/pages/crm/contacts/EditContact.tsx
  - web:src/pages/crm/contacts/EditEntityCustomFields.tsx
  - web:src/pages/crm/contacts/shared/**
  - web:src/layouts/BaseLayout.tsx
  - api:src/modules/contacts/**
  - api-v0:server/controllers/CustomerController.js
  - api-v0:server/routes/CustomerApiRoutes.js
verificado_em: 2026-11-26
---

## Pergunta

Como escondo o telefone do contato de alguns atendentes?

## Resposta

Há dois jeitos, e cada um fica num lugar diferente:

1. **Esconder o telefone de todos os contatos para certos membros:** em **Configurações** → **Ambiente** → **Permissões**, no papel desses membros, marque a restrição **Esconder telefone** (seção **Contatos**). Quem pode mudar papéis é o proprietário do workspace ou quem tem a permissão **Permissões**. A restrição oculta o telefone do contato nas telas de atendimento, contatos e negociações.
2. **Esconder telefone e e-mail só de alguns contatos:** abra o formulário do contato (**Clientes** → **Contatos** → **Novo contato** ou **Editar**) e ligue **Contato privado** na seção **Configurações**. A chave aparece só para o proprietário e para quem tem **Ver telefone de contatos privados**. Quem não tem essa permissão não vê o telefone nem o e-mail desse contato, e esses dados saem em branco na exportação de contatos.

Se o membro não deve baixar listas de contatos, marque **Não pode exportar contatos** no papel dele: as opções de exportação ficam desativadas para ele.

Para que o membro não troque o número do contato, marque também **Proibir alterar celular** no papel dele.

O proprietário do workspace sempre vê todos os telefones e e-mails.

Veja mais em [Criar papéis e permissões](/docs/configuracoes-no-workspace/configurar-permissoes-dos-usuarios), [Referência de permissões](/docs/administracao/referencia-de-permissoes) e [Contatos: encontrar, cadastrar, editar e excluir](/docs/conversas/clientes-contatos-e-organizacoes).

## Variações

- atendente não pode ver o número do cliente
- ocultar celular do contato para a equipe
- esconder número de WhatsApp dos atendentes
- como funciona contato privado na Kinbox
- bloquear visualização de telefone do cliente
- impedir vendedor de ver e copiar telefones dos contatos
