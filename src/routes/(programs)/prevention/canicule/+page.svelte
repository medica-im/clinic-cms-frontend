<script lang="ts">
	import { page } from '$app/stores';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import * as m from '$msgs';
	import ProgramNav from '$lib/ProgramNav/ProgramNav.svelte';
	import buvezEau from '$lib/assets/images/canicule/buvez-eau.png';
	import mouillezCorps from '$lib/assets/images/canicule/mouillez-corps.png';
	import restezAuFrais from '$lib/assets/images/canicule/restez-au-frais.png';
	import fermerVoletsFenetres from '$lib/assets/images/canicule/fermez-volets-fenetres.png';
	import activitesDouces from '$lib/assets/images/canicule/activites-douces.png';
	import mangezFraixEquilibre from '$lib/assets/images/canicule/mangez-frais-equilibre.png';
	import evitezAlcool from '$lib/assets/images/canicule/evitez-alcool.png';
	import prenezNouvellesFragiles from '$lib/assets/images/canicule/prenez-nouvelles-fragiles.png';
	import { Fa } from 'svelte-fa';
	import {
		faHouseMedicalCircleExclamation,
		faTemperatureHigh,
		faCalendarDays,
		faMoon,
		faSun,
		faTriangleExclamation,
		faSms,
		faMobile,
	} from '@fortawesome/free-solid-svg-icons';
	import { programsNavLinks } from '$var/variables.ts';
	import Phone from '$lib/Directory/Phone.svelte';

	const cardData = [
		{
			img: restezAuFrais,
			alt: "Personnage protégé du soleil à l'intérieur d'une maison fraîche.",
			title: "Restez au frais",
			subtitle: "chez soi ou dans un lieu rafraîchi"
		},
		{
			img: buvezEau,
			alt: "Une carafe et un verre d'eau rempli",
			title: "Buvez de l'eau",
			subtitle: "sans attendre d'avoir soif"
		},
		{
			img: mouillezCorps,
			alt: "Un vaporisateur d'eau",
			title: 'Mouillez-vous le corps',
			subtitle: null
		},
		{
			img: fermerVoletsFenetres,
			alt: "Fenêtre aux volets fermés surplombée par un soleil rouge.",
			title: 'Fermez les volets et fenêtres',
			subtitle: null
		},
		{
			img: activitesDouces,
			alt: "Personne pratiquant le yoga.",
			title: 'Privilégiez les activités douces',
			subtitle: null
		},
		{
			img: mangezFraixEquilibre,
			alt: "Assiette creuse contenant des aliments variés.",
			title: "Mangez frais et équilibré",
			subtitle: null
		},
		{
			img: evitezAlcool,
			alt: "Cercle barré contenant une bouteille de vin et un verre à pied.",
			title: "Évitez l'alcool",
			subtitle: null
		},
		{
			img: prenezNouvellesFragiles,
			alt: "Smartphone envoyant un SMS.",
			title: 'Prenez des nouvelles des plus fragiles',
			subtitle: null
		}
	];

	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<svelte:head>
	<title>
		Canicule - {capitalizeFirstLetter(m.PREVENTIVE_HEALTHCARE())} - {capitalizeFirstLetter(
			$facilityStore.formatted_name
		)}
	</title>
</svelte:head>

