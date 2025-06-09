<script lang="ts">
	import * as m from "$msgs";	import { language } from '$lib/store/languageStore.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { organizationStore } from '$lib/store/facilityStore.ts';
	import { page } from '$app/state';
	import ProgramNav from '$lib/ProgramNav/ProgramNav.svelte';
	import { programsNavLinks } from "$var/variables.ts";
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter(m.PREVENTIVE_HEALTHCARE(), $language)} - {capitalizeFirstLetter(
			$organizationStore.formatted_name,
			$language
		)}
	</title>
</svelte:head>

	<header>
		<div class="section-container">
			<h1 class="h1">{capitalizeFirstLetter(m.PREVENTIVE_HEALTHCARE(), $language)}</h1>
		</div>
	</header>

	<section>
		<div class="section-container">
			<p>
				La prévention est selon l’OMS en 1948, «l’ensemble des mesures visant à éviter ou réduire le
				nombre et la gravité des maladies, des accidents et des handicaps».
			</p>
			<p>
				La prévention de la maladie comprend des mesures qui visent non seulement à empêcher
				l’apparition de la maladie, telle que la lutte contre les facteurs de risque, mais également
				à en arrêter les progrès et à en réduire les conséquences.
			</p>
		</div>
	</section>

	<section>
		<div class="section-container">
			<ProgramNav pathname={page.url.pathname} {programsNavLinks} />
		</div>
	</section>


<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
</style>
