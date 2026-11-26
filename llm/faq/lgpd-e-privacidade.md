---
title: Como a Kinbox trata os dados dos meus clientes (LGPD)?
description: As regras de tratamento de dados pessoais estão na Política de Privacidade da Kinbox; no workspace, você controla acessos, contatos, exportações, Auditoria e acesso de parceiro.
keywords: [lgpd, privacidade, dados pessoais, política de privacidade, apagar dados de cliente, titular pediu exclusão, segurança de dados, excluir dados do workspace]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/workspace/DeleteWorkspaceModal.tsx
  - web:src/pages/settings/audit/Audit.tsx
  - api-v0:server/controllers/WorkspaceController.js
codigo:
  - web:src/pages/settings/workspace/**
  - web:src/pages/settings/audit/**
verificado_em: 2026-11-26
---

## Pergunta

Como a Kinbox trata os dados dos meus clientes (LGPD)?

## Resposta

As regras de como a Kinbox trata dados pessoais estão na Política de Privacidade da Kinbox, em `https://www.kinbox.com.br/privacy`.

Dentro do seu workspace (na tela, **ambiente**), você conta com controles diretos para gerenciar o acesso e os dados:

- **Papéis e permissões:** defina quem pode ver e alterar cada área em [Criar papéis e permissões](/docs/configuracoes-no-workspace/configurar-permissoes-dos-usuarios) e [Referência de permissões](/docs/administracao/referencia-de-permissoes).
- **Excluir um contato:** excluir um contato apaga o cadastro, os campos personalizados e todas as conversas dele, sem volta (veja [Contatos: encontrar, cadastrar, editar e excluir](/docs/conversas/clientes-contatos-e-organizacoes)).
- **Exportar contatos:** gere um arquivo com os dados cadastrados em [Exportar contatos](/docs/clientes/exportar-contatos).
- **Histórico de alterações:** acompanhe quem criou, alterou ou excluiu itens nos últimos 30 dias em [Ver o histórico de alterações (Auditoria)](/docs/administracao/auditoria) (precisa da permissão **Auditoria** no papel ou ser o proprietário).
- **Esconder conversas de um parceiro:** se o seu workspace for ligado a um parceiro que pode inspecioná-lo, desligue o acesso dele às conversas em [Controlar o que o parceiro vê no seu workspace](/docs/administracao/acesso-do-parceiro) (precisa da permissão **Workspace** no papel ou ser o proprietário).

Sobre encerrar o workspace na tela (só o proprietário), veja [Excluir o workspace](/docs/administracao/excluir-workspace). Para pedir que os dados do workspace sejam apagados de vez ou para dúvidas jurídicas sobre LGPD, fale com o suporte da Kinbox.

## Variações

- lgpd na kinbox
- privacidade dos dados dos clientes
- a kinbox é segura para dados de clientes
- onde vejo a política de privacidade da kinbox
- como apagar os dados de um cliente
- titular pediu exclusão dos dados
- como apagar todos os dados do workspace
