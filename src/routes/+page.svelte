<script lang="ts">
	import { variables } from '$lib/utils/constants';
	import { organizationStore } from '$lib/store/facilityStore';
	import { Welcome } from '$lib';
    import { Team } from '$lib';
	import { Ghost } from '$lib';
	import SignupForm from '$lib/Ghost/SignupForm.svelte';
	import OpenGraph from '$lib/components/OpenGraph/OpenGraph.svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import OutpatientClinicPrograms from '$lib/OutpatientClinicPrograms/OutpatientClinicPrograms.svelte';
	import { programsNavLinks } from '$var/variables.ts';
	import type { PageData } from './$types';
	import LDTag from '$lib/Schema/LDTag.svelte';
	import { Facility } from '$lib';

    let { data, form } = $props();
</script>

<!--LDTag schema={data?.websiteSchema} /-->
<svelte:head>
	{#if data?.openGraph}
		<OpenGraph opengraph={data.openGraph} />
	{/if}

	<title>
		{capitalizeFirstLetter($organizationStore.formatted_name, $language)}
	</title>
</svelte:head>

<!-- hero -->
<header id="hero" class="bg-surface-100-800-token hero-gradient">
	<div class="mx-0 flex flex-col items-center justify-center p-4 py-6 space-y-2">
		<div class="">
			<Welcome formattedNameDefiniteArticle={$organizationStore.formatted_name_definite_article} />
		</div>
		<div class="">
			Votre <a href="/maison-de-sante/a-propos" class="anchor">maison de santé pluriprofessionnelle</a> à Châteauneuf-de-Gadagne.
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
	<!-- blog -->
	<section id="blog" class="bg-surface-100-800-token blog-gradient">
		<div class="section-container">
			<div class=" grid grid-cols-1 gap-6 place-items-center">
			    <Ghost data={data.ghost} ghost={data.ghostSite} />
			    <SignupForm data={data.ghostSite}/>
		    </div>
		</div>
	</section>
<!-- programs -->
{#if variables.ORGANIZATION_CATEGORY == 'msp'}
	<section id="programs" class="bg-surface-100-800-token programs-gradient">
		<div class="section-container"><OutpatientClinicPrograms {programsNavLinks} /></div>
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
			radial-gradient(at 98% 1%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%);
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
		radial-gradient(at 0% 99%, rgba(var(--color-secondary-500) / 0.23) 0px, transparent 50%),
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
