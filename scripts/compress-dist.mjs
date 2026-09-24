// CloudFront's built-in Compress:true setting does not reliably apply to
// this distribution's responses (verified via direct curl against fresh
// cache-MISS fetches — content-encoding never appears despite the setting
// being on). Rather than depend on that, this pre-compresses eligible
// dist/ files in place so S3/CloudFront serve pre-gzipped bytes with an
// explicit Content-Encoding header set at upload time (see scripts/deploy.sh).
//
// Scoped to just the hashed .js/.css bundles under assets/, not
// index.html/robots.txt/sitemap.xml/SVGs — those are static Content-Encoding
// metadata on the S3 object, applied unconditionally regardless of the
// request's actual Accept-Encoding header, so anything fetched by a
// non-browser client that doesn't declare gzip support (crawlers, link
// unfurlers, monitoring tools) would get an unreadable response. The
// bundles are safe because they're only ever loaded via <script>/<link>
// from inside a real browser page, which always sends Accept-Encoding: gzip.
import { gzipSync } from "node:zlib";
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const COMPRESSIBLE_EXTENSIONS = new Set([".js", ".css"]);
const distDir = fileURLToPath(new URL("../dist/assets", import.meta.url));

let count = 0;

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (COMPRESSIBLE_EXTENSIONS.has(extname(fullPath))) {
      const original = readFileSync(fullPath);
      writeFileSync(fullPath, gzipSync(original, { level: 9 }));
      count += 1;
    }
  }
}

walk(distDir);
console.log(`compress-dist: gzipped ${count} file(s) in place.`);
