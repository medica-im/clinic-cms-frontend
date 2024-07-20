<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import Fa from 'svelte-fa';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter(
			$LL.PRIVACY_POLICY(),
			$language
		)} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>

<h2 class="h2">{capitalizeFirstLetter(
	$LL.PRIVACY_POLICY(),
	$language
)}</h2>