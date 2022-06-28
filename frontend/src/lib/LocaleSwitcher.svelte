<script lang="ts">
	import { page } from '$app/stores'
	import { setLocale, locale } from '$i18n/i18n-svelte'
	import type { Locales } from '$i18n/i18n-types'
	import { locales } from '$i18n/i18n-util'
	import { loadLocaleAsync } from '$i18n/i18n-util.async'
	import { replaceLocaleInUrl } from '../utils'
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { onMount } from 'svelte';
	import { facilitiesData } from '$lib/store/facilityStore';

	const capitalizeFirstLetter = ([ first, ...rest ], locale = navigator.language) =>
  first.toLocaleUpperCase(locale) + rest.join('')

	const switchLocale = async (newLocale: Locales, updateHistoryState = false) =>  {
		if (!newLocale || $locale === newLocale) return

		// load new dictionary from server
		await loadLocaleAsync(newLocale)

		// select locale
		setLocale(newLocale)

		// update `lang` attribute
		document.querySelector('html').setAttribute('lang', newLocale)

		if (updateHistoryState) {
			// update url to reflect locale changes
			history.pushState({ locale: newLocale }, '', replaceLocaleInUrl(location.pathname, newLocale))
		}
	}
	// update locale when navigating via browser back/forward buttons
	const handlePopStateEvent = async ({ state }: PopStateEvent) => switchLocale(state.locale, false)

	// update locale when page store changes
	$: switchLocale($page.params.lang as Locales, false)
/*
	beforeUpdate(() => {
		if ($locale === 'en' || $locale === 'fr') return
		switchLocale('fr');
	});*/
	onMount(async () => {
		let language = $facilitiesData.language as Locales;
		await switchLocale(language);
	});
</script>

<svelte:window on:popstate={handlePopStateEvent} />

{#each locales as l}
<input type="radio" class="btn-check" name="options" id="option-{l}" autocomplete="off" checked={l === $locale} on:click={() => switchLocale(l)}>
<label class="btn btn-primary" for="option-{l}">{capitalizeFirstLetter(l)}</label>
{/each}