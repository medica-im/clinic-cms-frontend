<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import healthProjectPdf from '$lib/assets/projet_de_sante_MSP_Vedene.pdf';
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
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {capitalizeFirstLetter(
			$LL.HEALTH_EDUCATION(),
			$language
		)}: parentalité et petite enfance
	</title>
</svelte:head>

<span class="badge variant-filled-surface"
	>{capitalizeFirstLetter($LL.HEALTH_EDUCATION(), $language)}</span
>
<h2>Parentalité et petite enfance</h2>

<section class="w-fit text-token card p-4 m-4 bg-transparent space-y-4">
	<h3>Organisation</h3>
	<p>
		Ce programme est porté par {$facilityStore.formatted_name_definite_article}.
	</p>
</section>

<section class="w-fit text-token card p-4 m-4 bg-transparent space-y-4">
	<h3>Public</h3>
	<p>Il s’adresse à tous les parents d’enfants âgés de 0 à 3 ans.</p>
</section>

<div class="w-fit card p-4 m-4 bg-transparent space-y-4">
	<h3>Objectifs</h3>
	<div class="variant-soft-surface pl-5 pr-2 py-2">
		<ul class="list-disc space-y-4">
			<li>Informer et sécuriser sur la santé de l’enfant de 0 à 3 ans</li>
			<li>Approfondir et conforter les relations avec son enfant</li>
		</ul>
	</div>
</div>

<section class="w-fit card p-4 m-4 bg-transparent space-y-4">
	<h3>Ateliers</h3>
	<div class="variant-soft-surface pl-5 pr-2 py-2">
		<ul class="list-disc">
			<li>Sommeil et rythme de vie de bébé</li>
			<li>Approfondir et conforter les relations avec son enfant</li>
			<li>Gestion des émotions parents / bébé</li>
			<li>Alimentation de l’enfant: diversification et équilibrage</li>
			<li>Eveil et psychomotricité de l’enfant</li>
			<li>Les écrans</li>
			<li>Parole et langage</li>
			<li>Portage physiologique</li>
			<li>Massage bébé</li>
		</ul>
	</div>
</section>

<section class="w-fit text-token card p-4 m-4 bg-transparent space-y-4">
	<h3>Lieux</h3>
	<p>Les ateliers ont lieu dans ces structures:</p>
	<div class="variant-soft-surface pl-5 pr-2 py-2">
		<ul class="list-disc space-y-4">
			<li>Lieux d’accueil enfants-parents</li>
			<li>Crèches</li>
			<li>Écoles maternelles</li>
			<li>Associations</li>
		</ul>
	</div>
</section>

<section class="w-fit bg-transparent text-token card p-4 m-4 space-y-4">
	<h3>Intervenantes</h3>
	<div class="variant-soft-surface pl-5 pr-2 py-2">
		<ul class="list-disc space-y-4">
			<li>Diététicienne</li>
			<li>Psychologue</li>
			<li>Psychomotricienne</li>
			<li>Orthophoniste</li>
			<li>Infirmière</li>
			<li>Kinésithérapeute</li>
		</ul>
	</div>
</section>

<section class="w-fit card bg-transparent p-4 m-4 space-y-4">
	<h3>Financement</h3>
	<p>
		Ce programme est financé par l’Agence Régionale de Santé PACA, la participation est donc
		gratuite.
	</p>
</section>
