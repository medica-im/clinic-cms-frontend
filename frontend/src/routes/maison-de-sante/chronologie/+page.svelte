<script lang="ts">
	import TimeLine from '$lib/components/Timeline/TimeLine.svelte';
	import { facilityStore } from '$lib/store/facilityStore';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import LL from '$i18n/i18n-svelte';

	export let data;

	let promise;
	$: (promise = facilityStore.load()), $language;
</script>

<svelte:head>
	<title>
		{$LL.TIMELINE.TITLE()} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>

<TimeLine data={data.timeline} />
