<script lang="ts">
	import { selectOccupations, term, workforceOccupation } from '$lib/store/workforceStore.ts';
	import { selectFacilities } from '$lib/store/selectionStore';
	import { page } from '$app/stores';
	import LL from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	export let data: any;

	const getTypesParam = (slug) => {
		const quotedSlug: string[] = [slug];
		const encodedParam = encodeURIComponent(JSON.stringify(quotedSlug));
		return encodedParam;
	}

	onMount(() => {
	selectOccupations.set([]);
	//selectFacilities.set([]);
	term.set('');
});

</script>

<div class="space-x-2">
{#each [...data] as [key, value]}
		<a href={`/annuaire/${value.slug}?types=${getTypesParam(value.uid)}`} class="btn variant-ghost-primary btn-sm m-2"><span class="">
				{value.count}
				{key}
		</span></a>
		{/each}
</div>