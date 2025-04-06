<script lang="ts">
	import * as m from "$msgs";	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import Fa from 'svelte-fa';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import ProgramNav from '$components/ProgramNav.svelte';
	import VideoPlayer from '$lib/components/Video/VideoPlayer.svelte';

	let videos = [
		{
			src: "/videos/mrtc_1080.mp4",
			type: "video/mp4"
	    },
		{
			src: "/videos/mrtc_720.mp4",
			type: "video/mp4"
	    },
		{
			src: "/videos/mrtc_540.mp4",
			type: "video/mp4"
	    }
	];
</script>

<svelte:head>
	<title>
		Hypertension - {capitalizeFirstLetter(m.PREVENTIVE_HEALTHCARE(), $language)} - {capitalizeFirstLetter(
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

		<h1 class="h1">{capitalizeFirstLetter(m.CHILDHOOD_OBESITY(), $language)}</h1>
		<p>« Mission: retrouve ton cap », prévention du surpoids et de l’obésité infantile.</p>
	</div>
</header>

<section>
	<div class="section-container">
		<h2 class="h2">Présentation</h2>
		<p>
			Le programme « Mission : retrouve ton cap » permet aux enfants de 3 à 12 ans en surpoids ou à
			risque de le devenir de bénéficier d’une prise en charge précoce et pluridisciplinaire
			(diététique, psychologique, activité physique).
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Présentation en vidéo</h2>
		<div class="py-4">
		<VideoPlayer data={videos}/>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Personnes concernées</h2>
		<p>Enfants de 3 à 12 ans.</p>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>en surpoids ou en obésité non compliquée</li>
				<li>
					présentant des signes d’alerte sur leur courbe de corpulence associés à un risque de
					développer un surpoids ou une obésité
				</li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">De quelles prestations l'enfant peut-il bénéficier?</h2>
		<p>L'enfant peut bénéficier pendant 2 ans:</p>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>1 bilan diététique</li>
				<li>1 bilan d’activité physique</li>
				<li>1 bilan psychologique</li>
				<li>6 rendez-vous de suivi nutritionnel et/ou psychologique</li>
			</ul>
		</div>
		<p>
			Les six rendez-vous de suivi sont renouvelables deux fois si besoin. L'enfant peut donc
			bénéficier d'un total de dix-huit rendez-vous au maximum.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Intervenants</h2>

		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>Rébecca Medou, psychologue</li>
				<li><a href="/pole-sante-gare/dieteticien/benjamine-briaud" class="anchor">Benjamine Briaud, diététicienne</a></li>
				<li><a href="/pole-sante-gare/kinesitherapeute/damien-ibaremborde" class="anchor">Damien Ibaremborde, kinésithérapeute</a></li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Conditions d'accès</h2>
		<p>
			Ce programme est pris en charge à 100% par l’Assurance Maladie, sans avance de frais par la
			famille.
		</p>
		<p>Les bilans et les rendez-vous de suivi sont prescrits par le médecin de l’enfant – qui peut être un médecin généraliste, un pédiatre, un médecin exerçant dans un service de protection maternelle et infantile (PMI) –, ou un médecin scolaire.</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Référent</h2>
		<p>
			<a class="anchor" href="/pole-sante-gare/pediatre/nadine-larrede-marsault">Nadine Larrède-Marsault</a>,
			pédiatre.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Ressources utiles pour les enfants et les parents</h2>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>la présentation du programme <a href="https://www.ameli.fr/bayonne/assure/remboursements/rembourse/mission-retrouve-ton-cap" rel="external" class="anchor">« Mission : retrouve ton cap »</a> sur le site de l'Assurance Maladie</li>
				<li>le <a href="https://www.mangerbouger.fr/" rel="external" class="anchor">site « manger bouger »</a> délivre des conseils et des astuces pour manger mieux et bouger plus</li>
			</ul>
		</div>
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
	.anchor {
		@apply underline underline-offset-4;
	}
</style>
