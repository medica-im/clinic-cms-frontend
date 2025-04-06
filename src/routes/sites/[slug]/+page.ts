import type { PageLoad } from './$types';
import { variables } from '$lib/utils/constants';
import { cardinalCategorizedFilteredEffectors, selectCategories, selCatVal, categories, currentOrg, directoryRedirect, selectFacility, selectFacilityValue } from '$lib/store/directoryStore.ts';
import { facilityEntries } from '$lib/components/Directory/sites.ts';
import type { Facility } from '$lib/interfaces/facility.interface.ts';

export const load: PageLoad = async ({ fetch, params }) => {
    const slug = params.slug;
    const url = `${variables.BASE_API_URI}/facilities/${slug}`;
    const response = await fetch(url);
    const facility: Facility = await response.json();
    console.log(`facility: ${JSON.stringify(facility)}`);
    selectFacility.set(facility.uid);
    const entries = await facilityEntries(facility.uid);
    console.log(`entries: ${JSON.stringify([...entries])}`);
    return {
        facility: facility,
        entries: entries
    };
}