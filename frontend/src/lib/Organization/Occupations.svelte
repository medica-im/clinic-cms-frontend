<script lang="ts">
	import { occupationsCardinal, workforceDataCached } from '$lib/store/workforceStore';
	import CircularProgress from '@smui/circular-progress';


</script>

{#await occupationsCardinal.load()}
<div style="display: flex; justify-content: center">
	<CircularProgress style="height: 32px; width: 32px;" indeterminate />
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
