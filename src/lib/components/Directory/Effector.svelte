<script lang="ts">
	import Phones from './Phones.svelte';
	import { FacilityLink } from 'clinic-cms';
	import AvatarList from '$lib/components/Effector/Avatar/AvatarList.svelte';
    import { page } from '$app/stores';
	import type { Entry } from '$lib/store/directoryStoreInterface';
	export let effector: any;
	export let avatar: boolean;

	function entryPageUrl(entry: Entry, pathname: string) {
		let typeSlug = entry.types[0].slug;
		let facilitySlug = entry.facility.slug;
		let nameSlug = entry.slug;
		if (!facilitySlug || !typeSlug || !nameSlug) {
			return;
		} else {
			return `/${facilitySlug}/${typeSlug}/${nameSlug}?origin=${encodeURIComponent(pathname)}`;
		}
	}
</script>
<a class="unstyled" href={entryPageUrl(effector, $page.url.pathname)}>

<div class="flex flex-col items-top rounded-lg lg:flex-row  variant-soft-surface m-4">
{#if avatar==true}
		<AvatarList data={effector} />
		{/if}
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
