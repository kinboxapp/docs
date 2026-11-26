---
title: Se eu excluir um contato, as conversas somem?
description: Sim. Excluir um contato apaga também todas as conversas e os campos personalizados dele sem possibilidade de desfazer; as negociações não são excluídas.
keywords: [excluir contato, apagar contato, conversas somem, apagar cliente apaga histórico, recuperar contato excluído, lixeira de contatos, desfazer exclusão]
publico: llm
tipo: faq
fontes:
  - web:src/pages/crm/contacts/people/list/PersonActions.tsx
  - api-v0:server/controllers/CustomerController.js
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

Se eu excluir um contato, as conversas somem?

## Resposta

Sim: quando um membro com **Gerenciar Contatos** (ou o proprietário do workspace) exclui um contato, a Kinbox apaga o contato, os campos personalizados dele e **todas as conversas** associadas, sem possibilidade de desfazer.

Antes de apagar, a tela pede uma confirmação e, se houver conversas, mostra uma segunda pergunta: "Este contato possui conversas associadas. Ao excluir, todas as conversas também serão removidas. Deseja continuar?". Não existe lixeira nem opção de restaurar um contato excluído.

Algumas regras importantes:

- **Negociações:** não são excluídas junto com o contato.
- **Kinbox Agenda:** se o app estiver ativo e o contato tiver agendamentos vinculados, a Kinbox impede a exclusão ("Não é possível excluir: esse contato tem agendamentos vinculados no Kinbox Agenda.").
- **Contato repetido no WhatsApp:** se a conversa de WhatsApp mostrar a seção **Contato duplicado**, mescle os dois em vez de excluir: mesclar leva todas as conversas para o contato que fica. Se a seção não aparecer, não há como mesclar.
- **Organizações:** ao contrário do contato, excluir uma organização não apaga os contatos vinculados nem as negociações, e a organização pode ser restaurada depois.

Veja os detalhes em [Contatos: encontrar, cadastrar, editar e excluir](/docs/conversas/clientes-contatos-e-organizacoes) e [Mesclar contatos duplicados](/docs/clientes/mesclar-contatos).

## Variações

- apagar cliente apaga o histórico de mensagens
- excluí um contato e sumiram todas as conversas
- dá para recuperar um contato excluído na Kinbox
- existe lixeira de contatos
- se eu deletar o contato perco as negociações
- como apagar um contato duplicado sem perder o chat
