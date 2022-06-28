import { writable, derived, readable } from 'svelte/store';
import type { Workforce } from '$lib/interfaces/workforce.interface';
import { variables } from '$lib/utils/constants';
import { handleWorkforceRequestsWithPermissions } from '$lib/utils/requestUtils';

//export const workforceData = readable<Workforce>([]);
export const term = writable('');

function unsubscribe() {
	// Nothing to do in this case
}

export const workforceData = readable([], set => {
	fetchWorkforce(set);
	return function stop() {
		//clearInterval(interval);
	};
});

async function fetchWorkforce(set) {
	const workforceUrl = `${variables.BASE_API_URI}/workforce/`;
	const [response, err] = await handleWorkforceRequestsWithPermissions(fetch, workforceUrl);
	if (response) {
	    let data = response as Workforce;
		console.log(typeof data);
		console.log(data.constructor);
		console.log(data);
		set(data.sort(() => Math.random() - 0.5));
	} else if (err) {
		console.log(typeof err);
		console.log(err);
	}
}

function uniq(a) {
	var seen = {};
	return a.filter(function (item) {
		return seen.hasOwnProperty(item.name) ? false : (seen[item.name] = true);
	});
}

export const occupations = derived(
	workforceData,
	$workforceData => uniq($workforceData.map(function (currentElement) {
		return currentElement.occupations.flat()
	}
	).flat()).sort(() => Math.random() - 0.5));


export const selectOccupations = writable([]);

export const filteredWorkforceData = derived(
	[term, selectOccupations, workforceData],
	([$term, $selectOccupations, $workforceData]) => {
		if (!$selectOccupations.length && $term == '') { return $workforceData }
		else if (!$selectOccupations.length) {
			return $workforceData.filter(x => x.formatted_name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes($term.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")))
		} else {
			return $workforceData.filter(x => x.formatted_name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes($term.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))).filter(x => x.occupations.map(
				function (currentElement) {
					return currentElement.name
				}
			).some(r => $selectOccupations.includes(r)))
		}
	}
);

