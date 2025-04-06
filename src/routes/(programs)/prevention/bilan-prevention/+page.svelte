<script lang="ts">
	import * as m from "$msgs";	import { language } from '$lib/store/languageStore.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import Fa from 'svelte-fa';
	import {
		faMicroscope,
		faVirus,
		faCircleMinus,
		faCirclePlus,
		faSquareCheck,
		faSquareXmark
	} from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import ProgramNav from '$components/ProgramNav.svelte';
	import autoQuestionnaire_18_25 from '$lib/assets/pdf/auto_questionnaire_18_25_ans.pdf';
	import autoQuestionnaire_45_50 from '$lib/assets/pdf/auto_questionnaire_45_50_ans.pdf';
	import autoQuestionnaire_60_65 from '$lib/assets/pdf/auto_questionnaire_60_65_ans.pdf';
	import autoQuestionnaire_70_75 from '$lib/assets/pdf/auto_questionnaire_70_75_ans.pdf';
	import VideoPlayer from '$lib/components/Video/VideoPlayer.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { RangeSlider } from '@skeletonlabs/skeleton';
	import Appointment from '$lib/components/Effector/Appointment/Appointment.svelte';

	let value: number;
	let max = 100;
	let min = 0;

	let videos = [
		{
			src: '/videos/cancer-col-uterus-depistage_1080.mp4',
			type: 'video/mp4'
		},
		{
			src: '/videos/cancer-col-uterus-depistage_720.mp4',
			type: 'video/mp4'
		},
		{
			src: '/videos/cancer-col-uterus-depistage_480.mp4',
			type: 'video/mp4'
		}
	];
	function getPdf() {
		if (18 <= value && value <= 25) {
			return autoQuestionnaire_18_25;
		} else if (45 <= value && value <= 50) {
			return autoQuestionnaire_45_50;
		} else if (60 <= value && value <= 65) {
			return autoQuestionnaire_60_65;
		} else if (70 <= value && value <= 75) {
			return autoQuestionnaire_70_75;
		}
	}
</script>

<svelte:head>
	<title>
		Bilan prévention - {capitalizeFirstLetter(m.PREVENTIVE_HEALTHCARE(), $language)} - {capitalizeFirstLetter(
			$facilityStore.formatted_name,
			$language
		)}
	</title>
</svelte:head>
<header>
	<div class="section-container">
		<span class="badge variant-filled-surface"
			>{capitalizeFirstLetter(m.PREVENTIVE_HEALTHCARE(), $language)}</span
		>

		<h1 class="h1">Mon Bilan Prévention</h1>
		<p>Prendre soin de soi est important.</p>
	</div>
</header>

