import { downloadAllEffectors } from '$lib/store/directoryStore.ts';
import { facilityStore } from '$lib/store/facilityStore.ts'
import type { LayoutLoad } from './$types'
import { browser } from '$app/environment'
import { QueryClient } from '@tanstack/svelte-query'
import { locale, waitLocale } from 'svelte-i18n'
import { loadLocaleAsync } from '$i18n/i18n-util.async.ts';
import { i18nObject } from '$i18n/i18n-util.js'

/** @type {import('./$types').LayoutLoad} */

export const load: LayoutLoad<{ locale: Locales }> = async ({fetch, data: { locale } }) => { 
  // load dictionary into memory
	await loadLocaleAsync(locale)
	// if you need to output a localized string in a `load` function,
	// you always need to create a new `i18nObject` instance in each `load` function
	// to not run into shared server state issues
	const LL = i18nObject(locale)
  // console.info(LL.log({ fileName: '+layout.ts' }))
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