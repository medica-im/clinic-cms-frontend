<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import FileJson from '@lucide/svelte/icons/file-json';
	import Directory from '$lib/components/Directory/CtxDirectory.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import Address from '$lib/Address/Address.svelte';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import { browser } from '$app/environment';
	import { isMobile } from '$lib/helpers/deviceDetector.ts';
	import { createMapData2 } from '$lib/components/Map/mapData.ts';
	import type { Facility } from '$lib/interfaces/v2/facility.ts';

	export let data: Facility;
	export let entries = null;

	const createFacilityGeoData = (facility: Facility) => {
		let facilityGeoData = {
			name: facility?.name ?? 'default',
			latitude: Number(facility.location?.latitude ?? 0),
			longitude: Number(facility.location?.longitude ?? 0),
			zoom: facility?.zoom ?? 0
		};
		return facilityGeoData;
	};
</script>

<div id="{data.name}_anchor" class="card variant-soft p-4 space-y-4 lg:scroll-mt-12">
	<div class="card variant-ringed">
		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="lead"><FileJson /></svelte:fragment>
				<svelte:fragment slot="summary">Données JSON</svelte:fragment>
				<svelte:fragment slot="content">{JSON.stringify(data)}</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>
	<div class="variant-ringed grid grid-cols-1 md:grid-cols-2 p-4">
		<div class="overflow-hidden m-1 p-1">
			<!-- Header -->
			<!--header>
                <img src={img} class="bg-black/50 w-full" alt={alt} />
            </header-->
			<!-- Body -->
			<div class="p-2 space-y-2">
				<div class="flex items-center text-wrap space-x-2">
					<span class="badge variant-filled">Nom</span>
					<h4 class="h4">
						<a href="/sites/{data.slug}" class="anchor" data-sveltekit-preload-data="hover"
							>{data.name}</a
						>
					</h4>
				</div>
				<div class="flex items-center space-x-2">
					<span class="badge variant-filled">Label</span>
					<h4 class="h4">{data.label}</h4>
				</div>
				<div class="flex flex-wrap space-x-2">
					<span class="badge variant-filled">Bâtiment</span>
					<div>{data.building || '∅'}</div>
				</div>
				<div class="flex flex-wrap space-x-2">
					<span class="badge variant-filled">Rue</span><span>{data?.street}</span>
				</div>
				<div class="flex flex-wrap space-x-2">
					<span class="badge variant-filled">Complément géographique</span>
					<div>{data.building || '∅'}</div>
				</div>
				<div class="flex flex-wrap space-x-2">
					<span class="badge variant-filled">Code postal</span><span>{data?.zip}</span>
				</div>
				<div class="flex flex-wrap space-x-2">
					<span class="badge variant-filled">Commune</span>
					<div>{data?.commune.name_fr || '∅'}</div>
				</div>
				<div class="flex flex-wrap space-x-2">
					<span class="badge variant-filled">Département</span>
					<div>{data?.commune.department.name || '∅'}</div>
				</div>
				<div class="flex flex-wrap space-x-2">
					<span class="badge variant-filled">Latitude</span>
					<div>{data?.location?.latitude || '∅'}</div>
					<span class="badge variant-filled">Longitude</span>
					<div>{data?.location?.longitude || '∅'}</div>
					<span class="badge variant-filled">Zoom</span>
					<div>{data?.zoom || '∅'}</div>
				</div>
				<p class="space-x-2">
					<span class="badge variant-filled">Effecteurs</span><span
						>{data?.effectors?.join(', ') || '∅'}</span
					>
				</p>
			</div>
			<div>
				{#if browser}
					{#if isMobile(window)}
						<Navigation geoData={createFacilityGeoData(data)} />
					{/if}
				{/if}
			</div>
			{#if entries}
				<div>
					<Directory
						data={entries}
						typesView={true}
						propSelectFacility={data.uid}
						displayEntries={false}
					/>
				</div>
			{/if}
		</div>
		<div class="mx-2 p-1 h-64 lg:w-full z-0">
			<Map data={createMapData2(data)} />
		</div>
	</div>
</div>
