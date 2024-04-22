<script lang="ts">
	import Select from 'svelte-select';
	import { onMount } from 'svelte';
	import { facilities } from '$lib/store/facilityStore';
	import {
		selectFacility,
		selectFacilityValue,
		facilityOf
	} from '$lib/store/directoryStore';
	import LL from '$i18n/i18n-svelte';
	import { get } from '@square/svelte-store';

	const label = 'label';
	const itemId = 'value';
	//let value = null;

	onMount(() => {
		selectFacilityValue.set(getValue());
	});

	function getItems(_facilitiesOf: string[]) {
		let _allFacilities = get(facilities);
		return _allFacilities
			.filter((f) => _facilitiesOf.includes(f.uid))
			.sort(function (a, b) {
				return a.name.localeCompare(b.name);
			})
			.map(function (x) {
				let dct = { value: x.uid, label: x.name };
				return dct;
			});
	}

	function getValue() {
		let sFacility = get(selectFacility);
		if (sFacility == '') {
			return null;
		} else {
			let c = get(facilities);
			if (c) {
				let val = c
					.filter((x) => sFacility == x.uid)
					.map(function (x) {
						let dct = { value: x.uid, label: x.name };
						return dct;
					})[0];
				return val;
			}
		}
	}

	function handleClear(event) {
		if (event.detail) {
			selectFacility.set('');
		}
	}

	function handleChange(event) {
		if (event.detail) {
			selectFacility.set(event.detail.value);
		}
	}
</script>

{#await facilityOf.load()}
	<div class="text-surface-700 theme">
		<Select loading={true} placeholder={$LL.ADDRESSBOOK.FACILITIES.PLACEHOLDER()} />
	</div>
{:then}
	<!--
selectFacility: {$selectFacility}<br>
facilities: {$facilities} ({$facilities.length})<br>
facilityOf: {$facilityOf} ({$facilityOf.length})
-->
	<div class="text-surface-700 theme">
		<Select
			{label}
			{itemId}
			items={getItems($facilityOf)}
			searchable={false}
			on:change={handleChange}
			on:clear={handleClear}
			placeholder={$LL.ADDRESSBOOK.FACILITIES.PLACEHOLDER()}
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
