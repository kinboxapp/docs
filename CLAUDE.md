# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The Kinbox documentation site, built on [Mintlify](https://mintlify.com). Kinbox is a Brazilian CRM / omnichannel messaging platform, so **all reader-facing content is written in Brazilian Portuguese**. Pages are MDX files with YAML frontmatter; the entire site is configured by `docs.json` (no `package.json` — Mintlify provides the build via its CLI).

## Commands

```bash
mint dev                 # local preview at http://localhost:3000 (run from repo root, where docs.json lives)
mint dev --port 3333     # custom port
mint broken-links        # validate all internal links
mint update              # upgrade the CLI when local preview drifts from production
```

Install the CLI with `npm i -g mint` (requires Node 19+). There is no test/lint step beyond `mint broken-links`. Deployment is automatic: pushing to `main` (the default branch) deploys to production via the Mintlify GitHub app — there is no manual build/deploy command.

## Regenerating the API reference

The endpoint pages under `api-reference/<resource>/` (`contacts`, `messages`, `sessions`, ...) are **machine-generated from the OpenAPI spec — do not hand-edit those files.** The source of truth is `openapi.json` at the repo root (the full Kinbox API spec). Regeneration is driven from the API repo by the `deploy-api-reference` skill (`kinbox-workspace/api/.claude/skills/deploy-api-reference`):

1. `fetch-openapi.sh` pulls `/docs-json` from a running API into `openapi.json`.
2. `scrape-openapi.sh` runs `@mintlify/scraping` into a temp dir and copies only the `v1*` tag folders into `api-reference/<resource>/` (tag `v1Messages` → folder `messages`, mapping function `public_dir` in the script).
3. `check-docs-nav.ts` reports generated pages missing from `docs.json` and listed pages without a file.

Note: `api-reference/openapi.json` is a small leftover sample and is **not** the spec used for the site — the root `openapi.json` is.

## How navigation works (important)

Only the stable public **v1** API is published. Internal `/v3/*` routes exist in `openapi.json` but never get pages in the repo. **The site only exposes what is explicitly listed in `docs.json`**, so publishing a new endpoint is a two-step process:
1. Regenerate the pages (see above).
2. Add the page path to the appropriate `group.pages` array in `docs.json`. A generated file that isn't referenced in `docs.json` simply won't appear on the site.

Generated endpoint pages are minimal — they reference the OpenAPI operation by frontmatter, e.g.:

```yaml
---
openapi: get /v1/contacts
---
```

Public URLs follow the file path: `api-reference/messages/list-conversation-messages.mdx` → `developer.kinbox.com.br/api-reference/messages/list-conversation-messages`. Renaming a folder needs a `redirects` entry in `docs.json` (the old `api-reference/auto/v1<tag>/` layout is redirected this way).

The API playground server and auth are configured in `docs.json` under `api.mdx` (`server: https://platform.kinbox.com.br`, bearer auth).

## Hand-written content

- `api-reference/authentication.mdx`, `api-reference/custom-fields.mdx` — curated API concept pages (Portuguese).
- `essentials/`, `snippets/`, `quickstart.mdx`, `development.mdx`, `ai-tools/` — Mintlify starter-kit guide pages.

## Writing style (from AGENTS.md / CONTRIBUTING.md)

- Active voice, second person ("você"); one idea per sentence; sentence case for headings.
- Bold for UI elements (Click **Settings**); code formatting for file names, commands, and paths.
- Consistent terminology — don't alternate synonyms for the same concept.

For Mintlify component/configuration questions, the Mintlify skill is installed (`.claude/skills/mintlify`); invoke it rather than guessing component syntax.
