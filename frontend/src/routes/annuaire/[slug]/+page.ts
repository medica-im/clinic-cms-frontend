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
    const keyOccupation = await keyAddressbook.load();
    selectOccupations.set([keyOccupation]);
    const sOC = await filteredOccupationsCardinal.load();
    return {
        selectedOccupationsCardinal: sOC,
        slug: params.slug,
        key: keyOccupation,
        workforceDataCached: await workforceDataCached.load()
    };
}