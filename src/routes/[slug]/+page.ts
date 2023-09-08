import { error } from '@sveltejs/kit';
import { variables } from '$lib/utils/constants';
import { facilityStore } from '$lib/store/facilityStore';
import { language } from '$lib/store/languageStore';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
import { workforceDataCached } from '$lib/store/workforceStore';
import type { PageLoad } from './$types';
import { workerData } from '$lib/Workforce/rest';

export const load: PageLoad = async ({ fetch, params }) => {
	const slug = params.slug;
	const userData = await workerData({ fetch, slug });
	const fData = await facilityStore.load();
	return {
		slug: params.slug,
		userData: userData,
		facility: fData,
	};
};