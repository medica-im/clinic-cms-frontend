import { facilityStore, websiteSchema } from '$lib/store/facilityStore';
import { occupationsCardinal, workforceOccupation, teamCarouselStore } from '$lib/store/workforceStore';
import { openGraphStore } from '$lib/store/openGraphStore';
import type { PageLoad } from './$types';
import { cardinalTypes } from '$lib/store/directoryStore';


export const load: PageLoad = async ({ data }) => {
    return {
        //facility: await facilityStore.load(),
        //websiteSchema: await websiteSchema.load(),
        //occupationsCardinal: await occupationsCardinal.load(),
        //openGraph: await openGraphStore.load(),
        cardinalTypes: await cardinalTypes.load(),
        //workforceOccupation: await workforceOccupation.load(),
        //teamCarousel: await teamCarouselStore.load(),
        ghost: data.ghost
        //effectors: categorizedCachedEffectors()
    };
}