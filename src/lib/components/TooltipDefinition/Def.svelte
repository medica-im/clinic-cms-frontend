<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
    import dict from './lexicon.js';
	import Fa from 'svelte-fa';
	import {
		faCircleQuestion
	} from '@fortawesome/free-regular-svg-icons';
	import { removeSpaces } from '$lib/helpers/stringHelpers';
	export let w: string;

	let randString = Math.random().toString(36).substring(2);

	function pop() {
		let settings: PopupSettings = {
			// Set the event as: click | hover | hover-click
			event: 'click',
			// Provide a matching 'data-popup' value.
			target: randString
		};
		return settings;
	}
	function def(w: string) {
		if (dict[w] in dict) {
			let k = dict[w];
			return dict[k];
		}
		return dict[w];
	}
</script>

<button class="btn p-0 m-0" use:popup={pop()}><span class="p-0 m-0">{w}</span><span class="p-0 m-0 opacity-50"><Fa icon={faCircleQuestion}/></span></button>
<div class="card variant-filled-secondary p-2 w-3/4 lg:w-1/3 z-10" data-popup={randString}>
	{#if dict[w] in dict}
		<h4 class="h4">
			<dfn><abbr>{w}</abbr> {dict[w][0]}</dfn>
			<br>
			{dict[dict[w][0]][0]}
			{#if dict[dict[w][0]][1]}
		<br><a data-sveltekit-reload href="/maison-de-sante/lexique#{removeSpaces(dict[w][0])}">{$LL.LEARN_MORE()}</a>
		{/if}
		</h4>
	{:else}
	<h4 class="h4">
		<dfn>{w}</dfn>
		<br>
	    {dict[w][0]}
		{#if dict[w][1]}
		<br><a data-sveltekit-reload href="/maison-de-sante/lexique#{removeSpaces(w)}">{$LL.LEARN_MORE()}</a>
		{/if}
	</h4>
	{/if}
	<div class="arrow variant-filled-secondary" />
</div>
