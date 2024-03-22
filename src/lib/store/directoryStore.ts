import { writable, derived, readable, get, asyncReadable, asyncDerived } from '@square/svelte-store';
import { variables } from '$lib/utils/constants';
import { browser } from "$app/environment"
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
import { PUBLIC_EFFECTOR_TYPE_LABELS_TTL, PUBLIC_EFFECTORS_TTL, PUBLIC_SITUATIONS_TTL, PUBLIC_FACILITIES_TTL } from '$env/static/public';
import haversine from 'haversine-distance';
import { replacer, reviver } from '$lib/utils/utils';
import type { Situation } from './directoryStoreInterface';

export const term = writable("");
export const selectCommunes = writable([]);
export const selectCommunesValue = writable(null);
export const selCatVal = writable(null);
export const selectCategories = writable([]);
export const selectSituation = writable("");
export const selectSituationValue = writable(null);
export const effectors = writable([]);
export const addressFeature = writable({});
export const inputAddress = writable("");
export const selectFacility = writable("");
export const selectFacilityValue = writable(null);

const next = writable(null);

function normalize(x: string) {
	return x.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export const directories = writable([]);


export const effectorTypeLabels = asyncReadable(
	{},
	async () => {
		var cachelife = parseInt(PUBLIC_EFFECTOR_TYPE_LABELS_TTL);
		const cacheName = "effector_type_labels";
		const apiPath = "/directory/effector_type_labels";
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
			const url = `${variables.BASE_API_URI}${apiPath}`;
			const [response, err] = await handleRequestsWithPermissions(fetch, url);
			if (response) {
				let data = response;
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

export async function fetchElements(path: string, next: string) {
	const effectorsUrl = `${variables.BASE_API_URI}/${path}/${next || ""}`;
	const [response, err] = await handleRequestsWithPermissions(fetch, effectorsUrl);
	if (response) {
		let data: any = response;
		next = data.meta.next;
		return [data.effectors, next]
	}
}

export async function downloadElements(path: string) {
	let hasMore = true;
	let data = [];
	let next = "";
	while (hasMore) {
		const [_elements, _next] = await fetchElements(path, next);
		data = [...data, ..._elements];
		if (_next === null) {
			hasMore = false;
		} else {
			next = _next
		}
	}
	return data
}

async function fetchContacts(next) {
	const url = `${variables.BASE_API_URI}/contacts/${next || ""}`;
	const [response, err] = await handleRequestsWithPermissions(fetch, url);
	if (response) {
		let data: any = response;
		next = data.meta.next;
		return [data.contacts, next]
	}
};

async function downloadContacts() {
	let hasMore = true;
	let contacts = [];
	let next = "";
	while (hasMore) {
		const [_contacts, _next] = await fetchContacts(next);
		contacts = [...contacts, ..._contacts];
		if (_next === null) {
			hasMore = false;
		} else {
			next = _next
		}
	}
	return contacts
}

async function fetchEffectors(next) {
	const effectorsUrl = `${variables.BASE_API_URI}/effectors/${next || ""}`;
	const [response, err] = await handleRequestsWithPermissions(fetch, effectorsUrl);
	if (response) {
		let data: any = response;
		next = data.meta.next;
		return [data.effectors, next]
	}
}

async function fetchEffector(uid) {
	const effectorsUrl = `${variables.BASE_API_URI}/effectors/${uid}`;
	const [response, err] = await handleRequestsWithPermissions(fetch, effectorsUrl);
	if (err) {
		console.log(JSON.stringify(err));
	}
	if (response) {
		let data: any = response;
		return data;
	}
}

type ChangedObj = {
	toAdd: string[];
	toDelete: string[];
	toUpdate: string[];
};

function isUnchanged(changedObj: ChangedObj) {
	return (changedObj.toAdd?.length == 0
		&& changedObj.toDelete?.length == 0
		&& changedObj.toUpdate?.length == 0)
}

function changedContacts(contacts, effectors): ChangedObj {
	const changedObj: ChangedObj = {
		toAdd: [],
		toDelete: [],
		toUpdate: [],
	};
	contacts.forEach(
		(contact, index, array) => {
			let effectorIndex = effectors.findIndex(
				(e) => e.uid == contact.uid);
			if (effectorIndex == -1) {
				changedObj.toAdd.push(contact.uid)
			} else if ((effectors[effectorIndex]?.updatedAt ?? 0) < contact.timestamp) {
				changedObj.toUpdate.push(contact.uid)
			}
		}
	)
	effectors.forEach(
		(effector, index, array) => {
			let contact = contacts.find(
				(e) => e.uid == effector.uid);
			if (contact === undefined) {
				changedObj.toDelete.push(effector.uid)
			}
		}
	)
	return changedObj
}

async function downloadAllEffectors() {
	let hasMore = true
	let next = "";
	let effectors = [];
	while (hasMore) {
		const [_effectors, _next] = await fetchEffectors(next);
		effectors = [...effectors, ..._effectors];
		if (_next === null) {
			hasMore = false;
		} else {
			next = _next
		}
	}
	setLocalStorage('effectors', effectors);
	return effectors;
}

function createID_4_4_4_4(s) {
	return (1e16 + s).slice(-16).match(/..../g).join('-')
}

function setLocalStorage(key: string, data: Array<Object>): void {
	if (browser) {
		var json = { data: data, cachetime: Date.now() / 1000 }
		localStorage.setItem(key, JSON.stringify(json))
	}
}

function getLocalStorage(key: string): any | null | undefined {
	if (browser) {
		const localStorageString = localStorage.getItem(key);
		if (localStorageString === null) {
			return null
		}
		let data = JSON.parse(localStorageString);
		return data;
	}
}

async function processCachedEffectors(changedObj: ChangedObj) {
	let effectors = getLocalStorage('effectors').data;
	if (changedObj.toDelete.length) {
		effectors.filter(
			(e, index, arr) => {
				let idx = changedObj.toDelete.indexOf(e.uid);
				if (idx > -1) {
					//console.log(`delete ${JSON.stringify(JSON.stringify(arr[index]))}`)
					arr.splice(index, 1);
					return true;
				}
				return false;
			}
		)
		setLocalStorage('effectors', effectors);
	}
	if (changedObj.toAdd.length) {
		changedObj.toAdd.forEach(
			async (uid, idx, arr) => {
				const newEffector = await fetchEffector(uid);
				//console.log(`add ${JSON.stringify(newEffector)}`);
				let count = effectors.push(newEffector);
				//console.log(`add effectors count: ${count}`);
				setLocalStorage('effectors', effectors);
			}
		)
	}
	if (changedObj.toUpdate.length) {
		changedObj.toUpdate.forEach(
			async (uid, idx, arr) => {
				effectors.filter(
					(element, index, array) => {
						if (element.uid == uid) {
							//console.log(`update: splice ${JSON.stringify(arr[index])}`);
							array.splice(index, 1);
							return true;
						}
						return false;
					}
				)
				const updatedEffector = await fetchEffector(uid);
				let count = effectors.push(updatedEffector);
				//console.log(`effectors count: ${count}`);
				setLocalStorage('effectors', effectors);
			}
		)
	}
	return effectors;
}

export const getEffectors = asyncReadable(
	{},
	async () => {
		//let contacts = getLocalStorage("contacts")?.data;
		//if (!import.meta.env.DEV && PUBLIC_CACHE_CONTACTS=="false" || contacts==null) {
		let contacts = await downloadContacts();
		//}
		let localContacts;
		let localContactsObj = getLocalStorage('contacts');
		localContacts = localContactsObj?.data;
		setLocalStorage('contacts', contacts)
		if (localContacts === null || localContacts === undefined) {
			let effectors = await downloadAllEffectors();
			setLocalStorage('effectors', effectors);
			//console.log(`250 getEffectors effectors:${effectors}`);
			return effectors;
		}

		var cachelife = parseInt(PUBLIC_EFFECTORS_TTL);
		let expired: boolean = true;
		let empty: boolean = true;
		const cachedEffectorsObj = getLocalStorage('effectors');
		let changedObj;
		if (cachedEffectorsObj) {
			let elapsed = (Date.now() / 1000) - cachedEffectorsObj.cachetime;
			expired = elapsed > cachelife;
			if ('data' in cachedEffectorsObj) {
				if (cachedEffectorsObj.data?.length) {
					empty = false;
				}
			}
			changedObj = changedContacts(contacts, cachedEffectorsObj.data);
			//console.log(`isUnchanged: ${isUnchanged(changedObj)}`)
		}
		if (!expired && !empty && changedObj && isUnchanged(changedObj)) {
			//console.log(`cachedEffectorsObj.data: ${cachedEffectorsObj.data}`);
			return cachedEffectorsObj.data;
		} else if (expired || empty) {
			const allEffectors = await downloadAllEffectors();
			//console.log(`allEffectors: ${allEffectors}`);
			return allEffectors;
		} else {
			const effectors = await processCachedEffectors(changedObj);
			//console.log(`279 effectors: ${effectors}`);
			return effectors;
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
		//console.log(`targetGeoJSON: ${targetGeoJSON}`);
		const distanceOfEffector = {};
		for (const effector of $getEffectors) {
			let longitude = effector.address.longitude;
			let latitude = effector.address.latitude;
			//console.log(longitude, latitude);
			if (!longitude || !latitude) {
				continue;
			}
			const effectorGeoJSON = [parseFloat(longitude), parseFloat(latitude)] as any;
			const dist = haversine(targetGeoJSON, effectorGeoJSON);
			distanceOfEffector[effector.address.facility_uid] = dist;
		}
		//console.log(distanceOfEffector);
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

export const facilities = asyncReadable(
	{},
	async () => {
		var cachelife = parseInt(PUBLIC_FACILITIES_TTL);
		const cacheName = "facilities";
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
			const url = `${variables.BASE_API_URI}/facilities`;
			const [response, err] = await handleRequestsWithPermissions(fetch, url);
			if (response) {
				let data = response?.facilities;
				data = data.sort(function (a, b) {
					return a.name.localeCompare(b.name);
				})
				if (browser) {
					var json = { data: data, cachetime: Date.now() / 1000 }
					localStorage.setItem(`${cacheName}`, JSON.stringify(json));
				}
				//console.log(data);
				return data;
			} else if (err) {
				console.error(err);
			}
		}
	}
);

export const getSituations = asyncReadable(
	{},
	async () => {
		var cachelife = parseInt(PUBLIC_SITUATIONS_TTL);
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
		let situations: [] | Situation[] = [];
		try {
			situations = (
				$getSituations.sort(function (a, b) {
					return a.name.localeCompare(b.name);
				}).map(function (e) {
					const situation = {
						value: e.uid,
						label: e.name
					}
					return situation
				}
				)
			);
		} catch (e) {
			console.error(e);
		}
		return situations;
	});

function distanceOfEffector(e, distEffectors) {
	//console.log(`distanceOfEffector e: ${JSON.stringify(e)}`)
	let uid = e.address?.facility_uid;
	//console.log(uid);
	if (uid) {
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

export const fullFilteredEffectors = derived(
	([getEffectors, term, selectSituation, getSituations, distanceEffectors]),
	([$getEffectors, $term, $selectSituation, $getSituations, $distanceEffectors]) => {
		/*try {
		console.log(`fullFilteredEffectors $getEffectors: ${JSON.parse($getEffectors)}`);
		} catch (e) {
			console.log(`fullFilteredEffectors $getEffectors: ${$getEffectors}`);
		}
		console.log(`fullFilteredEffectors $getEffectors type: ${typeof ($getEffectors)}`);*/
		if (
			$selectSituation == ''
			&& $term == ''
			&& $distanceEffectors == null
		) {
			//console.log("fullFilteredEffectors: return $getEffectors");
			return $getEffectors
		} else {
			return $getEffectors.filter(function (x) {
				if ($term == '') {
					return true
				} else {
					return normalize(x.name).includes(normalize($term))
				}
			}).filter(function (x) {
				if ($selectSituation == '') {
					return true
				} else {
					let effectors = $getSituations.find(obj => { return obj.uid == $selectSituation })?.effectors;
					//console.log(effectors);
					let condition = effectors.includes(x.uid);
					//console.log(condition);
					return condition;
				}
			})
		}
	}
)

export const filteredEffectors = asyncDerived(
	([fullFilteredEffectors, selectCategories, selectCommunes, selectFacility]),
	async ([$fullFilteredEffectors, $selectCategories, $selectCommunes, $selectFacility]) => {
		if (!$selectCategories?.length && !$selectCommunes?.length && $selectFacility === "") {
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
			}).filter(function (x) {
				if (!$selectCommunes?.length) {
					return true
				} else {
					return $selectCommunes.includes(x.commune.uid)
				}
			}).filter(function (x) {
				if ($selectFacility === "") {
					return true
				} else {
					return $selectFacility == x.facility.uid
				}
			})
		}
	}
)

export const categorizedCachedEffectors =
	() => {
		const cachedEffectorsObj = getLocalStorage('effectors');
		const cachedEffectors = cachedEffectorsObj?.data;
		if (!cachedEffectors) {
			return null;
		}
		let categorySet = new Set();
		for (let effector of cachedEffectors) {
			effector.types.forEach(x => categorySet.add(x.name))
		}
		let categoryArr = Array.from(categorySet);
		categoryArr.sort();
		const effectorsObj = categoryArr.reduce((acc, current) => {
			acc[current] = [];
			return acc;
		}, {});
		for (let effector of cachedEffectors) {
			effector.types.forEach(x => effectorsObj[x.name].push(effector))
		}
		//console.log(`effectorsObj: ${JSON.stringify(effectorsObj)}`);
		//console.log(`effectorsObj: ${JSON.stringify(Object.entries(effectorsObj))}`);
		const effectorsMap = new Map(Object.entries(effectorsObj).sort((a, b) => a[1].length - b[1].length));
		//console.log(`effectorsMap: ${JSON.stringify(Array.from(effectorsMap.entries()))}`);
		return effectorsMap;
	};

export const categorizedFilteredEffectors = asyncDerived(
	([filteredEffectors, distanceEffectors, selectSituation]),
	async ([$filteredEffectors, $distanceEffectors, $selectSituation]) => {
		let categorySet = new Set();
		for (let effector of $filteredEffectors) {
			effector.types.forEach(x => categorySet.add(x.name))
		}
		//console.log(categorySet);
		let categoryArr = Array.from(categorySet);
		categoryArr.sort();
		//console.log(categoryArr);
		const effectorsObj = categoryArr.reduce((acc, current) => {
			acc[current] = [];
			return acc;
		}, {});
		//console.log(`effectorsObj: ${JSON.stringify(effectorsObj)}`);
		for (let effector of $filteredEffectors) {
			effector.types.forEach(x => effectorsObj[x.name].push(effector))
		}
		//console.log(`effectorsObj: ${JSON.stringify(effectorsObj)}`);

		//console.log(`effectorsObj: ${JSON.stringify(Object.entries(effectorsObj))}`);
		const sortedEffectorsObj = $selectSituation ? Object.entries(effectorsObj).sort((a, b) => a[1].length - b[1].length) : Object.entries(effectorsObj).sort(function (a, b) {
			return a[0].localeCompare(b[0]);
		});
		const effectorsMap = new Map(sortedEffectorsObj);
		if ($distanceEffectors) {
			effectorsMap.forEach((value: any) => value.sort((a, b) => compareEffectorDistance(a, b, $distanceEffectors)))
		}
		//console.log(`effectorsMap: ${JSON.stringify(Array.from(effectorsMap.entries()))}`);
		return effectorsMap;
	}
)

export const cardinalCategorizedFilteredEffectors = asyncDerived(
	([categorizedFilteredEffectors, effectorTypeLabels, filteredEffectors]),
	async ([$categorizedFilteredEffectors, $effectorTypeLabels, $filteredEffectors]) => {
		let cardinalMap = new Map();
		for (var [key, value] of $categorizedFilteredEffectors) {
			let label = key;
			let countF: number = 0;
			let countM: number = 0;
			let countN: number = 0;
			let type;
			value.forEach(
				(e) => {
					type = e.types.find(e => e.name == key);
					if (e.gender == 'F') {
						countF += 1;
					} else if (e.gender == 'M') {
						countM += 1;
					} else if (e.gender == 'N') {
						countN += 1;
					}
				}
			)
			if (value.length > 1) {
				if (countF > countM) {
					label = $effectorTypeLabels[type.uid]['P']['F']
				} else {
					label = $effectorTypeLabels[type.uid]['P']['M']
				}
			} else {
				if (countF > countM) {
					label = $effectorTypeLabels[type.uid]['S']['F']
				} else {
					label = $effectorTypeLabels[type.uid]['S']['M']
				}
			}
			cardinalMap.set(label, value)
		}
		return cardinalMap;
	}
)

export const categorizedEffectors = asyncDerived(
	([getEffectors]),
	async ([$getEffectors]) => {
		let categorySet = new Set();
		for (let effector of $getEffectors) {
			effector.types.forEach(x => categorySet.add(x.name))
		}
		//console.log(categorySet);
		let categoryArr = Array.from(categorySet);
		categoryArr.sort();
		//console.log(categoryArr);
		const effectorsObj = categoryArr.reduce((acc, current) => {
			acc[current] = [];
			return acc;
		}, {});
		//console.log(`effectorsObj: ${JSON.stringify(effectorsObj)}`);
		for (let effector of $getEffectors) {
			effector.types.forEach(x => effectorsObj[x.name].push(effector))
		}
		//console.log(`effectorsObj: ${JSON.stringify(effectorsObj)}`);
		//console.log(`effectorsObj: ${JSON.stringify(Object.entries(effectorsObj))}`);
		const sortedEffectorsObj = Object.entries(effectorsObj).sort(function (a, b) {
			return a[0].localeCompare(b[0]);
		});
		const effectorsMap = new Map(sortedEffectorsObj);
		//console.log(`effectorsMap: ${JSON.stringify(Array.from(effectorsMap.entries()))}`);
		return effectorsMap;
	}
)


export const cardinalTypes = asyncDerived(
	([categorizedEffectors, effectorTypeLabels]),
	async ([$categorizedEffectors, $effectorTypeLabels]) => {
		let cardinalMap = new Map();
		for (var [key, value] of $categorizedEffectors) {
			let label = key;
			let countF: number = 0;
			let countM: number = 0;
			let countN: number = 0;
			let type;
			value.forEach(
				(e) => {
					type = e.types.find(e => e.name == key);
					if (e.gender == 'F') {
						countF += 1;
					} else if (e.gender == 'M') {
						countM += 1;
					} else if (e.gender == 'N') {
						countN += 1;
					}
				}
			)
			if (value.length > 1) {
				if (countF > countM) {
					label = $effectorTypeLabels[type.uid]['P']['F']
				} else {
					label = $effectorTypeLabels[type.uid]['P']['M']
				}
			} else {
				if (countF > countM) {
					label = $effectorTypeLabels[type.uid]['S']['F']
				} else {
					label = $effectorTypeLabels[type.uid]['S']['M']
				}
			}
			let value_dct = {
				'count': value.length,
				'slug': type.slug,
				'uid': type.uid,
			};
			cardinalMap.set(label, value_dct)
		}
		return cardinalMap;
	}
)

export const categorizedFullFilteredEffectors = asyncDerived(
	(fullFilteredEffectors),
	async ($fullFilteredEffectors) => {
		let categorySet = new Set();
		for (let effector of $fullFilteredEffectors) {
			effector.types.forEach(x => categorySet.add(x.name))
		}
		let catArray = [];
		//console.log(categorySet);
		let categoryArr = Array.from(categorySet);
		categoryArr.sort();
		//console.log(categoryArr);
		const effectorsObj = categoryArr.reduce((acc, current) => {
			acc[current] = [];
			return acc;
		}, {});
		//console.log(`effectorsObj: ${JSON.stringify(effectorsObj)}`);
		for (let effector of $fullFilteredEffectors) {
			effector.types.forEach(x => effectorsObj[x.name].push(effector))
		}
		const effectorsMap = new Map(Object.entries(effectorsObj).sort((a, b) => a[1].length - b[1].length));
		//console.log(`effectorsMap: ${JSON.stringify(Array.from(effectorsMap.entries()))}`);
		return effectorsMap;
	}
)

export const categoryOf = derived(
	([selectCommunes, fullFilteredEffectors, selectFacility]),
	([$selectCommunes, $fullFilteredEffectors, $selectFacility,]) => {
		//console.log(`categoryOf fullFilteredEffectors: "${$fullFilteredEffectors}" type: ${typeof($fullFilteredEffectors)}`);
		if (!Array.isArray($fullFilteredEffectors)) {
			return []
		}
		if (!$selectCommunes.length && $selectFacility == "") {
			return uniq(
				$fullFilteredEffectors.map(
					function (x) {
						return x.types
					}
				).flat()
			)
		} else {
			return uniq(
				$fullFilteredEffectors.filter(
					function (x) {
						return (
							(!$selectCommunes.length || $selectCommunes.includes(x.commune.uid)) && (!$selectFacility || $selectFacility == x.uid)
						)
					}
				).map(
					function (x) {
						return x.types
					}
				).flat()
			)
		}
	}
)

export const communeOf = derived(
	([selectCategories, communes, fullFilteredEffectors, selectFacility]),
	([$selectCategories, $communes, $fullFilteredEffectors, $selectFacility]) => {
		if (!$selectCategories?.length && !$selectFacility) {
			return $communes
		} else {
			return uniq(
				$fullFilteredEffectors.filter(
					x => {
						return (!$selectCategories?.length || x.types.map(t => t.uid).some(
							r => $selectCategories.includes(r)
						)) && (!$selectFacility || x.facility.uid == $selectFacility)
					}
				).map(x => x.commune)
			)
		}
	}
)

export const facilityOf = asyncDerived(
	([selectCategories, facilities, fullFilteredEffectors, selectCommunes]),
	async ([$selectCategories, $facilities, $fullFilteredEffectors, $selectCommunes]) => {
		if (!$selectCategories?.length && !$selectCommunes?.length) {
			return $facilities.map(x => x.uid)
		} else {
			return uniq(
				$fullFilteredEffectors.filter(
					(x) => {
						return (
							(!$selectCategories?.length || x.types.map(t => t.uid).some(
								r => $selectCategories.includes(r)
							)) && (!$selectCommunes?.length || $selectCommunes.includes($facilities.find(({ uid }) => uid === x.facility.uid).commune)
							))
					}
				).map(x => x.facility.uid)
			)
		}
	}
)