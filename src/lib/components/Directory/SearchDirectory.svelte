<script lang="ts">
	import { getTerm } from '$lib/components/Directory/context';
	import { onMount } from 'svelte';
	import { get } from '@square/svelte-store';
    //import { term } from '$lib/store/directoryStore'  
    import {
		faMagnifyingGlass,
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import DocsIcon from '$components/Icon/Icon.svelte';
	import LL from '$i18n/i18n-svelte';
	import { getTimeFormatter } from 'svelte-i18n';
	
    let value;

	const term = getTerm();

</script>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim"><Fa icon={faMagnifyingGlass} /></div>
	<input
	type="search"
	autocomplete="off"
	placeholder={$LL.ADDRESSBOOK.SEARCH.PLACEHOLDER()}
	bind:value={$term}
	aria-label={$LL.ADDRESSBOOK.SEARCH.ARIA_LABEL()}
	/>
	<button
		class="variant-filled-secondary"
		on:click={() => {
			$term = '';
		}}
		aria-label={$LL.ADDRESSBOOK.CLEAR()}
		disabled={!$term}
	>
	<DocsIcon name="clear" width="w-5" height="h-5" />
	</button>
</div>

<style lang="postcss">
/* clears the ‘X’ from Internet Explorer */
input[type=search]::-ms-clear { display: none; width : 0; height: 0; }
input[type=search]::-ms-reveal { display: none; width : 0; height: 0; }
/* clears the ‘X’ from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }
</style>