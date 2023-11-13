import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    return {
        type: params.type,
        commune: params.commune,
        effector: params.effector
    }
}