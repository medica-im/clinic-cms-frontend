<script>
import FacilityList from '../../components/FacilityList.svelte';
import LeafletMap from './map/LeafletMap.svelte';
import Address from '$lib/Address/Address.svelte';
import { facilityStore } from '$lib/store/facilityStore';
import LL from '$i18n/i18n-svelte';
import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
import { language } from '$lib/store/languageStore';

const promise = facilityStore.load();

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
	<div class="spinner-border" role="status">
		<span class="visually-hidden">{$LL.LOADING()}</span>
	</div>
	<title/>
	{:then}
		<title>
			{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {$LL.CONTACT.TITLE()}
		</title>
	{/await}
</svelte:head>

<main>
	{#await facilityStore.load()}
	<div class="spinner-border" role="status">
		<span class="visually-hidden">{$LL.LOADING()}</span>
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
						</p>
					</div>
				</div>
			{/if}
		{/each}
	{/await}
</main>
