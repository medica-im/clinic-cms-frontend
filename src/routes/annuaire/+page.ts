import { facilityStore, websiteSchema } from '$lib/store/facilityStore';
import { cardinalCategorizedFilteredEffectors, selectCategories } from '$lib/store/directoryStore';
import { openGraphStore } from '$lib/store/openGraphStore';
import type { PageLoad } from './$types';
import { categorizedCachedEffectors } from '$lib/store/directoryStore.js';


export const load: PageLoad = async ({ data }) => {
    selectCategories.set([]);
    return {
        //facility: await facilityStore.load(),
        //websiteSchema: await websiteSchema.load(),
        //occupationsCardinal: await occupationsCardinal.load(),
        openGraph: await openGraphStore.load(),
        //workforceOccupation: await workforceOccupation.load(),
        //teamCarousel: await teamCarouselStore.load(),
        //ghost: data.ghost
        //effectors: categorizedCachedEffectors()
        cardinal: await cardinalCategorizedFilteredEffectors.load()
    };
}