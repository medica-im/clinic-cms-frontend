<script lang="ts">
	//import { getEditMode } from '$lib/components/Directory/context';
	import Phone from './Phone.svelte';
	let { data } = $props();

	//const editMode = getEditMode();
</script>
<div class="">
{#each data as phone (phone.id)}
<Phone data={phone} editMode={false}/>
{/each}
</div>