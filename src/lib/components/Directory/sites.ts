import { getFacilities } from '$lib/store/facilityStore';
import { cardinalCategorizedFilteredEffectors, currentOrg, selectFacility } from '$lib/store/directoryStore.ts';
import { PUBLIC_FACILITY_ENTRIES_TTL } from '$env/static/public';
import { browser } from "$app/environment"

export const facilityEntries = async (uid:string) => {
    if (browser) {
    const cacheLife:number = parseInt(PUBLIC_FACILITY_ENTRIES_TTL);
    const cacheKey:string = `facilityEntries_${uid}`;
    const localStorageString = localStorage.getItem(cacheKey);
        if (localStorageString !== null) {
            const stored = JSON.parse(localStorageString);
            let elapsed = Date.now() - stored.cachetime;
            if (cacheLife < elapsed) {
                return new Map(stored.data);
            }
        }
    }
    selectFacility.set(uid);
    const _facilityEntries = await cardinalCategorizedFilteredEffectors.load();
    if (browser) {
        const toStore = {
            cachetime: Date.now(),
            data: Array.from(_facilityEntries.entries())
        };
        localStorage.setItem(
            `facilityEntries_${uid}`,
            JSON.stringify(toStore)
        )
    }

};

export const allFacilityEntries = async (orgUid: string) =>  {
    const facilityEntriesMap = new Map();
    const facilities = await getFacilities.load();
    for (const facility of facilities ) {
        if (facility.organizations.includes(orgUid)) {
        const entries = await facilityEntries(facility.uid);
        facilityEntriesMap.set(facility.uid, entries);
        }
    };
    return facilityEntriesMap;
}
