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

</script>

<svelte:head>
	<title>
		Permanence infirmière - {capitalizeFirstLetter($LL.HEALTH_SERVICES(), $language)} - {capitalizeFirstLetter(
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

		<h1 class="h1">	<span class="gradient-heading">Permanence infirmière</span>
            </h1>
		<p>Chaque mardi matin les <a href="/annuaire/infirmiere" class="anchor">infirmières</a> réalisent des soins et des bilans prévention sur rendez-vous.</p>
	</div>
</header>

<section>
	<div class="section-container">
		<h2 class="h2">Soins</h2>
		<p></p>
        <div class="pl-5">
            <ul class="list-disc">
                <li>bilan sanguin</li>
                <li>injection</li>
                <li>pansement</li>
                <li>perfusion unique</li>
                <li>vaccination (COVID Pfizer, grippe et autres vaccins)</li>
                <li>retrait de points de suture</li>
                <li>surveillance clinique hebdomadaire</li>
            </ul>
        </div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Bilans prévention</h2>
        <p>La permanence du mardi matin est aussi l'occasion de réaliser votre bilan de prévention santé.</p>
		<a href="/prevention/bilan-prevention" class="btn variant-filled" data-sveltekit-preload-data="hover">Mon Bilan Prévention</a>
</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Date et horaire</h2>
        <p>Tous les mardis matin, de 9h00 à 12h00, sauf jours fériés.</p>
</div>
</section>

<section>
	<div class="section-container">
		<h2 class="h2">Lieu</h2>
        <p>Au premier étage du <a href="/sites/pole-sante-gare" class="anchor">Pôle Santé Gare</a>, 1 place Pereire, à Bayonne.</p>
</div>
</section>
<section>
	<div class="section-container">
		<h2 class="h2">Prendre rendez-vous</h2>
            <ul class="list space-y-2">
                <li><Appointment appointment={{phone: "+33559296994"}}/></li>
                <li><Appointment appointment={{url: "https://www.doctolib.fr/maison-de-sante/bayonne/cabinet-infirmier-bayonne"}}/></li>
        </ul>
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
