import { redirect } from '@sveltejs/kit';
import { get } from '@square/svelte-store';
import type { PageLoad } from './$types';
import { userData } from '$lib/store/userStore';

// The login token lives in localStorage, so only the browser can know the user
export const ssr = false;

export const load: PageLoad = async ({ parent }) => {
    // The root layout sets userData when a refresh token is present. Waiting on
    // userData.load() instead hung forever for visitors who are not logged in.
    await parent();
    const user = get(userData);
    if (!user) {
        redirect(307, '/accounts/login');
    }
    return {
        response: user
    };
};
