---
title: "Banco Inter: campos do boleto, erros e o que a integração não faz"
description: "Regras técnicas do Banco Inter na Kinbox: credenciais, campos da janela Gerar Boleto, o que não é enviado, mensagens de erro, PDF e casos de borda."
keywords: [banco inter, gerar boleto, pagador, linha digitável, token expirado, não foi possível autenticar, baixar pdf, multa e juros]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/integrations/EditBancoInter.tsx
  - web:src/components-old/chat/side/integrationApps/**
codigo:
  - web:src/pages/settings/integrations/EditBancoInter.tsx
  - web:src/components-old/chat/side/integrationApps/**
verificado_em: 2026-11-26
---

Complemento técnico de [Integrar com o Banco Inter](/docs/integracoes/banco-inter).

## Credenciais, conta e acesso

- **Permissão e conta:** o painel **Banco Inter** (**Configurações** → **Integrações** → **Apps** → **Banco Inter**) exige a permissão **Integrações** ou proprietário. Cada workspace mantém apenas uma integração Banco Inter.
- **Permissão da aplicação no banco:** a aplicação criada no Banco Inter precisa ter acesso para emitir e consultar boletos de cobrança; sem esse acesso, a autenticação falha ao clicar em **Gerar Boleto**.
- **Visibilidade e desligamento:** o quadro **Banco Inter** aparece no painel **Detalhes** apenas com **Habilitar integração** ligado, e fica oculto para membros com a restrição **Esconder informações de integração** ou no modo de treino da Academia. Desligar **Habilitar integração** oculta o quadro e interrompe o uso.

## Campos da janela Gerar Boleto

A janela sempre abre vazia (não preenche dados a partir do contato), exibe o aviso **Obrigatório** para campos vazios e confirma no botão **Gerar**.

- **Cobrança:**
  - **Identificador** (obrigatório)
  - **Valor** (obrigatório, em reais, passo de centavos, mínimo `0`)
  - **Data de vencimento** (obrigatória; exibe formato `DD/MM/AAAA HH:mm` e não permite escolher dia anterior a ontem)
- **Pagador:**
  - **CPF/CNPJ** (obrigatório)
  - **Tipo de pessoa** (obrigatório: **Fisica** ou **Juridica**)
  - **Nome** (obrigatório)
  - **Endereço** (obrigatório)
  - **Número**, **Complemento** e **Bairro** (opcionais)
  - **CEP** (obrigatório)
  - **Cidade** (obrigatório)
  - **Estado** (obrigatório, lista de siglas UF)
- **O que não é enviado:** não há campos para multa, juros, desconto nem mensagem ao pagador; o boleto é emitido com zero dias de agenda após o vencimento.

## Emissão, PDF e o que a integração não faz

- **Tela Compartilhar boleto:** depois de gerar, o título passa a **Compartilhar boleto**, sem aviso de sucesso na tela e sem botão de envio ao contato. Exibe **Linha Digitável** (somente leitura), **Copiar** (aviso `"Linha digitável copiada para a área de transferência."`) e **Baixar PDF** (baixa `boleto.pdf`). O botão **Fechar** do rodapé fica oculto nessa tela; para sair, clique no **X** do cabeçalho.
- **Sem gravação na Kinbox:** emitir um boleto não cria negociação, nota, tag nem registro no histórico da conversa e não envia mensagem ao contato.
- **Fora do escopo:** não gera Pix ou QR Code, não lista boletos anteriores, não consulta status, não dá baixa, não cancela boletos e não possui ação pronta no bot.

## Erros e casos de borda

- **Falha de autenticação ao clicar em Gerar Boleto:** exibe `"Não foi possível autenticar suas credenciais do banco Inter"` (Client Id, Client Secret, certificado ou chave incorretos, ou aplicação sem acesso a boletos).
- **Acesso expirado ao gerar ou baixar PDF:** exibe `"Token expirado ou inválido. Tente novamente."`; a Kinbox renova o acesso e você pode clicar novamente em **Gerar** ou **Baixar PDF**.
- **Erro do banco ao gerar:** exibe a mensagem devolvida pelo Banco Inter (ou `"Erro ao gerar boleto. Tente novamente."` quando não há texto de erro) e mantém a janela aberta com os campos preenchidos.
- **Baixar PDF sem resposta:** quando o Banco Inter não devolve o PDF, o botão não exibe aviso nem baixa arquivo; tente de novo ou copie a **Linha Digitável**.
- **Gerações seguidas:** cada clique em **Gerar** solicita um novo boleto ao Banco Inter, sem bloqueio na Kinbox contra repetir o mesmo **Identificador**; se o banco recusar duplicidade, o erro retornado aparece no aviso.
