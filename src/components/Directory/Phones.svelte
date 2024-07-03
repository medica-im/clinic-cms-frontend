<script lang="ts">
	import Phone from './Phone.svelte';
	export let data: any;
</script>

{#if data.length>1}
    {#each data as phone}
    <Phone data={phone}/>
    {/each}
{:else if data.length==1}
    <Phone data={data[0]}/>
{/if}