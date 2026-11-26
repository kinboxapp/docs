# Prints da central de ajuda

Ferramentas para tirar os prints da central de ajuda no staging, sempre no workspace de documentação, com dados fictícios.

| Arquivo | Para que serve |
| --- | --- |
| `seed.ts` | Cria ou completa o workspace de documentação (`Loja Exemplo`) |
| `manifesto.yml` | Um item por print: `id`, `url`, `passos`, `alvo`, `mascarar`, `arquivo`, `paginas` e, opcionais, `workspace`, `largura` (janela mais estreita para telas que ficam largas demais) e `altura` (janela mais alta para modais que passam da tela) |
| `capturar.ts` | Abre o staging com Playwright e gera os WebP em `images/ajuda/<secao>/<nome>.webp` |
| `staging.ts` | Login e chamadas às APIs do staging, usado pelos dois scripts |

## Antes de tudo

As credenciais do staging ficam fora do repositório. Os scripts leem `KINBOX_STAGING_EMAIL` e `KINBOX_STAGING_PASSWORD` do ambiente ou, se elas não estiverem definidas, do arquivo `~/.config/kinbox/staging.env`. Nunca escreva o e-mail ou a senha num comando.

```bash
cd scripts/screenshots
bun install
bunx playwright install chromium   # na primeira vez e quando a versão do Playwright mudar
```

Num worktree novo, rode o `bun install` de novo: o `node_modules` não vem junto. O navegador fica em cache fora do repositório e é compartilhado.

## Seed

```bash
bun seed.ts
```

O seed encontra o workspace pelo nome e só cria o que falta, então pode rodar quantas vezes quiser. Ele cria:

- o workspace `Loja Exemplo`, com o onboarding guiado marcado como pulado;
- um canal de widget (`Chat do site`);
- 5 tags;
- 4 conversas pelo widget, com mensagens do cliente e respostas;
- 8 contatos com e-mail `@example.com` e telefone `+55 11 90000-00NN`;
- o funil `Vendas`, com 4 etapas e 6 negócios;
- 3 membros convidados (`@example.com`) e a equipe `Atendimento`;
- 3 respostas rápidas;
- o agente de IA `Lia`, desligado e sem canal;
- o bot `Atendimento inicial`, desligado, com o widget em **Canais que atende**;
- o bot `Consulta de pedido` (blocos de integração com endereços `exemplo.com`), desligado e sem canal, e o campo personalizado Json `pedido` (sessão).

Se um print precisa de um dado que o seed não tem, acrescente o dado no `seed.ts` antes de capturar.

## Captura

```bash
bun capturar.ts                    # todos os itens do manifesto
bun capturar.ts --ids tags-lista   # só os ids listados, separados por vírgula
bun capturar.ts --headed           # mostra o navegador
bun capturar.ts --explorar /settings/channels/new/whatsapp/web --clicar 'text=Opções avançadas'
                                   # salva print e HTML da tela em ~/.cache/kinbox-docs-screenshots/explorar.*
                                   # (aceita --workspace <nome>), para achar seletores antes de escrever o item
```

Passos aceitos no item: `esperar`, `clicar`, `digitar` ({seletor, texto}), `tecla`, `pausa` (ms), `passar` (passa o mouse sobre o seletor) e `arrastar` ({de, para, x, y}: arrasta um elemento até outro; `x`/`y` soltam num ponto dentro de `para`, útil para puxar a seta de um bloco do fluxograma e soltar no vazio).

Seletores que costumam funcionar no app:

- Painel lateral (drawer): `alvo` com `.ant-drawer-header` e um elemento do fim do conteúdo; o recorte vai do topo do painel até ele, sem o espaço vazio.
- Janela de confirmação: `.ant-modal-confirm .ant-modal-content`.
- Campos de formulário do antd têm `id` igual ao nome do campo (`#description`, `#phone`): bons para `mascarar`. A máscara é uma tarja sólida desenhada por cima de tudo (inclusive de modais): em print de modal, mascare só o que fica fora do recorte.

A captura faz login no staging web, entra no workspace de documentação e tira cada print com viewport de 1440×900 e `deviceScaleFactor: 2`. A sessão fica em `~/.cache/kinbox-docs-screenshots/`, fora do repositório. Se um item falhar, o print da tela inteira vai para a mesma pasta, como `erro-<id>.png`.

Depois de capturar, abra cada imagem e confira que ela mostra o que o item descreve e que não tem nenhum dado real.

## Cuidados

- Este repositório é público. Só entram prints do workspace de documentação, com dados fictícios.
- O staging pode mostrar elementos que só existem lá (ex.: um cartão "WhatsApp Cloud API" de teste na escolha do WhatsApp). Confira a tela inteira antes de escolher o recorte.
- Telas que o workspace de documentação não tem (canal de WhatsApp) podem vir do workspace de testes com `workspace: Kinbox` no item. Nesse caso `mascarar` é obrigatório (a captura recusa o item sem ele) e cada seletor precisa achar um elemento (senão o item falha): cubra nome do canal, número e qualquer nome de pessoa, e recorte só o bloco que a página usa.
- A conta de teste do staging é admin do sistema: o menu lateral mostra o item "Admin", que o cliente não vê, e o staging mostra um selo "Stag" no canto. Use `esconder` (some do print) para eles, não `mascarar`.
- O dono do workspace é uma conta real: o nome e a foto dele aparecem no cabeçalho, nas respostas das conversas e na lista de membros. Recorte fora dessas áreas ou ponha o seletor em `mascarar`.
