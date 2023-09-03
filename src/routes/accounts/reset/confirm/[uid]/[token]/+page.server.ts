import type { Actions } from './$types';
import { variables } from '$lib/utils/constants';


export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		console.log(data);
		let url = `${variables.BASE_URI}/dj-rest-auth/password/reset/confirm/`;
		console.log(url);
		const uid = data.get('uid');
		const token = data.get('token');
		const new_password1 = data.get('new_password1');
		const new_password2 = data.get('new_password2');
		const jsn = {
			uid: uid,
			token: token,
			new_password1: new_password1,
			new_password2: new_password2
		};
		console.log(data);
		try {
		const res = await fetch(
			url,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				  },
				body: JSON.stringify(jsn),
			}
		);
		console.log(res);
		if (!res.ok) {
			throw new Error("Network response was not OK");
		  }
		const res_json = await res.json();
		if (res_json.detail) {
			return { success: true };
		}
	} catch (error) {
		console.error("There has been a problem with your fetch operation:", error);
	  }
	}
} satisfies Actions;