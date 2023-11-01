import { facilityStore } from '$lib/store/facilityStore'
import type { LayoutLoad } from './$types'
import type { Locales } from '$i18n/i18n-types'
import { loadLocaleAsync } from '$i18n/i18n-util.async'
import { browser } from '$app/environment'
import { QueryClient } from '@tanstack/svelte-query'
import LL, { setLocale } from '$i18n/i18n-svelte'
import { get } from 'svelte/store'

/** @type {import('./$types').LayoutLoad} */

export const load: LayoutLoad<{ locale: Locales }> = async ({ data: { locale } }) => { 
// load dictionary into memory
	await loadLocaleAsync(locale)

	// if you need to output a localized string in a `load` function,
	// you always need to call `setLocale` right before you access the `LL` store
	setLocale(locale)
	// get the translation functions value from the store
	//const $LL = get(LL)
	//console.info($LL.log({ fileName: '+layout.ts' }))

  const fData = await facilityStore.load();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  })

  return {
      queryClient: queryClient,
      locale: locale,
      facility: fData,
      sections: [
        { slug: 'profile', title: 'Profile' },
        { slug: 'notifications', title: 'Notifications' }
      ]
    };
  }