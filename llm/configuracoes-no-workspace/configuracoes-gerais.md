---
title: "Configurações do workspace: padrões, regras da caixa de entrada, Auditoria, parceiro e exclusão"
description: Detalhes das configurações gerais do workspace na Kinbox — valores padrão, efeito de cada opção da Caixa de Entrada, fuso horário, idioma e moeda, o que a Auditoria registra, o acesso do parceiro e quem pode excluir o workspace.
keywords: [configurações gerais, padrão do workspace, fuso vazio, brasília, horário de verão, idioma padrão, moeda, mensagem fora do horário a cada mensagem, mensagem ao resolver não enviada, chaves first_name, enviar nome do membro instagram sms, indicação de pendente, tempo de tolerância 360, campos obrigatórios de sessão, auditoria 30 dias, membro removido, parceiro via mcp, quem pode excluir o workspace, o nome do ambiente está incorreto]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/workspace/index.tsx
  - web:src/pages/settings/workspace/DeleteWorkspaceModal.tsx
  - web:src/pages/settings/audit/Audit.tsx
  - web:src/components-old/inbox/ConversationItem/index.tsx
  - web:src/components-old/inbox/NewMessageModal/index.tsx
  - web:src/components-old/ui/CustomFieldSelect/index.tsx
  - web:src/lib/partner-conversations.ts
  - api-v0:server/controllers/WorkspaceController.js
  - api-v0:server/controllers/OperatorController.js
  - api-v0:server/controllers/EventsController.js
  - api-v0:server/controllers/CallController.js
  - api-v0:server/controllers/AuditController.js
  - api-v0:server/auxiliary/Utils.js
  - api-v0:server/modules/chat/auxiliary/parser.js
  - api:src/modules/audit/audit.schema.ts
  - api:src/modules/mcp/mcp-audit.service.ts
  - api:src/modules/push-notifications/push-notifications.service.ts
