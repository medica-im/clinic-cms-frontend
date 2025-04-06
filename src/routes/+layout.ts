import { facilityStore } from '$lib/store/facilityStore.ts'
import type { LayoutLoad } from './$types'
import { browser } from '$app/environment'
import { QueryClient } from '@tanstack/svelte-query'

/** @type {import('./$types').LayoutLoad} */

export const load: LayoutLoad<{}> = async ({ fetch }) => {
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
    organization: orgData,
    sections: [
      { slug: 'profile', title: 'Profile' },
      { slug: 'notifications', title: 'Notifications' }
    ]
  };
}