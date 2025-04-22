<script lang="ts">
	import isEmpty from 'lodash.isempty';
	import { onMount } from 'svelte';
	import * as m from "$msgs";	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import { normalize } from '$lib/helpers/stringHelpers';
	import { addressFeature, inputAddress } from '$lib/store/directoryStore';
	import { get } from '@square/svelte-store';
	import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
	import Fa from 'svelte-fa';
	import DocsIcon from '$lib/Icon/Icon.svelte';
	import { variables } from '$lib/utils/constants';
	import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
	import { PUBLIC_DIRECTORY_TTL } from '$env/static/public';

	let visible = false;
	let response;
	let normalizedInputAddress: string = '';
	let cityCodes: string[] = [];
	const cachelife: number = parseInt(PUBLIC_DIRECTORY_TTL || '0');

	//let addressOptions: AutocompleteOption[] = [];

	const options = {
		url: 'https://api-adresse.data.gouv.fr/search/?',
		minChar: 3,
		limit: 20,
		submitDelay: 300,
		includePosition: false,
		feedbackEmail: null // Set to null to remove feedback box
	};
	//let CURRENT: Integer | null = null;
	//let inputAddress: string = '';
	//let CACHE = '';
	//let RESULTS: Array<Object> = [];

	onMount(async () => {
		const _addressFeature = get(addressFeature);
		if (!isEmpty(_addressFeature)) {
			inputAddress.set(normalize(_addressFeature?.properties?.label));
		}
		const directoryJsn = await getDirectory();
		cityCodes = directoryJsn.postal_codes;
	});

	$: normalizedInputAddress = normalize($inputAddress);
	$: if ($inputAddress.length > options.minChar) {
		response = search();
	}
	$: visible = Boolean($inputAddress) && Object.keys($addressFeature).length === 0 && $addressFeature.constructor === Object;

	const getDirectory = async () => {
		let expired;
		var cacheddata: string|null = localStorage.getItem('directory');
		if (cacheddata) {
			const cachedDataObj = JSON.parse(cacheddata);
			expired = Math.trunc(Date.now() / 1000) - cachedDataObj.cachetime > cachelife;
		    if (!expired) {
			return cachedDataObj.data;
			}
		} else {
			const url = `${variables.BASE_API_URI}/directory/`;
			const [directory, err] = await handleRequestsWithPermissions(fetch, url);
			let json = { data: directory, cachetime: Math.trunc(Date.now() / 1000) };
			localStorage.setItem('directory', JSON.stringify(json));
			return directory;
		}
	};

	function getAddressOptions(res) {
		if (!res || !res?.features?.length) {
			return [];
		}
		let _addressOptions: AutocompleteOption[] = res.features
			.filter((e) =>
				cityCodes.some((cityCode) => {
					let apiCityCode = e.properties.citycode;
					return apiCityCode.startsWith(cityCode);
				})
			)
			.map((e) => {
				return { label: normalize(e.properties.label), value: e.properties.id };
			});
		return _addressOptions as AutocompleteOption[];
	}

	function buildQueryString() {
		let params: object = getParams();
		let query_string = [];
		for (let key in params) {
			if (params[key as keyof object]) {
				query_string.push(
					encodeURIComponent(key) + '=' + encodeURIComponent(params[key as keyof object])
				);
			}
		}
		return query_string.join('&');
	}

	function getParams() {
		//var x;
		//var y;
		//if (this.options.includePosition) {
		//  [x, y] = this.options.includePosition();
		//} else {
		//  x = y = null;
		//}
		return {
			q: get(inputAddress),
			limit: options.limit,
			lat: null,
			lon: null
		};
	}

	function search() {
		const _inputAddress = get(inputAddress);
		if ( _inputAddress === '' ) {
			return;
		}
		if ( _inputAddress.length < options.minChar ) {
			return;
		}
		//if (value + '' === CACHE + '') {
		//	return;
		//} else {
		//	CACHE = value;
		//}
		fetchGeojson();
	}

	async function fetchGeojson() {
		let url = options.url + buildQueryString();
		const res = await fetch(url, {
			method: 'GET',
			mode: 'cors'
		});
		if (!res.ok) {
			const message = `An error has occured: ${res.status}`;
			throw new Error(message);
		}
		const geojson = await res.json();
		response = geojson;
	}

	function recordAddressFeature(featureId: string) {
		const feature = response.features.find((x) => x.properties.id == featureId);
		addressFeature.set(feature);
	}

	function onAddressSelection(event: any): void {
		inputAddress.set(event.detail.label);
		recordAddressFeature(event.detail.value);
		visible = false;
	}
	const onInput = () => (visible = true);

	function handleClear() {
		visible = false;
		inputAddress.set("");
		addressFeature.set({});
	}
</script>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim"><Fa icon={faAddressCard} /></div>
	<input
		type="search"
		name="geocoder"
		autocomplete="off"
		on:input={onInput}
		placeholder={m.ADDRESSBOOK_GEOCODER_PLACEHOLDER()}
		bind:value={$inputAddress}
		aria-label={m.ADDRESSBOOK_GEOCODER_ARIA_LABEL()}
	/>
	<button
		class="variant-filled-secondary"
		on:click={handleClear}
		aria-label={m.ADDRESSBOOK_CLEAR()}
		disabled={!$inputAddress}
	>
		<DocsIcon name="clear" width="w-5" height="h-5" />
	</button>
</div>
{#if visible}
	<div class="card w-full max-w-md max-h-48 p-4 overflow-y-auto" tabindex="-1">
		<Autocomplete
			bind:input={normalizedInputAddress}
			options={getAddressOptions(response)}
			on:selection={onAddressSelection}
			emptyState={m.SKELETON_AUTOCOMPLETE_EMPTY_STATE()}
		/>
	</div>
{/if}

<style>
	/* clears the ‘X’ from Internet Explorer */
	input[type='search']::-ms-clear {
		display: none;
		width: 0;
		height: 0;
	}
	input[type='search']::-ms-reveal {
		display: none;
		width: 0;
		height: 0;
	}
	/* clears the ‘X’ from Chrome */
	input[type='search']::-webkit-search-decoration,
	input[type='search']::-webkit-search-cancel-button,
	input[type='search']::-webkit-search-results-button,
	input[type='search']::-webkit-search-results-decoration {
		display: none;
	}
</style>
