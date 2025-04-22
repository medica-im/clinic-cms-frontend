<script lang="ts">
	import Directory from '$lib/components/Directory/CtxDirectory.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Address from '$lib/Address/Address.svelte';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import Email from '$lib/Email/Email.svelte';
	import SoMed from '$lib/SoMed/SoMed.svelte';
	import Website from '$lib/components/Website/Website.svelte';
	import { browser } from '$app/environment';
	import { isMobile } from '$lib/helpers/deviceDetector.ts';
	import { createFacilitiesMapData } from '$lib/components/Map/mapData.ts';
	import type { Facility } from '$lib/interfaces/facility.interface.ts';
	import type { Entry } from '$lib/store/directoryStoreInterface';

	export let data: Facility;
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
</script>

<div id="{data.name}_anchor" class="card variant-soft px-4 py-2 lg:scroll-mt-12">
	<div class="grid grid-cols-1 md:grid-cols-2">
		<div class="overflow-hidden m-1 p-1">
			<!-- Header -->
			<!--header>
                <img src={img} class="bg-black/50 w-full" alt={alt} />
            </header-->
			<!-- Body -->
			<div class="p-2 space-y-2 space-x-2">
				<a href="/sites/{data.slug}" class="anchor" data-sveltekit-preload-data="hover">
					<h4 class="h4">{data.name}</h4>
				</a>
				<div class="space-x-2">
					<Address {data} />
				</div>
				{#if data?.emails}
					<ul class="list">
						{#each data?.emails as email}
							<Email data={email} />
						{/each}
					</ul>
				{/if}

				{#if browser}
					{#if isMobile(window)}
						<Navigation geoData={createFacilityGeoData(data)} />
					{/if}
				{/if}

				<span class="inline-block align-middle space-x-1">
					{#if data?.websites}
						{#each data.websites as website}
							<Website {website} />
						{/each}
					{/if}
					{#if data?.socialnetworks}
						<SoMed data={data.socialnetworks} appBar={false} />
					{/if}
				</span>
			</div>
			<div>
				<Directory data={entries} typesView={true} propSelectFacility={data.uid} displayEntries={false} />
			</div>
		</div>
		<div class="mx-2 p-1 h-64 lg:w-full z-0">
			<Map data={createFacilitiesMapData([data])} />
		</div>
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
