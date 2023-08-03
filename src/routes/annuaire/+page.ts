import { getEffectors } from '$components/Directory/directory';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    return { 
        effectors: await getEffectors(fetch)
    }
}