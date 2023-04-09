<script>
	import {
		faMagnifyingGlass,
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { term } from '$lib/store/workforceStore';
	import DocsIcon from '$components/Icon/Icon.svelte';
	let val = '';
	import LL from '$i18n/i18n-svelte';
	$: term.set(val);
	const noop = () => {};
</script>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim"><Fa icon={faMagnifyingGlass} /></div>
	<input
	type="search"
	autocomplete="off"
	placeholder={$LL.ADDRESSBOOK.SEARCH.PLACEHOLDER()}
	bind:value={val}
	aria-label={$LL.ADDRESSBOOK.SEARCH.ARIA_LABEL()}
	/>
	<button
		class="variant-filled-secondary"
		on:click={() => {
			val = '';
		}}
		aria-label={$LL.ADDRESSBOOK.CLEAR()}
		disabled={!val}
	>
	<DocsIcon name="clear" width="w-5" height="h-5" />
	</button>
</div>