<script>
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import { userData } from '$lib/store/userStore';
	import { facilityStore } from '$lib/store/facilityStore';
	import { fly } from 'svelte/transition';
	import Welcome from '$lib/components/Welcome/Welcome.svelte';
	import Team from '$lib/components/Team/Team.svelte';
	import LL from '$i18n/i18n-svelte';
	import Ghost2 from '$lib/Ghost/Ghost2.svelte';
	import OpenGraph from '$lib/components/OpenGraph/OpenGraph.svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { onMount } from 'svelte';
	/** @type {import('./$types').PageData} */
	export let data;

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

	{#await facilityStore.load()}
		<Welcome formattedNameDefiniteArticle={data.facility.formatted_name_definite_article} />
		<section class="space-y-4">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Team facility={data.facility} />
			</div>
		</section>
	{:then}
		<Welcome formattedNameDefiniteArticle={$facilityStore.formatted_name_definite_article} />
		<section class="space-y-4">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Team facility={$facilityStore} />
			</div>
		</section>
	{/await}
	<section class="space-y-4">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<Ghost2 data={data.posts} />
		</div>
	</section>
