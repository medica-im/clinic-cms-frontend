<script lang="ts">
	import { page } from '$app/stores';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import Welcome from '$lib/components/Welcome/Welcome.svelte';
	import Team from '$lib/components/Team/Team.svelte';
	//import Ghost from '$lib/Ghost/Ghost.svelte';
	import { Ghost } from 'clinic-cms';
	import OpenGraph from '$lib/components/OpenGraph/OpenGraph.svelte';
	import { language } from '$lib/store/languageStore.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { occupationsCardinal, selectOccupations, term } from '$lib/store/workforceStore.ts';
	import { selectFacilities } from '$lib/store/selectionStore.ts';
	import { onMount } from 'svelte';
	import OutpatientClinicPrograms from '$components/OutpatientClinicPrograms/OutpatientClinicPrograms.svelte';
	import LDTag from '$components/Schema/LDTag.svelte';
	import Alert from './(programs)/education-therapeutique/ecole-du-dos/Alert.svelte';
    import AlertCanicule from './(programs)/prevention/canicule/Alert.svelte';
	import { browser } from '$app/environment';

	export let data;

	onMount(() => {
		selectOccupations.set([]);
		selectFacilities.set([]);
		term.set('');
	});
</script>

<LDTag schema={data.websiteSchema} />
<svelte:head>
	{#if data.openGraph}
		<OpenGraph defaultOpenGraph={data.openGraph} url={$page.url.href} />
	{/if}
	<title>
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>

<div>
	<!-- hero -->
	<header id="hero" class="bg-surface-100-800-token hero-gradient">
		<div class="section-container">
			<div class="grid grid-cols-1 place-items-center">
			<div>
				<Welcome formattedNameDefiniteArticle={$facilityStore.formatted_name_definite_article} />
			</div>
			<div class="md:w-2/3 mx-auto">
				<Alert />
			</div>
			<div class="md:w-2/3 mx-auto">
				{#if browser}
				<AlertCanicule />
				{/if}
			</div>
		</div>
	</header>
	<!-- team -->
	<section id="team" class="bg-surface-100-800-token team-gradient">
		<div class="section-container">
			<Team
				data={{
					facility: $facilityStore,
					cO: $occupationsCardinal,
					sO: $selectOccupations,
					term: $term,
					wO: data.workforceOccupation,
					teamCarousel: data.teamCarousel
				}}
			/>
		</div>
	</section>
	{#await data.ghost then ghost}
		<!-- blog -->
		<section id="blog" class="bg-surface-100-800-token blog-gradient">
			<div class="section-container"><Ghost data={ghost} /></div>
		</section>
	{/await}
	<!-- programs -->
	<section id="programs" class="bg-surface-100-800-token programs-gradient">
		<div class="section-container"><OutpatientClinicPrograms /></div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto px-4 py-6 lg:py-8;
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
