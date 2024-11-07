<script lang="ts">
    import { page } from '$app/stores';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import LL from '$i18n/i18n-svelte.ts';
    import ProgramNav from '$components/ProgramNav.svelte';
	import vaccines2024h from '$lib/assets/images/vaccines/vaccination_schedule_2024_horizontal.png';
	import vaccines2024v from '$lib/assets/images/vaccines/vaccination_schedule_2024_vertical.png';

	const mobileWidth: number = 1440;

	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<svelte:head>
	<title>
		Vaccins - {capitalizeFirstLetter($LL.PREVENTIVE_HEALTHCARE())} - {capitalizeFirstLetter(
			$facilityStore.formatted_name
		)}
	</title>
</svelte:head>

<header>
	<div class="section-container">
		<span class="badge variant-filled-surface"
			>{capitalizeFirstLetter($LL.PREVENTIVE_HEALTHCARE())}</span
		>

		<h1 class="h1">Vaccins</h1>
		<p>
			Lorsque nous rencontrons un microbe et tombons malade, notre système immunitaire se défend en
			fabriquant des anticorps, destinés à neutraliser et éliminer ce microbe. La vaccination
			fonctionne de la même manière, tout en évitant les dangers liés à la maladie. Lorsque nous
			recevons un vaccin, un microbe rendu inoffensif ou une partie de microbe est introduit dans
			notre corps. Il ne nous rend pas malade, mais notre système immunitaire fabrique quand même
			des anticorps pour neutraliser ou éliminer le microbe. Si nous rencontrons un jour le vrai
			microbe, notre système immunitaire le reconnaitra tout de suite et l’éliminera avant qu’il ne
			puisse nous rendre malade.
		</p>
	</div>
</header>

<section>
	<div class="section-container">
		<h2 class="h2">Calendrier vaccinal 2024</h2>

		{#if innerWidth <= mobileWidth}
			<img src={vaccines2024v} alt="calendrier vaccinal 2024" />
		{:else}
			<img src={vaccines2024h} alt="calendrier vaccinal 2024" />
		{/if}
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
	dt {
		font-weight: bold;
	}
</style>
