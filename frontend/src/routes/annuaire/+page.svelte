<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import { filteredWorkforceDataCached, occupations } from '$lib/store/workforceStore';
	import Search from '$lib/Search.svelte';
	import SelectOccupations from '$lib/SelectOccupations.svelte';
	import Worker from '$lib/Workforce/Worker.svelte';
	import type { Workforce } from '$lib/interfaces/workforce.interface';
	import { variables } from '$lib/utils/constants';
	import Select from 'svelte-select';
	import Actions from '@smui/card/src/Actions.svelte';
	import { handleRequestsWithPermissions } from '$lib/utils/requestUtils';
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { locale } from '$i18n/i18n-svelte';
	import CircularProgress from '@smui/circular-progress';

	const optionIdentifier = 'slug';
	const labelIdentifier = 'formatted_name';
</script>

<svelte:head>
	<title>{$LL.ADDRESSBOOK.TITLE()}</title>
</svelte:head>

<main>
	<div class="container my-2">
		{#await occupations.load()}
			<div style="display: flex; justify-content: center">
				<CircularProgress style="height: 32px; width: 32px;" indeterminate />
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
