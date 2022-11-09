<script>
	import Select from 'svelte-select';
	import { onMount } from 'svelte';
	import { facilityStore, selectFacilities } from '$lib/store/facilityStore';
	import LL from '$i18n/i18n-svelte';
	let optionIdentifier = 'name';
	let labelIdentifier = 'formatted_name';

	onMount(() => {
	    selectFacilities.set([]);
	});

	function items(facilityStore) {
		return facilityStore.facility.map(function (x) {
			return {
				name: x.name,
				formatted_name: x.contact.formatted_name
			};
		});
	}

	function handleClear(event) {
		if (event.detail === null) {
			selectFacilities.set([]);
		}
	}

	function handleSelect(event) {
		if (event.detail === null) {
			selectFacilities.set([]);
			return;
		} else if (event.detail.length > 0) {
			selectFacilities.set(event.detail.map((x) => x.name));
		}
	}
</script>

{#await facilityStore.load()}
	<div class="spinner-border" role="status">
		<span class="visually-hidden">{$LL.LOADING()}</span>
	</div>
{:then $facilityStore}
	<Select
		{optionIdentifier}
		{labelIdentifier}
		items={items($facilityStore)}
		isMulti={true}
		on:select={handleSelect}
		on:clear={handleClear}
		placeholder={$LL.ADDRESSBOOK.FACILITIES.PLACEHOLDER()}
	/>
{/await}
