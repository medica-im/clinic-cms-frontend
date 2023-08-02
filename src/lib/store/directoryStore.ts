import { writable, derived, readable, get, asyncReadable, asyncDerived } from '@square/svelte-store';
import { locale } from '$i18n/i18n-svelte';
import { variables } from '$lib/utils/constants';
import { browser } from "$app/environment"
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';

export const term = writable('');
export const selectCommunes = writable([]);
export const selectCategories = writable([]);

function normalize(x: string) {
	return x.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export const effectors = asyncDerived(
	([locale]),
	async ([$locale]) => {
		var cachelife = 600;
		const cacheName = "effectors";
		let cachedData;
		let expired: boolean = true;
		let lang = $locale ?? variables.DEFAULT_LANGUAGE;
		let empty: boolean = true;
		if (browser) {
			cachedData = localStorage.getItem(`${cacheName}_${lang}`);
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
			const workforceUrl = `${variables.BASE_API_URI}/effectors`;
			const [response, err] = await handleRequestsWithPermissions(fetch, workforceUrl);
			if (response) {
				let data: any = response;
				let effectors = data.effectors;
				if (browser) {
					var json = { data: effectors, cachetime: Date.now() / 1000 }
					localStorage.setItem(`${cacheName}_${lang}`, JSON.stringify(json));
				}
				return effectors;
			} else if (err) {
				console.error(err);
			}
		}
	}
);

function uniq(a) {
	var seen = {};
	return a.filter(function (item) {
		return seen.hasOwnProperty(item.name) ? false : (seen[item.name] = true);
	});
}

export const communes = asyncDerived(
	(effectors),
	async ($effectors) => {
		let communes = (
			uniq($effectors.map(function (currentElement) {
				return currentElement.communes.flat()
			}
			).flat()).sort(function (a, b) {
				return a.name.localeCompare(b.name);
			})
		);
		return communes
	});

	export const categories = asyncDerived(
		(effectors),
		async ($effectors) => {
			let categories = (
				uniq($effectors.map(function (currentElement) {
					return currentElement.types.flat()
				}
				).flat()).sort(function (a, b) {
					return a.uid.localeCompare(b.uid);
				})
			);
			return categories
		});

export const filteredEffectors = asyncDerived(
	([term, selectCommunes, selectCategories, effectors]),
	async ([$term, $selectCommunes, $selectCategories, $effectors]) => {
		if (
			!$selectCommunes?.length
			&& !$selectCategories?.length
			&& $term == ''
		) {
			return $effectors
		} else {
			return $effectors.filter(function (x) {
				if (!$selectCommunes?.length) {
					return true
				} else {
					return x.communes.map(
						function (currentElement) {
							return currentElement.uid
						}
					).some(r => $selectCommunes.includes(r))
				}
			}).filter(function (x) {
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
				if ($term == '') {
					return true
				} else {
					return normalize(x.name_fr).includes(normalize($term))
				}
			})
		}
	}
)