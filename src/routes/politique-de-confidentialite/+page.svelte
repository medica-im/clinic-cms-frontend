<script lang="ts">
	import * as m from "$msgs";	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { organizationStore } from '$lib/store/facilityStore';
	import Fa from 'svelte-fa';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter(
			m.PRIVACY_POLICY(),
			$language
		)} - {capitalizeFirstLetter($organizationStore.formatted_name, $language)}
	</title>
</svelte:head>

<h2 class="h2">{capitalizeFirstLetter(
	m.PRIVACY_POLICY(),
	$language
)}</h2>