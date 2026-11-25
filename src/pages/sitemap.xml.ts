import { getCollection } from 'astro:content';
import { SITE } from '../data/seo';

// Fecha del último cambio real de cada página. Actualízala al editar la página:
// si lastmod cambia en cada build sin que cambie el contenido, Google deja de usarlo.
const STATIC_PAGES: [path: string, lastmod: string][] = [
  ['/', '2026-11-25'],
  ['/problema/', '2026-11-25'],
  ['/solucion/', '2026-11-11'],
  ['/nosotros/', '2026-11-11'],
  ['/producto/', '2026-11-11'],
  ['/software-para-ips/', '2026-11-25'],
  ['/agendamiento-web/', '2026-11-11'],
  ['/bot-whatsapp-citas/', '2026-11-11'],
  ['/recordatorios-citas-medicas/', '2026-11-25'],
  ['/faq/', '2026-11-25'],
  ['/panel/', '2026-11-11'],
  ['/contacto/', '2026-11-25'],
  ['/legal/politica-de-privacidad/', '2026-07-08'],
  ['/legal/terminos-de-servicio/', '2026-07-08'],
  ['/legal/proteccion-de-datos/', '2026-07-08'],
  ['/legal/cookies/', '2026-07-08'],
];

const day = (d: Date) => d.toISOString().slice(0, 10);

export async function GET() {
  const posts = await getCollection('blog');
  const postPages = posts.map((p): [string, string] => [`/blog/${p.id}/`, day(p.data.updatedDate ?? p.data.pubDate)]);
  const blogIndex: [string, string] = ['/blog/', postPages.map(([, d]) => d).sort().at(-1) ?? '2026-11-25'];

  const urls = [...STATIC_PAGES, blogIndex, ...postPages]
    .map(([path, lastmod]) => `  <url><loc>${SITE.url}${path}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
