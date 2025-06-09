import type { Facility } from '$lib/interfaces/facility.interface.ts';
import { variables } from '$lib/utils/constants';
import { writable, derived, readable, get, asyncReadable, asyncDerived } from '@square/svelte-store';
import { browser } from "$app/environment";
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
import { occupations, workforceDataCached, selectOccupations, workforceDict } from '$lib/store/workforceStore';
import { selectFacilities } from '$lib/store/selectionStore';
import { PUBLIC_FACILITIES_TTL } from '$env/static/public';
import { shuffle } from '$lib/helpers/random';
import type { Writable, AsyncWritable, Loadable } from '@square/svelte-store';
import type { Organization } from '$lib/interfaces/organization.ts';

export const getFacilities = asyncReadable(
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
			let elapsed = Date.now() - cachedData.cachetime;
			expired = elapsed > cachelife;
			if ('data' in cachedData) {
				if (cachedData.data?.length) {
					empty = false;
				}
			}
		}
		if (cachedData && !expired && !empty) {
			const facilities = cachedData.data;
			return facilities;
		} else {
			const url = `${variables.BASE_API_URI}/facilities`;
			const [response, err] = await handleRequestsWithPermissions(fetch, url);
			if (response) {
				let data = response?.facilities;
				data = data.sort(function (a, b) {
					return a.name.localeCompare(b.name);
				})
				if (browser) {
					var json = { data: data, cachetime: Date.now() }
					localStorage.setItem(`${cacheName}`, JSON.stringify(json));
				}
				return data;
			} else if (err) {
				console.error(err);
				throw (err)
			}
		}
	});

export const facilitiesWithAvatar = asyncDerived(
	(getFacilities),
	($getFacilities) => {
		let carousel = $getFacilities.filter(function (item: any) {
			return item?.avatar?.raw
		});
		shuffle(carousel);
		return carousel
	});

export const organizationStore = asyncReadable(
	{},
	async () => {
		var cachelife = 600;
		const cacheName = "organization";
		let cachedData;
		let expired = true;
		let empty: boolean = true;
		let lang = variables.DEFAULT_LANGUAGE;
		if (browser) {
			cachedData = localStorage.getItem(`${cacheName}_${lang}`);
		}
		if (cachedData) {
			cachedData = JSON.parse(cachedData);
			expired = Date.now() - cachedData.cachetime > cachelife;
			if ('data' in cachedData) {
				if (cachedData.data) {
					empty = false;
				}
			}
		}
		if (cachedData && !expired && cachedData.data) {
			return cachedData.data;
		} else {
			const apiUrl = `${variables.BASE_API_URI}/organization/${lang}/`;
			console.log(apiUrl);
			const [response, err] = await handleRequestsWithPermissions(fetch, apiUrl);
			console.log([response,err]);
			if (response) {
				let data = response;
				data?.facility.sort(function (a, b) {
					return a.contact.formatted_name.localeCompare(b.contact.formatted_name);
				})
				if (browser) {
					var json = { data: data, cachetime: Date.now() }
					localStorage.setItem(`${cacheName}_${lang}`, JSON.stringify(json));
				}
				return data as Organization;
			}
		}
	}
);

export const facilityWithOccupationStore = asyncDerived(
	([organizationStore, workforceDataCached, selectOccupations]),
	async ([$organizationStore, $workforceDataCached, $selectOccupations]) => {
		const okFacilities = new Set();
		$workforceDataCached.forEach(
			function (item) {
				let occupations = item.occupations ?? [];
				occupations.forEach(
					function (occupation) {
						if (!$selectOccupations.length || $selectOccupations.includes(occupation.name)) {
							let facilities = occupation.facilities ?? occupation.specialty.facilities ?? [];
							facilities.forEach(
								function (facility) {
									okFacilities.add(facility.facility__name);
								}
							);
						}
					}
				)
			}
		);
		let facilities = $organizationStore.facility.filter(
			(x) => okFacilities.has(x.name)
		).map(function (x) { return { 'value': x.name, 'label': x.contact.formatted_name } }).sort(function (a, b) {
			return a.label.localeCompare(b.label);
		});
		return facilities;
	}
);

function workerCount(obj) {
	let total = 0;
	for (const gender of ['M', 'F', 'N']) {
		let count = 0;
		if (obj.hasOwnProperty(gender)) {
			count = obj[gender];
		} else {
			count = 0;
		}
		total = total + count;
	}
	return total
}

export const occupationOfOrganizationStore = asyncDerived(
	([occupations, workforceDataCached, selectFacilities, workforceDict]),
	async ([$occupations, $workforceDataCached, $selectFacilities, $workforceDict]) => {
		if (get(selectFacilities).length == 0) {
			return get(occupations).map(
				function (x) {
					let dct = { value: x.name, label: x.label };
					return dct
				}
			)
		}
		const dct: Object = {};
		$workforceDataCached.forEach(
			function (worker) {
				let gender = worker.grammatical_gender.code || 'N';
				let occupations = worker.occupations ?? [];
				occupations.forEach(
					function (occupation) {
						let oName = occupation.name;
						let facilities = occupation.facilities ?? occupation.specialty.facilities ?? [];
						facilities.forEach(
							function (facility) {
								let fName = facility.facility__name;
								if (!dct.hasOwnProperty(fName)) {
									dct[fName] = {};
								}
								if (!dct[fName].hasOwnProperty(oName)) {
									dct[fName][oName] = {};
								}
								if (!dct[fName][oName].hasOwnProperty(gender)) {
									dct[fName][oName][gender] = 1;
								} else {
									dct[fName][oName][gender] = (dct[fName][oName][gender] ?? 0) + 1;
								}
							}
						);
					}
				)
			}
		);
		let res = {};
		let fNames = Object.keys(dct);
		for (const fName of fNames) {
			let oNames = Object.keys(dct[fName]);
			res[fName] = [];
			for (const oName of oNames) {
				let count = workerCount(dct[fName][oName]);
				let label;
				let fCount = dct[fName][oName]['F'] || 0;
				let mCount = dct[fName][oName]['M'] || 0;
				if (count > 1) {
					if (fCount >= mCount) {
						label = $workforceDict[oName]['P']['F'];
					} else {
						label = $workforceDict[oName]['P']['M'];
					}
				} else {
					if (fCount) {
						label = $workforceDict[oName]['S']['F'];
					} else {
						label = $workforceDict[oName]['S']['M'];
					}
				}
				let _dct = { value: oName, label: label };
				res[fName].push(_dct);
			}
		}
		return res[get(selectFacilities)].sort(function (a, b) {
			return a.label.localeCompare(b.label);
		});
	}
);

export const siteCount = asyncDerived(
	([organizationStore, getFacilities]),
	async ([$organizationStore, $getFacilities]) => {
		const facilities: Facility[] = $getFacilities;
		return facilities.filter((facility) =>
			facility.organizations.includes($organizationStore.uid)
		).length;
	}
);

export const websiteSchema = asyncDerived(
	(organizationStore),
	async ($organizationStore) => {
		const someds = [];
		for (let somed of $organizationStore.contact.socialnetworks) {
			someds.push(somed.url)
		}
		return {
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: $organizationStore.website_title,
			url: variables.BASE_URI,
			description: $organizationStore.website_description,
			sameAs: someds,
		}
	}
);