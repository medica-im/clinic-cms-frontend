<script lang="ts">
	import EntryInline from './EntryInline.svelte';

	type Entry = any;
	export let data: Entry[];
</script>

<ul class="list">
	{#each data as entry}
		<li><EntryInline data={entry} /></li>
	{/each}
</ul>
