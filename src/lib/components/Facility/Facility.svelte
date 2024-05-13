<script lang="ts">
	import LL from '$i18n/i18n-svelte.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { language } from '$lib/store/languageStore.ts';
	import Fa from 'svelte-fa';
	import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
	import FacilityCarousel from '$components/Carousel/FacilityCarousel.svelte';
	import { resetDirectory } from '$components/Directory/utils.ts';
	import Map from '$lib/components/Map/Map.svelte';
	import { createFacilitiesMapData } from '$lib/components/Map/mapData.ts';
	import { fade, scale } from 'svelte/transition';
	export let data: any;

	function filterFacilities(facilities) {
		const f = facilities.filter((facility) =>
			facility.organizations.includes(data.organization.uid)
		);
		return f;
	}

	const facilities = filterFacilities(data.facilities);
	const carouselFacilities = filterFacilities(data.carousel);

	function title() {
		const title = data?.facilities?.length > 1 ? $LL.SITES.PLURAL() : $LL.SITES.SINGULAR();
		return title;
	}
	function compareFn(a, b) {
		return b.effectors.length - a.effectors.length;
	}
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
	<div class="space-y-4 text-center">
		<h2 class="h2">{title()}</h2>
		{#each facilities.sort(compareFn) as facility}
			<div>
				<a href="/sites/{facility.slug}" class="btn variant-ghost-primary w-fit">{facility.name}</a>
			</div>
		{/each}
	</div>
	<div in:scale class="h-64">
		<Map data={createFacilitiesMapData(facilities, true)} />
	</div>
	{#if carouselFacilities.length}
		<div class="place-items-center items-center justify-center content-center">
			<FacilityCarousel data={carouselFacilities} />
		</div>
	{/if}
</div>
