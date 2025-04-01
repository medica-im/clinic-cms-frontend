import { facilitiesWithAvatar, getFacilities, websiteSchema } from '$lib/store/facilityStore.ts';
import { getAvatars } from '$lib/store/directoryStore.ts';
import { openGraphStore } from '$lib/store/openGraphStore.ts';
import type { PageLoad } from './$types';
import { cardinalTypes, currentOrg, limitCategories, selectCategories } from '$lib/store/directoryStore.ts';


export const load: PageLoad = async ({ data }) => {
    selectCategories.set([]);
    currentOrg.set(true);
    limitCategories.set([]);
    return {
        facilityCarousel: await facilitiesWithAvatar.load(),
        facilities: await getFacilities.load(),
        websiteSchema: await websiteSchema.load(),
        openGraph: await openGraphStore.load(),
        cardinalTypes: await cardinalTypes.load(),
        teamCarousel: await getAvatars.load(),
        ghost: data.ghost
    };
}