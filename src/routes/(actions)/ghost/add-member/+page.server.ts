import { TSGhostAdminAPI } from "@ts-ghost/admin-api";
import { GHOST_ADMIN_API_KEY } from '$env/static/private';
import { PUBLIC_BLOG_URI } from '$env/static/public';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const api = new TSGhostAdminAPI(
    PUBLIC_BLOG_URI,
    GHOST_ADMIN_API_KEY,
    "v5.0"
);

export const actions = {
  default: async (event) => {
		const data = await event.request.formData();
    const formEntries = Object.fromEntries(data.entries());
		const email = formEntries.email;
		const name = formEntries.name;
    const memberAdd = await api.members.add(
      { name: name as string, email: email as string},
      { send_email: true }
    );
    if (memberAdd.success == false) {
      return fail(401, memberAdd)
    }
    return memberAdd;
	}
} satisfies Actions;