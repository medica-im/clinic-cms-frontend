import type { PageLoad } from './$types';
import { cardinalCategorizedFilteredEffectors, selectCategories, selCatVal, categories, currentOrg, directoryRedirect, selectFacility, selectFacilityValue } from '$lib/store/directoryStore.ts';

function getValue(slug: string, effectorTypes: any[]) {
    const effectorType = effectorTypes.find((element) => element.slug == slug);
    return { value: effectorType.uid, label: effectorType.name };
}

const uidOfSlug = (slug: string, effectorTypes: any[]) => {
    const effectorType = effectorTypes.find((element) => element.slug == slug);
    return effectorType.uid;
};

export const load: PageLoad = async ({params}) => {
    directoryRedirect.set(true);
    currentOrg.set(true);
    const slug = params.slug;
    selectFacility.set("");
    selectFacilityValue.set(null);
    const effectorTypes = await categories();
    const uid: string = uidOfSlug(slug, effectorTypes);
    selectCategories.set([uid]);
    const value = getValue(slug, effectorTypes);
    selCatVal.set(value);
    return {
        cardinal: await cardinalCategorizedFilteredEffectors.load(),
        slug: slug,
        types: [uid]
    };
}