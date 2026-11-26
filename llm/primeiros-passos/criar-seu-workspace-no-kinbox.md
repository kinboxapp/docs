---
title: "Cadastro: código de confirmação, login com Google e teste grátis"
description: Regras do cadastro na Kinbox (código de 6 dígitos, reenvio e tentativas, cadastro com Google, quem já tem conta) e o que o teste grátis de 7 dias inclui, avisa e bloqueia.
keywords: [cadastro, código de confirmação, código expirou, reenviar código, muitas tentativas, já tenho conta, google, teste grátis, trial, degustação, licenças no teste, whatsapp no teste, instagram no teste, campanhas no teste, assinatura expirou, estender teste]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/auth/register/Register.tsx
  - api:src/modules/operators/signup/
  - api-v0:server/controllers/OperatorController.js
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/config/constants.js
  - web:src/hooks/useInit.tsx
  - web:src/stores/sessionStore.jsx
codigo:
  - web:src/pages/auth/register/**
  - api:src/modules/operators/signup/**
  - api-v0:server/controllers/OperatorController.js
  - api-v0:server/controllers/NewPaymentController.js
  - api-v0:server/modules/accessRestriction/**
  - api-v0:server/config/constants.js
  - web:src/stores/sessionStore.jsx
verificado_em: 2026-11-26
---

Referência complementar a [Criar sua conta e o workspace](/docs/primeiros-passos/criar-seu-workspace-no-kinbox). Na tela da Kinbox, o workspace aparece como **ambiente**.

## Código de confirmação

| Regra | Valor |
| --- | --- |
| Formato | 6 dígitos numéricos (confirma ao completar os 6 dígitos ou em **Continuar**) |
| Remetente e assunto | "Kinbox", assunto "Seu código de confirmação do Kinbox: {código}" |
| Validade do código | 10 minutos |
| Espera para pedir novo código | 60 segundos ("Reenviar código em Ns") |
| Limite de envios | Até 5 códigos por hora para o mesmo e-mail |
| Limite de tentativas erradas | 5 tentativas por código |
| Ao gerar código novo | O código anterior é anulado |
| Validade após confirmar o e-mail | 30 minutos para concluir o restante do cadastro |

Mensagens exibidas na etapa do código:

- Código errado: "Código incorreto."
- 5 tentativas erradas: "Muitas tentativas erradas. Peça um novo código."
- Código vencido ou substituído: "Este código não vale mais. Peça um novo."
- Reenvio antes de 60 segundos: "Aguarde um instante para pedir um novo código."
- Limite de 5 envios por hora: "Muitos códigos enviados para este e-mail. Tente de novo mais tarde."
- Reenvio concluído: "Enviamos um novo código."
- Mais de 30 minutos após confirmar o e-mail: "A confirmação do e-mail expirou. Confirme o e-mail de novo." (volta ao passo do e-mail).

## Quem já tem conta

- Quem já tem conta na Kinbox não precisa de um cadastro novo para ter outro workspace: entra pela tela de entrada (e-mail e senha ou **Continuar com o Google**) e usa **Criar novo ambiente** ("Para outra empresa ou operação"). Veja [Trocar de workspace ou criar outro](/docs/conta/trocar-de-workspace).
- Se a conta tiver [verificação em duas etapas](/docs/conta/verificacao-em-duas-etapas) ativa, a Kinbox pede o código do aplicativo ao entrar.
- Senha esquecida: **Esqueceu a senha?** na tela de entrada. Veja [Trocar a senha, recuperar o acesso e sair da conta](/docs/conta/senha-e-sessoes).

## Cadastro e login com o Google

- **Continuar com o Google** pula o código por e-mail e a criação de senha: pede apenas **Nome completo** (pré-preenchido com o nome da conta Google), **Celular** e **Nome da empresa**.
- A exibição do botão **Continuar com o Google** depende de configuração; se não aparecer, faça o cadastro com e-mail.
- Contas criadas com o Google não têm uma senha definida pelo titular. Para entrar depois usando e-mail e senha, use **Esqueceu a senha?** na tela de entrada — veja [Trocar a senha, recuperar o acesso e sair da conta](/docs/conta/senha-e-sessoes).
- Clicar em **Continuar com o Google** na tela de entrada sem ter conta cadastrada exibe "Você ainda não tem uma conta. Complete seu registro." e leva para o cadastro.

## Teste grátis

Todo workspace novo começa no teste grátis de **7 dias** (até o fim do 7º dia), sem cartão de crédito.

| Recurso | Limite no teste grátis |
| --- | --- |
| Licenças de membro | Até 10 (contando o proprietário). Acima disso: "Seu plano atual não permite ativar ou adicionar agentes." |
| WhatsApp (oficial e QR Code somados) | 1 canal ativo |
| Instagram | Não pode ser conectado ("Você não pode adicionar canais de Instagram em plano trial") |
| Facebook | 1 página |
| Telegram | 1 canal |
| E-mail | 3 canais |
| Widget (chat no site) | Sem limite de quantidade |
| Campanhas | Bloqueadas durante o teste grátis |
| Saldo na carteira | Saldo inicial de cortesia para testar a IA — veja [Saldo da carteira e créditos: o que consome](/docs/conceitos/saldo-e-creditos) |

Acima do limite de canais (exceto Instagram), aparece "Seu plano atual não permite adicionar o novo canal". Veja a tabela geral em [Canais: conectar e gerenciar](/docs/canais/visao-geral).

- **Avisos durante o teste:** nos últimos dias, aparece no topo a faixa "Faltam N dias para acabar sua degustação." — para quem tem permissão de cobrança (fora do aplicativo de celular e fora de plano gerenciado por parceiro), ela traz "Não perca tempo" e o botão **Assine agora!**. Em **Configurações** → **Assinatura**, aparece o título "Trial" com o tempo restante ou "Expirado", "Expira em" e **Assinar um plano**. Na tela **Escolha um ambiente**, o workspace exibe a etiqueta **Teste grátis**.
- **Quando o teste acaba sem assinatura:** o bloqueio vem alguns dias depois do fim do teste. Com o teste vencido há mais de 3 dias, aparece a faixa "Sua assinatura expirou. Por favor, selecione um plano nas configurações de assinatura." (com **Ver Plano** para quem cuida da assinatura). O editor de mensagens some das conversas (não dá para responder). Depois que o teste termina sem assinatura, adicionar canais e convidar membros também fica bloqueado, e a tentativa falha com "Sua assinatura expirou". Veja [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano) e [Minha assinatura venceu ou o pagamento falhou](/docs/assinatura/assinatura-vencida).
- **Estender o teste:** não há botão no aplicativo para o cliente estender o prazo. Fale com o suporte (ou com o parceiro, se o workspace estiver ligado a um).
- **Outro workspace:** cada workspace novo criado pela mesma conta começa o próprio teste grátis de 7 dias.

## O que o cadastro cria

- O workspace com o nome informado em **Nome da empresa** e a pessoa cadastrada como proprietário.
- Os três papéis padrão: **Administrador**, **Supervisor** e **Atendente**.
- A sala **Geral**, com o proprietário incluído.
- O período de teste grátis com saldo inicial de cortesia.
- Canais, grupos, tags e frases rápidas não são criados no cadastro — eles são configurados depois no onboarding com o Kin ou nas telas de configuração.

## Casos de borda

- **E-mail em minúsculas:** o endereço é salvo em letras minúsculas.
- **Sessão aberta no navegador:** abrir a tela de cadastro encerra a sessão que estava aberta no mesmo navegador.
- **Workspace ligado a um parceiro:** o onboarding do Kin não abre e a assinatura pode ser gerenciada pelo parceiro. Quem recebeu um link de cadastro de um parceiro da Kinbox cria a conta a partir desse link.
- **Aplicativo para celular:** não tem tela de cadastro; crie a conta no navegador.
- **Validações dos campos:** "Digite um email válido", "Digite seu nome completo", "Digite seu celular", "Digite um celular válido", "A senha ainda não atende a todos os requisitos" e "Digite o nome da sua empresa".
- **Erros gerais:** "Muitas tentativas. Aguarde um instante e tente de novo." (muitas tentativas em pouco tempo) e "Erro ao se registrar, fale com o suporte." (falha geral ao criar a conta).

## Sintomas e soluções

| Sintoma | Causa | O que fazer |
| --- | --- | --- |
| Código não chega no e-mail | E-mail digitado errado, caiu no spam ou atingiu o limite de 5 envios por hora | Conferir o e-mail na tela **Confirme seu e-mail**, procurar a mensagem de "Kinbox" com o assunto "Seu código de confirmação do Kinbox: {código}" no spam, clicar em **Reenviar código** após 60 segundos ou usar **Usar outro e-mail** |
| "Este código não vale mais. Peça um novo." | Passaram 10 minutos ou um código mais recente anulou o anterior | Clicar em **Reenviar código** e digitar apenas o código do e-mail mais recente |
| "Muitas tentativas erradas. Peça um novo código." | 5 tentativas incorretas no mesmo código | Pedir um novo código em **Reenviar código** |
| "A confirmação do e-mail expirou. Confirme o e-mail de novo." | Passaram mais de 30 minutos entre confirmar o e-mail e clicar em **Criar conta** | Confirmar o e-mail de novo com um código novo e concluir o cadastro |
| Já tem conta e quer outro workspace | Um cadastro novo não é necessário | Entrar com a conta que já existe e usar **Criar novo ambiente** |
| Cadastrou com Google e não tem senha para entrar por e-mail | Conta criada com Google não tem senha escolhida pela pessoa | Entrar com **Continuar com o Google** ou definir uma senha em **Esqueceu a senha?** |
| Botão **Continuar com o Google** não aparece | Recurso não habilitado na tela | Fazer o cadastro normalmente pelo campo **Email** |
| "Você não pode adicionar canais de Instagram em plano trial" | O teste grátis não permite conectar Instagram | Assinar um plano em [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano) |
| Editor de mensagens sumiu ao fim do teste grátis | O teste grátis terminou sem assinatura | Escolher um plano em [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano) ou regularizar em [Minha assinatura venceu ou o pagamento falhou](/docs/assinatura/assinatura-vencida) |
| Precisa de mais tempo de teste | Não existe botão de extensão no app | Falar com o suporte (ou com o parceiro, se o workspace estiver ligado a um) |

Veja também [Criar sua conta e o workspace](/docs/primeiros-passos/criar-seu-workspace-no-kinbox) e [Não consigo entrar na Kinbox](/docs/conta/problemas-de-acesso).
