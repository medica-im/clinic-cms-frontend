import { websiteSchema } from '$lib/store/facilityStore';
import { openGraphStore } from '$lib/store/openGraphStore';
import type { PageLoad } from './$types';
import { categorizedFilteredEffectors } from '$lib/store/directoryStore.ts';


export const load: PageLoad = async ({ parent }) => {
    return {
        entries: await categorizedFilteredEffectors.load(),
        //websiteSchema: await websiteSchema.load(),
        openGraph: await openGraphStore.load(),
    };
}