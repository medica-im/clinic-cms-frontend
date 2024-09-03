<script lang="ts">
	import { createMapData } from '$lib/components/Map/mapData.ts';
	import LeafletSveltified from '$components/Map/LeafletSveltified.svelte';
	import Phones from './Phones.svelte';
	import Addresses from './Addresses.svelte';
	import Address from './Address.svelte';
	export let effector: any;
</script>


<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
	<div class="space-y-2">
		<h3 class="h3">{effector.name}</h3>

		<h4 class="h4">{effector.types.map((type) => type.name)}</h4>

		{#if effector.phones?.length}
			<div><Phones data={effector.phones} /></div>
		{/if}

		{#if effector.address}
			<div><Address data={effector.address} /></div>
		{/if}
		{#if effector.other_addresses?.length}
			<Addresses data={effector.other_addresses} />
		{/if}
	</div>
	<div class="w-full h-64 lg:h-96 lg:w-96">
		<!--Map data={effector.address} /-->
		<LeafletSveltified data={createMapData(effector.address)} />
	</div>
</div>
