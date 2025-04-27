import type { PageServerLoad } from './$types';
import { getGhostData } from '$lib';
import { GHOST_API_KEY, GHOST_ADMIN_API_KEY, GHOST_POST_COUNT } from '$env/static/private';
import { PUBLIC_BLOG_URI } from '$env/static/public';
import { TSGhostAdminAPI } from "@ts-ghost/admin-api";
import type { Actions } from './$types';

let count = parseInt(GHOST_POST_COUNT) || 6;

const api = new TSGhostAdminAPI(
	PUBLIC_BLOG_URI,
	GHOST_ADMIN_API_KEY,
	"v5.0"
);

export const load: PageServerLoad = async ({ fetch }) => {
    return {
        ghost: await getGhostData(fetch, PUBLIC_BLOG_URI, GHOST_API_KEY, count),
		ghostSite: await api.site.fetch()
    };
};

export const actions: Actions = {
	// This action is called when the user clicks the theme button
	setTheme: async ({ cookies, request }) => {
		const formData = await request.formData();
		const theme = formData.get('theme')?.toString() ?? 'skeleton';
		// Sets the selected theme to the cookie
		cookies.set('theme', theme, { path: '/' });
		return { theme };
	}
};