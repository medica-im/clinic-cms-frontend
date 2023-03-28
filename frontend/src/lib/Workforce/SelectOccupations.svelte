<script>
	import 'svelte-select/tailwind.css';
	import Select from 'svelte-select';
	import { occupations, selectOccupations } from '$lib/store/workforceStore';
	import LL from '$i18n/i18n-svelte';
	import { get } from '@square/svelte-store';
	const label = 'label';
	const itemId = 'name';
	const items = get(occupations);
	let value;
	let searchable = true;

	//$value: if (value && value.length) {selectOccupations.set(value.map(x => x.name))} else { selectOccupations.set([])};

	function getValue() {
		let sOccupations = get(selectOccupations);
		if (!sOccupations.length) {
			return null;
		} else {
			return get(occupations).filter((x) => sOccupations.includes(x.name));
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
			const cleared = event.detail;
			const clearedNames = toArray(cleared);
			let sOccupations = get(selectOccupations);
			const arrayAfter = sOccupations.filter((x) => !clearedNames.includes(x));
			selectOccupations.set(arrayAfter);
		}
	}

	function handleChange(event) {
		if (event.detail.length === 0) {
			selectOccupations.set([]);
			return;
		} else if (event.detail.length > 0) {
			selectOccupations.set(event.detail.map((x) => x.name));
		}
	}
</script>

{#await occupations.load()}
	<div class="spinner-border" role="status">
		<span class="visually-hidden">{$LL.LOADING()}</span>
	</div>
{:then}
	<div class="variant-filled-primary">
		<Select
			{label}
			{itemId}
			items={$occupations}
			multiple
			on:change={handleChange}
			on:clear={handleClear}
			placeholder={$LL.ADDRESSBOOK.OCCUPATIONS.PLACEHOLDER()}
			bind:value
		/>
	</div>
{/await}
