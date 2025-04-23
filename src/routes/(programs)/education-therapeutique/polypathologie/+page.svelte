<script lang="ts">
	import { page } from '$app/state';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import * as m from "$msgs";	import ProgramNav from '$lib/ProgramNav/ProgramNav.svelte';
	import et3p from '$lib/assets/pdf/et3p/msa_education_therapeutique_patient_polypathologique.pdf';
	import crozetEtAl2017 from '$lib/assets/pdf/et3p/crozet_et_al_2017.pdf';
	import { Fa } from 'svelte-fa';
	import {
		faFilePdf,
		faDownload,
		faChevronDown,
		faChevronRight,
		faPeopleArrows,
		faPeopleGroup,
		faStopwatch,
	} from '@fortawesome/free-solid-svg-icons';
	import EntryUl from '$lib/components/Entry/EntryUl.svelte';
	import EntryContact from '$lib/components/Entry/EntryContact.svelte';
	import { programsNavLinks } from "$var/variables.ts";

	export let data;
	const mobileWidth: number = 1440;

	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<svelte:head>
	<title>
		Polypathologie - {capitalizeFirstLetter(m.OUTPATIENT_CLINIC_TPE())} - {capitalizeFirstLetter(
			$facilityStore.formatted_name
		)}
	</title>
</svelte:head>

<header>
	<div class="section-container">
		<span class="badge variant-filled-surface"
			>{capitalizeFirstLetter(m.OUTPATIENT_CLINIC_TPE())}</span
		>

		<h1 class="h1">Mieux vivre avec vos maladies chroniques</h1>
		<p>
			Le programme d'éducation thérapeutique du patient - polypathologie (ET3P) est un programme
			d'éducation thérapeutique collective pour des patients atteints de plusieurs maladies.
		</p>
		<p>
			Il a été développé avec des professionnels de <a href="https://fr.wikipedia.org/wiki/Soins_de_sant%C3%A9_primaires" class="anchor">soins primaires</a> (soins de proximité) partenaires de la MSA (<a href="https://fr.wikipedia.org/wiki/Mutualit%C3%A9_sociale_agricole" class="anchor">Mutualité
			sociale agricole</a>), avec des patients et avec des chercheurs.
		</p>
		<p>
			Les résultats favorables du modèle expérimental<a href="#cite_note-1" class="anchor"
				><sup>1</sup></a
			> ont convaincu la MSA de le mettre à disposition des équipes de soins primaire coordonnés.
		</p>
	</div>
</header>

<section>
	<div class="section-container">
		<h2 class="h2">Présentation</h2>
		<h3 class="h3">Qu'est-ce que les ateliers d’éducation thérapeutique?</h3>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>
					Ces ateliers pédagogiques et ludiques vous aident à mieux connaître votre ou vos maladies
					chroniques et à mieux vivre avec au quotidien.
				</li>
				<li>
					Organisés près de chez vous à la maison de santé, vous serez en groupe (en moyenne 8 personnes) pour participer pleinement aux ateliers.
				</li>
				<li>Une équipe de soignants formés à l’Education Thérapeutique vous accompagne.</li>
				<li>La participation est gratuite.</li>
				<li>
					Les ateliers ET3P de la MSA sont reconnus par les professionnels de santé pour leur
					qualité et leur efficacité.
				</li>
			</ul>
		</div>
		<p></p>
		<h3 class="h3">Polypathologie</h3>
		<p>
			La polypathologie est définie comme une association d’affections au long cours présentes chez
			un même individu, nécessitant une prise en charge et un suivi régulier et prolongé. On parle
			de polypathologie dès qu’un individu cumule au moins deux pathologies
		</p>
	</div>
