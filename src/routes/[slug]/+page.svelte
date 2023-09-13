<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
	import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
	import LL from '$i18n/i18n-svelte';
	import { facilityStore } from '$lib/store/facilityStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';

	/** @type {import('./$types').PageData} */
	export let data;
	import WorkerPage from '$lib/Workforce/WorkerPage.svelte';
	import { workerData, workerSlug } from '$lib/store/workforceStore';

	$: workerSlug.set(data.slug);
</script>

<svelte:head>
	<title>
		{$workerData} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>

<div>
	<!-- programs -->
	<section id="programs" class="bg-surface-100-800-token programs-gradient">
		<div class="section-container">
			
<a href="/annuaire" class="btn bg-primary-500" data-sveltekit-preload-data="hover">
	<span data-nosnippet><Fa icon={faCircleArrowLeft} /></span>
	<span data-nosnippet><Fa icon={faAddressBook} /></span><span>{$LL.ADDRESSBOOK.GOTOADDRESSBOOK()}</span>
</a>
<WorkerPage workerData={data.workerData} />

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