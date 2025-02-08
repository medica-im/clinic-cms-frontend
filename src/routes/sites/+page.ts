import { getFacilities } from '$lib/store/facilityStore';
import { currentOrg } from '$lib/store/directoryStore.ts';
import { openGraphStore } from '$lib/store/openGraphStore';
import { allFacilityEntries } from '$lib/components/Directory/sites.ts';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({parent}) => {
    currentOrg.set(true);
    const { organization } = await parent();
    return {
        //websiteSchema: await websiteSchema.load(),
        facilities: await getFacilities.load(),
        entries: await allFacilityEntries(organization.uid),
    };
}