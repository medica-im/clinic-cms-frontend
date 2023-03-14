<script lang="ts">
	import { facilityStore } from '$lib/store/facilityStore';
	import {
		filteredWorkforceDataCached,
		occupations,
		occupationsCardinal
	} from '$lib/store/workforceStore';
	import Worker from '$lib/Workforce/Worker.svelte';
	import Search from '$lib/Search.svelte';
	import SelectOccupations from '$lib/Workforce/SelectOccupations.svelte';
	import SelectFacilities from '$lib/Workforce/SelectFacilities.svelte';
	import LeafletMap from '$components/Map/LeafletMap.svelte';
	import Address from '$lib/Address/Address.svelte';
	import SoMed from '$components/SoMed/SoMed.svelte';
	import Website from '$lib/components/Website/Website.svelte';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import { page } from '$app/stores';

	export let facility;

	const createFacilityGeoData = (fData) => {
		let contact = fData.contact;
		let address = {
			latitude: 0,
			longitude: 0,
			zoom: 0
		};
		if (contact.addresses.length > 0) {
			address = contact.addresses[0];
		}
		let facilityGeoData = {
			name: fData?.name ?? 'default',
			latitude: Number(address?.latitude ?? 0),
			longitude: Number(address?.longitude ?? 0),
			zoom: address?.zoom ?? 0
		};
		return facilityGeoData;
	};
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
	<div>
		<div class="card card-hover overflow-hidden" id="{facility.name}_anchor">
			<!-- Header -->
			<!--header>
                <img src={img} class="bg-black/50 w-full" alt={alt} />
            </header-->
			<!-- Body -->
			<div class="p-4 space-y-4 space-x-4">
				<h3>{facility.contact.formatted_name}</h3>
				<p class="space-x-4">
					<Address contactData={facility.contact} />
                </p>
                <p class="space-x-4">
					{#if facility.contact.websites}
							{#each facility.contact.websites as website}
									<Website {website} />
							{/each}
					{/if}
					<SoMed data={facility.contact.socialnetworks} appBar={false} />
				</p>
			</div>
			<!-- Footer -->
			<!--footer class="p-4 flex justify-start items-center space-x-4">
                <a href={url} class="btn bg-primary-500" data-sveltekit-preload-data="hover">
                    <span><Fa icon={faReadme} /></span><span>{$LL.BLOG.READMORE()}</span>
                </a>
            </footer-->
		</div>
	</div>
	<div><LeafletMap geoData={createFacilityGeoData(facility)} /></div>
</div>