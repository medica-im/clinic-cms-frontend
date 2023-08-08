import { writable, derived, readable, get, asyncReadable, asyncDerived } from '@square/svelte-store';
import { locale } from '$i18n/i18n-svelte';
import { variables } from '$lib/utils/constants';
import { browser } from "$app/environment"
import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';

export const term = writable('');
export const selectCommunes = writable([]);
export const selectCategories = writable([]);
export const effectors = writable([]);

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
		var cachelife = 600;
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

function uniq(a) {
	var seen = {};
	return a.filter(function (item) {
		return seen.hasOwnProperty(item.name) ? false : (seen[item.name] = true);
	});
}

export const communes = asyncDerived(
	(getEffectors),
	async ($getEffectors) => {
		let communes = (
			uniq($getEffectors.map(function (currentElement) {
				return currentElement.communes.flat()
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

export const filteredEffectors = asyncDerived(
	([getEffectors, term, selectCommunes, selectCategories, effectors]),
	async ([$getEffectors, $term, $selectCommunes, $selectCategories, $effectors]) => {
		if (
			!$selectCommunes?.length
			&& !$selectCategories?.length
			&& $term == ''
		) {
			return $getEffectors
		} else {
			return $getEffectors.filter(function (x) {
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