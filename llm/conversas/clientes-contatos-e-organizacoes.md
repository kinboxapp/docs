---
title: "Contatos: permissões, contato privado, excluir com conversas e mesclar sem volta"
description: Regras dos contatos e organizações da Kinbox, com o efeito de cada permissão, contato privado, mínimos da busca, telefone repetido, o que excluir apaga, o que mesclar leva e perde, e vínculos com organizações.
keywords: [permissões de contatos, gerenciar contatos, gerenciar organizações, alterar propriedades do contato, esconder telefone, proibir alterar celular, contato privado, ver telefone de contatos privados, busca de contatos, já existe um contato cadastrado com esse telefone, excluir contato apaga conversas, mesclar contatos, contato duplicado, organização principal, desvincular, restaurar organização, restringir relatórios aos grupos]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/roles/permissionSections.tsx
  - web:src/pages/crm/contacts/EditContact.tsx
  - web:src/pages/crm/contacts/shared/contactSearch.ts
  - web:src/components-old/chat/side/MergeContactPlugin/index.tsx
  - api-v0:server/controllers/CustomerController.js
  - api:src/modules/contacts/contacts.service.ts
codigo:
  - web:src/pages/crm/contacts/**
  - web:src/pages/crm/organizations/**
  - web:src/components-old/chat/side/MergeContactPlugin/**
  - api:src/modules/contacts/**
  - api:src/modules/organizations/**
  - api-v0:server/controllers/CustomerController.js
  - api-v0:server/services/CustomerPlatformService.js
verificado_em: 2026-11-26
---

Detalhes de referência de [Contatos: encontrar, cadastrar, editar e excluir](/docs/conversas/clientes-contatos-e-organizacoes).

## Permissões e o que cada uma muda

O menu lateral **Clientes** aparece para quem tem **Gerenciar Contatos** ou **Gerenciar Organizações**. Com só uma das duas, a tela **Clientes** abre direto na seção liberada. O **proprietário** do workspace tem todas as permissões que liberam acesso e não sofre nenhuma restrição.

| Permissão ou restrição | Seção do papel | Texto da tela e efeito |
| --- | --- | --- |
| **Gerenciar Contatos** | Contatos | "Adicionar, importar, editar e excluir contatos." Sem ela, a seção **Contatos** não aparece. |
| **Gerenciar Organizações** | Contatos | "Adicionar, editar, excluir e restaurar organizações e vincular contatos a elas." Sem ela, a seção **Organizações** não aparece e os vínculos no contato ficam somente leitura ("Sem organização" quando não há). Papéis salvos antes dessa opção existir herdam o valor de **Gerenciar Contatos**. |
| **Alterar propriedades do contato** | Contatos | "Pode alterar as informações dos contatos." Sem ela, o botão **Salvar** do formulário fica desativado (inclusive ao criar) e os campos do perfil ficam somente leitura. |
| **Ver telefone de contatos privados** | Contatos | "Pode ver telefone de contatos marcados como privado." Libera a chave **Contato privado** no formulário e a exibição de telefone e e-mail de contatos privados. |
| **Não pode exportar contatos** *(restrição)* | Contatos | Desativa as opções de exportar contatos em **Contatos** e oculta o menu **⋯** de exportação em **Organizações**. |
| **Esconder telefone** *(restrição)* | Contatos | "Esconde o telefone do contato do membro". Oculta o número na lista de contatos, mostra `*******` no perfil e remove o campo **Celular** do formulário. |
| **Proibir alterar celular** *(restrição)* | Contatos | "Membro fica proibido de alterar o celular do contato". Bloqueia a edição do campo **Celular** no formulário e no perfil. |
| **Campos** | Gerenciamento do Ambiente | "Ver, adicionar, editar e excluir campos customizados." Libera **Configurações** → **Ambiente** → **Campos personalizados**. Sem ela, abrir o endereço exibe "Você não tem permissão para acessar essa página". |

Veja também [Criar papéis e permissões](/docs/configuracoes-no-workspace/configurar-permissoes-dos-usuarios) e [Referência de permissões](/docs/administracao/referencia-de-permissoes).

## Membros com relatórios restritos a grupos

Quando o papel do membro tem a restrição **Restringir relatórios aos grupos do membro** (seção **Relatórios**), a lista de contatos e a exportação exibem apenas contatos que têm conversa cuja última sessão pertence a um dos grupos do membro. Contatos sem conversa não aparecem para esse membro; se o membro não pertencer a nenhum grupo, nenhum contato é listado.

## Contato privado

A chave **Contato privado** fica em **Configurações** no formulário do contato, com a ajuda "Somente membros que tem permissão para ver contatos privados conseguem ver o telefone e email do contato.". Apenas o proprietário e membros com **Ver telefone de contatos privados** veem essa chave.

Efeito por local para quem **não** tem **Ver telefone de contatos privados**:

- **Lista de contatos:** exibe um ícone de cadeado com a dica "Contato privado" e oculta telefone e e-mail.
- **Perfil do contato:** exibe o selo **Privado**; telefone e e-mail aparecem como `*******` ou ficam ocultos.
- **Formulário do contato:** os campos de telefone e e-mail ficam bloqueados e ocultos/mascarados.
- **Exportação de contatos:** o arquivo sai sem e-mail e sem celular para esse contato (veja [Exportar contatos](/docs/clientes/exportar-contatos)).

## Busca e filtros

- **Busca:** campo "Buscar por nome, telefone ou e-mail", disparado apenas ao apertar **Enter** (dica "Aperte Enter para buscar").
- **Mínimos:** 3 letras para nome ou parte do e-mail ("Digite ao menos {{count}} letras para buscar") ou 5 números para telefone ("Digite ao menos {{count}} números para buscar pelo telefone"). Termos com `@` buscam por e-mail.
- **Mensagens de retorno:**
  - Busca lenta: "A busca demorou demais. Tente um termo mais específico."
  - Erro de carregamento: "Não foi possível carregar os contatos" com o botão **Tentar novamente**.
  - Lista vazia: "Nenhum contato por aqui ainda" — "Cadastre os contatos com quem você se relaciona ou importe uma planilha."
  - Sem resultado: "Nenhum contato encontrado" — "Tente outra busca ou remova alguns filtros." com **Limpar filtros**.
- **Filtros:** **E-mail**, **Celular**, **Criado entre**, **Sessão criada entre**, **Organização** e **Filtro de conversa** (veja [Criar filtros de conversa](/docs/conversas/criar-filtros-de-conversa)), com atalhos de data **Hoje**, **Ontem**, **Últimos 7 dias**, **Últimos 30 dias**, **Esse mês** e **Mês passado**, e botões **Limpar** e **Aplicar**.
- **Ordenação:** **Mais recentes** (padrão), **Mais antigos**, **Nome (A-Z)** e **Nome (Z-A)**.
- **Visões e carregamento:** cartões (padrão; única opção no celular) ou tabela (preferência salva no navegador; **Mostrar colunas...** inclui campos personalizados de contato). Carrega 30 contatos por vez ao rolar ("Mostrando X de Y").

## Cadastro

- **Obrigatoriedade:** nenhum campo é obrigatório em **Criar contato**, exceto **E-mail** ("Campo obrigatório") quando **Vincular ao Kinbox Agenda** está ligado.
- **Foto:** até 2 MB (erro "Erro ao fazer upload. O tamanho máximo deve ser 2MB.").
- **Telefone e e-mail repetidos:** o telefone é salvo com o código do país escolhido na bandeira. Se já existe contato com exatamente o mesmo telefone, retorna "Já existe um contato cadastrado com esse telefone". E-mail repetido não é recusado.
- **Avisos ao salvar:** "Contato criado." ou "Contato salvo.". Se alguma organização escolhida na criação falhar ao vincular: "Contato criado, mas {{count}} organização(ões) não foram vinculadas.".
- **Contato sem nome:** exibido pelo telefone; sem telefone, pelo e-mail; sem ambos, como "Visitante {{id}}".
- **Origem e autoria:** contato criado na tela fica registrado como cadastro manual com o membro em **Criado por**; contato importado por planilha fica registrado como vindo da importação e sem **Criado por** (veja [Importar contatos de uma planilha](/docs/clientes/importar-contatos)). **Cliente desde**, **Origem** e **Criado por** são somente leitura.
- **Campos personalizados no formulário:** entidade **Contato**; com mais de 4 campos vazios, os vazios ficam recolhidos em **Mostrar {{count}} campos vazios** / **Ocultar campos vazios**. **Texto em área** e **Json** ficam fora dessa contagem. Validação: "Valor inválido" no formulário e "{{name}} inválido" na edição direta no perfil (veja [Tipos de campo e validações](/docs/clientes/tipos-de-campo)).
- **Notas no perfil:** na aba **Resumo**, salva com `Ctrl + Enter` (aviso "Notas salvas.").

## Enviar mensagem

- **Enviar mensagem** (menu **⋯** da lista ou cabeçalho do perfil): quando há celular, abre a janela de nova mensagem (WhatsApp/SMS); quando há apenas e-mail, abre em um canal de e-mail preenchido (veja [Iniciar uma conversa com um contato](/docs/conversas/iniciar-conversa)).
- **Motivos de botão desativado:** "Contato sem celular ou e-mail" ou "Nenhum canal de e-mail disponível para enviar mensagem".
- **Buscar conversas:** abre a busca de conversas usando o telefone, e-mail ou nome do contato.

## Excluir

- Disponível apenas individualmente no menu **⋯** da lista ou do perfil (não existe exclusão em lote nem lixeira).
- **Confirmações:** "Tem certeza que deseja excluir esse contato do ambiente?"; quando o contato possui conversas, surge a segunda confirmação: "Este contato possui conversas associadas. Ao excluir, todas as conversas também serão removidas. Deseja continuar?".
- **Avisos:** "Contato excluído com sucesso!" ou "Erro ao excluir contato.".
- **Kinbox Agenda:** se o app estiver ativo e o contato tiver agendamentos vinculados, a exclusão é bloqueada com "Não é possível excluir: esse contato tem agendamentos vinculados no Kinbox Agenda.".
- **O que é apagado:** o contato, os campos personalizados dele, **todas as conversas** associadas e os vínculos com organizações. A ação não pode ser desfeita.
- **Negociações:** não são excluídas junto com o contato.

## Mesclar

Detalhes de [Mesclar contatos duplicados](/docs/clientes/mesclar-contatos).

- **Onde e para quem aparece:** apenas na seção vermelha **Contato duplicado** no painel lateral da conversa na [Caixa de entrada](/docs/conversas/caixa-de-entrada-do-kinbox), para quem atende a conversa e vê o painel lateral.
- **Condições para aparecer:** conversa de WhatsApp ([oficial ou QR Code](/docs/canais/whatsapp/visao-geral)), existência de outro contato no workspace com o mesmo número (com ou sem o 9 após o DDD) e pelo menos uma conversa nesse outro contato. E-mail, nome e outros canais não geram detecção. Não existe mesclar contatos de outros canais nem pela lista de contatos.
- **Limite por ação:** dois contatos por vez (com vários duplicados, mescle um de cada vez).
- **Confirmação e sucesso:** "Esse contato duplicado será mesclado com o contato atual. Todas as conversas passarão para o contato atual." e "Esse processo é irreversível, quer proceder?" → botão **Proceder** → aviso "Contatos mesclados com sucesso".
- **Qual contato fica:** permanece o contato da conversa aberta; o duplicado é apagado definitivamente, sem volta.
- **O que passa para o contato que fica:** todas as conversas de todos os canais (com sessões e tags), os vínculos com organizações (mantendo a principal do contato que fica), as negociações (atualizadas em segundo plano) e nome, foto, e-mail e campos personalizados apenas onde o contato que fica estiver vazio.
- **O que não passa:** notas, telefone do duplicado, identificadores de Instagram, Facebook e Telegram, ID Externo, marca de contato privado, tarefas e histórico do contato.
- **Erro ao mesclar:** se aparecer um erro, recarregue a conversa e tente de novo; se continuar, fale com o suporte.

## Organizações

Detalhes de [Agrupar contatos em organizações](/docs/clientes/organizacoes).

- **Criação:** único campo obrigatório é **Nome da organização** ("Informe o nome da organização", até 256 caracteres). Logo até 2 MB; cargo do vínculo até 128 caracteres. Avisos que não impedem salvar: "CNPJ parece inválido, confira os dígitos." e "E-mail parece inválido".
- **Duplicidade por CNPJ ou domínio:** ao sair de **CNPJ** ou **Site**, exibe "Encontramos organizações com o mesmo CNPJ ou domínio" listando empresas com o mesmo CNPJ ou domínio (inclusive excluídas); não impede salvar.
- **Falha parcial de vínculo na criação:** "Organização criada, mas {{count}} contato(s) não foram vinculados.".
- **Organização principal e vínculos:** a primeira organização vinculada vira principal; as demais entram como secundárias. Avisos: "Contato vinculado.", "Organização principal alterada.", "Vínculo removido.".
- **Desvincular:** "{{contact}} deixará de fazer parte de {{organization}}. Os cadastros e as negociações são mantidos.". Ao desvincular a principal havendo outras: "Essa é a organização principal do contato. Escolha a nova principal:" (sem escolha, a mais antiga vira principal).
- **Excluir e restaurar:** confirmação "A organização sai da listagem, mas os {{count}} contatos vinculados e as negociações são preservados."; aviso "Organização excluída.". A organização excluída não aparece na lista nem nas buscas e não pode ser vinculada ("Ela não aparece nas buscas nem pode ser vinculada. Os vínculos e negociações foram preservados."). Não há filtro de excluídas na lista; para restaurar (com **Gerenciar Organizações**), abra a organização excluída — por exemplo pelo link no aviso de mesmo CNPJ ou domínio — e clique em **Restaurar** (selo **Excluída** some; aviso "Organização restaurada.").
