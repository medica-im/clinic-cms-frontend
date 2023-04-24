<script>
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import { userData } from '$lib/store/userStore';
	import { facilityStore } from '$lib/store/facilityStore';
	import { fly } from 'svelte/transition';
	import Welcome from '$lib/components/Welcome/Welcome.svelte';
	import Team from '$lib/components/Team/Team.svelte';
	import LL from '$i18n/i18n-svelte';
	import Ghost from '$lib/Ghost/Ghost2.svelte';
	import OpenGraph from '$lib/components/OpenGraph/OpenGraph.svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import {
		occupationsCardinal,
		selectOccupations,
		term,
		workforceOccupation
	} from '$lib/store/workforceStore';
	import { selectFacilities } from '$lib/store/facilityStore';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	/** @type {import('./$types').PageData} */
	export let data;

	onMount(() => {
		selectOccupations.set([]);
		selectFacilities.set([]);
		term.set('');
	});

	const queryClient = new QueryClient();
	let promise;
	$: (promise = facilityStore.load()), $language;
</script>

<svelte:head>
	<OpenGraph opengraph={data.openGraph} />
	{#await promise}
		<title>
			{capitalizeFirstLetter(data.facility.formatted_name, $language)} - {$LL.HOME.TITLE()}
		</title>
	{:then}
		<title>
			{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {$LL.HOME.TITLE()}
		</title>
	{/await}
</svelte:head>

<div>
	<!-- hero -->
	<header id="hero" class="bg-surface-100-800-token hero-gradient">
		<div class="section-container">
			<Welcome formattedNameDefiniteArticle={$facilityStore.formatted_name_definite_article} />
		</div>
	</header>

	<!--div class="grid md:grid-cols-2 gap-4"-->
	<!--/div-->

	<!-- sveltekit -->
	<section id="sveltekit" class="bg-surface-100-800-token sveltekit-gradient">
		<div class="section-container"><Team
			data={{
				facility: $facilityStore,
				cO: data.occupationsCardinal,
				sO: $selectOccupations,
				term: $term,
				wO: data.workforceOccupation
			}}
		/></div>
	</section>

	<!-- tailwind -->
	<section id="tailwind" class="bg-surface-100-800-token tailwind-gradient">
		<div class="section-container"><Ghost data={data.posts} /></div>
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
	/* SvelteKit Gradient */
	/* prettier-ignore */
	.sveltekit-gradient {
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
</style>
