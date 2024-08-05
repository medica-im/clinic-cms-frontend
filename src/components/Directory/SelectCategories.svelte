<script lang="ts">
	import Select from 'svelte-select';
	import { onMount } from 'svelte';
	import {
		categories,
		selectCategories,
		selCatVal,
		categoryOf
	} from '$lib/store/directoryStore.ts';
	import LL from '$i18n/i18n-svelte.ts';
	import { get } from '@square/svelte-store';

	const label = 'label';
	const itemId = 'value';

	onMount(() => {
		selCatVal.set(getValue());
	});

	function getItems(elements) {
		return elements.map(function (x) {
			let dct = { value: x.uid, label: x.name };
			return dct;
		});
	}

	function getValue() {
		let sElements = get(selectCategories);
		if (!sElements?.length) {
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
	}

	function handleChange(event) {
		if (event.detail) {
			selectCategories.set([event.detail.value]);
		}
	}
</script>

{#await categoryOf.load()}
	<div class="text-surface-700 theme">
		<Select loading={true} placeholder={$LL.ADDRESSBOOK.CATEGORIES.PLACEHOLDER()} />
	</div>
{:then}
	<!--
categories: {$categories} ({$categories.length})<br>
categoryOfCommune: {$categoryOfCommune} ({$categoryOfCommune.length})
$selCatVal: {$selCatVal}<br>
$selectCategories: {JSON.stringify($selectCategories)}
-->
	<div class="text-surface-700 theme">
		<Select
			{label}
			{itemId}
			items={getItems($categoryOf)}
			searchable={false}
			on:change={handleChange}
			on:clear={handleClear}
			placeholder={$LL.ADDRESSBOOK.CATEGORIES.PLACEHOLDER()}
			bind:value={$selCatVal}
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
		--list-z-index: 1000;
	}
</style>
