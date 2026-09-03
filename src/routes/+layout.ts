import { facilityStore } from '$lib/store/facilityStore';
import { openGraphStore } from '$lib/store/openGraphStore';
import type { LayoutLoad } from './$types'
import type { Locales } from '$i18n/i18n-types'
import { loadLocaleAsync } from '$i18n/i18n-util.async'
import { setLocale } from '$i18n/i18n-svelte'
import { variables } from '$lib/utils/constants';
import { getCurrentUser, browserGet, handleRequestsWithPermissions } from '$lib/utils/requestUtils';
import { userData } from '$lib/store/userStore';
import type { User } from '$lib/interfaces/user.interface';
import { getPermissions } from '$lib/utils/permissions';
import { browser } from '$app/environment';

/** @type {import('./$types').LayoutLoad} */
export const load: LayoutLoad<{ locale: Locales }> = async ({ fetch, data: { locale } }) => { 
// load dictionary into memory
	await loadLocaleAsync(locale)

	// if you need to output a localized string in a `load` function,
	// you always need to call `setLocale` right before you access the `LL` store
	setLocale(locale)
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

  let facility;
  if (browser) {
      facility = await facilityStore.load();
  } else {
      const lang = locale ?? variables.DEFAULT_LANGUAGE;
      const apiUrl = `${variables.BASE_API_URI}/facility/${lang}/`;
      const [response, err] = await handleRequestsWithPermissions(fetch, apiUrl);
      if (response && response.facility) {
          response.facility.sort(function (a, b) {
              return a.contact.formatted_name.localeCompare(b.contact.formatted_name);
          });
          facility = response;
      } else {
          console.error('Could not load facility data', err);
          facility = null;
      }
  }

  return {
      locale: locale,
      facility: facility,
      sections: [
        { slug: 'profile', title: 'Profile' },
        { slug: 'notifications', title: 'Notifications' }
      ],
      userData: userData,
      openGraph: browser ? await openGraphStore.load() : await handleRequestsWithPermissions(fetch, `${variables.BASE_API_URI}/opengraph/`).then(([r]) => r || {})
    };
  }