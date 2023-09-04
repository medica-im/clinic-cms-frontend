<script lang="ts">
	import Select from 'svelte-select';
	import { onMount } from 'svelte';
	import { occupations, selectOccupations, workforceOccupation } from '$lib/store/workforceStore';
	import { occupationOfFacilityStore } from '$lib/store/facilityStore';
	import LL from '$i18n/i18n-svelte';
	import { get } from '@square/svelte-store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	const label = 'label';
	const itemId = 'value';
	export let data = null;
	let value = null;
	let oOFS;


	onMount(async () => {
		oOFS = await occupationOfFacilityStore.load();
		if (data) {
		    value = getValue();
		}
	});

	function getValue() {
			let _occupations = get(occupations);
			let store = get(selectOccupations);
			let select;
			if (data) {
				select = data;
			} else if (store.length) {
                select = store[0]
			} else {
				return;
			}
			if (_occupations.length) {
				let occupation = _occupations.find((x) => x.name == select);
				let dct = { value: occupation.name, label: occupation.label };
				return dct;
			}
		}

	function toArray(obj) {
		if (Array.isArray(obj)) {
			const clearedNames = obj.map((x) => x.name);
			return clearedNames;
		} else {
			return [obj.name];
		}
	}

	function handleClear(event) {
		if (event.detail) {
			selectOccupations.set([]);
		}
		const pageStore = get(page);
		if (pageStore.params) {
			goto('/annuaire');
		}
	}

	function handleChange(event) {
		if (event.detail) {
			selectOccupations.set([event.detail.value]);
			if ($page.url.pathname != '/annuaire') {
				goto('/annuaire');
			}
		}
	}
</script>

{#await occupationOfFacilityStore.load()}
	<div class="text-surface-700 theme">
		<Select loading={true} placeholder={$LL.ADDRESSBOOK.OCCUPATIONS.PLACEHOLDER()} />
	</div>
{:then}
	<div class="text-surface-700 theme">
		<Select
			{label}
			{itemId}
			items={$occupationOfFacilityStore}
			searchable={false}
			on:change={handleChange}
			on:clear={handleClear}
			placeholder={$LL.ADDRESSBOOK.OCCUPATIONS.PLACEHOLDER()}
			bind:value
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
