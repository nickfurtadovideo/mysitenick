#!/bin/sh
# Gera src/css/site.min.css e src/js/site.min.js a partir de src/_fonte (requer: npm i esbuild)
cd "$(dirname "$0")"
ESB="${ESBUILD:-npx esbuild}"
CSS="styles experience intro-refinements update-v5 update-v6 update-v7 update-v8-1 update-v8-2 update-v8-3 update-v8-4 services86 perf"
JS="projects app gallery scroll-effects ugc-data perspective-data experience intro services86 perf"
: > ../css/site.min.css; for f in $CSS; do $ESB css/$f.css --minify --loader:.css=css >> ../css/site.min.css; done
: > ../js/site.min.js;  for f in $JS;  do $ESB js/$f.js --minify >> ../js/site.min.js; echo ";" >> ../js/site.min.js; done
