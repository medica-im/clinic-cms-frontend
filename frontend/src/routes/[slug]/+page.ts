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
				throw new Error(`${params.slug} does not correspond to any worker slug in our database.`);
			}
			let id = w.id;
			let apiUrl = `${variables.BASE_API_URI}/workforce/${id}/?lang=${language}`;
			const [response, error] = await handleRequestsWithPermissions(fetch, apiUrl);
			if (response) {
				if (response.profile) {
					html = response.profile.text;
				}
				if (import.meta.env.DEV) {
					console.log(response);
				}
				return response;
			} else {
				throw new Error(error);
			}
		}
	}
  const userData: Worker = await getWorkerData();
  console.log(userData);
    return {
      slug: params.slug,
      userData: userData,
    };
}