import { workforceDataCached, occupations } from '$lib/store/workforceStore';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load() {
    const wDC = await workforceDataCached.load();
    const o = await occupations.load();
    return {
        workforceDataCached: wDC,
        occupations: o
    };
}