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
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {capitalizeFirstLetter($LL.OUTPATIENT_CLINIC.TPE(), $language)}: {$LL.DISEASE.DIABETES()}
	</title>
</svelte:head>

<span class="badge variant-filled-surface">{capitalizeFirstLetter($LL.OUTPATIENT_CLINIC.TPE(), $language)}</span>

<h2>Vivez à fond avec votre diabète: programme d’éducation thérapeutique du patient diabétique</h2>  

<h3>Personnes concernées</h3>
<p>
Ce programme s’adresse à toutes les personnes diabétiques de type 2 âgées de plus de 18 ans, que leur diabète soit insulino-requérant ou non.
</p>

<h3>Déroulement</h3>

<section class="w-fit text-token card p-4 space-y-4">
    <p class="font-bold">6 ateliers de 2 heures</p>
<ul class="list">
	<li>Mon diabète et moi</li>
	<li>Mon alimentation (2 séances)</li>
    <li>Je teste ma forme</li>
    <li>Prendre soin de mes pieds</li>
    <li>Mon traitement</li>
</ul>
</section>
<p>
Chaque atelier est animé par un professionnel de santé spécifiquement formé à l’ETP et regroupe 4 à 6 participants.
</p>

<h3>Financement</h3>
<p>Ce programme est financé par l’Agence Régionale de Santé PACA, la participation est donc gratuite.</p>

<ProgramNav data={$page.url.pathname} />