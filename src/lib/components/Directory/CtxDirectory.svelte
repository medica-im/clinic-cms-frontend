<script lang="ts">
	import {
		writable,
		derived,
		readable,
		get,
		asyncReadable,
		asyncDerived
	} from '@square/svelte-store';
	import {
		setTerm,
		getTerm,
		setSelectCategories,
		getSelectCategories,
		setLimitCategories,
		getLimitCategories,
		setSelectCommunes,
		getSelectCommunes,
		setSelectCommunesValue,
		getSelectCommunesValue,
		setSelectSituation,
		getSelectSituation,
		setSelectFacility,
		getSelectFacility,
		setSelectFacilityValue,
		setCurrentOrg,
		getCurrentOrg,
		setDirectoryRedirect,
		getDirectoryRedirect,
		setAddressFeature,
		getAddressFeature,
		setSelCatVal,
		setSelectSituationValue,
		setInputAddress
	} from './context';
	import { variables } from '$lib/utils/constants.ts';
	import { facilityStore, getFacilities } from '$lib/store/facilityStore.ts';
	import {
		distanceEffectorsF,
		fullFilteredEffectorsF,
		filteredEffectorsF,
		categorizedFilteredEffectorsF,
		cardinalCategorizedFilteredEffectorsF,
		categoryOfF,
		communeOfF,
		facilityOfF,
		categories
	} from '$lib/store/directoryStore.ts';
	import LL from '$i18n/i18n-svelte.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { language } from '$lib/store/languageStore.ts';
	import SearchDirectory from '$lib/components/Directory/SearchDirectory.svelte';
	import Effector from '$lib/components/Directory/Effector.svelte';
	import SelectCommunes from '$lib/components/Directory/SelectCommunes.svelte';
	import SelectCategories from '$lib/components/Directory/SelectCategories.svelte';
	import SelectCategoriesChips from '$lib/components/Directory/SelectCategoriesChips.svelte';
	import SelectSituations from '$lib/components/Directory/SelectSituations.svelte';
	import SelectFacility from '$lib/components/Directory/SelectFacility.svelte';
	import Geocoder from '$lib/components/Geocoder/Geocoder.svelte';
	import Fa from 'svelte-fa';
	import { faArrowsUpToLine } from '@fortawesome/free-solid-svg-icons';
	import Spinner from '$components/Spinner.svelte';
	import { scrollY } from '$lib/store/scrollStore.ts';
	import Clear from '$lib/components/Directory/Clear.svelte';
	import { getContext, setContext } from 'svelte';
	import type { CurrentOrg } from '$lib/store/directoryStoreInterface';
	import type { Writable } from '@square/svelte-store';

	export let data: any = null;
	export let displayGeocoder: boolean = variables.INPUT_GEOCODER;
	export let displaySituation: boolean = variables.INPUT_SITUATION;
	export let displayCommune: boolean = variables.INPUT_COMMUNE;
	export let displayCategory: boolean = variables.INPUT_CATEGORY;
	export let displayFacility: boolean = variables.INPUT_FACILITY;
	export let displaySearch: boolean = variables.INPUT_SEARCH;
	export let propCurrentOrg: boolean | null = true;
	export let setRedirect: boolean = true;
	export let propLimitCategories: string[] = [];
	export let avatar: boolean = true;

	setTerm();
	setSelectCategories();
	setLimitCategories();
	setCurrentOrg();
	setDirectoryRedirect();
	setSelectCommunes();
	setSelectCommunesValue();
	setSelectSituation();
	setSelectSituationValue();
	setAddressFeature();
	setSelectFacility();
	setSelectFacilityValue();
	setSelCatVal();
	setInputAddress();

	let term = getTerm();
	let selectCategories = getSelectCategories();
	let selectSituation = getSelectSituation();
	let selectCommunes = getSelectCommunes();
	let addressFeature = getAddressFeature();
	let selectFacility = getSelectFacility();
	let directoryRedirect = getDirectoryRedirect();
	let currentOrg = getCurrentOrg();
	let limitCategories = getLimitCategories();

	const distanceEffectors = asyncDerived([addressFeature], async ([$addressFeature]) => {
		return distanceEffectorsF($addressFeature);
	});

	const fullFilteredEffectors = asyncDerived(
		[term, selectSituation, distanceEffectors, currentOrg, facilityStore, limitCategories],
		async ([
			$term,
			$selectSituation,
			$distanceEffectors,
			$currentOrg,
			$facilityStore,
			$limitCategories
		]) => {
			return await fullFilteredEffectorsF(
				$term,
				$selectSituation,
				$distanceEffectors,
				$currentOrg,
				$facilityStore,
				$limitCategories
			);
		}
	);

	const filteredEffectors = asyncDerived(
		[fullFilteredEffectors, selectCategories, selectCommunes, selectFacility],
		async ([$fullFilteredEffectors, $selectCategories, $selectCommunes, $selectFacility]) => {
			return filteredEffectorsF(
				$fullFilteredEffectors,
				$selectCategories,
				$selectCommunes,
				$selectFacility
			);
		}
	);

	const categorizedFilteredEffectors = asyncDerived(
		[filteredEffectors, distanceEffectors, selectSituation],
		async ([$filteredEffectors, $distanceEffectors, $selectSituation]) => {
			return categorizedFilteredEffectorsF(
				$filteredEffectors,
				$distanceEffectors,
				$selectSituation
			);
		}
	);

	const cardinalCategorizedFilteredEffectors = asyncDerived(
		[categorizedFilteredEffectors, filteredEffectors],
		async ([$categorizedFilteredEffectors, $filteredEffectors]) => {
			return cardinalCategorizedFilteredEffectorsF($categorizedFilteredEffectors);
		}
	);

	const categoryOf = asyncDerived(
		[selectCommunes, fullFilteredEffectors, selectFacility],
		async ([$selectCommunes, $fullFilteredEffectors, $selectFacility]) => {
			return categoryOfF($selectCommunes, $fullFilteredEffectors, $selectFacility);
		}
	);

	const communeOf = asyncDerived(
		[selectCategories, fullFilteredEffectors, selectFacility, currentOrg, limitCategories],
		async ([
			$selectCategories,
			$fullFilteredEffectors,
			$selectFacility,
			$currentOrg,
			$limitCategories
		]) => {
			return communeOfF(
				$selectCategories,
				$fullFilteredEffectors,
				$selectFacility,
				$currentOrg,
				$limitCategories
			);
		}
	);

	const facilityOf = asyncDerived(
		[
			selectCategories,
			fullFilteredEffectors,
			selectCommunes,
			currentOrg,
			limitCategories,
			getFacilities
		],
		async ([
			$selectCategories,
			$fullFilteredEffectors,
			$selectCommunes,
			$currentOrg,
			$limitCategories,
			$getFacilities
		]) => {
			return facilityOfF(
				$selectCategories,
				$fullFilteredEffectors,
				$selectCommunes,
				$currentOrg,
				$limitCategories,
				$getFacilities
			);
		}
	);

	$: {
		$currentOrg = propCurrentOrg;
		$directoryRedirect = setRedirect;
		$limitCategories = propLimitCategories;
	}

	let top: Element;
	let countString = '';
	let showOnPx = 500;
	function contactCount(_categorizedFilteredEffectors: Map<string, any>) {
		let count = 0;
		if (_categorizedFilteredEffectors) {
			count = [..._categorizedFilteredEffectors.values()].flat().length;
		}
		return `${count} contact${count > 1 ? 's' : ''}`;
	}
	$: countString = contactCount($cardinalCategorizedFilteredEffectors);
	const scrollToTop = () => {
		top.scrollIntoView();
	};
