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

	function title() {
		const title = data?.facilities?.length > 1 ? $LL.SITES.PLURAL() : $LL.SITES.SINGULAR();
		return title;
	}
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
	<div class="space-y-4 text-center">
		<h2 class="h2">{title()}</h2>
		{#each data.facilities as facility}
			<div>
				<a href="/sites/{facility.slug}" class="btn variant-ghost-primary w-fit">{facility.name}</a>
			</div>
		{/each}
	</div>
	<div in:scale class="h-64">
		<Map data={createFacilitiesMapData(data.facilities, true)} />
	</div>
	{#if data.carousel.length}
		<div class="place-items-center items-center justify-center content-center">
			<FacilityCarousel data={data.carousel} />
		</div>
	{/if}
</div>
