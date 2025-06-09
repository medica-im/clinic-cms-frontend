<script lang="ts">
	import * as m from "$msgs";	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { organizationStore } from '$lib/store/facilityStore';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter(
			m.OUTPATIENT_CLINIC_MDT_MEETING(),
			$language
		)} - {capitalizeFirstLetter($organizationStore.formatted_name, $language)}
	</title>
</svelte:head>

<div>
	<header>
		<div class="section-container">
			<h1 class="h1">{capitalizeFirstLetter(m.OUTPATIENT_CLINIC_MDT_MEETING(), $language)}</h1>
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

	<!--section>
		<div class="section-container">
			<div class="max-w-2xl">
			<Carousel
				count={6}
				path={'reunion-concertation-pluriprofessionnelle-0.jpg'}
				alt={capitalizeFirstLetter(m.OUTPATIENT_CLINIC_MDT_MEETING(), $language)}
			/>
			</div>
		</div>
	</section-->
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
</style>
