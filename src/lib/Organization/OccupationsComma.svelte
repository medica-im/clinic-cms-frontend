<script lang="ts">
	import { cardinalTypes } from '$lib/store/directoryStore';

	export let data;
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
