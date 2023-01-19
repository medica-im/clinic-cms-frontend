import { variables } from '$lib/utils/constants';
import type { PageLoad } from './$types';

const BASE_CMS_API_URI = variables.BASE_CMS_API_URI;

export const load: PageLoad = async ({ fetch, params }) => {
    const apiUri=`${BASE_CMS_API_URI}/pages/?type=cms.Timeline&fields=*`;
    const res = await fetch(apiUri);
    const resJson = await res.json();
    const data = resJson.items[0].content
    return {
        timeline: data
    };
}