import { get, writable } from '@square/svelte-store';
import { variables } from '$lib/utils/constants';

console.log(`defaultlanguage: ${variables.DEFAULT_LANGUAGE}`);
export const language = writable<string>(variables.DEFAULT_LANGUAGE);