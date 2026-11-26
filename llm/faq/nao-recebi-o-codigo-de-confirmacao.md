---
title: Não recebi o código de confirmação do cadastro
description: Confira o e-mail na tela, procure a mensagem de "Kinbox" no spam e use Reenviar código após 60 segundos; o código vale 10 minutos.
keywords: [não recebi o código, código de confirmação, código de verificação, código de 6 dígitos, reenviar código, código expirou, código incorreto, muitas tentativas, confirmar e-mail, cadastro]
publico: llm
tipo: faq
fontes:
  - web:src/pages/auth/register/Register.tsx
  - api:src/modules/operators/signup/
codigo:
  - web:src/pages/auth/register/**
  - api:src/modules/operators/signup/**
verificado_em: 2026-11-26
---

## Pergunta

Não recebi o código de confirmação do cadastro

## Resposta

Confira se o e-mail exibido na tela **Confirme seu e-mail** ("Enviamos um código de 6 dígitos para...") está correto, procure na pasta de spam ou lixo eletrônico a mensagem de "Kinbox" com o assunto "Seu código de confirmação do Kinbox: {código}" e clique em **Reenviar código** assim que o contador terminar.

- **E-mail errado:** clique em **Usar outro e-mail** para voltar ao primeiro passo e corrigir o endereço.
- **Regras do código:** cada código vale **10 minutos**, um novo envio libera após **60 segundos**, há limite de **5 envios por hora** para o mesmo e-mail e **5 tentativas erradas** por código, e pedir um código novo anula o anterior.
- **Mensagens possíveis:** "Código incorreto.", "Muitas tentativas erradas. Peça um novo código.", "Este código não vale mais. Peça um novo.", "Aguarde um instante para pedir um novo código." e "Muitos códigos enviados para este e-mail. Tente de novo mais tarde.".
- **Confirmação expirada:** se no fim do cadastro aparecer "A confirmação do e-mail expirou. Confirme o e-mail de novo.", confirme o endereço novamente (a confirmação vale 30 minutos).
- **Alternativa sem código:** se o botão **Continuar com o Google** aparecer na tela inicial do cadastro, você pode criar a conta com o Google sem precisar de código por e-mail.
- Se nada chegar mesmo depois de reenviar, fale com o suporte.

Veja o passo a passo completo em [Criar sua conta e o workspace](/docs/primeiros-passos/criar-seu-workspace-no-kinbox).

## Variações

- o código de verificação do cadastro não chega no meu e-mail
- não chegou o e-mail de confirmação da kinbox
- o código de 6 dígitos deu incorreto ou inválido
- apareceu que o código não vale mais ou expirou
- apareceu muitas tentativas erradas no código de cadastro
- como reenviar o código de confirmação do cadastro
