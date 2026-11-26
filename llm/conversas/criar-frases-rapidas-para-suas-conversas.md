---
title: "Frases rápidas: voz, anexos, categorias, visibilidade e chaves reservadas"
description: Referência das frases rápidas da Kinbox, com visibilidade e restrição de grupo, regras de categorias, uso na conversa, chaves reservadas e exportação.
keywords: [frase rápida, visível para, restrição de grupo, gerenciar categorias, 50 caracteres, já existe uma categoria, chaves reservadas, first_name, protocolo, atalho barra, sugestão do copiloto, frase de voz, exportar frases]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/quickPhrases/index.tsx
  - web:src/pages/settings/quickPhrases/EditQuickPhrase.tsx
  - web:src/pages/settings/quickPhrases/ManageCategoriesModal.tsx
  - web:src/components-old/chat/QuickPhrasesDrop.tsx
  - web:src/components-old/ui/PlaceholderDropSearch/index.tsx
  - web:src/components-old/chat/useQuickPhraseSuggestions.ts
  - api-v0:server/controllers/QuickPhrasesController.js
  - api-v0:server/controllers/CallController.js
codigo:
  - web:src/pages/settings/quickPhrases/**
  - web:src/components-old/chat/QuickPhrasesDrop.tsx
  - web:src/pages/inbox/QuickPhrasesSettingsModal.tsx
  - web:src/models/quickPhrases.ts
  - web:src/components-old/ui/PlaceholderDropSearch/index.tsx
  - web:src/components-old/chat/useQuickPhraseSuggestions.ts
  - web:src/pages/inbox/ChatTextEditorPure.tsx
  - api-v0:server/controllers/QuickPhrasesController.js
verificado_em: 2026-11-26
---

Referência complementar de `docs/conversas/criar-frases-rapidas-para-suas-conversas`.

## Permissões, visibilidade e restrição de grupo

- **Frases Rápidas** (seção **Gerenciamento do Ambiente**): "Adicionar, editar e excluir frases rápidas.". Sem ela, o item de menu, a página de configurações e o botão **Nova resposta rápida** na conversa não aparecem.
- **Usar na conversa:** não exige permissão.
- **Quem vê cada frase (lista e conversa):** frases **Todos os membros**, frases criadas pelo próprio membro e frases de **Grupo específico** dos grupos de que ele participa. O **proprietário do workspace** recebe todas as frases, inclusive as **Apenas para mim** de outros membros.
- **Restrição "Somente pode ver frases rápidas na lista se estiver no grupo da frase rápida"** (seção **Outros** › **Restrições**):
  - Na lista de **Frases rápidas**, esconde frases **Apenas para mim** de outros membros e frases de grupos alheios.
  - As frases **Todos os membros** continuam visíveis (e utilizáveis na conversa), mas sem as ações **Clonar** e **Excluir** e sem botão de salvar ao abrir ("Você não tem permissão para editar frases públicas.").
  - No editor, **Todos os membros** fica desativado, o padrão vira **Apenas para mim** e **Visível para grupo** lista apenas os grupos do membro.
  - Em **Gerenciar categorias**, frases públicas são puladas e reportadas como não atualizadas.

## Criação, voz e anexos

- **Atalho:** obrigatório ("Digite um atalho"); o campo prefixa `/`. O sistema não impede atalhos duplicados — se houver dois iguais, ambos aparecem na conversa.
- **Visível para:** **Todos os membros** (padrão), **Grupo específico** (permite um único grupo em **Visível para grupo**) ou **Apenas para mim**.
- **Texto:** obrigatório ("Obrigatório."). Aceita **Anexar documentos** (vários arquivos; aviso "Salvando documentos..."; remover pede "Tem certeza que deseja excluir o documento ...? Essa operação não poderá ser desfeita.").
- **Mensagem de voz:** exige gravação ("Necessário gravar um áudio."). O áudio é enviado apenas na criação — depois de salva, não é possível substituir o áudio de uma frase de voz (é necessário criar outra frase).
- Avisos ao salvar/excluir: "Frase rápida criado.", "Frase rápida salvo.", "Tem certeza que deseja excluir essa frase rápida?", "Excluído.".

## Categorias

- Limite: **50 caracteres** por nome ("A categoria deve ter no máximo 50 caracteres").
- Espaços no início são ignorados; nomes vazios não são criados; vírgulas separam vários nomes ao colar/digitar.
- Nomes iguais com diferença apenas de maiúsculas/minúsculas não criam duplicata:
  - Ao digitar: 'Já existe uma categoria chamada "{{name}}". Selecione a categoria existente.'
  - Ao confirmar com `Enter`: seleciona a existente com 'Já existe uma categoria chamada "{{name}}". A categoria existente foi selecionada.'
- Não existe cadastro independente de categorias: uma categoria existe enquanto alguma frase rápida a utiliza. Uma frase pode ter várias categorias.
- **Gerenciar categorias:** "Renomear ou excluir uma categoria altera todas as frases rápidas que a usam.". Sem categorias: "Nenhuma categoria cadastrada nas frases rápidas.".
  - **Renomear:** nome vazio mostra "Digite o nome da categoria"; renomear para o nome de outra categoria existente une as duas; sucesso "Categoria atualizada".
  - **Excluir:** confirmação **Excluir categoria** com 'A categoria "{{name}}" será removida de {{count}} frase(s) rápida(s). As frases não serão excluídas.'; sucesso "Categoria excluída".
  - Falha parcial (inclui frases públicas puladas pela restrição de grupo): "{{count}} frase(s) não puderam ser atualizadas".

## Uso na conversa e sugestão do copiloto

- **Busca em Respostas Rápidas:** pesquisa apenas pelo **atalho** (contém, sem diferenciar maiúsculas). Sem frases: "Nenhum dado cadastrado.". Sem resultado: "Nada encontrado".
- **Inserção no editor:**
  - Pelo atalho `/`: insere o texto da frase no lugar da barra `/`.
  - Pelo botão **Frases rápidas**: substitui todo o rascunho que já estava digitado no campo.
  - Frase com anexos: abre a janela de envio de arquivos com os anexos carregados.
  - Frase de voz: abre a janela de áudio com a gravação pronta para envio.
- **Desligar o atalho `/`:** engrenagem **Configurações das Frases Rápidas** → **Habilitar atalho para frases rápidas ("/")** → **Salvar** (aviso "Salvo"). Preferência salva por navegador.
- **Sugestão do copiloto:** com **Sugerir frases rápidas** ativado nas configurações do copiloto, exibe até 3 frases sugeridas no topo da janela **Respostas Rápidas**. Só aparece quando a sugestão automática do copiloto está ligada, a conversa está no escopo do copiloto e o workspace tem saldo na carteira; consome crédito uma vez por mensagem nova.

## Chaves reservadas (variáveis)

Listadas no botão **Chaves reservadas** (`{}`) do campo **Texto**:

- **Sessão da conversa:** **Protocolo** (`{{protocol}}`) e campos personalizados de conversa.
- **Contato:** **Nome** (`{{name}}`), **Primeiro nome** (`{{first_name}}`), **E-mail** (`{{email}}`), **Telefone** (`{{phone}}`) e campos personalizados de contato (`{{chave_do_campo}}`; campo do tipo JSON entra como `{{json:chave.key_name}}`).
- `{{last_name}}` (última palavra do nome) também é trocada no envio, mesmo não aparecendo no menu.

Regras de substituição (valem também para chaves digitadas manualmente na conversa):

- A troca acontece **no envio** da mensagem (no campo de edição a pessoa ainda vê `{{...}}`).
- Apenas a **primeira ocorrência** de cada chave na mensagem é substituída: se `{{first_name}}` aparecer duas vezes, a segunda vai literal para o contato.
- Se o contato não tiver valor no campo, a chave some do texto (vira vazio).
- Quebras de linha dentro do valor são removidas e aspas duplas viram aspas simples.
- Campos personalizados de **conversa** (listados em **Sessão da conversa**) não são substituídos no envio feito pelo membro — não prometer que funcionam.

## Exportação da lista

- Menu de três pontos em **Configurações** → **Ambiente** → **Frases rápidas** → **Exportar** (**CSV** ou **Excel**).
- Nome do arquivo: `frases-rapidas`.
- Colunas: `Atalho`, `Frase`, `Categorias`, `Tipo` (`Texto` / `Voz`), `Criado em`.
