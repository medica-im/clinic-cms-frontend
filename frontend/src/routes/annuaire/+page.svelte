<script lang='ts'>
	import { facilityStore } from '$lib/store/facilityStore';
	import { filteredWorkforceDataCached, occupations, occupationsCardinal} from '$lib/store/workforceStore';
	import Worker from '$lib/Workforce/Worker.svelte';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import Search from '$lib/Search.svelte';
	import SelectOccupations from '$lib/Workforce/SelectOccupations.svelte';
	import SelectFacilities from '$lib/Workforce/SelectFacilities.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	let promise;
	$: (promise = facilityStore.load()), $language;
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
		{#await occupationsCardinal.load()}
			{#each Object.keys(data.occupationsCardinal) as name}
				<div class="row my-2">
					<div class="col">
						<h3>
							{data.occupationsCardinal[name]['count']['total']}
							{data.occupationsCardinal[name]['label']}
						</h3>
						<div class="row row-cols-1 row-cols-lg-2 g-4">
							{#each data.workforceDataCached as worker}
								{#each worker.occupations as occupation}
									{#if occupation.name == name}
										<Worker workerData={worker} currentOccupationName={name} />
									{/if}
								{/each}
							{/each}
						</div>
					</div>
				</div>
			{/each}
		{:then}
			<div class="row my-2">
				<div class="col">
					<SelectOccupations />
				</div>
			</div>
			<div class="row my-2">
				<div class="col">
					<SelectFacilities />
				</div>
			</div>
			<div class="row my-2">
				<div class="col">
					<Search />
				</div>
			</div>

			{#each Object.keys($occupationsCardinal) as name}
				{#if $filteredWorkforceDataCached
					.map(function (currentElement) {
						return currentElement.occupations.flat();
					})
					.flat()
					.map((x) => x.name)
					.includes(name)}
					<div class="row mb-4">
						<div class="col">
							<h3>
								{$occupationsCardinal[name]['count']['total']}
							    {$occupationsCardinal[name]['label']}
						    </h3>
							<div class="row row-cols-1 row-cols-lg-2 g-4">
								{#each $filteredWorkforceDataCached as worker}
									{#each worker.occupations as occupation}
										{#if occupation.name == name}
											<Worker workerData={worker} currentOccupationName={name} />
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
