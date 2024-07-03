<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import Fa from 'svelte-fa';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import ProgramNav from '$components/ProgramNav.svelte';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($LL.BURNOUT(), $language)} - {capitalizeFirstLetter(
			$LL.PREVENTIVE_HEALTHCARE(),
			$language
		)} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>

<header>
	<div class="section-container">
		<span class="badge variant-filled-surface"
			>{capitalizeFirstLetter($LL.PREVENTIVE_HEALTHCARE(), $language)}</span
		>

		<h1>Épuisement professionnel</h1>
	</div>
</header>

<section>
	<div class="section-container">
		<h2>Définition</h2>
		<p>
			Selon l’Institut national de recherche et de sécurité pour la prévention des accidents du
			travail et des maladies professionnelles (INRS):
		</p>
		<blockquote cite="https://www.inrs.fr/risques/epuisement-burnout/ce-qu-il-faut-retenir.html">
			Le syndrome d'épuisement professionnel, ou burnout, est un ensemble de réactions consécutives
			à des situations de stress professionnel chronique dans lesquelles la dimension de
			l’engagement est prédominante. Il se caractérise par 3 dimensions:
			<div class="pl-5">
			<ul class="list-disc space-y-4 p-4 pl-5">
				<li>l’épuisement émotionnel : sentiment d’être vidé de ses ressources émotionnelles,</li>
				<li>
					la dépersonnalisation ou le cynisme : insensibilité au monde environnant, déshumanisation
					de la relation à l’autre (les usagers, clients ou patients deviennent des objets), vision
					négative des autres et du travail,
				</li>
				<li>
					le sentiment de non-accomplissement personnel au travail : sentiment de ne pas parvenir à
					répondre correctement aux attentes de l'entourage, dépréciation de ses résultats,
					sentiment de gâchis…
				</li>
			</ul>
		</div>
		</blockquote>
	</div>
</section>

<section>
	<div class="section-container">
		<h2>Objectifs</h2>
		<p>
			Ce programme a pour objectif de repérer, soutenir, accompagner et orienter les personnes en
			situation d’épuisement professionnel, de souffrance au travail.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2>Déroulement</h2>
		<p>Deux ateliers d’une durée de deux heures:</p>
		<div class="pl-5">
		<ul class="list-disc space-y-4 p-4">
			<li>Faire le point sur ma situation au travail</li>
			<li>Gérer mon épuisement</li>
		</ul>
		</div>
		<p>Les ateliers sont animés par une psychologue.</p>
	</div>
</section>
<section>
	<div class="section-container">
		<h2>Conditions d'accès</h2>
		<p>
			Ce programme est porté et financé par {$facilityStore.formatted_name_definite_article}. La
			participation est donc gratuite.
		</p>
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
</style>
