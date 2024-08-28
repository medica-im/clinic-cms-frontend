<script lang="ts">
	import Phones from './Phones.svelte';
	import { FacilityLink } from 'clinic-cms';
	import Address from './Address.svelte';
	import AvatarList from '$lib/components/Effector/Avatar/AvatarList.svelte';

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
<a class="unstyled" href={effectorPageUrl(effector)}>

<div class="flex flex-col items-top rounded-lg lg:flex-row  variant-soft-surface m-4">
		<AvatarList data={effector} />
		<div class="p-4 space-y-1">
			<h3 class="h3">{effector.name}</h3>
			<!--
			{#if (import.meta.env.VITE_DEV == 'true')}
			<p class="text-xs">{effector.effector_uid}</p>
			{/if}
			-->
			<h4 class="h4"><i>{effector.types.map((type) => type.label)}</i></h4>

			{#if effector.phones?.length}
				<Phones data={effector.phones} />
			{/if}
			<div class="space-y-1">
				{#if effector.facility}
					<div><FacilityLink data={effector.facility} /></div>
				{/if}
				<!--
				{#if effector.address}
					<div><Address data={effector.address} /></div>
				{/if}
				{#if effector.other_addresses?.length}
					<div><Addresses data={effector.other_addresses} /></div>
				{/if}
				-->
			</div>
		</div>
</div>
</a>
