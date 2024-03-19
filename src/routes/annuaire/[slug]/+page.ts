import { get } from '@square/svelte-store';
import type { PageLoad } from './$types';
import {
    workforceDataCached,
    filteredOccupationsCardinal,
    selectOccupations,
    slugAddressbook,
    keyAddressbook } from '$lib/store/workforceStore';
import { categorizedFilteredEffectors, selectSituation, categorizedCachedEffectors, cardinalCategorizedFilteredEffectors, selectCategories, cardinalTypes } from '$lib/store/directoryStore';

const findKeyOfSlug = (slug: string, map: Map<string, any>) => {
    let result = null;
    for (const [key, value] of map) {
      if (value.slug==slug) {
        result = key;
      }
    }
    return result;
  };

export const load: PageLoad = async ({ fetch, params }) => {
    const slug = params.slug;
    const _cardinalTypes = await cardinalTypes.load();
    const key = findKeyOfSlug(slug, _cardinalTypes);
    const uid =  _cardinalTypes.get(key)["uid"];
    selectCategories.set([uid]);
    //slugAddressbook.set(params.slug);
    //const keyOccupation = await keyAddressbook.load();
    //selectOccupations.set([keyOccupation]);
    //const sOC = await filteredOccupationsCardinal.load();
    return {
        key: key,
        slug: params.slug,
        cardinal: await cardinalCategorizedFilteredEffectors.load()
    };
}