<script lang="ts">
	import LL from '$i18n/i18n-svelte.ts';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import { language } from '$lib/store/languageStore.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import Fa from 'svelte-fa';
	import { faCheck, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import ProgramNav from '$components/ProgramNav.svelte';
	import Appointment from '$lib/components/Effector/Appointment/Appointment.svelte';
	import Clock from '$lib/components/Clock/Clock.svelte';
	import { dateTime } from '$lib/store/dateTimeStore.ts';
	import PhoneReceptionSchedule from '$lib/Schedule/PhoneReceptionSchedule.svelte';
	import MobileSchedule from '$lib/Schedule/MobileSchedule.svelte';
	import secretariat from '$lib/assets/images/parcours/secretariat.png';
	import smsLight from '$lib/assets/images/parcours/sms_light.png';
	import smsDark from '$lib/assets/images/parcours/sms_dark.png';

	const formatter = new Intl.DateTimeFormat('fr', {
		dateStyle: 'full',
		timeStyle: 'short',
		timeZone: 'Europe/Paris'
	});
	export let data;
</script>

<svelte:head>
	<title>
		Parcours de soins - {capitalizeFirstLetter($LL.HEALTH_SERVICES(), $language)} - {capitalizeFirstLetter(
			$facilityStore.formatted_name,
			$language
		)}
	</title>
</svelte:head>
<header>
	<div class="section-container">
		<span class="badge variant-filled-surface"
			>{capitalizeFirstLetter($LL.HEALTH_SERVICES(), $language)}</span
		>

		<h1 class="h1"><span class="gradient-heading">Parcours de soins</span></h1>
		<p>
			Soins programmés (j'ai rendez-vous pour le suivi de ma maladie chronique), soins non
			programmés (je viens de tomber malade), urgences médicales... comment se passe mon parcours de
			soins à la maison de santé?
		</p>
	</div>
</header>

<section>
	<div class="section-container">
		
		<h2 class="h2">Soins programmés</h2>
		<h3 class="h3">J’ai RDV avec mon médecin</h3>
		<div class="grid grid-cols-1 lg:grid-cols-2 items-start">
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>J’annonce mon arrivée à la secrétaire</li>
				<li>Je prépare ma carte vitale à présenter au médecin</li>
				<li>
					J'anticipe le renouvellement de mon ordonnance en prenant mon prochain rdv auprès de la
					secrétaire
				</li>
			</ul>
		</div>
		<img class="lg:max-w-72"
				src={secretariat}
				alt="Un patient ayant rendez-vous avec un médecin annonce son arrivée à la secrétaire."
			/>
	    </div>
		<h3 class="h3">Je veux prendre RDV</h3>
		<p>
			Consultez les fiches de nos <a href="/annuaire/medecin-generaliste" class="anchor"
				>médecins généralistes</a
			> dans l'annuaire. La prise de rendez-vous s'effectue sur <a class="btn btn-sm variant-ringed-primary" href="https://www.doctolib.fr/medecin-generaliste/chateauneuf-de-gadagne" rel="external"><span><Fa icon={faCalendarCheck}/></span><span>Doctolib</span></a>.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Soins non programmés</h2>

		<!--div class="py-2 xl:px-6 xl:float-left h-32 v-32">
			<Clock/>
		</div-->
		<p>Je n'ai pas rendez-vous. Je suis malade.</p>
		<div class="grid grid-cols-1 lg:grid-cols-2">
			<div class="p-4">
			<img
			class="lg:max-w-lg"
					src={$modeCurrent ? smsLight : smsDark}
					alt="Un patient ayant rendez-vous avec un médecin annonce son arrivée à la secrétaire."
				/>
				<p>
					Comment organiser une consultation pour des soins non programmés aujourd'hui le {formatter.format(
						$dateTime
					)}?
				</p>
			</div>
			<div class="grid grid-cols-1 p-4 gap-4">
				<div class="flex-1">
				<PhoneReceptionSchedule data={data.organization} />
				</div>
				<div class="flex-1">
				<MobileSchedule data={data.organization} />
				</div>
			</div>
		</div>
		
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Informations utiles</h2>
		<p>
			Le secrétariat est ouvert du lundi au vendredi de 8h00 à 12h00 et de 14h00 à 16h00. Vous
			pouvez nous joindre dans ces créneaux horaires au <a
				class="anchor"
				rel="external"
				href="tel:0490223637">0490223637</a
			>.
		</p>
		<p>
			En cas d'urgence, en dehors de ces horaires, merci de contacter le <a
				class="anchor"
				rel="external"
				href="tel:15">15</a
			>.
		</p>
		<p>
			Vous souhaitez communiquer avec les représentants des usagers?
			<a class="anchor" rel="external" href="mailto:usager.msp.gadagne@gmail.com"
				>usager.msp.gadagne@gmail.com</a
			>
		</p>
		<p></p>
	</div>
</section>

<!--section>
	<div class="section-container">
		<h2 class="h2">...</h2>
        <p>...</p>
</div>
</section-->

<section>
	<div class="section-container">
		<ProgramNav data={$page.url.pathname} />
	</div>
</section>

<style lang="postcss">
	.section-container {
		@apply mx-auto w-full max-w-7xl space-y-2 p-4 py-4 md:space-y-4 md:py-8;
	}
	.anchor {
		@apply underline underline-offset-4;
	}

	.gradient-heading {
		@apply box-decoration-clone bg-clip-text text-transparent;
		/* Direction */
		@apply bg-gradient-to-br;
		/* Color Stops */
		@apply from-primary-500 via-tertiary-500 to-secondary-500;
	}
</style>
