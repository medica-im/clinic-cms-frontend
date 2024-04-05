<script lang="ts">
	import Phones from './Phones.svelte';
	import Addresses from './Addresses.svelte';
	import FacilityLink from '$lib/components/Facility/FacilityLink.svelte';
	import Address from './Address.svelte';
	export let effector: any;

	function effectorPageUrl(effector) {
		let typeSlug = effector.types[0].slug;
		let facilitySlug = effector.facility.slug;
		let nameSlug = effector.slug;
		if (!facilitySlug || !typeSlug || !nameSlug) {
			return;
		} else {
			return `/${facilitySlug}/${typeSlug}/${nameSlug}`;
		}
	}
</script>

<div class="card p-4 m-4">
	<a class="unstyled" href={effectorPageUrl(effector)}>
		<div class="space-y-3">
			<h3 class="h3">{effector.name}</h3>
			{#if (import.meta.env.VITE_DEV == 'true')}
			<p class="text-xs">{effector.effector_uid}</p>
			{/if}
			<h4 class="h4"><i>{effector.types.map((type) => type.label)}</i></h4>

			{#if effector.phones?.length}
				<Phones data={effector.phones} />
			{/if}
			<div class="space-y-1">
				{#if effector.facility}
					<div><FacilityLink data={effector.facility} /></div>
				{/if}
				{#if effector.address}
					<div><Address data={effector.address} /></div>
				{/if}
				{#if effector.other_addresses?.length}
					<div><Addresses data={effector.other_addresses} /></div>
				{/if}
			</div>
		</div>
	</a>
</div>
