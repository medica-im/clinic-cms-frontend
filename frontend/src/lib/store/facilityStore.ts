import type { Facility } from '$lib/interfaces/facility.interface';
import { variables } from '$lib/utils/constants';
import { get, writable } from 'svelte/store'
import { language } from '$lib/store/languageStore';



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