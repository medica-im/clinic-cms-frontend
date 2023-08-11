<script lang="ts">
	import Phone from './Phone.svelte';
	export let data: any;
</script>

{#if data.length>1}
<ul class="list">
    {#each data as phone}
    <li><Phone data={phone}/></li>
    {/each}
</ul>
{:else if data.length==1}
    <Phone data={data[0]}/>
{/if}