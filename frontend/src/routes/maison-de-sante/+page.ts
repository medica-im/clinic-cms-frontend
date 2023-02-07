import { variables } from '$lib/utils/constants';
import { facilityStore } from '$lib/store/facilityStore';

import type { PageLoad } from './$types';

export const prerender = false;
export const ssr = false;

const BASE_CMS_API_URI = variables.BASE_CMS_API_URI;

export const load: PageLoad = async ({ fetch, params }) =>  {
    const apiUri=`${BASE_CMS_API_URI}/pages/?type=cms.HomePage&fields=*&categories=2`;
    const res = await fetch(apiUri);
    const resJson = await res.json();
    const data = resJson.items[0]
    const fData = await facilityStore.load();
    return {
        about: data,
        facilityData: fData
    };
}