codigo:
  - web:src/pages/settings/workspace/**
  - web:src/pages/settings/audit/**
  - web:src/components-old/inbox/ConversationItem/index.tsx
  - web:src/components-old/inbox/NewMessageModal/index.tsx
  - web:src/lib/partner-conversations.ts
  - web:src/lib/timezones.json
  - api-v0:server/controllers/WorkspaceController.js
  - api-v0:server/controllers/EventsController.js
  - api-v0:server/controllers/CallController.js
  - api-v0:server/controllers/AuditController.js
  - api-v0:server/services/CallService.js
  - api-v0:server/modules/chat/auxiliary/**
  - api:src/modules/audit/**
  - api:src/modules/mcp/mcp-audit.service.ts
verificado_em: 2026-11-26
---

Referência complementar de [Configurações gerais do workspace](/docs/configuracoes-no-workspace/configuracoes-gerais), [Mensagens automáticas e regras da caixa de entrada](/docs/administracao/mensagens-automaticas), [Ver o histórico de alterações (Auditoria)](/docs/administracao/auditoria), [Controlar o que o parceiro vê no seu workspace](/docs/administracao/acesso-do-parceiro) e [Excluir o workspace](/docs/administracao/excluir-workspace).

Alterar **Configurações** → **Ambiente** → **Geral** no workspace (na tela, **ambiente**) precisa da permissão **Workspace** na seção **Gerenciamento do Ambiente** do papel (na tela, **Permissão**) ou ser o proprietário.

## Padrões de um workspace novo

| Opção | Valor inicial |
| --- | --- |
| **Fuso horário** | `(UTC-03:00) Brasilia` para quem cria a conta pelo cadastro; vazio para workspaces criados depois em **Criar ambiente** (vazio vale Brasília, UTC−3) |
| **Idioma padrão do ambiente** | **Português (Brasil)** |
| **Moeda** | Vazio (vale real, BRL) |
| **Tornar indisponível se inativo.** | Desligada (sugestão inicial de 30 minutos ao ligar) |
| **Tornar offline se inativo** | Desligada (vazio vale 60 minutos; aceita de 1 a 1444 minutos) |
| **Preservar tags ao resolver uma conversa** | **Ligada** |
| **Indicação dinâmica de conversa pendente** | Desligada (tempos preenchidos: amarelo 0 h 10 min, vermelho 1 h 0 min) |
| **Tempo de tolerância ao resolver conversa** | Desligada (360 minutos preenchidos) |
| Demais opções de **Caixa de Entrada** | Desligadas |
| **Permitir que o parceiro veja as conversas** | **Ligada** (cartão **Parceria** só aparece se o workspace for ligado a um parceiro que pode inspecioná-lo) |

## Fuso, idioma, moeda e layout

- **Como salvar e validação:** **Imagem do ambiente** (até 2 MB; erro `"Erro ao fazer upload. O tamanho máximo deve ser 2MB."`; aviso `"Imagem do ambiente alterada."`) e **Nome do ambiente** (obrigatório; aviso `"Nome do ambiente editado."`) salvam na hora. As demais opções só valem após **Salvar mudanças** (`"Suas preferências foram atualizadas."`). Campos numéricos aceitam números (erro `"Digite um número"`). Sair da tela sem salvar perde as alterações.
- **Fuso horário (106 opções em inglês):** vale para as regras do workspace que dependem de hora — horários de atendimento, **Mensagem quando fora do horário comercial**, bot, **Limitar horário que pode responder** e **Limitar horário de acesso ao ambiente** do papel. Campo vazio vale Brasília (UTC−3). A hora exibida na tela (hora das mensagens, listas e **Auditoria**) segue o relógio e o fuso do computador ou celular de cada pessoa, não o fuso do workspace. A Kinbox usa uma diferença de horas fixa o ano todo; em fusos de lugares com horário de verão, a hora das regras pode ficar 1 hora diferente em parte do ano — nesse caso, fale com o suporte.
- **Horário comercial:** escolhe um horário cadastrado em **Configurações** → **Ambiente** → **Horários**; é a base de TME, TMP e TMA nos relatórios e da **Mensagem quando fora do horário comercial**.
- **Idioma padrão do ambiente:** **Português (Brasil)** ou **English**. Funciona como idioma de reserva para avisos gerados sem tela aberta (como notificações push) de membros sem idioma definido no perfil (ordem de prioridade: idioma do perfil, idioma do workspace, português do Brasil). A interface de cada membro segue o perfil ou o navegador, e as mensagens automáticas da **Caixa de Entrada** saem exatamente como foram escritas, sem tradução.
- **Moeda (119 opções em inglês):** muda apenas o símbolo e o formato dos valores nas negociações e metas, sem converter valores já cadastrados. Campo vazio vale real (BRL). O preço de produtos continua em R$.
- **Inatividade:** **Tornar indisponível se inativo.** conta sem atividade em todas as abas abertas da Kinbox e volta o membro para disponível ao mexer novamente; não age em quem ficou indisponível manualmente, em quem tem **Não torna indisponível se ficar inativo** nem no proprietário. **Tornar offline se inativo** desconecta a atualização em tempo real (`"Você foi desconectado por inatividade."` com **Reconectar**); não age em quem tem **Não torna offline se ficar inativo** nem no proprietário.
- **Layout no celular:** no celular, a tela se chama **Seu ambiente** e o campo do nome aparece como **Nome da organização**.

## Caixa de Entrada: condições de cada opção

- **Mensagem ao resolver conversa:** sai quando a sessão é resolvida, se a chave está ligada e há texto. Não sai quando a sessão resolvida tinha sido reaberta (pelo **Tempo de tolerância ao resolver conversa** ou por **Reabrir**) nem quando a conversa é resolvida ao ser transferida para outro canal. Resolvida por membro, sai como mensagem do membro; sem membro (bot ou automação), sai como mensagem de bot. Aceita as chaves de frase rápida (`{{first_name}}`, `{{name}}` etc.), trocando cada chave apenas na primeira vez que aparece (sem dado, a chave é removida). No WhatsApp oficial, segue a [janela de 24 horas](/docs/canais/whatsapp/whatsapp-cloud-api/janela-de-24-horas).
- **Mensagem quando fora do horário comercial:** só em conversa com membro responsável e com um **Horário comercial** escolhido em **Preferências** (conversas sem responsável ou só com grupo não recebem). Sai a cada mensagem do contato fora do horário, como mensagem de bot. Segue o **Fuso horário** do workspace e recalcula no máximo a cada minuto. Não troca chaves como `{{first_name}}` — use texto sem chaves.
- **Mensagem quando membro indisponível:** só em conversa com membro responsável indisponível; fora do horário tem prioridade quando as duas condições ocorrem juntas. Sai a cada mensagem do contato, como mensagem de bot, e não troca chaves — use texto sem chaves.
- **Preservar tags ao resolver uma conversa:** ligada (padrão), a sessão nova do mesmo contato herda as tags da sessão anterior; desligada, a sessão nova começa sem tags e a sessão resolvida mantém as dela.
- **Enviar nome do membro em cada mensagem:** inclui o nome do perfil do membro numa linha antes do texto no formato `*Nome:*` (negrito no WhatsApp), apenas em mensagens enviadas por membro (não bot nem automação). Funciona no WhatsApp (QR Code e oficial), Facebook Messenger, Instagram e SMS (no SMS o nome vai com os asteriscos). Telegram e e-mail não recebem o prefixo.
- **Sempre atribuir ao membro que responder:** sem ela, quem responde uma conversa sem responsável vira o responsável; ligada, quem envia uma mensagem comum assume a conversa mesmo se ela já tinha outro responsável (notas privadas não alteram a atribuição).
- **Desatribuir ao reabrir se membro offline:** retira o responsável quando o contato escreve e a sessão é reaberta dentro do **Tempo de tolerância ao resolver conversa** com o responsável offline. Não age em sessão nova.
- **Nota de avaliação pública:** mostra `"⭐"` e a média de avaliação de cada membro na lista de membros das **Salas**.
- **Indicação dinâmica de conversa pendente:** troca o círculo azul (`"Aguardando resposta do membro"`) por alerta amarelo e depois vermelho segundo os campos de **horas** e **minutos**, contados desde que a conversa ficou pendente ou desde a última mensagem; **Destacar cor do fundo** pinta o fundo da linha. Se o campo de horas ou minutos de um nível ficar vazio, a cor correspondente nunca aparece — preencha horas e minutos (use `0` quando não quiser horas). Os mesmos tempos são usados no painel **Ao vivo** dos relatórios.
- **Tempo de tolerância ao resolver conversa:** ligada, mensagens do contato até X minutos após resolver reabrem a mesma sessão (sem novo protocolo e sem disparar o bot de início); desligada, toda mensagem após resolver abre sessão nova. Afeta **Mensagem ao resolver conversa** (sessão reaberta não envia) e **Desatribuir ao reabrir se membro offline**.
- **Campos obrigatórios no chat ativo:** exige ligar a chave e selecionar pelo menos um campo. A lista de seleção mostra campos personalizados de contato e de sessão, mas a janela de iniciar conversa (**Enviar mensagem**) pede apenas os campos de **contato**.

## Auditoria

- **Quem pode:** precisa da permissão **Auditoria** na seção **Gerenciamento do Ambiente** do papel ou ser o proprietário (nos papéis prontos, apenas **Administrador**).
- **Escopo e retenção:** registra ações concluídas com sucesso que criam, alteram ou excluem algo nos últimos 30 dias. Consultas e tentativas com erro não entram. Exceção: ações de parceiro pelo MCP entram mesmo quando falham (como **Falhou**) e ficam guardadas por até 180 dias.
- **Lista (20 registros por página, mais recente primeiro):**
  - **Autor:** nome e foto do membro, **Membro removido**, **Integração** (quando a ação veio de uma integração) ou `Parceiro <workspace> · <membro>` (dica `"Ação feita por um parceiro pelo MCP"`).
  - **Ação:** **Criou**, **Atualizou**, **Excluiu** (ou rótulo próprio); para parceiro pelo MCP: **Consultou**, **Alterou** ou **Falhou**.
  - **Entidade:** **Tag**, **Assinatura**, **Bot**, **Permissão**, **Meta**, **Negociação**, **Tarefa**, **Automações**, **Relatório**, **Grupo**, **Membro**, **Contato**, **Campo personalizado**, **Filtro**, **Frase Rápida**, **Atribuição automática**, **WhatsApp**, **Instagram**, **Integração**, **MCP**. Itens sem nome amigável aparecem com o nome técnico em inglês (como `workspace`, `products`, `pipelines`, `organizations`, `workflows`).
  - **Descrição:** nome ou detalhe do item; mudanças de disponibilidade mostram `"Automático: inatividade"`, `"Automático: horário de atendimento"` ou `"Manual"`; tarefas mostram `"Motivo: <motivo>."`. Clicar copia o ID (`"ID da entidade copiado"`; erro: `"Não foi possível copiar o ID da entidade"`).
  - **Quando:** tempo relativo e data/hora no relógio do aparelho de quem olha.
- **Ações de parceiro pelo MCP:** entidade **MCP**; grava parceiro, quem chamou, ferramenta usada e resultado (nunca os dados consultados). Exemplos de nomes de ação exibidos na descrição: `"Listar"`, `"Ver status"`, `"Criar WhatsApp"`, `"Gerar QR code"`, `"Ver plano"`, `"Faturas em aberto"`, `"Histórico de faturas"`, `"Créditos de SMS"`, `"Saldo da carteira"`; em caso de erro, mostra a dica `"A chamada do parceiro falhou."`.
- **Filtros:** **Criado entre** (atalhos **Hoje** e **Ontem**), **Membro**, **Ação** (**Criou**, **Atualizou (Put)**, **Atualizou (Patch)**, **Excluiu**, **Parceiro via MCP**), **Entidade** (**Bot**, **Permissão**, **Grupo**, **Membro**, **Filtros**, **Assinatura**, **Canal**, **Automação**, **Frases Rápidas**, **Campos personalizados**, **Tarefa**) e **ID da entidade**. **Entidade** e **ID da entidade** substituem um ao outro (use um de cada vez). Ações de criação geralmente não têm o ID no endereço e podem não aparecer na busca por **ID da entidade**. **Atualizou (Put)** e **Atualizou (Patch)** aparecem ambos como **Atualizou** na lista.

## Parceiro

- O cartão **Parceria** só aparece se o workspace for ligado a um parceiro que pode inspecioná-lo, e não aparece para o próprio parceiro enquanto ele inspeciona.
- **Permitir que o parceiro veja as conversas** vem ligada; alterá-la exige a permissão **Workspace** no papel ou ser o proprietário e clicar em **Salvar mudanças**.
- Com a opção desligada, o parceiro continua acessando relatórios e configurações, mas não vê as conversas: **Caixa de entrada** some na inspeção, tentar abrir uma conversa mostra `"Conversas restritas pelo cliente"` (`"O cliente não permite que o parceiro veja as conversas deste ambiente. Relatórios e configurações continuam disponíveis."`), mensagens, mídias, notas fixadas e prévias de conversas na busca não aparecem, e pelo MCP as ferramentas de leitura, escrita e envio em conversas ficam bloqueadas para o parceiro.
- Nenhuma tela do workspace exibe qual parceiro está ligado nem oferece opção para desvincular; para isso, fale com o suporte.

## Excluir o workspace: quem pode e mensagens

- **Quem pode:** só o proprietário do workspace vê o cartão **Admin** (**Excluir ambiente**) e pode excluir (recusa para não proprietário: `"Você não possui privilégios suficientes para realizar essa operação"`).
- **Mensagens da janela Excluir ambiente:**
  - Campo vazio: `"Digite: {{nome}}"` (com o nome exato do workspace).
  - Nome diferente (maiúsculas, minúsculas, acentos e espaços precisam bater exatamente): `"O nome do ambiente está incorreto"`.
  - Aviso exibido na janela: `"Lembre-se de que esta operação é irreversível e resultará na exclusão completa de todos os dados associados ao espaço de trabalho."`
  - Confirmação: `"Ambiente excluído com sucesso!"` e saída da conta em 2 segundos.
- **Efeitos observados:** o workspace some da lista de workspaces de todos os membros (quem participava apenas dele vê **Nenhum ambiente ativo** ao entrar); a assinatura é cancelada, mas faturas já em aberto continuam em aberto; não há botão na tela para desfazer; excluir o workspace não exclui a conta pessoal.
- **Apagar os dados de vez:** fale com o suporte da Kinbox.

## Matriz: sintoma → causa → o que fazer

| Sintoma | Causa | O que fazer |
| --- | --- | --- |
| Item **Geral** não aparece no menu | Membro sem a permissão **Workspace** no papel | Peça ao proprietário ou a quem administra o workspace para liberar **Workspace** em **Gerenciamento do Ambiente**. |
| Cartão **Admin** (**Excluir ambiente**) não aparece | O membro não é o proprietário do workspace | Só o proprietário pode excluir; peça a ele ou solicite a transferência da propriedade. |
| Cartão **Parceria** não aparece | O workspace não é ligado a um parceiro que pode inspecioná-lo (ou está aberto em inspeção pelo parceiro) | Sem parceiro com inspeção o cartão não existe; para confirmar vínculo, fale com o suporte. |
| **Mensagem quando fora do horário comercial** não sai | Conversa sem membro responsável, sem **Horário comercial** escolhido em **Preferências**, chave não salva ou fuso diferente | Escolha o **Horário comercial**, clique em **Salvar mudanças** e confira o responsável; para conversas sem responsável, use bot com horário ou automação. |
| Mensagem fora do horário (ou de membro indisponível) sai várias vezes | A opção envia a cada mensagem do contato enquanto a condição durar | Comportamento padrão da opção; outra forma de responder fora do horário é um bot com horário ou uma automação (veja [Organizar a equipe de atendimento](/docs/atendimento/visao-geral)). |
| **Mensagem ao resolver conversa** não saiu | A sessão resolvida tinha sido reaberta (pelo tempo de tolerância ou **Reabrir**) ou foi resolvida ao transferir para outro canal | Comportamento esperado nesses dois casos; a mensagem só sai em sessões não reabertas. |
| `{{first_name}}` saiu literal na mensagem automática | Chave usada em **Mensagem quando fora do horário comercial** ou **Mensagem quando membro indisponível** | Remova as chaves; apenas **Mensagem ao resolver conversa** substitui chaves de frase rápida. |
| Cor amarela ou vermelha de conversa pendente não aparece | Campo de horas ou minutos vazio, ou opção desligada/não salva | Preencha horas e minutos (use `0` quando não quiser horas) e clique em **Salvar mudanças**. |
| Hora mostrada na tela está errada | Relógio ou fuso do computador ou celular de quem olha | Ajuste a data e a hora do aparelho; para regras (horário comercial, bot, limites), ajuste **Fuso horário** em **Geral**. |
| Ação não aparece na **Auditoria** | Foi consulta/leitura, tentativa com erro, tem mais de 30 dias, buscou criação por **ID da entidade** ou filtrou só Put ou só Patch | Consultas, erros comuns e itens com mais de 30 dias não entram; em alterações, filtre **Atualizou (Put)** e depois **Atualizou (Patch)**, e use **Entidade** ou **ID da entidade** um por vez. |
