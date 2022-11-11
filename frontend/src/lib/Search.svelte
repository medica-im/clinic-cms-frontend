<script>
	import {term} from '$lib/store/workforceStore';
	let val = '';
	import LL from '$i18n/i18n-svelte';
	$: term.set(val);
	const noop = () => {};
</script>

<form class="form-floating" action="javascript:noop;" method="post">
<input bind:value={val} class="form-control" type="text" id="searchInput" placeholder="{$LL.ADDRESSBOOK.SEARCH.PLACEHOLDER()}">
<label for="searchInput">{$LL.ADDRESSBOOK.SEARCH.PLACEHOLDER()}</label>
</form>