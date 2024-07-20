<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import { page } from '$app/stores';
	import ProgramNav from '$components/ProgramNav.svelte';
	import Carousel from '$components/Carousel/Carousel.svelte';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($LL.DISEASE.CANCER(), $language)} - {capitalizeFirstLetter(
			$LL.OUTPATIENT_CLINIC.TPE(),
			$language
		)} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)} -
	</title>
</svelte:head>

<header>
	<div class="section-container">
		<span class="badge variant-filled-surface"
			>{capitalizeFirstLetter($LL.OUTPATIENT_CLINIC.TPE(), $language)}</span
		>
		<h1 class="h1">Hope: accompagnement pendant un cancer</h1>
	</div>
</header>

<section>
	<div class="section-container">
		<h2 class="h2">Présentation</h2>
		<p>
			Ce programme comporte à la fois des ateliers en petits groupes, animés par un professionnel de
			santé spécifiquement formé à l’éducation thérapeutique, et des ateliers individuels.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Personnes concernées</h2>
		<p>
			Ce programme, porté par la MSP de Carpentras et répliqué sur Vedène, s’adresse à toute
			personne de plus de 18 ans ayant eu une annonce de cancer, en cours de traitement ou moins de
			12 mois après l’arrêt des traitements actifs.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Objectifs</h2>
		<div class="w-fit text-token card p-4 space-y-4">
			<div class="pl-5">
				<ul class="list-disc p-4 space-y-4">
					<li>Gérer les effets indésirables du traitement</li>
					<li>Faire face aux situations difficiles par la gestion du stress et des émotions</li>
					<li>Répondre aux questions du quotidien en lien avec la maladie</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Déroulement</h2>
		<div class="w-fit text-token card p-4 space-y-4">
			<p class="font-bold">4 ateliers collectifs de 2 heures:</p>
			<div class="pl-5">
				<ul class="list-disc p-4 space-y-4">
					<li>Ma santé et mes traitements</li>
					<li>Mon alimentation</li>
					<li>Bien dans ma tête</li>
					<li>Bien dans mon corps</li>
				</ul>
			</div>
		</div>

		<div class="w-fit text-token card p-4 space-y-4">
			<p class="font-bold">3 séances individuelles, à choisir parmi les intervenants suivants:</p>
			<div class="pl-5">
				<ul class="list-disc p-4 space-y-4">
					<li>Diététicienne</li>
					<li>Pharmacien</li>
					<li>Socio-esthéticienne</li>
					<li>Psychologue</li>
					<li>Sophrologue</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Conditions d'accès</h2>
		<p>
			Ce programme est financé par l’Agence Régionale de Santé PACA, la participation est donc
			gratuite.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<div class="max-w-2xl">
		<Carousel
			count={6}
			path={'education-therapeutique-cancer-atelier-0.jpg'}
			alt="Atelier HOPE, accompagnement pendant un cancer."
		/>
	</div>
	</div>
</section>

<section>
	<div class="section-container">
		<ProgramNav data={$page.url.pathname} />
	</div>
</section>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
</style>
