//import { writable, derived, readable, get } from 'svelte/store';
import { writable, derived, readable, get, asyncReadable, asyncDerived } from '@square/svelte-store';
import type { Workforce } from '$lib/interfaces/workforce.interface';
import { variables } from '$lib/utils/constants';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
export const term = writable('');
export const workerSlug = writable('');
import { language } from '$lib/store/languageStore';
import { browser } from "$app/environment"

export const workforceData = readable([], set => {
	fetchWorkforce(set);
	return function stop() {
		//clearInterval(interval);
	};
});


export const workforceDict = asyncDerived(
	(language),
	async ($language) => {
		var cachelife = 3600;
		const cacheName = "workforceDict";
		let cacheddata;
		//let $language = get(language);
		if (browser) {
			cacheddata = localStorage.getItem(`${cacheName}_${$language}`);
		}
		if (cacheddata) {
			cacheddata = JSON.parse(cacheddata);
			var expired = (Date.now() / 1000) - cacheddata.cachetime > cachelife;
		}
		if (cacheddata && !expired) {
			return cacheddata.data;
		} else {
			let $language = get(language);
			var langUrl = ($language === undefined || $language === null || $language === '') ? '' : `?lang=${$language}`;
			const apiUrl = `${variables.BASE_API_URI}/workforce/dictionary/?lang=${$language}`;
			const [response, err] = await handleRequestsWithPermissions(fetch, apiUrl);
			if (response) {
				let data = response;// as ...;
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

export const workforceDataCached = asyncDerived(
	(language),
	async ($language) => {
		var cachelife = 300;
		const cacheName = "wfd";
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
			const workforceUrl = `${variables.BASE_API_URI}/workforce/?lang=${$language}`;
			const [response, err] = await handleRequestsWithPermissions(fetch, workforceUrl);
			if (response) {
				let data = response as Workforce;
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

export const occupations = asyncDerived(
	(workforceDataCached),
	async ($workforceDataCached) => {
		let derivedWorkforceData = (
			uniq($workforceDataCached.map(function (currentElement) {
				return currentElement.occupations.flat()
			}
			).flat()));
		return derivedWorkforceData
	});
/*
export const occupationsCardinal = asyncDerived(
	(workforceDataCached),
	async ($workforceDataCached) => {
		const occupationsCardinalArray = {};
		let occupationArray = (
			$workforceDataCached.map(function (currentElement) {
				return currentElement.occupations.flat()
			}
			).flat());
		occupationArray.forEach(function (x) {
			if(!(x.name in occupationsCardinalArray)) {
				occupationsCardinalArray[x.name] = {
					"count": 0,
				    "label": x.label
				};
			}
			occupationsCardinalArray[x.name]["count"] = occupationsCardinalArray[x.name]["count"] + 1;
		});
		return occupationsCardinalArray
	});
*/

export const occupationsCardinal = asyncDerived(
	([workforceDataCached, workforceDict, language]),
	async ([$workforceDataCached, $workforceDict, $language]) => {
		const occupationsCardinalArray = {};
		let occupationArray = (
			$workforceDataCached.map(function (workerElement, worforceIndex, workforceArray) {
				return workerElement.occupations.map(function (occupationElement) {
					occupationElement["G"]=workerElement.grammatical_gender.code;
					return occupationElement
				}
				)
			}
			).flat(2));
		occupationArray.forEach(function (x) {
			if(!(x.name in occupationsCardinalArray)) {
				occupationsCardinalArray[x.name] = {
					"count": {
						"total": 0,
						"F": 0,
						"M": 0,
						"N": 0
					},
				    "label": x.label
				};
			}
			occupationsCardinalArray[x.name]["count"]["total"] = occupationsCardinalArray[x.name]["count"]["total"] + 1;
			if (x.G == 'F') {
				occupationsCardinalArray[x.name]["count"]["F"] = occupationsCardinalArray[x.name]["count"]["F"] + 1;
			}
			if (x.G == 'M') {
				occupationsCardinalArray[x.name]["count"]["M"] = occupationsCardinalArray[x.name]["count"]["M"] + 1;
			}
			if (x.G == 'N') {
				occupationsCardinalArray[x.name]["count"]["N"] = occupationsCardinalArray[x.name]["count"]["N"] + 1;
			}
		});
		Object.keys(occupationsCardinalArray).forEach(function (key) {
            if (occupationsCardinalArray[key]["count"]["total"]>1) {
				if (occupationsCardinalArray[key]["count"]["F"]>occupationsCardinalArray[key]["count"]["M"]) {
					occupationsCardinalArray[key]["label"]=$workforceDict[key]["P"]["F"]
				} else {
					occupationsCardinalArray[key]["label"]=$workforceDict[key]["P"]["M"]
				}
			} else {
				if (occupationsCardinalArray[key]["count"]["F"]>=occupationsCardinalArray[key]["count"]["M"]) {
					occupationsCardinalArray[key]["label"]=$workforceDict[key]["S"]["F"]
				} else {
					occupationsCardinalArray[key]["label"]=$workforceDict[key]["S"]["M"]
				}
			}
		});
		return occupationsCardinalArray
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
	let cacheddata;
	if (browser) {
	    cacheddata = localStorage.getItem(`wfd_${$language}`);
	}
	if (cacheddata) {
		cacheddata = JSON.parse(cacheddata);
		var expired = (Date.now() / 1000) - cacheddata.cachetime > cachelife;
	}
	//If cached data available and not expired return them. 
	if (cacheddata && !expired) {
		//workforceDataCached.set(cacheddata.data);
		return cacheddata.data;
	} else {
		//otherwise fetch data from api then save the data in localstorage
		let $language = get(language);
		var langUrl = ($language === undefined || $language === null || $language === '') ? '' : `?lang=${$language}`;
		const workforceUrl = `${variables.BASE_API_URI}/workforce/?lang=${$language}`;
		const [response, err] = await handleRequestsWithPermissions(fetch, workforceUrl);
		if (response) {
			let data = response as Workforce;
			console.log(typeof data);
			console.log(data.constructor);
			console.log(data);
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