<script lang="ts">
	import * as m from "$msgs";	import { language } from '$lib/store/languageStore.ts';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import { page } from '$app/stores';
	import ProgramNav from '$lib/ProgramNav/ProgramNav.svelte';
	import { programCount } from '$lib/links.ts';
	import { programsNavLinks } from '$var/variables.ts';
</script>

<svelte:head>
	<title>
		Soins - {capitalizeFirstLetter(
			$facilityStore.formatted_name,
			$language
		)}
	</title>
</svelte:head>
<div>
	<header>
		<div class="section-container">
			<h1 class="h1">Soins</h1>
		</div>
	</header>

	<section>
		<div class="section-container">
			<p>Les professionnels de {$facilityStore.formatted_name_definite_article} vous propose {programCount($page.url.pathname, programsNavLinks)>1 ? "ces programmes":"ce programme"} de soins.</p>
		</div>
	</section>

	<section>
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