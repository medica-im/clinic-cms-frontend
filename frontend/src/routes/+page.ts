import { setLocale, locale } from '$i18n/i18n-svelte';
import type { Locales } from '$i18n/i18n-types';
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import { variables } from '$lib/utils/constants';
import { get } from 'svelte/store';
export const prerender = true;
const defaultLanguage = variables.DEFAULT_LANGUAGE as Locales;

/** @type {import('./$types').PageLoad} */
export async function load() {
    let l = get(locale);
    if (l == undefined) {
        await switchLocale(defaultLanguage);
    }
}

const switchLocale = async (newLocale: Locales) => {
    // load new dictionary from server
    await loadLocaleAsync(newLocale);
    // select locale
    setLocale(newLocale);
};