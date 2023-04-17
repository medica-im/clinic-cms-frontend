<script lang="ts">
	import Select from 'svelte-select';
	import { onMount } from 'svelte';
	import { occupations, selectOccupations } from '$lib/store/workforceStore';
	import LL from '$i18n/i18n-svelte';
	import { get } from '@square/svelte-store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	const label = 'label';
	const itemId = 'name';
	let value: [];
	let searchable = true;

	//$value: if (value && value.length) {selectOccupations.set(value.map(x => x.name))} else { selectOccupations.set([])};

	onMount( () => {
		value = getValue();
	});

	function getValue() {
		let sOccupations = get(selectOccupations);
		if (!sOccupations.length) {
			return null;
		} else {
			return get(occupations).filter((x) => sOccupations.includes(x.name))[0];
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
		console.log(event.detail);
		if (event.detail) {
			const cleared = event.detail;
			const clearedNames = toArray(cleared);
			let sOccupations = get(selectOccupations);
			const arrayAfter = sOccupations.filter((x) => !clearedNames.includes(x));
			selectOccupations.set(arrayAfter);
		}
		const pageStore = get(page);
		console.log(pageStore);
		if (pageStore.params) {
			goto('/annuaire');
		}
	}

	function handleChange(event) {
		if (event.detail) {
			selectOccupations.set([event.detail.name]);
		}
		const pageStore = get(page);
		if (pageStore.params) {
			goto('/annuaire');
		}
	}
</script>
{#await occupations.load()}
<div class="text-surface-700 theme">
	<Select
	    loading={true}
		placeholder={$LL.ADDRESSBOOK.OCCUPATIONS.PLACEHOLDER()}
	/>
</div>
{:then}
	<div class="text-surface-700 theme">
		<Select
			{label}
			{itemId}
			items={$occupations}
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