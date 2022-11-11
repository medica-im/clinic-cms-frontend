<script>
	import Select from 'svelte-select';
	import { get } from '@square/svelte-store';
	import { facilityStore, selectFacilities } from '$lib/store/facilityStore';
	import LL from '$i18n/i18n-svelte';
	import { get_store_value } from 'svelte/internal';

	let value=null;

	function getValue() {
		let facilities = get(selectFacilities);
		if (!facilities.length) {
			return null
		} else {
		    return items(get(facilityStore)).filter(x => get(selectFacilities).includes(x.value))
		}
	}

	function items(facilityStore) {
		return facilityStore.facility.map(function (x) {
			return {
				value: x.name,
				label: x.contact.formatted_name
			};
		});
	}

	function handleClear(event) {
		if (event.detail === null) {
			selectFacilities.set([]);
		} else if (event.detail.length > 0) {
			selectFacilities.set(event.detail.map((x) => x.value));
		}
	}

	function handleSelect(event) {
		if (event.detail === null) {
			selectFacilities.set([]);
			return
		} else if (event.detail.length > 0) {
			selectFacilities.set(event.detail.map((x) => x.value));
		}
	}
</script>

{#await facilityStore.load()}
	<div class="spinner-border" role="status">
		<span class="visually-hidden">{$LL.LOADING()}</span>
	</div>
{:then $facilityStore}
	<Select
		items={items($facilityStore)}
		value={getValue()}
		isMulti=true
		isCreatable=true
		on:select={handleSelect}
		on:clear={handleClear}
		placeholder={$LL.ADDRESSBOOK.FACILITIES.PLACEHOLDER()}
	/>
{/await}