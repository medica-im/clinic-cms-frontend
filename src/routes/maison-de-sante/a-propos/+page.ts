import { facilityStore } from '$lib/store/facilityStore';
import { occupationsCardinal } from '$lib/store/workforceStore';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) =>  {
    const fData = await facilityStore.load();
    return {
        facilityData: fData,
        occupationsCardinal: await occupationsCardinal.load()
    };
}