<script lang="ts">
	import LL from '$i18n/i18n-svelte.ts';
	import { language } from '$lib/store/languageStore.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import Fa from 'svelte-fa';
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import ProgramNav from '$components/ProgramNav.svelte';
    import Appointment from '$lib/components/Effector/Appointment/Appointment.svelte';
	import Clock from '$lib/components/Clock/Clock.svelte';
	import { dateTime } from '$lib/store/dateTimeStore.ts'
	import PhoneReceptionSchedule from '$lib/Schedule/PhoneReceptionSchedule.svelte';
	import MobileSchedule from '$lib/Schedule/MobileSchedule.svelte';
	import secretariat from '$lib/assets/images/parcours/secretariat.png';
	import sms from '$lib/assets/images/parcours/sms.png';

	const formatter = new Intl.DateTimeFormat('fr', {
		dateStyle: 'full',
		timeStyle: 'short',
		timeZone: 'Europe/Paris',
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

		<h1 class="h1">	<span class="gradient-heading">Parcours de soins</span>
            </h1>
		<p>Soins programmés (j'ai rendez-vous pour le suivi de ma maladie chronique), soins non programmés (je viens de tomber malade), urgences médicales... comment se passe mon parcours de soins à la maison de santé?</p>
	</div>
</header>

<section>
	<div class="section-container">
		<h2 class="h2">Soins programmés</h2>
		<h3 class="h3">J’ai RDV avec mon médecin</h3>
		<div class="py-2 xl:px-6 xl:float-right max-w-96">
				<img
					src={secretariat}
					alt="Un patient ayant rendez-vous avec un médecin annonce son arrivée à la secrétaire."
				/>
		</div>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>J’annonce mon arrivée à la secrétaire</li>
				<li>Je prépare ma carte vitale à présenter au médecin</li>
				<li>J'anticipe le renouvellement de mon ordonnance en prenant mon prochain rdv auprès de la secrétaire</li>
			</ul>
		</div>
		<h3 class="h3">Je veux prendre RDV</h3>
		<p>Consultez les fiches de nos <a href="/annuaire/medecin-generaliste" class="anchor">médecins généralistes</a> dans l'annuaire.</p>
	</div>
</section>


<section>
	<div class="section-container">
		<h2 class="h2">Soins non programmés</h2>
		
		<!--div class="py-2 xl:px-6 xl:float-left h-32 v-32">
			<Clock/>
		</div-->
		<p>Je n'ai pas rendez-vous. Je suis malade.</p>
		<div class="py-2 xl:px-6 xl:float-left max-w-96">
			<img
				src={sms}
				alt="Un patient ayant rendez-vous avec un médecin annonce son arrivée à la secrétaire."
			/>
	</div>
		<div class="flex flex-wrap">
		<div class="p-2">Comment organiser une consultation pour des soins non programmés aujourd'hui le {formatter.format($dateTime)}?</div>
		<div class="p-2"><PhoneReceptionSchedule data={data.organization}/></div>
		<div class="p-2"><MobileSchedule data={data.organization}/></div>
	</div>
	</div>
</section>

<section>
	<div class="section-container">
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">...</h2>
        <p>...</p>
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
	.anchor {
		@apply underline underline-offset-4;
	}

.gradient-heading {
	@apply bg-clip-text text-transparent box-decoration-clone;
	/* Direction */
	@apply bg-gradient-to-br;
	/* Color Stops */
	@apply from-primary-500 via-tertiary-500 to-secondary-500;
}
</style>
