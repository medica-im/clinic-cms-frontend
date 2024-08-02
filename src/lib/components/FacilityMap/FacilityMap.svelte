<script lang="ts">
	import { addressFeature } from '$lib/store/directoryStore.ts';
	import LL from '$i18n/i18n-svelte.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { language } from '$lib/store/languageStore.ts';
	import Fa from 'svelte-fa';
	import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
	import Map from '$lib/components/Map/Map.svelte';
	import { createEntriesMapData } from '$lib/components/Map/mapData.ts';
	import { fade, scale } from 'svelte/transition';
	import type { Entry } from '$lib/store/directoryStoreInterface.ts';

	export let data: Entry[];

	function filterFacilities(facilities) {
		const f = facilities.filter((facility) =>
			facility.organizations.includes(data.organization.uid)
		);
		return f;
	}

	function title() {
		const title = data?.facilities?.length > 1 ? $LL.SITES.PLURAL() : $LL.SITES.SINGULAR();
		return title;
	}
	function compareFn(a, b) {
		return b.effectors.length - a.effectors.length;
	}
</script>

	{#key data}
	<Map data={createEntriesMapData(data, false, $addressFeature)} />
	{/key}
