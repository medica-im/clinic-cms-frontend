<script lang="ts">
	import TimeLine from '$lib/components/Timeline/TimeLine.svelte';
	import { facilityStore } from '$lib/store/facilityStore';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import LL from '$i18n/i18n-svelte';
	import {
		Content,
		Grid,
		Row,
		Column,
	} from 'carbon-components-svelte';

	export let data;

	let promise;
	$: (promise = facilityStore.load()), $language;
</script>

<svelte:head>
	{#await promise}
		<!--title>
        {capitalizeFirstLetter(data.facilityData.formatted_name, $language)} - {$LL.CONTACT.TITLE()}
    </title-->
	{:then}
		<title>
			{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {$LL.TIMELINE.TITLE()}
		</title>
	{/await}
</svelte:head>
<Content>
	<Grid padding>
		<Row>
			<Column>
				<TimeLine data={data.timeline} />
			</Column>
		</Row>
	</Grid>
</Content>
