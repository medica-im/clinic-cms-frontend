import { writable, derived, readable, get, asyncReadable, asyncWritable, asyncDerived } from '@square/svelte-store';

import type { User } from '$lib/interfaces/user.interface';


export const userData = writable<User|{}>({});