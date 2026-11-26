---
title: "Assinatura: unidades, teste grátis, carência de 3 dias, faixas de aviso e erros de plano"
description: Regras detalhadas da assinatura da Kinbox para responder dúvidas de cobrança, com teste grátis, mudança de plano, faturas, carteira, alerta de saldo, vencimento, bloqueio e mensagens de erro.
keywords: [assinatura expirada, número limite de operadores atingido, você precisa remover canais, cupom, pro-rata, falha ao pagar, tentar pagar novamente, alerta de saldo, créditos de sms, carência, bloqueio, canais excluídos]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/billing/BillingV2.tsx
  - web:src/pages/settings/billing/v2/Checkout.tsx
  - web:src/pages/settings/billing/v2/CheckoutModal.tsx
  - web:src/hooks/useInit.tsx
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/controllers/TransactionOrderController.js
  - api:src/modules/wallet-alerts/wallet-alerts.service.ts
codigo:
  - web:src/pages/settings/billing/**
  - web:src/hooks/useInit.tsx
  - web:src/stores/sessionStore.jsx
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/controllers/TransactionOrderController.js
  - api-v0:server/routes/NewPaymentRoutes.js
  - api-v0:server/modules/scheduler/NewPaymentScheduler.js
  - api-v0:server/modules/scheduler/deleteChannelsScheduler.js
  - api:src/modules/wallet-alerts/**
verificado_em: 2026-11-26
---

Detalhes de referência das páginas humanas da seção Assinatura ([Assinatura: como o plano é montado](/docs/assinatura/visao-geral), [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano), [Adicionar saldo e créditos de SMS](/docs/assinatura/adicionar-saldo), [Configurar o alerta de saldo](/docs/assinatura/alerta-de-saldo), [Faturas, boletos e nota fiscal](/docs/assinatura/faturas), [Cancelar a assinatura](/docs/assinatura/cancelar) e [Minha assinatura venceu ou o pagamento falhou](/docs/assinatura/assinatura-vencida)).

## Quem pode acessar e alterar

- **Permissão:** **Assinatura** ("Contratar e alterar planos de assinatura."), na seção **Gerenciamento do Ambiente**. Sem ela, o item **Assinatura** some do menu e abrir a rota redireciona para **Configurações**.
- **Proprietário e papéis padrão:** o proprietário do workspace sempre tem acesso. O papel padrão **Administrador** já vem com a permissão **Assinatura**; **Supervisor** e **Atendente** não.
- **Busca global:** atalho **Ir para Assinatura**.
- **Inspeção de parceiro:** parceiro inspecionando um workspace só vê **Assinatura** no modo de inspeção avançado.
- **Workspaces de parceiro com plano bloqueado:** em alguns workspaces de parceiros, a mudança de plano é feita pelo parceiro e os botões **Mudar plano** / **Assinar um plano** e os valores não aparecem.

## Unidades do plano, mínimos e cobrança

- Não existem planos com nome fixo. A assinatura é montada por unidades na tela **Checkout** / **Alterar Plano**:
  - **Membros:** licenças de membro ("por membro por mês").
  - **WhatsApp:** linhas de WhatsApp ("por linha por mês"), somando WhatsApp oficial e WhatsApp por QR Code (veja [Canais: conectar e gerenciar](/docs/canais/visao-geral)).
  - **Instagram Direct:** canais de Instagram ("por canal por mês").
  - **SMS:** créditos de SMS mensais.
  - **Ligações WhatsApp:** plano opcional de minutos, com botão **Remover plano**.
- Outros canais (Telegram, e-mail, widget, Facebook, canal customizado) não entram na cobrança do plano.
- Na página **Assinatura**, o plano aparece como **PRO** (assinatura paga) ou **Trial** (teste grátis).
- **Periodicidade:** a contratação pela tela é **mensal** (**Total por mês**). Para plano anual, orientar falar com o comercial. Assinaturas antigas anuais podem aparecer na tela como **Fatura anual**.
- **Preços:** não informar valores fixos; os preços vêm do servidor e podem variar ou ter cupom. Sempre direcionar para `https://www.kinbox.com.br/pricing/`.
- **Mínimos ao contratar ou reduzir:** licenças de membro não podem ficar abaixo do total de membros ativos; **WhatsApp** e **Instagram Direct** não podem ficar abaixo dos canais já conectados.
- **Saldo recorrente:** alguns planos podem exibir "Saldo recorrente de \<valor\> por mês", mas não há cartão para contratá-lo no checkout e hoje esse valor não é creditado automaticamente na carteira todo mês; não prometer recarga mensal automática.

## Teste grátis

- **Duração e recursos:** **7 dias** corridos, sem cartão de crédito, com **10 licenças** de membro e **1 linha de WhatsApp**.
- **Restrição de Instagram:** não permite adicionar canais de Instagram — erro `"Você não pode adicionar canais de Instagram em plano trial"`.
- **Visual na tela:** título **Trial** com selo `"<tempo> restantes"` ou **Expirado**; seção **Faturas** oculta; botão **Assinar um plano**. Na tela de escolha de workspace, exibe o selo **Teste grátis**.
- **Carência e contagem:** após os 7 dias, vale a mesma **carência de 3 dias** da assinatura paga. A página **Assinatura** conta até **Expira em**, enquanto a faixa no topo conta até **Expira em** + 3 dias (por isso, no 7º dia a página pode mostrar horas restantes enquanto a faixa mostra 3 dias).

## Status, avisos, carência e linha do tempo de bloqueio

- **Status do cartão do plano:** **Ativo**, **Expirado** (passou da data em **Expira em**) e **Cancelado**.
- **Aviso no topo da página Assinatura (PRO ativa com vencimento futuro):**
  - Cartão de crédito: `"Sua assinatura será renovada automaticamente em <data>, daqui a <tempo>."`
  - Boleto ou Pix: `"Sua assinatura vence em <data>, daqui a <tempo>."`
- **Carência de 3 dias:** depois de **Expira em** (tanto no teste grátis quanto no PRO), o navegador e o servidor só bloqueiam após 3 dias.

### Faixas no topo do app

O botão da faixa só aparece fora do celular e para quem tem a permissão **Assinatura**.

| Quando aparece | Texto exato | Botão |
| --- | --- | --- |
| Teste grátis, do último dia até o fim da carência | `"Faltam N dias para acabar sua degustação."` | **Assine agora!** |
| PRO vencida, dentro da carência | `"Sua assinatura expirou. Você tem mais N dias de acesso."` | **Ver fatura** |
| Depois da carência (teste grátis ou PRO) | `"Sua assinatura expirou. Por favor, selecione um plano nas configurações de assinatura."` | **Ver Plano** |

A faixa de carência de assinatura PRO fica oculta para membros que têm a restrição que esconde a faixa da carência.

### Linha do tempo após o vencimento

| Momento | Comportamento |
| --- | --- |
| 5 dias antes de **Expira em** | Fatura gerada automaticamente; e-mail `"Kinbox - Fatura da assinatura"` para os **E-mails de cobrança**; cobrança automática no cartão. |
| Em **Expira em** sem pagamento | Status muda para **Expirado** na página **Assinatura**; começa a carência. |
| Até 3 dias depois de **Expira em** | Carência: uso normal do workspace. |
| Depois de 3 dias de **Expira em** | Campo de mensagem some da **Caixa de entrada**; convidar membro ou adicionar canal de WhatsApp/Instagram falha com `"Assinatura expirada"`. |
| **7 dias depois de Expira em** | Canais de **WhatsApp por QR Code** (**Express** e **Clássica**) de workspaces que não são de parceiro são desconectados e desativados/excluídos da lista (vale para teste grátis e PRO). O WhatsApp oficial não entra nessa rotina. |

- Para voltar a usar um número excluído após regularizar a assinatura, é preciso conectar o canal novamente (veja [Conectar o WhatsApp pelo QR Code](/docs/canais/conectar-whatsapp-app)). Não afirmar se as conversas antigas voltam ou não nesse caso.
- Não afirmar o que continua funcionando ou para em bots, agentes de IA, campanhas ou recebimento de mensagens quando a assinatura está vencida.
- **E-mails enviados:** não existe e-mail automático avisando que a assinatura venceu. Os e-mails enviados para os **E-mails de cobrança** são: `"Kinbox - Assinatura realizada com sucesso"`, `"Kinbox - Assinatura atualizada"`, `"Kinbox - Assinatura cancelada"` e `"Kinbox - Fatura da assinatura"`.

## Contratar, mudar de plano e forma de pagamento

- **Primeira assinatura (saindo do teste grátis):** muda para **PRO** na hora e gera a primeira fatura com vencimento no mesmo dia. No cartão, a cobrança ocorre na hora e exibe erro se for recusada.
- **Aumentar o plano (upgrade):** a diferença proporcional aos dias que faltam até o vencimento (**pro-rata**) é debitada do saldo da carteira.
  - Aviso na tela: `"Para fazer upgrade de plano será necessário pagar o valor de <valor> de pro-rata. O valor será debitado do seu saldo."`
  - Sem saldo suficiente, clicar em **Alterar Plano** abre **Adicionar Saldo** com `"Necessário colocar <valor> no seu saldo de pro-rata para realizar a alteração de plano."` e o valor mínimo já preenchido.
  - Pago o Pix, a tela aplica a mudança sozinha (`"Pagamento confirmado. Aplicando a alteração do plano..."` → `"Pagamento confirmado e plano atualizado"`). Se não conseguir aplicar, exibe `"Saldo adicionado, mas não foi possível aplicar a alteração do plano. Refaça a alteração; o saldo já está na sua carteira."`.
  - A intenção de mudança pendente vinculada ao Pix de recarga vale por até **3 horas**.
- **Diminuir o plano (downgrade):** não gera crédito nem devolução; o novo valor entra na próxima fatura mensal.
- **Efeitos de qualquer mudança:** novas quantidades valem na hora; faturas em aberto do período são canceladas; se faltarem 5 dias ou menos para o vencimento, uma nova fatura é gerada na hora; envia o e-mail `"Kinbox - Assinatura atualizada"`.
- **Dados de cobrança:** **Nome**, **E-mails de cobrança** (separados por vírgula), **Número de telefone**, **Tipo de pessoa** (**Pessoa física** / **Pessoa jurídica**), **CPF** ou **CNPJ**, e **Endereço** (**CEP**, **Rua**, **Número**, **Bairro**, **Estado** — com opção **Estrangeiro** —, **Cidade**, **País**). Só são editáveis no fluxo de checkout.
- **Trocar forma de pagamento ou cartão:** não existe tela própria só para trocar a forma de pagamento ou os dados de cobrança sem alterar o plano.
  - Se uma fatura no cartão foi recusada, orientar **Tentar pagar novamente** escolhendo outro cartão (aprovado, passa a ser o cartão das próximas cobranças).
  - Para trocar a forma de pagamento ou o cartão fora de uma falha de cobrança, orientar falar com o suporte. Não recomendar refazer **Mudar plano** com as mesmas quantidades porque isso cancela a fatura em aberto do período.

## Mensagens de erro exatas

| Mensagem | Quando ocorre |
| --- | --- |
| `"Assinatura expirada"` | Convidar membro ou criar canal de WhatsApp/Instagram depois da carência de 3 dias. |
| `"Número limite de operadores atingido"` | Adicionar membro acima das licenças contratadas ou reduzir licenças abaixo dos membros ativos (o servidor usa "operadores" no erro, embora a tela use "licenças de membro"). |
| `"Você precisa remover canais de Whatsapp para prosseguir com a contratação"` | Tentar contratar/reduzir abaixo dos canais de WhatsApp conectados ou adicionar canal acima do plano. |
| `"Você precisa remover canais de Instagram para prosseguir com a contratação"` | Tentar contratar/reduzir abaixo dos canais de Instagram conectados ou adicionar canal acima do plano. |
| `"Você não pode adicionar canais de Instagram em plano trial"` | Tentar conectar Instagram durante o teste grátis. |
| `"O cupom de desconto não pode mais ser reutilizado"` | Qualquer código de cupom que não vale no momento (inclusive código inválido ou expirado). Cupom esgotado também cai nessa mesma mensagem. |
| `"Dados de cobrança são obrigatórios"` | Tentativa de contratar sem dados de cobrança cadastrados. |
| `"Obrigatório"`, `"E-mail inválido: <email>"`, `"CEP não encontrado"` | Validação dos campos de **Dados de cobrança**. |
| Cartão cadastrado antes de uma mudança do sistema de pagamento | O servidor recusa o cartão antigo e pede para cadastrá-lo novamente (nunca citar nome de gateway). |
| Limite de tentativas de contratar | O servidor aceita no máximo **5 tentativas a cada 5 minutos** por IP (retorna erro de limite de requisições). |

## Faturas, segunda via, nota fiscal e nova tentativa no cartão

- **Escopo:** a seção **Faturas** lista apenas faturas de mensalidade (as 3 mais recentes na página **Assinatura**; lista completa em **Ver tudo** com abas **Tudo**, **Pago**, **Não pago** e busca por ID). Não aparece no teste grátis.
- **Status:** **Pago**, **Não pago**, **Falha ao pagar** e **Cancelado**. Quando a assinatura está cancelada, toda fatura não paga aparece como **Cancelado**.
- **Detalhe da falha:** clicar em **Falha ao pagar** abre a janela com `"Erro retornado ao gerar a cobrança:"` e o motivo, ou `"Não foi possível identificar a mensagem de erro desta cobrança."`.
- **Ações do menu `...`:** **Ver fatura** (comprovante imprimível em nova aba), **Ver Boleto**, **Visualizar boleto**, **Copiar código do boleto**, **Ver QR code**, **Baixar nota fiscal**, **Tentar pagar novamente**.
- **Geração e vencimento:** gerada automaticamente **5 dias** antes de **Expira em** para assinaturas **PRO** ativas. Ao pagar, **Expira em** avança 1 mês contado do vencimento anterior (não da data do pagamento).
- **Vencimento do Pix da mensalidade:** a fatura recorrente no Pix vence **6 dias depois** do vencimento da assinatura. Como os bloqueios começam **3 dias depois** do vencimento, quem paga perto da data de vencimento do Pix fica até 3 dias sem conseguir responder conversas.
- **Geração antecipada (**Gerar boleto agora** / **Pagar agora**):** disponível apenas para assinatura ativa, boleto ou Pix, e período atual. Mensagens de recusa do servidor:
  - `"Geração antecipada disponível apenas para assinaturas ativas"`
  - `"Geração antecipada disponível apenas para boleto e Pix"`
  - `"Já existe uma fatura em aberto ou paga para este período"`
- **Nova tentativa no cartão (**Tentar pagar novamente** / **Pagar novamente**):**
  - A Kinbox não tenta cobrar de novo automaticamente um cartão que falhou.
  - Só aparece quando a fatura é de mensalidade, está com **Falha ao pagar**, é a mais recente, pertence ao período atual e a assinatura **PRO** está ativa no cartão.
  - O cartão atual não pode ser excluído dentro dessa janela. Aprovado, o cartão escolhido vira o cartão das próximas cobranças.
  - Ao enviar: `"Pagamento enviado. A confirmação pode levar alguns instantes."`. A fatura antiga permanece como **Falha ao pagar** no histórico e uma nova fatura entra na lista.
  - Limite: **5 tentativas a cada 5 minutos** por workspace.
  - Mensagens de erro: `"Não foi possível tentar o pagamento. Tente novamente em alguns minutos."`, `"Não foi possível processar o pagamento com o cartão informado"`, `"Muitas tentativas de pagamento, tente novamente em alguns minutos"`.
- **Nota fiscal:** a emissão automática está desligada no sistema. **Baixar nota fiscal** só aparece quando o PDF já existe na fatura. Se não aparecer, orientar falar com o suporte para pedir a nota fiscal (sem prometer prazo nem emissão automática).

## Carteira: saldo em reais e créditos de SMS

- **Dois saldos separados:** **Saldo disponível** (reais) e **Créditos de SMS** são comprados à parte, ambos **apenas por Pix**. O saldo da carteira não compra créditos de SMS pela tela (mesmo que o texto de ajuda do **Histórico de recargas** diga o contrário — não repetir essa frase).
- **Recarga de saldo:** mínimo de **R$ 5** na tela em **Valor a adicionar**. Na janela **Pagar com Pix**, a tela verifica o pagamento a cada **10 segundos** enquanto aberta; ao confirmar, exibe `"Pagamento confirmado. Crédito adicionado."`.
- **Histórico de recargas:** status **Pago** e **Aguardando pagamento**; permite reabrir o QR Code na linha; exportação em CSV/XLSX no menu **...** → **Exportar**; botão **Ver relatório de uso** (só com permissão de relatórios).
- **Extrato do saldo:** página de créditos e débitos com filtros **Criado entre** e **Tipo** (**Crédito**/**Débito**). No layout atual, o atalho **Comprar créditos** do copiloto (quando mostra **Seus créditos acabaram**) abre esse extrato, onde não há botão de adicionar saldo.
- **Créditos de SMS:** pacotes de 1 mil a 1 milhão (sem citar preços). Depois do Pix pago, o pedido fica em `"Aguardando aprovação"` no servidor (**Pago, aguardando liberação** no **Histórico SMS**) até a transferência dos créditos, o que pode levar até **1 dia útil** (para liberação imediata ou problema, orientar falar com o suporte).
  - Status no **Histórico SMS:** **Pago**, **Pago, aguardando liberação**, **Aguardando pagamento**.
  - Mensagens de erro: `"O valor mínimo da compra é R$ 5,00"` e `"Compra de novas SMS's está desabilitada no momento"`.
