<script>
	import { onMount } from 'svelte';
	import Select from 'svelte-select';
	import { get } from '@square/svelte-store';
	import { organizationStore, facilityWithOccupationStore } from '$lib/store/facilityStore';
	import { selectFacilities } from '$lib/store/selectionStore';
	import { selectOccupations, workforceDataCached } from '$lib/store/workforceStore';
	import * as m from "$msgs";
	const label = 'label';
	const itemId = 'value';
	let value;

	onMount(() => {
		value = getValue();
	});

	function getValue() {
		let facilities = get(selectFacilities);
		if (!facilities?.length) {
			return;
		} else {
			try {
			let val = get(organizationStore).facility.filter((x) => get(selectFacilities).includes(x.name))[0];
			return {value: val.name, label: val.contact.formatted_name}
			} catch(err) {
				console.error(err);
				return;
			}
		}
	}

	function toArray(obj) {
		if (Array.isArray(obj)) {
			return obj.map((x) => x.value);
		} else {
			return [obj.value];
		}
	}

	function handleClear(event) {
		if (event.detail) {
			selectFacilities.set([]);
		}
	}

	function handleChange(event) {
		if (event.detail) {
			selectFacilities.set([event.detail.value]);
		}
	}
</script>
{#await facilityWithOccupationStore.load()}
	<div class="text-surface-700 theme">
		<Select loading={true} placeholder={m.ADDRESSBOOK_FACILITIES_PLACEHOLDER()} />
	</div>
{:then}
	<div class="text-surface-700 theme">
		<Select
			{label}
			{itemId}
			items={$facilityWithOccupationStore}
			bind:value
			searchable={false}
			hideEmptyState={true}
			on:change={handleChange}
			on:clear={handleClear}
			placeholder={m.ADDRESSBOOK_FACILITIES_PLACEHOLDER()}
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
		--multi-item-active-outline: 1px solid rgb(var(--color-secondary-500));
		--multi-item-outline: 1px solid rgb(var(--color-secondary-500));
		--clear-select-focus-outline: 1px solid rgb(var(--color-secondary-500));
		--height: 3rem;
		--multi-select-input-margin: 0px;
	}
</style>