<script lang="ts">
	import { facilityStore } from '$lib/store/facilityStore';
	import { categorizedFilteredEffectors, selectSituation } from '$lib/store/directoryStore';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import SearchDirectory from '$components/Directory/SearchDirectory.svelte';
	import Effector from './Effector.svelte';
	import SelectCommunes from './SelectCommunes.svelte';
	import SelectCategories from './SelectCategories.svelte';
	import SelectCategoriesChips from './SelectCategoriesChips.svelte';
	import SelectSituations from './SelectSituations.svelte';
	import Geocoder from '$components/Geocoder/Geocoder.svelte';
	import Fa from 'svelte-fa';
	import { faArrowsUpToLine } from '@fortawesome/free-solid-svg-icons';
	import { categorizedCachedEffectors } from '$lib/store/directoryStore.js';
	import type { ConicStop } from '@skeletonlabs/skeleton';
	import Spinner from '$components/Spinner.svelte';
	import { scrollY } from '$lib/store/scrollStore';

	const effectors = categorizedCachedEffectors();
	let top;
	let category = '';
	let countString = '';
	function section(c: string): void {
		category = c;
	}
	let showOnPx = 500;
	function contactCount(categorizedFilteredEffectors) {
		let count = 0;
		if (categorizedFilteredEffectors) {
			count = [...categorizedFilteredEffectors.values()].flat().length;
		}
		return `${count} contact${count > 1 ? 's' : ''}`;
	}
	$: countString = contactCount($categorizedFilteredEffectors);
	const scrollToTop = () => {
		top.scrollIntoView();
	};
</script>

<svelte:head>
	<title>
		{$LL.ADDRESSBOOK.TITLE()} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>

<div>
	<section id="programs" class="bg-surface-100-800-token programs-gradient">
		<div class="section-container" bind:this={top}>
			{#await categorizedFilteredEffectors.load()}
				<div class="space-y-2">
					<div class="row">
						<div class="col">
							<Geocoder />
						</div>
					</div>
					<div class="row">
						<div class="col">
							<SelectSituations />
						</div>
					</div>
					<div class="row">
						<div class="col">
							<SelectCommunes />
						</div>
					</div>
					{#if $selectSituation}
						<div class="row">
							<div class="col">
								<SelectCategoriesChips />
							</div>
						</div>
					{:else}
						<div class="row">
							<div class="col">
								<SelectCategories />
							</div>
						</div>
					{/if}
					<div class="row">
						<div class="col">
							<SearchDirectory />
						</div>
					</div>
				</div>
				{#if effectors && [...effectors]?.length}
					<div class="flex justify-center m-4 space-x-2 items-center">
						<Spinner w="4" h="4" />
						<p>Mise à jour...</p>
					</div>
					<div class="my-4">
						<p>{contactCount(effectors)}</p>
					</div>
					<div class="my-4 space-y-4">
						{#each [...effectors] as [key, value]}
							<div class="space-y-4 my-4 anchordiv" id={key}>
								<div class="relative inline-block">
									<span class="badge-icon variant-filled-primary absolute -top-2 -right-3 z-5">
										{value.length}
									</span>

									<span class="badge variant-filled"
										><h4 class="h4">{capitalizeFirstLetter(key)}</h4></span
									>
								</div>
							</div>
							{#each value as effector}
								<div class="space-y-4 my-4">
									<div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
										<Effector {effector} />
									</div>
								</div>
							{/each}
						{/each}
					</div>
				{:else}
					<div class="flex justify-center m-4 space-x-2 items-center">
						<Spinner w="4" h="4" />
						<p>Chargement...</p>
					</div>
				{/if}
			{:then}
				<div class="space-y-2">
					<div class="row">
						<div class="col">
							<Geocoder />
						</div>
					</div>
					<div class="row">
						<div class="col">
							<SelectSituations />
						</div>
					</div>
					<div class="row">
						<div class="col">
							<SelectCommunes />
						</div>
					</div>
					{#if $selectSituation}
						<div class="row">
							<div class="col">
								<SelectCategoriesChips />
							</div>
						</div>
					{:else}
						<div class="row">
							<div class="col">
								<SelectCategories />
							</div>
						</div>
					{/if}
					<div class="row">
						<div class="col">
							<SearchDirectory />
						</div>
					</div>
				</div>

				<div class="my-4">
					<p>{countString}</p>
				</div>

				<div class="my-4 space-y-4">
					{#each [...$categorizedFilteredEffectors] as [key, value]}
						<div class="space-y-4 my-4 anchordiv" id={key}>
							<div class="relative inline-block">
								<span class="badge-icon variant-filled-primary absolute -top-2 -right-3 z-5">
									{value.length}
								</span>

								<span class="badge variant-filled"
									><h4 class="h4">{capitalizeFirstLetter(key)}</h4></span
								>
							</div>
						</div>
						{#each value as effector}
							<div class="space-y-4 my-4">
								<div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
									<Effector {effector} />
								</div>
							</div>
						{/each}
					{/each}
				</div>
			{/await}
		</div>
	</section>
</div>
{#if $scrollY > showOnPx}
	<button type="button" class="back-to-top btn-icon btn-lg variant-filled" on:click={scrollToTop}>
		<Fa icon={faArrowsUpToLine} size="lg" /></button
	>
{/if}

<style lang="postcss">
	.anchordiv {
		scroll-margin-top: 1rem;
	}
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-8 md:py-12;
		scroll-padding-top: 4rem;
	}
	.programs-gradient {
		background-image: radial-gradient(
				at 0% 0%,
				rgba(var(--color-secondary-500) / 0.33) 0px,
				transparent 50%
			),
			radial-gradient(at 100% 0%, rgba(var(--color-primary-500) / 0.33) 0px, transparent 50%);
	}
	.back-to-top {
		position: fixed;
		z-index: 99;
		right: 15px;
		user-select: none;
		bottom: 15px;
	}
</style>
