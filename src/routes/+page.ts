//import { facilityStore, websiteSchema } from '$lib/store/facilityStore';
import { getAvatars } from '$lib/store/directoryStore';
//import { openGraphStore } from '$lib/store/openGraphStore';
import type { PageLoad } from './$types';
import { cardinalTypes } from '$lib/store/directoryStore';


export const load: PageLoad = async ({ data }) => {
    return {
        //facility: await facilityStore.load(),
        //websiteSchema: await websiteSchema.load(),
        //openGraph: await openGraphStore.load(),
        cardinalTypes: await cardinalTypes.load(),
        teamCarousel: await getAvatars(),
        ghost: data.ghost
    };
}