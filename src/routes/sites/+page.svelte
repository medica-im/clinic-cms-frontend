<script lang="ts">
	import { facilityStore } from '$lib/store/facilityStore';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import { page } from '$app/stores';
	import FacilityCard from '$components/Facility/FacilityCard.svelte';

	export let data;
	function filterFacilities(facilities) {
		const f = facilities.filter((facility) =>
			facility.organizations.includes(data.organization.uid)
		);
		return f;
	}
	const facilities = filterFacilities(data.facilities);

	const getHeader = () => {
        return (facilities.length < 2) ? "Notre établissement" : `Nos ${facilities.length} établissements`
	}
	const getTitle = () => {
        return facilities.length ? 'Établissement' : 'Établissements'
	}
</script>

<svelte:head>
	<title>
		{getTitle()} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>
<header id="hero" class="bg-surface-100-800-token hero-gradient">
	<div class="section-container">
		<h2 class="h2">
			{getHeader()}
		</h2>
	</div>
</header>

<div>
	<!-- programs -->
	<section id="programs" class="bg-surface-100-800-token programs-gradient">
		<div class="section-container">
			<!--nav class="top-0 p-2 m-2">
				<FacilityList data={data.facilities}/>
			</nav-->
			<div class="grid lg:grid-cols-2 gap-4">
				{#each facilities as facility}
					<FacilityCard data={facility} />
				{/each}
			</div>
			<!--{/await}-->
		</div>
	</section>
</div>

<!--{JSON.stringify($facilities)}-->
<style lang="postcss">
	.section-container {
		@apply mx-auto w-full max-w-7xl p-4 py-8 md:py-12;
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
