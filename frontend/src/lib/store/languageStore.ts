import { get, writable } from '@square/svelte-store';
import { variables } from '$lib/utils/constants';

export const language = writable<string>(variables.DEFAULT_LANGUAGE);