<script lang="ts">
	import Fa from 'svelte-fa';
	import { faDeleteLeft, faEraser } from '@fortawesome/free-solid-svg-icons';
	import {
		getTerm,
		getSelectCommunes,
		getSelectCommunesValue,
		getSelectCategories,
		getSelCatVal,
		getSelectSituation,
		getSelectSituationValue,
		getInputAddress,
		getSelectFacility,
		getSelectFacilityValue,
		getDirectoryRedirect,
		getAddressFeature
	} from './context.ts';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let term = getTerm();
	let selectCommunesValue = getSelectCommunesValue();
	let selCatVal = getSelCatVal();
	let selectSituationValue = getSelectSituationValue();
	let inputAddress = getInputAddress();
	let selectFacilityValue = getSelectFacilityValue();
	let directoryRedirect = getDirectoryRedirect();
	let selectCategories = getSelectCategories();
	let selectSituation = getSelectSituation();
	let selectFacility = getSelectFacility();
	let selectCommunes = getSelectCommunes();
	let addressFeature = getAddressFeature();

	let isDisabled = true;

	$: isDisabled = !(
		$term ||
		$selectCommunesValue ||
		$selCatVal ||
		$selectSituationValue ||
		$inputAddress ||
		$selectFacilityValue
	);

	function resetDirectory() {
		term.set('');
		selectCommunes.set([]);
		selectCommunesValue.set(null);
		selectCategories.set([]);
		selCatVal.set(null);
		selectSituation.set('');
		selectSituationValue.set(null);
		addressFeature.set(null);
		inputAddress.set('');
		selectFacility.set('');
		selectFacilityValue.set(null);
	}

	function erase() {
		resetDirectory();
		let query = new URLSearchParams(page.url.searchParams.toString());
		page.url.searchParams.forEach((value, key) => {
			query.delete(key);
		});
		goto(`?${query.toString()}`);
		if (page.url.pathname != '/annuaire' && $directoryRedirect) {
			goto('/annuaire');
		}
	}
</script>

<button class="btn variant-filled-error" type="reset" on:click={erase} disabled={isDisabled}
	>page
	<span><Fa icon={faEraser} size="lg" /></span>
	<span>Tout effacer</span>
</button>
