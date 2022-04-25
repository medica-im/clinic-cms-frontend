<script>
	import { afterUpdate, onMount } from 'svelte';
	import { facilitiesData, fetchFacilities } from '$lib/store/facilityStore';
	import LeafletMap from '$lib/map/LeafletMap.svelte';
	import Address from '$lib/Address/Address.svelte';
	console.log(facilitiesData);
	let facilityGeoData;
	let facilityContactData;
	const createFacilityGeoData = (fData) => {
		if (fData[0] === undefined) {
			return;
		}
		let facilityData = fData[0];
		console.log(facilityData);
		let contact = facilityData.contact;
		console.log(contact);
		let address = contact.addresses[0];
		console.log(address);
		facilityGeoData = {
			latitude: Number(address.latitude),
			longitude: Number(address.longitude),
			zoom: address.zoom
		};
		console.log(facilityGeoData);
		return facilityGeoData;
	};

	const createFacilityContactData = (fData) => {
		if (fData[0] === undefined) {
			return;
		}
		let facilityData = fData[0];
		facilityContactData = facilityData.contact;
		console.log(facilityContactData);
		return facilityContactData;
	};

	onMount(async () => {
		if ($facilitiesData.length < 1) {
			await fetchFacilities();
		}
		facilityGeoData = createFacilityGeoData($facilitiesData);
		facilityContactData = createFacilityContactData($facilitiesData);
	});
</script>

<main>
	<Address contactData={facilityContactData} />
	<LeafletMap geoData={facilityGeoData} />
</main>
