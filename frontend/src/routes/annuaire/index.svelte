<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import {
		workforceData,
		filteredWorkforceDataCached,
		workforceDataCached,
		getWorkforceDataCached,
		occupations
	} from '$lib/store/workforceStore';
	import Search from '$lib/Search.svelte';
	import Occupations from '$lib/Occupations.svelte';
	import WorkerList from '$lib/Workforce/WorkerList.svelte';
	import type { Workforce } from '$lib/interfaces/workforce.interface';
	import { variables } from '$lib/utils/constants';
	import Select from 'svelte-select';
	import Actions from '@smui/card/src/Actions.svelte';
	import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
	import LL from '$i18n/i18n-svelte';
	let wfd = [];

	onMount(async () => {
		wfd = await getWorkforceDataCached();
	});

	console.log(workforceData);

	const groupBy = (item) => item.occupations[0].label;
	const optionIdentifier = 'slug';
	const labelIdentifier = 'formatted_name';
</script>

<svelte:head>
	<title>{$LL.ADDRESSBOOK.TITLE()}</title>
</svelte:head>

<main>
	<Occupations />
	<!--Select {optionIdentifier} {labelIdentifier} items={$workforceData} {groupBy}
  ></Select-->
	<Search />
	{#each $occupations as o}
		{#if $filteredWorkforceDataCached
			.map(function (currentElement) {
				return currentElement.occupations.flat();
			})
			.flat()
			.map((x) => x.name)
			.includes(o.name)}
			<h3>{o.label}</h3>
			<ul>
				{#each $filteredWorkforceDataCached as worker}
					{#each worker.occupations as occupation}
						{#if occupation.name == o.name}
							<li>
								<WorkerList workerData={worker} />
							</li>
						{/if}
					{/each}
				{/each}
			</ul>
		{/if}
	{/each}
</main>
