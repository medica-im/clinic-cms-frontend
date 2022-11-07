import { facilityStore } from '$lib/store/facilityStore';
import { occupationsCardinal } from '$lib/store/workforceStore';
import { openGraphStore } from '$lib/store/openGraphStore';
import { variables } from '$lib/utils/constants';

export const prerender = true;

const key = variables.GHOST_API_KEY;
const apiUrl = `https://msp-vedene.fr/blog/ghost/api/v3/content/posts/?key=${key}&fields=title,url,custom_excerpt,feature_image,feature_image_alt,published_at&limit=2`;

/** @type {import('./$types').PageLoad} */
export async function load() {
    const fData = await facilityStore.load();
    const oData = await occupationsCardinal.load();
    const openGraphData = await openGraphStore.load();
    const posts = await fetch(apiUrl);
    return {
        facility: fData,
        occupationsCardinal: oData,
        openGraph: openGraphData,
        posts: posts.json()
    };
}