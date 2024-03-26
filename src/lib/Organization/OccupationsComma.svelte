<script lang="ts">
	import { occupationsCardinal, selectOccupations, term } from '$lib/store/workforceStore';
	import { cardinalTypes } from '$lib/store/directoryStore';
	import { selectFacilities } from '$lib/store/selectionStore';
	import { afterUpdate, onMount, beforeUpdate } from 'svelte';

	export let data;

	onMount(() => {
		selectOccupations.set([]);
		selectFacilities.set([]);
		term.set('');
	});
</script>

{#await cardinalTypes.load()}
	{#each [...data] as [key, value], i}
		{value.count}
		{key}{#if i == data.size - 2}{' '}et{' '}{:else if i < data.size - 1},{' '}{/if}
	{/each}
{:then}
	{#each [...$cardinalTypes] as [key, value], i}
		{value.count}
		{key}{#if i == $cardinalTypes.size - 2}{' '}et{' '}{:else if i < $cardinalTypes.size - 1},{' '}{/if}
	{/each}
{/await}
