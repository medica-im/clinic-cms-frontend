import { facilityStore } from '$lib/store/facilityStore.ts'
import type { LayoutLoad } from './$types'
import type { Locales } from '$i18n/i18n-types.ts'
import { loadLocaleAsync } from '$i18n/i18n-util.async.ts'
import { browser } from '$app/environment'
import { QueryClient } from '@tanstack/svelte-query'
import { setLocale } from '$i18n/i18n-svelte.ts'


/** @type {import('./$types').LayoutLoad} */

export const load: LayoutLoad<{ locale: Locales }> = async ({ fetch, data: { locale } }) => {
  // load dictionary into memory
  await loadLocaleAsync(locale)
  // if you need to output a localized string in a `load` function,
  // you always need to call `setLocale` right before you access the `LL` store
  setLocale(locale)
  const orgData = await facilityStore.load();
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
    organization: orgData,
    sections: [
      { slug: 'profile', title: 'Profile' },
      { slug: 'notifications', title: 'Notifications' }
    ]
  };
}