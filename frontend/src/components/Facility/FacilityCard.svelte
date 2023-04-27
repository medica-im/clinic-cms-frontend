<script lang="ts">
	import LeafletMap from '$components/Map/LeafletSveltifiedMap.svelte';
	import Address from '$lib/Address/Address.svelte';
	import Navigation from '$components/Navigation/Navigation.svelte';
	import SoMed from '$components/SoMed/SoMed.svelte';
	import Website from '$lib/components/Website/Website.svelte';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { isMobile } from '$lib/helpers/deviceDetector';

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

<section id="{facility.name}_anchor" class="card variant-soft mx-4 my-6 p-1 lg:scroll-mt-12">
	<div class="grid grid-cols-1 md:grid-cols-2">
			<div class="overflow-hidden m-1 p-1">
				<!-- Header -->
				<!--header>
                <img src={img} class="bg-black/50 w-full" alt={alt} />
            </header-->
				<!-- Body -->
				<div class="p-2 space-y-2 space-x-2">
					<h4>{facility.contact.formatted_name}</h4>
					<p class="space-x-2">
						<Address contactData={facility.contact} />
					</p>
					<p>
						
						{#if browser}
						{#if isMobile(window)}
						<Navigation geoData={createFacilityGeoData(facility)} />
						{/if}
						{/if}
					</p>
					<span class="inline-block align-middle space-x-1">
						{#if facility.contact.websites}
							{#each facility.contact.websites as website}
								<Website {website} />
							{/each}
						{/if}
						<SoMed data={facility.contact.socialnetworks} appBar={false} />
					</span>
					<div>
					</div>
				</div>
				<!-- Footer -->
				<!--footer class="p-4 flex justify-start items-center space-x-4">
                <a href={url} class="btn bg-primary-500" data-sveltekit-preload-data="hover">
                    <span><Fa icon={faReadme} /></span><span>{$LL.BLOG.READMORE()}</span>
                </a>
            </footer-->
			</div>
		<div class="m-1 p-1 h-56">
			<LeafletMap geoData={createFacilityGeoData(facility)} />
		</div>
	</div>
</section>
