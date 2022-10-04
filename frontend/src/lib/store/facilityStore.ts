import type { Facility } from '$lib/interfaces/facility.interface';
import { variables } from '$lib/utils/constants';
import { writable, derived, readable, get, asyncReadable, asyncDerived } from '@square/svelte-store';
import { language } from '$lib/store/languageStore';
import { browser } from "$app/env";
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';

export const facilityStore = asyncDerived(
	(language),
	async ($language) => {
		var cachelife = 300;
		const cacheName = "facility";
		let cacheddata;
		if (browser) {
			cacheddata = localStorage.getItem(`${cacheName}_${$language}`);
		}
		if (cacheddata) {
			cacheddata = JSON.parse(cacheddata);
			var expired = (Date.now() / 1000) - cacheddata.cachetime > cachelife;
		}
		//If cached data available and not expired return them. 
		if (cacheddata && !expired) {
			return cacheddata.data;
		} else {
			//otherwise fetch data from api then save the data in localstorage
			var langUrl = ($language === undefined || $language === null || $language === '') ? '' : `?lang=${$language}`;
			const apiUrl = `${variables.BASE_API_URI}/facility/${$language}/`;
			const [response, err] = await handleRequestsWithPermissions(fetch, apiUrl);
			if (response) {
				let data = response;
				console.log(data);
				if (browser) {
					var json = { data: data, cachetime: Date.now() / 1000 }
					localStorage.setItem(`${cacheName}_${$language}`, JSON.stringify(json));
				}
				return data;
			} else if (err) {
				console.log(typeof err);
				console.log(err);
			}
		}
	},
	true
);

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


export const facilitiesData = writable([], set => {
	fetchFacilities(set);
	return () => {
	};
});

async function fetchFacilities(set) {
	const facilitiesUrl = `${variables.BASE_API_URI}/facility/`;
	const response = await fetch(facilitiesUrl).then(function (response) {
		if (response.ok) {
			const data = response.json();
			console.log(data);
			if (data) {
				let facility = data as Facility;
				console.log(typeof facility);
				console.log(facility.constructor);
				console.log(facility);
				set(facility);
			} else {
				return Promise.reject(response);
			}
		}
	}).catch(function (err) {
		console.warn(`Could not get new token. error: ${err}`);
	}
	)
}
/*
export const fetchFacilities = async (fetch) => {
	const facilitiesUrl = `${variables.BASE_API_URI}/facility/`;
	console.log(facilitiesUrl);
	const response = await fetch(facilitiesUrl).then(function (response) {
		if (response.ok) {
			const data = response.json();
			if (data) {
				console.log(typeof data);
				console.log(data.constructor);
				console.log(data);
				facilitiesData.set(data);
			} else {
				return Promise.reject(response);
			}
		}
	}).catch(function (err) {
		console.warn(`Could not get new token. error: ${err}`);
	}
	)
}
*/