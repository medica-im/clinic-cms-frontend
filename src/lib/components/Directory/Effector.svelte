<script lang="ts">
	import Phones from './Phones.svelte';
	import { FacilityLink } from 'clinic-cms';
	import AvatarList from '$lib/components/Effector/Avatar/AvatarList.svelte';
    import { page } from '$app/state';
	import { getSelectFacility, getSelectCategories, getTerm, getSelectCommunes } from "./context";
	import { goto } from '$app/navigation';
	import type { Entry } from '$lib/store/directoryStoreInterface';
	export let effector: any;
	export let avatar: boolean;

	let selectFacility = getSelectFacility();
	let selectCategories = getSelectCategories();
	let selectCommunes = getSelectCommunes();
	let term = getTerm();

	function entryPageUrl(entry: Entry, pathname: string, facility: string, types: string[], term: string, communes: string[]) {
		let typeSlug = entry.types[0].slug;
		let facilitySlug = entry.facility.slug;
		let nameSlug = entry.slug;
		let facilityParam = facility ? `&facility=${encodeURIComponent(facility)}` : "";
		let typesParam = types.length ? `&types=${encodeURIComponent(JSON.stringify(types))}` : "";
		let termParam = term ? `&term=${encodeURIComponent(term)}` : "";
		let communesParam = communes.length ? `&communes=${encodeURIComponent(JSON.stringify(communes))}` : "";
		return `/${facilitySlug}/${typeSlug}/${nameSlug}?origin=${encodeURIComponent(pathname)}${facilityParam}${typesParam}${termParam}${communesParam}`;
	}

	const goTo = () => {
		const url = entryPageUrl(effector, page.url.pathname, $selectFacility, $selectCategories, $term, $selectCommunes);
		goto(url, { replaceState: false });
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<button on:click={()=>{goTo()}} style="all: unset; cursor: pointer;">

<div class="flex flex-col items-top rounded-lg lg:flex-row  variant-soft-surface m-4 w-full">
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
</button>
