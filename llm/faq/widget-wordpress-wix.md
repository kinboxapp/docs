---
title: Como instalo o widget no WordPress ou no Wix?
description: A Kinbox não tem plugin nem app para WordPress, Wix ou outras plataformas de site; o widget é instalado colando o código antes da tag </body> em todas as páginas.
keywords: [widget wordpress, widget wix, plugin widget kinbox, instalar chat no wordpress, instalar chat no wix, código personalizado, html do site, shopify, nuvemshop, webflow]
publico: llm
tipo: faq
fontes:
  - web:src/pages/settings/widget/index.tsx
  - widget:src/widget.ts
codigo:
  - web:src/pages/settings/channels/widget/**
  - web:src/pages/settings/channels/AddChannel.tsx
  - web:src/pages/settings/channels/index.tsx
  - web:src/pages/settings/widget/index.tsx
  - web:src/pages/settings/widget/RenameWidgetModal.tsx
  - api:src/modules/channels/widget/widget.service.ts
  - api:src/modules/channels/widget/widget.controller.ts
  - widget:src/widget.ts
verificado_em: 2026-11-26
---

## Pergunta

Como instalo o widget no WordPress ou no Wix?

## Resposta

A Kinbox não tem plugin nem app para WordPress, Wix ou outras plataformas de site; o widget é instalado colando o código.

Para instalar:

1. Crie ou abra o widget em **Configurações** → **Chat** → **Canais** e, no cartão **Instalação**, clique em **Copiar código**.
2. Cole o código antes da tag `</body>` em todas as páginas do seu site.
3. Em plataformas que não deixam editar o HTML diretamente, use a opção da própria plataforma para acrescentar código ao site (como rodapé ou código personalizado), configurada para carregar em todas as páginas. Se a plataforma não aceitar código personalizado no site, não há outra forma de instalar o widget.
4. Se **Restringir domínio** estiver ligado nos ajustes do widget, cadastre o endereço exato do site publicado (com `https://`, com ou sem `www` conforme o site abre, sem barra no fim e sem caminho).

Se você não tem acesso ao código ou às configurações do site, envie o código copiado para a pessoa que cuida dele. Veja o passo a passo em [Instalar o chat no seu site](/docs/canais/widget) e, se o chat não aparecer, veja [O chat não aparece no meu site](/docs/canais/widget/problemas-comuns).

## Variações

- existe plugin da kinbox para wordpress
- tem app do chat da kinbox no wix
- como colocar o chat da kinbox em site feito no wordpress
- dá para instalar o widget sem mexer no html
- onde colo o código do chat em construtor de site
- posso instalar o widget no wix sem plugin
