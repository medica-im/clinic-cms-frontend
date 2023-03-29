<script lang="ts">
	import dict from '$lib/components/TooltipDefinition/lexicon.js';
    import LL from '$i18n/i18n-svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { facilityStore } from '$lib/store/facilityStore';
	import healthProjectPdf from '$lib/assets/projet_de_sante_MSP_Vedene.pdf';
</script>

<svelte:head>
	<title>
		{capitalizeFirstLetter($facilityStore.formatted_name, $language)} - {capitalizeFirstLetter($LL.LEXICON(), $language)}
	</title>
</svelte:head>

<dl class="list-none space-y-2">
	{#each Object.keys(dict) as k}
		<dt id="#{k}">{k}</dt>
		<dd>
			{#if dict[k][0] in dict}Voir <a href="#{dict[k][0]}">{dict[k][0]}</a>{:else}{dict[
					k
				][0]}{#if dict[k][1]}<br>{dict[k][1]}{/if}{/if}
		</dd>
	{/each}
</dl>

<style>
	dt {
		font-weight: bold;
		text-decoration: underline;
	}
	dd {
		margin: 0;
		padding: 0 0 0.5em 0;
	}
</style>
