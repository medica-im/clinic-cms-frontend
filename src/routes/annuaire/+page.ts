import { workforceDataCached, occupations, occupationsCardinal } from '$lib/store/workforceStore';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load() {
    const wDC = await workforceDataCached.load();
    const o = await occupations.load();
    const oC = await occupationsCardinal.load()
    return {
        workforceDataCached: wDC,
        occupations: o,
        occupationsCardinal: oC
    };
}