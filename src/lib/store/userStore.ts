import { writable } from '@square/svelte-store';

import type { User } from '$lib/interfaces/user.interface.ts';


export const userData = writable<User | null>();