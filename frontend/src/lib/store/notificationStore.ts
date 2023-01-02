import LL from '$i18n/i18n-svelte';
import { _ } from 'svelte-i18n';
import { language } from '$lib/store/languageStore';
import { writable, derived } from '@square/svelte-store';
import { get } from 'svelte/store'
import { unwrapFunctionStore, format, init } from 'svelte-i18n';
export const notificationData = writable<string>('');

export const i18nNotificationData = derived(
	([language, notificationData]),
	async ([$language, $notificationData]) => {
        console.log($language);
        console.log($notificationData);
        init({ initialLocale: $language, fallbackLocale: 'en' });
        //const $format = unwrapFunctionStore(format);
        //let str = $format();
        let str = get(_)($notificationData)
        console.log(str);
        return str
    }
);