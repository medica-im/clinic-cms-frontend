import type { PageLoad } from './$types';
import { getEffectors } from '$lib/store/directoryStore';
import { get } from '@square/svelte-store';
import { variables } from '$lib/utils/constants';

function findEffector(effectors, params) {
    return effectors.find(e => e.commune.slug==params.commune && e.types.some(t => t.slug==params.type) && e.slug==params.effector)
}

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
    //const effectors = get(getEffectors);
    const effectors = await getEffectors.load();
    let effector = findEffector(effectors, params)
    let component;
    const careHomeSlugArray = ['ehpad', 'usld'];
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
    return {
        //type: params.type,
        //commune: params.commune,
        //effector: params.effector,
        effector: effector,
        component: component
    }
}