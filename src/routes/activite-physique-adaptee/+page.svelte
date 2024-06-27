<script lang="ts">
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	export let data;
	import { facilityStore } from '$lib/store/facilityStore';
	import LL from '$i18n/i18n-svelte';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { language } from '$lib/store/languageStore';
	import { siteCount } from '$lib/store/facilityStore';
	import OccupationsComma from '$lib/Organization/OccupationsComma.svelte';
	import Def from '$lib/components/TooltipDefinition/Def.svelte';
	import Fa from 'svelte-fa';
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
		faArrowRight,
		faMobileScreen
	} from '@fortawesome/free-solid-svg-icons';
	import { faInstagram } from '@fortawesome/free-brands-svg-icons';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($LL.ADAPTED_PHYSICAL_EDUCATION(), $language)} - {capitalizeFirstLetter(
			$facilityStore.formatted_name,
			$language
		)}
	</title>
</svelte:head>

<header>
	<div class="section-container">
		
		<h1 class="h1">
			<span class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">
{capitalizeFirstLetter($LL.ADAPTED_PHYSICAL_EDUCATION(), $language)} (APA)</span></h1>
	</div>
</header>

<section>
	<div class="section-container">
		<h2 class="h2">Qu'est-ce que l'APA?</h2>
		<p>
			L’Activité Physique Adaptée (APA) est un moyen qui permet la mise en mouvement des personnes qui, en raison de leur état physique, mental ou social, ne peuvent pratiquer une activité
			physique dans des conditions ordinaires. L’APA est une activité physique adaptée aux pathologies, aux capacités fonctionnelles et aux limites d’activité du patient.
		</p>
		<p>
			L’APA est une activité physique prescrite par un médecin et encadrée par un professionnel de
			l'activité physique adaptée (<a href="/annuaire/enseignant-activite-physique-adaptee"
				>enseignant en activité physique adaptée</a
			>
			ou <a href="/annuaire/kinesitherapeute">kinésithérapeute</a>).
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Qui peut bénéficier de l'APA?</h2>
		<p>
			L’activité physique adaptée est prescrite exclusivement par les médecins généralistes ou
			autres spécialistes aux personnes:
		</p>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>atteintes d’une affection longue durée (ALD);</li>
				<li>malades chroniques (diabète, cardiopathie, cancer…);</li>
				<li>présentant des facteurs de risque (hypertension, obésité…);</li>
				<li>ou en perte d’autonomie.</li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">L'activité physique adaptée en pratique</h2>
		<p>
			Chaque séance d’APA dure entre 45 et 60 minutes et associe des activités d’endurance,
			d’aérobie et de renforcement musculaire. Il doit y avoir au moins un jour de repos entre les
			séances.
		</p>
		<p>
			Selon la pathologie ou l’état de santé et l’objectif du bénéficiaire, d’autres types
			d’exercices peuvent être associés : équilibre, coordination, assouplissement ou exercices
			respiratoires.
		</p>
		<p>
			L’APA permet d’accompagner des patients malades chroniques qui ne se sentent pas capables de
			pratiquer une activité sportive en autonomie et qui nécessitent un accompagnement personnalisé.
		</p>
	</div>
