import { get, writable } from 'svelte/store';
import { locale } from '$i18n/i18n-svelte';
import { variables } from '$lib/utils/constants';

console.log(`defaultlanguage: ${variables.DEFAULT_LANGUAGE}`);
export const language = writable<string>(variables.DEFAULT_LANGUAGE);