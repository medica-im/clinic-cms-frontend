<script lang='ts'>
export let data;
import { facilityStore } from '$lib/store/facilityStore';
import LL from '$i18n/i18n-svelte';
import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
import { language } from '$lib/store/languageStore';

let promise;
$: promise = facilityStore.load(), $language;
</script>

<svelte:head>
	{#await promise}
	<title>
		{capitalizeFirstLetter(data.facilityData.formatted_name, $language)} - {$LL.NAVBAR.ABOUT()}
	</title>
	{:then}
		<title>
			{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {$LL.NAVBAR.ABOUT()}
		</title>
	{/await}
</svelte:head>

Hello!

{JSON.stringify(data.about)}