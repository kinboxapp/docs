---
title: "RD Station Marketing: busca por e-mail, conversões e ação do bot"
description: "Regras técnicas do RD Station Marketing na Kinbox: ordem de salvar antes de conectar, identificadores de conversão, diferenças entre quadro e bot, renovação de acesso e casos de borda."
keywords: [rd station marketing, chat_kinbox, criar contato como conversão, busca por e-mail rd, ação do bot rdmarketing, renovar acesso rd, desconectar rd]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/integrations/**
  - web:src/components-old/chat/side/integrationApps/RDStationMarketingApp/**
  - api-v0:server/modules/chat/**
  - api-v0:server/services/RdStationService.js
  - api-v0:server/modules/**
codigo:
  - web:src/pages/settings/integrations/**
  - web:src/pages/settings/integrations/rdstation-marketing/**
  - web:src/components-old/chat/side/integrationApps/RDStationMarketingApp/**
  - web:src/pages/settings/bot/drawers/integration/UpdateContactRDMarketing.tsx
  - api-v0:server/services/RdStationService.js
  - api-v0:server/modules/**
  - api-v0:server/modules/chat/**
verificado_em: 2026-11-26
---

Complemento técnico de [Integrar com o RD Station Marketing](/docs/integracoes/rdstation-marketing).

## Conexão, desconexão e conta

- **Permissão e conta:** o painel **RD Station Marketing** (**Configurações** → **Integrações** → **Apps** → **RD Station Marketing**) exige a permissão **Integrações** ou proprietário. Cada workspace mantém uma conexão RD Station Marketing.
- **Por que salvar antes de conectar:** na primeira configuração, o retorno da autorização só conclui se o registro da integração já existir no workspace. Clicar em **Conectar** antes de clicar em **Salvar** deixa a página de retorno carregando indefinidamente sem aviso.
- **Após conectar:** a conexão é gravada já com **Habilitar integração** ligado, exibe `"RD Station Marketing Conectado."` e a tela volta para a lista de apps. Se a conexão falhar, aparece `"Erro ao se conectar ao Rd Station Marketing"` (ou o texto do erro devolvido pelo RD).
- **Desconectar:** remove o acesso salvo na Kinbox imediatamente (sem clicar em **Salvar**), sem alterar o interruptor **Habilitar integração** e sem revogar a autorização dentro da conta do RD Station Marketing.
- **Visibilidade do quadro:** aparece no painel **Detalhes** apenas com **Habilitar integração** ligado, e fica oculto para quem tem a restrição **Esconder informações de integração** ou está no modo de treino da Academia.

## Busca por e-mail, dados exibidos e conversões

- **E-mail como chave:** o quadro busca o contato no RD exclusivamente pelo e-mail do contato na Kinbox. Alterar o e-mail do contato na Kinbox faz o quadro buscar o novo e-mail no RD. **Atualizar contato** envia nome, celular, bio e tags, e não altera o e-mail no RD.
- **Mensagens de erro do quadro:** ao criar um contato, um erro de e-mail mostra o texto devolvido pelo RD; outros erros aparecem como `"Erro ao criar contato - "` seguido do detalhe do RD. **Atualizar contato** com erro mostra `"Erro ao atualizar contato"`.
- **País:** no quadro, o campo **País** hoje repete o valor de **Estado**.
- **Campos exibidos no quadro (somente leitura):** mostra apenas campos preenchidos no RD — **Contato**, **Cargo**, **Telefone pessoal**, **Celular**, **Bio**, **Website**, **Cidade**, **Estado**, **Twitter**, **Facebook**, **Linkedin**, **Tags** e campos personalizados do RD (os de prefixo `cf_`, exibidos sem o prefixo).
- **Criar contato como conversão:** gravado apenas ao clicar em **Salvar** no painel. Quando ligado, registra uma conversão no RD após criar ou atualizar o contato com os seguintes identificadores:
  - **No quadro da conversa:** `chat_kinbox`.
  - **Na ação do bot:** `"Contato criado via Kinbox"` ou `"Contato atualizado via Kinbox"`.

## Ação no bot (`Cria ou atualiza contato no RDMarketing`)

Disponível no bloco **Integração**, grupo **Outros** (veja [Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot); pulada na simulação):

- **Comportamento:** procura o contato no RD pelo e-mail; cria se não existir ou atualiza se existir, enviando nome, e-mail, telefone (com DDI) e os campos configurados no **Mapa de campos** (**Nome**, **E-mail**, **Data criação da sessão**, **Data fim da sessão**, **Atendente da sessão** e campos personalizados de contato e de sessão). Registra mensagem de sistema na conversa (`"Contato criado no RdStation"` ou `"Contato atualizado no RdStation"`).
- **Contato sem e-mail:** registra `"Erro ao consultar/criar contato no RdStation: O contato precisa ter um e-mail"`. Erros de validação do RD aparecem na mesma mensagem no formato `campo: mensagem`.
- **Sem conta conectada ou falha:** sem conta conectada, a ação não executa nada e não registra mensagem. Falhas na ação não alteram o caminho do fluxo do bot.
- **Interruptor Habilitar integração:** a ação do bot depende apenas de haver conta conectada; desligar **Habilitar integração** oculta o quadro na conversa, mas não interrompe a ação do bot (para interromper, use **Desconectar** ou remova o bloco do fluxo).

## Diferenças entre quadro e bot e renovação de acesso

| Aspecto | Quadro na conversa | Ação no bot |
| --- | --- | --- |
| **Campo de telefone no RD** | Celular (`mobile_phone`) | Telefone pessoal (`personal_phone`, com DDI) |
| **Tags da conversa** | Envia em minúsculas | Não envia tags (apenas campos mapeados) |
| **Renovação de acesso expirado** | Não renova sozinho | Renova automaticamente ao expirar |

- **Quando o acesso expira no quadro:** contatos já existentes no RD somem do quadro e o botão **Add contato** volta a aparecer (gerando erro ao clicar). Para restabelecer, abra o app, clique em **Desconectar** e clique em **Conectar** novamente.
- **Receber leads do RD na Kinbox:** esta integração apenas envia dados ao RD. Para receber leads convertidos do RD na Kinbox, veja [Receber leads do RD Station Marketing por webhook](/docs/integracoes/rdstation-marketing-webhook).
