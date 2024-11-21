import { facilityStore, websiteSchema } from '$lib/store/facilityStore.ts';
import { cardinalCategorizedFilteredEffectors, selectCategories } from '$lib/store/directoryStore.ts';
import { openGraphStore } from '$lib/store/openGraphStore.ts';
import type { PageLoad } from './$types';
import { browser, building, dev, version } from '$app/environment';

export const load: PageLoad = async () => {
    if ( !browser ) {
        selectCategories.set([]);
    }
    return {
        //facility: await facilityStore.load(),
        //websiteSchema: await websiteSchema.load(),
        //occupationsCardinal: await occupationsCardinal.load(),
        //openGraph: await openGraphStore.load(),
        //workforceOccupation: await workforceOccupation.load(),
        //teamCarousel: await teamCarouselStore.load(),
        //ghost: data.ghost
        //effectors: categorizedCachedEffectors()
        cardinal: await cardinalCategorizedFilteredEffectors.load()
    };
}