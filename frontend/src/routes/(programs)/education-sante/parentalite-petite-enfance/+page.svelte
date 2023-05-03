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
	import { page } from '$app/stores';
	import ProgramNav from '$components/ProgramNav.svelte';
</script>

<svelte:head>
	<title>
		Parentalité et petite enfance - {capitalizeFirstLetter($LL.HEALTH_EDUCATION(), $language)} - {capitalizeFirstLetter(
			$facilityStore.formatted_name,
			$language
		)} -
	</title>
</svelte:head>
<div>
	<header>
		<div class="section-container">
			<span class="badge variant-filled-surface"
				>{capitalizeFirstLetter($LL.HEALTH_EDUCATION(), $language)}</span
			>
			<h2>Parentalité et petite enfance</h2>
		</div>
	</header>

	<section>
		<div class="section-container">
			<h3>Organisation</h3>
			<p>
				Ce programme est porté par {$facilityStore.formatted_name_definite_article}.
			</p>
		</div>
	</section>
	<section>
		<div class="section-container">
			<h3>Public</h3>
			<p>Il s’adresse à tous les parents d’enfants âgés de 0 à 3 ans.</p>
		</div>
	</section>
	<section>
		<div class="section-container">
			<h3>Objectifs</h3>
			<ul class="list-disc">
				<li>Informer et sécuriser sur la santé de l’enfant de 0 à 3 ans</li>
				<li>Approfondir et conforter les relations avec son enfant</li>
			</ul>
		</div>
	</section>
	<section>
		<div class="section-container">
			<h3>Ateliers</h3>
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
	<section>
		<div class="section-container">
			<h3>Lieux</h3>
			<p>Les ateliers ont lieu dans ces structures:</p>
			<ul class="list-disc">
				<li>Lieux d’accueil enfants-parents</li>
				<li>Crèches</li>
				<li>Écoles maternelles</li>
				<li>Associations</li>
			</ul>
		</div>
	</section>
	<section>
		<div class="section-container">
			<h3>Intervenantes</h3>
			<ul class="list-disc">
				<li>Diététicienne</li>
				<li>Psychologue</li>
				<li>Psychomotricienne</li>
				<li>Orthophoniste</li>
				<li>Infirmière</li>
				<li>Kinésithérapeute</li>
			</ul>
		</div>
	</section>
	<section>
		<div class="section-container">
			<h3>Financement</h3>
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
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
	.list-disc {
		@apply pl-4 space-y-4;
	}
</style>
