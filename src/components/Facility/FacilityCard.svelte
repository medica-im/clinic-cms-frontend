<script lang="ts">
	import Map from '$lib/components/Map/Map.svelte';
	import Address from '$lib/Address/Address.svelte';
	import Navigation from '$components/Navigation/Navigation.svelte';
	import Email from '$components/Email/Email.svelte';
	import SoMed from '$components/SoMed/SoMed.svelte';
	import Website from '$lib/components/Website/Website.svelte';
	import { browser } from '$app/environment';
	import { isMobile } from '$lib/helpers/deviceDetector.ts';
	import { createFacilitiesMapData } from '$lib/components/Map/mapData.ts';
	import type { Facility } from '$lib/interfaces/facility.interface.ts';

	export let data: Facility;

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

<div id="{data.name}_anchor" class="card variant-soft p-2 lg:scroll-mt-12">
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
				<p>
					{#if browser}
						{#if isMobile(window)}
							<Navigation geoData={createFacilityGeoData(data)} />
						{/if}
					{/if}
				</p>
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
				<div></div>
			</div>
			<!-- Footer -->
			<!--footer class="p-4 flex justify-start items-center space-x-4">
                <a href={url} class="btn bg-primary-500" data-sveltekit-preload-data="hover">
                    <span><Fa icon={faReadme} /></span><span>{$LL.BLOG.READMORE()}</span>
                </a>
            </footer-->
		</div>
		<div class="m-1 p-1 h-64 lg:w-full z-0">
			<!--LeafletMap geoData={createFacilityGeoData(facility)} /-->
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