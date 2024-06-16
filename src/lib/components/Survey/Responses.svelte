<script lang="ts">
	import Response from "./Response.svelte";

    export let data;
</script>

<div class="space-y-4 p-4">
	{#each data as response}
		<Response data={response} />
	{/each}
</div>
