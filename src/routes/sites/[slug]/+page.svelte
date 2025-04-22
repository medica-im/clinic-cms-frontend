<script lang="ts">
	import { language } from '$lib/store/languageStore.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import FacilityPage from '$lib/Facility/FacilityPage.svelte';
	import SitesLink from '$lib/components/Sites/SitesLink.svelte';
	import { userData } from '$lib/store/userStore.ts';
	import { page } from '$app/state';

	export let data;
</script>

<svelte:head>
	<title>
		{data.facility.name} - {capitalizeFirstLetter(page.data.organization.formatted_name, $language)}
	</title>
</svelte:head>


<header id="hero" class="bg-surface-100-800-token hero-gradient">
    <div class="mx-0 flex flex-col items-center justify-center p-4 py-6">
    <h2 class="h2">{data.facility.name}</h2>
</div>
</header>

<div class="mx-0 flex flex-col items-center justify-center p-4 py-6">
<div class="grid grid-cols-1 gap-4">
	<div>
		<FacilityPage facility={data.facility} userData={$userData} entries={data.entries} />
	</div>
	<div>
		<SitesLink />
	</div>
	<!--{JSON.stringify(data.facility)}-->
</div>
</div>
<style lang="postcss">
	.section-container {
		@apply p-4 py-8;
	}
    /* Hero Gradient */
	/* prettier-ignore */
	.hero-gradient {
		background-image:
			radial-gradient(at 0% 0%, rgba(var(--color-secondary-500) / 0.33) 0px, transparent 50%),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}
</style>
