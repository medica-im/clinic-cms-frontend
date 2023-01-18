import { variables } from '$lib/utils/constants';

const BASE_CMS_API_URI = variables.BASE_CMS_API_URI;


/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const apiUri=`${BASE_CMS_API_URI}/pages/?type=cms.Timeline&fields=*`;
    const res = await fetch(apiUri);
    const resJson = await res.json();
    const data = resJson.items[0].content
    return {
        timeline: data
    };
}