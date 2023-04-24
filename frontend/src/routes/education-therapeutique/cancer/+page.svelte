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
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {capitalizeFirstLetter($LL.OUTPATIENT_CLINIC.TPE(), $language)}: {$LL.DISEASE.CANCER()}
	</title>
</svelte:head>

<span class="badge variant-filled-surface">{capitalizeFirstLetter($LL.OUTPATIENT_CLINIC.TPE(), $language)}</span>

<h2>Hope: accompagnement pendant un cancer</h2>

<h3>Présentation</h3>
<p>Ce programme comporte à la fois des ateliers en petits groupes, animés par un professionnel de santé spécifiquement formé à l’éducation thérapeutique, et des ateliers individuels.</p>

<h3>Personnes concernées</h3>
<p>Ce programme, porté par la MSP de Carpentras et répliqué sur Vedène, s’adresse à toute personne de plus de 18 ans ayant eu une annonce de cancer, en cours de traitement ou moins de 12 mois après l’arrêt des traitements actifs.</p>

<h3>Objectifs</h3>
<div class="w-fit text-token card p-4">
<ul class="list-disc space-y-4 p-4">
	<li>Gérer les effets indésirables du traitement</li>
	<li>Faire face aux situations difficiles par la gestion du stress et des émotions</li>
    <li>Répondre aux questions du quotidien en lien avec la maladie</li>
</ul>
</div>

<h3>Déroulement</h3>
<div class="w-fit text-token card p-4">
    <p class="font-bold">4 ateliers collectifs de 2 heures:</p>
<ul class="list-disc space-y-4 p-4">
	<li>Ma santé et mes traitements</li>
	<li>Mon alimentation</li>
    <li>Bien dans ma tête</li>
    <li>Bien dans mon corps</li>
</ul>
</div>

<div class="w-fit text-token card p-4">
    <p class="font-bold">3 séances individuelles, à choisir parmi les intervenants suivants:</p>
<ul class="list-disc space-y-4 p-4">
	<li>Diététicienne</li>
	<li>Pharmacien</li>
    <li>Socio-esthéticienne</li>
    <li>Psychologue</li>
    <li>Sophrologue</li>
</ul>
</div>

<h3>Conditions d'accès</h3>
<p>Ce programme est financé par l’Agence Régionale de Santé PACA, la participation est donc gratuite.</p>

<ProgramNav data={$page.url.pathname} />