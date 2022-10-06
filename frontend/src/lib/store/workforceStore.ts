import { writable, derived, readable, get, asyncReadable, asyncDerived } from '@square/svelte-store';
import type { Workforce } from '$lib/interfaces/workforce.interface';
import { variables } from '$lib/utils/constants';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
import { language } from '$lib/store/languageStore';
import { browser } from "$app/environment"
import type { OccupationCardinal, OccupationCardinalObject, Occupation, Count, Worker } from '$lib/interfaces/workforce.interface';
import { locale } from '$i18n/i18n-svelte';

export const term = writable('');
export const workerSlug = writable('');


export const workforceDict = asyncDerived(
	(language),
	async ($language) => {
		var cachelife = 3600;
		const cacheName = "workforceDict";
		let cacheddata;
		let expired: boolean = false
		//let $language = get(language);
		if (browser) {
			cacheddata = localStorage.getItem(`${cacheName}_${$language}`);
		}
		if (cacheddata) {
			cacheddata = JSON.parse(cacheddata);
			expired = (Date.now() / 1000) - cacheddata.cachetime > cachelife;
		}
		if (cacheddata && !expired) {
			return cacheddata.data;
		} else {
			var langUrl = ($language === undefined || $language === null || $language === '') ? '' : `?lang=${$language}`;
			const apiUrl = `${variables.BASE_API_URI}/workforce/dictionary/?lang=${$language}`;
			const [response, err] = await handleRequestsWithPermissions(fetch, apiUrl);
			if (response) {
				let data = response;// as ...;
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

export const workforceDataCached = asyncDerived(
	(locale),
	async ($locale) => {
		var cachelife = 300;
		const cacheName = "wfd";
		let cacheddata;
		let expired: boolean = false
		if (browser) {
			cacheddata = localStorage.getItem(`${cacheName}_${$locale}`);
		}
		if (cacheddata) {
			cacheddata = JSON.parse(cacheddata);
			expired = (Date.now() / 1000) - cacheddata.cachetime > cachelife;
		}
		//If cached data available and not expired return them. 
		if (cacheddata && !expired) {
			return cacheddata.data;
		} else {
			const workforceUrl = `${variables.BASE_API_URI}/workforce/?lang=${$locale}`;
			const [response, err] = await handleRequestsWithPermissions(fetch, workforceUrl);
			if (response) {
				let data = response as Workforce;
				if (browser) {
					var json = { data: data, cachetime: Date.now() / 1000 }
					localStorage.setItem(`${cacheName}_${$locale}`, JSON.stringify(json));
				}
				return data;
			} else if (err) {
				console.log(err);
			}
		}
	},
	true
);

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

export const occupationsCardinal = asyncDerived(
	([workforceDataCached, workforceDict, language, locale]),
	async ([$workforceDataCached, $workforceDict, $language, $locale]) => {
		let occupationArray: Occupation[] = (
			$workforceDataCached.map(function (workerElement: Worker) {
				return workerElement.occupations.map(function (occupationElement) {
					if (workerElement.grammatical_gender !== null) {
						let code = workerElement.grammatical_gender.code;
						occupationElement["gender"] = code;
					} else {
						occupationElement["gender"] = null;
					}
					return occupationElement
				}
				)
			}
			).flat(2));
		const occupationsCardinalObject = {} as OccupationCardinalObject;
		occupationArray.forEach(function (x: Occupation) {
			if (!(x.name in Object.keys(occupationsCardinalObject))) {
				occupationsCardinalObject[x.name] = {
					"count": {
						"total": 0,
						"F": 0,
						"M": 0,
						"N": 0
					}
				}
			}
		});
		occupationArray.forEach(function (x: Occupation) {
			let name = x["name"];
			let gender = x["gender"];
			occupationsCardinalObject[name]['count']['total'] = occupationsCardinalObject[name]['count']['total'] + 1;
			if (gender == 'F') {
				occupationsCardinalObject[x.name]['count']['F'] = occupationsCardinalObject[x.name]["count"]["F"] + 1;
			}
			if (gender == 'M') {
				occupationsCardinalObject[x.name]["count"]["M"] = occupationsCardinalObject[x.name]["count"]["M"] + 1;
			}
			if (gender == 'N') {
				occupationsCardinalObject[x.name]["count"]["N"] = occupationsCardinalObject[x.name]["count"]["N"] + 1;
			}
		});
		Object.keys(occupationsCardinalObject).forEach(function (key) {
			if (occupationsCardinalObject[key]["count"]["total"] > 1) {
				if (occupationsCardinalObject[key]['count']['F'] > occupationsCardinalObject[key]["count"]["M"]) {
					occupationsCardinalObject[key]["label"] = $workforceDict[key]["P"]["F"]
				} else {
					occupationsCardinalObject[key]["label"] = $workforceDict[key]["P"]["M"]
				}
			} else {
				if (occupationsCardinalObject[key]["count"]["F"] > occupationsCardinalObject[key]["count"]["M"]) {
					occupationsCardinalObject[key]["label"] = $workforceDict[key]["S"]["F"]
				} else {
					occupationsCardinalObject[key]["label"] = $workforceDict[key]["S"]["M"]
				}
			}
		});
		return occupationsCardinalObject
	},
	true
);

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

export const workerData = asyncDerived(
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
	let expired = false
	if (browser) {
		cacheddata = localStorage.getItem(`wfd_${$language}`);
	}
	if (cacheddata) {
		cacheddata = JSON.parse(cacheddata);
		expired = (Date.now() / 1000) - cacheddata.cachetime > cachelife;
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
			if (browser) {
				var json = { data: data, cachetime: Date.now() / 1000 }
				localStorage.setItem(`wfd_${$language}`, JSON.stringify(json));
			}
			return data;
		} else if (err) {
			console.log(err);
		}

	}
}