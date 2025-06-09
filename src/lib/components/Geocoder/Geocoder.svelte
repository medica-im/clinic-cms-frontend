<script lang="ts">
	import isEmpty from 'lodash.isempty';
	import * as m from '$msgs';
	import { normalize } from '$lib/helpers/stringHelpers';
	import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
	import Fa from 'svelte-fa';
	import DocsIcon from '$lib/Icon/Icon.svelte';
	import { variables } from '$lib/utils/constants';
	import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
	import { PUBLIC_DIRECTORY_TTL } from '$env/static/public';
	import Svelecte from 'svelecte';
	import SelectAddress from '$lib/Web/SelectAddress.svelte';
	import type { AddressFeature } from '$lib/store/directoryStoreInterface';


	let addressValue: string|null = $state(null);
	let visible: boolean = $state(false);
	let response: any = $state();
	const cachelife: number = parseInt(PUBLIC_DIRECTORY_TTL || '0');

	type SelectOption = {value: string, label: string};

	let addressOptions: SelectOption[] = $state([]);

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
	let inputAddress: string | undefined = $state();
	let {
		addressFeature = $bindable(),
		commune
	}: { addressFeature: AddressFeature | undefined; commune: string } = $props();

	let normalizedInputAddress = $derived(inputAddress ? normalize(inputAddress) : '');
	$effect(() => {
		if (inputAddress && inputAddress.length > options.minChar) {
			response = search();
		}
	});
	$effect(() => {
		visible = !addressFeature && !(inputAddress === undefined) && !(inputAddress==null) && inputAddress.length > options.minChar;
	});

	const getDirectory = async () => {
		let expired;
		var cacheddata: string | null = localStorage.getItem('directory');
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

	$effect(() => {
		addressOptions = getAddressOptions(response);
	});

	function getAddressOptions(res) {
		if (!res || !res?.features?.length) {
			return [];
		}
		let _addressOptions = res.features
			.filter((e: AddressFeature) => {
				return e.properties.city == commune;
			})
			.map((e) => {
				return { label: normalize(e.properties.name), value: e.properties.id };
			});
		return _addressOptions;
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
			return;
		}
		if (inputAddress && inputAddress.length < options.minChar) {
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
		addressFeature = feature;
	}

    $effect(()=>{
		if (addressValue) {
			const feature: AddressFeature = response.features.find((x) => x.properties.id == addressValue);
		    addressFeature = feature;
			inputAddress = feature.properties.name
		}
	});

	function onAddressSelection(event: any): void {
		inputAddress = event.detail.label;
		recordAddressFeature(event.detail.value);
		visible = false;
	}
	const onInput = () => (visible = true);

	function handleClear() {
		visible = false;
		inputAddress = '';
		addressFeature = undefined;
		addressValue = null;
	}
</script>

addressFeature:<br />
{JSON.stringify(addressFeature)}<br />
commune: "{commune}"<br />
addressOptions:<br />
{JSON.stringify(addressOptions)}

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim"><Fa icon={faAddressCard} /></div>
	<input
		class="input"
		type="search"
		name="geocoder"
		autocomplete="off"
		disabled={Boolean(addressFeature)}
		placeholder={m.ADDRESSBOOK_GEOCODER_PLACEHOLDER()}
		bind:value={inputAddress}
		aria-label={m.ADDRESSBOOK_GEOCODER_ARIA_LABEL()}
	/>
	<button
		class="variant-filled-secondary"
		onclick={handleClear}
		aria-label={m.ADDRESSBOOK_CLEAR()}
		disabled={!inputAddress}
	>
		<DocsIcon name="clear" width="w-5" height="h-5" />
	</button>
</div>
	<!--div class="card w-full max-w-md max-h-48 p-4 overflow-y-auto" tabindex="-1">
		{#key addressOptions}
			<Autocomplete
				bind:input={inputAddress}
				options={addressOptions}
				on:selection={onAddressSelection}
				emptyState={m.SKELETON_AUTOCOMPLETE_EMPTY_STATE()}
			/>
		{/key}
	</div-->
	<!--div class="card w-full max-w-md max-h-48 p-4 overflow-y-auto" tabindex="-1">
		{#key addressOptions}
			<Svelecte
				bind:value={addressValue}
				options={addressOptions}
			/>
		{/key}
		</div-->
		{#if visible}
		<SelectAddress {addressOptions} bind:visible={visible} bind:address={addressValue}  />
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
