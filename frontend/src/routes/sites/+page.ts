import { facilityStore } from '$lib/store/facilityStore';
import { occupationsCardinal } from '$lib/store/workforceStore';
import { openGraphStore } from '$lib/store/openGraphStore';
import { variables } from '$lib/utils/constants';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load() {
    const fData = await facilityStore.load();
    return {
        facilityData: fData,
    };
}