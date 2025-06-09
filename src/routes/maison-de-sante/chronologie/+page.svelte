<script lang="ts">
	import TimeLine from '$lib/components/Timeline/TimeLine.svelte';
	import { organizationStore } from '$lib/store/facilityStore';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import * as m from "$msgs";
	export let data;
</script>

<svelte:head>
	<title>
		{m.TIMELINE_TITLE()} - {capitalizeFirstLetter($organizationStore.formatted_name, $language)}
	</title>
</svelte:head>
<TimeLine data={data.timeline} />