</section>
<section>
	<div class="section-container">
		<h2 class="h2">Association KAPA Vedène: l'APA à Vedène!</h2>
		<h3 class="h3">Présentation</h3>
		<p>
			L'association KAPA Vedène a été créée en mai 2021 au sein du cabinet de kinésithérapie de la maison de santé de Vedène pour promouvoir et proposer des activités
			physiques adaptées dans un projet de sport santé et de sport bien-être.
			KAPA Vedène est une passerelle entre la kinésithérapie et la reprise d'une activité physique dans une association sportive ou un club de sport.
		</p>
		<h3 class="h3">Objectifs</h3>
		<h4 class="h4">Informer et sensibiliser</h4>
		<p>
			L'association KAPA Vedène vous accueille et vous propose de faire un bilan de vos capacités
			physiques. Elle connaît l'ensemble des offres en activité physique et sportive ainsi qu'en
			activité physique adaptée sur le territoire de Vedène et ses alentours. Elle a développé un
			réseau avec tous les acteurs de l’APA qui lui permet de vous orienter vers l'activité qui vous
			correspond le mieux.
		</p>
		<h4 class="h4">Lutter contre la sédentarité</h4>
		<p>
			La sédentarité est une situation durant laquelle notre dépense énergétique est très faible,
			lorsqu’on est en position assise, inclinée ou allongée (en phase d’éveil: du lever au
			coucher).
		</p>
		<p>
			La sédentarité augmente la mortalité et le risque de développer de nombreuses maladies<sup
			><a href="#cite_note-1" class="anchor">1</a></sup
		>:
			maladie cardiovasculaire, diabète de type 2, cancer du colon, cancer de l'endomètre, cancer du
			poumon, obésité, dépression.
		</p>
		<h4 class="h4">Favoriser la reprise de l'activité physique</h4>
		<p>
			L’activité physique agit sur le bien-être physique, mental et social et joue un rôle dans la
			prévention de certaines maladies chroniques. Elle peut aussi permettre de ralentir leur
			évolution et ainsi faire partie intégrante d’une prise en charge thérapeutique.
		</p>
		<h4 class="h4">
			Promouvoir la pratique d’APA auprès des professionnels de santé et du grand public
		</h4>
		<p>
			L'activité physique adaptée peut être prescrite par le médecin généraliste, mais n'est pas
			prise en charge par la sécurité sociale. Cela veut dire que les forfaits proposés sont
			intégralement à la charge de l'adhérent. Certaines mutuelles proposent des forfaits qui sont
			très variables. L'objectif de l'association est de trouver des subventions pour pouvoir
			diminuer le prix de participation de l'adhérent qui vient sur ordonnance.
		</p>
		<h3 class="h3">Ateliers</h3>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>Posturologie façon Bernadette De Gasquet</li>
				<li>Gym santé vertébrale</li>
				<li>Gym douce</li>
				<li>Équilibre</li>
				<li>Pilates</li>
				<li>Yoga</li>
				<li>Souffle</li>
			</ul>
		</div>

		<h3 class="h3">Contact</h3>
		<nav class="list-nav flex">
			<ul>
				<li>
					<a href="mailto:kapa.vedene@gmail.com">
						<span class="badge bg-primary-500"><Fa icon={faEnvelope} /></span>
						<span class="flex-auto">kapa.vedene@gmail.com</span></a
					>
				</li>
				<li>
					<a href="https://instagram.com/kapavedene">
						<span class="badge bg-primary-500"><Fa icon={faInstagram} /></span>
						<span class="flex-auto">@kapavedene</span></a
					>
				</li>
				<li>
					<a href="tel:+33769630393">
						<span class="badge bg-primary-500"><Fa icon={faMobileScreen} /></span>
						<span class="flex-auto">0769630393</span></a
					>
				</li>
			</ul>
		</nav>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Ressources</h2>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>
					Bouger plus! Sur le site
					<a
						href="https://www.mangerbouger.fr/bouger-plus
					"
						class="anchor">mangerbouger.fr</a
					>, des idées, des conseils et des outils adaptés pour vous aider à augmenter l'activité
					physique et réduire le temps passé assis.
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
					<a
						href="https://doi.org/10.1007/s00125-012-2677-z"
						class="anchor">Wilmot, E.G., Edwardson, C.L., Achana, F.A. et al. Sedentary time in adults and the
						association with diabetes, cardiovascular disease and death: systematic review and
						meta-analysis. Diabetologia 55, 2895–2905 (2012).</a
					>
				</li>
			</ol>
		</div>
	</div>
</section>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
</style>
