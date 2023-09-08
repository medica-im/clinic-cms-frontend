import { variables } from '$lib/utils/constants';
import { language } from '$lib/store/languageStore';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
import { workforceDataCached } from '$lib/store/workforceStore';
import { error } from '@sveltejs/kit';

export const workerData: any = async ({ fetch, slug }) => {
	const wfdc = await workforceDataCached.load();
	let w = wfdc.find((element) => element.slug == slug);
	if (w == undefined) {
		if (import.meta.env.DEV) {
			throw error(404, `${slug} does not correspond to any worker slug in our database.`);
		} else {
			throw error(404, {
				message: 'Not found'
			});
		}
	}
	let id = w.id;
	let apiUrl = `${variables.BASE_API_URI}/workforce/user/${id}/?lang=${language}`;
	const [response, _error] = await handleRequestsWithPermissions(fetch, apiUrl);
	if (response) {
		if (import.meta.env.DEV) {
			console.log(response);
		}
		return response;
	} else {
		throw new Error(_error);
	}
}