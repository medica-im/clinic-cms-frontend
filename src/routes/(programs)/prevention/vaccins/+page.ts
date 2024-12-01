import { facilityStore, websiteSchema } from '$lib/store/facilityStore.ts';
import { cardinalCategorizedFilteredEffectors, currentOrg, limitCategories, selectCategories, selCatVal, selectFacility, selectFacilityValue } from '$lib/store/directoryStore.ts';
import { openGraphStore } from '$lib/store/openGraphStore.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    currentOrg.set(null);
    limitCategories.set(["centre-vaccination-internationale"]);
    selectCategories.set([]);
    selCatVal.set(null);
    selectFacility.set("");
    selectFacilityValue.set(null);
    return {
        cardinal: await cardinalCategorizedFilteredEffectors.load()
    };
}