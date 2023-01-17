import { error } from '@sveltejs/kit';
import { variables } from '$lib/utils/constants';
import { getWorkforceDataCached } from '$lib/store/workforceStore';
import { language } from '$lib/store/languageStore';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';

let html = '';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

  let worker = `worker_${variables.DEFAULT_LANGUAGE}`;

	async function getWorkerData() {
		const wfdc = await getWorkforceDataCached();
		if (wfdc) {
			let w = wfdc.find((element) => element.slug == params.slug);
			if (w == undefined) {
				if (import.meta.env.DEV) {
					throw error(404, `${params.slug} does not correspond to any worker slug in our database.`);
				} else {
				    throw error(404, {
					    message: 'Not found'
				  });
				}
			}
			let id = w.id;
			let apiUrl = `${variables.BASE_API_URI}/workforce/${id}/?lang=${language}`;
			const [response, _error] = await handleRequestsWithPermissions(fetch, apiUrl);
			if (response) {
				if (response.profile) {
					html = response.profile.text;
				}
				if (import.meta.env.DEV) {
					console.log(response);
				}
				return response;
			} else {
				throw new Error(_error);
			}
		}
	}
  const userData = await getWorkerData() as Worker;
  console.log(userData);
    return {
      slug: params.slug,
      userData: userData,
    };
}