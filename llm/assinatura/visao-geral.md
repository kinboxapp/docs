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
  - api-v0:server/services/WorkspacePlatformService.js
  - api:src/modules/wallet-alerts/**
verificado_em: 2026-11-26
---


Detalhes de referência da seção Assinatura. Páginas para pessoas: [Assinatura: como o plano é montado](/docs/assinatura/visao-geral), [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano), [Adicionar saldo e créditos de SMS](/docs/assinatura/adicionar-saldo), [Configurar o alerta de saldo](/docs/assinatura/alerta-de-saldo), [Faturas, boletos e nota fiscal](/docs/assinatura/faturas), [Cancelar a assinatura](/docs/assinatura/cancelar) e [Minha assinatura venceu ou o pagamento falhou](/docs/assinatura/assinatura-vencida).

## Quem pode acessar e alterar

- **Permissão:** **Assinatura** ("Contratar e alterar planos de assinatura."), na seção **Gerenciamento do Ambiente** das permissões. Sem ela, o item **Assinatura** some do menu e o endereço da página volta para **Configurações**.
- **Proprietário e papéis padrão:** o proprietário do workspace sempre tem acesso. O papel padrão **Administrador** já vem com a permissão **Assinatura**; **Supervisor** e **Atendente** não.
- **Busca global:** atalho **Ir para Assinatura**.
- **Inspeção de parceiro:** o parceiro que inspeciona um workspace só vê **Assinatura** no modo de inspeção avançado.
- **Plano gerenciado pelo parceiro:** em alguns workspaces de clientes de parceiros, o plano é gerenciado pelo parceiro: os botões **Mudar plano**, **Assinar um plano** e **Cancelar assinatura** e os valores não aparecem.

## Unidades do plano, mínimos e cobrança

- Não existem planos com nome fixo. A assinatura é montada por unidades na tela **Checkout** (teste grátis ou assinatura cancelada) ou **Alterar Plano** (assinatura **PRO**):
  - **Membros:** licenças de membro ("por membro por mês").
  - **WhatsApp:** linhas de WhatsApp ("por linha por mês"), somando WhatsApp oficial e WhatsApp por QR Code (veja [Canais: conectar e gerenciar](/docs/canais/visao-geral)).
  - **Instagram Direct:** canais de Instagram ("por canal por mês").
  - **SMS:** SMS mensais.
  - **Ligações WhatsApp:** plano opcional de minutos, com a opção **Remover plano**.
- Telegram, e-mail, widget, Facebook e canal customizado não entram na cobrança do plano.
- Na página **Assinatura**, o plano aparece como **PRO** (assinatura paga) ou **Trial** (teste grátis).
- **Periodicidade:** a contratação pela tela é mensal (**Total por mês**). Para plano anual, o caminho é falar com o comercial. Assinaturas anuais antigas aparecem com **Fatura anual**.
- **Preços:** variam e podem ter desconto por cupom. A tabela atual fica na [página de planos da Kinbox](https://www.kinbox.com.br/pricing/).
- **Mínimos:** as licenças não podem ficar abaixo do número de membros ativos, e **WhatsApp** e **Instagram Direct** não podem ficar abaixo dos canais já conectados.
- **Saldo recorrente:** o plano pode mostrar a linha "Saldo recorrente de \<valor\> por mês". Esse item não é contratado pela tela. A recarga da carteira é feita em **Adicionar saldo**.

## Teste grátis

- **Duração e recursos:** 7 dias, sem cartão de crédito, com 10 licenças de membro e 1 linha de WhatsApp.
- **Instagram:** não dá para adicionar canais de Instagram no teste grátis. Mensagem: "Você não pode adicionar canais de Instagram em plano trial".
- **Na tela:** título **Trial** com o selo "\<tempo\> restantes" ou **Expirado**; a seção **Faturas** não aparece; o botão é **Assinar um plano**. Na escolha de workspace, o workspace em teste mostra o selo **Teste grátis**.
- **Carência:** depois dos 7 dias valem os mesmos 3 dias de carência da assinatura paga. A página **Assinatura** conta o tempo até **Expira em**; a faixa no topo do app conta até **Expira em** + 3 dias. Por isso, no último dia do teste, a página pode mostrar horas restantes enquanto a faixa mostra 3 dias.

## Status, avisos e carência

- **Status do plano:** **Ativo**, **Expirado** (passou da data em **Expira em**) e **Cancelado**.
- **Aviso no topo da página Assinatura** (assinatura **PRO** não cancelada, com vencimento futuro):
  - cartão de crédito: "Sua assinatura será renovada automaticamente em \<data\>, daqui a \<tempo\>.";
  - boleto ou Pix: "Sua assinatura vence em \<data\>, daqui a \<tempo\>.".
- **Carência de 3 dias:** depois de **Expira em**, no teste grátis e na assinatura **PRO**, as restrições de assinatura vencida só começam no 4º dia depois do vencimento. Isso vale também para assinatura cancelada: o que conta é a data em **Expira em**.

### Faixas no topo do app

O botão da faixa só aparece no computador e para quem tem a permissão **Assinatura** (ou é o proprietário).

| Quando aparece | Texto | Botão |
| --- | --- | --- |
| Teste grátis, do último dia até o fim da carência | "Faltam N dias para acabar sua degustação." | **Assine agora!** |
| Assinatura **PRO** vencida, dentro da carência | "Sua assinatura expirou. Você tem mais N dias de acesso." | **Ver fatura** |
| Depois da carência (teste grátis ou **PRO**) | "Sua assinatura expirou. Por favor, selecione um plano nas configurações de assinatura." | **Ver Plano** |

A faixa da carência da assinatura **PRO** não aparece para membros com a restrição que esconde esse aviso.

### Linha do tempo depois do vencimento

| Momento | O que acontece |
| --- | --- |
| 5 dias antes de **Expira em** | A fatura da mensalidade é gerada e o e-mail "Kinbox - Fatura da assinatura" vai para os **E-mails de cobrança**. No cartão, a cobrança é automática. |
| Em **Expira em**, sem pagamento | O status passa a **Expirado** na página **Assinatura**. Começa a carência. |
| Do 1º ao 3º dia depois de **Expira em** | As restrições de assinatura vencida ainda não começam. |
| A partir do 4º dia depois de **Expira em** | O campo de mensagem some das conversas na **Caixa de entrada**. Convidar membro ou criar canal de WhatsApp ou Instagram mostra "Assinatura expirada". |
| 7 dias depois de **Expira em** | Os canais de **WhatsApp por QR Code** (**Express** e **Clássica**) são desconectados e saem da lista de canais. Vale para teste grátis e **PRO**, exceto no workspace do próprio parceiro. O WhatsApp oficial não entra nessa regra. |

- Para usar de novo um número de WhatsApp por QR Code que saiu da lista, é preciso conectá-lo outra vez (veja [Conectar o WhatsApp pelo QR Code](/docs/canais/conectar-whatsapp-app)).
- **E-mails:** não há e-mail avisando que a assinatura venceu; o aviso é a faixa no topo do app. Os e-mails que vão para os **E-mails de cobrança** são "Kinbox - Assinatura realizada com sucesso", "Kinbox - Assinatura atualizada", "Kinbox - Assinatura cancelada" e "Kinbox - Fatura da assinatura".

## Contratar, mudar de plano e forma de pagamento

- **Botões:** **Assinar um plano** aparece no teste grátis e com a assinatura cancelada. **Mudar plano** e **Cancelar assinatura** aparecem com a assinatura **PRO** não cancelada, inclusive quando o selo está **Expirado**. Em workspaces com plano gerenciado pelo parceiro, nenhum desses botões aparece.
- **Primeira assinatura (saindo do teste grátis):** o plano passa para **PRO** na hora e a primeira fatura sai com vencimento no mesmo dia. No cartão, a cobrança é feita na hora e, se o cartão for recusado, a tela mostra o erro.
- **Aumentar o plano:** a diferença proporcional aos dias que faltam até o vencimento (**pro-rata** na tela) é debitada do saldo da carteira.
  - Aviso na tela: "Para fazer upgrade de plano será necessário pagar o valor de \<valor\> de pro-rata. O valor será debitado do seu saldo."
  - Sem saldo suficiente, **Alterar Plano** abre **Adicionar Saldo** com "Necessário colocar \<valor\> no seu saldo de pro-rata para realizar a alteração de plano." e o valor já preenchido.
  - Pago o Pix, a mudança é aplicada sozinha: "Pagamento confirmado. Aplicando a alteração do plano..." e depois "Pagamento confirmado e plano atualizado". Se a mudança não puder ser aplicada: "Saldo adicionado, mas não foi possível aplicar a alteração do plano. Refaça a alteração; o saldo já está na sua carteira.".
  - O pedido de mudança ligado a essa recarga vale por até 3 horas.
- **Diminuir o plano:** não gera crédito nem devolução. O novo valor vale a partir da próxima fatura.
- **Qualquer mudança de plano:** as novas quantidades valem na hora; as mensalidades que aguardam pagamento são canceladas; se faltarem 5 dias ou menos para o vencimento, sai uma fatura nova na hora; vai o e-mail "Kinbox - Assinatura atualizada".
- **Dados de cobrança:** **Nome**, **E-mails de cobrança** (separados por vírgula), **Número de telefone**, **Tipo de pessoa** (**Pessoa física** ou **Pessoa jurídica**), **CPF** ou **CNPJ** e **Endereço** (**CEP**, **Rua**, **Número**, **Bairro**, **Estado** — com a opção **Estrangeiro** —, **Cidade** e **País**). São preenchidos no painel **Dados de cobrança**, dentro da contratação.
- **Trocar a forma de pagamento ou o cartão:** não há uma tela só para isso.
  - Cartão recusado: se a opção **Tentar pagar novamente** aparecer na fatura, dá para escolher outro cartão; aprovado, ele passa a ser o cartão das próximas cobranças.
  - Nos outros casos (trocar de boleto para cartão, trocar o cartão sem falha, mudar os dados de cobrança), o caminho é falar com o suporte.

## Mensagens de erro

| Mensagem | Quando aparece |
| --- | --- |
| "Assinatura expirada" | Convidar membro ou criar canal de WhatsApp ou Instagram a partir do 4º dia depois de **Expira em**. |
| "Número limite de operadores atingido" | Convidar membro quando todas as licenças estão em uso, ou contratar menos licenças que os membros ativos. A mensagem diz "operadores", mas se refere às licenças de membro. |
| "Você precisa remover canais de Whatsapp para prosseguir com a contratação" | Criar canal de WhatsApp acima das linhas do plano, ou contratar menos linhas que os canais conectados. |
| "Você precisa remover canais de Instagram para prosseguir com a contratação" | O mesmo, para Instagram. |
| "Você não pode adicionar canais de Instagram em plano trial" | Conectar Instagram no teste grátis. |
| "O cupom de desconto não pode mais ser reutilizado" | Qualquer código de cupom que não vale no momento, inclusive digitado errado, expirado ou esgotado. |
| "Dados de cobrança são obrigatórios" | Contratar sem dados de cobrança. |
| "Obrigatório", "E-mail inválido: \<e-mail\>", "CEP não encontrado" | Campos do painel **Dados de cobrança**. |
| Cartão recusado por ter sido cadastrado em outro sistema de pagamento | A mensagem pede para cadastrar o cartão de novo. |
| Muitas tentativas seguidas | Muitas tentativas seguidas de contratar são recusadas por alguns minutos. |

## Faturas

- **Onde:** a seção **Faturas** da página **Assinatura** mostra as 3 mensalidades mais recentes. **Ver tudo** abre a lista completa, com as abas **Tudo**, **Pago** e **Não pago** e a busca por ID. Não aparece no teste grátis. Recargas de saldo ficam no **Histórico de recargas**; compras de SMS, no **Histórico SMS**.
- **Status:** **Pago**, **Não pago**, **Falha ao pagar** e **Cancelado**. Enquanto a assinatura está cancelada, toda fatura não paga aparece como **Cancelado**.
- **Erro do cartão:** clicar em **Falha ao pagar** abre a janela com "Erro retornado ao gerar a cobrança:" e o motivo, ou "Não foi possível identificar a mensagem de erro desta cobrança.".
- **Abrir a fatura:** **Ver** aparece ao passar o mouse na linha da fatura, na página **Assinatura**; na lista de **Faturas**, basta clicar na linha. A fatura abre numa aba nova e pode ser vista ou impressa, inclusive quando ainda não foi paga (o campo **Valor pago** mostra um traço). Use como comprovante de pagamento só quando constar como **Pago**.
- **Menu ...:** só aparece quando a fatura tem boleto, Pix, nota fiscal ou a opção de nova tentativa. Opções possíveis: **Ver fatura**, **Ver Boleto** (abre o boleto; quando o boleto ainda não foi gerado, a opção é **Visualizar boleto**), **Copiar código do boleto**, **Ver QR code**, **Baixar nota fiscal** e **Tentar pagar novamente**. Fatura paga no cartão e sem nota fiscal não tem esse menu, só **Ver**.
- **Nota fiscal:** a opção **Baixar nota fiscal** aparece na fatura quando o PDF estiver disponível. Quando não aparecer, fale com o suporte para pedir a nota fiscal.
- **Geração:** a mensalidade é gerada 5 dias antes de **Expira em**, para assinatura **PRO** não cancelada. Paga a fatura, **Expira em** avança um mês a partir do vencimento anterior, não da data do pagamento.
- **Vencimento do Pix da mensalidade:** 6 dias depois do vencimento da assinatura. As restrições de assinatura vencida começam no 4º dia depois do vencimento, então pagar o Pix perto da data de vencimento dele pode deixar o workspace alguns dias sem responder conversas.
- **Gerar boleto agora** / **Pagar agora:** aparecem na seção **Faturas** só quando a assinatura **PRO** não está cancelada, é no boleto ou no Pix, a data em **Expira em** está entre 4 dias atrás e 1 mês à frente, e não há fatura desse período paga ou aguardando pagamento. Respostas possíveis: "Geração antecipada disponível apenas para assinaturas ativas", "Geração antecipada disponível apenas para boleto e Pix", "Já existe uma fatura em aberto ou paga para este período". Se o botão não aparecer e a fatura não estiver na lista, o caminho é falar com o suporte.
- **Tentar pagar novamente** / **Pagar novamente:**
  - A Kinbox não cobra de novo sozinha um cartão recusado.
  - A opção só aparece quando a mensalidade mais recente está com **Falha ao pagar**, é do período atual e a assinatura **PRO** não cancelada está no cartão. Se não aparecer, o caminho é falar com o suporte.
  - Na janela, o cartão atual não pode ser excluído. Aprovado, o cartão escolhido passa a ser o das próximas cobranças.
  - Ao enviar: "Pagamento enviado. A confirmação pode levar alguns instantes.". A fatura recusada continua na lista como **Falha ao pagar** e a nova entra na lista.
  - Até 5 tentativas a cada 5 minutos por workspace. Mensagens: "Não foi possível tentar o pagamento. Tente novamente em alguns minutos.", "Não foi possível processar o pagamento com o cartão informado", "Muitas tentativas de pagamento, tente novamente em alguns minutos".

## Carteira: saldo e créditos de SMS

- **Dois saldos separados:** **Saldo disponível** (reais) e **Créditos de SMS** são comprados à parte, os dois só por Pix. O saldo da carteira não compra créditos de SMS.
- **Recarga de saldo:** **Valor a adicionar** começa preenchido com R$ 500,00 e aceita a partir de R$ 5,00. Na janela **Pagar com Pix**, a tela confere o pagamento a cada 10 segundos enquanto está aberta; ao confirmar: "Pagamento confirmado. Crédito adicionado.".
- **Histórico de recargas:** status **Pago** e **Aguardando pagamento**; o botão da linha reabre o QR Code; **...** → **Exportar** (CSV ou XLSX); **Ver relatório de uso** para quem tem permissão de relatórios.
- **Extrato do saldo:** créditos e débitos com os filtros **Criado entre** e **Tipo** (**Crédito** ou **Débito**). O atalho **Comprar créditos** do copiloto, quando aparece **Seus créditos acabaram**, abre esse extrato. Para recarregar, use **Adicionar saldo** em **Configurações** → **Assinatura**.
- **Créditos de SMS:** pacotes de 1 mil a 1 milhão de créditos. Depois do Pix pago, a compra aparece como **Pago, aguardando liberação** no **Histórico SMS** até os créditos entrarem, o que pode levar até 1 dia útil. Para liberação imediata ou problema, fale com o suporte. Status: **Pago**, **Pago, aguardando liberação**, **Aguardando pagamento**. Mensagens: "O valor mínimo da compra é R$ 5,00" e "Compra de novas SMS's está desabilitada no momento".
- Cada workspace tem a própria carteira.

## Alerta de saldo baixo

- **Onde fica:** no topo do **Histórico de recargas** (clique em **Saldo disponível**), botão **Configurar alerta de saldo** ou **Alerta de saldo: \<valor\>**.
- **Valores:** R$ 10,00 por padrão quando nunca foi configurado; 0 desativa. Com consumo muito baixo, a previsão de duração pode ser de milhares de dias.
- **Permissão:** salvar exige a permissão **Assinatura** ou ser o proprietário. Sem ela: "Você não tem permissão para gerenciar o financeiro".
- **Frequência:** a Kinbox verifica o saldo a cada 30 minutos.
- **Quando avisa:** o saldo está abaixo do limite **e**, no consumo médio diário dos últimos 14 dias, acaba em até 30 dias. Workspace sem consumo nos últimos 14 dias não recebe aviso, mesmo abaixo do limite.
- **Um aviso por vez:** depois de avisar, só avisa de novo quando o saldo volta a ficar igual ou acima do limite (recarga) e cai outra vez. Mudar o limite não reenvia um aviso já enviado.
- **Quem recebe e como:** o proprietário e os membros ativos com a permissão **Assinatura**, por notificação no app (título "Saldo baixo", abre **Assinatura**) e por e-mail no e-mail de login de cada um (não nos **E-mails de cobrança**), com o assunto "Saldo baixo no ambiente \<nome\>".
- **Texto do aviso:** "Seu saldo está abaixo de \<limite\> (saldo atual: \<saldo\>)." e, quando há previsão, "No seu consumo médio diário, ele dura cerca de N dias.".
- **Franquia de ligações:** o mesmo aviso (notificação e e-mail) sai quando a franquia do plano de ligações chega a 80% e a 100%.

## Cancelamento

- **Botão:** **Cancelar assinatura** aparece com a assinatura **PRO** não cancelada (inclusive com o selo **Expirado**), para quem tem a permissão **Assinatura** ou é o proprietário, exceto quando o plano é gerenciado pelo parceiro.
- **Confirmação:** janela **Cancelar plano** ("Tem certeza que deseja cancelar seu plano atual?") e depois "Plano cancelado com sucesso.".
- **Efeitos:**
  - o status passa a **Cancelado**, e a data em **Expira em** não muda;
  - as mensalidades que aguardam pagamento são canceladas, e enquanto a assinatura está cancelada toda fatura não paga aparece como **Cancelado**;
  - não sai mais fatura de mensalidade nem cobrança no cartão;
  - vai o e-mail "Kinbox - Assinatura cancelada" para os **E-mails de cobrança**.
- **Acesso:** a página mostra "Sua assinatura foi cancelada. Atualize seu plano para voltar a usar o sistema.". O acesso continua até **Expira em** + 3 dias de carência, mesmo com a assinatura cancelada. Depois, valem as restrições da linha do tempo acima, inclusive a saída dos canais de WhatsApp por QR Code 7 dias depois de **Expira em**.
- **Dados e carteira:** cancelar não exclui o workspace nem os dados, e não muda o saldo da carteira nem os créditos de SMS.
- **Voltar a assinar:** com a assinatura cancelada, a página mostra **Assinar um plano**.
