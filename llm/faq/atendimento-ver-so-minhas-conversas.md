---
title: Como faço cada membro ver só as próprias conversas?
description: No papel do membro, escolha Restrito em Acesso as Conversas para que ele veja apenas as conversas atribuídas a ele, ou use Limitado ou Por Grupo conforme a equipe.
keywords: [ver só minhas conversas, esconder conversas de outros atendentes, atendente ver apenas suas conversas, acesso as conversas restrito, separar conversas por atendente, separar conversas por grupo]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/roles/permissionSections.tsx
  - api-v0:server/services/CustomerPlatformService.js
codigo:
  - web:src/pages/settings/roles/**
  - api-v0:server/services/CustomerPlatformService.js
verificado_em: 2026-11-26
---

## Pergunta

Como faço cada membro ver só as próprias conversas?

## Resposta

No papel (na tela, **Permissão**) do membro, em **Acesso as Conversas**, escolha **Restrito** ("Pode ver apenas as conversas atribuídas a ele ou seguindo.").

Com **Restrito**, aparecem nas listas da **Caixa de entrada** somente as conversas atribuídas ao membro (seguir uma conversa não a traz para a lista). Conforme a forma como sua equipe trabalha com grupos (equipes de membros, não grupos de WhatsApp), você também pode escolher outras opções em **Acesso as Conversas**:

- **Limitado** ("Ver apenas as conversas atribuídas a ele ou seguindo ou sem atribuição."): mostra as conversas atribuídas ao membro e as sem responsável dos grupos dele ou sem grupo.
- **Por Grupo Limitado** ("Pode ver apenas as conversas de seus grupos atribuídas a ele ou sem atribuição."): mostra as atribuídas ao membro e as sem responsável dos grupos dele.
- **Por Grupo** ("Pode ver apenas as conversas de seus grupos ou atribuídas a ele."): mostra as dos grupos do membro e as atribuídas a ele.
- **Por Grupo ou sem Grupo** ("Pode ver as conversas de seus grupos ou sem grupo ou atribuídas a ele."): mostra as dos grupos do membro, as sem grupo e as atribuídas a ele.

Quem pode editar papéis é o proprietário ou quem tem a opção **Permissões** na seção **Gerenciamento do Ambiente** do papel. Depois da edição, os membros que usam aquele papel precisam entrar de novo na Kinbox. Para distribuir as sessões novas automaticamente entre eles, configure uma regra de atribuição automática. As regras de rodízio entre membros e as de "menos atendimentos" só escolhem membros disponíveis. Se quiser apenas filtrar a própria visualização sem mudar o papel, cada membro pode abrir a visão **Meus** na **Caixa de entrada**.

Veja mais em [Criar papéis e permissões](/docs/configuracoes-no-workspace/configurar-permissoes-dos-usuarios), [Criar grupos de atendimento](/docs/configuracoes-no-workspace/criar-e-gerenciar-grupos), [Distribuir as conversas automaticamente](/docs/configuracoes-no-workspace/criar-atribuicoes-automaticas) e [Organizar a equipe de atendimento](/docs/atendimento/visao-geral).

## Variações

- quero que cada vendedor veja apenas os seus atendimentos
- como impedir que um atendente veja as conversas dos outros
- qual permissão limita o membro às próprias conversas
- como separar conversas por equipe ou grupo
- diferença entre restrito e limitado no acesso às conversas
- membro vendo conversas de outro atendente como bloquear
