import { get } from '@square/svelte-store';
import type { PageLoad } from './$types';
import { categorizedFilteredEffectors, selectSituation, categorizedCachedEffectors, cardinalCategorizedFilteredEffectors, selectCategories, cardinalTypes, selCatVal, categories } from '$lib/store/directoryStore';
import { variables } from '$lib/utils/constants';

function getValue(selectCategories: string[]) {
    if (!selectCategories?.length) {
        return null;
    } else {
        let c = get(categories);
        if (c) {
            let val = c
                .filter((x) => selectCategories.includes(x.uid))
                .map(function (x) {
                    let dct = { value: x.uid, label: x.name };
                    return dct;
                })[0];
            return val;
        }
    }
}

const findKeyOfSlug = (slug: string, map: Map<string, any>) => {
    let result = null;
    for (const [key, value] of map) {
        if (value.slug == slug) {
            result = key;
        }
    }
    return result;
};

export const load: PageLoad = async ({ fetch, params }) => {
    const slug = params.slug;
    const _cardinalTypes = await cardinalTypes.load();
    const key = findKeyOfSlug(slug, _cardinalTypes);
    const uid = _cardinalTypes.get(key)["uid"];
    selectCategories.set([uid]);
    selCatVal.set(getValue([uid]));
    //slugAddressbook.set(params.slug);
    //const keyOccupation = await keyAddressbook.load();
    //selectOccupations.set([keyOccupation]);
    //const sOC = await filteredOccupationsCardinal.load();
    return {
        cardinal: await cardinalCategorizedFilteredEffectors.load()
    };
}