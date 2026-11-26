---
title: "VoIP: saldo mínimo, transcrição, número com nono dígito e erros"
description: Regras da ligação por telefone (VoIP) na Kinbox, com o saldo mínimo, como a cobrança e a transcrição funcionam, como o número é ajustado, o SIP reserva e as mensagens de erro.
keywords: [voip, saldo mínimo voip, você precisa ter mais saldo na carteira para fazer chamadas, seu saldo acabou a chamada será encerrada, você não tem permissão para fazer chamadas voip, nono dígito, número de telefone não informado, transcrever, não foi possível transcrever a chamada, sip reserva, falha conexão voz]
publico: llm
tipo: referencia
fontes:
  - web:src/components/whatsappCall/CallContactButton.tsx
  - web:src/components-old/chat/side/DetailsTitle.tsx
  - web:src/pages/settings/channels/voip/VoipCall.tsx
  - web:src/pages/settings/channels/voip/CallModal.tsx
  - web:src/pages/settings/channels/voip/VoipCallDetailsDrawer.tsx
  - api:src/modules/voip/voip.service.ts
  - web:src/pages/settings/channels/voip/voip.helper.ts
  - api:src/modules/copilot/copilot.service.ts
codigo:
  - web:src/components/whatsappCall/CallContactButton.tsx
  - web:src/components-old/chat/side/DetailsTitle.tsx
  - web:src/pages/settings/channels/voip/**
  - web:src/pages/settings/voip/**
  - web:src/pages/inbox/MessageVoipCall.tsx
  - api:src/modules/voip/**
  - api:src/modules/copilot/copilot.service.ts
verificado_em: 2026-11-26
---

Detalhes de referência da página [Ligar para um contato por telefone (VoIP)](/docs/canais/ligacoes/ligar-por-telefone).

## Quem pode e onde o botão aparece

- **Ligar por VoIP:** exige ser proprietário do workspace ou ter a permissão **Pode ligar para o contato** ([Referência de permissões](/docs/administracao/referencia-de-permissoes)). Não exige plano de ligações.
- **Configurar VoIP:** a tela **Configurações** → **Chat** → **Voip** exige **Gerenciar Canais** ou proprietário, e os ajustes valem para o workspace inteiro (veja [Configurações de VoIP: gravação, resumo por IA e SIP reserva](/docs/canais/ligacoes/configuracoes-voip)).
- **Navegador:** as ligações são feitas na Kinbox pelo navegador, usando o microfone do computador.
- **Não recebe ligações:** o VoIP da Kinbox apenas faz ligações para o telefone do contato e não recebe ligações telefônicas (veja [Ligações na Kinbox: WhatsApp oficial e telefone](/docs/canais/ligacoes/visao-geral)).
- **Comportamento do botão de telefone na conversa:**
  - Aparece no painel do contato quando o contato tem telefone cadastrado **ou** quando a conversa é de canal de WhatsApp oficial com o recurso de ligações liberado.
  - Em conversa de **WhatsApp oficial com o recurso liberado**, o botão abre um menu com **Ligar pelo WhatsApp** e **Ligar por telefone (VoIP)** (para quem tem a permissão de VoIP).
  - Nas **demais conversas** (qualquer canal, desde que o contato tenha telefone no cadastro), clicar no botão inicia a ligação VoIP diretamente, sem menu.
  - Sem a permissão **Pode ligar para o contato** e sem ligação pelo WhatsApp possível naquela conversa, o botão fica desativado com a dica `"Você não tem permissão para fazer chamadas de voz."`.
- A ligação VoIP independe do canal da conversa (usa o telefone cadastrado no contato) e permite apenas uma ligação por vez (`"Encerre a ligação atual antes de iniciar outra"`).

## Saldo mínimo e cobrança

- **Saldo mínimo para iniciar:** é preciso ter pelo menos **R$ 0,60** de [saldo na carteira](/docs/conceitos/saldo-e-creditos) para iniciar uma ligação VoIP. Abaixo disso, aparece `"Você precisa ter mais saldo na carteira para fazer chamadas."`.
- **Encerramento por saldo baixo:** durante a chamada, se o saldo da carteira estiver em **R$ 0,50 ou menos** no momento de uma cobrança, a ligação é encerrada (com o aviso `"Seu saldo acabou. A chamada será encerrada."` e a cobrança daquele minuto).
- **Cobrança:** cobrada por minuto, a partir do atendimento do contato. Ligações não atendidas não são cobradas. Na carteira e no relatório de saldo, o lançamento aparece como `"Voip"`. Para recarregar, veja [Adicionar saldo e créditos de SMS](/docs/assinatura/adicionar-saldo).

## Formatação do número e nono dígito

- Antes de iniciar a chamada, a Kinbox limpa o telefone do cadastro do contato removendo símbolos, o prefixo internacional `"00"` e zeros à esquerda.
- Em números do Brasil (com código `55` ou com DDD seguido de 8 ou 9 dígitos), quando o número local tem 8 dígitos e começa com `6`, `7`, `8` ou `9`, a Kinbox insere o nono dígito (`9`) automaticamente.
- Outros formatos recebem apenas o prefixo `+`.
- Se o telefone estiver vazio, a tentativa falha com `"Número de telefone não informado"`.

## Mensagens de erro

| Mensagem | Quando aparece |
| --- | --- |
| `"Você não tem permissão para fazer chamadas voip."` | Tentativa de ligar sem a permissão **Pode ligar para o contato**. |
| `"Você não tem permissão para fazer chamadas de voz."` (dica no botão desativado) | Sem a permissão **Pode ligar para o contato** e sem ligação pelo WhatsApp disponível na conversa. |
| `"Você precisa ter mais saldo na carteira para fazer chamadas."` | Saldo na carteira abaixo de **R$ 0,60** ao tentar iniciar. |
| `"Encerre a ligação atual antes de iniciar outra"` | Já existe outra ligação (VoIP ou WhatsApp) em andamento. |
| `"Seu saldo acabou. A chamada será encerrada."` | Saldo na carteira chegou a **R$ 0,50 ou menos** durante a ligação. |
| `"Saldo insuficiente."` | Saldo insuficiente durante ligação com **Usar SIP reserva** ativado. |
| `"Falha conexão voz"` | Falha na conexão de voz com **Usar SIP reserva** ativado. |
| `"Número de telefone não informado"` | Contato sem telefone informado ao tentar iniciar a chamada. |
| Janela da ligação fecha sem aviso | Acesso ao microfone bloqueado ou negado no navegador. |
| `"Saldo insuficiente"` | Saldo da carteira de **R$ 0,20 ou menos** ao clicar em **Transcrever**. |
| `"Não foi possível transcrever a chamada"` | Erro ao processar a transcrição da gravação. |
| `"Não há gravação disponível"` / `"Verifique se a gravação está habilitada no canal de voip."` | Abertura do painel **Ligação de voz** de uma chamada sem áudio gravado. |

## Transcrição e resumo

- A transcrição no VoIP é **manual**: abra a mensagem **Ligação de voz** na conversa e clique em **Transcrever** (disponível quando a ligação foi gravada).
- A transcrição é feita em **português** e gera a **Transcrição** (falas separadas por pessoa com horário; clicar em uma fala leva o áudio até aquele ponto) e o **Resumo** com sentimento (**Positivo**, **Negativo** ou **Neutro**).
- **Custo e saldo mínimo:** a transcrição gasta saldo da carteira por minuto de áudio arredondado para cima (lançamento `"Transcrição de chamada de voz"`) e o resumo gasta saldo de IA (lançamento `"Resumo da transcrição de chamada de voz"`). É necessário ter saldo **acima de R$ 0,20** na carteira para iniciar a transcrição.
- As gravações podem ser baixadas em **Baixar áudio** (no painel **Ligação de voz**) ou em **Relatórios** → **Ligações** (**Baixar** / **Ver**, filtro `"Telefone (VoIP)"`), com o nome de arquivo `ligacao-voip-<id>.<extensão>`.

## SIP reserva

- A opção **Usar SIP reserva** em **Configurações** → **Chat** → **Voip** direciona todas as ligações VoIP do workspace para uma rota reserva para uso quando o VoIP estiver fora do ar.
- Na rota reserva, **a gravação não é feita** (mesmo com **Gravar chamadas** ligado) e os avisos de erro passam a ser `"Saldo insuficiente."` e `"Falha conexão voz"`.

## Registro na conversa e estados

- Cada ligação VoIP cria a mensagem **Ligação de voz** na conversa aberta (não enviada ao contato), com os estados: `"Chamando..."`, `"Em andamento"`, duração da chamada concluída, `"Não atendeu"` ou `"Ligação falhou"`.
- Se uma ligação permanecer em `"Chamando..."` por mais de **10 minutos** sem atualização, a mensagem passa automaticamente a mostrar `"Não atendeu"`.
