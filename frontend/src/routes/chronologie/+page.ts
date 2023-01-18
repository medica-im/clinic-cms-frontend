import { variables } from '$lib/utils/constants';

export const prerender = false;
export const ssr = false;

const BASE_CMS_API_URI = variables.BASE_CMS_API_URI;


/** @type {import('./$types').PageLoad} */
export async function load() {
    const apiUri=`${BASE_CMS_API_URI}/pages/?type=cms.Timeline&fields=*`;
    console.log(apiUri);
    const res = await fetch(apiUri);
    const resJson = await res.json();
    console.log(JSON.stringify(resJson));
    const data = resJson.items[0].content
    console.log(JSON.stringify(data));
    return {
        timeline: data
    };
}