#!/usr/bin/env bash
# Pede à api-v2 de produção que indexe a main no SHA informado. Ela decide sozinha o que mudou desde o último SHA
# indexado, e não esperamos a indexação terminar. A reconciliação noturna da api-v2 corrige qualquer chamada perdida.
# Antes da virada o módulo pode estar desligado (404): isso é aviso, não erro.
# Uso: HELP_INDEX_TOKEN=... HELP_API_URL=https://api4.kinbox.com.br indexar.sh <sha>
set -euo pipefail
SHA="$1"

if [ -z "${HELP_INDEX_TOKEN:-}" ]; then
  echo "::warning::Secret HELP_INDEX_TOKEN não configurado. Indexação não pedida (a reconciliação noturna cobre)."
  exit 0
fi

STATUS=$(curl -sS -o resposta.txt -w '%{http_code}' --max-time 30 \
  -X POST "${HELP_API_URL%/}/v3/help-center/index" \
  -H 'Content-Type: application/json' \
  -H "x-help-index-token: ${HELP_INDEX_TOKEN}" \
  --data "{\"sha\":\"${SHA}\"}" || echo 000)

case "$STATUS" in
  2??) echo "Indexação pedida para $SHA (HTTP $STATUS)." ;;
  404) echo "::warning::A api-v2 respondeu 404: o módulo help-center ainda não está ligado em produção." ;;
  *)
    echo "::error::A api-v2 respondeu HTTP $STATUS ao pedido de indexação: $(head -c 500 resposta.txt 2>/dev/null)"
    exit 1 ;;
esac
