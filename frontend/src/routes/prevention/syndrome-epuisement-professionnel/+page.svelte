<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import Fa from 'svelte-fa';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
    import ProgramNav from '$components/ProgramNav.svelte';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {capitalizeFirstLetter(
			$LL.PREVENTIVE_HEALTHCARE(),
			$language
		)}: {$LL.BURNOUT()}
	</title>
</svelte:head>
<span class="badge variant-filled-surface">{capitalizeFirstLetter($LL.PREVENTIVE_HEALTHCARE(), $language)}</span>

<h2>Épuisement professionnel</h2>

<h3>Définition</h3>
<p>Selon l’Institut national de recherche et de sécurité pour la prévention des accidents du travail et des maladies professionnelles (INRS):</p>
<blockquote cite="https://www.inrs.fr/risques/epuisement-burnout/ce-qu-il-faut-retenir.html">
	Le syndrome d'épuisement professionnel, ou burnout, est un ensemble de réactions consécutives à	des situations de stress professionnel chronique dans lesquelles la dimension de l’engagement est prédominante. Il se caractérise par 3 dimensions:
	<div class="pl-5 pr-2 py-2">
		<ul class="list-disc">
			<li>l’épuisement émotionnel : sentiment d’être vidé de ses ressources émotionnelles,</li>
			<li>
				la dépersonnalisation ou le cynisme : insensibilité au monde environnant, déshumanisation de la relation à l’autre (les usagers, clients ou patients deviennent des objets), vision
				négative des autres et du travail,
			</li>
			<li>
				le sentiment de non-accomplissement personnel au travail : sentiment de ne pas parvenir à répondre correctement aux attentes de l'entourage, dépréciation de ses résultats, sentiment de gâchis…
			</li>
		</ul>
	</div>
</blockquote>

<h3>Objectifs</h3>
<p>Ce programme a pour objectif de repérer, soutenir, accompagner et orienter les personnes en situation d’épuisement professionnel, de souffrance au travail.
</p>

<h3>Déroulement</h3>
<p>Deux ateliers d’une durée de deux heures:</p>
    <ul class="list-disc space-y-4 pl-4 p-2">
	<li>Faire le point sur ma situation au travail</li>
	<li>Gérer mon épuisement</li>
</ul>
<p>Les ateliers sont animés par une psychologue.</p>

<h3>Conditions d'accès</h3>
<p>Ce programme est porté et financé par {$facilityStore.formatted_name_definite_article}. La participation est donc gratuite.</p>

<ProgramNav data={$page.url.pathname} />
