<script lang="ts">
	import LL from '$i18n/i18n-svelte.ts';
	import { language } from '$lib/store/languageStore.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import Fa from 'svelte-fa';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/state';
	import EntryUl from '$lib/components/Entry/EntryUl.svelte';
	import ProgramNav from '$components/ProgramNav.svelte';
	import bonnard from '$lib/assets/images/alimentation/pierre-bonnard-nature-morte-avec-patisseries.jpg';
	import arcimboldoVegetables1 from '$lib/assets/images/alimentation/arcimboldo-vegetables.jpg';
	import arcimboldoVegetables2 from '$lib/assets/images/alimentation/arcimboldo-vegetables-upsidedown.jpg';
	import chefGif from '$lib/assets/images/alimentation/colette-tatou.gif';
	import chefMp4 from '$lib/assets/images/alimentation/colette-tatou.mp4';
	import cuisineImg from '$lib/assets/images/alimentation/la-table-de-cuisine-paul-cezanne.jpg';
	import cart from '$lib/assets/images/alimentation/cart.jpg';
	import olympics from '$lib/assets/images/alimentation/jeux-olympiques.png';
	import apa from '$lib/assets/images/alimentation/apa.jpg';
	import penseur1 from '$lib/assets/images/alimentation/le-penseur-rodin-droit.jpg';
	import penseur2 from '$lib/assets/images/alimentation/le-penseur-rodin-gauche.jpg';
	import EntryContact from '$lib/components/Entry/EntryContact.svelte';
	import Workshop from './Workshop.svelte';

	export let data;
	const team = data.team;
	const updatedTeam = team.map((v) => {
		if (v.formatted_name == 'Audrey Francisod') {
			const newValue = structuredClone(v);
			newValue.occupations.pop();
			v.occupations = [{ name: 'dietitician', label: 'diététicienne' }];
			return newValue;
		} else {
			return v
		}
	});
	const getCoordinator = ()=> {
		const coordinator = data.team.find(e=>e.formatted_name=="Audrey Francisod");
		if ( coordinator ) {
		coordinator.phone_numbers = [
		{
			id: 1,
			phone: '0785669268',
			type: 'M',
			type_display: '',
			roles: null
		}
	];
	coordinator.emails = [
		{
			id: 1,
			email: 'vedene.msp@gmail.com',
			roles: null
		}
	];
	coordinator.occupations = [{ name: 'coordinator', label: 'coordinatrice' }];
		return coordinator
	}
};

	const workshops = [
		{
			n: 1,
			img: arcimboldoVegetables1,
			imgHover: arcimboldoVegetables2,
			alt: "",
			title: "Mangeons équilibré",
			duration: "2h00",
			summary: "Connaître les grands groupes d'aliments et savoir équilibrer ses repas dans toutes les situations du quotidien.",
			team: [updatedTeam[0]]
		},
		{
			n: 2,
			video: chefMp4,
			alt: "",
			title: "Cuisinons sainement",
			duration: "3h30",
			summary: "Cuisiner un repas complet, apprendre des astuces pour manger sainement et partager un repas ensemble. Convivialité garantie!",
			team: [updatedTeam[0]]
		},
		{
			n: 3,
			img: cart,
			alt: "",
			title: "Courses et astuces",
			duration: "2h00",
			summary: "Découvrir les pièges du marketing alimentaire et apprendre à les déjouer; savoir choisir les aliments de bonne qualité nutritionnelle à moindre coût.",
			team: [updatedTeam[0]]
		},
		{
			n: 4,
			img: bonnard,
			alt: "",
			title: "Du sens dans nos assiettes",
			duration: "2h00",
			summary: "Se reconnecter à son corps et à ses émotions pour réguler ses prises alimentaires et manger avec plaisir.",
			team: [updatedTeam[0]]
		},
		{
			n: 5,
			img: apa,
			alt: "",
			title: "Bougeons!",
			duration: "1h30",
			summary: "Retrouver la motivation pour commencer une activité physique adaptée à son état de santé et en fonction de ses capacités physiques. Être capable de refaire chez soi les exercices appris pendant l'atelier.",
			team: [updatedTeam[1]]
		},
		{
			n: 6,
			img: olympics,
			alt: "Pièce commémorative en honneur des Jeux Olympiques de Paris émise en 2021 représentant Marianne courant devant la tour Eiffel.",
			title: "Motivons-nous!",
			duration: "1h30",
			summary: "Travailler votre motivation pour mettre en place des changements durables concernant votre activité physique au quotidien: soulever les freins, se réconcilier avec l'activité physique, ...",
			team: [updatedTeam[1]]
		},
		{
			n: 7,
			img: penseur1,
			imgHover: penseur2,
			alt: "Statue Le Penseur d'Auguste Rodin",
			title: "Stop aux clichés",
			duration: "2h00",
			summary: "Questionner nos pensées et nos idées reçues sur le corps et l'alimentation.",
			team: [updatedTeam[0]]
		}
	]
