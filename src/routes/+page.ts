import { websiteSchema } from '$lib/store/facilityStore.ts';
import { openGraphStore } from '$lib/store/openGraphStore.ts';
import type { PageLoad } from './$types';
import { categorizedFilteredEffectors } from '$lib/store/directoryStore.ts';


export const load: PageLoad = async ({ parent }) => {
    return {
        entries: await categorizedFilteredEffectors.load(),
        websiteSchema: await websiteSchema.load(),
        openGraph: await openGraphStore.load(),
    };
}