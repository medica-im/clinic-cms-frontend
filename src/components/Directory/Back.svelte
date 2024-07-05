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
		addressFeature
	} from '$lib/store/directoryStore.ts';
</script>

<a href="/" class="btn btn-sm variant-filled-primary">
	{#if $term.length || $selectCommunes.length || $selectCategories.length || $selectSituation.length || $addressFeature?.geometry?.coordinates}
		<span class="badge variant-filled-primary"> <Fa icon={faArrowLeft} size="sm" /></span>
		<span class="flex flex-wrap whitespace-normal text-left">
			{capitalizeFirstLetter($LL.ADDRESSBOOK.GOTOSEARCH())}
		</span>
	{:else}
		<span class="badge variant-filled-primary"> <Fa icon={faArrowRight} size="sm" /></span>
		<span class="flex flex-wrap whitespace-normal text-left">
			{capitalizeFirstLetter($LL.NAVBAR.ADDRESSBOOK())}
		</span>
	{/if}
</a>