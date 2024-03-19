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
{#each [...data] as [key, value]}
		<a href={`/annuaire/${value.slug}`} rel="external"  class="btn variant-filled-primary btn-sm m-2"><span class="">
				{value.count}
				{key}
		</span></a>
		{/each}
</div>