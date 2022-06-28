import { writable } from 'svelte/store';
import type { Facility } from '$lib/interfaces/facility.interface';
export const facilitiesData = writable<Facility>({});
import { variables } from '$lib/utils/constants';
import type { Locales } from '$i18n/i18n-types'


export async function fetchFacilities() {
    const facilitiesUrl = `${variables.BASE_API_URI}/facility/`;
    const response = await fetch(facilitiesUrl);
			const data = await response.json();
			if (data) {
			console.log(typeof data);
			console.log(data.constructor);
			console.log(data);
			facilitiesData.set(data);
			return facilitiesData;
		}
	
    }