<script lang="ts">
	import { occupationsCardinal, workforceDataCached } from '$lib/store/workforceStore';
    import LL from '$i18n/i18n-svelte';
</script>

{#await occupationsCardinal.load()}
<div class="spinner-border" role="status">
	<span class="visually-hidden">{$LL.LOADING()}</span>
</div>
{:then}
	<ul class="list-group list-group-flush">
		{#each Object.keys($occupationsCardinal) as name}
			<li class="list-group-item">
				{$occupationsCardinal[name]["count"]["total"]} {$occupationsCardinal[name]["label"]}
			</li>
		{/each}
	</ul>
{/await}
