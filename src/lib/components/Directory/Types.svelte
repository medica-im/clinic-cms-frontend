<script lang="ts">
	import { getContext } from 'svelte';
	import Buttons from './Buttons.svelte';
	import type { Writable, AsyncWritable, Loadable } from '@square/svelte-store';

	export let data: any;
	export let displayEntries: boolean;

	const cCFE = getContext<Loadable<Map<any, any>>>('cardinalCategorizedFilteredEffectors');
</script>

{#await cCFE.load()}
	{#if data && [...data]?.length}
		<Buttons {data} {displayEntries} />
	{/if}
{:then}
	<Buttons data={$cCFE} {displayEntries} />
{/await}
