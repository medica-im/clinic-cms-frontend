import { getFacilities } from '$lib/store/facilityStore';
import { cardinalCategorizedFilteredEffectors, currentOrg, selectFacility } from '$lib/store/directoryStore.ts';
import { openGraphStore } from '$lib/store/openGraphStore';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    currentOrg.set(true);
    const facilityEntries = new Map();
    const facilities = await getFacilities.load();
    for (const facility of facilities ) {
        selectFacility.set(facility.uid);
        const entries = await cardinalCategorizedFilteredEffectors.load();
        facilityEntries.set(facility.uid, entries);
    };
    return {
        //websiteSchema: await websiteSchema.load(),
        facilities: facilities,
        entries: facilityEntries,
    };
}