import { variables } from '$lib/utils/constants';
import { workforceDataCached, occupations, occupationsCardinal } from '$lib/store/workforceStore';
import { getEffectors } from '$components/Directory/directory';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    if ( variables.ORGANIZATION_CATEGORY == "msp" ) {
        const wDC = await workforceDataCached.load();
        const o = await occupations.load();
        const oC = await occupationsCardinal.load()
        return {
            workforceDataCached: wDC,
            occupations: o,
            occupationsCardinal: oC
        };
    } else if ( variables.ORGANIZATION_CATEGORY == "cpts" ) {
        return {
            effectors: await getEffectors(fetch)
        }
    }
}