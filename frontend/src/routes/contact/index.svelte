<script>
	import { afterUpdate, onMount } from 'svelte';
	import fetchFacilitiesStore from '$lib/store/facilityStore.ts';
	import LeafletMap from '$lib/map/LeafletMap.svelte';
	import FacilityList from '../../components/FacilityList.svelte';
	import Address from '$lib/Address/Address.svelte';
	import { tick } from 'svelte';
	import CircularProgress from '@smui/circular-progress';
	import facilityStore from '$lib/store/facilityStore';
	import { locale } from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';

	let [data, loading, error, get] = fetchFacilitiesStore();

	function onLocaleChange(...args) {
		console.log($locale);
		[data, loading, error, get] = fetchFacilitiesStore();
	}
	$: onLocaleChange($locale)

	const createFacilityGeoData = (fData) => {
		let contact = fData.contact;
		console.log(contact);
		let address = {
			latitude: 0,
			longitude: 0,
			zoom: 0
		};
		if (contact.addresses.length > 0) {
			address = contact.addresses[0];
		}
		console.log(address);
		let facilityGeoData = {
			name: fData?.name ?? 'default',
			latitude: Number(address?.latitude ?? 0),
			longitude: Number(address?.longitude ?? 0),
			zoom: address?.zoom ?? 0
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
		<FacilityList organizationData={$data} />
		{#each $data.facility as facility}
			{#if facility.contact}
				<div class="card">
					<!--img class="card-img-top" src="..." alt="Card image cap" /-->
					<div class="card-body">
						<div id="{facility.name}_anchor" />
						<h5 class="card-title">{facility.contact.formatted_name}</h5>
						<p class="card-text">
							<Address contactData={facility.contact} />
							<LeafletMap geoData={createFacilityGeoData(facility)} />
						</p>
					</div>
				</div>
			{/if}
		{/each}
	{/if}
</main>
