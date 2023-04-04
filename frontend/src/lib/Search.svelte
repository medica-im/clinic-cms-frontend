<script>
	import { term } from '$lib/store/workforceStore';
	let val = '';
	import LL from '$i18n/i18n-svelte';
	$: term.set(val);
	const noop = () => {};
</script>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim">{$LL.ADDRESSBOOK.SEARCH.LABEL()}</div>
	<input type="search" autocomplete="off"
	placeholder={$LL.ADDRESSBOOK.SEARCH.PLACEHOLDER()} bind:value={val} />
	<button
		class="variant-filled-secondary"
		on:click={() => {
			val = '';
		}}>{$LL.ADDRESSBOOK.CLEAR()}</button
	>
</div>
