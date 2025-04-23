<script lang="ts">
	import Phones from '$lib/Directory/Phones.svelte';
	import Emails from '$lib/Email/Emails.svelte';
	import { FacilityLink } from '$lib';
	import AvatarList from '$lib/components/Effector/Avatar/AvatarList.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import type { FullEffector } from '$lib/store/directoryStoreInterface';
	export let entry: FullEffector;
	export let avatar: boolean;

	function entryPageUrl(entry: FullEffector, pathname: string) {
		let typeSlug = entry.effector_type.slug;
		let facilitySlug = entry.facility.slug;
		let nameSlug = entry.slug;
		return `/${facilitySlug}/${typeSlug}/${nameSlug}?origin=${encodeURIComponent(pathname)}`;
	}

	const goTo = () => {
		const url = entryPageUrl(entry, page.url.pathname);
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
	<div class="flex flex-col items-top rounded-lg lg:flex-row variant-soft-surface">
		{#if avatar == true}
		<div class="p-4 lg:p-0">
			<AvatarList data={entry} />
		</div>
		{/if}
		<div class="px-4 py-2 space-y-1">
			<h3 class="h3">{entry.name}</h3>
			<!--
			{#if (import.meta.env.VITE_DEV == 'true')}
			<p class="text-xs">{entry.effector_uid}</p>
			{/if}
			-->
			<h4 class="h4"><i>{entry.effector_type.label}</i></h4>
			<div class="space-y-2">

			{#if entry.phones?.length}
				<Phones data={entry.phones} />
			{/if}
			{#if entry.emails?.length}
				<Emails data={entry.emails} />
			{/if}
				{#if entry.facility}
					<div><FacilityLink data={entry.facility} /></div>
				{/if}
			</div>
		</div>
	</div>
</button>
