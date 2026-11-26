---
title: "Verificação em duas etapas: apps aceitos, códigos de recuperação, tempos, erros e quem pode desativar"
description: Regras da verificação em duas etapas da Kinbox para responder dúvidas de login, com formato dos códigos, validade das telas, mensagens de erro, e-mails de aviso e o que fazer sem o celular.
keywords: [2fa, código inválido, a verificação expirou, a configuração expirou, muitas tentativas, código de recuperação, xxxx-xxxx, google authenticator, totp, redefinir verificação, suporte, perdi o celular, obrigar 2fa]
publico: llm
tipo: referencia
fontes:
  - web:src/lib/twoFactor.ts
  - web:src/pages/settings/profile/TwoFactorModals.tsx
  - api:src/modules/operators/two-factor/two-factor.service.ts
  - api:src/modules/operators/two-factor/totp.ts
  - api:src/modules/operators/two-factor/two-factor.email.ts
codigo:
  - web:src/pages/settings/profile/TwoFactor*.tsx
  - web:src/components/twoFactor/**
  - web:src/lib/twoFactor.ts
  - web:src/pages/auth/TwoFactorStep.tsx
  - api:src/modules/operators/two-factor/**
verificado_em: 2026-11-26
---

Referência complementar de [Ativar a verificação em duas etapas](/docs/conta/verificacao-em-duas-etapas).

## O que é e onde vale

- A verificação em duas etapas (2FA) exige um código TOTP de **6 dígitos** gerado por um app autenticador no celular (como Google Authenticator, Microsoft Authenticator, 1Password ou outro compatível). Não usa SMS nem e-mail como segundo fator.
- Vale para a conta toda, em todos os workspaces, no navegador e no app para celular.
- Também é exigida depois do login com **Continuar com o Google** e, no app para iPhone, com **Continuar com Apple**.
- Redefinir a senha não desativa a verificação em duas etapas.
- Além de **Configurações** → **Perfil** → **Segurança**, quem entra por convite pode ativar ao concluir o cadastro, na tela **Proteja sua conta** (**Ativar agora** / **Agora não**).

## Quem pode ativar e o que quem administra vê

- Cada membro ativa, gera códigos e desativa a própria verificação.
- Com a restrição **Não pode mudar informação de perfil** no papel, os botões **Ativar** e **Gerenciar** ficam desativados (essa restrição não vale para o proprietário).
- Ninguém do workspace consegue ativar, desativar ou exigir a verificação em duas etapas de outro membro. Não existe opção para obrigar todo o workspace a usar 2FA.
- Quem administra os membros vê quem ativou pelo escudo verde "Verificação em duas etapas ativa" na lista de **Membros** e pela coluna **Verificação em duas etapas** na exportação.

## Códigos do app e códigos de recuperação

- **Código do app autenticador:** 6 dígitos, renovado a cada **30 segundos**. Cada código só vale uma vez; se o membro acabou de usá-lo, precisa aguardar o próximo. Aceita uma diferença de relógio de 30 segundos para cada lado — se todos os códigos forem recusados, o membro deve conferir se a hora do celular está no automático.
- **Códigos de recuperação:** 10 códigos de 8 letras e números no formato `xxxx-xxxx`, que podem ser copiados (**Copiar**) ou baixados (**Baixar .txt**, arquivo `kinbox-codigos-de-recuperacao.txt`).
- Cada código de recuperação deixa de funcionar depois de usado. A linha **Verificação em duas etapas** no perfil mostra o resumo com a data de ativação e quantos dos 10 códigos restam.
- **Gerar novos códigos de recuperação** exige confirmar com um código atual do app autenticador ou um código de recuperação, invalida todos os códigos anteriores e exibe 10 códigos novos.
- **Ativação imediata:** a verificação já fica ativa assim que o código de 6 dígitos é confirmado na janela **Conecte seu app autenticador**, antes de os códigos de recuperação aparecerem. Se a janela for fechada sem guardar os códigos, o membro deve usar **Gerenciar** → **Gerar novos códigos de recuperação**.

## Tempos de validade e bloqueio

- **QR code e chave de ativação:** valem **15 minutos**.
- **Tela de verificação no login:** vale **5 minutos** (ou até várias tentativas erradas na mesma tela).
- **Muitos códigos errados seguidos:** bloqueio temporário de **15 minutos**.

## Mensagens de erro

| Mensagem na tela | Causa | O que fazer |
| --- | --- | --- |
| "Código inválido. Tente novamente." | Código errado, já usado ou relógio do celular desajustado | Conferir o código, esperar o próximo ou colocar a hora do celular no automático |
| "A configuração expirou. Comece de novo." | Passaram mais de 15 minutos na janela de ativação | Fechar e iniciar a ativação novamente |
| "A verificação em duas etapas já está ativa." | Tentativa de ativar quando a verificação já estava ativa | Recarregar o perfil e usar **Gerenciar** |
| "A verificação em duas etapas não está ativa." | Tentativa de gerenciar ou desativar sem estar ativa | Recarregar o perfil |
| "A verificação expirou. Entre novamente." | Passaram mais de 5 minutos na tela do código no login ou houve várias tentativas erradas na mesma tela | Entrar novamente com e-mail e senha (ou Google/Apple) |
| "Muitas tentativas. Aguarde 15 minutos e tente novamente." | Muitos códigos errados seguidos | Aguardar 15 minutos e tentar novamente |
| "Muitas tentativas. Aguarde alguns instantes e tente novamente." | Muitas tentativas de verificação em pouco tempo | Aguardar alguns instantes e tentar novamente |
| "Não foi possível verificar o código. Tente novamente." | Falha ao verificar o código (por exemplo, conexão) | Tentar novamente |

## E-mails de aviso

- **Ativada:** assunto "Verificação em duas etapas ativada".
- **Desativada:** assunto "Verificação em duas etapas desativada".
- **Redefinida pelo suporte:** assunto "Verificação em duas etapas redefinida pelo suporte".
- **Gerar novos códigos de recuperação:** não envia e-mail.
- Todos os e-mails de aviso orientam a trocar a senha e falar com o suporte caso o membro não reconheça a ação.

## Perda do celular e dos códigos de recuperação

- Sem o app autenticador e sem nenhum código de recuperação, o membro não consegue entrar nem desativar a verificação sozinho.
- Quem administra o workspace (mesmo o proprietário) também não consegue redefinir a verificação de um membro.
- Apenas o suporte da Kinbox pode redefinir a verificação em duas etapas. Se o membro não consegue entrar na Kinbox, deve pedir a um colega do workspace ou ao proprietário para acionar o suporte. Após a redefinição, o membro recebe o e-mail de aviso e volta a entrar só com a senha.

Veja os guias [Ativar a verificação em duas etapas](/docs/conta/verificacao-em-duas-etapas) e [Não consigo entrar na Kinbox](/docs/conta/problemas-de-acesso).
