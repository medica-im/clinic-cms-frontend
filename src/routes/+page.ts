import { facilityStore, websiteSchema } from '$lib/store/facilityStore.ts';
import { occupationsCardinal, workforceOccupation, teamCarouselStore } from '$lib/store/workforceStore.ts';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ data }) => {
    return {
        facility: await facilityStore.load(),
        websiteSchema: await websiteSchema.load(),
        occupationsCardinal: await occupationsCardinal.load(),
        workforceOccupation: await workforceOccupation.load(),
        teamCarousel: await teamCarouselStore.load(),
        ghost: data.ghost
    };
}