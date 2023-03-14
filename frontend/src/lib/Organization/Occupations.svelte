<script lang="ts">
	import { occupationsCardinal, selectOccupations, term } from '$lib/store/workforceStore';
	import { selectFacilities } from '$lib/store/facilityStore';
	import { page } from '$app/stores';
	import LL from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';

	onMount(() => {
	selectOccupations.set([]);
	selectFacilities.set([]);
	term.set('');
});

</script>

<div>
{#await occupationsCardinal.load()}
		{#each Object.keys($page.data.occupationsCardinal) as name}
		<span class="badge variant-ringed-primary m-2">
				{$page.data.occupationsCardinal[name]['count']['total']}
				{$page.data.occupationsCardinal[name]['label']}
		</span>
		{/each}
{:then}
		{#each Object.keys($occupationsCardinal) as name}
		<span class="badge variant-ringed-primary m-2">
				{$occupationsCardinal[name]['count']['total']}
				{$occupationsCardinal[name]['label']}
		</span>
		{/each}
{/await}
</div>