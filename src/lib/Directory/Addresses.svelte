<script lang="ts">
	import Address from './Address.svelte';
	export let data: any;
</script>

{#if data.length>1}
<ul class="list">
    {#each data as address}
    <li><Address data={address}/></li>
    {/each}
</ul>
{:else if data.length==1}
    <Address data={data[0]}/>
{/if}