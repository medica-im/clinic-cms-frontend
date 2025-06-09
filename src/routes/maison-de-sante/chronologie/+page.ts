import { organizationStore } from '$lib/store/facilityStore';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async ({ fetch, params }) => {
    const response = await fetch(`../json/chronology.json`);
    const chronologyJson  = await response.json();
    const chronologyData = chronologyJson.items[0].content;
    return {
        timeline: chronologyData,
        facilityData: await organizationStore.load()
    };
}