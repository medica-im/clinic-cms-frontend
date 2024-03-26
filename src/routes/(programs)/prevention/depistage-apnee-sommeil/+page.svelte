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
		{capitalizeFirstLetter($LL.DISEASE.APNEA(), $language)} - {capitalizeFirstLetter(
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

		<h1>{capitalizeFirstLetter($LL.DISEASE.APNEA(), $language)}</h1>
	</div>
</header>

<section>
	<div class="section-container">
		<h2>Définition</h2>
		<p>
			
		</p>
		<blockquote cite="">
			
			<div class="pl-5">
			<ul class="list-disc space-y-4 p-4 pl-5">
				<li></li>
				
			</ul>
		</div>
		</blockquote>
	</div>
</section>

<section>
	<div class="section-container">
		<h2>Objectifs</h2>
		<p>
		</p>
	</div>
</section>

<section>
	<div class="section-container">
		<h2>Déroulement</h2>
		<p></p>
		<div class="pl-5">
		<ul class="list-disc space-y-4 p-4">
			<li></li>
			<li></li>
		</ul>
		</div>
		<p></p>
	</div>
</section>
<section>
	<div class="section-container">
		<h2>Conditions d'accès</h2>
		<p>
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
