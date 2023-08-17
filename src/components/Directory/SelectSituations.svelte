<script lang="ts">
	import Select from 'svelte-select';
	import { onMount } from 'svelte';
	import { getSituations, situations, selectSituation } from '$lib/store/directoryStore';
	import LL from '$i18n/i18n-svelte';
	import { get } from '@square/svelte-store';
	const label = 'label';
	const itemId = 'value';
	let value: string = "";

	onMount(() => {
		value = getValue();
		console.log(value);
	});

    /*function getItems(communes) {
        return communes.map(function (x) {
			let dct = { value: x.uid, label: x.name };
			return dct;
		})
	}*/

	function getValue() {
		let sSituation = get(selectSituation);
		if (sSituation == '') {
			return '';
		} else {
			let s = get(situations);
			console.log(`s: ${s}`);
			if (s) {
				let val = s.filter((x) => {sSituation == x.value})[0];
				return val;
			}
		}
	}

	function handleClear(event) {
		if (event.detail) {
			selectSituation.set("");
		}
	}

	function handleChange(event) {
		console.log(event);
		if (event.detail) {
			console.log(event.detail);
			console.log(event.detail.value);
			selectSituation.set(event.detail.value);
		}
	}
</script>

{#await situations.load()}
	<div class="text-surface-700 theme">
		<Select loading={true} placeholder={$LL.ADDRESSBOOK.SITUATIONS.PLACEHOLDER()} />
	</div>
{:then}
	<div class="text-surface-700 theme">
		<Select
			{label}
			{itemId}
			items={$situations}
			searchable={false}
			on:change={handleChange}
			on:clear={handleClear}
			placeholder={$LL.ADDRESSBOOK.SITUATIONS.PLACEHOLDER()}
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
