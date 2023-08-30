<script lang="ts">
	import Phones from './Phones.svelte';
	import Addresses from './Addresses.svelte';
	import { distanceEffectors } from '$lib/store/directoryStore';
	export let effector: any;
</script>

<div class="card p-4">
	<h3 class="h3">{effector.name_fr}</h3>
	<ul class="list">
        <li>
			<h4 class="h4">{effector.types.map((type) => type.name)}</h4>
		</li>
		{#if effector.phones?.length}
			<li><Phones data={effector.phones} /></li>
		{/if}
		{#if effector.addresses?.length}
			<li><Addresses data={effector.addresses} /></li>
		{/if}
	</ul>
</div>
