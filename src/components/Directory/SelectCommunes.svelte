<script lang="ts">
	import Select from 'svelte-select';
	import { onMount } from 'svelte';
	import { communes, selectCommunes } from '$lib/store/directoryStore';
	import LL from '$i18n/i18n-svelte';
	import { get } from '@square/svelte-store';
	const label = 'label';
	const itemId = 'value';
	let value = null;

	onMount(() => {
		value = getValue();
	});

    function getItems(communes) {
        return communes.map(function (x) {
			let dct = { value: x.uid, label: x.name };
			return dct;
		})
	}

	function getValue() {
		let sCommunes = get(selectCommunes);
		if (!sCommunes?.length) {
			return null;
		} else {
			let c = get(communes);
			if (c) {
				let val = c
					.filter((x) => sCommunes.includes(x.uid))
					.map(function (x) {
						let dct = { value: x.uid, label: x.name };
						return dct;
					})[0];
				return val;
			}
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
			selectCommunes.set([]);
		}
	}

	function handleChange(event) {
		if (event.detail) {
			selectCommunes.set([event.detail.value]);
		}
	}
</script>

{#await communes.load()}
	<div class="text-surface-700 theme">
		<Select loading={true} placeholder={$LL.ADDRESSBOOK.COMMUNES.PLACEHOLDER()} />
	</div>
{:then}
	<div class="text-surface-700 theme">
		<Select
			{label}
			{itemId}
			items={getItems($communes)}
			searchable={false}
			on:change={handleChange}
			on:clear={handleClear}
			placeholder={$LL.ADDRESSBOOK.COMMUNES.PLACEHOLDER()}
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
