import { writable, derived, readable, get, asyncReadable, asyncDerived } from '@square/svelte-store';
import type { Workforce } from '$lib/interfaces/workforce.interface';
import { variables } from '$lib/utils/constants';
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
import { language } from '$lib/store/languageStore';
import { browser } from "$app/environment"
import type { OccupationCardinal, OccupationCardinalObject, Occupation, Count, Worker } from '$lib/interfaces/workforce.interface';
import { locale } from '$i18n/i18n-svelte';
import { selectFacilities } from '$lib/store/facilityStore';

export const term = writable('');
export const workerSlug = writable('');


export const workforceDict = asyncDerived(
	(language),
	async ($language) => {
		var cachelife = 3600;
		const cacheName = "workforceDict";
		let cacheddata;
		let expired: boolean = false
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
	([locale, language]),
	async ([$locale, $language]) => {
		var cachelife = 300;
		const cacheName = "wfd";
		let cacheddata;
		let expired: boolean = false
		let lang = $language;
		if (lang == undefined) {
			lang = variables.DEFAULT_LANGUAGE;
		}
		if (browser) {
			cacheddata = localStorage.getItem(`${cacheName}_${lang}`);
		}
		if (cacheddata) {
			cacheddata = JSON.parse(cacheddata);
			expired = (Date.now() / 1000) - cacheddata.cachetime > cachelife;
		}
		if (cacheddata && !expired) {
			return cacheddata.data;
		} else {
			const workforceUrl = `${variables.BASE_API_URI}/workforce/?lang=${lang}`;
			const [response, err] = await handleRequestsWithPermissions(fetch, workforceUrl);
			if (response) {
				let data = response as Workforce;
				if (browser) {
					var json = { data: data, cachetime: Date.now() / 1000 }
					localStorage.setItem(`${cacheName}_${lang}`, JSON.stringify(json));
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

function mapWorkforceData (workerElement: Worker) {
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

export const occupationsCardinalBak = asyncDerived(
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

function normalize(x) {
	return x.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export const filteredWorkforceDataCached = asyncDerived(
	[term, selectOccupations, selectFacilities, workforceDataCached],
	([$term, $selectOccupations, $selectFacilities, $workforceDataCached]) => {
		if (!$selectOccupations.length && !$selectFacilities.length && $term == '') { return $workforceDataCached }
		else {
			return $workforceDataCached.filter(function (x) {
				if (!$selectOccupations.length) {
					return true
				} else {
					return x.occupations.map(
						function (currentElement) {
							return currentElement.name
						}
					).some(r => $selectOccupations.includes(r))
				}
			}).filter(function (x) {
				if (!$selectFacilities.length) {
					return true
				}
				let facilities = [];
				for (let o of x.occupations) {
					try {
						let _facilities = o.specialty.facilities;
						for (let f of _facilities) {
							if (f) { facilities.push(f) }
						}
					} catch(err) {
					}
					try {
						let _facilities = o.facilities;
						for (let f of _facilities) {
							if (f) { facilities.push(f) }
						}
					} catch(err) {
					}
				}
				let names = facilities.map(x => x.facility__name);
				if (names) {
					let filterBool = names.some(r => $selectFacilities.includes(r));
					return filterBool;
				} else {
					return false;
				}
			}
			).filter(function (x) {
				if ($term == '') {
					return true
				} else {
					return normalize(x.formatted_name).includes(normalize($term))
				}
			})
		}
	}
);

export const occupationsCardinal = asyncDerived(
	([filteredWorkforceDataCached, selectOccupations, workforceDict, language, locale]),
	async ([$filteredWorkforceDataCached, $selectOccupations, $workforceDict, $language, $locale]) => {
		let occupationArray: Occupation[] = ($filteredWorkforceDataCached.map(mapWorkforceData).flat(2));
		let filteredOccupationArray: Occupation[] = occupationArray.filter(
			function (x) {
			if ($selectOccupations.length) {
			    return $selectOccupations.indexOf(x.name)>=0;
			} else {
				return true;
			}
		}
		);
		const occupationsCardinalObject = {} as OccupationCardinalObject;
		filteredOccupationArray.forEach(function (x: Occupation) {
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
		filteredOccupationArray.forEach(function (x: Occupation) {
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


export const workerData = asyncDerived(
	[workerSlug, workforceDataCached,],
	([$workerSlug, $workforceDataCached]) => {
		if ($workerSlug && $workforceDataCached && $workforceDataCached.length) {
			return $workforceDataCached.find((element) => element.slug == $workerSlug).formatted_name
		} else { return '' }
	}
);

export const getWorkforceDataCached = async () => {
	var cachelife = 300;
	let cacheddata;
	let expired = false
	let lang = get(language);
	if (lang == undefined) {
		lang = variables.DEFAULT_LANGUAGE;
	}
	if (browser) {
		cacheddata = localStorage.getItem(`wfd_${lang}`);
	}
	if (cacheddata) {
		cacheddata = JSON.parse(cacheddata);
		expired = (Date.now() / 1000) - cacheddata.cachetime > cachelife;
	}
	if (cacheddata && !expired) {
		return cacheddata.data;
	} else {
		const workforceUrl = `${variables.BASE_API_URI}/workforce/?lang=${lang}`;
		const [response, err] = await handleRequestsWithPermissions(fetch, workforceUrl);
		if (response) {
			let data = response as Workforce;
			if (browser) {
				var json = { data: data, cachetime: Date.now() / 1000 }
				localStorage.setItem(`wfd_${lang}`, JSON.stringify(json));
			}
			return data;
		} else if (err) {
			console.log(err);
		}

	}
};