import { categorizedFilteredEffectors } from '$lib/store/directoryStore.js';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ parent, fetch }) {
    return { 
        effectors: await categorizedFilteredEffectors.load()
    }
}