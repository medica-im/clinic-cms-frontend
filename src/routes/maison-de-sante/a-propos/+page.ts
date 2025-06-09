import { organizationStore } from '$lib/store/facilityStore';
import { cardinalTypes } from '$lib/store/directoryStore';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) =>  {
    const fData = await organizationStore.load();
    return {
        facilityData: fData,
        cardinalTypes: await cardinalTypes.load()
    };
}