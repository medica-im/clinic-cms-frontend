import { facilitiesWithAvatar, facilities, websiteSchema } from '$lib/store/facilityStore.ts';
import { getAvatars } from '$lib/store/directoryStore.ts';
import { openGraphStore } from '$lib/store/openGraphStore.ts';
import type { PageLoad } from './$types';
import { cardinalTypes } from '$lib/store/directoryStore';


export const load: PageLoad = async ({ data }) => {
    return {
        facilityCarousel: await facilitiesWithAvatar(),
        facilities: await facilities.load(),
        websiteSchema: await websiteSchema.load(),
        openGraph: await openGraphStore.load(),
        cardinalTypes: await cardinalTypes.load(),
        teamCarousel: await getAvatars(),
        ghost: data.ghost
    };
}