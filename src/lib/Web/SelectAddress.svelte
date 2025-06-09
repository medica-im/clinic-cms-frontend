<script lang="ts">
    import MapPinHouse from '@lucide/svelte/icons/map-pin-house';
type SelectOption = {value: string, label: string};
let { address = $bindable(), addressOptions, visible = $bindable() } :{ address: string|null, addressOptions: SelectOption[], visible: boolean } = $props();
</script>
{#each addressOptions as addressOption}
<button class="chip variant-soft hover:variant-filled" onclick={()=>{address= addressOption.value; visible=false;}}>
	<span><MapPinHouse/></span>
	<span>{addressOption.label}</span>
</button>
{/each}