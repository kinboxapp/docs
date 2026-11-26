---
title: "RD Station CRM: o que o Add oportunidade cria e casos de borda"
description: "Regras técnicas do RD Station CRM na Kinbox: campo oculto rdstation_id, formato da anotação, criação sem deduplicação, ausência de ações no bot e casos de borda."
keywords: [rd station crm, add oportunidade, rdstation_id, anotação rd station, estágio do funil, duplicação rd station crm, bot rd station crm]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/integrations/EditRdStation.tsx
  - web:src/pages/settings/integrations/rdstation/EditRdStationSettings.tsx
  - web:src/components-old/chat/side/integrationApps/RDStationApp/**
  - web:src/components-old/chat/side/integrationApps/RDStationApp/Actions.tsx
codigo:
  - web:src/pages/settings/integrations/EditRdStation.tsx
  - web:src/pages/settings/integrations/rdstation/**
  - web:src/components-old/chat/side/integrationApps/RDStationApp/**
verificado_em: 2026-11-26
---

Complemento técnico de [Integrar com o RD Station CRM](/docs/integracoes/rdstation-crm).

## Configuração e visibilidade

- **Permissão e conta:** o painel **RD Station CRM** (**Configurações** → **Integrações** → **Apps** → **RD Station CRM**) exige a permissão **Integrações** ou proprietário. Cada workspace mantém uma integração RD Station CRM.
- **Estágio do funil:** salvar em **Ajustes do RDStation** apenas devolve a etapa escolhida para o painel principal; é preciso clicar em **Salvar** no painel **RD Station CRM** para gravar.
- **Quadro na conversa:** aparece no painel **Detalhes** apenas com **Habilitar integração** ligado, e não aparece para quem tem a restrição **Esconder informações de integração** nem no modo de treino da Academia.

## O que Add oportunidade cria

- **Criação sem busca prévia:** cada clique em **Add oportunidade** cria uma negociação, um contato e uma empresa novos no RD Station CRM — a Kinbox não procura contato nem empresa já existentes no RD. Usar **Desfazer integração** e clicar em **Add oportunidade** novamente cria outra empresa e outra negociação no RD.
- **Vínculo salvo:** o primeiro uso cria automaticamente o campo personalizado oculto `rdstation_id` no contato ("Identificador usado para integração com RDStation CRM"), que guarda o vínculo com a empresa criada. **Desfazer integração** limpa apenas `rdstation_id` na Kinbox e não apaga nada no RD.
- **Formato da anotação:** logo após criar a negociação, a Kinbox grava nela uma anotação com o link da conversa e até 100 mensagens, no formato `Nome (HH:mm, dd/MM/aaaa): texto` (mensagens do contato aparecem como `"Cliente"`).
- **Bot:** não há ação pronta do bot para o RD Station CRM. A ação pronta de RD no bot é exclusiva do [RD Station Marketing](/docs/integracoes/rdstation-marketing).

## Casos de borda

- **Contato sem e-mail ou sem telefone:** a Kinbox envia os campos vazios sem aviso próprio; a aceitação depende das regras da conta no RD Station CRM.
- **Aviso de sucesso sem negociação:** em alguns erros do RD, o aviso "Oportunidade criada no RD Station CRM." pode aparecer sem que a negociação tenha sido criada. Confira no RD antes de clicar de novo em **Add oportunidade**: um novo clique cria outra negociação, outro contato e outra empresa.
- **Erro devolvido pelo RD ao criar oportunidade:** quando o RD retorna erro com a chave `error`, aparece um aviso com o texto do RD, mas o indicador de carregamento do quadro pode continuar ativo até trocar de conversa.
- **Token inválido em Configurações:** a lista **Estágio do funil** abre vazia, sem mensagem de erro.
- **Busca dentro de Estágio do funil:** digitar o nome da etapa não filtra a lista, pois a busca compara o texto com o identificador da etapa; role a lista manualmente para selecionar.
