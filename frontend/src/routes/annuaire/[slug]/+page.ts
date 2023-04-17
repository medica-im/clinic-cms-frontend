import { error } from '@sveltejs/kit';
import { variables } from '$lib/utils/constants';
import { getWorkforceDataCached } from '$lib/store/workforceStore';
import { facilityStore } from '$lib/store/facilityStore';
import { language } from '$lib/store/languageStore';
import type { PageLoad } from './$types';
import {
    workforceDataCached,
    occupations,
    occupationsCardinal,
    filteredOccupationsCardinal,
    selectOccupations,
    workforceOccupation } from '$lib/store/workforceStore';

export const prerender = true;

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

export const load: PageLoad = async ({ fetch, params }) => {
    const wDC = await workforceDataCached.load();
    const o = await occupations.load();
    const oC = await occupationsCardinal.load();
    const wO = await workforceOccupation.load();
    const slugOccupation = getKeyByValue(wO, params.slug);
    console.log(slugOccupation);
    selectOccupations.set([slugOccupation]);
    const sOC = await filteredOccupationsCardinal.load();

    return {
        workforceDataCached: wDC,
        occupations: o,
        occupationsCardinal: oC,
        selectedOccupationsCardinal: sOC,
        slug: params.slug
    };
}