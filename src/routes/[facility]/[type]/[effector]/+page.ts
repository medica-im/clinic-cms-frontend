import type { PageLoad } from './$types';
import { variables } from '$lib/utils/constants';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
import { dev } from '$app/environment';

export const load: PageLoad = async ({ fetch, params }) => {
    const apiUrl = `${variables.BASE_API_URI}/fulleffector/${params.facility}/${params.type}/${params.effector}/`;
    let [res, error]= await handleRequestsWithPermissions(fetch,apiUrl);
    if (dev) {
        console.log(res);
        console.log(error);
    }
    return {
        effector: res,
        component: "default",
    }
}