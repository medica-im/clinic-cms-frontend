<script lang="ts">
	import { occupationsCardinal, selectOccupations, term } from '$lib/store/workforceStore';
	import { selectFacilities } from '$lib/store/selectionStore';
	import { afterUpdate, onMount, beforeUpdate } from 'svelte';

	export let oC;

	onMount(() => {
		selectOccupations.set([]);
		selectFacilities.set([]);
		term.set('');
	});
</script>

{#await occupationsCardinal.load()}
	{#each Object.keys(oC) as name, i}
		{oC[name]['count']['total']}
		{oC[name][
			'label'
		]}{#if i < Object.keys(oC).length - 1},{' '}{/if}
	{/each}
{:then}
	{#each Object.keys($occupationsCardinal) as name, i}
		{$occupationsCardinal[name]['count']['total']}
		{$occupationsCardinal[name][
			'label'
		]}{#if i < Object.keys($occupationsCardinal).length - 1},{' '}{/if}
	{/each}
{/await}
