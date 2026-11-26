---
title: "Pipedrive: tokens por membro, campos enviados e bot"
description: "Regras técnicas do Pipedrive na Kinbox: tokens por membro, sincronização de campos personalizados, campo oculto pipedriveid, notas, ações do bot e casos de borda."
keywords: [pipedrive, token por membro, pipedriveid, campos personalizados pipedrive, salvar conversa nas notas, ações do bot pipedrive, remover token pipedrive]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/settings/integrations/EditPipedrive.tsx
  - web:src/components-old/chat/side/integrationApps/PipedriveApp/**
  - web:src/components-old/chat/side/integrationApps/PipedriveApp/Actions.tsx
  - api-v0:server/services/**
  - api-v0:server/modules/chat/**
  - api-v0:server/auxiliary/BotIntegrations.js
codigo:
  - web:src/pages/settings/integrations/EditPipedrive.tsx
  - web:src/components-old/chat/side/integrationApps/PipedriveApp/**
  - api-v0:server/services/**
  - api-v0:server/controllers/**
  - api-v0:server/modules/chat/**
verificado_em: 2026-11-26
---

Complemento técnico de [Integrar com o Pipedrive](/docs/integracoes/pipedrive).

## Tokens por membro e conta

- **Permissão e conta:** o painel **Pipedrive** (**Configurações** → **Integrações** → **Apps** → **Pipedrive**) exige a permissão **Integrações** ou proprietário. Cada workspace mantém apenas uma integração Pipedrive.
- **Token por membro:** na configuração atual, cada membro precisa do próprio token de API do Pipedrive preenchido na linha dele para usar o quadro **Pipedrive** na conversa. Sem token na linha do membro, **Add contato** fica desativado.
- **Configuração antiga:** workspaces que configuraram o Pipedrive antes do painel por membro podem ter um token único da integração. Nesse caso, o quadro usa esse token para quem não tem token próprio.
- **Habilitar integração:** desligar o interruptor esconde o quadro e também interrompe as ações do Pipedrive no bot.
- **Remover o token de um membro:** não é possível apagar um token já salvo pela tela; para retirar o token de um membro, fale com o suporte da Kinbox.
- **Visibilidade do quadro:** aparece no painel **Detalhes** apenas com **Habilitar integração** ligado, e fica oculto para quem tem a restrição **Esconder informações de integração** ou está no modo de treino da Academia.

## Vínculo, campos personalizados e notas

- **Campo de vínculo:** o primeiro uso de **Add contato** cria automaticamente o campo personalizado oculto `pipedriveid` no contato ("Identificador usado para integração com Pipedrive"). **Desfazer integração** apenas limpa `pipedriveid` na Kinbox e não apaga nada no Pipedrive.
- **Campos personalizados enviados:** em **Add contato** e **Salvar dados**, o quadro envia também campos personalizados do contato que estejam preenchidos **e** cujo nome coincida (sem diferenciar maiúsculas e minúsculas) com o nome de um campo de pessoa no Pipedrive dos tipos texto, número, e-mail ou telefone. Não há tela de mapeamento.
- **Sem importação do Pipedrive:** vincular o contato não importa dados do Pipedrive para a Kinbox; o quadro lê apenas as contagens de **Oportunidades abertas** e **Atividades abertas**.
- **Formato da nota:** **Salvar conversa nas notas** envia as últimas 100 mensagens com nome, hora e data. Mensagens do contato aparecem como `"Cliente"` e mensagens automáticas sem nome de membro aparecem como `"Sistema"`.

## Ações no bot

Disponíveis no bloco **Integração**, grupo **Outros** (veja [Chamar um sistema externo no bot](/docs/bot/integracoes-do-bot); puladas na simulação):

- **Ações listadas:** `Sincroniza contato, lead, deal, activity e notas no Pipedrive`, `Cria ou atualiza a deal no Pipedrive` e `Cria ou atualiza atividade de agenda no Pipedrive`. A gaveta do bloco não exibe campos próprios de configuração.
- **Qual token o bot usa (diferente do quadro):** o bot procura primeiro o token de um membro ligado à conversa (o membro responsável, o membro definido na ação ou o responsável do contato no Pipedrive) e as configurações padrão da integração; só depois usa o primeiro token preenchido do painel. Sem nenhum token, registra erro como mensagem de sistema na conversa.
- **Vínculo separado do quadro:** o bot guarda uma ligação própria com a pessoa do Pipedrive e, quando não existe, busca a pessoa pelo telefone. Ele não lê o campo `pipedriveid` usado pelo quadro; por isso, um contato vinculado pelo quadro pode não ser encontrado pelo bot se o telefone não coincidir.

## Casos de borda

- **Membro sem token abrindo contato já ligado:** o quadro tenta consultar a pessoa sem token e exibe o erro retornado pelo Pipedrive em um aviso.
- **Falhas silenciosas no quadro:** se o Pipedrive recusar **Add contato** ou **Salvar dados** (por exemplo, token inválido), o carregamento encerra sem exibir aviso de erro. **Criar oportunidade** também não mostra aviso de sucesso (apenas atualiza a contagem).
- **Ver no Pipedrive com token inválido:** o endereço é montado com o domínio da empresa consultado via token do membro; se o token for inválido, o link abre quebrado.
- **Listas Funil e Etapa do funil vazias em Adicionar negócio:** ocorre quando o token do membro está inválido ou sem acesso aos funis no Pipedrive.
