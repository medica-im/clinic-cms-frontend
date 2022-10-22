<script>
	import { facilityStore } from '$lib/store/facilityStore';
	import { filteredWorkforceDataCached, occupations } from '$lib/store/workforceStore';
	import Worker from '$lib/Workforce/Worker.svelte';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import Search from '$lib/Search.svelte';
	import SelectOccupations from '$lib/SelectOccupations.svelte';
	import { page } from '$app/stores';
    
	let promise;
	$: promise = facilityStore.load(), $language;

</script>

<svelte:head>
	{#await promise}
	<title>
		{capitalizeFirstLetter($page.data.facility.formatted_name, $language)} - {$LL.ADDRESSBOOK.TITLE()}
	</title>
	{:then}
	<title>
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {$LL.ADDRESSBOOK.TITLE()}
	</title>
	{/await}
</svelte:head>

<main>
	<div class="container my-2">
		{#await occupations.load()}
			<div class="spinner-border" role="status">
				<span class="visually-hidden">{$LL.LOADING()}</span>
			</div>
		{:then}
			<div class="row my-2">
				<div class="col">
					<SelectOccupations />
				</div>
			</div>
			<div class="row my-2">
				<div class="col">
					<Search />
				</div>
			</div>

			{#each $occupations as o}
				{#if $filteredWorkforceDataCached
					.map(function (currentElement) {
						return currentElement.occupations.flat();
					})
					.flat()
					.map((x) => x.name)
					.includes(o.name)}
					<div class="row my-2">
						<div class="col">
							<h3>{o.label}</h3>
							<div class="row row-cols-1 row-cols-lg-2 g-4">
								{#each $filteredWorkforceDataCached as worker}
									{#each worker.occupations as occupation}
										{#if occupation.name == o.name}
											<Worker workerData={worker} />
										{/if}
									{/each}
								{/each}
							</div>
						</div>
					</div>
				{/if}
			{/each}
		{/await}
	</div>
</main>
