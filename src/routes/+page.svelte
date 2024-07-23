<script lang="ts">
	import { variables } from '$lib/utils/constants';
	import { facilityStore } from '$lib/store/facilityStore';
	import Welcome from '$lib/components/Welcome/Welcome.svelte';
	import Team from '$lib/components/Team/Team.svelte';
	import FacilityCarousel from '$components/Carousel/FacilityCarousel.svelte';
	import LL from '$i18n/i18n-svelte';
	import Ghost from '$lib/Ghost/Ghost.svelte';
	import OpenGraph from '$lib/components/OpenGraph/OpenGraph.svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import OutpatientClinicPrograms from '$components/OutpatientClinicPrograms/OutpatientClinicPrograms.svelte';
	import type { PageData } from './$types';
	import LDTag from '$components/Schema/LDTag.svelte';
	import Facility from '$lib/components/Facility/Facility.svelte';

	export let data: PageData;
</script>

<LDTag schema={data?.websiteSchema} />
<svelte:head>
	{#if data?.openGraph}
		<OpenGraph opengraph={data.openGraph} />
	{/if}

	<title>
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>

<!-- hero -->
<header id="hero" class="bg-surface-100-800-token hero-gradient">
	<div class="mx-0 flex flex-col items-center justify-center p-4 py-6 space-y-2">
		<div class="">
			<Welcome formattedNameDefiniteArticle={$facilityStore.formatted_name_definite_article} />
		</div>
		<div class="">
			La <a href="/maison-de-sante/a-propos" class="anchor">maison de santé pluriprofessionnelle</a>
			du quartier Saint-Esprit, à Bayonne.
		</div>
	</div>
</header>
<!-- team -->
<section id="team" class="bg-surface-100-800-token team-gradient">
	<div class="section-container">
		<Team
			data={{
				cardinalTypes: data.cardinalTypes,
				teamCarousel: data.teamCarousel
			}}
		/>
	</div>
</section>
<!-- Facility -->
<section id="team" class="bg-surface-100-800-token facility-gradient">
	<div class="section-container">
		<Facility data={{ facilities: data.facilities, carousel: data.facilityCarousel, organization: data.organization }} />
	</div>
</section>
{#await data.ghost then ghost}
	<!-- blog -->
	<section id="blog" class="bg-surface-100-800-token blog-gradient">
		<div class="section-container"><Ghost data={ghost} /></div>
	</section>
{/await}
<!-- programs -->
{#if variables.ORGANIZATION_CATEGORY == 'msp'}
	<section id="programs" class="bg-surface-100-800-token programs-gradient">
		<div class="section-container"><OutpatientClinicPrograms /></div>
	</section>
{/if}

<style lang="postcss">
	.section-container {
		@apply mx-auto flex w-full max-w-7xl items-center justify-center p-4 py-8;
	}
	/* Hero Gradient */
	/* prettier-ignore */
	.hero-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}
	/* SvelteKit Gradient */
	/* prettier-ignore */
	.team-gradient {
		background-image:
			radial-gradient(at 0% 100%, rgba(var(--color-secondary-500) / 0.50) 0px, transparent 50%);
	}
	/* Sponsors Gradient */
	/* prettier-ignore */
	.facility-gradient {
		background-image:
		radial-gradient(at 0% 99%, rgba(var(--color-error-500) / 0.23) 0px, transparent 50%),
		radial-gradient(at 100% 100%, rgba(var(--color-primary-500) / 0.19) 0px, transparent 50%);
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
