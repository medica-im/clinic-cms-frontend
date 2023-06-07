import { variables } from '$lib/utils/constants';
import { facilityStore } from '$lib/store/facilityStore';
import { occupationsCardinal } from '$lib/store/workforceStore';
import type { PageLoad } from './$types';

const BASE_CMS_API_URI = variables.BASE_CMS_API_URI;

export const load: PageLoad = async ({ fetch, params }) =>  {
    const fData = await facilityStore.load();
    return {
        facilityData: fData,
        occupationsCardinal: await occupationsCardinal.load()
    };
}