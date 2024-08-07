<script lang="ts">
	import { facilityStore } from '$lib/store/facilityStore';
	import {
		filteredWorkforceDataCached,
		filteredOccupationsCardinal,
		occupationsCardinal,
		selectOccupations
} from '$lib/store/workforceStore';
	import Worker from '$lib/Workforce/Worker.svelte';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import Search from '$lib/Search.svelte';
	import SelectOccupations from '$lib/Workforce/SelectOccupations.svelte';
	import SelectFacilities from '$lib/Workforce/SelectFacilities.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter(data.selectedOccupationsCardinal[data.key]['label'])} - {capitalizeFirstLetter($facilityStore.formatted_name, $locale)}
	</title>
</svelte:head>

<div>
	<!-- programs -->
	<section id="programs" class="bg-surface-100-800-token programs-gradient">
		<div class="section-container">
			{#await filteredOccupationsCardinal.load()}
				<div class="space-y-2">
					<div class="row">
						<div class="col">
							<SelectOccupations />
						</div>
					</div>
					<div class="row">
						<div class="col">
							<SelectFacilities />
						</div>
					</div>
					<div class="row">
						<div class="col">
							<Search />
						</div>
					</div>
				</div>
				<div class="my-4">
					{#each Object.keys(data.selectedOccupationsCardinal) as name}
						<section class="space-y-4 my-4">
							<h3 class="h3">
								{data.selectedOccupationsCardinal[name]['count']['total']}
								{data.selectedOccupationsCardinal[name]['label']}
							</h3>
							<div class="grid lg:grid-cols-2">
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
				</div>
			{:then}
				<div class="space-y-2">
					<div class="row">
						<div class="col">
							<SelectOccupations />
						</div>
					</div>
					<div class="row">
						<div class="col">
							{#key $selectOccupations}
							<SelectFacilities />
							{/key}
						</div>
					</div>
					<div class="row">
						<div class="col">
							<Search />
						</div>
					</div>
				</div>
				<div class="my-4">
					{#each Object.keys($filteredOccupationsCardinal) as name}
						{#if $filteredWorkforceDataCached
							.map(function (currentElement) {
								return currentElement.occupations.flat();
							})
							.flat()
							.map((x) => x.name)
							.includes(name)}
							<section class="space-y-4 my-4">
								<h3 class="h3">
									{$filteredOccupationsCardinal[name]['count']['total']}
									{$filteredOccupationsCardinal[name]['label']}
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
				</div>
			{/await}
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
