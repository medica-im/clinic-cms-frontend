<script lang="ts">
	import * as m from "$msgs";	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import { page } from '$app/stores';
	import ProgramNav from '$components/ProgramNav.svelte';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter(m.OUTPATIENT_CLINIC_TPE(), $language)} - {capitalizeFirstLetter(
			$facilityStore.formatted_name,
			$language
		)}
	</title>
</svelte:head>
<div>
	<header>
		<div class="section-container">
			<h1 class="h1">{capitalizeFirstLetter(m.OUTPATIENT_CLINIC_TPE(), $language)}</h1>
		</div>
	</header>

	<section>
		<div class="section-container">
			<p>
				L’éducation thérapeutique du patient a pour objectif d’aider les personnes vivant avec une
				maladie chronique à améliorer leur qualité de vie avec cette maladie, grâce à l’acquisition
				ou au maintien de compétences dont le besoin a été identifié lors d’un bilan individuel
				initial.
			</p>
		</div>
	</section>

	<section>
		<div class="section-container">
			<ProgramNav data={$page.url.pathname} />
		</div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
</style>