- Cada workspace tem a própria carteira. Não afirmar validade/expiração do saldo nem reembolso ao cancelar.

## Alerta de saldo baixo

- **Onde fica:** topo do **Histórico de recargas** (não existe botão na página **Assinatura**).
- **Valores:** padrão de **R$ 10** quando nunca foi configurado; `0` desativa.
- **Permissão:** salvar exige a permissão **Assinatura** ou ser o proprietário (erro na API: `"Você não tem permissão para gerenciar o financeiro"`).
- **Frequência de checagem:** roda a cada **30 minutos** (minutos 15 e 45 de cada hora).
- **Condição dupla para avisar:** o saldo precisa estar **abaixo** do limite configurado **e**, no consumo médio diário dos últimos **14 dias** (gastos da carteira do próprio workspace), o saldo precisa acabar em até **30 dias**. Workspace sem consumo nos últimos 14 dias não recebe aviso, mesmo abaixo do limite.
- **Um aviso por vez:** depois de disparar, só avisa de novo quando o saldo voltar a ficar igual ou acima do limite (após recarga) e cair novamente. Alterar o limite não reenvia um aviso já disparado.
- **Quem recebe e como:** proprietário do workspace e membros ativos com a permissão **Assinatura**, por notificação no app (título `"Saldo baixo"`, abre **Assinatura**) e por e-mail enviado ao e-mail de login de cada membro (não aos **E-mails de cobrança**), com assunto `"Saldo baixo no ambiente <nome>"`.
- **Texto do aviso:** `"Seu saldo está abaixo de <limite> (saldo atual: <saldo>)."` + `"No seu consumo médio diário, ele dura cerca de N dias."` quando há previsão.
- **Franquia de ligações:** o mesmo canal (notificação e e-mail) avisa quando a franquia do plano de ligações atinge 80% e 100%.

