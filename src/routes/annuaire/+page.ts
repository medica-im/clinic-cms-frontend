import { facilityStore, websiteSchema } from '$lib/store/facilityStore';
import { cardinalCategorizedFilteredEffectors, selectCategories } from '$lib/store/directoryStore';
import { openGraphStore } from '$lib/store/openGraphStore';
import type { PageLoad } from './$types';
import { categorizedCachedEffectors } from '$lib/store/directoryStore.js';
import { browser, building, dev, version } from '$app/environment';
import { variables } from '$lib/utils/constants';

let directory;

export const load: PageLoad = async ({ fetch }) => {
    if ( !browser ) {
        selectCategories.set([]);
    }
    const apiUrl = `${variables.BASE_API_URI}/directory/`;
    const res = await fetch(apiUrl);
    if (res.ok) {
        directory = await res.json();
    } else {
        console.error(res);
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
        cardinal: await cardinalCategorizedFilteredEffectors.load(),
        directory: directory
    };
}