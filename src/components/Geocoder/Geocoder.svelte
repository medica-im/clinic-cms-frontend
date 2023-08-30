<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	//import type { Integer } from 'schema-dts';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import { normalize } from '$lib/helpers/stringHelpers';
	import { addressFeature, distanceEffectors } from '$lib/store/directoryStore';
	import { get } from '@square/svelte-store';
	import {
		faAddressCard,
	} from '@fortawesome/free-regular-svg-icons';
	import Fa from 'svelte-fa';
	import DocsIcon from '$components/Icon/Icon.svelte';
	let visible = false;


	let response;

	let normalizedInputAddress: string = '';

	//let addressOptions: AutocompleteOption[] = [];

	const options = {
		url: 'https://api-adresse.data.gouv.fr/search/?',
		minChar: 3,
		limit: 7,
		submitDelay: 300,
		includePosition: false,
		feedbackEmail: null // Set to null to remove feedback box
	};
	//let CURRENT: Integer | null = null;
	let inputAddress: string = '';
	//let CACHE = '';
	//let RESULTS: Array<Object> = [];

	$: normalizedInputAddress=normalize(inputAddress);
	$: if (inputAddress.length > options.minChar) {
		response = search();
	}
	/*$: if (inputAddress.length > options.minChar) {
		addressOptions = getAddressOptions(response);
	}*/

	function getAddressOptions(res) {
		if (!res || !res?.features?.length) {
			return [];
		}
		let _addressOptions: AutocompleteOption[] = res.features.map((e) => {
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
			q: inputAddress,
			limit: options.limit,
			lat: null,
			lon: null
		};
	}

	function search() {
		if (inputAddress === '') {
			return
		} 
		if (inputAddress.length < options.minChar) {
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
		inputAddress = event.detail.label;
		recordAddressFeature(event.detail.value);
		visible = false;
	}
	const onInput =()=>visible=true;

	function handleClear() {
		inputAddress = '';
		addressFeature.set(null);
		visible=false;
	}
</script>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim"><Fa icon={faAddressCard} /></div>
	<input
	type="search"
	name="geocoder"
	autocomplete="off"
	on:input={onInput}
	placeholder={$LL.ADDRESSBOOK.GEOCODER.PLACEHOLDER()}
	bind:value={inputAddress}
	aria-label={$LL.ADDRESSBOOK.GEOCODER.ARIA_LABEL()}
	/>
	<button
		class="variant-filled-secondary"
		on:click={handleClear}
		aria-label={$LL.ADDRESSBOOK.CLEAR()}
		disabled={!inputAddress}
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
		emptyState="{$LL.SKELETON.AUTOCOMPLETE.EMPTY_STATE()}"
	/>
</div>
{/if}