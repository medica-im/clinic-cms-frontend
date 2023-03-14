import { variables } from '$lib/utils/constants';
import { facilityStore } from '$lib/store/facilityStore';
import { occupationsCardinal } from '$lib/store/workforceStore';
import type { PageLoad } from './maison-de-sante/$types';

export const prerender = true;
export const ssr = true;

const BASE_CMS_API_URI = variables.BASE_CMS_API_URI;

export const load: PageLoad = async ({ fetch, params }) =>  {
    const apiUri=`${BASE_CMS_API_URI}/pages/?type=cms.HomePage&fields=*&categories=2`;
    const res = await fetch(apiUri);
    const resJson = await res.json();
    const data = resJson.items[0]
    const fData = await facilityStore.load();
    return {
        cms: data,
        facilityData: fData,
        occupationsCardinal: await occupationsCardinal.load()
    };
}