#!/usr/bin/env bash
# Uploads dist/ (already built + pre-compressed by scripts/compress-dist.mjs)
# with per-category Cache-Control and Content-Encoding, then invalidates
# CloudFront. Split into multiple sync calls because aws s3 sync applies
# one set of --cache-control/--content-encoding flags per invocation, and
# these files need three different Cache-Control lifetimes crossed with
# whether they were pre-gzipped.
set -euo pipefail

BUCKET="s3://pragya-kumari-portfolio-91f561f4"
DIST_ID="E1WR599BU3HA0G"

# Root-level static files, not content-hashed: moderate cache (CloudFront
# invalidation on every deploy keeps this from serving stale content at
# the edge; this just bounds how long a returning visitor's own browser
# cache can lag behind). Left uncompressed on purpose — index.html,
# robots.txt, sitemap.xml, and the SVGs can all be fetched directly by
# non-browser tools (crawlers, link unfurlers, monitoring) that may not
# declare gzip support, unlike the hashed JS/CSS bundles below which are
# only ever loaded from inside a real browser page.
aws s3 sync dist/ "$BUCKET/" --delete \
  --cache-control "public,max-age=86400" --exclude "assets/*" --exclude "index.html"

# Hashed assets — content-addressed filenames, safe to cache forever.
aws s3 sync dist/assets/ "$BUCKET/assets/" --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "*.js" --exclude "*.css"

aws s3 sync dist/assets/ "$BUCKET/assets/" --delete \
  --cache-control "public,max-age=31536000,immutable" --content-encoding gzip \
  --exclude "*" --include "*.js" --include "*.css"

# Entry point — must always revalidate so visitors get current hashed
# asset references. Left uncompressed (see note above).
aws s3 cp dist/index.html "$BUCKET/index.html" --cache-control "no-cache"

aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths '/*'
