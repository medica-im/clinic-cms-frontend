/*
import { variables } from '$lib/utils/constants';

export async function get() {
    const key = variables.GHOST_API_KEY;
    console.log(key)
    const apiUrl = `https://msp-vedene.fr/blog/ghost/api/v3/content/posts/?key=${key}&fields=title,url&limit=2`;
    const response = await fetch(apiUrl);
			const posts = await response.json();
			if (posts) {
			console.log(typeof posts);
			console.log(posts.constructor);
			console.log(posts);
            return {
                body: { posts }
            }
		}
    }


export function get() {

    // Do dynamc fetching or computing here
const posts = [{
    title: 'Séminaire MSP Vedène',
    url: 'https://msp-vedene.fr/blog/seminaire-msp-vedene/'
}]
    return {
        body: { posts }
    }
}
*/