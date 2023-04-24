<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import { page } from '$app/stores';
    import ProgramNav from '$components/ProgramNav.svelte';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {capitalizeFirstLetter(
			$LL.PREVENTIVE_HEALTHCARE(),
			$language
		)}
	</title>
</svelte:head>

<h2>{capitalizeFirstLetter($LL.PREVENTIVE_HEALTHCARE(), $language)}</h2>

<p>
	La prévention est selon l’OMS en 1948, «l’ensemble des mesures visant à éviter ou réduire le nombre et la gravité des maladies, des accidents et des handicaps».
</p>
<p>
	La prévention de la maladie comprend des mesures qui visent non seulement à empêcher l’apparition de la maladie, telle que la lutte contre les facteurs de risque, mais également à en arrêter les progrès et à en réduire les conséquences.
</p>

<ProgramNav data={$page.url.pathname} />