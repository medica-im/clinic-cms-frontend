import { facilityStore } from '$lib/store/facilityStore.ts';
import type { PageLoad } from './$types';
import { workerData } from '$lib/Workforce/rest.ts';
import { browser } from '$app/environment';
import { variables } from '$lib/utils/constants.ts';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils.ts';

export const load: PageLoad = async ({ fetch, params }) => {
	const slug = params.slug;
	let facility;
	if (browser) {
		facility = await facilityStore.load();
	} else {
		const apiUrl = `${variables.BASE_API_URI}/facility/${variables.DEFAULT_LANGUAGE}/`;
		const [response] = await handleRequestsWithPermissions(fetch, apiUrl);
		facility = (response && response.facility) ? response : null;
	}
	return {
		slug: params.slug,
		workerData: await workerData({ fetch, slug }),
		facility: facility
	};
};