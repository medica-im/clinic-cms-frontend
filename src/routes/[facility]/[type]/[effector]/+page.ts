import type { PageLoad } from './$types';
import { getEffectors } from '$lib/store/directoryStore';
import { get } from '@square/svelte-store';
import { variables } from '$lib/utils/constants';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
import { dev } from '$app/environment';

const fetchCareHome = async (fetch, uid) => {
    const apiUrl = `${variables.BASE_API_URI}/carehomes/${uid}`;
    try {
        const response = await fetch(apiUrl);
        if (response?.ok) {
            const data = await response.json();
            return data;
        } else {
            const error = `HTTP Response Code: ${response?.status}`;
            console.error(error)
            throw new Error(error);
        }
    } catch (error) {
        return null;
    }
}

export const load: PageLoad = async ({ fetch, params }) => {
    const url = `${variables.BASE_API_URI}/fulleffector/${params.facility}/${params.type}/${params.effector}/`;
    let [res, error]= await handleRequestsWithPermissions(fetch,url);
    if (dev) {
        console.log(res);
        console.log(error);
    }
    //const effectors = get(getEffectors);
    //const effectors = await getEffectors.load();
    //let effector = findEffector(effectors, params)
    //let component;
    //const careHomeSlugArray = ['ehpad', 'usld'];
    /*
    if (effector.types.some(t => careHomeSlugArray.includes(t.slug))) {
        let careHomeData = await fetchCareHome(fetch, effector.effector_uid);
        effector.careHome=careHomeData;
        if (params.type == "ehpad") {
            component="careHome"
        } else if (params.type == "usld") {
            component="usld"
        }
    } else {
        component="default"
    }
    */
    return {
        //type: params.type,
        //commune: params.commune,
        //effector: params.effector,
        effector: res,
        //component: component
        component: "default"
    }
}