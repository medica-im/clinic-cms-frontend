<script lang="ts">
	import Phones from './Phones.svelte';
	import { FacilityLink } from '$lib';
	import { goto } from '$app/navigation';
	import AvatarList from '$lib/components/Effector/Avatar/AvatarList.svelte';
	import { page } from '$app/stores';
	import type { Entry } from '$lib/store/directoryStoreInterface.ts';

	export let effector: Entry;
	export let avatar: boolean;

	function effectorPageUrl(pathname: string) {
		let typeSlug = effector.effector_type.slug;
		let facilitySlug = effector.facility.slug;
		let nameSlug = effector.slug;
		return `/${facilitySlug}/${typeSlug}/${nameSlug}?origin=${encodeURIComponent(pathname)}`;
	}

	const goTo = (pathname: string) => {
		const url = effectorPageUrl(pathname);
		goto(url, { replaceState: true });
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<button
	on:click={() => {
		goTo($page.url.pathname);
	}}
	style="all: unset; cursor: pointer;"
>
	<div class="flex flex-col items-top rounded-lg lg:flex-row variant-soft-surface m-4">
		{#if avatar == true}
			<div class="p-4 lg:p-0">
				<a class="unstyled" href={effectorPageUrl($page.url.pathname)}>
					<AvatarList data={effector} />
				</a>
			</div>
		{/if}
		<div class="p-4 space-y-1">
			<a class="unstyled" href={effectorPageUrl($page.url.pathname)}>
				<h3 class="h3">{effector.name}</h3>
			</a>

			{#if import.meta.env.VITE_DEV == 'true'}
				<p class="text-xs">{effector.effector_uid}</p>
			{/if}

			<h4 class="h4"><i>{effector.effector_type.label}</i></h4>

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
</button>
