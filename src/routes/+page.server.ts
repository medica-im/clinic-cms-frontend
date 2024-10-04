import type { PageServerLoad } from './$types';
import { getGhostData } from 'clinic-cms';
import { GHOST_API_KEY, GHOST_POST_COUNT } from '$env/static/private';
import { PUBLIC_BLOG_URI } from '$env/static/public';
export const prerender = true;

let count = parseInt(GHOST_POST_COUNT);

export const load: PageServerLoad = async ({ fetch }) => {
    return {
        ghost: await getGhostData(fetch, PUBLIC_BLOG_URI, GHOST_API_KEY, count)
    };
};