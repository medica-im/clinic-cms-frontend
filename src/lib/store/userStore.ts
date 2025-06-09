import { writable } from '@square/svelte-store';

import type { User } from '$lib/interfaces/user.interface';


export const userData = writable<User|undefined>();