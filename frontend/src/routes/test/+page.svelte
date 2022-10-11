<script lang="ts">
	import { occupationsCardinal, workforceDict, workforceDataCached } from '$lib/store/workforceStore';
	import Occupations from '$lib/Organization/Occupations.svelte';
    import LL from '$i18n/i18n-svelte';
</script>

<Occupations />

<h2>workforceDict</h2>
{#await workforceDict.load()}
<div class="spinner-border" role="status">
    <span class="visually-hidden">{$LL.LOADING()}</span>
</div>
{:then}
<pre>{JSON.stringify($workforceDict, null, '\t')}</pre>
{/await}

<h2>occupationsCardinal</h2>
{#await occupationsCardinal.load()}
<div class="spinner-border" role="status">
    <span class="visually-hidden">{$LL.LOADING()}</span>
</div>
{:then}
<pre>{JSON.stringify($occupationsCardinal, null, '\t')}</pre>
{/await}

<h2>workforceDataCached</h2>
{#await  workforceDataCached.load()}
<div class="spinner-border" role="status">
    <span class="visually-hidden">{$LL.LOADING()}</span>
</div>
{:then}
<pre>{JSON.stringify($workforceDataCached, null, '\t')}</pre>
{/await}