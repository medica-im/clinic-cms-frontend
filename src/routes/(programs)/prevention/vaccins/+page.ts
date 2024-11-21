import { facilityStore, websiteSchema } from '$lib/store/facilityStore.ts';
import { cardinalCategorizedFilteredEffectors, currentOrg, limitCategories, selectCategories } from '$lib/store/directoryStore.ts';
import { openGraphStore } from '$lib/store/openGraphStore.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    selectCategories.set([]);
    currentOrg.set(null);
    limitCategories.set(["Centre de vaccination internationale"]);
    return {
        cardinal: await cardinalCategorizedFilteredEffectors.load()
    };
}