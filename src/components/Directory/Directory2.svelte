<script lang="ts">
	import { facilityStore } from '$lib/store/facilityStore';
	import {
		categorizedFilteredEffectors,
		selectSituation,
		categorizedCachedEffectors,
		cardinalCategorizedFilteredEffectors
	} from '$lib/store/directoryStore';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import SearchDirectory from '$components/Directory/SearchDirectory.svelte';
	import Effector from './Effector.svelte';
	import SelectCommunes from './SelectCommunes.svelte';
	import SelectCategories from './SelectCategories.svelte';
	import SelectCategoriesChips from './SelectCategoriesChips.svelte';
	import SelectSituations from './SelectSituations.svelte';
	import SelectFacility from '$components/Directory/SelectFacility.svelte';
	import Geocoder from '$components/Geocoder/Geocoder.svelte';
	import Fa from 'svelte-fa';
	import { faArrowsUpToLine } from '@fortawesome/free-solid-svg-icons';
	import Spinner from '$components/Spinner.svelte';
	import { scrollY } from '$lib/store/scrollStore';
	import Clear from '$components/Directory/Clear.svelte';
	import { page } from '$app/stores';

	export let data: any;

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
			{#await cardinalCategorizedFilteredEffectors.load()}
				<div class="space-y-2">
					{#if $page.data.directory?.inputField?.geocoder}
						<div class="row">
							<div class="col">
								<Geocoder />
							</div>
						</div>
					{/if}
					{#if $page.data.directory?.inputField?.situation}
						<div class="row">
							<div class="col">
								<SelectSituations />
							</div>
						</div>
					{/if}
					{#if $page.data.directory?.inputField?.commune}
						<div class="row">
							<div class="col">
								<SelectCommunes />
							</div>
						</div>
					{/if}
					{#if $selectSituation}
						<div class="row">
							<div class="col">
								<SelectCategoriesChips />
							</div>
						</div>
					{:else if $page.data.directory?.inputField?.category}
						<div class="row">
							<div class="col">
								<SelectCategories />
							</div>
						</div>
					{/if}
					{#if $page.data.directory?.inputField?.facility}
						<div class="row">
							<div class="col">
								<SelectFacility />
							</div>
						</div>
					{/if}
					{#if $page.data.directory?.inputField?.search}
						<div class="row">
							<div class="col">
								<SearchDirectory />
							</div>
						</div>
					{/if}
					{#if data && [...data]?.length}
						<!--div class="flex justify-center m-4 space-x-2 items-center">
							<Spinner w="4" h="4" />
							<p>Mise à jour...</p>
						</div-->
						<div class="my-2 flex justify-between w-full">
							<span class="badge variant-ghost-surface">{contactCount(data)}</span>
							<span class="inline-flex items-center space-x-2">
								<Spinner w="4" h="4" />
								<span>Mise à jour...</span>
							</span>
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
				</div>
			{:then}
				<div class="space-y-2">
					{#if $page.data.directory?.inputField?.geocoder}
						<div class="row">
							<div class="col">
								<Geocoder />
							</div>
						</div>
					{/if}
					{#if $page.data.directory?.inputField?.situation}
						<div class="row">
							<div class="col">
								<SelectSituations />
							</div>
						</div>
					{/if}
					{#if $page.data.directory?.inputField?.commune}
						<div class="row">
							<div class="col">
								<SelectCommunes />
							</div>
						</div>
					{/if}
					{#if $selectSituation}
						<div class="row">
							<div class="col">
								<SelectCategoriesChips />
							</div>
						</div>
					{:else if $page.data.directory?.inputField?.category}
						<div class="row">
							<div class="col">
								<SelectCategories />
							</div>
						</div>
					{/if}
					{#if $page.data.directory?.inputField?.facility}
						<div class="row">
							<div class="col">
								<SelectFacility />
							</div>
						</div>
					{/if}
					{#if $page.data.directory?.inputField?.search}
						<div class="row">
							<div class="col">
								<SearchDirectory />
							</div>
						</div>
					{/if}
				</div>

				<div class="my-2 flex justify-between w-full">
					<span class="badge variant-ghost-surface">{countString}</span>
					<Clear />
				</div>

				<div class="my-4 space-y-4">
					{#each [...$cardinalCategorizedFilteredEffectors] as [key, value]}
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
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8;
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
