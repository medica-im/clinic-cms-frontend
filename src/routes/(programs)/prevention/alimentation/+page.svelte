<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import Fa from 'svelte-fa';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import ProgramNav from '$components/ProgramNav.svelte';
</script>

<svelte:head>
	<title>
		{$LL.EATING()} - {capitalizeFirstLetter(
			$LL.PREVENTIVE_HEALTHCARE(),
			$language
		)} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>
<header>
	<div class="section-container">
		<span class="badge variant-filled-surface"
			>{capitalizeFirstLetter($LL.PREVENTIVE_HEALTHCARE(), $language)}</span
		>

		<h1>Les bons gestes au quotidien pour un bon équilibre</h1>
		<p>Un programme de prévention pour l’équilibre alimentaire.</p>
	</div>
</header>

<section>
	<div class="section-container">
		<h2>Personnes concernées</h2>
		<p>
			Ce programme, porté par la MSP d’Avignon, s’adresse à toutes les personnes âgés de plus de 16
			ans.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2>Objectifs</h2>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>aider à développer autonomie alimentaire, bien-être et forme physique</li>
				<li>aider à faire des choix alimentaires plus éclairés en matière de santé</li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2>Ateliers</h2>

		<p>Les ateliers se déroulent en petits groupes et durent environ 2 heures.</p>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>Mangeons équilibré</li>
				<li>Cuisinons sainement</li>
				<li>Course et astuces</li>
				<li>Du sens dans nos assiettes</li>
				<li>Bougeons</li>
				<li>Restons zen</li>
				<li>Motivons-nous</li>
				<li>Mon corps mon amour</li>
				<li>Stop aux clichés</li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2>Intervenants</h2>

		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>psychologue</li>
				<li>diététicienne</li>
				<li>éducatrice sportive</li>
				<li>kinésithérapeute</li>
				<li>socio-esthéticienne</li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2>Conditions d'accès</h2>

		<p>
			Ce programme est financé par l’Agence Régionale de Santé PACA, la participation est donc
			gratuite.
		</p>
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
