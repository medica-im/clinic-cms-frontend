import { variables } from '$lib/utils/constants';
import { facilityStore } from '$lib/store/facilityStore';
import { cardinalTypes } from '$lib/store/directoryStore';
import type { PageLoad } from './$types';

const BASE_CMS_API_URI = variables.BASE_CMS_API_URI;

export const load: PageLoad = async ({ fetch, params }) =>  {
    const fData = await facilityStore.load();
    return {
        facilityData: fData,
        cardinalTypes: await cardinalTypes.load()
    };
}