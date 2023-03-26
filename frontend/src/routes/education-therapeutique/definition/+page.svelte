<script lang="ts">
    import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import healthProjectPdf from '$lib/assets/projet_de_sante_MSP_Vedene.pdf';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - capitalizeFirstLetter({$LL.OUTPATIENT_CLINIC.TPE(),$language})
	</title>
</svelte:head>

<h2>{capitalizeFirstLetter($LL.OUTPATIENT_CLINIC.TPE(), $language)}</h2>

<p>
L’éducation thérapeutique du patient a pour objectif d’aider les personnes vivant avec une maladie chronique à améliorer leur qualité de vie avec cette maladie, grâce à l’acquisition ou au maintien de compétences dont le besoin a été identifié lors d’un bilan individuel initial.
</p>