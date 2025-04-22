import site from './site.json'
import { variables } from '$lib/utils/constants';


export function serializeSchema(thing) {
    return `<script type="application/ld+json">${JSON.stringify(thing, null, 2)}</script>`
}

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.title,
    url: variables.BASE_URI,
    description: site.description,
    sameAs: [
        `https://twitter.com/${site.social.twitter}`
    ],
}