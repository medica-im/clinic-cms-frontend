import { facilityStore } from '$lib/store/facilityStore';
import { occupationsCardinal } from '$lib/store/workforceStore';
import { twitterCardStore } from '$lib/store/openGraphStore';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load() {
    const fData = await facilityStore.load();
    const oData = await occupationsCardinal.load();
    const tData = await twitterCardStore.load();
    return {
        facilityStore: fData,
        occupationsCardinal: oData,
        twitterCard: tData
    };
}