/*import { variables } from '$lib/utils/constants';
import { workforceSlugs } from '$lib/store/workforceStore';
import { get } from '@square/svelte-store';

const base_uri = variables.BASE_URI;


export async function GET() {
    //const slugs = get(workforceSlugs);
    const pages = [
        `contact`,
        `annuaire`,
        `sites`,
        `accounts/login`,
        `maison-de-sante/a-propos`,
        `maison-de-sante/chronologie`,
        `maison-de-sante/projet-de-sante`,
        `maison-de-sante/reunion-concertation-pluriprofessionnelle`,
        `maison-de-sante/dossier-patient`,
        `maison-de-sante/lexique`,
        `education-therapeutique`,
        `education-sante`,
        `prevention`
    ];
    const paths = pages.concat(slugs);
    const body = sitemap(paths);

    return new Response(
        body,
        {
            headers: {
                'Content-Type': 'application/xml'
            }
        }
    );
}

const sitemap = (
    paths
) => `<?xml version="1.0" encoding="UTF-8" ?>
  <urlset
    xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="https://www.w3.org/1999/xhtml"
    xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
    xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
  >
    <url>
<loc>${base_uri}</loc>
<changefreq>daily</changefreq>
<priority>0.7</priority>
</url>
${paths
    .map(
        page => `
  <url>
    <loc>${base_uri}/${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
  )
  .join('')}
  </urlset>`
  */