---
title: "Acesso: senha, código da verificação, convite, workspace desativado e limite de acessos"
description: Matriz de diagnóstico para quem não consegue entrar ou foi tirado da Kinbox, com cada mensagem da tela, a causa e o que fazer.
keywords: [verifique suas credenciais, token inválido ou expirado, nenhum ambiente ativo, você foi deslogado por um gestor, deslogado por outra sessão, limite de sessões ativas, fora do horário de acesso, desconectado por inatividade, sem permissão para acessar este workspace, você ainda não tem uma conta, esqueci a senha, link de redefinição]
publico: llm
tipo: solucao-de-problema
fontes:
  - web:src/pages/auth/Login.tsx
  - web:src/pages/auth/Reset.tsx
  - web:src/components-old/SessionLimitReached.tsx
  - web:src/hooks/useSocket.tsx
  - api-v0:server/controllers/OperatorController.js
  - api:src/modules/events/events.gateway.ts
codigo:
  - web:src/pages/auth/**
  - web:src/components-old/SessionLimitReached.tsx
  - web:src/components/feedback/BusinessHoursAccessLocked.tsx
  - web:src/layouts/BasicLayoutInit.tsx
  - web:src/hooks/useSocket.tsx
  - web:src/hooks/useSocketV2.ts
  - web:src/hooks/useInit.tsx
  - api-v0:server/controllers/OperatorController.js
  - api-v0:server/security/loginBruteForceGuard.js
  - api:src/modules/events/events.gateway.ts
verificado_em: 2026-11-26
---

## Matriz de diagnóstico

Na interface da Kinbox, o workspace aparece como **ambiente**.

| Mensagem ou sintoma | Causa | O que fazer |
| --- | --- | --- |
| "Verifique suas credenciais e tente novamente" | E-mail sem conta cadastrada ou senha errada (a mensagem é igual nos dois casos) | Conferir o e-mail digitado; se não lembrar a senha, usar **Esqueceu a senha?** |
| A Kinbox não entra depois de várias senhas erradas, mesmo com a senha certa | A Kinbox recusa novas tentativas por um tempo (proteção contra tentativas) | Aguardar 15 minutos; se continuar (por exemplo, em rede compartilhada), esperar até 1 hora sem tentar; se não tiver certeza da senha, usar **Esqueceu a senha?** |
| **Continuar com o Google** mostra "Você ainda não tem uma conta. Complete seu registro." e abre o cadastro | Não existe conta Kinbox com esse e-mail do Google | Entrar com o e-mail da conta Kinbox ou concluir o cadastro |
| Tela **Verificação em duas etapas** pede código de 6 dígitos | Verificação em duas etapas (2FA) está ativa na conta | Digitar o código do app autenticador ou clicar em **Usar um código de recuperação** |
| "Código inválido. Tente novamente." | Código de 2FA errado, já usado ou relógio do celular desajustado | Esperar o próximo código e conferir se a hora do celular está no automático |
| "A verificação expirou. Entre novamente." e volta para e-mail e senha | A tela do código passou de 5 minutos ou teve várias tentativas erradas | Entrar novamente com e-mail e senha (ou Google/Apple) |
| "Muitas tentativas. Aguarde 15 minutos e tente novamente." | Muitos códigos de 2FA errados seguidos | Aguardar 15 minutos e tentar novamente |
| Perdeu o celular e não tem os códigos de recuperação | Sem app autenticador e sem códigos, não há acesso nem desativação por conta própria | Falar com o suporte da Kinbox para redefinir a verificação (pedir a um colega ou ao proprietário se não conseguir entrar) |
| E-mail de **Esqueci a senha** não chega | E-mail digitado é diferente do da conta (a tela confirma igual) ou caiu no spam | Conferir o e-mail da conta, procurar "[Kinbox] - Reset de senha" no spam e pedir novamente |
| "Token inválido ou expirado." ao redefinir a senha | Link de redefinição tem mais de 2 horas ou já foi usado | Pedir outro link em **Esqueceu a senha?** |
| Nova senha recusada | Fora da regra (mínimo de 8 caracteres, uma letra e um número) | Cumprir os requisitos exibidos na tela **Resetar senha** |
| Recebeu convite e não consegue entrar | Ainda não concluiu o cadastro pelo link do convite (tela **Complete seu cadastro**) | Abrir o link do e-mail "Convite para se juntar ao workspace [nome]" (o link não expira) ou pedir **Reenviar convite** a quem convidou |
| Tela **Nenhum ambiente ativo** depois de entrar | Foi desativado ou removido de todos os workspaces da conta, ou o próprio workspace foi desativado | Pedir a quem administra o workspace para reativar ou convidar novamente; não criar um workspace novo achando que recupera o antigo |
| Workspace não aparece em **Escolha um ambiente** | Foi desativado naquele workspace, o próprio workspace foi desativado ou o convite foi para outro e-mail | Falar com quem administra aquele workspace |
| "Você não tem permissão para acessar este workspace." e sai | Foi desativado nesse workspace enquanto estava com a Kinbox aberta | Falar com quem administra o workspace |
| "Você foi deslogado por um gestor..." (sai em 3 segundos) | Alguém com a permissão **Membros** usou **Desconectar** na sua linha | Entrar novamente |
| Voltou para a tela de entrada sem aviso | O papel foi editado ou o acesso expirou | Entrar novamente |
| No navegador: "Você atingiu o limite de sessões ativas no ambiente [nome]." | Muitos acessos abertos ao mesmo tempo nesse workspace (em geral, 3) | Clicar em **Desconectar** em um acesso antigo na lista ou escolher outro workspace |
| No app para celular: alerta **Limite de sessões** ("Gerencie suas sessões no Kinbox web e entre novamente no aplicativo.") e o app sai da conta | Mesmo limite de acessos abertos | Abrir a Kinbox no navegador, desconectar um acesso antigo na tela de limite e entrar de novo no app |
| "Você foi deslogado por outra sessão..." (sai em 3 segundos) | Outro acesso seu desconectou este navegador na tela de limite | Entrar novamente; se não foi você, trocar a senha e ativar a verificação em duas etapas |
| **Fora do horário de acesso** ("Seu perfil só pode acessar o ambiente [nome] dentro do horário comercial.") | Papel tem a restrição **Limitar horário de acesso ao ambiente** | Aguardar o horário exibido na tela, trocar para outro workspace ou falar com quem administra |
| "Você foi desconectado por inatividade." | Workspace usa **Tornar offline se inativo** | Clicar em **Reconectar** |
| Entra na Kinbox, mas o campo de mensagem sumiu ou há aviso de assinatura | Assinatura ou teste grátis venceu (não bloqueia a entrada) | Regularizar conforme [Minha assinatura venceu ou o pagamento falhou](/docs/assinatura/assinatura-vencida) |

## Esqueci a senha e regras da senha

- **Requisitos da senha:** mínimo de 8 caracteres, com pelo menos uma letra e um número.
- **E-mail de recuperação:** assunto "[Kinbox] - Reset de senha". O link vale **2 horas** e só pode ser usado uma vez; pedir novamente gera um link novo e invalida o anterior.
- **Confirmação neutra:** a tela mostra **Confira seu e-mail** mesmo quando o endereço digitado não tem conta.
- **Verificação em duas etapas:** redefinir a senha não desativa a verificação em duas etapas.
- **Senha nova mandada por quem administra:** quem tem a permissão **Pode resetar senha de membros** (ou o proprietário) usa **Resetar senha** em **Membros**; a Kinbox gera uma senha e envia por e-mail com o assunto "[Kinbox] - Redefinição de senha". Só funciona se o membro estiver ativo, já tiver aceitado o convite, não for o proprietário e não tiver vínculo com nenhum outro workspace, mesmo inativo; fora disso, o próprio membro usa **Esqueceu a senha?** (veja [Gerenciar membros](/docs/configuracoes-no-workspace/gerenciar-membros)).
- **Troca no perfil:** em **Configurações** → **Perfil** → **Segurança** → **Senha**, senha atual errada mostra "Senha incorreta". A senha salva é a digitada em **Nova senha**. A restrição **Não pode mudar informação de perfil** esconde o botão de editar senha (não vale para o proprietário).

## Limite de acessos abertos

- Em geral, o limite é de **3 acessos** abertos ao mesmo tempo por pessoa em cada workspace (esse limite pode ser diferente no seu workspace).
- Cada navegador ou app para celular conta como um acesso aberto; abas do mesmo navegador contam juntas como um único acesso.
- Clicar em **Sair** encerra o acesso e libera a vaga; apenas fechar a aba sem clicar em **Sair** pode manter o acesso listado.
- Quando o limite é atingido, a tela lista os acessos abertos (data e hora de início, navegador e computador ou celular) com o botão **Desconectar** em cada um. Ao desconectar um acesso antigo, ele recebe "Você foi deslogado por outra sessão..." e o navegador atual passa a funcionar. Com mais de um workspace, a tela também permite escolher outro workspace.
- Fora da tela de limite, não existe página para listar ou encerrar acessos abertos nem opção de sair de todos os aparelhos. Em suspeita de acesso indevido: trocar a senha, ativar a verificação em duas etapas, pedir a quem administra os membros para usar **Desconectar** na sua linha (só fica ativo com o membro **Online** e fica desativado para o proprietário) e falar com o suporte.

## O e-mail da conta não muda pela tela

- A linha **E-mail** em **Configurações** → **Perfil** não tem edição e exibe "Para mudar entre em contato com o suporte".
- Quem administra os membros também não consegue alterar o e-mail de uma conta (para convite enviado ao endereço errado, é preciso excluir e convidar de novo).

## Suporte

- Dentro da Kinbox: foto no canto superior direito → **Ajuda e documentação** → **Falar com o suporte no WhatsApp**; ou na busca do topo (**Pesquisar**, atalho ⌘K no Mac ou Ctrl+K) → **Contactar Suporte**.
- As telas de entrada não têm link para o suporte: quem não consegue entrar deve pedir a um colega do workspace ou ao proprietário.
- Informar: e-mail da conta, nome do workspace, mensagem exata da tela, se usa verificação em duas etapas e se o problema ocorre no navegador ou no app.

Veja também [Não consigo entrar na Kinbox](/docs/conta/problemas-de-acesso), [Trocar a senha, recuperar o acesso e sair da conta](/docs/conta/senha-e-sessoes), [Ativar a verificação em duas etapas](/docs/conta/verificacao-em-duas-etapas), [Trocar de workspace ou criar outro](/docs/conta/trocar-de-workspace) e [Editar seu perfil](/docs/configuracoes-no-workspace/configurar-o-perfil-do-usuario).
