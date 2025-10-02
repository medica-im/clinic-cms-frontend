<script lang="ts">
	import FreeEntryInline from './FreeEntryInline.svelte';
	import type { FreeEntry } from './interface.ts';

	export let data: FreeEntry[];
</script>

<ul class="list">
	{#each data as entry}
		<li><FreeEntryInline data={entry} /></li>
	{/each}
</ul>
