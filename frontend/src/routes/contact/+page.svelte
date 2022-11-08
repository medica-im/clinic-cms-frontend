<script>
import FacilityList from '../../components/FacilityList.svelte';
import LeafletMap from './map/LeafletMap.svelte';
import Address from '$lib/Address/Address.svelte';
import { facilityStore } from '$lib/store/facilityStore';
import LL from '$i18n/i18n-svelte';
import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
import { language } from '$lib/store/languageStore';
import { page } from '$app/stores';

export let data;

let promise;
$: promise = facilityStore.load(), $language;

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

<svelte:head>
	{#await promise}
	<title>
		{capitalizeFirstLetter(data.facilityData.formatted_name, $language)} - {$LL.CONTACT.TITLE()}
	</title>
	{:then}
		<title>
			{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {$LL.CONTACT.TITLE()}
		</title>
	{/await}
</svelte:head>

<main>
	{#await facilityStore.load()}
	<FacilityList organizationData={data.facilityData} />
	{#each data.facilityData.facility as facility}
		{#if facility.contact}
			<div class="card">
				<!--img class="card-img-top" src="..." alt="Card image cap" /-->
				<div class="card-body">
					<h5 id="{facility.name}_anchor" class="card-title">{facility.contact.formatted_name}</h5>
					<p class="card-text">
						<Address contactData={facility.contact} />
						<LeafletMap geoData={createFacilityGeoData(facility)} />
					</p>
				</div>
			</div>
		{/if}
	{/each}
	{:then}
		<FacilityList organizationData={$facilityStore} />
		{#each $facilityStore.facility as facility}
			{#if facility.contact}
				<div class="card">
					<!--img class="card-img-top" src="..." alt="Card image cap" /-->
					<div class="card-body">
						<h5 id="{facility.name}_anchor" class="card-title">{facility.contact.formatted_name}</h5>
						<p class="card-text">
							<Address contactData={facility.contact} />
							<LeafletMap geoData={createFacilityGeoData(facility)} />
						</p>
					</div>
				</div>
			{/if}
		{/each}
	{/await}
</main>
