<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import { page } from '$app/stores';
	import ProgramNav from '$components/ProgramNav.svelte';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($LL.PREVENTIVE_HEALTHCARE(), $language)} - {capitalizeFirstLetter(
			$facilityStore.formatted_name,
			$language
		)}
	</title>
</svelte:head>
<div>
	<header>
		<div class="section-container">
			<h1 class="h1">{capitalizeFirstLetter($LL.PREVENTIVE_HEALTHCARE(), $language)}</h1>
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
			<ProgramNav data={$page.url.pathname} />
		</div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
</style>
