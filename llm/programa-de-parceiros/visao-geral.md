---
title: "Parceiros: tipos de parceiro, permissões, cartões do painel, templates, inspeção, comissões e link de checkout"
description: Regras detalhadas do painel de parceiro da Kinbox para responder dúvidas de parceiros, com tipos, permissões, critérios dos cartões, convite, templates, inspeção, comissões, status e link de checkout.
keywords: [parceiro, parceria, painel de parceria, inspecionar ambiente, aplicar template, template aplicado com erros, conversas restritas pelo cliente, comissão pendente, recebido, código inválido, link de checkout, limitar ambientes, prev. de comissão, expirando]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/partner/PartnerWorkspaces/index.tsx
  - web:src/pages/partner/PartnerComissions/index.tsx
  - web:src/pages/partner/ApplyTemplate/ApplyTemplateModal.tsx
  - web:src/pages/partner/ApplyTemplate/applyTemplateService.ts
  - web:src/pages/auth/PartnerCheckout.tsx/index.tsx
  - web:src/pages/settings/roles/permissionSections.tsx
  - api:src/modules/commissions/**
  - api:src/modules/partner-templates/**
codigo:
  - web:src/pages/partner/**
  - web:src/pages/auth/PartnerCheckout.tsx/**
  - web:src/pages/admin/Workspaces/workspace.helper.tsx
  - web:src/models/partnerWorkspaces.ts
  - web:src/models/partnerCommissions.ts
  - web:src/lib/partner-conversations.ts
  - api:src/modules/commissions/**
  - api:src/modules/partner-templates/**
  - api:src/modules/mcp/tools/partner.tools.ts
verificado_em: 2026-11-26
---

Detalhes de referência da seção Programa de parceiros. Páginas para pessoas: [Painel do parceiro: visão geral](/docs/programa-de-parceiros/visao-geral), [Convidar clientes para a sua carteira](/docs/programa-de-parceiros/convidar-clientes), [Criar e aplicar templates de workspace](/docs/programa-de-parceiros/templates), [Inspecionar o workspace de um cliente](/docs/programa-de-parceiros/inspecionar-cliente), [Percentual de comissão e níveis do programa](/docs/programa-de-parceiros/niveis-do-programa-de-comissionamento) e [Pagamento das comissões](/docs/programa-de-parceiros/pagamento-das-comissoes). O lado do cliente está em [Controlar o que o parceiro vê no seu workspace](/docs/administracao/acesso-do-parceiro).

## Acesso ao painel e permissões

- **Menu lateral:** o item **Parceria** (ícone de coroa) abre a tela **Clientes**. Ele só aparece quando o workspace está cadastrado como parceiro pela Kinbox e o papel do membro tem **Pode acessar painel de parceria** (o proprietário sempre tem acesso). Não há tela no app para ativar a parceria: para entrar no programa, a empresa precisa falar com a Kinbox.
- **Menu interno:** **Clientes**, **Comissões**, **Convidar cliente**, **Evolução da carteira** e **Templates**. Não há permissão separada por item do menu interno: quem acessa o painel vê os cinco.
- **Permissões da seção Parceria** (em **Configurações** → **Ambiente** → **Permissões**, visível apenas em workspaces de parceiro):

| Permissão | Ajuda na tela / efeito | Condição para aparecer |
| --- | --- | --- |
| **Pode acessar painel de parceria** | Libera o item **Parceria** no menu lateral. | Qualquer workspace de parceiro |
| **Pode visualizar faturas** | Libera **Últimas faturas** no detalhe do cliente (**Ver**). | Qualquer workspace de parceiro |
| **Pode inspecionar clientes (Básico)** | "Pode acessar ambiente de inspeção de clientes, mas não pode ver informações de assinatura." | Apenas parceiro que pode inspecionar clientes |
| **Pode inspecionar clientes (Avançado)** | "Pode acessar ambiente de inspeção de clientes e pode ver e alterar informações de assinatura." | Apenas parceiro que pode inspecionar clientes |
| **Pode resetar senha de membros** | "Pode resetar senha de membros de clientes." | Apenas parceiro que pode inspecionar clientes |
| **Limitar ambientes que pode visualizar** | "Só pode visualizar no painel de parceria os ambientes selecionados." | Qualquer workspace de parceiro |

- **Limitar ambientes que pode visualizar:** a lista **Clientes** mostra apenas os workspaces escolhidos. Se o membro tentar abrir pelo endereço um cliente fora da lista, volta para **Clientes**. Essa restrição não se aplica ao proprietário do workspace de parceiro.

## Parceiro de indicação × parceiro que cuida dos clientes

- A Kinbox define o tipo de parceria, e esse tipo vale **por vínculo com cada cliente**.
- **Parceiro de indicação:** convida clientes e acompanha comissões. No menu **⋯** de cada cliente aparece apenas **Ver**.
- **Parceiro que cuida dos clientes:** além de **Ver**, pode ver **Inspecionar Ambiente**, **Aplicar template** e **Resetar senha** no menu **⋯** do cliente, desde que o vínculo com aquele cliente permita inspeção e o papel tenha a permissão correspondente (e, para **Resetar senha**, o cliente não tenha restringido as conversas).

## Tela Clientes, cartões, painel do cliente e exportação

- **Estado vazio:** "Parece que você ainda não adicionou nenhum cliente...". A listagem carrega até 5.000 clientes.
- **Cartões de resumo:**
  - **Expirando** (dica "Expirando ou expirado"): clientes cuja assinatura vence em até 2 dias ou venceu há até 10 dias; exibe o número em vermelho quando há algum.
  - **Assinantes:** clientes com plano pago (não teste grátis) ainda dentro da validade.
  - **Trial:** clientes em teste grátis ainda dentro da validade.
  - **Prev. de Faturamento:** soma do total da assinatura dos clientes com plano pago ativo ou vencido há poucos dias (valores em BRL, exibidos de forma abreviada quando grandes).
  - **Prev. de Comissão:** estimativa de comissão sobre esses mesmos clientes (a dica na tela explica que entram apenas clientes em plano pago ativos ou vencidos há poucos dias). É apenas estimativa; o valor oficial é o de **Comissões**.
- **Colunas da tabela:** **ID**, **Nome**, **Assinatura**, contadores de membros ("Número de Membros"), canais de WhatsApp ("Número de canais de WhatsApp") e canais de Instagram ("Número de canais de Instagram"), **Expira** (dias restantes e dica "Expira em `<data>`"), **Dia expiração**, **Dono**, **Email**, **Criado**, **Desconto**, **Total** e **Comissão**.
- **Status da coluna Assinatura:** "Sem assinatura", "Em trial", "Trial expirada", "Cancelado", "Expirado" e "Ativo".
- **Cadeado ao lado do nome:** dica "Conversas restritas pelo cliente" quando o cliente desligou **Permitir que o parceiro veja as conversas**.
- **Painel do cliente (Ver → tela Ambiente):** exibe **Plano** (membros, WhatsApp e Instagram), **Expira em** / **Expirado em**, **Dia de expiração**, **Comissão** (percentual e valor estimado), **Desconto** e **Total da assinatura**. Com **Pode visualizar faturas**, mostra **Últimas faturas** (até 3; status **Pago**, **Cancelado** ou **Não pago**; ações **Ver fatura**, **Ver Boleto**, **Copiar código do boleto** e **Baixar nota fiscal**; vazio: "Parece que ainda não foi gerada nenhuma fatura...").
- **Menu ⋯ da página Clientes:**
  - **Esconder valores** / **Mostrar valores:** troca os números por "••••" e guarda a preferência no navegador.
  - **Copiar e-mails:** copia os e-mails da lista ("E-mails copiados para clipboard.").
  - **Exportar:** opções **CSV** e **XSLX** (grafia da tela); exporta nome, membros, canais de WhatsApp, canais de Instagram, total e desconto.
- **Evolução da carteira:** dois gráficos mensais de colunas — **Novos ambientes** (clientes criados por mês) e **Comissões** (soma das comissões pelo mês de lançamento) — sem filtro de período. Quando a carteira ainda não tem nenhum cliente, a tela permanece carregando.
- **Clientes fora da lista:** só entram na lista os workspaces criados pelo convite. Não há opção no painel para vincular um workspace já existente; para isso, o parceiro precisa falar com o suporte da Kinbox.

## Convite de clientes

- Disponível para qualquer membro que acessa o painel e para os dois tipos de parceiro.
- A tela **Convidar cliente** só gera a **Url de convite** (com a opção **Template (opcional)**); nenhum e-mail é enviado pela Kinbox.
- Quem abre o link e cria a conta e o workspace entra na carteira em teste grátis de 7 dias. Quem já tem conta na Kinbox e cria um workspace novo pelo mesmo navegador depois de abrir o link também fica ligado à carteira.
- Com template no link, no primeiro acesso o cliente vê a janela **Aplicar template** uma única vez e decide se aplica ou cancela. Se cancelar, a janela não volta a aparecer; parceiros que podem inspecionar clientes conseguem aplicar o modelo depois pelo menu **Aplicar template** do cliente.
- Não é possível vincular pelo painel um workspace que já existia antes do convite (falar com o suporte da Kinbox).

## Templates de workspace

- Ao criar um template (**Novo Template** → **Criar**), a Kinbox cria um workspace modelo chamado `[TEMPLATE] <nome>`.
- A aplicação faz uma cópia única: alterações futuras no workspace modelo não atualizam clientes onde o template já foi aplicado.
- **Variáveis:** definidas com **Nome**, **Chave (placeholder)** (gerada do nome em minúsculas, sem acento e com `_`), **Descrição** e **Obrigatório**. Usadas nos textos do modelo no formato `[%=chave=%]`, substituído na aplicação pelo valor preenchido.
- **As 19 etapas (na ordem da tela):** **Grupos**, **Horário comercial**, **Campos personalizados**, **Tags**, **Frases rápidas**, **Produtos**, **Funis**, **Salas**, **Plugins**, **Atribuição automática**, **Agents** (agentes de IA), **Bots**, **Widget**, **Automações**, **Cenários**, **Segmentos**, **Dashboards**, **Permissões** e **Configurações gerais**. Um template sem etapas salvas aplica todas; ao editar, exige ao menos uma.
- **Detalhes de etapas:**
  - **Configurações gerais:** copia fuso horário, horário comercial padrão, mensagens automáticas (fora do horário, indisponibilidade e finalização), reabertura, moeda, inatividade e outras opções gerais, substituindo a configuração atual do cliente.
  - **Widget:** copia a configuração sobre o widget já existente no cliente, preservando nome, avatar e marca do cliente.
  - **Salas:** copia nome, cor, descrição e privacidade.
- **O que não é copiado:** canais, contatos, conversas, membros, assinatura e saldo.
- **Itens repetidos e estado dos recursos:** a aplicação cria os itens de novo no workspace do cliente; apenas **Grupos** com o mesmo nome não se repetem. Aplicar o mesmo template duas vezes repete tags, frases rápidas, funis, bots, automações e demais itens. Bots, agentes de IA, automações e cenários chegam no mesmo estado (ligados ou desligados) em que estavam no modelo.
- **Andamento e conclusão:** na tela **Aplicando template...**, se uma etapa falhar, exibe o erro (padrão "Erro ao aplicar") e continua as demais. Ao final mostra "Template aplicado com sucesso!" (recarrega a página ao clicar em **Concluir**) ou "Template aplicado com erros.".
- **Mensagens de erro e validação:**
  - Sem nome ao criar: "Digite o nome do template."
  - Variável sem nome ou sem chave: "Digite o nome da variável." / "Digite a chave."
  - Sem etapas marcadas: "Selecione pelo menos uma etapa."
  - Sem template escolhido na janela **Aplicar Template**: "Selecione um template."
  - Template sem workspace modelo associado: "Template inválido ou sem ambiente associado."
  - Variável obrigatória vazia na aplicação: "`<nome>` é obrigatório."
- **Excluir:** remove o template da lista **Templates**, mas não apaga o workspace modelo, que passa a ter ` [EXCLUIDO]` no fim do nome.

## Inspeção, reset de senha e MCP

- **Acesso à inspeção:** **Inspecionar Ambiente** só aparece para parceiro que cuida dos clientes (conforme o vínculo daquele cliente) com **Pode inspecionar clientes (Básico)** ou **(Avançado)**. Abre o workspace do cliente em uma nova aba; fechar a aba encerra a inspeção. Não há faixa de aviso de inspeção na tela.
- **Básico × Avançado:** no modo **Básico**, **Assinatura** some de **Configurações** e do menu da conta (abrir o endereço redireciona para **Configurações**). No modo **Avançado**, o parceiro vê e altera a **Assinatura** do cliente.
- **Conversas restritas pelo cliente:** se o cliente desligou **Permitir que o parceiro veja as conversas**, o item **Caixa de entrada** some na inspeção e abrir conversas exibe "Conversas restritas pelo cliente" / "O cliente não permite que o parceiro veja as conversas deste ambiente. Relatórios e configurações continuam disponíveis." com o botão **Ir para relatórios**. O cartão **Parceria** do cliente não aparece para o parceiro durante a inspeção.
- **Resetar senha:** aparece no menu **⋯** do cliente apenas para parceiro que cuida dos clientes, com **Pode resetar senha de membros** no papel e somente quando o cliente não restringiu as conversas. Não funciona para o proprietário ("Não é possível resetar a senha do proprietário."). Se o e-mail informado não for de um membro daquele cliente, retorna "Não foi possível encontrar o usuário". Para o membro recuperar o acesso com segurança, oriente-o a usar **Esqueceu a senha?** na tela de login (veja [Trocar a senha, recuperar o acesso e sair da conta](/docs/conta/senha-e-sessoes)).
- **MCP:** com permissão de inspecionar clientes, o parceiro pode autorizar **Acessar os ambientes clientes do parceiro** pelo [MCP](/docs/desenvolvedor/mcp). A ferramenta `list_partner_workspaces` lista os clientes da carteira com o nome e informa se as conversas estão bloqueadas. As ações feitas pelo MCP ficam na [Auditoria](/docs/administracao/auditoria) do workspace do cliente.

## Comissões e percentual

- **Período:** cada comissão tem como **Período** o mês anterior ao lançamento (por exemplo, a comissão de outubro é lançada em novembro) e reúne as faturas pagas pelos clientes naquele mês.
- **Status:** **Pendente** (amarelo; a receber), **Recebido** (verde; paga) e **Cancelado** (vermelho). Mês em que a comissão dá zero aparece como **Recebido** com valor zero.
- **Lançamento, pagamento e recibo:** a Kinbox lança a comissão, altera o status para **Recebido** ao pagar e anexa o recibo. A dica do cartão **A receber** informa: "Os recebimentos são efetuados normalmente no dia 5 de cada mês.".
- **Detalhe e exportações:** o detalhe da comissão mostra **Período**, **Valor**, **Status**, **Recibo** (**Baixar recibo** quando disponível) e **Faturas** (uma linha por cliente; ao passar o mouse: **Comissão (%)**, **Valor faturado**, **Pago em** e **Link de pagamento**). No menu **⋯** da linha: **Exportar** (faturas da comissão) e **Ver recibo** (desabilitado sem recibo). No menu **⋯** da página: **Exportar CSV** e **Exportar XLSX**.
- **Gráfico Comissões × lista Comissões:** o gráfico **Comissões** em **Evolução da carteira** agrupa pelo mês em que o registro foi criado, enquanto a lista **Comissões** mostra o **Período** (mês anterior). Por isso, os meses podem aparecer deslocados em um entre as duas telas.
- **Forma de recebimento:** não há cadastro de dados bancários no painel; para combinar ou alterar a forma de recebimento, o parceiro deve falar com a Kinbox.
- **Percentual e níveis:** o percentual de comissão é definido pela Kinbox (padrão do parceiro e, opcionalmente, percentual específico por cliente) e pode ser consultado no cartão **Comissão** do detalhe do cliente (**Clientes** → **Ver**) ou em **Comissão (%)** na seção **Faturas** do detalhe de uma comissão. Alterações no percentual valem para as próximas comissões lançadas. O painel não exibe níveis do programa; dúvidas sobre nível, regras ou revisão devem ser tratadas com a Kinbox.

## Link de checkout

- O painel de parceiro **não** gera link de pagamento hoje.
- O próprio cliente contrata ou muda o plano em **Configurações** → **Assinatura** (exige a permissão **Assinatura** ou ser o proprietário; veja [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano)), ou o parceiro com **Pode inspecionar clientes (Avançado)** altera durante a inspeção (no modo **Básico**, **Assinatura** não aparece). Se os botões de mudar plano não aparecerem no cliente, o caminho é falar com o suporte.
- Caso o cliente já tenha recebido um link de checkout (`/c/<código>`), ele vale por **7 dias**, mostra o resumo (**Membros**, **Canais de Whatsapp**, **Canais de Instagram**, total mensal, desconto ou cupom) e o rodapé "Gerado pelo parceiro `<nome>`", e aceita os métodos liberados no link (Pix, boleto ou cartão de crédito). Link vencido ou incorreto exibe "Código inválido" e volta para o app.
