import { writable } from 'svelte/store';
import type { Facilities } from '$lib/interfaces/facility.interface';
export const facilitiesData = writable<Facilities>([]);
import { variables } from '$lib/utils/constants';

export async function fetchFacilities() {
    const facilitiesUrl = `${variables.BASE_API_URI}/facilities/`;
    const response = await fetch(facilitiesUrl);
			const data = await response.json();
			if (data) {
			console.log(typeof data);
			console.log(data.constructor);
			console.log(data);
			facilitiesData.set(data);
		}
    }