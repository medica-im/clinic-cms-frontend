<script lang="ts">
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	//import Popover from "carbon-components-svelte/src/Button/Button.svelte";
	export let data;
	import { facilityStore } from '$lib/store/facilityStore';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import { siteCount } from '$lib/store/facilityStore';
	import OccupationsComma from '$lib/Organization/OccupationsComma.svelte';
	import Def from '$lib/components/TooltipDefinition/Def.svelte';
	import Fa from 'svelte-fa';
	import {
		faInfo,
		faTimeline,
		faBookMedical,
		faHouse,
		faMapLocationDot,
		faAddressBook,
		faEnvelope,
		faBlog,
		faUserPlus,
		faUser,
		faCircleNodes,
		faMapPin,
		faNetworkWired,
		faHandshake,
		faPeopleGroup
	} from '@fortawesome/free-solid-svg-icons';

	let promise;
	let open = false;
	let ref = null;
	$: (promise = facilityStore.load()), $language;
</script>

<svelte:head>
	{#await promise}
		<title>
			{capitalizeFirstLetter(data.facilityData.formatted_name, $language)} - {$LL.NAVBAR.ABOUT()}
		</title>
	{:then}
		<title>
			{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {$LL.NAVBAR.ABOUT()}
		</title>
	{/await}
</svelte:head>
<h2>Qu'est-ce qu'une maison de santé pluriprofessionnelle?</h2>

<p>
	Une Maison de Santé Pluriprofessionnelle (<Def w="MSP" />) est une forme particulière d’<Def
		w="Équipe de soins primaires"
	/>. Il s’agit d’une organisation créée par les professionnels de santé eux-mêmes, en s’appuyant
	sur les relations existantes: les professionnels de santé {$facilityStore.city.from_label} échangeaient
	déjà avant de créer la <Def w="MSP" />!
</p>
<h3>Plusieurs professions</h3>
<p>
	Une <Def w="MSP" /> doit être constituée au minimum de deux médecins généralistes et d'un professionnel
	paramédical.
</p>
<p>
	Notre maison de santé rassemble une grande diversité de professionnels: <OccupationsComma
		oC={data.occupationsCardinal}
	/>.
</p>
<p>
	L’action d’une <Def w="MSP" /> s’inscrit dans le cadre d’un
	<a href="/maison-de-sante/projet-de-sante">projet de santé</a>, établi à partir d’un diagnostic de
	l’état de santé de la population et témoignant d’un exercice coordonné entre les professionnels de
	santé souhaitant participer à ses activités.
</p>

<h3>En résumé</h3>
<p>
	Une <Def w="MSP" /> regroupe des professionnels de santé qui assurent des soins de premier recours.
</p>
<h4>Géographie</h4>
<p>Ils exerçent sur un ou plusieurs sites.</p>
<div class="card variant-ringed-primary p-4 max-w-fit">
	Deux types de MSP selon la répartition géographique des professionnels.
	<dl class="list-dl">
		<dt class="font-bold">
			<div class="space-x-1">
				<div><Fa icon={faMapPin} /></div>
				<div>Monosite</div>
			</div>
		</dt>
		<dd>Tous les professionnels qui la constituent exercent dans les mêmes locaux.</dd>
		<dt class="font-bold">
			<div class="space-x-1">
				<div><Fa icon={faCircleNodes} /></div>
				<div>Multisite</div>
			</div>
		</dt>
		<dd>Les professionnels sont associés mais répartis sur deux sites différents ou plus.</dd>
	</dl>
</div>
<p>
	{capitalizeFirstLetter($facilityStore.formatted_name_definite_article)} est multisite, elle regroupe
	<a href="/sites">{$siteCount} sites</a>.
</p>
<h4>Projet de santé commun</h4>
<p>
	Ces professionnels se mobilisent autour d’un <a href="/maison-de-sante/projet-de-sante"
		>projet de santé</a
	> commun bénéficiant à leurs patients.
</p>
<h4>Communication</h4>
<p>Les professionnels de santé se transmettent les informations de manière organisée.</p>
<ul class="list">
	<li>
		<span><Fa icon={faPeopleGroup} /></span><span
			><a href="/maison-de-sante/reunion-concertation-pluriprofessionnelle"
				>Réunions de concertation pluriprofessionnelles</a
			></span
		>
	</li>
	<li>
		<span><Fa icon={faNetworkWired} /></span><span
			><a href="/maison-de-sante/dossier-patient">Logiciel métier partagé</a>.</span
		>
	</li>
</ul>

<h4>Au-delà des soins</h4>
<p>
	La <Def w="MSP" /> vise à offrir à sa patientèle un ensemble de services de santé de proximité.
</p>
<section class="w-fit text-token card p-4 space-y-4">
	<p class="font-bold">Nos services de santé</p>
	<nav class="list-nav">
		<ul>
			<li>
				<a href="/annuaire">Soins</a></li>
			<li><a href="/prevention/definition">Prévention</a></li>
			<li><a href="/education-sante/definition">Éducation à la santé</a></li>
			<li><a href="/education-therapeutique/definition">Éducation thérapeutique du patient</a></li>
		</ul>
	</nav>
</section>
