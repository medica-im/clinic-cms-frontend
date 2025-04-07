import { facilityStore } from '$lib/store/facilityStore';
import { openGraphStore } from '$lib/store/openGraphStore';
import type { LayoutLoad } from './$types'
import type { Locales } from '$i18n/i18n-types'
import { loadLocaleAsync } from '$i18n/i18n-util.async'
import LL, { setLocale } from '$i18n/i18n-svelte'
import { get } from 'svelte/store'
import { PUBLIC_ACCESS_CONTROL_TTL } from '$env/static/public';
import { variables } from '$lib/utils/constants';
import { getCurrentUser, browserGet } from '$lib/utils/requestUtils';
import { userData } from '$lib/store/userStore';
import type { Access, User } from '$lib/interfaces/user.interface';
import { getPermissions } from '$lib/utils/permissions';

/** @type {import('./$types').LayoutLoad} */
export const load: LayoutLoad<{ locale: Locales }> = async ({ fetch, data: { locale } }) => { 
// load dictionary into memory
	await loadLocaleAsync(locale)

	// if you need to output a localized string in a `load` function,
	// you always need to call `setLocale` right before you access the `LL` store
	setLocale(locale)
	// get the translation functions value from the store
	//const $LL = get(LL)

  const fData = await facilityStore.load();

  let user: User | null = null;
  let errs: any;
  if (browserGet('refreshToken')) {
    const res = await fetch(`${variables.BASE_API_URI}/access/control/`);
		const access = await res.json();
    [user, errs] = await getCurrentUser(
      fetch,
      `${variables.BASE_API_URI}/accounts/token/refresh/`,
      `${variables.BASE_API_URI}/accounts/user/`
    );
    if (errs.length <= 0) {
      user.access = getPermissions(user, access);
      userData.set(user);
    } else {
      userData.set(null);
    }
  }

  return {
      locale: locale,
      facility: fData,
      sections: [
        { slug: 'profile', title: 'Profile' },
        { slug: 'notifications', title: 'Notifications' }
      ],
      userData: userData,
      openGraph: await openGraphStore.load()
    };
  }