import { facilityStore } from '$lib/store/facilityStore.ts';
import type { PageLoad } from './$types';
import { workerData } from '$lib/Workforce/rest.ts';

export const load: PageLoad = async ({ fetch, params }) => {
	const slug = params.slug;
	return {
		slug: params.slug,
		workerData: await workerData({ fetch, slug }),
		facility: await facilityStore.load()
	};
};