<script lang="ts">
	import Directory from '$lib/components/Directory/CtxDirectory.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Address from '$lib/Address/Address.svelte';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import Email from '$lib/Email/Email.svelte';
	import SoMed from '$lib/SoMed/SoMed.svelte';
	import Website from '$lib/components/Website/Website.svelte';
	import { browser } from '$app/environment';
	import { isMobile } from '$lib/helpers/deviceDetector';
	import { createFacilitiesMapData } from '$lib/components/Map/mapData';
	import { variables } from '$lib/utils/constants';
	import { copy } from 'svelte-copy';
	import type { Facility } from '$lib/interfaces/facility.interface.ts';

	export let facility: Facility;
	export let userData;
	export let entries;

	const createFacilityGeoData = (facility: Facility) => {
		let address = facility?.address;
		let facilityGeoData = {
			name: facility?.name ?? 'default',
			latitude: Number(address?.latitude ?? 0),
			longitude: Number(address?.longitude ?? 0),
			zoom: address?.zoom ?? 0
		};
		return facilityGeoData;
	};

	function lgGridCols() {
		if (facility?.avatar?.raw) {
			return "3"
	    } else {
			return "2"
		}
	}
</script>

<div class="grid grid-cols-1 lg:grid-cols-{lgGridCols()} card variant-soft p-4 space-x-4 space-y-4 w-fit">
	<div class="space-y-2 space-x-2 mx-0">
		<div class="space-y-4">
		<Address data={facility} />
		{#if facility?.emails}
			{#each facility?.emails as email}
				<Email data={email} />
			{/each}
		{/if}
		{#if facility.address.longitude && facility.address.latitude}
		{#if browser}
			{#if isMobile(window)}
				<Navigation geoData={createFacilityGeoData(facility)} />
			{/if}
		{/if}
		{/if}
	    </div>
		{#if facility?.websites || facility?.socialnetworks }
		<div>
			<span class="inline-block align-middle space-x-1">
				{#if facility?.websites}
					{#each facility.websites as website}
						<Website {website} />
					{/each}
				{/if}
				{#if facility?.socialnetworks}
					<SoMed data={facility.socialnetworks} appBar={false} />
				{/if}
			</span>
		</div>
		{/if}
		{#if userData && userData?.is_staff}
			<div>
				{facility.uid}
				<button use:copy={facility.uid}> Copy! </button>
			</div>
		{/if}
		{#if entries && [...entries]?.length}
		<div>
			<Directory
				data={entries}
				typesView={true}
				propSelectFacility={facility.uid}
				displayEntries={true}
			/>
		</div>
		{/if}
	</div>
	{#if facility?.avatar?.raw}
		<div>
			<figure class="content-center shrink mx-auto w-64 lg:w-80">
				<img
					class="h-auto w-fit"
					src="{variables.BASE_URI}{facility.avatar.raw}"
					alt={facility.name}
				/>
				<figcaption class="text-center w-64 lg:w-80">
					<div class="mx-auto text-primary">
						{facility.name}
					</div>
				</figcaption>
			</figure>
		</div>
	{/if}
	{#if facility.address.longitude && facility.address.latitude}
	<div class="h-64 w-64 lg:w-96 lg:h-96 z-0">
		<Map data={createFacilitiesMapData([facility])} />
	</div>
	{/if}
</div>
