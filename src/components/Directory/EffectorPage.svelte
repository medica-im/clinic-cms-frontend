<script lang="ts">
	import Phones from './Phones.svelte';
	import Addresses from './Addresses.svelte';
	import Address from './Address.svelte';
	import Map from '$components/Map/Map.svelte';
	import EffectorContact from './EffectorContact.svelte';
	export let effector: any;
</script>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-1">
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
		<div class="h-56 w-56 lg:h-64 lg:w-96 p-2">
			<Map data={effector.address} />
		</div>
	</div>
