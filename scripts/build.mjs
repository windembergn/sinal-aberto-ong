// Build de produção: gera dist/ pronto para publicar.
// - JS: os módulos ES viram um único bundle minificado (formato IIFE), que também
//   funciona aberto direto do disco (file://), onde o navegador bloqueia type="module".
// - CSS: minificado.
// - Imagens: PNG/WebP recomprimidos com sharp e SVG otimizado com SVGO.
// - HTML: troca o <script type="module"> pelo bundle.
// Uso: npm run build

import { build, transform } from 'esbuild';
import sharp from 'sharp';
import { optimize } from 'svgo';
import { rm, mkdir, readFile, writeFile, readdir, copyFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const DIST = 'dist';
const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
const relatorio = [];

async function registrar(arquivo, antes, depois) {
  relatorio.push({ arquivo, antes: kb(antes), depois: kb(depois), economia: `${Math.round((1 - depois / antes) * 100)}%` });
}

await rm(DIST, { recursive: true, force: true });
await mkdir(join(DIST, 'html'), { recursive: true });
await mkdir(join(DIST, 'css'), { recursive: true });
await mkdir(join(DIST, 'js'), { recursive: true });
await mkdir(join(DIST, 'img'), { recursive: true });

// JavaScript: bundle único. O Chart.js continua externo (import() dinâmico do CDN).
const js = await build({
  entryPoints: ['js/main.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2020'],
  sourcemap: true,
  outfile: join(DIST, 'js/app.js'),
  external: ['https://*'],
  metafile: true,
  logLevel: 'warning',
});
const tamanhoFontes = Object.values(js.metafile.inputs).reduce((t, i) => t + i.bytes, 0);
await registrar(`js/ (${Object.keys(js.metafile.inputs).length} módulos) → js/app.js`, tamanhoFontes, (await stat(join(DIST, 'js/app.js'))).size);

// CSS minificado.
const cssFonte = await readFile('css/style.css', 'utf8');
const css = await transform(cssFonte, { loader: 'css', minify: true });
await writeFile(join(DIST, 'css/style.css'), css.code);
await registrar('css/style.css', Buffer.byteLength(cssFonte), Buffer.byteLength(css.code));

// Imagens: mantém a versão otimizada só se ela for menor que a original.
for (const nome of await readdir('img')) {
  const origem = join('img', nome);
  const destino = join(DIST, 'img', nome);
  const original = await readFile(origem);
  let otimizada = original;

  if (extname(nome) === '.png') {
    otimizada = await sharp(original).png({ palette: true, quality: 90, compressionLevel: 9, effort: 10 }).toBuffer();
  } else if (extname(nome) === '.webp') {
    otimizada = await sharp(original).webp({ quality: 80, effort: 6 }).toBuffer();
  } else if (extname(nome) === '.svg') {
    otimizada = Buffer.from(optimize(original.toString(), { multipass: true }).data);
  }

  const final = otimizada.length < original.length ? otimizada : original;
  await writeFile(destino, final);
  await registrar(`img/${nome}`, original.length, final.length);
}

// HTML: casca da SPA aponta para o bundle; os demais são copiados.
for (const nome of await readdir('html')) {
  let html = await readFile(join('html', nome), 'utf8');
  html = html.replace(
    '<script type="module" src="../js/main.js"></script>',
    '<script src="../js/app.js" defer></script>',
  );
  await writeFile(join(DIST, 'html', nome), html);
}
await copyFile('index.html', join(DIST, 'index.html'));

console.table(relatorio);
console.log(`Build concluído em ${DIST}/`);
