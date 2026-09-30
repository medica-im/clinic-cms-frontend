import { error } from '@sveltejs/kit';
import { get } from '@square/svelte-store';
import type { PageLoad } from './$types';
import {
    workforceDataCached,
    filteredOccupationsCardinal,
    selectOccupations,
    slugAddressbook,
    keyAddressbook } from '$lib/store/workforceStore';

export const load: PageLoad = async ({ fetch, params }) => {
    slugAddressbook.set(params.slug);
    const keyOccupation = await keyAddressbook.load();
    // Not an occupation slug, e.g. a worker's /annuaire/<name> instead of /<name>
    if (!keyOccupation) {
        error(404, 'Not found');
    }
    selectOccupations.set([keyOccupation]);
    const sOC = await filteredOccupationsCardinal.load();
    return {
        selectedOccupationsCardinal: sOC,
        slug: params.slug,
        key: keyOccupation,
        workforceDataCached: await workforceDataCached.load()
    };
}