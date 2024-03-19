import { facilities } from '$lib/store/directoryStore';
import { occupationsCardinal, workforceOccupation, teamCarouselStore } from '$lib/store/workforceStore';
import { openGraphStore } from '$lib/store/openGraphStore';
import type { PageLoad } from './$types';
import { categorizedCachedEffectors } from '$lib/store/directoryStore.js';


export const load: PageLoad = async ({ data }) => {
    return {
        //facility: await facilityStore.load(),
        //websiteSchema: await websiteSchema.load(),
        //occupationsCardinal: await occupationsCardinal.load(),
        facilities: await facilities.load(),
        //workforceOccupation: await workforceOccupation.load(),
        //teamCarousel: await teamCarouselStore.load(),
        //ghost: data.ghost
        //effectors: categorizedCachedEffectors()
    };
}