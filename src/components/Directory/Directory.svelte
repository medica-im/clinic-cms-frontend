<script lang="ts">
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import { categorizedFilteredEffectors, filteredEffectors, selectSituation, displayMap } from '$lib/store/directoryStore.ts';
	import LL from '$i18n/i18n-svelte.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { language } from '$lib/store/languageStore.ts';
	import SearchDirectory from '$components/Directory/SearchDirectory.svelte';
	import Effector from './Effector.svelte';
	import SelectCommunes from './SelectCommunes.svelte';
	import SelectCategories from './SelectCategories.svelte';
	import SelectCategoriesChips from './SelectCategoriesChips.svelte';
	import SelectSituations from './SelectSituations.svelte';
	import Geocoder from '$components/Geocoder/Geocoder.svelte';
	import Fa from 'svelte-fa';
	import {
		faArrowsUpToLine,
		faMapLocationDot,
		faAddressBook
	} from '@fortawesome/free-solid-svg-icons';
	import type { ConicStop } from '@skeletonlabs/skeleton';
	import Spinner from '$components/Spinner.svelte';
	import { scrollY } from '$lib/store/scrollStore.ts';
	import Clear from '$components/Directory/Clear.svelte';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import FacilityMap from '$lib/components/FacilityMap/FacilityMap.svelte';

	export let data;

	//let displayMap: boolean = false;
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

<svelte:window bind:scrollY={$scrollY} />

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
				{#if data && [...data]?.length}
					<div class="my-2 space-x-2 flex justify-between w-full">
						<span class="badge variant-ghost-surface">{contactCount(data)}</span>
						<div class="flex space-x-2 items-center">
							<Spinner w="4" h="4" />
							<p>Mise à jour...</p>
						</div>
						<Clear />
					</div>
					<div class="my-4 space-y-4">
						{#each [...data] as [key, value]}
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

				<div class="my-2 flex justify-between w-full">
					<span class="badge variant-ghost-surface">{countString}</span>

					<RadioGroup
						padding="p-2"
						active="variant-filled-primary"
						hover="hover:variant-soft-primary"
					>
						<RadioItem bind:group={$displayMap} name="justify" value={false}
							><div class="flex 2xl:items-center 2xl:space-x-1">
								<Fa icon={faAddressBook} /><span class="hidden 2xl:inline-block">Annuaire</span>
							</div></RadioItem
						>
						<RadioItem bind:group={$displayMap} name="justify" value={true}
							><div class="flex 2xl:items-center 2xl:space-x-1">
								<Fa icon={faMapLocationDot} /><span class="hidden 2xl:inline-block">Carte</span>
							</div></RadioItem
						>
					</RadioGroup>

					<Clear />
				</div>

				<div class="my-4 space-y-4">
					{#if $displayMap}
					<div class="h-screen px-4 z-[-1]">
					<FacilityMap data={$filteredEffectors} />
					</div>
					{:else}
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
					{/if}
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
		@apply mx-auto w-full max-w-7xl p-4 py-4 md:py-8;
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