</script>

<svelte:window bind:scrollY={$scrollY} />

<div>
	<section id="programs" class="bg-surface-100-800-token programs-gradient">
		<div class="section-container" bind:this={top}>
			<div class="space-y-2">
				{#if displayGeocoder}
					<div class="row">
						<div class="col">
							<Geocoder />
						</div>
					</div>
				{/if}
				{#if displaySituation}
					<div class="row">
						<div class="col">
							<SelectSituations />
						</div>
					</div>
				{/if}
				{#if displayCommune}
					<div class="row">
						<div class="col">
							<SelectCommunes {communeOf} />
						</div>
					</div>
				{/if}
				{#if displayCategory}
					{#if $selectSituation}
						<div class="row">
							<div class="col">
								<SelectCategoriesChips />
							</div>
						</div>
					{:else}
						<div class="row">
							<div class="col">
								<SelectCategories {categoryOf} types={data.types} />
							</div>
						</div>
					{/if}
				{/if}
				{#if displayFacility}
					<div class="row">
						<div class="col">
							<SelectFacility {facilityOf} />
						</div>
					</div>
				{/if}
				{#if displaySearch}
					<div class="row">
						<div class="col">
							<SearchDirectory />
						</div>
					</div>
				{/if}
				{#await cardinalCategorizedFilteredEffectors.load()}
					<div class="my-4 space-y-4">
						{#if data?.cardinal && [...data?.cardinal]?.length}
							<div class="flex justify-between w-full">
								<span class="badge variant-ghost-surface">{contactCount(data.cardinal)}</span>
								<div class="inline-flex items-center space-x-2 m-0 p-0">
									<Spinner w={3} h={3} />
									<span>Mise à jour...</span>
								</div>
								<Clear />
							</div>
							<div class="my-4 space-y-4">
								{#each [...data.cardinal] as [key, value]}
									<div class="space-y-6 my-6 anchordiv" id={key}>
										<div class="relative inline-block">
											<span class="badge-icon variant-filled-primary absolute -top-2 -right-3 z-5">
												{value.length}
											</span>

											<span class="badge variant-filled"
												><h4 class="h4">{capitalizeFirstLetter(key)}</h4></span
											>
										</div>
									</div>
									<div class="grid lg:grid-cols-2 gap-x-16 gap-y-8 space-y-4">
										{#each value as effector}
											<Effector {effector} {avatar} />
										{/each}
									</div>
								{/each}
							</div>
						{:else}
							<div class="flex justify-center m-2 space-x-2 items-center">
								<Spinner w={4} h={4} />
								<p>Chargement...</p>
							</div>
						{/if}
					</div>
				{:then}
					<div class="my-4 space-y-4">
						<div class="my-2 flex justify-between w-full">
							<span class="badge variant-ghost-surface"
								>{contactCount($cardinalCategorizedFilteredEffectors)}</span
							>
							<Clear />
						</div>
						{#each [...$cardinalCategorizedFilteredEffectors] as [key, value]}
							<div class="space-y-6 my-6 anchordiv" id={key}>
								<div class="relative inline-block">
									<span class="badge-icon variant-filled-primary absolute -top-2 -right-3 z-5">
										{value.length}
									</span>

									<span class="badge variant-filled"
										><h4 class="h4">{capitalizeFirstLetter(key)}</h4></span
									>
								</div>
							</div>
							<div class="grid lg:grid-cols-2 gap-x-16 gap-y-8 space-y-4">
								{#each value as effector}
									<Effector {effector} {avatar} />
								{/each}
							</div>
						{/each}
					</div>
				{/await}
			</div>
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
