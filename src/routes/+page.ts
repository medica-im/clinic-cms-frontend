import { facilityStore, websiteSchema } from '$lib/store/facilityStore.ts';
import { occupationsCardinal, workforceOccupation, teamCarouselStore } from '$lib/store/workforceStore';
import { openGraphStore } from '$lib/store/openGraphStore';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ data }) => {
    return {
        facility: await facilityStore.load(),
        websiteSchema: await websiteSchema.load(),
        occupationsCardinal: await occupationsCardinal.load(),
        openGraph: await openGraphStore.load(),
        workforceOccupation: await workforceOccupation.load(),
        teamCarousel: await teamCarouselStore.load(),
        ghost: data.ghost
    };
}