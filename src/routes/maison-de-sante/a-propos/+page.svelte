<script lang="ts">
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	export let data;
	import { facilityStore } from '$lib/store/facilityStore';
	import * as m from "$msgs";	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import { siteCount } from '$lib/store/facilityStore.ts';
	import OccupationsComma from '$lib/Organization/OccupationsComma.svelte';
	import Def from '$lib/components/TooltipDefinition/Def.svelte';
	import Fa from 'svelte-fa';
	import { programsNavLinks } from '$lib/links';
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
		faPeopleGroup,
		faArrowRight
	} from '@fortawesome/free-solid-svg-icons';

	let open = false;
	let ref = null;
</script>

<svelte:head>
		<title>
			{m.NAVBAR_ABOUT()} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
		</title>
</svelte:head>

<header>
	<div class="section-container">
		<h1 class="h1">Qu'est-ce qu'une maison de santé pluriprofessionnelle?</h1>
	</div>
</header>

<section>
	<div class="section-container">
		<h2 class="h2">Définition</h2>
		<p>Une maison de santé pluriprofessionnelle (MSP) est un mode d’exercice professionnel collectif et coordonné créé en 2007, développé pour répondre au besoin de "travailler ensemble" et aux problématiques de santé actuelles, notamment la prise en charge des maladies chroniques et le vieillissement de la population.</p>
		<p>Une MSP propose un ensemble de services de santé de proximité sans hébergement, ainsi que des actions de prévention, d'éducation à la santé et d'éducation thérapeutique. Elle constitue une réponse à l’évolution des modes d’exercice souhaitée par de nombreux professionnels de santé. Elle facilite la coordination des acteurs de prévention et d’éducation à la santé présents sur les territoires.</p>
		<p>Les professionnels de santé d'une MSP exercent à titre libéral.</p>
		<p>
			Une Maison de Santé Pluriprofessionnelle est une forme particulière d’<Def
				w="Équipe de soins primaires"
			/>. Il s’agit d’une organisation créée par les professionnels de santé eux-mêmes, en
			s’appuyant sur les relations existantes: les professionnels de santé {$facilityStore.city
				.from_label} échangeaient déjà avant de créer la MSP!
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Plusieurs professions</h2>
		<p>
			Une MSP doit être constituée au minimum de deux médecins généralistes et d'un professionnel
			paramédical.
		</p>
		<p>
			Notre maison de santé rassemble une grande diversité de professionnels: <OccupationsComma
				data={data.cardinalTypes}
			/>.
		</p>

		<p>Ces professionnels de santé assurent des soins de premier recours.</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Géographie</h2>
		<p>Les professionnels d'une maison de santé exerçent sur un ou plusieurs sites.</p>
		<p>Ainsi, malgré l'utilisation du terme "maison" dans son intitulé, "maison de santé pluriprofessionnelle" désigne un mode d'organisation d'une équipe de professionnels de santé et non un bâtiment.</p>
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
			{#if $siteCount > 1}
			{capitalizeFirstLetter($facilityStore.formatted_name_definite_article)} est multisite, les professionnels de santé associés sont répartis sur
			<a href="/sites" class="anchor">{$siteCount} sites</a>.
			{:else}
			{capitalizeFirstLetter($facilityStore.formatted_name_definite_article)} est monosite, tous les professionnels de santé sont regroupés au sein du même
			<a href="/sites" class="anchor">établissement</a>.
			{/if}
		</p>
	</div>
</section>
<section>
	<div class="section-container">
		<h2 class="h2">Projet de santé</h2>
		<p>
			L’action d’une MSP s’inscrit dans le cadre d’un
			<a href="/maison-de-sante/projet-de-sante" class="anchor">projet de santé</a>, établi à partir d’un
			diagnostic de l’état de santé de la population et témoignant d’un exercice coordonné entre les
			professionnels de santé souhaitant participer à ses activités.
		</p>
		<p>
			Les professionnels se mobilisent autour d'un <a href="/maison-de-sante/projet-de-sante" class="anchor"
				>projet de santé</a
			> commun bénéficiant à leurs patients.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Communication</h2>
		<p>Les professionnels de santé se transmettent les informations de manière organisée.</p>
		<div class="w-fit">
		<nav class="list-nav">
		<ul>
			<li>
				<a href="/maison-de-sante/reunion-concertation-pluriprofessionnelle" class="anchor"
						>
				<span><Fa icon={faPeopleGroup} /></span><span class="whitespace-normal underline"
					>Réunions de concertation pluriprofessionnelles</span
				></a
				>
			</li>
			<li>
				<a href="/maison-de-sante/dossier-patient" class="anchor">
				<span><Fa icon={faNetworkWired} /></span><span class="whitespace-normal underline"
					>Logiciel métier partagé</span
				></a>
			</li>
		</ul>
		</nav>
	</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Au-delà des soins</h2>
		<p>La MSP vise à offrir à sa patientèle un ensemble de services de santé de proximité.</p>
		<div class="w-fit text-token card p-4 space-y-4">
			<p class="font-bold">Nos services de santé</p>
			<nav class="list-nav">
				<ul>
					<li>
						<a href="/annuaire" class="anchor"
							><span class="badge variant-filled-primary"><Fa icon={faArrowRight} /></span>

							<span class="flex flex-wrap whitespace-normal text-left">Soins</span></a
						>
					</li>
					{#if  Object.values(programsNavLinks).find(x=>x.id=="prevention")}
					<li>
						<a href="/prevention" class="anchor"
							><span class="badge variant-filled-primary"><Fa icon={faArrowRight} /></span>

							<span class="flex flex-wrap whitespace-normal text-left">Prévention</span></a
						>
					</li>
					{/if}
					{#if  Object.values(programsNavLinks).find(x=>x.id=="education-sante")}
					<li>
						<a href="/education-sante" class="anchor"
							><span class="badge variant-filled-primary"><Fa icon={faArrowRight} /></span>

							<span class="flex flex-wrap whitespace-normal text-left">Éducation pour la santé</span
							></a
						>
					</li>
					{/if}
					{#if  Object.values(programsNavLinks).find(x=>x.id=="education-therapeutique")}
					<li>
						<a href="/education-therapeutique" class="anchor"
							><span class="badge variant-filled-primary"><Fa icon={faArrowRight} /></span>

							<span class="flex flex-wrap whitespace-normal text-left"
								>Éducation thérapeutique du patient</span
							></a
						>
					</li>
					{/if}
				</ul>
			</nav>
		</div>
	</div>
</section>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
</style>
