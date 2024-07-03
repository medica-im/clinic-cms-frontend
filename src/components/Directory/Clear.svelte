<script lang="ts">
    import Fa from 'svelte-fa';
	import { faDeleteLeft, faEraser } from '@fortawesome/free-solid-svg-icons';
	import { term, selectCommunes, selectCommunesValue, selectCategories, selCatVal, selectSituation, selectSituationValue, addressFeature, inputAddress } from '$lib/store/directoryStore.ts';

	let isDisabled = true;

	$: isDisabled = !($term || $selectCommunesValue || $selCatVal || $selectSituationValue || $inputAddress);

	function erase() {
		term.set("");
		selectCommunes.set([]);
		selectCommunesValue.set(null);
		selectCategories.set([]);
		selCatVal.set(null);
		selectSituation.set("");
		selectSituationValue.set(null);
		addressFeature.set({});
		inputAddress.set("");
	}
</script>

<button class="btn variant-filled-error" type="reset" on:click={erase} disabled='{isDisabled}'>
	<span><Fa icon={faEraser} size="lg" /></span>
	<span>Tout effacer</span>
</button>