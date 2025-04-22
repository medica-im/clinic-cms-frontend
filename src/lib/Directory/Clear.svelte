<script lang="ts">
    import { resetDirectory } from '$lib/Directory/utils'; 
    import Fa from 'svelte-fa';
	import { faDeleteLeft, faEraser } from '@fortawesome/free-solid-svg-icons';
	import { term, selectCommunes, selectCommunesValue, selectCategories, selCatVal, selectSituation, selectSituationValue, inputAddress, selectFacility, selectFacilityValue, directoryRedirect } from '$lib/store/directoryStore';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let isDisabled = true;

	$: isDisabled = !($term || $selectCommunesValue || $selCatVal || $selectSituationValue || $inputAddress || $selectFacilityValue);

	function erase() {
		resetDirectory();
		if (page.url.pathname != '/annuaire' && $directoryRedirect) {
				goto('/annuaire');
			}
	}
</script>

<button class="btn variant-filled-error" type="reset" on:click={erase} disabled='{isDisabled}'>
	<span><Fa icon={faEraser} size="lg" /></span>
	<span>Tout effacer</span>
</button>