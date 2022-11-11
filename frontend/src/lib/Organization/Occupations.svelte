<script lang="ts">
	import { occupationsCardinal, selectOccupations, term } from '$lib/store/workforceStore';
	import { selectFacilities } from '$lib/store/facilityStore';
	import { page } from '$app/stores';
	import LL from '$i18n/i18n-svelte';
	import { afterUpdate, onMount, beforeUpdate } from 'svelte';

	onMount(() => {
	selectOccupations.set([]);
	selectFacilities.set([]);
	term.set('');
});

</script>


{#await occupationsCardinal.load()}
	<ul class="list-group list-group-flush">
		{#each Object.keys($page.data.occupationsCardinal) as name}
			<li class="list-group-item">
				{$page.data.occupationsCardinal[name]['count']['total']}
				{$page.data.occupationsCardinal[name]['label']}
			</li>
		{/each}
	</ul>
{:then}
	<ul class="list-group list-group-flush">
		{#each Object.keys($occupationsCardinal) as name}
			<li class="list-group-item">
				{$occupationsCardinal[name]['count']['total']}
				{$occupationsCardinal[name]['label']}
			</li>
		{/each}
	</ul>
{/await}
