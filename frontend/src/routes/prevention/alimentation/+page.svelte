<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import Fa from 'svelte-fa';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
    import ProgramNav from '$components/ProgramNav.svelte';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {capitalizeFirstLetter(
			$LL.PREVENTIVE_HEALTHCARE(),
			$language
		)}: {$LL.EATING()}
	</title>
</svelte:head>
<span class="badge variant-filled-surface"
	>{capitalizeFirstLetter($LL.PREVENTIVE_HEALTHCARE(), $language)}</span
>

<h2>Les bons gestes au quotidien pour un bon équilibre</h2>
<p>Un programme de prévention pour l’équilibre alimentaire.</p>

<h3>Personnes concernées</h3>
<p>Ce programme, porté par la MSP d’Avignon, s’adresse à toutes les personnes âgés de plus de 16 ans.</p>

<h3>Objectifs</h3>
<div class="pl-5">
	<ul class="list-disc space-y-2">
		<li>aider à développer autonomie alimentaire, bien-être et forme physique</li>
		<li>aider à faire des choix alimentaires plus éclairés en matière de santé</li>
	</ul>
</div>

<h3>Ateliers</h3>

<p>Les ateliers se déroulent en petits groupes et durent environ 2 heures.</p>
<div class="pl-5">
	<ul class="list-disc space-y-2">
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

<h3>Intervenants</h3>

<div class="pl-5">
	<ul class="list-disc space-y-2">
		<li>psychologue</li>
		<li>diététicienne</li>
		<li>éducatrice sportive</li>
		<li>kinésithérapeute</li>
		<li>socio-esthéticienne</li>
	</ul>
</div>

<h3>Conditions d'accès</h3>

<p>
	Ce programme est financé par l’Agence Régionale de Santé PACA, la participation est donc gratuite.
</p>

<ProgramNav data={$page.url.pathname} />