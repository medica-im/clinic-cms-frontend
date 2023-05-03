<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import Carousel from '$components/Carousel/Carousel.svelte';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter(
			$LL.OUTPATIENT_CLINIC.MDT_MEETING(),
			$language
		)} - {capitalizeFirstLetter($facilityStore.formatted_name, $language)}
	</title>
</svelte:head>

<div>
	<header>
		<div class="section-container">
			<h1>{capitalizeFirstLetter($LL.OUTPATIENT_CLINIC.MDT_MEETING(), $language)}</h1>
		</div>
	</header>

	<section>
		<div class="section-container">
			<p>
				Les professionnels de la MSP se réunissent une fois par mois, en équipe pluridisciplinaire,
				pour discuter de situations complexes dans la prise en charge de patients suivis au sein de
				la structure.
			</p>
			<p>
				Ces temps d’échange permettent aussi de faire le point sur le déroulement des programmes et
				les différentes missions de prévention afin de faire évoluer le projet de santé de la MSP.
			</p>
		</div>
	</section>

	<section>
		<div class="section-container">
			<Carousel
				count={6}
				path={'reunion-concertation-pluriprofessionnelle-0.jpg'}
				alt={capitalizeFirstLetter($LL.OUTPATIENT_CLINIC.MDT_MEETING(), $language)}
			/>
		</div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
	.list-disc {
		@apply pl-4 space-y-4 p-4;
	}
	.list-card {
		@apply w-fit text-token card p-4;
	}
</style>
