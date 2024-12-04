import type { PageLoad } from './$types';
import { cardinalCategorizedFilteredEffectors, selectCategories, selCatVal, categories, currentOrg, directoryRedirect, limitCategories } from '$lib/store/directoryStore.ts';

function getValue(slug: string, effectorTypes: any[]) {
    const effectorType = effectorTypes.find((element) => element.slug == slug);
    return { value: effectorType.uid, label: effectorType.name };
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

const uidOfSlug = (slug: string, effectorTypes: any[]) => {
    const effectorType = effectorTypes.find((element) => element.slug == slug);
    return effectorType.uid;
};

export const load: PageLoad = async ({ params }) => {
    directoryRedirect.set(true);
    currentOrg.set(true);
    const slug = params.slug;
    //limitCategories.set([slug]);
    const effectorTypes = await categories();
    const uid = uidOfSlug(slug, effectorTypes);
    selectCategories.set([uid]);
    const value = getValue(slug, effectorTypes);
    selCatVal.set(value);
    return {
        cardinal: await cardinalCategorizedFilteredEffectors.load()
    };
}