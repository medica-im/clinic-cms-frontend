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
		Hypertension - {capitalizeFirstLetter(
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

		<h1>{capitalizeFirstLetter($LL.DISEASE.CHILDHOOD_OBESITY(), $language)}</h1>
		<p>« Mission : retrouve ton cap », un dispositif pour prévenir le surpoids et l’obésité infantile.</p>
	</div>
</header>

<section>
	<div class="section-container">
		<h2>Personnes concernées</h2>
		<p>
			Enfants de 3 à 12 ans.
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2>Objectifs</h2>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>Comprendre</li>
				<li>Prescrire</li>
				<li>Prendre en charge</li>
				<li>Accompagner</li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2>Consultations</h2>

		<p></p>
		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li></li>
				<li></li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2>Intervenants</h2>

		<div class="pl-5">
			<ul class="list-disc space-y-4 p-4">
				<li>psychologue</li>
				<li>diététicienne</li>
				<li>médecin</li>
				<li>pédiatre</li>
			</ul>
		</div>
	</div>
</section>

<section>
	<div class="section-container">
		<h2>Conditions d'accès</h2>
		<p>
			Ce programme est financé par l’Assurance Maladie, la participation est donc gratuite.
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
