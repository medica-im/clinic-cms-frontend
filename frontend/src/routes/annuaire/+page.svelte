<script lang="ts">
	import { facilityStore } from '$lib/store/facilityStore';
	import {
		filteredWorkforceDataCached,
		occupations,
		occupationsCardinal
	} from '$lib/store/workforceStore';
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

<div class="space-y-4">
	{#await occupationsCardinal.load()}
		{#each Object.keys(data.occupationsCardinal) as name}
			<section class="space-y-4">
				<h3>
					{data.occupationsCardinal[name]['count']['total']}
					{data.occupationsCardinal[name]['label']}
				</h3>
				<div class="grid grid-cols-2">
					{#each data.workforceDataCached as worker}
						{#each worker.occupations as occupation}
							{#if occupation.name == name}
								<Worker workerData={worker} currentOccupationName={name} />
							{/if}
						{/each}
					{/each}
				</div>
			</section>
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
				<section class="space-y-4">
					<h3>
						{$occupationsCardinal[name]['count']['total']}
						{$occupationsCardinal[name]['label']}
					</h3>
					<div class="grid lg:grid-cols-2">
						{#each $filteredWorkforceDataCached as worker}
							{#each worker.occupations as occupation}
								{#if occupation.name == name}
									<Worker workerData={worker} currentOccupationName={name} />
								{/if}
							{/each}
						{/each}
					</div>
				</section>
			{/if}
		{/each}
	{/await}
</div>
