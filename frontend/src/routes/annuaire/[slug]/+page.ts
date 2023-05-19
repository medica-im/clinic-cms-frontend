import { get } from '@square/svelte-store';
import type { PageLoad } from './$types';
import {
    workforceDataCached,
    occupations,
    occupationsCardinal,
    filteredOccupationsCardinal,
    selectOccupations,
    workforceOccupation,
    slugAddressbook,
    keyAddressbook } from '$lib/store/workforceStore';

export const load: PageLoad = async ({ fetch, params }) => {
    slugAddressbook.set(params.slug);
    //console.log(get(slugAddressbook));
    const keyOccupation = await keyAddressbook.load();
    //console.log(keyOccupation);
    selectOccupations.set([keyOccupation]);
    //console.log(get(selectOccupations));
    const sOC = await filteredOccupationsCardinal.load();
    //console.log(sOC);
    return {
        selectedOccupationsCardinal: sOC,
        slug: params.slug,
        key: keyOccupation,
        workforceDataCached: await workforceDataCached.load()
    };
}