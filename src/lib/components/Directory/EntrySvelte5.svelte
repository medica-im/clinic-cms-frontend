<script lang="ts">
	import Phones from './Phones.svelte';
	import { FacilityLink } from '$lib';
	import AvatarList from '$lib/components/Effector/Avatar/AvatarList.svelte';
	import { page } from '$app/state';
	import { getSelectFacility, getSelectCategories, getTerm, getSelectCommunes } from './context';
	import { goto } from '$app/navigation';
	import type { Entry } from '$lib/store/directoryStoreInterface';
	let { entry, avatar }: { entry: Entry; avatar: boolean } = $props();

	let selectFacility = getSelectFacility();
	let selectCategories = getSelectCategories();
	let selectCommunes = getSelectCommunes();
	let term = getTerm();

	function entryPageUrl(pathname: string) {
		let typeSlug = entry.effector_type.slug;
		let facilitySlug = entry.facility.slug;
		let nameSlug = entry.slug;
		return `/${facilitySlug}/${typeSlug}/${nameSlug}?origin=${encodeURIComponent(pathname)}`;
	}

	
	const goTo = () => {
		const url = entryPageUrl(page.url.pathname);
		goto(url, { replaceState: false });
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<button
	on:click={() => {
		goTo();
	}}
	style="all: unset; cursor: pointer;"
>
	<div class="flex flex-col items-top rounded lg:rounded-lg lg:flex-row variant-soft-surface m-4 w-full">
		{#if avatar == true}
			<div class="p-4 lg:p-0">
				<AvatarList data={entry} />
			</div>
		{/if}
		<div class="p-4 space-y-1">
			<h3 class="h3">{entry.name}</h3>
			<!--
			{#if (import.meta.env.VITE_DEV == 'true')}
			<p class="text-xs">{entry.effector_uid}</p>
			{/if}
			-->
			<h4 class="h4"><i>{entry.effector_type.label}</i></h4>

			{#if entry.phones?.length}
				<Phones data={entry.phones} />
			{/if}
			<div class="space-y-1">
				{#if entry.facility}
					<div><FacilityLink data={entry.facility} /></div>
				{/if}
			</div>
		</div>
	</div>
</button>
