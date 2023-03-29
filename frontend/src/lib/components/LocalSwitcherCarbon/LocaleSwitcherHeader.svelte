<script lang="ts">
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
	import { Select, SelectItem } from "carbon-components-svelte";
	import LL from '$i18n/i18n-svelte';
	import {
    Header,
    HeaderNav,
    HeaderNavItem,
    HeaderNavMenu,
	HeaderAction,
	HeaderUtilities,
	HeaderPanelDivider,
	HeaderPanelLink,
	HeaderPanelLinks,
    SkipToContent,
    Content,
    Grid,
    Row,
    Column,
	SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
    SideNavLink,
    SideNavDivider,
  } from "carbon-components-svelte";
  import Translate from "carbon-icons-svelte/lib/Translate.svelte";
  import CaretRight from "carbon-icons-svelte/lib/CaretRight.svelte";
  

  let isOpen=false;

	const defaultLanguage = variables.DEFAULT_LANGUAGE as Locales;

	const switchLocale = async (newLocale: Locales, updateHistoryState = false) => {
		if (!newLocale || $locale === newLocale) return;

		// set language in languageStore
		language.set(newLocale);
		// load new dictionary from server
		await loadLocaleAsync(newLocale);

		// select locale
		setLocale(newLocale);

		// update `lang` attribute
		if (browser) {
		    document.querySelector('html').setAttribute('lang', newLocale);
		}

		if (updateHistoryState) {
			// update url to reflect locale changes
			history.pushState(
				{ locale: newLocale },
				'',
				replaceLocaleInUrl(location.pathname, newLocale)
			);
		}
	};

	// update locale when page store changes
	$: switchLocale($page.params.lang as Locales, false);

	onMount(
		async () => {
			await switchLocale(defaultLanguage);
		}
	);
</script>

<HeaderAction
      bind:isOpen={isOpen}
      icon={Translate}
      closeIcon={Translate}
    >
      <HeaderPanelLinks>
        <HeaderPanelDivider>{$LL.NAVBAR.LANGUAGE()}</HeaderPanelDivider>
		{#each locales as l}
		
        <HeaderPanelLink on:click={() => switchLocale(l)}>
			{#if l==$locale}<CaretRight/>{/if}{capitalizeFirstLetter(l, $locale || $language)}
		</HeaderPanelLink>
		{/each}
      </HeaderPanelLinks>
    </HeaderAction>