<header>
	<div class="section-container">
		<span class="badge variant-filled-surface"
			>{capitalizeFirstLetter(m.PREVENTIVE_HEALTHCARE())}</span
		>

		<h1 class="h1">Canicule</h1>
		<dl class="list-dl">
			<div>
				<span class="w-6"><Fa size="1.5x" icon={faTemperatureHigh} /></span>
				<span class="flex-auto">
					<dt>Période de chaleur extrême</dt>
					<dd>
						Les températures sont anormalement élevées, dépassant les seuils départementaux fixés
						par Météo-France. Un épisode de canicule est atteint en Vaucluse lorsque les indices
						biométéorologiques dépassent les seuils établis de 36°C le jour et 21°C la nuit durant
						72h consécutives
					</dd>
				</span>
			</div>
			<div>
				<span class="w-6"><Fa size="1.5x" icon={faCalendarDays} /></span>
				<span class="flex-auto">
					<dt>Durée</dt>
					<dd>La canicule dure au moins trois jours et trois nuits consécutifs.</dd>
				</span>
			</div>
			<div>
				<span class="flex space-x-1 w-6"><Fa icon={faSun} /><Fa icon={faMoon} /></span>
				<span class="flex-auto">
					<dt>Intensité</dt>
					<dd>Les températures sont élevées, même la nuit.</dd>
				</span>
			</div>
			<div>
				<span class="w-6"><Fa size="1.5x" icon={faHouseMedicalCircleExclamation} /></span>
				<span class="flex-auto">
					<dt>Conséquences</dt>
					<dd>
						Les fortes chaleurs peuvent engendrer des problèmes de santé, comme la déshydratation,
						des coups de chaleur, l'aggravation de maladies chroniques, et dans les cas les plus
						graves, des troubles de la conscience, voire le décès.
					</dd>
				</span>
			</div>
		</dl>
	</div>
</header>
<section>
	<div class="section-container">
		<h2 class="h2">Conseils de prévention</h2>
		<div class="flex flex-wrap gap-6 place-content-center lg:place-content-start">
			{#each cardData as data}
				<div class="card variant-ghost card-hover p-4 h-80 w-80">
					<header class="flex h-52 place-content-center">
						<img src={data.img} class="h-48 object-scale-down" alt={data.alt} />
					</header>
					<div class="flex flex-wrap place-content-center py-4 space-y-4">
						<h4 class="h4 text-center" data-toc-ignore>{data.title}</h4>
						{#if data.subtitle}
							<h6 class="h6 text-center" data-toc-ignore>{data.subtitle}</h6>
						{/if}
						<!--article>
						<p></p>
					</article-->
					</div>
					<!--footer class="p-4 flex justify-start items-center space-x-4">
				<div class="flex-auto flex justify-between items-center">
				</div>
			</footer-->
				</div>
			{/each}
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Quels sont les effets de la chaleur?</h2>
			<div class="pl-5">
			  <ul class="list-disc space-y-4 p-4">
				<li>Crampes</li>
				<li>Fatigue inhabituelle</li>
				<li>Maux de tête</li>
				<li>Fièvre &gt; 38°C</li>
				<li>Vertiges</li>
				<li>Nausées</li>
				<li>Propos incohérents</li>
			  </ul>
			<div class="alert variant-filled-warning items-center">
				<div><Fa size="2x" icon="{faTriangleExclamation}"/></div>
				<p>Si vous voyez quelqu’un victime d’un malaise, de propos incohérents ou de fortes fièvres, appelez le <span class="inline-flex items-baseline space-x-1"><Fa icon={faMobile} size="sm"/> <a href="tel:15" class="anchor">15</a></span>. Les personnes sourdes ou malentendantes peuvent envoyer un SMS à Urgence <span class="inline-flex items-baseline space-x-1"><Fa icon={faSms} size="sm" /><a class="anchor" href="sms:114">114</a></span>.</p>
			</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Ressources utiles</h2>
		<h3 class="h3">Canicule info service</h3>
		<p></p>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li><Phone data={{type: "M", phone: "0 800 06 66 66"}}/></li>
				<li>Appel et service gratuits</li>
				<li>Ouvert uniquement pendant les périodes de fortes chaleurs</li>
			</ul>
		</div>
		<h3 class="h3">Pages web</h3>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>
					<a href="https://www.santepubliquefrance.fr/determinants-de-sante/climat/fortes-chaleurs-canicule" rel="external" class="anchor"
						>Fortes chaleurs, canicule - Santé publique France</a
					>
				</li>
				<li>
					<a
						href="https://vigilance.meteofrance.fr/fr/vaucluse"
						rel="external"
						class="anchor">Vigilance météo Vaucluse - Météo France</a
					>
				</li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<ProgramNav pathname={$page.url.pathname} {programsNavLinks} />
	</div>
</section>

<style lang="postcss">
	.section-container {
		@apply mx-auto w-full max-w-7xl space-y-2 p-4 py-4 md:space-y-4 md:py-8;
	}
	dt {
		font-weight: bold;
	}
</style>
