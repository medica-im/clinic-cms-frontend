<script lang="ts">
	import Phones from './Phones.svelte';
	import Addresses from './Addresses.svelte';
	import Distance from './Distance.svelte';
	import { distanceEffectors } from '$lib/store/directoryStore.ts';
	import Address from './Address.svelte';
	export let effector: any;

	function effectorPageUrl(effector) {
		let typeSlug = effector.types[0].slug;
		let communeSlug = effector.commune.slug;
		let nameSlug = effector.slug;
		//console.log(`${typeSlug}, ${communeSlug}, ${nameSlug}`)

		if (!typeSlug || !communeSlug || !nameSlug) {
			return;
		} else {
			return `/${typeSlug}/${communeSlug}/${nameSlug}`;
		}
	}
</script>

<div class="card p-4 m-4">
	<a class="unstyled" href={effectorPageUrl(effector)}>

		<h3 class="h3">{effector.name}</h3>
	<ul class="list">
		<li>
			<h4 class="h4">{effector.types.map((type) => type.name)}</h4>
		</li>
		{#if effector.phones?.length}
			<li><Phones data={effector.phones} /></li>
		{/if}
		{#if effector.address}
			<li><Address data={effector.address} /></li>
		{/if}
		{#if effector.other_addresses?.length}
			<li><Addresses data={effector.other_addresses} /></li>
		{/if}
	</ul>
</a>

</div>
