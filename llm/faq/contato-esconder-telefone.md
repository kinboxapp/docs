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

Há dois jeitos, configurados em **Configurações** → **Ambiente** → **Permissões** (seção **Contatos**) pelo proprietário do workspace (na tela, **ambiente**) ou por quem tem a permissão **Permissões**:

1. **Para esconder o telefone de todos os contatos para certos membros:** marque a restrição **Esconder telefone** no papel desses membros. O telefone some da lista de contatos, do formulário do contato, da lista de conversas, do painel da conversa e da exportação de conversas, e aparece como `*******` no perfil do contato.
2. **Para esconder telefone e e-mail apenas de contatos específicos:** marque a chave **Contato privado** em **Configurações** no formulário do contato (a chave aparece apenas para o proprietário e para membros com **Ver telefone de contatos privados**). Membros sem **Ver telefone de contatos privados** não veem telefone nem e-mail na tela, e esses dados saem em branco na exportação de contatos.

Outras restrições úteis na mesma seção do papel:

- **Não pode exportar contatos:** impede que o membro exporte a lista de contatos e de organizações.
- **Proibir alterar celular:** impede que o membro edite o número do contato.

O proprietário do workspace sempre vê todos os telefones e e-mails e não sofre restrições.

Veja mais em [Criar papéis e permissões](/docs/configuracoes-no-workspace/configurar-permissoes-dos-usuarios), [Referência de permissões](/docs/administracao/referencia-de-permissoes) e [Contatos: encontrar, cadastrar, editar e excluir](/docs/conversas/clientes-contatos-e-organizacoes).

## Variações

- atendente não pode ver o número do cliente
- ocultar celular do contato para a equipe
- esconder número de WhatsApp dos atendentes
- como funciona contato privado na Kinbox
- bloquear visualização de telefone do cliente
- impedir vendedor de ver e copiar telefones dos contatos
