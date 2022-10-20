import { facilityStore } from '$lib/store/facilityStore';
import { occupationsCardinal } from '$lib/store/workforceStore';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load() {
    const fData = await facilityStore.load();
    const oData = await occupationsCardinal.load();

    return {
        facilityStore: fData,
        occupationsCardinal: oData
    };
}