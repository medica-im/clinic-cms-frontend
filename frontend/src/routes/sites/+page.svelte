<script>
	import FacilityList from '../../components/FacilityList.svelte';
	import { facilityStore } from '$lib/store/facilityStore';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import { page } from '$app/stores';
	import FacilityCard from '$components/Facility/FacilityCard.svelte';

	let promise;
	$: (promise = facilityStore.load()), $language;
</script>

<svelte:head>
	<!--{#await promise}
		<title>
			{capitalizeFirstLetter(data.facilityData.formatted_name, $language)} - {$LL.SITES.TITLE()}
		</title>
	{:then}-->
	<title>
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {$LL.SITES.TITLE()}
	</title>
	<!--{/await}-->
</svelte:head>
<!--
{#await facilityStore.load()}
	<FacilityList organizationData={data.facilityData} />
	{#each data.facilityData.facility as facility}
		{#if facility.contact}
			<FacilityCard {facility} />
		{/if}
	{/each}
{:then}-->
<div>
<nav class="lg:sticky z-auto top-0 p-2 m-2 variant-filled-surface">
	<FacilityList organizationData={$facilityStore} />
</nav>
<div class="z-auto">
	{#each $facilityStore.facility as facility}
		{#if facility.contact}
			<FacilityCard {facility} />
		{/if}
	{/each}
</div>
<!--{/await}-->
</div>
