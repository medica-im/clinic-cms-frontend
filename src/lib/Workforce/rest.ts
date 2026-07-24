import { variables } from '$lib/utils/constants.ts';
import { language } from '$lib/store/languageStore.ts';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils.ts';
import { workforceDataCached } from '$lib/store/workforceStore.ts';
import { error } from '@sveltejs/kit';
import type { Worker } from '$lib/interfaces/workforce.interface';
import { get } from 'svelte/store';
import { browser } from '$app/environment';

export const workerData: any = async ({ fetch, slug }) => {
	let wfdc: Worker[];
	if (browser) {
		const loaded = await workforceDataCached.load();
		if (!Array.isArray(loaded)) {
			throw error(500, { message: 'Could not load workforce data' });
		}
		wfdc = loaded as Worker[];
	} else {
		let lang = get(language) || variables.DEFAULT_LANGUAGE;
		const workforceUrl = `${variables.BASE_API_URI}/workforce/user/?lang=${lang}`;
		const [response, err] = await handleRequestsWithPermissions(fetch, workforceUrl);
		if (!Array.isArray(response)) {
			console.error('Workforce API did not return an array', err);
			throw error(500, { message: 'Could not load workforce data' });
		}
		wfdc = response as Worker[];
	}
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
	let workerLang = get(language) || variables.DEFAULT_LANGUAGE;
	let apiUrl = `${variables.BASE_API_URI}/workforce/user/${id}/?lang=${workerLang}`;
	const [workerResponse, _error] = await handleRequestsWithPermissions(fetch, apiUrl);
	if (workerResponse && Object.keys(workerResponse).length) {
		if (import.meta.env.DEV) {
			console.log(workerResponse);
		}
		return workerResponse;
	} else {
		throw error(500, { message: 'Could not load worker data' });
	}
}