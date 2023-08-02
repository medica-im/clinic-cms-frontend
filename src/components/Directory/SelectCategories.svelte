<script lang="ts">
	import Select from 'svelte-select';
	import { onMount } from 'svelte';
	import { categories, selectCategories } from '$lib/store/directoryStore';
	import LL from '$i18n/i18n-svelte';
	import { get } from '@square/svelte-store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	const label = 'label';
	const itemId = 'value';
	let value = null;

	onMount(() => {
		value = getValue();
	});

    function getItems(elements) {
        return elements.map(function (x) {
			let dct = { value: x.uid, label: x.name };
			return dct;
		})
	}

	function getValue() {
		let sElements = get(selectCategories);
		if (!sElements.length) {
			return null;
		} else {
			let c = get(categories);
			if (c) {
				let val = c
					.filter((x) => sElements.includes(x.uid))
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
			selectCategories.set([]);
		}
		const pageStore = get(page);
		if (pageStore.params) {
			goto('/annuaire');
		}
	}

	function handleChange(event) {
		if (event.detail) {
			selectCategories.set([event.detail.value]);
			if ($page.url.pathname != '/annuaire') {
				goto('/annuaire');
			}
		}
	}
</script>

{#await categories.load()}
	<div class="text-surface-700 theme">
		<Select loading={true} placeholder={$LL.ADDRESSBOOK.CATEGORIES.PLACEHOLDER()} />
	</div>
{:then}
	<div class="text-surface-700 theme">
		<Select
			{label}
			{itemId}
			items={getItems($categories)}
			searchable={false}
			on:change={handleChange}
			on:clear={handleClear}
			placeholder={$LL.ADDRESSBOOK.CATEGORIES.PLACEHOLDER()}
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
