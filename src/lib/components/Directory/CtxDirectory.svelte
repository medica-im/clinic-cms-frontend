<script lang="ts">
	import { setContext } from 'svelte';
	import {
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
		facilityOfF
	} from '$lib/store/directoryStore.ts';
	import FullDirectory from './FullDirectory.svelte';
	import Types from './Types.svelte';

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
	export let propSelectFacility: string = "";
	export let avatar: boolean = true;
	export let typesView: boolean = false;
	export let displayEntries: boolean = false;
	export let types: string[]|null=null;

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
		if ($addressFeature) {
		    return distanceEffectorsF($addressFeature);
		}
		return null;
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

	setContext('cardinalCategorizedFilteredEffectors', cardinalCategorizedFilteredEffectors);

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
		$selectFacility = propSelectFacility;
	}
</script>
{#if typesView}
<Types
    {data}
	{displayEntries}
/>
{:else}
<FullDirectory
    {data}
	{displayGeocoder}
	{displaySituation}
	{displayCategory}
	{displayCommune}
	{displayFacility}
	{displaySearch}
	{avatar}
	{communeOf}
	{categoryOf}
	{facilityOf}
	{types}
/>
{/if}