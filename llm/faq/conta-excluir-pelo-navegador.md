---
title: Como excluo minha conta pelo navegador?
description: Dentro da Kinbox no navegador não há botão de excluir a conta; a exclusão é feita pelo app da Kinbox para celular ou pelo formulário público em kinbox.com.br/delete-account/.
keywords: [excluir conta, apagar conta, deletar conta, cancelar minha conta, excluir conta pelo navegador, excluir conta web, excluir cadastro, remover conta, transferir propriedade]
publico: llm
tipo: faq
fontes:
  - mobile:src/app/privacy.tsx
  - mobile:src/lib/deleteAccount.ts
  - api:src/modules/account-deletion-requests/account-deletion-requests.service.ts
  - api:src/modules/operators/operators.service.ts
codigo:
  - api:src/modules/account-deletion-requests/**
  - api:src/modules/operators/operators.service.ts
  - mobile:src/lib/deleteAccount.ts
  - mobile:src/app/privacy.tsx
verificado_em: 2026-11-26
---

## Pergunta

Como excluo minha conta pelo navegador?

## Resposta

Dentro da Kinbox no navegador não há botão de excluir a conta; use o app da Kinbox para celular (aba **Você** → **Privacidade** → **Excluir conta**, com duas confirmações) ou o formulário público em https://www.kinbox.com.br/delete-account/, para quem não tem o app ou não consegue entrar.

- **Pelo formulário web:** informe o e-mail da conta em https://www.kinbox.com.br/delete-account/. A resposta na tela é a mesma exista ou não uma conta cadastrada, e a Kinbox responde no e-mail da conta para confirmar que ela é sua e concluir a exclusão em até 45 dias, como a página informa. A exclusão não pode ser desfeita.
- **Se você for o proprietário de um workspace ativo:** antes de excluir a conta, transfira a propriedade para outro membro (veja [Licenças, desativar membros e transferir a propriedade](/docs/administracao/licencas-e-propriedade)) ou encerre o workspace. No app, a tentativa sem transferir mostra: "Você é dono de um workspace. Transfira a propriedade para outro membro antes de excluir sua conta."
- **O que some e o que fica:** nome, e-mail, telefone, foto, senha e o acesso a todos os workspaces são apagados. As conversas e registros do workspace continuam lá, identificados como "Usuário excluído".
- **Diferença entre ações:** excluir a conta apaga seu cadastro em todos os workspaces. Para apenas sair de um workspace, peça a quem administra para desativar ou excluir seu acesso nele (veja [Gerenciar membros](/docs/configuracoes-no-workspace/gerenciar-membros)); para excluir o workspace inteiro, a ação é exclusiva do proprietário.

## Variações

- onde fica o botão de excluir minha conta na kinbox web
- quero apagar meu cadastro da kinbox pelo computador
- não tenho o aplicativo como deleto minha conta kinbox
- o que acontece com as conversas quando excluo minha conta
- consigo excluir minha conta sendo proprietário de um workspace
- qual a diferença entre sair de um workspace e excluir minha conta
