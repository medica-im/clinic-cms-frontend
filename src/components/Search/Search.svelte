<script lang="ts">
	import {
		faMagnifyingGlass,
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import DocsIcon from '$components/Icon/Icon.svelte';
	import * as m from "$msgs";	export let store: any;
	let value: string = '';

	$: store.set(value);

</script>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim"><Fa icon={faMagnifyingGlass} /></div>
	<input
	type="search"
	autocomplete="off"
	placeholder={m.ADDRESSBOOK_SEARCH_PLACEHOLDER()}
	bind:value={value}
	aria-label={m.ADDRESSBOOK_SEARCH_ARIA_LABEL()}
	/>
	<button
		class="variant-filled-secondary"
		on:click={() => {
			value = '';
		}}
		aria-label={m.ADDRESSBOOK_CLEAR()}
		disabled={!value}
	>
	<DocsIcon name="clear" width="w-5" height="h-5" />
	</button>
</div>