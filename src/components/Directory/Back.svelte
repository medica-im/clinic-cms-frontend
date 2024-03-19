<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import Fa from 'svelte-fa';
	import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
	import {
		term,
		selectCommunes,
		selectCategories,
		selectSituation,
		addressFeature,
		selectFacility,
	} from '$lib/store/directoryStore';
</script>

<a href="/annuaire" class="btn variant-filled">
	{#if $term.length || $selectCommunes.length || $selectCategories.length || $selectSituation.length || $selectFacility || $addressFeature?.geometry?.coordinates}
		<span class="badge variant-filled-primary"> <Fa icon={faArrowLeft} /></span>
		<span class="whitespace-normal text-left">
			{capitalizeFirstLetter($LL.ADDRESSBOOK.GOTOSEARCH())}
		</span>
	{:else}
		<span class="badge variant-filled-primary"> <Fa icon={faArrowRight} /></span>
		<span class="whitespace-normal text-left">
			{capitalizeFirstLetter($LL.NAVBAR.ADDRESSBOOK())}
		</span>
	{/if}
</a>