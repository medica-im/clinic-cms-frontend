<script>
	import FacilityList from '../../components/FacilityList.svelte';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import { page } from '$app/stores';
	import FacilityCard from '$components/Facility/FacilityCard.svelte';
</script>

<svelte:head>
	<title>
		{$LL.SITES.TITLE()} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>
<div>
	<!-- programs -->
	<section id="programs" class="bg-surface-100-800-token programs-gradient">
		<div class="section-container">
			<nav class="top-0 p-2 m-2">
				<FacilityList organizationData={$facilityStore} />
			</nav>
			<div>
				{#each $facilityStore.facility as facility}
					{#if facility.contact}
						<FacilityCard {facility} />
					{/if}
				{/each}
			</div>
			<!--{/await}-->
		</div>
	</section>
</div>

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
