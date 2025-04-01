import { writable, derived, readable, get, asyncReadable, asyncDerived } from '@square/svelte-store';
import { variables } from '$lib/utils/constants.ts';
import { browser } from "$app/environment"
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils.ts';
import { PUBLIC_EFFECTOR_TYPE_LABELS_TTL, PUBLIC_ENTRIES_TTL, PUBLIC_SITUATIONS_TTL, PUBLIC_FACILITIES_TTL, PUBLIC_CACHE_CONTACTS } from '$env/static/public';
import haversine from 'haversine-distance';
import { replacer, reviver } from '$lib/utils/utils.ts';
import type { Situation } from '$lib/store/directoryStoreInterface.ts';
import { getFacilities, facilityStore } from '$lib/store/facilityStore.ts';
import { shuffle } from '$lib/helpers/random.ts';
import type { Writable, AsyncWritable } from '@square/svelte-store';
import type { Contact, Entry, Facility, CurrentOrg, CurrentOrgStore, LimitCategoriesStore, AddressFeature, DistanceEffectors, CategorizedEntries, Type } from './directoryStoreInterface.ts';

export const term: Writable<string> = writable("");
export const selectCommunes: Writable<string[]> = writable([]);
export const selectCommunesValue = writable(null);
export const selCatVal: Writable<{label:string,value:string}|null> = writable(null);
export const selectCategories: Writable<string[]> = writable([]);
export const limitCategories: LimitCategoriesStore = writable([]);
export const selectSituation: Writable<string> = writable("");
export const selectSituationValue: Writable<string | null> = writable(null);
export const addressFeature: Writable<AddressFeature> = writable({});
export const inputAddress = writable("");
export const selectFacility = writable("");
export const selectFacilityValue: Writable<string|null> = writable(null);
export const currentOrg: CurrentOrgStore = writable(true);
export const directoryRedirect = writable(true);

const next = writable(null);

function normalize(x: string) {
	return x.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export const directories = writable([]);

export const effectorTypeLabels = async () => {
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
		let elapsed = Date.now() - cachedData.cachetime;
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
				var json = { data: data, cachetime: Date.now() }
				localStorage.setItem(`${cacheName}`, JSON.stringify(json));
			}
			return data;
		} else if (err) {
			console.error(err);
		}
	}
};

export async function fetchElements(path: string, next: string) {
	const url = `${variables.BASE_API_URI}/${path}/${next || ""}`;
	const [response, err] = await handleRequestsWithPermissions(fetch, url);
	if (response) {
		let data: any = response;
		next = data.meta.next;
		return [data[path], next]
	}
}

