<script lang="ts">
	import * as m from "$msgs";	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import { page } from '$app/stores';
	import ProgramNav from '$lib/ProgramNav/ProgramNav.svelte';
	import { programsNavLinks } from "$var/variables.ts";
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter(m.HEALTH_EDUCATION())} - {capitalizeFirstLetter(
			$facilityStore.formatted_name,
			$language
		)}
	</title>
</svelte:head>
<div>
	<header>
		<div class="section-container">
			<h1 class="h1">{capitalizeFirstLetter(m.HEALTH_EDUCATION(), $language)}</h1>
		</div>
	</header>

	<section id="program" class="">
		<div class="section-container">
			<svg
				aria-hidden="true"
				class="w-12 h-12 mx-auto m-4 text-gray-400 dark:text-gray-600"
				viewBox="0 0 24 27"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
					fill="currentColor"
				/></svg
			>
			<blockquote>
				« l’éducation pour la santé a pour but que chaque personne acquière tout au long de sa vie
				les compétences et les moyens qui lui permettront de promouvoir sa santé et sa qualité de
				vie ainsi que celles de la collectivité. (…) Elle s’adresse à la population dans toute sa
				diversité avec le souci d’être accessible à chacun. (…) L’éducation pour la santé aide
				chaque personne, en fonction de ses besoins, de ses attentes et de ses compétences, à
				comprendre l’information et à se l’approprier pour être en mesure de l’utiliser dans sa vie
				»
			</blockquote>

			<div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700 m-4">
				<a
					href="https://www.vie-publique.fr/discours/157129-conseil-des-ministres-du-28-fevrier-2001-leducation-la-sante"
					target="_blank"
					rel="noreferrer"
					><cite class="pr-3 text-sm text-gray-500 dark:text-gray-400"
						>Plan national d'éducation à la santé</cite
					></a
				>
				<cite class="pl-3 font-medium text-gray-900 dark:text-white"
					>Conseil des ministres du 28 février 2001.</cite
				>
			</div>

			<svg
				aria-hidden="true"
				class="w-12 h-12 mx-auto m-4 text-gray-400 dark:text-gray-600"
				viewBox="0 0 24 27"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
					fill="currentColor"
				/></svg
			>
		</div>
	</section>
	<section id="navlinks" class="">
		<div class="section-container">
			<ProgramNav pathname={$page.url.pathname} {programsNavLinks} />
		</div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
</style>
