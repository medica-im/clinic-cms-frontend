<script lang="ts">
	import Phone from './Phone.svelte';
	export let data: any;
</script>
<div class="">
{#each data as phone}
<Phone data={phone}/>
{/each}
</div>