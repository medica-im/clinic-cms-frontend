<script lang="ts">
	import type { Facility } from '$lib/interfaces/facility.interface.ts';
	import Select from 'svelte-select';
	import { onMount } from 'svelte';
	import { getFacilities } from '$lib/store/facilityStore';
	import {
		selectFacility,
		selectFacilityValue,
		facilityOf,
	} from '$lib/store/directoryStore.ts';
	import * as m from "$msgs";	import { get } from '@square/svelte-store';

	const label = 'label';
	const itemId = 'value';

	onMount(() => {
		const facility = get(selectFacility);
		selectFacilityValue.set(facility);
	});

	function getItems(_facilitiesOf: string[], facilities: Facility[]) {
		return facilities
			.filter((f) => _facilitiesOf.includes(f.uid))
			.sort(function (a, b) {
				return a.name.localeCompare(b.name);
			})
			.map(function (x) {
				let dct = { value: x.uid, label: x.name };
				return dct;
			});
	}

	function handleClear(event: CustomEvent) {
		if (event.detail) {
			selectFacility.set('');
		}
	}

	function handleChange(event: CustomEvent) {
		if (event.detail) {
			selectFacility.set(event.detail.value);
		}
	}
</script>

{#await facilityOf.load()}
	<div class="text-surface-700 theme">
		<Select loading={true} placeholder={m.ADDRESSBOOK_FACILITIES_PLACEHOLDER()} />
	</div>
{:then}
<!--
selectFacility: {$selectFacility}<br>
selectFacilityValue: {JSON.stringify($selectFacilityValue)}<br>
facilities: {$getFacilities} ({$getFacilities.length})<br>
facilityOf: {$facilityOf} ({$facilityOf.length})
-->
	<div class="text-surface-700 theme">
		<Select
			{label}
			{itemId}
			items={getItems($facilityOf, $getFacilities)}
			searchable={false}
			on:change={handleChange}
			on:clear={handleClear}
			placeholder={m.ADDRESSBOOK_FACILITIES_PLACEHOLDER()}
			bind:value={$selectFacilityValue}
		/>
	</div>
{/await}

<style>
	/*
			CSS variables can be used to control theming.
			https://github.com/rob-balfre/svelte-select/blob/master/docs/theming_variables.md
	*/
	.theme {
		--border-radius: var(--theme-rounded-container);
		--border-color: rgb(var(--color-secondary-500));
		--border-focused: 1px solid rgb(var(--color-secondary-500));
		--border-hover: 1px solid rgb(var(--color-secondary-500));
		--item-active-outline: 1px solid rgb(var(--color-secondary-500));
		--item-outline: 1px solid rgb(var(--color-secondary-500));
		--clear-select-focus-outline: 1px solid rgb(var(--color-secondary-500));
		--height: 3rem;
	}
</style>
