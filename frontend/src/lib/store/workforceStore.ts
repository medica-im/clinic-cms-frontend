import { writable, derived, readable, get } from 'svelte/store';
import type { Workforce } from '$lib/interfaces/workforce.interface';
import { variables } from '$lib/utils/constants';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
export const term = writable('');
export const workerSlug = writable('');
import { language } from '$lib/store/languageStore';
import { browser } from "$app/env"

export const workforceData = readable([], set => {
	fetchWorkforce(set);
	return function stop() {
		//clearInterval(interval);
	};
});

export const workforceDataCached = writable([]);

async function fetchWorkforce(set) {
	const workforceUrl = `${variables.BASE_API_URI}/workforce/`;
	const [response, err] = await handleRequestsWithPermissions(fetch, workforceUrl);
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

/*export const workforceDataCached = derived(
	language,
	($language, set) => {
		set([]);
		getWorkforceDataCached().then(data => set(data));
	}
);*/

export const occupations = derived(
	[workforceDataCached, language],
	([$workforceDataCached, $language]) => {
		let derivedWorkforceData = (
			uniq($workforceDataCached.map(function (currentElement) {
				return currentElement.occupations.flat()
			}
			).flat()));//.sort(() => Math.random() - 0.5));
		return derivedWorkforceData
	});

export const selectOccupations = writable([]);

export const filteredWorkforceDataCached = derived(
	[term, selectOccupations, workforceDataCached],
	([$term, $selectOccupations, $workforceDataCached]) => {
		if (!$selectOccupations.length && $term == '') { return $workforceDataCached }
		else if (!$selectOccupations.length) {
			return $workforceDataCached.filter(x => x.formatted_name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes($term.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")))
		} else {
			return $workforceDataCached.filter(x => x.formatted_name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes($term.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))).filter(x => x.occupations.map(
				function (currentElement) {
					return currentElement.name
				}
			).some(r => $selectOccupations.includes(r)))
		}
	}
);

export const filteredWorkforceData = derived(
	[term, selectOccupations, workforceDataCached],
	([$term, $selectOccupations, $workforceDataCached]) => {
		if (!$selectOccupations.length && $term == '') { return $workforceData }
		else if (!$selectOccupations.length) {
			return $workforceDataCached.filter(x => x.formatted_name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes($term.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")))
		} else {
			return $workforceDataCached.filter(x => x.formatted_name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes($term.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))).filter(x => x.occupations.map(
				function (currentElement) {
					return currentElement.name
				}
			).some(r => $selectOccupations.includes(r)))
		}
	}
);

export const workerTitle = derived(
	[workerSlug, workforceDataCached,],
	([$workerSlug, $workforceDataCached]) => {
		if ($workerSlug && $workforceDataCached.length) {
			return $workforceDataCached.find((element) => element.slug == $workerSlug).formatted_name
		} else { return '' }
	}
);

export const getWorkforceDataCached = async () => {
		// set cache lifetime in seconds
		var cachelife = 60;
		//get cached data from local storage
		let $language = get(language);
		var cacheddata = localStorage.getItem(`wfd_${$language}`);
		if (cacheddata) {
			cacheddata = JSON.parse(cacheddata);
			var expired = (Date.now() / 1000) - cacheddata.cachetime > cachelife;
		}
		//If cached data available and not expired return them. 
		if (cacheddata && !expired) {
			workforceDataCached.set(cacheddata.data);
			return cacheddata.data;
	} else {
		//otherwise fetch data from api then save the data in localstorage
		let $language = get(language);
		var langUrl = ($language === undefined || $language === null || $language === '') ? '' : `?lang=${$language}`;
		const workforceUrl = `${variables.BASE_API_URI}/workforce/${langUrl}`;
		const [response, err] = await handleRequestsWithPermissions(fetch, workforceUrl);
		if (response) {
			let data = response as Workforce;
			console.log(typeof data);
			console.log(data.constructor);
			console.log(data);
			workforceDataCached.set(cacheddata.data);
			if (browser) {
				var json = { data: data, cachetime: Date.now() / 1000 }
				localStorage.setItem(`wfd_${$language}`, JSON.stringify(json));
			}
			return data;
		} else if (err) {
			console.log(typeof err);
			console.log(err);
		}

	}
}

export const getWorkforceData = async () => {
	//otherwise fetch data from api then save the data in localstorage
	const workforceUrl = `${variables.BASE_API_URI}/workforce/`;
	const [response, err] = await handleRequestsWithPermissions(fetch, workforceUrl);
	if (response) {
		let data = response as Workforce;
		console.log(typeof data);
		console.log(data.constructor);
		console.log(data);
		//var json = { data: data, cachetime: Date.now() / 1000 }
		//localStorage.setItem('wfd', JSON.stringify(json));
		workforceDataCached.set(data);
		return data;
	} else if (err) {
		console.log(typeof err);
		console.log(err);
	}
}