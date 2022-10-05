<script>
import FacilityList from '../../components/FacilityList.svelte';
import LeafletMap from './map/LeafletMap.svelte';
//import Map from './map/Map.svelte';
import Address from '$lib/Address/Address.svelte';
import CircularProgress from '@smui/circular-progress';
import { facilityStore } from '$lib/store/facilityStore';
import browser from '$app/environment';
import { onMount } from 'svelte';
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


<main>
	{#await facilityStore.load()}
		<div style="display: flex; justify-content: center">
			<CircularProgress style="height: 32px; width: 32px;" indeterminate />
		</div>
	{:then}
		<FacilityList organizationData={$facilityStore} />
		{#each $facilityStore.facility as facility}
			{#if facility.contact}
				<div class="card">
					<!--img class="card-img-top" src="..." alt="Card image cap" /-->
					<div class="card-body">
						<div id="{facility.name}_anchor" />
						<h5 class="card-title">{facility.contact.formatted_name}</h5>
						<p class="card-text">
							<Address contactData={facility.contact} />
							<LeafletMap geoData={createFacilityGeoData(facility)} />
							<!--Map /-->
						</p>
					</div>
				</div>
			{/if}
		{/each}
	{/await}
</main>
