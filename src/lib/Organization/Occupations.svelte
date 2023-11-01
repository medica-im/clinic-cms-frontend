<script lang="ts">
	import { selectOccupations, term, workforceOccupation } from '$lib/store/workforceStore';
	import { selectFacilities } from '$lib/store/selectionStore';
	import { page } from '$app/stores';
	import LL from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	export let data: any;

	onMount(() => {
	selectOccupations.set([]);
	//selectFacilities.set([]);
	term.set('');
});

</script>

<div>
<!--
{#await filteredOccupationsCardinal.load()}
		{#each Object.keys($page.data.occupationsCardinal) as name}
		<span class="badge variant-ringed-primary m-2">
				{$page.data.filteredOccupationsCardinal[name]['count']['total']}
				{$page.data.filteredOccupationsCardinal[name]['label']}
		</span>
		{/each}
{:then}-->
		{#each Object.keys(data.cO) as name}
		<a href={`/annuaire/${data["wO"][name]}`} rel="external"  class="btn variant-filled-primary btn-sm m-2"><span class="">
				{data.cO[name]['count']['total']}
				{data.cO[name]['label']}
		</span></a>
		{/each}
<!--{/await}-->
</div>