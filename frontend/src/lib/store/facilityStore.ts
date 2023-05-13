import type { Facility } from '$lib/interfaces/facility.interface';
import { variables } from '$lib/utils/constants';
import { writable, derived, readable, get, asyncReadable, asyncDerived } from '@square/svelte-store';
import { language } from '$lib/store/languageStore';
import { browser } from "$app/environment";
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
import { locale } from '$i18n/i18n-svelte';

export const selectFacilities = writable([]);

export const facilityStore = asyncDerived(
	([language, locale]),
	async ([$language, $locale]) => {
		var cachelife = 600;
		const cacheName = "facility";
		let cachedData;
		let expired = true;
		if (browser) {
			cachedData = localStorage.getItem(`${cacheName}_${$language}`);
		}
		if (cachedData) {
			cachedData = JSON.parse(cachedData);
			expired = (Date.now() / 1000) - cachedData.cachetime > cachelife;
		}
		//If cached data available and not expired and array not empty, return it. Else, fetch it.
		if (cachedData && !expired && cachedData.data.length) {
			return cachedData.data;
		} else {
			//otherwise fetch data from api then save the data in localstorage
			var langUrl = ($language === undefined || $language === null || $language === '') ? '' : `?lang=${$language}`;
			const apiUrl = `${variables.BASE_API_URI}/facility/${$language}/`;
			const [response, err] = await handleRequestsWithPermissions(fetch, apiUrl);
			if (response) {
				let data = response;
				if (browser) {
					var json = { data: data, cachetime: Date.now() / 1000 }
					localStorage.setItem(`${cacheName}_${$language}`, JSON.stringify(json));
				}
				return data;
			} else if (err) {
				console.log(err);
			}
		}
	},
	true
);

export const siteCount = asyncDerived(
	(facilityStore),
	async ($facilityStore) => {
		let len = $facilityStore.facility.length;
		return len;
	}	
);


export const websiteSchema = asyncDerived(
	(facilityStore),
	async ($facilityStore) => {
		const someds = [];
		for (let somed of $facilityStore.contact.socialnetworks) {
            someds.push(somed.url)
		}
		return {
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: $facilityStore.website_title,
			url: variables.BASE_URI,
			description: $facilityStore.website_description,
			sameAs: someds,
		}
	}
);

/*
export default function () {
	const loading = writable(false)
	const error = writable(false)
	const data = writable({})
	let $language = get(language);
	var langUrl = ($language === undefined || $language === null || $language === '') ? '' : `${$language}/`;
	const facilitiesUrl = `${variables.BASE_API_URI}/facility/${langUrl}`;
	
	async function getIt() {
		loading.set(true)
		error.set(false)
		try {
			const response = await fetch(facilitiesUrl)
			data.set(await response.json());
		} catch(e) {
			error.set(e)
		}
		loading.set(false)
	}
	
	getIt()
	
	return [ data, loading, error, getIt]
}
*/