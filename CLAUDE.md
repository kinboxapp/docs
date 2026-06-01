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

The API reference under `api-reference/auto/` is **machine-generated from the OpenAPI spec — do not hand-edit those files.** The source of truth is `openapi.json` at the repo root (~315 KB, the full Kinbox API spec). Regenerate after the spec changes:

```bash
# from a local spec file
npx @mintlify/scraping@latest openapi-file openapi.json -o api-reference/auto

# pull a fresh spec from a running server, then scrape
curl -s http://localhost:3000/docs-json > openapi.json && npx @mintlify/scraping@latest openapi-file openapi.json -o api-reference/auto
```

Note: `api-reference/openapi.json` is a small leftover sample and is **not** the spec used for the site — the root `openapi.json` is.

## How navigation works (important)

`api-reference/auto/` contains scraped pages for the *entire* API surface (dozens of tag folders: `contatos`, `negócios`, `agents`, `copilot`, `dashboards`, internal `v3*` endpoints, etc.). **The site only exposes what is explicitly listed in `docs.json`.** Currently that is the stable public **v1** API — the `v1contacts`, `v1customfields`, `v1tags`, `v1products`, `v1deals`, `v1pipelines`, `v1campaigns` folders — plus the hand-written `api-reference/authentication` and `api-reference/custom-fields` pages.

So publishing a new endpoint is a two-step process:
1. Scrape (regenerates the `.mdx` under `api-reference/auto/...`).
2. Add the page path to the appropriate `group.pages` array in `docs.json`. A scraped file that isn't referenced in `docs.json` simply won't appear on the site.

Generated endpoint pages are minimal — they reference the OpenAPI operation by frontmatter, e.g.:

```yaml
---
openapi: get /v1/contacts
---
```

The API playground server and auth are configured in `docs.json` under `api.mdx` (`server: https://api4.kinbox.com.br`, bearer auth).

## Hand-written content

- `api-reference/authentication.mdx`, `api-reference/custom-fields.mdx` — curated API concept pages (Portuguese).
- `essentials/`, `snippets/`, `quickstart.mdx`, `development.mdx`, `ai-tools/` — Mintlify starter-kit guide pages.

## Writing style (from AGENTS.md / CONTRIBUTING.md)

- Active voice, second person ("você"); one idea per sentence; sentence case for headings.
- Bold for UI elements (Click **Settings**); code formatting for file names, commands, and paths.
- Consistent terminology — don't alternate synonyms for the same concept.

For Mintlify component/configuration questions, the Mintlify skill is installed (`.claude/skills/mintlify`); invoke it rather than guessing component syntax.
