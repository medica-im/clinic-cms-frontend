<script>
	import {
		faMagnifyingGlass,
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { term } from '$lib/store/workforceStore';
	import DocsIcon from '$lib/Icon/Icon.svelte';
	let val = '';
	import * as m from "$msgs";	$: term.set(val);
	const noop = () => {};
</script>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim"><Fa icon={faMagnifyingGlass} /></div>
	<input
	type="search"
	autocomplete="off"
	placeholder={m.ADDRESSBOOK_SEARCH_PLACEHOLDER()}
	bind:value={val}
	aria-label={m.ADDRESSBOOK_SEARCH_ARIA_LABEL()}
	/>
	<button
		class="variant-filled-secondary"
		on:click={() => {
			val = '';
		}}
		aria-label={m.ADDRESSBOOK_CLEAR()}
		disabled={!val}
	>
	<DocsIcon name="clear" width="w-5" height="h-5" />
	</button>
</div>