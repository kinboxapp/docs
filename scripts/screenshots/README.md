# Prints da central de ajuda

Ferramentas para tirar os prints da central de ajuda no staging, sempre no workspace de documentação, com dados fictícios.

| Arquivo | Para que serve |
| --- | --- |
| `seed.ts` | Cria ou completa o workspace de documentação (`Loja Exemplo`) |
| `manifesto.yml` | Um item por print: `id`, `url`, `passos`, `alvo`, `mascarar`, `arquivo`, `paginas` |
| `capturar.ts` | Abre o staging com Playwright e gera os WebP em `images/ajuda/<secao>/<nome>.webp` |
| `staging.ts` | Login e chamadas às APIs do staging, usado pelos dois scripts |

## Antes de tudo

As credenciais do staging ficam fora do repositório. Os scripts leem `KINBOX_STAGING_EMAIL` e `KINBOX_STAGING_PASSWORD` do ambiente ou, se elas não estiverem definidas, do arquivo `~/.config/kinbox/staging.env`. Nunca escreva o e-mail ou a senha num comando.

```bash
cd scripts/screenshots
bun install
bunx playwright install chromium   # só na primeira vez
```

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
- o agente de IA `Lia`, desligado e sem canal.

Se um print precisa de um dado que o seed não tem, acrescente o dado no `seed.ts` antes de capturar.

## Captura

```bash
bun capturar.ts                    # todos os itens do manifesto
bun capturar.ts --ids tags-lista   # só os ids listados, separados por vírgula
bun capturar.ts --headed           # mostra o navegador
```

A captura faz login no staging web, entra no workspace de documentação e tira cada print com viewport de 1440×900 e `deviceScaleFactor: 2`. A sessão fica em `~/.cache/kinbox-docs-screenshots/`, fora do repositório. Se um item falhar, o print da tela inteira vai para a mesma pasta, como `erro-<id>.png`.

Depois de capturar, abra cada imagem e confira que ela mostra o que o item descreve e que não tem nenhum dado real.

## Cuidados

- Este repositório é público. Só entram prints do workspace de documentação, com dados fictícios.
- O dono do workspace é uma conta real: o nome e a foto dele aparecem no cabeçalho, nas respostas das conversas e na lista de membros. Recorte fora dessas áreas ou ponha o seletor em `mascarar`.
