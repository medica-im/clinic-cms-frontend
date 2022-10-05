<script lang="ts">
	import { occupationsCardinal, workforceDict, workforceDataCached } from '$lib/store/workforceStore';
	import Occupations from '$lib/Organization/Occupations.svelte';
	import CircularProgress from '@smui/circular-progress';
</script>

<Occupations />

<h2>workforceDict</h2>
{#await workforceDict.load()}
    <div style="display: flex; justify-content: center">
	    <CircularProgress style="height: 32px; width: 32px;" indeterminate />
    </div>
{:then}
<pre>{JSON.stringify($workforceDict, null, '\t')}</pre>
{/await}

<h2>occupationsCardinal</h2>
{#await occupationsCardinal.load()}
    <div style="display: flex; justify-content: center">
	    <CircularProgress style="height: 32px; width: 32px;" indeterminate />
    </div>
{:then}
<pre>{JSON.stringify($occupationsCardinal, null, '\t')}</pre>
{/await}

<h2>workforceDataCached</h2>
{#await  workforceDataCached.load()}
    <div style="display: flex; justify-content: center">
	    <CircularProgress style="height: 32px; width: 32px;" indeterminate />
    </div>
{:then}
<pre>{JSON.stringify($workforceDataCached, null, '\t')}</pre>
{/await}