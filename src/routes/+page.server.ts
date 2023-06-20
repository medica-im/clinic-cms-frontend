import type { PageServerLoad } from './$types';
import { getGhostData } from '$lib/Ghost/ghost';
import { GHOST_API_KEY, GHOST_POST_COUNT } from '$env/static/private';
export const prerender = true;

let count = parseInt(GHOST_POST_COUNT);

export const load: PageServerLoad = async ({ fetch, params }) => {
    return {
        ghost: getGhostData(fetch, GHOST_API_KEY, count)
    };
};