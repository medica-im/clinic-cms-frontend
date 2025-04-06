<script lang="ts">
	import FacilityCarousel from '$lib/Facility/FacilityCarousel.svelte';
	import MapLeaflet from '$lib/MapLeaflet/MapLeaflet.svelte';
	import { createFacilitiesMapData } from '$lib/MapLeaflet/mapData.js';
	import { scale } from 'svelte/transition';
	import type { Facility } from '$lib/interfaces/facility.interface.js';

	export let data: any;

	function filterFacilities(facilities: Facility[]) {
		const f = facilities.filter((facility) =>
			facility.organizations.includes(data.organization.uid)
		);
		return f;
	}

	const facilities = filterFacilities(data.facilities);
	const carouselFacilities = filterFacilities(data.carousel);

	function title() {
		const title = data?.facilities?.length > 1 ? 'Sites' : 'Site';
		return title;
	}
	function compareFn(a: Facility, b:Facility) {
		return b.effectors.length - a.effectors.length;
	}
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
	<div class="space-y-4 text-center">
		<h2 class="h2">{title()}</h2>
		{#each facilities.sort(compareFn) as facility}
			<div>
				<a
					href="/sites/{facility.slug}"
					title={facility.name}
					class="btn variant-ghost-primary w-fit">{facility.label || facility.name}</a
				>
			</div>
		{/each}
	</div>
	<div in:scale class="h-64 z-0">
		<MapLeaflet data={createFacilitiesMapData(facilities, true)} />
	</div>
	{#if carouselFacilities.length}
		<div class="place-items-center items-center justify-center content-center">
			<FacilityCarousel data={carouselFacilities} />
		</div>
	{/if}
</div>
