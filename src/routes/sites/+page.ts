import { facilities } from '$lib/store/facilityStore';
import { occupationsCardinal, workforceOccupation, teamCarouselStore } from '$lib/store/workforceStore';
import { openGraphStore } from '$lib/store/openGraphStore';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
    return {
        //facility: await facilityStore.load(),
        //websiteSchema: await websiteSchema.load(),
        //occupationsCardinal: await occupationsCardinal.load(),
        facilities: await facilities.load(),
        //workforceOccupation: await workforceOccupation.load(),
        //teamCarousel: await teamCarouselStore.load(),
        //ghost: data.ghost
    };
}