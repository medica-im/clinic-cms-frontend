<script lang="ts">
	import Directory from '$lib/components/Directory/CtxDirectory.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Address from '$lib/Address/Address.svelte';
	import Navigation from '$components/Navigation/Navigation.svelte';
	import Email from '$components/Email/Email.svelte';
	import SoMed from '$components/SoMed/SoMed.svelte';
	import Website from '$lib/components/Website/Website.svelte';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { isMobile } from '$lib/helpers/deviceDetector';
	import Fa from 'svelte-fa';
	import { faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons';
	import { createFacilitiesMapData } from '$lib/components/Map/mapData';
	import { variables } from '$lib/utils/constants';
	import { copy } from 'svelte-copy';

	export let facility;
	export let userData;
	export let entries;

	const createFacilityGeoData = (facility) => {
		let address = facility?.address;
		let facilityGeoData = {
			name: facility?.name ?? 'default',
			latitude: Number(address?.latitude ?? 0),
			longitude: Number(address?.longitude ?? 0),
			zoom: address?.zoom ?? 0
		};
		return facilityGeoData;
	};
</script>

<div class="flex flex-wrap card variant-soft p-4 space-x-8 space-y-8 w-fit">
			<div class="space-y-2 space-x-2 mx-0">
					<Address data={facility} />
				{#if facility?.emails}
						{#each facility?.emails as email}
							<Email data={email} />
						{/each}
				{/if}
				
					{#if browser}
						{#if isMobile(window)}
							<Navigation geoData={createFacilityGeoData(facility)} />
						{/if}
					{/if}
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
				{#if userData && userData?.is_staff}
				<div>
					{facility.uid}
					<button use:copy={facility.uid}>
						Copy!
					</button>			
			    </div>
				{/if}
				<div>
				<Directory
				    data={entries}
				    types={true}
					propSelectFacility={facility.uid}
					displayEntries={true}
				/>
			</div>
			</div>
		{#if facility?.avatar?.raw}
		<div>
			<figure class="content-center shrink mx-auto w-64 lg:w-80">
				<img class="h-auto w-fit" src="{variables.BASE_URI}{facility.avatar.raw}" alt={facility.name} />
				<figcaption class="text-center w-64 lg:w-80">
					<div class="mx-auto text-primary">
							{facility.name}
						</div>
				</figcaption>
			</figure>
		</div>
		{/if}
		<div class="h-64 w-64 lg:w-96 lg:h-96">
			<!--LeafletMap geoData={createFacilityGeoData(facility)} /-->
			<Map data={createFacilitiesMapData([facility])} />
		</div>

	<!--div class="mx-0">
		{#if $page.url.pathname == '/sites'}
			<a href="/sites/{facility.slug}" class="" data-sveltekit-preload-data="hover">
				<div class="flex items-center justify-around p-4 w-fit rounded-full variant-filled-primary hover:bg-primary-400">
					<div class="inline-flex flex-shrink-0 justify-center items-center w-4 h-4">
						<Fa icon={faMagnifyingGlassLocation} size="lg" />
					</div>
					<div class="ml-3 break-words overflow-hidden">
						{facility.name}
					</div>
				</div>
			</a>
		{/if}
	</div-->
</div>
