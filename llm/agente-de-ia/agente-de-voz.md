---
title: "Agente de voz: plano, saldo, franquia, teste de 10 minutos e coexistência"
description: Regras do agente de voz da Kinbox para ligações do WhatsApp oficial, com requisitos, mensagens da tela, cobrança por minuto sem valores, franquia do plano, coexistência e limites do teste por voz.
keywords: [agente de voz não atende, ligação whatsapp ia, coexistência ligações, plano de ligações whatsapp, saldo ligação, franquia, teste de 10 minutos, ligação encerrada saldo, quando a ia atende]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/agents/voice/VoiceConnectionsBlock.tsx
  - web:src/pages/agents/voice/AgentVoiceTestCall.tsx
  - web:src/pages/agents/voice/useVoiceCallingSettings.ts
  - web:src/pages/settings/channels/whatsappCloud/WhatsappCallingAiSettings.tsx
  - api:src/modules/whatsapp-calling/whatsapp-call-ai.service.ts
codigo:
  - web:src/pages/agents/voice/**
  - web:src/lib/agentVoice.ts
  - web:src/lib/whatsappCall.ts
  - web:src/components/whatsappCall/VoicePlanRequiredModal.tsx
  - web:src/pages/settings/channels/whatsappCloud/WhatsappCallingAiSettings.tsx
  - api:src/modules/whatsapp-calling/**
verificado_em: 2026-11-26
---

Referência técnica complementar da página humana "Agente de voz para as ligações do WhatsApp (Beta)" (`/docs/agente-de-ia/agente-de-voz`).

## Requisitos e mensagens exatas

| Requisito | Regra e mensagens exatas |
| --- | --- |
| Recurso em teste liberado | Sem a liberação no workspace, **Agente de voz** não aparece na criação e a aba **Ligações** (**Beta**) não aparece no canal. A API retorna `"Ligações do WhatsApp ainda não estão liberadas para este workspace"`. |
| Canal **WhatsApp oficial** | Apenas canais oficiais aparecem em **Conectar WhatsApp Oficial**: `"Agentes de voz atendem ligações do WhatsApp Oficial. Os outros canais não recebem ligações."`. |
| Sem coexistência | Número em coexistência com o app WhatsApp Business exibe `"Coexistência: a Meta não oferece ligações"` e não pode ser selecionado. Ao tentar: `"Em coexistência com o app WhatsApp Business: {{channels}}. A Meta não oferece ligações nesse modo."`. |
| Plano de **Ligações WhatsApp** | Sem plano, abre a janela **Ligações pelo WhatsApp**: `"Para usar as ligações, o ambiente precisa assinar um dos planos de Ligações WhatsApp."`, com **Ver planos** (para quem tem acesso financeiro) ou `"Peça para o gestor do ambiente assinar um plano de Ligações WhatsApp em Configurações > Assinatura."`. |
| Tipo do agente | Escolhido na criação (`"O tipo não muda depois: cada um tem recursos próprios"`). Um agente de texto não atende ligações: `"Só agentes de voz podem atender ligações. Crie um agente de voz em Agentes de IA."`. Sem agente escolhido no canal: `"Escolha o agente de IA que vai atender"`. |
| Permissões | **Agentes de IA** para criar e conectar; **Gerenciar Canais** para configurar na aba **Ligações** do canal. |
| Conexão de canais | Um agente de voz por número (**Trocar o agente que atende**). O agente de voz não cria bot de mensagens nem responde mensagens de texto. Com um canal já conectado, o botão de adicionar não aparece no cartão **Canais conectados** — para adicionar outro WhatsApp, clique no selo do topo (**Atendendo ligações em...**). |

## Quando a IA atende (comportamento real do código)

A configuração fica na aba **Ligações** do canal oficial → cartão **IA atende as ligações** → **Quando a IA atende**:

- **Quando a conversa não tem atendente disponível** (padrão): se a conversa tem um responsável disponível para atender, a ligação toca **apenas para ele** e a IA não atende (mesmo que ele não atenda). Se a conversa não tem responsável disponível, a IA atende **na hora**, mesmo havendo outros membros disponíveis na equipe. (Atenção: o texto exibido no agente diz `"Atende quando ninguém da equipe está disponível"`, mas a regra que vale é esta.)
- **Quando ninguém atende a tempo:** toca para a equipe e a IA atende após **Esperar antes da IA** (`5` a `45` segundos, padrão `20`). Se não houver ninguém para tocar, a IA atende na hora.
- **Sempre:** a IA atende na hora.

Em qualquer das opções, se o workspace estiver sem plano de **Ligações WhatsApp** ou sem franquia/saldo suficiente, a IA não entra e a ligação toca para a equipe normalmente.

## Capacidades, idioma e transferência na ligação

- Usa apenas **Instruções**, **Conhecimento** (consulta até **6 trechos** por pergunta), **Idioma** (**Detectar automaticamente** ou **Sempre falar em um idioma**: Português (Brasil), Inglês, Espanhol, Francês, Italiano, Alemão), **Voz** e **Boas-vindas** (até 500 caracteres). Não possui fluxograma, etapas nem ferramentas de CRM, e não faz ligações de saída.
- **Pedir um atendente:** quando o contato pede uma pessoa, a ligação toca para a equipe; se ninguém assumir em **45 segundos**, a IA retorna e avisa o contato que a equipe vai retornar. Se a IA falhar ao entrar na chamada, a equipe é chamada.
- **Encerrar a ligação:** a IA pode encerrar a chamada.

## Custo, franquia e saldo mínimo (sem preço por minuto)

- Cada minuto em que a IA fica na ligação é cobrado com arredondamento para cima (mínimo **1 minuto**), descrição `"Ligação atendida por IA"` (categoria **Voz e áudio** no relatório **Saldo**). Nunca citar preço por minuto.
- **Franquia do plano:** planos de **Ligações WhatsApp** que incluem minutos de IA usam a franquia primeiro; o excedente é debitado da carteira. Planos sem minutos de IA debitam por minuto direto da carteira.
- **Saldo mínimo sem franquia:** quando não há franquia cobrindo a ligação, a IA só atende se o saldo da carteira estiver acima de **R$ 0,50**.
- **Saldo acabando durante a chamada:** há um aviso **30 segundos antes** e a ligação é encerrada, registrando na conversa `"Ligação encerrada: o saldo de ligações (franquia do plano e carteira) acabou."`.

## Teste por voz (Simulação de ligação)

- Limite de **10 minutos** por teste. No último minuto exibe `"O teste encerra em {{seconds}}s"`; ao fim, `"O teste chegou ao limite de 10 minutos"`.
- **Não cria ligação real, não cobra, não exige plano nem saldo e não chama atendentes.** Apenas um teste ativo por pessoa por vez (abrir outro encerra o anterior).
- Usa as instruções, o idioma e o conhecimento do agente, mas **não usa a voz nem as Boas-vindas configuradas no canal** (usa sempre a voz padrão e sem saudação inicial).
- Mensagens de encerramento: `"Você encerrou a ligação"`, `"A IA encerrou a ligação"`, `"A IA transferiria para um atendente"`, `"A IA saiu da ligação"`, `"Não deu para testar"`.
- Mensagens de erro: `"Permita o uso do microfone no navegador para testar por voz."`, `"Não foi possível iniciar o teste por voz."`, `"O serviço de voz está fora do ar. Tente de novo em alguns minutos."`.

## O que fica na conversa e quem pode assumir

- Painel **Ligação do WhatsApp com IA** na conversa: **Ouvir**, **Assumir**, transcrição ao vivo e **Enviar para a IA** (se a IA já saiu, retorna `"A IA não está mais na ligação"`).
- **Quem pode entrar ou assumir:** membros para quem a ligação toca (responsável disponível ou quem vê a conversa sem responsável), dono do workspace e quem tem acesso a todas as conversas. Demais recebem `"Você não pode entrar nesta ligação"`.
- Erros ao assumir: `"Outro atendente já assumiu esta ligação"` e `"Você já está em outra ligação"`.
- Registro final na conversa: `"Atendida por {{name}}"` ou `"Atendida por {{name}}, depois por um atendente"`, **Resumo da IA** e transcrição (falas Cliente, nome do agente e Atendente) quando a gravação não trouxe transcrição própria.
