import type { PageServerLoad } from './$types';
import { getGhostData } from '$lib/Ghost/ghost';
import { GHOST_API_KEY } from '$env/static/private';
export const prerender = true;
console.log(GHOST_API_KEY);

export const load: PageServerLoad = async ({ fetch, params }) => {
    return {
        ghost: getGhostData(fetch, GHOST_API_KEY)
    };
};