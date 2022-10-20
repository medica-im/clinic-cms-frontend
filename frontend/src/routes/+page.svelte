<script>
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import { userData } from '$lib/store/userStore';
	import { facilityStore } from '$lib/store/facilityStore';
	import { fly } from 'svelte/transition';
	import Occupations from '$lib/Organization/Occupations.svelte';
	import Welcome from '$lib/components/Welcome/Welcome.svelte';
	import Team from '$lib/components/Team/Team.svelte';
	import LL from '$i18n/i18n-svelte';
	import Ghost from '$lib/Ghost/Ghost.svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';

	/** @type {import('./$types').PageData} */
	export let data;

	const queryClient = new QueryClient();
</script>

<svelte:head>
	{#await facilityStore.load()}
	<title>
		{capitalizeFirstLetter(data.facilityStore.formatted_name, $language)} - {$LL.HOME.TITLE()}
	</title>
	{:then}
		<title>
			{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {$LL.HOME.TITLE()}
		</title>
	{/await}
</svelte:head>

{#await facilityStore.load()}
<div class="container">
	<div class="row">
		<Welcome formattedNameDefiniteArticle={data.facilityStore.formatted_name_definite_article} />
	</div>
	<div class="row">
		<div class="col-md">
			<Team />
		</div>
		<div class="col-md">
			<QueryClientProvider client={queryClient}>
				<Ghost />
			</QueryClientProvider>
		</div>
	</div>
</div>
{:then}
	<!--section in:fly={{ y: -100, duration: 250, delay: 250 }} out:fly={{ duration: 250 }}-->
		<div class="container">
			<div class="row">
				<Welcome formattedNameDefiniteArticle={$facilityStore.formatted_name_definite_article} />
			</div>
			<div class="row">
				<div class="col-md">
					<Team />
				</div>
				<div class="col-md">
					<QueryClientProvider client={queryClient}>
						<Ghost />
					</QueryClientProvider>
				</div>
			</div>
		</div>
	<!--/section-->
{/await}
