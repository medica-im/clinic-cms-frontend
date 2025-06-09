import { organizationStore } from '$lib/store/facilityStore.ts'
import type { LayoutLoad } from './$types'

/** @type {import('./$types').LayoutLoad} */

export const load: LayoutLoad<{}> = async ({ fetch }) => {

  return {
    organization: await organizationStore.load(),
    sections: [
      { slug: 'profile', title: 'Profile' },
      { slug: 'notifications', title: 'Notifications' }
    ]
  };
}