import { openGraphStore } from '$lib/store/openGraphStore.ts';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({}) => {
    return {
        openGraph: await openGraphStore.load()
    };
}