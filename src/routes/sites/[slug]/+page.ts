import type { PageLoad } from './$types';
import { variables } from '$lib/utils/constants';
import { cardinalCategorizedFilteredEffectors, selectCategories, selCatVal, categories, currentOrg, directoryRedirect, selectFacility, selectFacilityValue } from '$lib/store/directoryStore.ts';
import type { Facility } from '$lib/store/directoryStoreInterface.ts';

export const load: PageLoad = async ({ fetch, params }) => {
    const slug = params.slug;
    const url = `${variables.BASE_API_URI}/facilities/${slug}`;
    const response = await fetch(url);
    const facility: Facility = await response.json();
    selectFacility.set(facility.uid);
    return {
        facility: facility,
        entries: await cardinalCategorizedFilteredEffectors.load()
    };
}