import { writable, derived, readable, get, asyncReadable, asyncDerived } from '@square/svelte-store';

export const isAuth = writable<boolean>(false);

export const toggleAuth = () => {
	let currentValue = get(isAuth);
    let updatedValue = !currentValue;
    isAuth.set(updatedValue);
    if (import.meta.env.VITE_DEV == 'true') {
		console.log(`isAuth: ${get(isAuth)}`);
	}
    return
};