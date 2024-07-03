<script lang="ts">
	import { variables } from '$lib/utils/constants';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import { fly } from 'svelte/transition';
	import Welcome from '$lib/components/Welcome/Welcome.svelte';
	import Team from '$lib/components/Team/Team.svelte';
	import LL from '$i18n/i18n-svelte';
	import Ghost from '$lib/Ghost/Ghost.svelte';
	import OpenGraph from '$lib/components/OpenGraph/OpenGraph.svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import {
		occupationsCardinal,
		selectOccupations,
		term,
		workforceOccupation
	} from '$lib/store/workforceStore';
	import { selectFacilities } from '$lib/store/selectionStore';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import OutpatientClinicPrograms from '$components/OutpatientClinicPrograms/OutpatientClinicPrograms.svelte';
	import type { PageData } from './$types';
	import LDTag from '$components/Schema/LDTag.svelte';
	import Directory2 from '$components/Directory/Directory2.svelte';

	export let data: PageData;

  let yScroll = 0

	onMount(() => {
		const interval = setInterval(() => {
			invalidateAll();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
		selectOccupations.set([]);
		selectFacilities.set([]);
		term.set('');
	});
</script>

<LDTag schema={data.websiteSchema} />
<svelte:head>
	{#if data.openGraph}
		<OpenGraph opengraph={data.openGraph} />
	{/if}

	<title>
		Annuaire - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>
<div>
	<!-- hero -->
	<header id="hero" class="bg-surface-100-800-token hero-gradient">
		<div class="section-container">
			<Welcome formattedNameDefiniteArticle={$facilityStore.formatted_name_definite_article} />
		</div>
	</header>
	<div>
		<Directory2 />
	</div>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-8 md:py-10;
	}
	/* Hero Gradient */
	/* prettier-ignore */
	.hero-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}
	/* Blog Gradient */
	/* prettier-ignore */
	.blog-gradient {
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
