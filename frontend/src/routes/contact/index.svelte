<script>
	import { afterUpdate, onMount } from 'svelte';
	import { facilitiesData, fetchFacilities } from '$lib/store/facilityStore';
	import LeafletMap from '$lib/map/LeafletMap.svelte';
	import Address from '$lib/Address/Address.svelte';

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

	onMount(async () => {
		if ($facilitiesData === undefined) {
			await fetchFacilities();
			console.log(facilitiesData);
		    console.log($facilitiesData);
		}
	});
</script>

<main>
	<Address contactData={$facilitiesData.contact} />
	<LeafletMap geoData={createFacilityGeoData($facilitiesData)} />
</main>
