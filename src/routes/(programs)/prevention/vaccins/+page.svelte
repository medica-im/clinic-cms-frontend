<script lang="ts">
	import { page } from '$app/stores';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers.ts';
	import { facilityStore } from '$lib/store/facilityStore.ts';
	import LL from '$i18n/i18n-svelte.ts';
	import ProgramNav from '$components/ProgramNav.svelte';
	import vaccines2024h from '$lib/assets/images/vaccines/vaccination_schedule_2024_horizontal.png';
	import vaccines2024v from '$lib/assets/images/vaccines/vaccination_schedule_2024_vertical.png';
	import Directory from '$components/Directory/Directory.svelte';

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
	<div class="section-container space-y-4">
		<h2 class="h2">Centres de vaccination</h2>
		<Directory setCurrentOrg={null} displayCommune={true} displayCategory={false} setRedirect={false} setLimitCategories={["Centre de vaccination internationale"]}/>
		<!--div class="card py-12">
			<div class="container mx-auto px-4">
				<h2 class="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>

				<div class="mb-8">
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Our Address</h3>
					<p class="text-gray-600">
						123 Main Street, Suite 456<br />
						Cityville, State 12345<br />
						Country
					</p>
				</div>

				<div class="mb-8">
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Phone</h3>
					<p class="text-gray-600">+1 (123) 456-7890</p>
				</div>

				<div class="mb-8">
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Email</h3>
					<p class="text-gray-600">info@example.com</p>
				</div>

				<div class="relative h-0 overflow-hidden mb-6" style="padding-bottom: 56.25%;">
					<iframe
						class="absolute top-0 left-0 w-full h-full"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.096656292789!2d-122.08217698485344!3d37.42205787981786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbc7b4be10725%3A0xf59d178a87b32f52!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1610035984427!5m2!1sen!2sus"
						frameborder="0"
						style="border:0;"
						allowfullscreen=""
						aria-hidden="false"
						tabindex="0"
					></iframe>
				</div>
			</div>
		</div>
		<div class="card py-12">
			<div class="container mx-auto px-4">
				<h2 class="text-2xl font-semibold text-gray-800 mb-4">Centre hospitalier Henri Duffaut</h2>

				<div class="mb-8">
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Our Address</h3>
					<p class="text-gray-600">
						123 Main Street, Suite 456<br />
						Cityville, State 12345<br />
						Country
					</p>
				</div>

				<div class="mb-8">
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Phone</h3>
					<p class="text-gray-600">+1 (123) 456-7890</p>
				</div>

				<div class="mb-8">
					<h3 class="text-lg font-semibold text-gray-700 mb-2">Email</h3>
					<p class="text-gray-600">info@example.com</p>
				</div>

				<div class="relative h-0 overflow-hidden mb-6" style="padding-bottom: 56.25%;">
					<iframe
						class="absolute top-0 left-0 w-full h-full"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.096656292789!2d-122.08217698485344!3d37.42205787981786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbc7b4be10725%3A0xf59d178a87b32f52!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1610035984427!5m2!1sen!2sus"
						frameborder="0"
						style="border:0;"
						allowfullscreen=""
						aria-hidden="false"
						tabindex="0"
					></iframe>
				</div>
			</div>
		</div-->
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
