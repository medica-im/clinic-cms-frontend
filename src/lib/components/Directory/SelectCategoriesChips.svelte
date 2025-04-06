<script lang="ts">
	import { onMount } from 'svelte';
	import {
		categories,
		selectCategories,
		categorizedFullFilteredEffectors
	} from '$lib/store/directoryStore';
	import * as m from "$msgs";	import { get } from '@square/svelte-store';
	import Fa from 'svelte-fa';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import { createQuery } from '@tanstack/svelte-query';
	import { variables } from '$lib/utils/constants';

	const label = 'label';
	const itemId = 'value';
	let value = null;

	let category = '';

	const baseUrl = `${variables.BASE_API_URI}/effector_types/`;

	async function downloadRecords() {
		let records = [];

		//const res = await fetch(url);
		//const data = await res.json();
		//console.log(`first ${data}`)
		//records.push(...data.effector_types);
		let next = '';
		do {
			const url = `${baseUrl}${next}`;
			//console.log(url);
			const res = await fetch(url);
			const data = await res.json();
			records.push(...data.effector_types);
			next = data.meta.next;
			//console.log(next);
		} while (next);
		//console.log(`effector_types: ${JSON.stringify(records)}`);
		return records;
	}

	const query = createQuery({
		queryKey: ['types'],
		queryFn: () => downloadRecords()
	});

	function select(c: string, effectorTypes): void {
		if (category == c || c == '') {
			selectCategories.set([]);
			category = '';
		} else {
		category = c;
		let effectorType = effectorTypes.find((x) => x.name == c);
		console.debug(`effectorType: ${JSON.stringify(effectorType)}`);
		selectCategories.set([effectorType.uid]);
		}
	}

	onMount(() => {
		value = getValue();
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

<div class="text-surface-700 theme space-x-2 space-y-2">
	{#await categorizedFullFilteredEffectors.load()}
		<div class="placeholder"></div>
	{:then}
		{#if $query.status === 'pending'}
			<div class="placeholder"></div>
		{:else if $query.error}
			<p>Error: {$query.error.message}</p>
		{:else}
			{#key category}
				{#each [...$categorizedFullFilteredEffectors] as [c, value]}
					<!-- prettier-ignore -->
					<span
					class="chip {category === c ? 'variant-filled' : 'variant-soft'}"
					on:click={() => {
						select(c, $query.data);
					}}
					on:keypress
				>
					{#if category === c}<span><Fa icon={faCheck} /></span>{/if}
					<span>{$query.data.find(x=>x.name==c).label}</span>
				</span>
				{/each}
				{#if $categorizedFullFilteredEffectors.size>1}
				<span
					class="chip {category === '' ? 'variant-filled' : 'variant-soft'}"
					on:click={() => {
						select('', $query.data);
					}}
					on:keypress
				>
					{#if category === ''}<span><Fa icon={faCheck} /></span>{/if}
					<span>{m.ADDRESSBOOK_CATEGORIES.ALL()}</span>
				</span>
				{/if}
			{/key}
		{/if}
	{/await}
</div>