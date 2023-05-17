<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { setLocale, locale } from '$i18n/i18n-svelte';
	import type { Locales } from '$i18n/i18n-types';
	import { locales } from '$i18n/i18n-util';
	import { loadLocaleAsync } from '$i18n/i18n-util.async';
	import { replaceLocaleInUrl } from '$lib/utils/utils.js';
	import { onMount } from 'svelte';
	import { language } from '$lib/store/languageStore';
	import { capitalizeFirstLetter } from '$lib/helpers/stringHelpers';
	import { variables } from '$lib/utils/constants';
	import { browser } from '$app/environment';
	import LL from '$i18n/i18n-svelte';
    import Fa from 'svelte-fa';
    import { faCaretRight, faCaretDown, faLanguage } from '@fortawesome/free-solid-svg-icons';
	import { faCaretSquareDown } from '@fortawesome/free-regular-svg-icons';
	import { invalidateAll } from '$app/navigation'

  

	const defaultLanguage = variables.DEFAULT_LANGUAGE as Locales;

	const switchLocale = async (newLocale: Locales, updateHistoryState = false) => {
		if (!newLocale || $locale === newLocale) return;

		// load new dictionary from server
		await loadLocaleAsync(newLocale);

		// select locale
		setLocale(newLocale);

		// update `lang` attribute
		// update `lang` attribute
		document.querySelector('html').setAttribute('lang', newLocale)

		if (updateHistoryState) {
			// update url to reflect locale changes
			history.pushState(
				{ locale: newLocale },
				'',
				replaceLocaleInUrl(location.pathname, newLocale)
			);
		}
		// run the `load` function again
		//invalidateAll()
	};

	// update locale when page store changes
	$: if (browser) {
		const lang = $page.params.lang as Locales
		switchLocale(lang, false)
		//history.replaceState({ ...history.state, locale: lang }, '',
		//replaceLocaleInUrl($page.url, lang))
	}
		// update locale when navigating via browser back/forward buttons
		const handlePopStateEvent = async ({ state }: PopStateEvent) => switchLocale(state.locale, false)
	//onMount(
	//	async () => {
	//		await switchLocale(defaultLanguage);
	//	}
	//);
</script>

<svelte:window on:popstate={handlePopStateEvent} />

	<!-- trigger -->
	<button class="btn hover:variant-soft-primary" use:popup={{ event: 'click', target: 'language' }}>
		<span class="text-lg 2xl:hidden"><Fa icon={faLanguage} /></span>
		<span class="hidden 2xl:inline-block">{$LL.NAVBAR.LANGUAGE()}</span>
		<span class="opacity-50"><Fa icon={faCaretDown} /></span>
	</button>
	<!-- popup -->
	<!-- prettier-ignore -->
	<div class="card p-4 w-60 shadow-xl" data-popup="language">
		<nav class="list-nav">
			<ul>
				<li>
				{#each locales as l}
		<button on:click={() => switchLocale(l)}>
			{#if l==$locale}<span class="w-6 text-center"><Fa icon={faCaretRight} /></span>{/if}
			<span>{capitalizeFirstLetter(l, $locale)}</span>
		</button>
		{/each}
				</li>
			</ul>
		</nav>
	</div>