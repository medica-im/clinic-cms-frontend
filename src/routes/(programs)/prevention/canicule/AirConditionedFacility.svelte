<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
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
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import type { Facility } from '$lib/interfaces/facility.interface.ts';
	import type { MapData } from '$lib/interfaces/mapData.interface.ts';

	const facilityMapData: MapData = {
		latLng: [43.9272073, 4.9460897],
		zoom: 19
	};
	const navigationData = {
		name: 'Médiathèque Raoul Milhaud',
		latitude: 43.9272073,
		longitude: 4.9460897,
		zoom: 19
	};
	const facilityData = {
		address: {
			street: '148 rue du Baron Leroy',
			zip: '84470',
			city: 'Châteauneuf de Gadagne'
		},
		phones: [{ phone: '0490224250', type: 'W' }]
	};
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 card variant-soft p-4 space-x-4 space-y-4 w-fit">
	<div class="space-y-2 space-x-2 mx-0">
		<div class="space-y-4">
			<h3 class="h3">Médiathèque Raoul Milhaud</h3>
			<div class="px-4">
			<Address data={facilityData} />
			</div>
			<Accordion>
				<AccordionItem>
					<svelte:fragment slot="lead"><Fa icon={faCalendarDays} /></svelte:fragment>
					<svelte:fragment slot="summary">Horaires d'ouverture</svelte:fragment>
					<svelte:fragment slot="content">
						<ul class="list-disc space-y-4 p-4">
							<li>Lundi: fermée</li>
							<li>Mardi: 15h00 - 18h00</li>
							<li>Mercredi: 10h00 - 12h00 et 13h30 - 17h00</li>
							<li>Jeudi: fermée</li>
							<li>Vendredi: 15h00 - 18h00</li>
							<li>Samedi: 10h00 - 12h00 et 13h30 - 17h00</li>
							<li>Dimanche: fermée</li>
						</ul>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>

			{#if browser}
				{#if isMobile(window)}
					<Navigation geoData={navigationData} />
				{/if}
			{/if}
		</div>
		<div>
			<span class="inline-block align-middle space-x-1">
				<Website
					website={{ website: 'https://www.mediatheque-chateauneufdegadagne.fr', type: 'W' }}
				/>
			</span>
		</div>
	</div>
	<div>
		<figure class="content-center shrink mx-auto w-64 lg:w-80">
			<img
				class="h-auto w-fit"
				src="https://www.mediatheque-chateauneufdegadagne.fr/images/contribution/2-infos-pratiques/FacadeBibli.JPG"
				alt="Médiathèque Raoul Milhaud"
			/>
			<figcaption class="text-center w-64 lg:w-80">
				<div class="mx-auto text-primary">Médiathèque Raoul Milhaud</div>
			</figcaption>
		</figure>
	</div>
	<div class="h-64 w-64 lg:w-96 lg:h-96 z-0">
		<Map data={[facilityMapData]} />
	</div>
</div>
