<script lang="ts">
    import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
    import Carousel from '$components/Carousel/Carousel.svelte';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {capitalizeFirstLetter($LL.OUTPATIENT_CLINIC.MDT_MEETING(), $language)}
	</title>
</svelte:head>
<h2>{capitalizeFirstLetter($LL.OUTPATIENT_CLINIC.MDT_MEETING(), $language)}</h2>
<p>Les professionnels de la MSP se réunissent une fois par mois, en équipe pluridisciplinaire, pour discuter de situations complexes dans la prise en charge de patients suivis au sein de la structure.</p>
<p>Ces temps d’échange permettent aussi de faire le point sur le déroulement des programmes et les différentes missions de prévention afin de faire évoluer le projet de santé de la MSP.</p>
<Carousel count={6} path={"reunion-concertation-pluriprofessionnelle-0.jpg"} alt={capitalizeFirstLetter($LL.OUTPATIENT_CLINIC.MDT_MEETING(), $language)} />