<script lang="ts">
	import dict from '$lib/components/TooltipDefinition/lexicon.js';
	import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import { removeSpaces } from '$lib/helpers/stringHelpers';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($LL.LEXICON(), $language)} - {capitalizeFirstLetter(
			$facilityStore.formatted_name,
			$language
		)}
	</title>
</svelte:head>
<div>
	<header>
		<div class="section-container">
			<h1 class="h1">{capitalizeFirstLetter($LL.LEXICON(), $language)}</h1>
		</div>
	</header>

	<section>
		<div class="section-container">
			<dl class="list-none space-y-2">
				{#each Object.keys(dict) as k}
					<dt id={removeSpaces(k)}>{k}</dt>
					<dd>
						{#if dict[k][0] in dict}Voir <a href="#{removeSpaces(dict[k][0])}">{dict[k][0]}</a
							>{:else}{dict[k][0]}{#if dict[k][1]}<br />{dict[k][1]}{/if}{/if}
					</dd>
				{/each}
			</dl>
		</div>
	</section>
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto p-4 py-4 md:py-8 space-y-2 md:space-y-4;
	}
	dt {
		font-weight: bold;
		text-decoration: underline;
	}
	dd {
		margin: 0;
		padding: 0 0 0.5em 0;
	}
</style>
