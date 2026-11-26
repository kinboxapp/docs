---
title: "Tracking: chave, snippet, GTM, consentimento, eventos, UTMs, mapa de calor e retenção"
description: Detalhes do Tracking para consulta — formato do snippet, consentimento, eventos e propriedades aceitos, parâmetros de origem, cookies, mapa de calor, limites, retenção e mensagens de erro.
keywords: [tracking eventos, kbq push, consentimento granted denied, form_submitted, whatsapp_link_clicked, utm parametros, gclid fbclid, cookies _kbq, mapa de calor limite, data-kbq-private, domínio não autorizado, chave revogada]
publico: llm
tipo: referencia
fontes:
  - api:src/modules/marketing/tracking/**
  - web:src/pages/reports/Marketing/TrackingSites/index.tsx
  - web:src/pages/reports/Marketing/Tracking/TrackingHeatmap.tsx
codigo:
  - web:src/pages/reports/Marketing/TrackingSites/**
  - web:src/pages/reports/Marketing/Tracking/**
  - web:src/features/marketing-apps/**
  - api:src/modules/marketing/tracking/**
verificado_em: 2026-11-26
---

Referência técnica do app **Tracking** da Kinbox. Para o passo a passo de instalação, veja [Instalar o Tracking no site](/docs/marketing/tracking); para a leitura dos gráficos e tabelas, veja [Ler os relatórios de marketing](/docs/marketing/relatorios-de-marketing).

Condições gerais:

- Ativar o app em **Configurações** → **Integrações** → **Apps**, cadastrar sites, gerenciar chaves e testar a instalação exigem a permissão **Integrações**; ver o relatório em **Relatórios** → **Marketing** → **Tracking** exige a permissão **Gerenciar relatórios** (o proprietário pode tudo).
- Se o app **Tracking** não aparecer em **Configurações** → **Integrações** → **Apps**, ele ainda não foi liberado para o workspace: fale com o suporte.
- O Tracking não tem limite diário de consultas (diferente de Meta Ads, com 10 por dia, e Google Ads, com 3 por dia).
- O Tracking só conta visitantes que deram consentimento de analytics e mede visitantes anônimos (não identifica o contato).

## Snippet e GTM

- O **Snippet direto** tem dois blocos `<script>`:
  1. Um bloco inline que cria a fila `window.kbq` e envia `["init", { siteKey: "<chave>" }]`.
  2. Uma tag `<script async>` apontando para o endereço do script mostrado na tela.
- Use o snippet exatamente como aparece na tela: carregue o script do endereço mostrado ali, sem copiá-lo para outro arquivo ou domínio.
- No **Google Tag Manager** (GTM), o mesmo snippet entra em uma tag HTML personalizada. Se o comando de consentimento executar antes do `init`, os eventos aguardam no buffer e são enviados após o `init`.
- **dataLayer:** cada evento de produção enviado também é publicado no `dataLayer` com `event: "kinbox_<nome>"` (por exemplo, `kinbox_page_view`) e os campos `kbq_event`, `kbq_event_id`, `kbq_occurred_at` e `kbq_properties`. Eventos de sessão de teste e o sinal de instalação não entram no `dataLayer`.

## Consentimento

- O consentimento de analytics é obrigatório. Comandos aceitos:
  - `window.kbq.push(["consent", "granted"]);` — autoriza gravação no navegador e envio de eventos e mapa de calor.
  - `window.kbq.push(["consent", "denied"]);` ou `window.kbq.push(["consent", "revoked"]);` — apaga cookies e dados do Tracking no `localStorage`, limpa o buffer e a identidade em memória e interrompe a coleta.
- Antes de `granted`, nada é gravado no navegador e apenas o sinal de instalação (sem origem nem identidade) é enviado. Eventos disparados nesse intervalo ficam em um buffer em memória de até 20 eventos (o mais antigo sai quando o limite é atingido).
- Não há consentimento padrão ligado nem leitura automática de banner de cookies.

## Eventos e propriedades

- **Automáticos (após consentimento):** `page_view` (também em mudanças de rota de SPA via `pushState`, `replaceState` e `popstate`), `consent_updated` e `source_captured`.
- **Interações explícitas:** enviadas pelo site com `window.kbq.push(["track", { event: "<nome>", properties: { ... } }])`. Qualquer nome fora da lista aceita é ignorado (aliases legados `view_content`, `form_start`, `form_submit`, `generate_lead` e `contact_start` são convertidos para os nomes atuais).
- **Propriedades:** somente as propriedades listadas abaixo são guardadas (limite de 200 caracteres por valor); outras propriedades são descartadas. Evite enviar dados pessoais. Eventos duplicados com o mesmo `eventId` e a mesma chave são ignorados com segurança.

| Evento | Propriedades guardadas | Nome na tela (**Eventos**) | Entra em **Interações web** |
| --- | --- | --- | --- |
| `page_view` | — (automático) | **Pageview** | Não |
| `form_submitted` | `form_id`, `form_name` | **Formulário enviado** | Sim |
| `widget_opened` | `widget_id`, `widget_name` | **Widget aberto** | Sim |
| `whatsapp_link_clicked` | `link_url`, `label` | **Link do WhatsApp clicado** | Sim |
| `conversation_requested` | `channel`, `source` | **Conversa solicitada** | Sim |
| `consent_updated` | `status` (automático) | **Consentimento atualizado** | Não |
| `source_captured` | `source` (automático) | **Origem capturada** | Não |

## Origem: UTMs e IDs de clique

- Parâmetros lidos da URL: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`, `gclid`, `gbraid`, `wbraid` e `ctwa_clid`. Outros parâmetros são descartados; valores são cortados em 500 caracteres.
- **Orientação da tela para campanhas:** `"Nas campanhas, use utm_campaign=<campaignId> e utm_content=<adId>; apenas UTMs padronizadas e click IDs são armazenados."` Exemplo de link: `utm_source=instagram&utm_medium=paid_social&utm_campaign=black-friday`.
- **Primeira e última origem:** a primeira origem é gravada uma vez e nunca substituída; a última origem só muda quando chega uma nova origem não direta e diferente (tráfego direto não apaga a última origem).
- **Herança de origem:** eventos disparados em páginas internas sem UTM na URL herdam a última origem guardada do visitante, por isso entram na tabela **Campanhas** do relatório.
- **Referrer e página:** guarda apenas a origem (host) do referrer e o caminho da página (sem parâmetros de query).

## Cookies e sessão

A identidade anônima é gerada no navegador somente depois de `consent granted`, gravada em cookies próprios do site (`SameSite=Lax`, `Secure` em HTTPS, tentando o domínio raiz para compartilhar entre subdomínios) e espelhada em `localStorage`.

| Cookie | Finalidade | Validade / regra |
| --- | --- | --- |
| `_kbq_id` | Identificador anônimo do visitante | 400 dias |
| `_kbq_ses` | Identificador da sessão | Cookie dura 1 dia; nova sessão abre após 30 minutos de inatividade |
| `_kbq_ft` | Primeira origem de campanha | 400 dias |
| `_kbq_lt` | Última origem de campanha | 400 dias |
| `_kbq_tc` | Contador de origens do visitante | 400 dias |

## Domínios e chaves

- **Domínio = origem exata:** protocolo (`http` ou `https`) + host + porta, sem caminho e sem curinga de subdomínio. Sem protocolo, a Kinbox usa `https://`. `https://www.example.com` e `https://example.com` são sites distintos.
- **Chaves:** começam com `kb_live_`, são exclusivas do Tracking e não autenticam a API pública da Kinbox. Uma chave pode ser usada por vários sites; a mesma origem vinculada duas vezes à mesma chave é recusada.
- **Edição:** alterar o domínio ou a chave de um site volta o status para **Aguardando instalação** e limpa o último sinal e o último teste.
- **Status Com erro:** só aparece quando uma sessão de teste falha antes de o site ficar **Ativo**; um site já **Ativo** não é rebaixado por falha de teste.
- **Revogar chave:** ação definitiva; os sites vinculados deixam de enviar eventos e continuam listados. Para substituir uma chave: crie outra em **Configurações**, edite cada site que usa a chave antiga para selecionar a nova em **Chave existente**, publique e teste o novo snippet em **todos** esses sites e só então revogue a antiga.
- **Copiar snippet em chave antiga:** se a chave do site foi criada antes de o snippet poder ser recuperado, **Copiar snippet** abre "Regenerar chave de Tracking?" ("Esta chave foi criada antes do snippet poder ser recuperado. A chave anterior deixará de funcionar e uma nova será gerada para este site."). Ao clicar em **Regenerar e abrir snippet**, a chave é substituída no lugar: a anterior deixa de funcionar na hora, em todos os sites que a usam, e o snippet novo é copiado. Os sites continuam associados à mesma chave (não é preciso reassociar cada site), mas todos precisam do snippet novo instalado.
- **Excluir site:** apaga permanentemente eventos, mapa de calor e testes do site; a chave não é apagada.

## Mapa de calor

- Inicia automaticamente após o consentimento e coleta:
  - **Cliques:** posição relativa na página, elemento alvo e texto do botão/link (até 40 caracteres). Cliques dentro de `input`, `textarea`, `select`, `contenteditable`, `iframe`, `video`, `canvas` (exceto botões `submit`, `button` e `reset`) e de elementos com `data-kbq-private` não são gravados. Textos contendo `@` ou 4 ou mais dígitos seguidos são descartados.
  - **Scroll:** profundidade atingida, enviada a cada 5% de avanço.
  - **Atenção:** tempo ativo por faixa (10 faixas de 10%), apenas com a aba visível, enviado a cada 10 segundos e ao sair da página (mínimo de 1 segundo e teto de 60 segundos por envio).
- **Atributos HTML úteis:**
  - `data-kbq-private`: esconde a área da foto da página e bloqueia o registro de cliques dentro dela.
  - `data-kbq-id`: dá nome ao elemento em **Elementos mais clicados** (aceita letras, números e `_.:-`; exibe com a primeira letra maiúscula e mantém o hífen).
- **Dispositivo:** **Mobile** para largura de janela abaixo de 768 px; **Desktop** para 768 px ou mais.
- **Versões da página:** novas versões surgem quando muda a estrutura do layout (exibe até 5 versões por página).
- **Foto da página:** campos de formulário, mídia, iframes e áreas com `data-kbq-private` aparecem mascarados. Largura máxima de 1.600 px, altura máxima de 12.000 px (marca **Captura parcial** quando cortada) e tamanho máximo de 5 MB. Limite de 200 fotos novas por site a cada 24 horas; em caso de falha, nova tentativa automática após 1 hora.
- **Mensagens de estado no relatório:**
  - `"Aguardando interações consentidas para gerar o mapa de calor."`
  - `"A captura visual está sendo preparada. Os cliques já estão disponíveis."`
  - `"A captura visual falhou nesta versão da página. O mapa continua registrando interações e tentará novamente mais tarde."`
  - `"Não foi possível carregar o renderizador da captura. O mapa continua registrando interações."`
  - `"Sem cliques no período"` / `"Sem dados de scroll"`

## Retenção e limites

| Item | Regra / limite |
| --- | --- |
| Eventos de Tracking | Retidos por 90 dias (o relatório mostra no máximo os últimos 90 dias) |
| Eventos e fotos do mapa de calor | Retidos por 30 dias |
| Sessão de teste e eventos de debug | Sessão dura 15 minutos; registros apagados 24 horas após o fim |
| Fotos novas do mapa de calor | Até 200 por site a cada 24 horas |
| Mapa de calor no relatório | Até 100 páginas no seletor; até 5 versões por página; top 10 em **Elementos mais clicados**; até 5.000 células de clique |
| Tabelas da **Visão geral** | Top 20 em **Páginas visitadas** (sem a página inicial `/`), **Referrers** e **Campanhas**; 6 linhas por página |
| Buffer antes do consentimento | Até 20 eventos em memória |
| Tamanhos máximos | Nome do site/chave: 100 caracteres; domínio e página: 2.048; propriedade: 200; texto de clique: 40; valor de UTM/click ID: 500 |

## Mensagens de erro

| Mensagem | Causa | O que fazer |
| --- | --- | --- |
| `Chave de Tracking inválida ou revogada.` | A chave usada no snippet não existe ou foi revogada. | Copie o snippet atualizado do site ou vincule uma chave ativa. |
| `Este domínio já está cadastrado com essa chave.` | A mesma origem já está cadastrada usando essa chave. | Edite o site existente ou escolha outra chave. |
| `Este domínio não está autorizado para a chave informada.` / `O domínio não está autorizado para esta chave.` | A origem da página aberta (`protocolo + host + porta`) não bate com o site cadastrado (ex.: `www.` vs. sem `www.`). | Cadastre a origem exata acessada pelos visitantes. |
| `Informe uma origem completa, por exemplo https://www.exemplo.com.br.` | Domínio inválido ou informado com caminho (ex.: `/contato`). | Informe apenas protocolo e domínio, sem caminho. |
| `A URL aberta não corresponde ao domínio configurado.` | A página aberta no teste tem origem diferente da cadastrada. | Abra a URL de teste gerada para o domínio exato do site. |
| `A chave instalada não corresponde ao domínio configurado.` | O site publicado usa uma chave diferente da associada ao domínio. | Atualize o snippet no site com **Copiar snippet**. |
| `A sessão expirou após 15 minutos. Inicie um novo teste.` / `Sessão de teste expirada. Inicie um novo teste no Kinbox.` | Passaram-se mais de 15 minutos desde **Iniciar teste**. | Clique em **Iniciar novo teste**. |
| `O evento foi rejeitado porque o consentimento de analytics não foi concedido.` / `Consentimento é obrigatório para registrar eventos de Tracking.` | Evento enviado antes de `window.kbq.push(["consent", "granted"])`. | Aceite o consentimento na página e confirme o disparo no gerenciador de cookies. |
| `Limite diário de fotos de heatmap atingido para este site.` | O site atingiu 200 fotos novas de mapa de calor em 24 horas. | Aguarde a janela de 24 horas; cliques, scroll e atenção continuam sendo gravados. |

## O que o Tracking não faz

- Não identifica o contato, não possui comando de identificação de usuário e não liga visitas do site a conversas nem a negociações. Para levar a campanha do site até a conversa, use o [Redirecionador de WhatsApp](/docs/desenvolvedor/redirecionador-via-whatsapp) ou a captura de campanha do [widget](/docs/canais/widget/configuracoes).
- Não captura formulários, abertura de widget, cliques no WhatsApp nem pedidos de conversa automaticamente: cada interação precisa ser enviada pelo site via `window.kbq.push(["track", ...])`.
- Não impõe limite diário de consultas nem exige botão **Atualizar**.
