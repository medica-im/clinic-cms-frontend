import { facilityStore, websiteSchema } from '$lib/store/facilityStore';
import { occupationsCardinal, workforceOccupation, teamCarouselStore } from '$lib/store/workforceStore';
import { openGraphStore } from '$lib/store/openGraphStore';
import { variables } from '$lib/utils/constants';
import type { PageLoad } from './$types';

export const prerender = true;

const key = variables.GHOST_API_KEY;
const apiUrl = `https://msp-vedene.fr/blog/ghost/api/v3/content/posts/?key=${key}&fields=title,url,custom_excerpt,feature_image,feature_image_alt,published_at&limit=2`;

export const load: PageLoad = async ({ fetch, params }) => {
    const fData = await facilityStore.load();
    const websiteSchemaData = await websiteSchema.load();
    const oData = await occupationsCardinal.load();
    const openGraphData = await openGraphStore.load();
    const posts = await fetch(apiUrl);
    const wO = await workforceOccupation.load();
    const tCS = await teamCarouselStore.load();
    return {
        facility: fData,
        websiteSchema: websiteSchemaData,
        occupationsCardinal: oData,
        openGraph: openGraphData,
        posts: posts.json(),
        workforceOccupation: wO,
        teamCarousel: tCS 
    };
}