<section>
	<div class="section-container">
		<h2 class="h2">Mon Bilan Prévention, qu’est-ce que c’est?</h2>
		<p>Mon Bilan Prévention est un dispositif novateur et ambitieux de prévention.</p>
		<p>
			Ce nouveau temps d’échange dédié à la prévention en santé est l’occasion de faire le point sur
			vos habitudes de vie et votre environnement avec un professionnel de santé. Vous pourrez ainsi
			comprendre et agir sur ce qui influence votre santé, bénéficier d’actions de dépistage et donc
			lutter contre l’apparition de maladies telles que le diabète ou encore les maladies
			cardiovasculaires et certains cancers.
		</p>
		<p>
			L’objectif est de vous permettre de devenir acteur de votre santé et de favoriser les
			comportements favorables à celle-ci afin de vous sentir mieux et de vivre plus longtemps en
			bonne santé.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Pour qui ?</h2>
		<p>
			Les bilans de prévention sont destinés à toutes les personnes à des âges clés de la vie,
			c’est-à-dire entre:
		</p>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>18&rarr;25</li>
				<li>45&rarr;50</li>
				<li>60&rarr;65</li>
				<li>70&rarr;75</li>
			</ul>
		</div>
		<p>
			Veuillez indiquer votre âge à l'aide du curseur pour savoir si vous êtes concerné par Mon Bilan Prévention et pour sélectionner le questionnaire adapté à votre tranche d'âge:
		</p>
		<form class="max-w-sm mx-auto">
		<label class="label">
			<span>Mon âge</span>
			<input class="input" title="Mon âge" type="number" bind:value={value} min={0} max={100} />
		</label>
		</form>
		<div class="p-4 m-4">
			<RangeSlider name="range-slider" bind:value={value} {max} step={1} ticked>
				<div class="flex justify-between items-center">
					<div class="font-bold">Mon âge</div>
					{#if value}
						<div>{value} {value > 1 ? 'ans' : 'an'}</div>
					{/if}
				</div>
			</RangeSlider>
		</div>
		{#if value}
			{#if (18 <= value && value <= 25) || (45 <= value && value <= 50) || (60 <= value && value <= 65) || (70 <= value && value <= 75)}
				<div class="flex space-x-2">
					<span><Fa icon={faSquareCheck} /></span><span
						>Vous êtes concerné par Mon Bilan Prévention!</span
					>
				</div>
			{:else}
				<div class="flex space-x-2">
					<span><Fa icon={faSquareXmark} /></span><span
						>Vous n'êtes pas concerné par Mon Bilan Prévention.</span
					>
				</div>
			{/if}
		{/if}
	</div>
</section>
<section>
	<div class="section-container">
		<h2 class="h2">Pourquoi prendre rendez-vous?</h2>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>
					Vous souhaitez bénéficier d’action pour prévenir votre risque de développer des maladies
					chroniques (diabète, hypertension, cancers …).
				</li>
				<li>
					Vous souhaitez faire le point sur votre alimentation, votre activité physique, vos
					consommations de tabac ou d’alcool.
				</li>
				<li>
					Vous vous interrogez sur votre sommeil, votre bien être mental, votre santé sexuelle.
				</li>
			</ul>
		</div>
		<p>
			Quelles que soient vos questions, les bilans de prévention permettent, grâce aux conseils d’un
			professionnel de santé, d’établir vos priorités en santé et d’agir pour l’améliorer.
		</p>
		<p>
			Si vous présentez des symptômes particuliers, une consultation médicale avec votre médecin est
			nécessaire.
		</p>
	</div>
</section>
<section>
	<div class="section-container">
		<h2 class="h2">Comment ça marche?</h2>
		<h3 class="h3">1. Je prépare Mon Bilan Prévention en répondant à un auto-questionnaire</h3>
		<p>
			Rapide et facile à remplir, l’auto-questionnaire me permettra de faire un premier point sur
			mes habitudes de vie et mes priorités en santé. Il est possible de remplir cet
			auto-questionnaire sur Mon Espace Santé.
		</p>
		{#if (18 <= value && value <= 25) || (45 <= value && value <= 50) || (60 <= value && value <= 65) || (70 <= value && value <= 75)}
		{#key value}
			<iframe src={getPdf()} title={'Auto-questionnaire'} class="w-full aspect-square"></iframe>
			{/key}
		{/if}
		<p>
			A noter : si je n’ai pas la possibilité de le remplir seul, je pourrai le faire pendant mon
			rendez-vous.
		</p>

		<h3 class="h3">2. Je prends rendez-vous</h3>
		<p>
			Chaque mardi matin les <a href="/annuaire/infirmiere" class="anchor">infirmières</a> réalisent
			les bilans prévention sur rendez-vous.
		</p>
		<ul class="list space-y-2">
			<li><Appointment appointment={{ phone: '+33559296994' }} /></li>
			<li>
				<Appointment
					appointment={{
						url: 'https://www.doctolib.fr/maison-de-sante/bayonne/cabinet-infirmier-bayonne'
					}}
				/>
			</li>
		</ul>
		<h3 class="h3">
			3. Je bénéficie de conseils personnalisés pour adopter, à mon rythme, des habitudes de vie
			plus favorables à ma santé
		</h3>
		<p>
			Pendant 30 à 45 minutes, vous échangez avec le professionnel de santé sur vos habitudes de vie
			afin de déterminer ensemble vos priorités en matière de santé. Les bilans de prévention sont
			l’occasion d’aborder vos besoins et envies, par exemple en matière d’alimentation, d’activité
			physique, de sommeil… Vous pouvez évoquer ainsi les sujets qui sont les plus importants pour
			vous tels que votre santé mentale, votre santé sexuelle, les questionnements liés à la
			ménopause ou la perte d’autonomie, la prévention et le dépistage des cancers…
		</p>

		<p>
			Mon Bilan Prévention permet, grâce aux conseils d’un professionnel de santé, d’avoir les clés
			pour identifier et modifier vos comportements, afin qu’ils soient plus favorables à votre
			santé. Lors de cet échange, vous définirez, avec l’aide du professionnel de santé, une ou deux
			de vos priorités en santé sur lesquelles vous souhaitez agir.
		</p>
		<h3 class="h3">
			4. Je remplis avec le professionnel de santé mon Plan personnalisé de prévention et, en cas de
			besoin de suivi, il m’oriente vers les professionnels ou structures adaptés
		</h3>
		<p>
			À la fin du bilan, vous rédigez, avec le professionnel de santé, votre Plan personnalisé de
			prévention en y indiquant vos objectifs prioritaires en santé et les actions concrètes et
			adaptées à votre quotidien à mettre en place à votre rythme. Ce Plan personnalisé de
			prévention sera ensuite transmis à votre médecin traitant (s’il n’est pas le professionnel de
			santé réalisant votre bilan).
		</p>
		<p>
			En cas de maladie non suivie ou non connue, vous êtes orienté directement vers un médecin
			(votre médecin traitant de préférence).
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Combien ça coûte ?</h2>

		<p>
			Les bilans de prévention aux âges clés de la vie sont pris en charge à 100% par l’Assurance
			maladie pour tous les assurés sociaux, sans avance de frais.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<ProgramNav data={$page.url.pathname} />
	</div>
</section>

<!--section>
	<div class="section-container">
		<h2 class="h2">En savoir plus</h2>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>
					<a
						href="https://www.depistagecancer-na.fr/depistage-cancer-col-uterus/
					"
						class="anchor">Dépistage des cancers. Centre de coordination Nouvelle-Aquitaine.</a
					>
				</li>
				<li>
					<a
						href="https://www.e-cancer.fr/Comprendre-prevenir-depister/Se-faire-depister/Depistage-du-cancer-du-col-de-l-uterus/Vos-questions-sur-le-HPV/Le-depistage"
						class="anchor"
						rel="external">Cancer du col de l'utérus: vos questions sur le dépistage</a
					>
				</li>
				<li>
					<a
						href="https://vaccination-info-service.fr/Les-maladies-et-leurs-vaccins/Les-Infections-a-Papillomavirus-humains-HPV"
						class="anchor"
						rel="external">Vaccination Info Service - Infections à Papillomavirus humains (HPV)</a
					>
				</li>
			</ul>
		</div>
	</div>
</section-->

<!--section>
	<div class="section-container">
		<h2 class="h2">Notes et références</h2>
		<div class="pl-5">
			<ol class="list-decimal space-y-4 p-4">
				<li id="cite_note-1">
					<a
						href="https://www.e-cancer.fr/Comprendre-prevenir-depister/Se-faire-depister/Depistage-du-cancer-du-col-de-l-uterus/Pourquoi-se-faire-depister"
						class="anchor"
						>Institut national du cancer – Cancer du col de l'utérus : pourquoi se faire dépister ?</a
					>
				</li>
				<li id="cite_note-2">
					<a
						href="https://www.e-cancer.fr/Expertises-et-publications/Catalogue-des-publications/Depliant-sur-la-vaccination-contre-les-cancers-HPV-papillomavirus-humains"
						class="anchor"
					>
						Institut national du cancer - Dépliant sur la vaccination contre les cancers HPV
						(papillomavirus humains)
					</a>
				</li>
			</ol>
		</div>
	</div>
</section-->

<style lang="postcss">
	.section-container {
		@apply mx-auto w-full max-w-7xl space-y-2 p-4 py-4 md:space-y-4 md:py-8;
	}
	.anchor {
		@apply underline underline-offset-4;
	}
</style>
