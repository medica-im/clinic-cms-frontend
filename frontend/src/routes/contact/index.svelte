<script>
	import { afterUpdate, onMount } from 'svelte';
	import fetchFacilitiesStore from '$lib/store/facilityStore.ts';
	import LeafletMap from '$lib/map/LeafletMap.svelte';
	import Address from '$lib/Address/Address.svelte';
	import { tick } from 'svelte';
	import CircularProgress from '@smui/circular-progress';

	const [data, loading, error, get] = fetchFacilitiesStore();

	const createFacilityGeoData = (fData) => {
		let contact = fData.contact;
		console.log(contact);
		let address = contact.addresses[0];
		console.log(address);
		let facilityGeoData = {
			latitude: Number(address.latitude),
			longitude: Number(address.longitude),
			zoom: address.zoom
		};
		console.log(facilityGeoData);
		return facilityGeoData;
	};

	/*onMount(async () => {
		if ($facilitiesData === undefined) {
			await fetchFacilities();
			console.log(facilitiesData);
		    console.log($facilitiesData);
		}
	});*/
</script>

<main>
	{#if $loading}
		<div style="display: flex; justify-content: center">
			<CircularProgress style="height: 32px; width: 32px;" indeterminate />
		</div>
	{:else if $error}
		Error: {$error}
	{:else}
		<Address contactData={$data.contact} />
		<LeafletMap geoData={createFacilityGeoData($data)} />
	{/if}
</main>