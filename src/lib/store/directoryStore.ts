import { writable, derived, readable, get, asyncReadable, asyncDerived } from '@square/svelte-store';
import { locale } from '$i18n/i18n-svelte';
import { variables } from '$lib/utils/constants';
import { browser } from "$app/environment"
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
import { env } from '$env/dynamic/public';
import haversine from 'haversine-distance';
import { replacer, reviver } from '$lib/utils/utils';

export const term = writable('');
export const selectCommunes = writable([]);
export const selectCategories = writable([]);
export const selectSituation = writable("");
export const effectors = writable([]);
export const addressFeature = writable({});


const next = writable(null);

function normalize(x: string) {
	return x.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

async function fetchEffectors(next) {
	const effectorsUrl = `${variables.BASE_API_URI}/effectors/${next || ""}`;
	const [response, err] = await handleRequestsWithPermissions(fetch, effectorsUrl);
	if (response) {
		let data: any = response;
		next = data.meta.next;
		return [data.effectors, next]
	}
};

export const getEffectors = asyncDerived(
	([locale, next, effectors]),
	async ([$locale, $next, $effectors]) => {
		var cachelife = parseInt(env.PUBLIC_EFFECTORS_TTL);
		const cacheName = "effectors";
		let cachedData;
		let expired: boolean = true;
		let lang = $locale ?? variables.DEFAULT_LANGUAGE;
		let empty: boolean = true;
		if (browser) {
			cachedData = localStorage.getItem(`${cacheName}`);
		}
		if (cachedData) {
			cachedData = JSON.parse(cachedData);
			let elapsed = (Date.now() / 1000) - cachedData.cachetime;
			expired = elapsed > cachelife;
			if ('data' in cachedData) {
				if (cachedData.data?.length) {
					empty = false;
				}
			}
		}
		if (cachedData && !expired && !empty) {
			return cachedData.data;
		} else {
			let hasMore = true
			while (hasMore) {
				const [_effectors, _next] = await fetchEffectors($next);
				$effectors = [...$effectors, ..._effectors];
				if (_next === null) {
					hasMore = false;
				} else {
					$next = _next
				}
			}
			if (browser) {
				var json = { data: $effectors, cachetime: Date.now() / 1000 }
				localStorage.setItem(`${cacheName}`, JSON.stringify(json))
			}
			return $effectors;
		}
	}
);

export const distanceEffectors = asyncDerived(
	([addressFeature, getEffectors]),
	async ([$addressFeature, $getEffectors]) => {
		const targetGeoJSON = $addressFeature?.geometry?.coordinates;
		if (!targetGeoJSON) {
			return;
		}
		console.log(`targetGeoJSON: ${targetGeoJSON}`);
		const distanceOfEffector = {};
		for (const effector of $getEffectors ) {
				let longitude = effector.address.longitude;
				let latitude = effector.address.latitude;
				console.log(longitude, latitude);
				if (!longitude || !latitude) {
					console.log("no gps");
					continue;
				}
				const effectorGeoJSON = [parseFloat(longitude), parseFloat(latitude)] as any;
				const dist = haversine(targetGeoJSON, effectorGeoJSON);
				distanceOfEffector[effector.address.facility_uid] = dist;
			}
		console.log(distanceOfEffector);
		return distanceOfEffector;
	}
);

function uniq(a) {
	var seen = {};
	return a.filter(function (item) {
		return seen.hasOwnProperty(item.uid) ? false : (seen[item.uid] = true);
	});
}

export const communes = asyncDerived(
	(getEffectors),
	async ($getEffectors) => {
		let communes = (
			uniq($getEffectors.map(function (currentElement) {
				return currentElement.commune
			}
			).flat()).sort(function (a, b) {
				return a.name.localeCompare(b.name);
			})
		);
		return communes
	});

export const categories = asyncDerived(
	(getEffectors),
	async ($getEffectors) => {
		let categories = (
			uniq($getEffectors.map(function (currentElement) {
				return currentElement.types.flat()
			}
			).flat()).sort(function (a, b) {
				return a.uid.localeCompare(b.uid);
			})
		);
		return categories
	});

export const getSituations = asyncReadable(
	{},
	async () => {
		var cachelife = parseInt(env.PUBLIC_SITUATIONS_TTL);
		const cacheName = "situations";
		let cachedData;
		let expired: boolean = true;
		let empty: boolean = true;
		if (browser) {
			cachedData = localStorage.getItem(`${cacheName}`);
		}
		if (cachedData) {
			cachedData = JSON.parse(cachedData);
			let elapsed = (Date.now() / 1000) - cachedData.cachetime;
			expired = elapsed > cachelife;
			if ('data' in cachedData) {
				if (cachedData.data?.length) {
					empty = false;
				}
			}
		}
		if (cachedData && !expired && !empty) {
			return cachedData.data;
		} else {
			const url = `${variables.BASE_API_URI}/situations`;
			const [response, err] = await handleRequestsWithPermissions(fetch, url);
			if (response) {
				let data = response?.situations;
				if (browser) {
					var json = { data: data, cachetime: Date.now() / 1000 }
					localStorage.setItem(`${cacheName}`, JSON.stringify(json));
				}
				return data;
			} else if (err) {
				console.error(err);
			}
		}
	}
);

export const situations = asyncDerived(
	([getSituations]),
	async ([$getSituations]) => {
		let situations = (
			$getSituations.map(function (e) {
				const situation = {
					value: e.uid,
					label: e.name
				}
				return situation
			}
			)
		);
		return situations;
	});

function distanceOfEffector(e, distEffectors) {
	console.log(`distanceOfEffector e: ${JSON.stringify(e)}`)
    let uid = e.address?.facility_uid;
	console.log(uid);
	if ( uid ) {
		return distEffectors[uid];
	} else {
		return undefined;
	}
}

function compareEffectorDistance(a, b, distEffectors) {
    let dist_a = distanceOfEffector(a, distEffectors);
	let dist_b = distanceOfEffector(b, distEffectors);
	if (!dist_a && !dist_b) {
		return 0;
	} else if (!dist_a) {
		return 1;
	} else if (!dist_b) {
		return -1;
	} else {
		return (dist_a - dist_b);
	}
}

export const fullFilteredEffectors = asyncDerived(
	([getEffectors, term, selectCommunes, selectSituation, getSituations, distanceEffectors]),
	async ([$getEffectors, $term, $selectCommunes, $selectSituation, $getSituations, $distanceEffectors]) => {
		if (
			!$selectCommunes?.length
			&& $selectSituation == ''
			&& $term == ''
			&& $distanceEffectors == null
		) {
			return $getEffectors
		} else {
			return $getEffectors.filter(function (x) {
				if (!$selectCommunes?.length) {
					return true
				} else {
					return $selectCommunes.includes(x.commune.uid)
				}
			}).filter(function (x) {
				if ($term == '') {
					return true
				} else {
					return normalize(x.name).includes(normalize($term))
				}
			}).filter(function (x) {
				if ($selectSituation == '') {
					return true
				} else {
					let situation = $getSituations.find(obj => { return obj.uid == $selectSituation });
					let effectors = $getSituations.find(obj => { return obj.uid == $selectSituation })?.effectors;
					console.log(effectors)
					let condition = effectors.includes(x.uid);
					console.log(condition);
					return condition;
				}
			})
		}
	}
)

export const filteredEffectors = asyncDerived(
	([fullFilteredEffectors, selectCategories]),
	async ([$fullFilteredEffectors, $selectCategories]) => {
		if (!$selectCategories?.length) {
			return $fullFilteredEffectors
		} else {
			return $fullFilteredEffectors.filter(function (x) {
				if (!$selectCategories?.length) {
					return true
				} else {
					return x.types.map(
						function (currentElement) {
							return currentElement.uid
						}
					).some(r => $selectCategories.includes(r))
				}
			})
		}
	}
)
  
export const categorizedFilteredEffectors = asyncDerived(
	([filteredEffectors, distanceEffectors]),
	async ([$filteredEffectors, $distanceEffectors]) => {
		let categorySet = new Set();
		for (let effector of $filteredEffectors) {
			effector.types.forEach(x=>categorySet.add(x.name))
		}
		let catArray = [];
		console.log(categorySet);
		let categoryArr = Array.from(categorySet);
		categoryArr.sort();
		console.log(categoryArr);
		const effectorsObj = categoryArr.reduce((acc, current) => {
			acc[current] = [];
			return acc;
		  }, {});
		console.log(`effectorsObj: ${JSON.stringify(effectorsObj)}`);
		for (let effector of $filteredEffectors) {
			effector.types.forEach(x=>effectorsObj[x.name].push(effector))
		}
		console.log(`effectorsObj: ${JSON.stringify(effectorsObj)}`);

		console.log(`effectorsObj: ${JSON.stringify(Object.entries(effectorsObj))}`);
		const effectorsMap = new Map(Object.entries(effectorsObj).sort((a, b) => a[1].length - b[1].length));
		if ( $distanceEffectors ) {
		effectorsMap.forEach((value: any) => value.sort((a,b) => compareEffectorDistance(a, b, $distanceEffectors)))
		}
		console.log(`effectorsMap: ${JSON.stringify(Array.from(effectorsMap.entries()))}`);
		return effectorsMap;
	}
)

export const categorizedFullFilteredEffectors = asyncDerived(
	(fullFilteredEffectors),
	async ($fullFilteredEffectors) => {
		let categorySet = new Set();
		for (let effector of $fullFilteredEffectors) {
			effector.types.forEach(x=>categorySet.add(x.name))
		}
		let catArray = [];
		console.log(categorySet);
		let categoryArr = Array.from(categorySet);
		categoryArr.sort();
		console.log(categoryArr);
		const effectorsObj = categoryArr.reduce((acc, current) => {
			acc[current] = [];
			return acc;
		  }, {});
		console.log(`effectorsObj: ${JSON.stringify(effectorsObj)}`);
		for (let effector of $fullFilteredEffectors) {
			effector.types.forEach(x=>effectorsObj[x.name].push(effector))
		}
		const effectorsMap = new Map(Object.entries(effectorsObj).sort((a, b) => a[1].length - b[1].length));
		console.log(`effectorsMap: ${JSON.stringify(Array.from(effectorsMap.entries()))}`);
		return effectorsMap;
	}
)


export const categoryOfCommune = asyncDerived(
	([selectCommunes, categories, filteredEffectors]),
	async ([$selectCommunes, $categories, $filteredEffectors]) => {
		if ($selectCommunes.length == 0) {
			return uniq(
				$filteredEffectors.map(
					function (x) {
						let dct = { value: x.name, label: x.label };
						return x.types
					}
				).flat()
			)/*.map(
				function (x) {
					let dct = { value: x.uid, label: x.name };
					return dct
				}
			)*/
		} else {
			return uniq(
				$filteredEffectors.filter(e => $selectCommunes.includes(e.commune.uid)
				).map(
					function (x) {
						let dct = { value: x.name, label: x.label };
						return x.types
					}
				).flat()
			)/*.map(
				function (x) {
					let dct = { value: x.uid, label: x.name };
					return dct
				}
			)*/
		}
	}
)

export const communeOfCategory = asyncDerived(
	([selectCategories, communes, filteredEffectors]),
	async ([$selectCategories, $communes, $filteredEffectors]) => {
		if ($selectCategories.length == 0) {
			return $communes
		} else {
			return uniq(
				$filteredEffectors.filter(
					x => x.types.map(t => t.uid).some(
						r => $selectCategories.includes(r)
					)
				).map(x => x.commune)
			)
		}
	}
)