## Cancelamento

- **Quando o botão aparece:** apenas para assinatura **PRO** ativa, para quem tem a permissão **Assinatura** (ou é o proprietário) e quando a alteração de plano não está bloqueada por parceiro.
- **Confirmação:** janela **Cancelar plano** (`"Tem certeza que deseja cancelar seu plano atual?"`) → `"Plano cancelado com sucesso."`.
- **Efeitos no servidor:**
  - Status muda para **Cancelado** sem alterar a data em **Expira em**.
  - Faturas em aberto são canceladas (na tela, toda fatura não paga passa a aparecer como **Cancelado**).
  - Nenhuma nova fatura mensal nem cobrança no cartão é gerada.
  - E-mail `"Kinbox - Assinatura cancelada"` enviado para os **E-mails de cobrança**.
- **Acesso após cancelar:** a página **Assinatura** exibe `"Sua assinatura foi cancelada. Atualize seu plano para voltar a usar o sistema."`, mas tanto o navegador quanto o servidor conferem apenas a data de **Expira em** + **3 dias** de carência (não olham o status cancelado). Depois desse prazo, valem os bloqueios de vencimento, inclusive a exclusão dos canais de WhatsApp por QR Code 7 dias depois do vencimento.
- **Dados e carteira:** cancelar não exclui o workspace nem apaga os dados, e o fluxo de cancelamento não altera saldo da carteira nem créditos de SMS (não prometer reembolso nem perda).
- **Reativar:** com o plano cancelado, o botão **Assinar um plano** fica disponível na página **Assinatura**.