export async function downloadElements(path: string) {
	let hasMore = true;
	let data: any[] = [];
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

async function fetchEntries(next) {
	const url = `${variables.BASE_API_URI}/entries/${next || ""}`;
	const [response, err] = await handleRequestsWithPermissions(fetch, url);
	if (response) {
		let data: any = response;
		next = data.meta.next;
		return [data.entries, next]
	}
}

async function fetchEntry(uid) {
	const entriesUrl = `${variables.BASE_API_URI}/entries/${uid}`;
	const [response, err] = await handleRequestsWithPermissions(fetch, entriesUrl);
	if (err) {
		console.error(JSON.stringify(err));
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

function changedContacts(contacts: Contact[], entries: Entry[]): ChangedObj {
	const changedObj: ChangedObj = {
		toAdd: [],
		toDelete: [],
		toUpdate: [],
	};
	contacts.forEach(
		(contact, index, array) => {
			let entryIndex = entries.findIndex(
				(e) => e.uid == contact.uid);
			if (entryIndex == -1) {
				changedObj.toAdd.push(contact.uid)
			} else if ((entries[entryIndex]?.updatedAt ?? 0) < contact.timestamp) {
				changedObj.toUpdate.push(contact.uid)
			}
		}
	)
	entries.forEach(
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

async function downloadAllEntries() {
	let hasMore = true
	let next = "";
	let entries: Entry[] = [];
	while (hasMore) {
		const [_entries, _next] = await fetchEntries(next);
		entries = [...entries, ..._entries];
		if (_next === null) {
			hasMore = false;
		} else {
			next = _next
		}
	}
	setLocalStorage('entries', entries);
	return entries;
}

function setLocalStorage(key: string, data: Array<Object>): void {
	if (browser) {
		var json = { data: data, cachetime: Date.now() }
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

async function processCachedEntries(changedObj: ChangedObj) {
	let entries: Entry[] = getLocalStorage('entries').data;
	if (changedObj.toDelete.length) {
		entries.filter(
			(e, index, arr) => {
				let idx = changedObj.toDelete.indexOf(e.uid);
				if (idx > -1) {
					arr.splice(index, 1);
					return true;
				}
				return false;
			}
		)
		setLocalStorage('entries', entries);
	}
	if (changedObj.toAdd.length) {
		changedObj.toAdd.forEach(
			async (uid, idx, arr) => {
				const newEntry = await fetchEntry(uid);
				let count = entries.push(newEntry);
				setLocalStorage('entries', entries);
			}
		)
	}
	if (changedObj.toUpdate.length) {
		changedObj.toUpdate.forEach(
			async (uid, idx, arr) => {
				entries.filter(
					(element, index, array) => {
						if (element.uid == uid) {
							array.splice(index, 1);
							return true;
						}
						return false;
					}
				)
				const updatedEntry = await fetchEntry(uid);
				let count = entries.push(updatedEntry);
				setLocalStorage('entries', entries);
			}
		)
	}
	return entries;
}

export const getEntries = async () => {
	let contacts = getLocalStorage("contacts")?.data;
	const refreshContacts = (!import.meta.env.DEV && PUBLIC_CACHE_CONTACTS=="false" || contacts==null);
	if ( refreshContacts ) {
	    contacts = await downloadElements("contacts");
		setLocalStorage('contacts', contacts)
	}
	var cachelife = parseInt(PUBLIC_ENTRIES_TTL);
	let expired: boolean = true;
	let empty: boolean = true;
	const cachedEffectorsObj = getLocalStorage('entries');
	let changedObj;
	if (cachedEffectorsObj) {
		let elapsed = Date.now() - cachedEffectorsObj.cachetime;
		expired = elapsed > cachelife;
		if ('data' in cachedEffectorsObj) {
			if (cachedEffectorsObj.data?.length) {
				empty = false;
			}
		}
	}
	if ( empty ) {
		const allEffectors = await downloadAllEntries();
		return allEffectors;
	}
	if ( expired ) {
		contacts = await downloadElements("contacts");
		setLocalStorage('contacts', contacts);
		changedObj = changedContacts(contacts, cachedEffectorsObj.data);
		if (isUnchanged(changedObj)) {
		    return cachedEffectorsObj.data;
		} else {
			const effectors = await processCachedEntries(changedObj);
			return effectors;	
		}
	}
	return cachedEffectorsObj.data;
};

export const getAvatars = asyncDerived(
	([facilityStore]),
	async([$facilityStore]) => {
	const cachedEffectorsObj = getLocalStorage('entries');
	let cachedEffectors = cachedEffectorsObj?.data;
	if (!cachedEffectors) {
		cachedEffectors = await getEntries();
	}
	let carousel = cachedEffectors.filter(function (item: Entry) {
		return (item?.avatar?.lt && item?.organizations.includes($facilityStore.uid))
	});
	shuffle(carousel);
	return carousel
});

export const distanceEffectorsF = async (addressFeature: AddressFeature) => {
	const targetGeoJSON = addressFeature?.geometry?.coordinates;
	if (!targetGeoJSON) {
		return {};
	}
	const distanceOfEffector: DistanceEffectors = {};
	const effectors = await getEntries();
	for (const effector of effectors) {
		let longitude = effector.address.longitude;
		let latitude = effector.address.latitude;
		if (!longitude || !latitude) {
			continue;
		}
		const effectorGeoJSON = [parseFloat(longitude), parseFloat(latitude)] as any;
		const dist = haversine(targetGeoJSON, effectorGeoJSON);
		distanceOfEffector[effector.address.facility_uid] = dist;
	}
	return distanceOfEffector;
}

export const distanceEffectors = asyncDerived(
	([addressFeature]),
	async ([$addressFeature]) => {
		return distanceEffectorsF($addressFeature);
	}
);

function uniq(a) {
	var seen = {};
	return a.filter(function (item) {
		return seen.hasOwnProperty(item.uid) ? false : (seen[item.uid] = true);
	});
}

export const communes = async () => {
	const effectors = await getEntries();
	let communes = (
		uniq(effectors.map(function (currentElement) {
			return currentElement.commune
		}
		).flat()).sort(function (a, b) {
			return a.name.localeCompare(b.name);
		})
	);
	return communes
};

export const categories = async () => {
	const effectors = await getEntries();
	let categories = (
		uniq(effectors.map(function (currentElement) {
			return currentElement.types.flat()
		}
		).flat()).sort(function (a, b) {
			return a.uid.localeCompare(b.uid);
		})
	);
	return categories
};

export const getSituations = async (): Promise<Situation[]> => {
	let situations: Situation[] = [];
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
		let elapsed = Date.now() - cachedData.cachetime;
		expired = elapsed > cachelife;
		if ('data' in cachedData) {
			if (cachedData.data?.length) {
				empty = false;
			}
		}
	}
	if (cachedData && !expired && !empty) {
		situations = cachedData.data;
	} else {
		const url = `${variables.BASE_API_URI}/situations`;
		const [response, err] = await handleRequestsWithPermissions(fetch, url);
		if (response) {
			situations = response?.situations;
			if (browser) {
				var json = { data: situations, cachetime: Date.now() }
				localStorage.setItem(`${cacheName}`, JSON.stringify(json));
			}
		} else if (err) {
			console.error(err);
			throw (err);
		}
	}
	return situations;
};

type SituationItem = { value: string, label: string }

export const situations = async () => {
	const unsortedSituations: Situation[] = await getSituations();
	let situationItems: SituationItem[] = [];
	try {
		situationItems = (
			unsortedSituations.sort(function (a, b) {
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
	return situationItems;
};

function distanceOfEffector(entry: Entry, distEffectors) {
	let uid = entry.address?.facility_uid;
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

export const fullFilteredEffectorsF = async (term: string, selectSituation: string, distanceEffectors: DistanceEffectors, currentOrg: Boolean | null, facilityStore: Facility, limitCategories: String[]) => {
	const entries: Entry[] = await getEntries();
	if (
		selectSituation == ''
		&& term == ''
		&& distanceEffectors == null
		&& currentOrg == null
		&& !limitCategories?.length
	) {
		return entries
	} else {
		const situations = await getSituations();
		return entries.filter(function (x) {
			if (!limitCategories?.length) {
				return true
			} else {
				return x.types.map(
					function (currentElement) {
						return currentElement.slug
					}
				).some(r => limitCategories.includes(r))
			}
		}).filter(function (x) {
			if (currentOrg == true) {
				return x.organizations.includes(facilityStore.uid)
			} else if (currentOrg == false) {
				return !x.organizations.includes(facilityStore.uid)
			} else {
				return true
			}
		}
		).filter(function (x) {
			if (term == '') {
				return true
			} else {
				return normalize(x.name).includes(normalize(term))
			}
		}).filter(function (x) {
			if (selectSituation == '') {
				return true
			} else {
				let effectors = situations.find(obj => { return obj.uid == selectSituation })?.effectors;
				let condition = effectors.includes(x.uid);
				return condition;
			}
		})
	}
};

export const fullFilteredEffectors = asyncDerived(
	([term, selectSituation, distanceEffectors, currentOrg, facilityStore, limitCategories]),
	async ([$term, $selectSituation, $distanceEffectors, $currentOrg, $facilityStore, $limitCategories]) => {
		return await fullFilteredEffectorsF($term, $selectSituation, $distanceEffectors, $currentOrg, $facilityStore, $limitCategories)
	}
);

export const filteredEffectorsF = (fullFilteredEffectors: Entry[], selectCategories: String[], selectCommunes: String[], selectFacility: string) => {
	if (!selectCategories?.length && !selectCommunes?.length && selectFacility === "") {
		return fullFilteredEffectors
	} else {
		return fullFilteredEffectors.filter(function (x) {
			if (!selectCategories?.length) {
				return true
			} else {
				return x.types.map(
					function (currentElement) {
						return currentElement.uid
					}
				).some(r => selectCategories.includes(r))
			}
		}).filter(function (x) {
			if (!selectCommunes?.length) {
				return true
			} else {
				return selectCommunes.includes(x.commune.uid)
			}
		}).filter(function (x) {
			if (selectFacility === "") {
				return true
			} else {
				return selectFacility == x.facility.uid
			}
		})
	}
}

export const filteredEffectors = asyncDerived(
	([fullFilteredEffectors, selectCategories, selectCommunes, selectFacility]),
	async ([$fullFilteredEffectors, $selectCategories, $selectCommunes, $selectFacility]) => {
		return filteredEffectorsF($fullFilteredEffectors, $selectCategories, $selectCommunes, $selectFacility)
	}
)

/*
export const categorizedCachedEffectors =
	() => {
		const cachedEffectorsObj = getLocalStorage('entries');
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
		const effectorsMap = new Map(Object.entries(effectorsObj).sort((a, b) => a[1].length - b[1].length));
		return effectorsMap;
	};
*/

export const categorizedFilteredEffectorsF = (filteredEffectors: Entry[], distanceEffectors: DistanceEffectors, selectSituation: string) => {
	let categorySet = new Set();
	for (let effector of filteredEffectors) {
		effector.types.forEach(x => categorySet.add(x.name))
	}
	let categoryArr = Array.from(categorySet);
	categoryArr.sort();
	const effectorsObj = categoryArr.reduce((acc, current) => {
		acc[current] = [];
		return acc;
	}, {});
	for (let effector of filteredEffectors) {
		effector.types.forEach(x => effectorsObj[x.name].push(effector))
	}

	const sortedEffectorsObj = selectSituation ? Object.entries(effectorsObj).sort((a, b) => a[1].length - b[1].length) : Object.entries(effectorsObj).sort(function (a, b) {
		return a[0].localeCompare(b[0]);
	});
	const effectorsMap = new Map(sortedEffectorsObj);
	if (distanceEffectors) {
		effectorsMap.forEach((value: any) => value.sort((a, b) => compareEffectorDistance(a, b, distanceEffectors)))
	}
	return effectorsMap as CategorizedEntries;
};

export const categorizedFilteredEffectors = asyncDerived(
	([filteredEffectors, distanceEffectors, selectSituation]),
	async ([$filteredEffectors, $distanceEffectors, $selectSituation]) => {
		return categorizedFilteredEffectorsF($filteredEffectors, $distanceEffectors, $selectSituation)
	}
)

export const cardinalCategorizedFilteredEffectorsF = async (categorizedFilteredEffectors: CategorizedEntries) => {
	const eTL = await effectorTypeLabels();
	let cardinalMap = new Map();
	for (const [key, value] of categorizedFilteredEffectors) {
		let label = key;
		let countF: number = 0;
		let countM: number = 0;
		let countN: number = 0;
		let countNone: number = 0;
		let type: Type | undefined;
		value.forEach(
			(e) => {
				type = e.types.find(e => e.name == key)
			}
		);
		if (type === undefined) {
			throw new Error('Type not found');
		}
		value.forEach(
			(e) => {
				if (e.gender == 'F') {
					countF += 1;
				} else if (e.gender == 'M') {
					countM += 1;
				} else if (e.gender == 'N') {
					countN += 1;
				} else if (e.gender == undefined) {
					countNone += 1;
				}
			}
		)
		if (value.length == countNone) {
			if (value.length > 1) {
				label = eTL[type.uid]['P']['N']
			} else {
				label = eTL[type.uid]['S']['N']
			}
		} else {
			if (value.length > 1) {
				if (countF > countM) {
					label = eTL[type.uid]['P']['F']
				} else {
					label = eTL[type.uid]['P']['M']
				}
			} else {
				if (countF > countM) {
					label = eTL[type.uid]['S']['F']
				} else {
					label = eTL[type.uid]['S']['M']
				}
			}
		}
		cardinalMap.set(label, value)
	}
	return cardinalMap;
};

export const cardinalCategorizedFilteredEffectors = asyncDerived(
	([categorizedFilteredEffectors, filteredEffectors]),
	async ([$categorizedFilteredEffectors, $filteredEffectors]) => {
		return cardinalCategorizedFilteredEffectorsF($categorizedFilteredEffectors);
	}
)

const categorizedEffectors = asyncDerived(
	([currentOrg, facilityStore, limitCategories]),
	async ([$currentOrg, $facilityStore, $limitCategories]) => {
		const unfilteredEntries: Entry[] = await getEntries();
		const entries: Entry[] = unfilteredEntries.filter(
			function (x) {
				if ($currentOrg == true) {
					return x.organizations.includes($facilityStore.uid)
				} else if ($currentOrg == false) {
					return !x.organizations.includes($facilityStore.uid)
				} else {
					return true
				}
			}
		).filter(function (x) {
			if (!$limitCategories?.length) {
				return true
			} else {
				return x.types.map(
					function (currentElement) {
						return currentElement.slug
					}
				).some(r => $limitCategories.includes(r))
			}
		});
		let categorySet = new Set();
		for (let entry of entries) {
			entry.types.forEach(x => categorySet.add(x.name))
		}
		let categoryArr = Array.from(categorySet);
		categoryArr.sort();
		const effectorsObj = categoryArr.reduce((acc, current) => {
			acc[current] = [];
			return acc;
		}, {});
		for (let entry of entries) {
			entry.types.forEach(x => effectorsObj[x.name].push(entry))
		}
		const sortedEffectorsObj = Object.entries(effectorsObj).sort(function (a, b) {
			return a[0].localeCompare(b[0]);
		});
		const effectorsMap = new Map(sortedEffectorsObj);
		return effectorsMap as CategorizedEntries;
	}
);

export const cardinalTypes = asyncDerived(
	([categorizedEffectors]),
	async ([$categorizedEffectors]) => {
		const eTL = await effectorTypeLabels();
		let cardinalMap = new Map();
		for (var [key, value] of $categorizedEffectors) {
			let label = key;
			let countF: number = 0;
			let countM: number = 0;
			let countN: number = 0;
			let countNone: number = 0;
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
					} else if (e.gender == undefined) {
						countNone += 1;
					}
				}
			)
			if (value.length == countNone) {
				if (value.length > 1) {
					label = eTL[type.uid]['P']['N']
				} else {
					label = eTL[type.uid]['S']['N']
				}
			} else {
				if (value.length > 1) {
					if (countF > countM) {
						label = eTL[type.uid]['P']['F']
					} else {
						label = eTL[type.uid]['P']['M']
					}
				} else {
					if (countF > countM) {
						label = eTL[type.uid]['S']['F']
					} else {
						label = eTL[type.uid]['S']['M']
					}
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

export const categorizedFullFilteredEffectorsF = (fullFilteredEffectors: Entry[]) => {
	let categorySet = new Set();
	for (let effector of fullFilteredEffectors) {
		effector.types.forEach(x => categorySet.add(x.name))
	}
	let categoryArr = Array.from(categorySet);
	categoryArr.sort();
	const effectorsObj = categoryArr.reduce((acc, current) => {
		acc[current] = [];
		return acc;
	}, {});
	for (let effector of fullFilteredEffectors) {
		effector.types.forEach(x => effectorsObj[x.name].push(effector))
	}
	const effectorsMap = new Map(Object.entries(effectorsObj).sort((a, b) => a[1].length - b[1].length));
	return effectorsMap as CategorizedEntries;
}

export const categorizedFullFilteredEffectors = asyncDerived(
	(fullFilteredEffectors),
	async ($fullFilteredEffectors) => {
		return categorizedFullFilteredEffectorsF($fullFilteredEffectors);
	}
)

export const categoryOfF = (selectCommunes: string[], fullFilteredEffectors: Entry[], selectFacility: string): Type[] => {
	if (!Array.isArray(fullFilteredEffectors)) {
		return []
	}
	if (!selectCommunes.length && selectFacility == "") {
		return uniq(
			fullFilteredEffectors.map(
				function (x) {
					return x.types
				}
			).flat()
		)
	} else {
		return uniq(
			fullFilteredEffectors.filter(
				function (x) {
					return (
						(!(selectCommunes.length) || selectCommunes.includes(x.commune.uid)) && (!selectFacility || selectFacility == x.facility.uid)
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

export const categoryOf = asyncDerived(
	([selectCommunes, fullFilteredEffectors, selectFacility]),
	async ([$selectCommunes, $fullFilteredEffectors, $selectFacility]) => {
		return categoryOfF($selectCommunes, $fullFilteredEffectors, $selectFacility)
	}
)

export const communeOfF = async (selectCategories: string[], fullFilteredEffectors: Entry[], selectFacility: string, currentOrg: CurrentOrg, limitCategories: String[]) => {
	const _communes = await communes();
	if (!selectCategories?.length && !selectFacility && currentOrg == null && !limitCategories?.length) {
		return _communes
	} else {
		const communes = fullFilteredEffectors.filter(
			x => {
				return (!selectCategories?.length || x.types.map(t => t.uid).some(
					r => selectCategories.includes(r)
				)) && (!selectFacility || x.facility.uid == selectFacility)
			}
		).map(x => x.commune);
		const mapFromCommunes = new Map(
			communes.map(c => [c.uid, c])
		);
		const uniqueCommunes = [...mapFromCommunes.values()];
		return uniqueCommunes;
	}
}

export const communeOf = asyncDerived(
	([selectCategories, fullFilteredEffectors, selectFacility, currentOrg, limitCategories]),
	async ([$selectCategories, $fullFilteredEffectors, $selectFacility, $currentOrg, $limitCategories]) => {
		return communeOfF($selectCategories, $fullFilteredEffectors, $selectFacility, $currentOrg, $limitCategories)
	}
);

export const facilityOfF = (selectCategories: String[], fullFilteredEffectors: Entry[], selectCommunes: String[], currentOrg: boolean | null, limitCategories: String[], getFacilities: Facility[]) => {
	if (!selectCategories?.length && !selectCommunes?.length && currentOrg == null && !limitCategories?.length) {
		return getFacilities.map(x => x.uid)
	} else {
		const uids = fullFilteredEffectors.filter(
			(x) => {
				return (
					(!selectCategories.length || x.types.map(t => t.uid).some(
						r => selectCategories.includes(r)
					)) && (!selectCommunes.length || selectCommunes.includes(getFacilities.find(({ uid }) => uid === x.facility.uid).commune)
					))
			}
		).map(x => x.facility.uid)
		return [...new Set(uids)];
	}
};

export const facilityOf = asyncDerived(
	([selectCategories, fullFilteredEffectors, selectCommunes, currentOrg, limitCategories, getFacilities]),
	async ([$selectCategories, $fullFilteredEffectors, $selectCommunes, $currentOrg, $limitCategories, $getFacilities]) => {
		return facilityOfF($selectCategories, $fullFilteredEffectors, $selectCommunes, $currentOrg, $limitCategories, $getFacilities)
	}
)