</script>

<svelte:head>
	<title>
		{$LL.EATING()} - {capitalizeFirstLetter($LL.PREVENTIVE_HEALTHCARE(), $language)} - {capitalizeFirstLetter(
			$facilityStore.formatted_name,
			$language
		)}
	</title>
</svelte:head>
<header>
	<div class="section-container">
		<img
			class="h-auto lg:max-w-lg float-right p-2"
			src={cuisineImg}
			alt="A l'arrière-plan figurent une table, un carton à dessins, une frise décorative, et peut-être, replié, un paravent que Cézanne a décoré dans sa jeunesse. Comme en suspens, pommes et poires sont disposées à même la nappe ou dans un panier en osier, dont l'anse et les croisillons tressés font écho à ceux du pot de gingembre."
		/>
		<span class="badge variant-filled-surface"
			>{capitalizeFirstLetter($LL.PREVENTIVE_HEALTHCARE(), $language)}</span
		>

		<h1 class="h1">Les bons gestes au quotidien pour un bon équilibre</h1>
		<p>Un programme de prévention pour l’équilibre alimentaire.</p>
	</div>
</header>

<section>
	<div class="section-container">
		<h2 class="h2">Apprendre en mettant la main à la pâte</h2>
		<p>La maison de santé de Vedène organise pour vous des ateliers éducatifs et interactifs!</p>

		<h2 class="h2">Personnes concernées</h2>
		<p>Ce programme s’adresse à toutes les personnes de plus de 16 ans.</p>

		<h2 class="h2">Objectifs</h2>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>développer autonomie alimentaire, bien-être et forme physique</li>
				<li>faire des choix alimentaires plus éclairés pour sa santé</li>
			</ul>
		</div>

		<h2 class="h2">Ateliers</h2>

		<p>Les ateliers se déroulent en petits groupes.</p>
		<div class="pl-5">
		</div>
		<div class="flex flex-wrap gap-4 lg:gap-8">
		{#each workshops as workshop}
			<Workshop data={workshop} />
		{/each}
		</div>

		<h2 class="h2">Intervenants</h2>

		<div class="md:px-4">
			<div class="pl-5">
				<EntryUl data={updatedTeam} />
			</div>
		</div>

		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>psychologue</li>
				<li>diététicienne</li>
				<li>éducatrice sportive</li>
				<li>kinésithérapeute</li>
				<li>socio-esthéticienne</li>
			</ul>
		</div>

		<h2 class="h2">Conditions d'accès</h2>
		<p>
			Ateliers gratuits financés par l’Agence Régionale de Santé PACA. Une participation aux frais
			de 5€ est demandée pour l'atelier N°2 « cuisinons ensemble ».
		</p>

		<h2 class="h2">Informations et inscription</h2>
		<p>L'inscription est indispensable.</p>
		<div>
			<EntryContact entry={getCoordinator()} avatar={true} />
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<ProgramNav data={page.url.pathname} />
	</div>
</section>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 gap-4 lg:gap-8 lg:p-8 space-y-4 lg:space-y-8;
	}
</style>
