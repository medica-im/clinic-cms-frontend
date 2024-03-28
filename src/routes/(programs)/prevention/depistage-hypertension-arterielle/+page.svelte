<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import Fa from 'svelte-fa';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import ProgramNav from '$components/ProgramNav.svelte';
	import bloodPressureSelfMeasurementPdf from '$lib/assets/pdf/releve_automesure_tensionnelle_cnam.pdf';
</script>

<svelte:head>
	<title>
		Hypertension - {capitalizeFirstLetter($LL.PREVENTIVE_HEALTHCARE(), $language)} - {capitalizeFirstLetter(
			$facilityStore.formatted_name,
			$language
		)}
	</title>
</svelte:head>
<header>
	<div class="section-container">
		<span class="badge variant-filled-surface"
			>{capitalizeFirstLetter($LL.PREVENTIVE_HEALTHCARE(), $language)}</span
		>

		<h1 class="h1">{capitalizeFirstLetter($LL.SCREENING.HYPERTENSION(), $language)}</h1>
		<p>
			Dépistage et suivi de l'hypertension artérielle (HTA) par l'automesure tensionnelle à
			domicile.
		</p>
	</div>
</header>

<section>
	<div class="section-container">
		<h2 class="h2">Personnes concernées</h2>
		<p>Personnes âgées de plus de 40 ans.</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Objectifs</h2>
		<p>
			Objectifs de l’automesure tensionnelle réalisée en dehors du cabinet médical et au domicile du
			patient:
		</p>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>découvrir une HTA non connue</li>
				<li>confirmer le diagnostic d’HTA</li>
				<li>évaluer l'efficacité du traitement</li>
				<li>surveiller l’évolution de l'HTA</li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Prendre sa tension artérielle par automesure</h2>
		<h3 class="h3">Tensiomètre</h3>
		<p>
			Pour une mesure fiable de la tension artérielle, nous vous prêterons un tensiomètre
			électronique de bras muni d’un brassard adapté à l’épaisseur et à la longueur de votre bras.
		</p>
		<h3 class="h3">Comment prendre sa tension artérielle?</h3>
		<h4 class="h4">Se préparer à la prise de tension artérielle</h4>
		<p>Pour que les résultats soient bien fiables, mettez-vous dans des conditions optimales.</p>
		<p>
			Pendant les 30 minutes avant la mesure, ne faites pas d'exercice physique, ne fumez pas,
			évitez de manger et ne consommez pas de caféine.
		</p>

		<p>
			Pour prendre votre tension artérielle, installez-vous dans une pièce calme, à température
			confortable. Asseyez-vous et restez assis pendant 3 à 5 minutes. Ne parlez pas pendant la
			prise des mesures et entre les prises.
		</p>

		<h4 class="h4">La mesure tensionnelle</h4>
		<p>L’automesure de tension artérielle nécessite le respect de la «règle des 3»:</p>

		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>
					réaliser 3 mesures espacées d’une à deux minutes, le matin avant le petit–déjeuner et
					avant d’avoir pris vos médicaments;
				</li>
				<li>
					effectuer également 3 mesures espacées d’une à deux minutes le soir avant de vous coucher;
				</li>
				<li>répéter ces mesures biquotidiennes pendant 3 jours de suite.</li>
			</ul>
		</div>
		<p>À chaque fois, procédez selon les étapes suivantes:</p>
		<div class="pl-5">
			<ol class="list-decimal	space-y-4 p-4">
				<li>
					Asseyez–vous confortablement sur une chaise. Votre dos est soutenu par le dossier de la
					chaise. Vos jambes ne sont pas croisées et vos pieds sont posés à plat sur le sol.
				</li>
				<li>
					Placez votre bras nu sur une table. Le milieu du bras est au niveau du cœur.</li>
					<li>Posez le
					brassard sur votre bras nu, en respectant le sens indiqué sur l'appareil. Mettez
					l’appareil en marche : le brassard se gonfle, puis se dégonfle automatiquement. Pendant la
					mesure, vous ne devez ni parler, ni bouger, ni serrer le poing.
				</li>
				<li>
					L’écran du tensiomètre affiche deux valeurs exprimées en millimètres de mercure (mm Hg).
					Le premier chiffre, le plus élevé, correspond à la pression artérielle systolique (mesurée
					quand le cœur se contracte pour éjecter le sang dans les artères). Le second chiffre
					désigne la pression artérielle diastolique (relevée quand le cœur est relâché et qu’il se
					remplit de sang).
				</li>
				<li>
					Notez soigneusement ces valeurs sur un relevé d'automesure tensionnelle.</li>
					<li>Communiquez à
					votre médecin les 18 mesures effectuées sur les 3 jours, pour qu’il puisse en calculer la
					moyenne.
				</li>
			</ol>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">À qui puis-je m'adresser?</h2>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>
					Les <a href="/annuaire/pharmacien" class="anchor">pharmaciens</a> de la
					<a href="/sites/pharmacie-saint-esprit" class="anchor">pharmacie Saint-Esprit</a>.
				</li>
				<li>
					Les <a href="/annuaire/infirmiere" class="anchor">infirmières</a> et les
					<a href="/annuaire/medecin-generaliste" class="anchor">médecins généralistes</a>
					du <a href="/sites/pole-sante-gare" class="anchor">Pôle Santé Gare</a>.
				</li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Référent</h2>
		<p>
			<a class="anchor" href="/medecin-generaliste/bayonne/benjamin-soen">Dr Benjamin Soen</a>,
			médecin généraliste.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<iframe
			src={bloodPressureSelfMeasurementPdf}
			title={$LL.NAVBAR.HEALTH_PROJECT()}
			class="w-full aspect-square"
		/>
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
