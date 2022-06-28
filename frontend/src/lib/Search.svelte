<script>
	import {term} from '$lib/store/workforceStore.ts';
	let val = '';
	import LL from '$i18n/i18n-svelte';
	$: term.set(val);
</script>

<label for="searchInput">{$LL.ADDRESSBOOK.SEARCH.LABEL()}</label>
<input bind:value={val} type="text" id="searchInput" placeholder="{$LL.ADDRESSBOOK.SEARCH.PLACEHOLDER()}">