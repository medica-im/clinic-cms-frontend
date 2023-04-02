<script>
	import Select from 'svelte-select';
	import { get } from '@square/svelte-store';
	import { facilityStore, selectFacilities } from '$lib/store/facilityStore';
	import LL from '$i18n/i18n-svelte';
	import { get_store_value } from 'svelte/internal';
	const label = 'label';
    const itemId = 'value';
	let value;

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

	function toArray(obj) {
    if (Array.isArray(obj)) {
      return obj.map(x => x.value)
    } else {
      return [obj.value]
    }
  }

	function handleClear(event) {
	if (event.detail) {
    const cleared= event.detail;
    const clearedF=toArray(cleared)
    const sF = get(selectFacilities);
    const arrayAfter = sF.filter(x => !clearedF.includes(x));
    selectFacilities.set(arrayAfter);
    }
	}

	function handleSelect(event) {
		if (event.detail === null) {
			selectFacilities.set([]);
			return
		} else {
			const selected = toArray(event.detail);
			selectFacilities.set(selected.map((x) => x));
		}
	}
</script>

{#await facilityStore.load()}
	<div class="spinner-border" role="status">
		<span class="visually-hidden">{$LL.LOADING()}</span>
	</div>
{:then $facilityStore}
<div class="variant-filled-primary"> 
	<Select
	    {label}
		{itemId}
		items={items($facilityStore)}
		bind:value
		multiple
		searchable={false}
		on:change={handleSelect}
		on:clear={handleClear}
		placeholder={$LL.ADDRESSBOOK.FACILITIES.PLACEHOLDER()}
	/>
</div>
{/await}