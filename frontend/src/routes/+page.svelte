<script>
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import { userData } from '$lib/store/userStore';
	import { facilityStore } from '$lib/store/facilityStore';
	import { fly } from 'svelte/transition';
	import Occupations from '$lib/Organization/Occupations.svelte';
	import LL from '$i18n/i18n-svelte';
	import Ghost from '$lib/Ghost/Ghost.svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';

	const queryClient = new QueryClient();
</script>

<svelte:head>
	{#await facilityStore.load()}
		<title />
	{:then}
	    <meta name="google-site-verification" content="{$facilityStore.google_site_verification}">
		<title>
			{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {$LL.HOME.TITLE()}
		</title>
	{/await}
</svelte:head>

{#await facilityStore.load()}
<div class="spinner-border" role="status">
	<span class="visually-hidden">{$LL.LOADING()}</span>
</div>
{:then}
	<section in:fly={{ y: -100, duration: 500, delay: 500 }} out:fly={{ duration: 500 }}>
		<div class="container">
			<div class="row">
				<div class="col-md">
					<h2>
						{$LL.HOME.WELCOME()}
						{$facilityStore.formatted_name_definite_article}
						{#if $userData && $userData.username}
							<span style="text-transform: capitalize;">{$userData.username}</span>{/if}
						!
					</h2>
					<br />
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">{$LL.HOME.TEAM.TITLE()}</h5>
							<p class="card-text">
								{$LL.HOME.TEAM.TEXT()}
							</p>
						</div>
						<Occupations />
						<div class="card-body">
							<a href="/annuaire" class="btn btn-light">{$LL.ADDRESSBOOK.TITLE()}</a>
						</div>
					</div>
				</div>
				<div class="col-md">
					<QueryClientProvider client={queryClient}>
						<Ghost />
					</QueryClientProvider>
				</div>
			</div>
		</div>
	</section>
{/await}
