<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import Fa from 'svelte-fa';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import ProgramNav from '$components/ProgramNav.svelte';
	import epworthUrl from '$lib/assets/pdf/echelle_somnolence_epworth.pdf?url';
	import normal from '$lib/assets/images/sleep_apnea/normal.png';
	import hypopnea from '$lib/assets/images/sleep_apnea/hypopnea.png';
	import apnea from '$lib/assets/images/sleep_apnea/apnea.png';
	import homeSleepTestLarge from '$lib/assets/images/sleep_apnea/home_sleep_test_large.jpg';
	import homeSleepTestSmall from '$lib/assets/images/sleep_apnea/home_sleep_test_small.jpg';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($LL.DISEASE.APNEA(), $language)} - {capitalizeFirstLetter(
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

		<h1 class="h1">{capitalizeFirstLetter($LL.DISEASE.APNEA(), $language)}</h1>
		<p>
			Ronflements, sommeil agité, troubles de la respiration nocturne, somnolence dans la journée,
			fatigue, sont des symptômes évocateurs d’apnées du sommeil. Le diagnostic est confirmé par un
			enregistrement du sommeil.
		</p>
	</div>
</header>

<section>
	<div class="section-container">
		<h2 class="h2">Qu'est-ce que le syndrome d'apnées du sommeil?</h2>
		<p>
			Le nom complet de ce syndrome est syndrome d'apnées-hypopnées obstructives du sommeil (SAHOS).
		</p>
		<p>
			Ce syndrome se caractérise par la survenue d’épisodes anormalement fréquents d’interruptions
			(apnées) ou de réductions (hypopnées) de la respiration durant le sommeil.
		</p>
		<p></p>
		<p>
			Ces pauses de respiration durent de 10 à 30 secondes, voire plus, se produisent au moins 5
			fois par heure de sommeil et peuvent se répéter une centaine de fois par nuit.
		</p>

		<p>
			Elles sont dues à un relâchement des muscles des parois de la gorge (ou «pharynx»). Ce conduit
			devient mou et l’air y passe difficilement, provoquant au passage des vibrations à l’origine
			de ronflements.
		</p>

		<p>
			Cette réduction ou interruption de la ventilation pendant le sommeil provoque un manque en
			oxygène. Le cerveau réagit et la personne se réveille pour reprendre sa respiration. Ces
			éveils sont de courte durée: on parle de « micro-éveils » dont la personne n'a pas conscience.
		</p>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
			<div>
				<figure>
					<img class="h-auto max-w-full rounded-lg" src={normal} alt="respiration normale" />
					<figcaption>Respiration normale.</figcaption>
				</figure>
			</div>
			<div>
				<figure>
					<img class="h-auto max-w-full rounded-lg" src={hypopnea} alt="hypopnée" />
					<figcaption>Respiration réduite: hypopnée.</figcaption>
				</figure>
			</div>
			<div>
				<figure>
					<img class="h-auto max-w-full rounded-lg" src={apnea} alt="apnée" />
					<figcaption>Respiration interrompue: apnée.</figcaption>
				</figure>
			</div>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Quand évoquer un syndrome d'apnées du sommeil?</h2>
		<p>Les symptômes apparaissent pendant la nuit et ont un impact important sur la journée.</p>
		<h3 class="h3">Au cours de la nuit</h3>
		<dl class="list-dl">
			<div>
				<span class="badge variant-ghost">💤</span>
				<span class="flex-auto">
					<dt>Ronflement</dt>
					<dd>
						Un ronflement sévère, qui gêne souvent les proches, est constaté dans 95 % des cas. Il
						est intense et présent chaque nuit, depuis longtemps.
					</dd>
				</span>
			</div>
			<div>
				<span class="badge variant-ghost">💤</span>
				<span class="flex-auto">
					<dt>Pauses respiratoires</dt>
					<dd>
						Des pauses ou arrêts respiratoires durant le sommeil sont constatés par l'entourage. Des
						épisodes de respiration haletante pendant le sommeil peuvent être présents.
					</dd>
				</span>
			</div>
			<div>
				<span class="badge variant-ghost">💤</span>
				<span class="flex-auto">
					<dt>Sommeil agité et perturbé</dt>
					<dd>
						La personne a un sommeil agité, entrecoupé de micro-éveils à répétition. Les réveils en
						sursaut, s'accompagnent d'une sensation d'asphyxie ou d'étouffement. L'agitation au
						cours du sommeil peut s'accompagner de mouvements incontrôlés ou de mouvements
						périodiques des membres inférieurs ainsi que de sueurs nocturnes. Au matin, les draps
						sont particulièrement défaits. Des cauchemars sur des thèmes d'asphyxie, de chute ou de
						mort imminente parfois des insomnies sont présents. Le sommeil est perçu comme non
						réparateur.
					</dd>
				</span>
			</div>
			<div>
				<span class="badge variant-ghost">💤</span>
				<span class="flex-auto">
					<dt>Troubles nocturnes associés aux apnées du sommeil</dt>
					<dd>
						Un besoin d'uriner plusieurs fois au cours de la nuit (nycturie) entrave le sommeil. Des
						troubles de l'érection ou une diminution de la libido sont fréquents et régressent
						lorsque le syndrome d'apnées du sommeil est traité.
					</dd>
				</span>
			</div>
		</dl>
		<h3 class="h3">Conséquences pendant la journée</h3>
		<dl class="list-dl">
			<div>
				<span class="badge variant-ghost">☀️</span>
				<span class="flex-auto">
					<dt>Somnolence diurne</dt>
					<dd>
						Une somnolence diurne excessive survient. Elle n'est pas expliquée par d'autres
						facteurs. Dès son réveil, la personne se sent moins reposée qu'à son coucher. Dans la
						journée, elle s'endort dès que son activité se réduit, à n'importe quel moment et plus
						particulièrement après les repas. Cette somnolence peut être légère avec peu de
						retentissement sur les activités quotidiennes comme lire, regarder la télévision, être
						passager dans une voiture, assister à une réunion. Mais elle peut être plus grave, avec
						des endormissements involontaires lors de réunions, lors d'un repas, de la conduite
						automobile... Avant de consulter votre médecin traitant, évaluez vous-même votre risque
						d’endormissement dans la journée, grâce à l'<a class="anchor" href={epworthUrl}
							>échelle de somnolence d'Epworth</a
						>.
					</dd>
				</span>
			</div>
			<div>
				<span class="badge variant-ghost">☀️</span>
				<span class="flex-auto">
					<dt>Fatigue</dt>
					<dd>
						La fatigue est souvent importante, pouvant aller jusqu'à l'épuisement. Il s'ensuit des
						difficultés à se concentrer, à mémoriser ainsi que la survenue de troubles de l'humeur,
						une certaine irritabilité et parfois, des maux de tête surtout le matin.
					</dd>
				</span>
			</div>
		</dl>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Diagnostic du syndrome d'apnées du sommeil</h2>
		<h3 class="h3">Consultation de dépistage</h3>
		<dl class="list-dl">
			<div>
				<span class="badge variant-ghost">🧑‍⚕️</span>
				<span class="flex-auto">
					<dt>Interrogatoire</dt>
					<dd>
						Le médecin fait préciser au patient les troubles qu'il ressent ou que son entourage a
						observés. Il lui propose éventuellement de tenir un agenda du sommeil dans lequel il
						précisera les horaires des perturbations nocturnes et diurnes.
					</dd>
				</span>
			</div>
			<div>
				<span class="badge variant-ghost">🧑‍⚕️</span>
				<span class="flex-auto">
					<dt>Somnolence</dt>
					<dd>
						Afin de poser le diagnostic de somnolence diurne, le médecin dispose de plusieurs
						échelles d’appréciation, dont l'<a class="anchor" href={epworthUrl}
							>échelle de somnolence d'Epworth</a
						>.
					</dd>
				</span>
			</div>
			<div>
				<span class="badge variant-ghost">🧑‍⚕️</span>
				<span class="flex-auto">
					<dt>Facteurs de risque cardiovasculaire</dt>
					<dd>
						Le médecin recherche des facteurs de risque cardiovasculaire souvent associés à l'apnée
						du sommeil, en particulier une hypertension artérielle et un surpoids par le calcul de
						l'IMC (Indice de Masse Corporelle = poids / taille²) et la mesure du tour de taille.
					</dd>
				</span>
			</div>
		</dl>
		<h3 class="h3">Examen ORL</h3>
		<p>
			Un examen par un chirurgien ORL (oto-rhino-laryngologiste: spécialiste des oreilles, du nez et
			de la gorge) est nécessaire. L'ORL recherche un obstacle sur les voies aériennes: volume
			anormal de la langue, de la luette ou des amygdales, taille de la mandibule trop petite par
			rapport au maxillaire supérieur. Il pratique un examen endonasal pour étudier la cloison
			nasale, les cornets et une éventuelle obstruction nasale favorisant les apnées du sommeil.
		</p>

		<h3 class="h3">Bilan du sommeil</h3>
		<p>Les enregistrements du sommeil peuvent être réalisés selon deux techniques différentes.</p>

		<h3 class="h3">La polygraphie ventilatoire nocturne à domicile</h3>
		<div>
			<div class="py-2 xl:px-6 xl:float-right">
				<figure>
					<img
						src={homeSleepTestSmall}
						alt="patient porteur de capteurs pour la polygraphie ventilatoire nocturne à domicile"
					/>
					<figcaption>Polygraphie ventilatoire nocturne.</figcaption>
				</figure>
			</div>
			<div class="">
				<p>La polygraphie ventilatoire nocturne enregistre, sur une durée d'au moins 6 heures:</p>
				<div class="pl-5">
					<ul class="list-disc space-y-4 p-4">
						<li>l'activité électrique du cœur: électrocardiogramme</li>
						<li>les mouvements respiratoires</li>
						<li>le débit d'air entrant et sortant par les narines</li>
						<li>
							la saturation du sang en oxygène via un capteur placé au niveau d'un doigt pour
							détecter des baisses de saturation lors des apnées et des hypopnées
						</li>
					</ul>
				</div>
				<p>
					La mise en place du dispositif est un acte médical effectué en fin de journée au cabinet
					du médecin qui vérifiera la bonne disposition des capteurs, assurera leur contrôle et
					paramétrage, puis programmera le déclenchement de l’enregistrement sur un logiciel médical
					dédié.
				</p>
				<p>
					Le patient est ensuite invité à regagner son domicile pour y passer une soirée tranquille
					et se coucher avec l’ensemble du matériel.
				</p>
				<p>
					Le lendemain matin au réveil, le patient retire l’ensemble du dispositif pour le rapporter
					au cabinet du médecin.
				</p>
				<p>
					Les médecins référents de la maison de santé sont formés à la pose des capteurs et à
					l'interprétation de la polygraphie ventilatoire nocturne.
				</p>
				<div class="pl-5">
					<ul class="list-disc space-y-4 p-4">
						<li>
							<a href="/pole-sante-gare/medecin-generaliste/mickael-da-silva-andrade" class="anchor"
								>Dr Mickaël Da Silva Andrade</a
							>, médecin généraliste
						</li>
						<li>
							<a href="/pole-sante-gare/medecin-generaliste/claire-guiller" class="anchor"
								>Dr Claire Guiller</a
							>, médecin généraliste
						</li>
					</ul>
				</div>
			</div>
		</div>

		<h3 class="h3">La polysomnographie à l'hôpital</h3>

		<p>
			La polysomnographie, plus complète que la polygraphie, est un examen complexe qui n'est pas
			systématiquement prescrit. Il ne peut être effectué qu'à l'hôpital. Les délais pour obtenir un
			rendez-vous sont parfois longs. La polysomnographie est un enregistrement du sommeil réalisé
			soit sur une nuit, soit sur une nuit et une journée. Cet examen permet, en plus des
			enregistrements précédents, d'analyser la qualité du sommeil, grâce à l'enregistrement de
			plusieurs paramètres, obtenu à l'aide d'électrodes placées au niveau du crâne et de
			différentes parties du corps.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Comment évolue le syndrome d'apnées du sommeil?</h2>
		<h3 class="h3">Sans prise en charge</h3>
		<p>
			Si le patient n’est pas traité, son état de santé se détériore. Le syndrome d'apnées-hypopnées
			du sommeil altère la qualité de vie en raison des troubles de la vigilance dans la journée, la
			somnolence diurne, la difficulté à exécuter les tâches quotidiennes, les problèmes de mémoire
			et de concentration et les troubles de l'humeur. Les accidents de la route, de la vie
			domestique et du travail sont plus nombreux.
		</p>
		<p>
			À court terme, le manque répété en oxygène peut entraîner des troubles du rythme cardiaque:
			arythmie ventriculaire, fibrillation auriculaire.
		</p>

		<p>
			À moyen et long terme, l'apnée du sommeil entraîne une augmentation du risque
			cardiovasculaire:
		</p>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>hypertension artérielle</li>
				<li>maladie coronaire avec un risque d’infarctus</li>
				<li>accidents vasculaires cérébraux</li>
				<li>insuffisance cardiaque</li>
			</ul>
		</div>

		<p>
			Un diabète de type 2, un surpoids ou une obésité sont souvent associés aux apnées du sommeil
			ainsi qu'un syndrome métabolique.
		</p>

		<h3 class="h3">Avec prise en charge</h3>

		<p>
			La prise en charge médicale des apnées et hypopnées du sommeil fait régresser les troubles
			respiratoires du sommeil et la somnolence diurne. La fatigue s'atténue et la qualité de vie du
			patient s'améliore.
		</p>
		<p>Le risque de complications cardiovasculaires diminue.</p>
	</div>
</section>

<section>
	<div class="section-container">
		<ProgramNav data={$page.url.pathname} />
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
