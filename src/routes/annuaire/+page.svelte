<script lang="ts">
	import { variables } from '$lib/utils/constants';
	import { facilityStore } from '$lib/store/facilityStore';
	import {
		filteredWorkforceDataCached,
		occupations,
		selectOccupations,
		occupationsCardinal,
		filteredOccupationsCardinal
	} from '$lib/store/workforceStore';
	import { selectFacilities } from '$lib/store/selectionStore';
	import Worker from '$lib/Workforce/Worker.svelte';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import Search from '$lib/Search.svelte';
	import SelectOccupations from '$lib/Workforce/SelectOccupations.svelte';
	import SelectFacilities from '$lib/Workforce/SelectFacilities.svelte';
	import type { PageData } from './$types';
	import Directory from '$components/Directory/Directory.svelte'

	export let data: PageData;
</script>

<svelte:head>
		<title>
			{$LL.ADDRESSBOOK.TITLE()} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
		</title>
</svelte:head>

<Directory effectorsLoad={data.effectors} />

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-8 md:py-12;
	}
	/* Hero Gradient */
	/* prettier-ignore */
	.hero-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}
	/* Team Gradient */
	/* prettier-ignore */
	.team-gradient {
		background-image:
			radial-gradient(at 0% 100%, rgba(var(--color-secondary-500) / 0.50) 0px, transparent 50%);
	}
	/* Tailwind Gradient */
	/* prettier-ignore */
	.tailwind-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.50) 0px, transparent 50%),
			radial-gradient(at 100% 100%,  rgba(var(--color-primary-500) / 0.24) 0px, transparent 50%);
	}
	/* Programs Gradient */
	/* prettier-ignore */
	.programs-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%),
			radial-gradient(at 100% 0%,  rgba(var(--color-primary-500) / 0.33) 0px, transparent 50%);
	}
</style>
