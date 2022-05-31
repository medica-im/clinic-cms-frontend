import { writable } from 'svelte/store';
import type { Workforce } from '$lib/interfaces/workforce.interface';
export const workforceData = writable<Workforce>([]);
import { variables } from '$lib/utils/constants';

export async function fetchWorkforce() {
    const workforceUrl = `${variables.BASE_API_URI}/workforce/`;
    const response = await fetch(workforceUrl);
			const data = await response.json();
			if (data) {
			console.log(typeof data);
			console.log(data.constructor);
			console.log(data);
			workforceData.set(data);
		}
    }