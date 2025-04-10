<script lang="ts">
	import EntryInline from './EntryInline.svelte';
	import type { Entry } from '$lib/store/directoryStoreInterface';

	export let data: Entry[];
</script>

<ul class="list">
	{#each data as entry}
		<li><EntryInline data={entry} /></li>
	{/each}
</ul>
