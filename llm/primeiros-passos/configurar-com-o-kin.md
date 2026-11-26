---
title: "Onboarding do Kin: o que ele cria, quem não vê e como pular"
description: Referência do onboarding guiado da Kinbox com o Kin — quem vê, cada etapa e o que ela cria no workspace, agente de IA e saldo, canais, conversa de teste, pular, voltar e retomar.
keywords: [onboarding, kin, quem vê o onboarding, onboarding não apareceu, pular onboarding, reabrir onboarding, tags criadas, funil criado, convites, agente de ia criada, ler o site, base de conhecimento, chat do site criado, conversa de teste, saldo, retomar]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/onboarding/eligibility.ts
  - web:src/pages/onboarding/script.ts
  - web:src/pages/onboarding/knowledge.ts
  - web:src/pages/onboarding/state.ts
  - api:src/modules/onboarding/onboarding.service.ts
  - api:src/modules/onboarding/onboarding-test.service.ts
  - api:src/modules/knowledges/knowledges.service.ts
  - api-v0:server/auxiliary/walletDefaults.js
codigo:
  - web:src/pages/onboarding/**
  - api:src/modules/onboarding/**
verificado_em: 2026-11-26
---

Referência complementar a [Configurar o workspace com o Kin](/docs/primeiros-passos/configurar-com-o-kin). Na tela da Kinbox, o workspace aparece como **ambiente**.

## Quem vê e quem não vê

- **Vê:** apenas o proprietário de um workspace novo. O onboarding abre automaticamente ao carregar a Kinbox até ser concluído ou pulado.
- **Não vê:** membros convidados, workspaces criados por modelo (template), workspaces ligados a um parceiro, contas de marcas parceiras e quem já concluiu ou pulou o fluxo.

## Etapas e o que cada uma cria

| Etapa | O que pergunta ou oferece | O que cria no workspace |
| --- | --- | --- |
| **01 / 06 — Olá** | Botões **Bora começar** e **Quanto tempo leva?** ("Uns 5 minutos") | Nada |
| **02 / 06 — Você e a empresa** | Papel na empresa, tamanho do time ("Só eu", "2 a 10", "11 a 20", "21 a 50", "50 a 100", "100+"), ramo e objetivo (**Suporte ao cliente**, **Vendas**, **Realizar envio em massa no WhatsApp**, **CRM**, **Outro**; **Pronto**) | 4 tags do ramo (só as que ainda não existem) e, se marcou **Vendas** ou **CRM**, 1 funil de vendas |
| **03 / 06 — Seu time** | E-mails, papel (**Admin**, **Supervisor** ou **Atendente**; padrão **Atendente**), equipe opcional (**+ equipe**: Vendas, Suporte, Financeiro, Pós-venda); **Enviar N convite(s)** ou **Pular por agora** | Convites enviados por e-mail na hora e os grupos escolhidos com esses membros |
| **04 / 06 — Um cérebro pro atendimento** | Site da empresa (**Ler o site**, **Não temos site**, **Pular**) ou texto sobre o atendimento; revisão (**Está certo**), **Horário comercial**, **Idioma, moeda e fuso**, **Mensagem de boas-vindas** (**Outra versão**, **Editar**), até 5 **respostas rápidas**, agente de IA (**Criar a {Nome}** ou **Agora não**) | Respostas rápidas marcadas (frases rápidas públicas), horário comercial (se veio do site ou editado), idioma/moeda/fuso e, com **Criar a {Nome}**, agente de IA + base de conhecimento + transferência para o proprietário |
| **05 / 06 — Canal e primeira conversa** | **WhatsApp**, **Instagram**, **Messenger**, **Chat no site**, **Telegram**, **E-mail**, **SMS**, **Conectar depois**; envio da primeira mensagem de teste (**Pular o teste**) | Canal conectado (se escolhido), canal **Chat do site · {empresa}** (sempre criado) e conversa de teste (no chat do site, se não conectou outro canal) |
| **06 / 06 — Tudo pronto** | Cartão "Seu Kinbox está no ar." com resumo (Empresa, Canal, Time, Agente, Respostas, Inbox) e **Ir para o inbox** | Conclui o onboarding e abre a **Caixa de entrada** |

## Tags por ramo e funil de vendas

A prévia da direita apenas ilustra a interface enquanto você responde (os itens que acendem não mudam o menu real do workspace).

| Ramo | Tags criadas (se ainda não existirem) |
| --- | --- |
| Varejo | Orçamento, Entrega, Pós-venda, Troca |
| Saúde / Farmácia | Agendamento, Retorno, Exames, Convênio |
| Educação | Matrícula, Bolsa, Financeiro, Secretaria |
| Imobiliário | Visita, Locação, Venda, Documentos |
| Demais ramos | Novo lead, Orçamento, Suporte, Pós-venda |

Quando **Vendas** ou **CRM** é selecionado, o funil de vendas é criado com:

- **Etapas padrão:** Novo lead, Qualificação, Proposta enviada, Negociação, Venda fechada.
- **Motivos de perda:** Sem justificativa, Preço, Desconto, Concorrência, Não atendeu as expectativas.

Veja [Criar e usar tags](/docs/configuracoes-no-workspace/criar-e-gerenciar-tags) e [Funis e negociações: visão geral](/docs/crm/visao-geral).

## Convites da etapa Seu time

- Cada convite sai por e-mail na hora, aparece como pendente até o convidado aceitar e já ocupa uma licença do plano (até 10 no teste grátis, contando o proprietário).
- O nome do convidado é preenchido com a parte do e-mail antes do `@` e pode ser corrigido depois em **Configurações** → **Ambiente** → **Membros** (veja [Gerenciar membros](/docs/configuracoes-no-workspace/gerenciar-membros)).
- Se algum endereço falhar, o Kin avisa quais e-mails não foram convidados; tente novamente na etapa ou convide depois em **Configurações** → **Ambiente** → **Membros**.

## Agente de IA, leitura de site e saldo

- **Leitura do site:** o Kin lê a página inicial e até 5 páginas internas. Se o site bloquear a leitura (ou com **Não temos site**), pede um texto curto sobre o atendimento (horário, endereço, entrega, pagamento e trocas).
- **Limite de leituras de site:** até **5 leituras de site por dia** por workspace. Ao atingir o limite, aparece "Hoje já li sites demais por aqui. Você cria a agente quando quiser em Agentes de IA."
- **Criação do agente:** com **Criar a {Nome}**, o agente nasce desligado e é ligado no chat do site criado na etapa seguinte, já com a base de conhecimento do que foi lido e a transferência para você quando não souber responder. Se você conectar outro canal, o Kin pergunta se quer ligá-lo nele também (**Ligar a {Nome} no {Canal}** ou **Só no chat do site por enquanto**). Com **Agora não**, nenhum agente nem base de conhecimento é criado.
- **Consumo de saldo:** a leitura do site e os textos gerados pelo Kin durante o onboarding não consomem saldo. Processar a base de conhecimento do agente e gerar respostas do agente consomem saldo da carteira — o agente só responde quando há saldo. Todo workspace novo recebe um saldo inicial de cortesia para testar o agente. Veja [Saldo da carteira e créditos: o que consome](/docs/conceitos/saldo-e-creditos) e [Agentes de IA: visão geral](/docs/agente-de-ia/visao-geral).

## Canais e conversa de teste

- **Conectam dentro do Kin:** WhatsApp (**QR Code** sempre na conexão **Express**, informando número com DDD e clicando em **Gerar QR Code** — com opções **Seguir enquanto isso** e **Escanear depois**, deixando o QR Code em uma pílula no topo; ou **API oficial** via **Continuar com o Facebook**), Instagram (**Continuar com o Facebook**; não conecta no teste grátis), Messenger (**Continuar com o Facebook**) e Chat no site.
- **Conectam depois:** Telegram, E-mail e SMS ficam anotados para conectar em **Configurações** → **Chat** → **Canais** (botão **Abrir Canais**). Veja [Conectar o primeiro canal](/docs/primeiros-passos/conectar-o-primeiro-canal).
- **Chat do site:** o canal "Chat do site · {empresa}" é sempre criado, mesmo escolhendo outro canal ou **Conectar depois**. Para publicá-lo no site, use **Ver código de instalação** ou siga [Instalar o chat no seu site](/docs/canais/widget).
- **Conversa de teste:** com canal conectado, o Kin pede um "oi" do seu celular e exibe a resposta do agente (ou clique em **Pular o teste**). Sem canal conectado, o Kin simula um contato pelo chat do site: a conversa de teste fica na **Caixa de entrada** e nada é enviado para fora.

## Pular, voltar, retomar e acessibilidade

- **Pular:** clique em **Pular onboarding** no topo (no celular, **Pular**) e depois em **Confirmar**. Tudo o que já foi criado continua no workspace. Depois de pular ou concluir, o onboarding não volta e não existe botão para reabrir.
- **Voltar:** clique nos traços **Etapas** no topo ou na seta **Voltar à etapa anterior** para rever etapas já feitas (não duplica itens já criados).
- **Retomar:** fechar o navegador no meio retoma do início da etapa em que você parou ao entrar novamente. Se fechar no meio da etapa **Um cérebro pro atendimento**, o Kin lê o site de novo ao voltar.
- **Som e movimento:** o botão de alto-falante no topo alterna **Desligar sons** / **Ligar sons**. A tela também respeita a opção de reduzir movimento do sistema.

## Sintomas e soluções

| Sintoma | Causa | O que fazer |
| --- | --- | --- |
| O onboarding não apareceu depois do cadastro | Conta criada por convite, parceiro, modelo, marca parceira, ou o onboarding já foi concluído ou pulado | Configurar pelas páginas [Convidar sua equipe](/docs/primeiros-passos/convidar-sua-equipe), [Conectar o primeiro canal](/docs/primeiros-passos/conectar-o-primeiro-canal) e [Agentes de IA: visão geral](/docs/agente-de-ia/visao-geral) |
| Pulei o onboarding sem querer e quero abrir de novo | Depois de pulado ou concluído, o fluxo não reabre | Fazer as configurações que faltaram nas telas normais da Kinbox; tudo o que já havia sido criado foi mantido |
| O agente de IA não respondeu no teste | Agente não foi criado (**Agora não**), não foi ligado ao canal testado ou o saldo da carteira acabou | Conferir o agente e o saldo em [Agentes de IA: visão geral](/docs/agente-de-ia/visao-geral), [Ligar o agente aos canais e passar para um humano](/docs/agente-de-ia/conectar-canais) e [Saldo da carteira e créditos: o que consome](/docs/conceitos/saldo-e-creditos) |
| Não consegui conectar Telegram, E-mail ou SMS no Kin | Esses três canais não conectam dentro do onboarding | Conectar depois em **Configurações** → **Chat** → **Canais** (veja [Conectar o primeiro canal](/docs/primeiros-passos/conectar-o-primeiro-canal)) |
| Não consegui conectar o Instagram no Kin | O teste grátis não permite conectar Instagram | Assinar um plano em [Assinar ou mudar o plano](/docs/assinatura/assinar-ou-mudar-plano) e conectar depois em [Conectar o Instagram](/docs/canais/instagram) |
| "Hoje já li sites demais por aqui. Você cria a agente quando quiser em Agentes de IA." | Limite diário de 5 leituras de site por workspace atingido | Seguir sem leitura de site ou criar o agente depois em [Agentes de IA: visão geral](/docs/agente-de-ia/visao-geral) |
| Falha ao convidar um ou mais e-mails na etapa **Seu time** | E-mail digitado com erro ou sem licença livre no plano | Conferir o endereço e tentar novamente, ou convidar em **Configurações** → **Ambiente** → **Membros** (veja [Gerenciar membros](/docs/configuracoes-no-workspace/gerenciar-membros)) |
| Chat do site apareceu na lista de canais sem eu pedir | O onboarding sempre cria "Chat do site · {empresa}" para o teste inicial | Instalar no site em [Instalar o chat no seu site](/docs/canais/widget) ou gerenciar em [Canais: conectar e gerenciar](/docs/canais/visao-geral) |

Veja também [Configurar o workspace com o Kin](/docs/primeiros-passos/configurar-com-o-kin).
