<script lang="ts">
	import Phones from '$lib/Directory/Phone/Phones.svelte';
	import Emails from '$lib/Email/Emails.svelte';
	//import { FacilityLink } from '$lib';
	import AvatarList from '$lib/components/Effector/Avatar/AvatarList.svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	//import { entryPageUrl } from '$lib/utils/utils';

	type Entry = any;

	export let entry: Entry;
	export let avatar: boolean;

	function entryUrl(entry: Entry) {
		return `/${entry.slug}?origin=${encodeURIComponent(page.url.pathname)}`;
	}

	const goTo = () => {
		const url = entryUrl(entry);
		goto(url, { replaceState: false });
	};
</script>
<!--{JSON.stringify(entry)}-->
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
			<h3 class="h3">{entry.formatted_name}</h3>
			<!--
			{#if (import.meta.env.VITE_DEV == 'true')}
			<p class="text-xs">{entry.effector_uid}</p>
			{/if}
			-->
			<h4 class="h4"><i>{entry.occupations[0].label}</i></h4>
			<div class="space-y-2">

			{#if entry.phone_numbers?.length}
				<Phones data={entry.phone_numbers} />
			{/if}
			{#if entry.emails?.length}
				<Emails data={entry.emails} editMode={false} />
			{/if}
				<!--{#if entry.facility}
					<div><FacilityLink data={entry.facility} /></div>
				{/if}-->
			</div>
		</div>
	</div>
</button>