</section>
<section>
	<div class="section-container">
		<h2 class="h2">À qui s’adressent les ateliers?</h2>
		<p>
			À toute personne concernée par une ou plusieurs de ces maladies, quelque soit son régime
			d'assurance maladie.
		</p>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>hypertension artérielle (HTA)</li>
				<li>diabète type 1 et type 2</li>
				<li>bronchite chronique (BPCO)</li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Comment se déroulent les ateliers ?</h2>
		<p>Un parcours sur mesure avec des objectifs éducatifs personnels.</p>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>
					Les accompagnants sont chaleureusement invités.
				</li>
				<li>
					Dix personnes maximum par atelier.
					</li>
					<li>
						<div class="flex items-baseline gap-1">
							<Fa icon={faStopwatch} size={'sm'} /><span>Durée d'une séance: une demi-journée.</span></div>
					</li>
			</ul>
		</div>
		<div class="grid grid-cols-1 lg:flex lg:flex-rows p-2 m-2 justify-items-center items-center">
			<div class="card variant-ringed-primary p-4 m-4 space-y-2 justify-items-center">
				<div class="flex flex-wrap gap-2">
					<div><Fa icon={faPeopleArrows} size={'lg'} /></div>
					<div class="text-lg">Entretien individuel</div>
				</div>
			</div>
			<div>
				{#if innerWidth <= mobileWidth}
					<Fa icon={faChevronDown} size={'lg'} />
				{:else}
					<Fa icon={faChevronRight} size={'lg'} />
				{/if}
			</div>

			<div class="card variant-ringed-primary p-4 m-4 space-y-2 justify-items-center">
				<div class="flex flex-wrap gap-2">
					<div><Fa icon={faPeopleGroup} size={'lg'} /></div>
					<div class="text-lg">3 séances collectives</div>
				</div>
				<p>Thèmes abordés:</p>
				<ul class="list-disc space-y-4 p-4">
					<li>Ma maladie / mes maladies</li>
					<li>Mon traitement / mes traitements</li>
					<li>Mes alertes, gestion des crises et incidents</li>
					<li>Mon activité physique</li>
					<li>Mon alimentation</li>
					<li>Je m'aide, tu m'aides, ils m'aident</li>
				</ul>
			</div>
			<div>
				{#if innerWidth <= mobileWidth}
					<Fa icon={faChevronDown} size={'lg'} />
				{:else}
					<Fa icon={faChevronRight} size={'lg'} />
				{/if}
			</div>
			<div class="card variant-ringed-primary p-4 m-4 space-y-2 justify-items-center">
				<div class="flex flex-wrap gap-2">
					<div><Fa icon={faPeopleArrows} size={'lg'} /></div>
					<div class="text-lg">Bilan individuel</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Quels sont les avantages pour votre santé ?</h2>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>Mieux vivre avec votre ou vos maladies.</li>
				<li>Savoir parler de votre ou de vos maladies.</li>
				<li>Trouver des appuis dans votre entourage.</li>
				<li>Identifier vos propres facteurs de risque.</li>
				<li>Adapter votre alimentation.</li>
				<li>Trouver une activité physique qui vous convient.</li>
				<li>Apprendre à gérer vos signaux d'alerte.</li>
				<li>Comprendre votre traitement.</li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Notre équipe</h2>
		<div class="py-4 lg:p-4">
			<EntryUl data={data.team}/>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Informations et inscription</h2>
		<div class="py-4 lg:p-4">
			<EntryContact entry={data.contact} avatar={true}/>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Ressources utiles</h2>
		<h3 class="h3">Pour les professionnels de santé</h3>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>
					"Vous souhaitez faire encore plus pour vos patients atteints de maladies chroniques ?"
					Plaquette de présentation du programme ET3P de la MSA à destination des professionnels.
					<a
						href={et3p}
						class="btn btn-sm variant-ghost"
						download="msa_education_therapeutique_patient_polypathologique"
					>
						<span><Fa icon={faDownload} /></span>
						<span>Télécharger</span>
						<span><Fa icon={faFilePdf} /></span></a
					>
				</li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Notes et références</h2>
		<div class="pl-5">
			<ol class="list-decimal space-y-4 p-4">
				<li id="cite_note-1">
					Cyril Crozet, Nadia Boudraï-Mihoubi, Mariane Alphonse, François Frété, Jean-François
					d’Ivernois. Expérimentation d’un modèle d’éducation thérapeutique pour patients
					polypathologiques dans les maisons de santé pluriprofessionnelles. Éducation Thérapeutique
					du Patient / Therapeutic Patient Education , 2017, 9 (1), pp.10107. 10.1051/tpe/2017009.
					hal-01685487 <a
						href={crozetEtAl2017}
						class="btn btn-sm variant-ghost"
						download="crozet_et_al_2017"
					>
						<span><Fa icon={faDownload} /></span>
						<span>Télécharger</span>
						<span><Fa icon={faFilePdf} /></span></a
					>
				</li>
			</ol>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<ProgramNav pathname={page.url.pathname} {programsNavLinks} />
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
