import { writable, derived, readable, get, asyncReadable, asyncDerived } from '@square/svelte-store';
import { variables } from '$lib/utils/constants';
import { browser } from "$app/environment"

const key = variables.GHOST_API_KEY;
const apiUrl = `${variables.BLOG_URI}/ghost/api/v3/content/posts/?key=${key}&fields=title,url,custom_excerpt,feature_image,feature_image_alt,published_at&limit=2`;

export const ghost = asyncReadable(
	{},
	async () => {
		var cachelife = 600;
		const cacheName = "ghost";
		let cachedData;
		let expired: boolean = true;
		let empty: boolean = true;
		if (browser) {
			cachedData = localStorage.getItem(`${cacheName}`);
		}
		if (cachedData) {
			cachedData = JSON.parse(cachedData);
			expired = Date.now() - cachedData.cachetime > cachelife;
			if ('data' in cachedData) {
				if (cachedData.data) {
					empty = false;
				}
			}
		}
		if (cachedData && !expired && !empty) {
			return cachedData.data;
		} else {
            try {
			    const response = await fetch(apiUrl);
			    if (response?.ok) {
				    const articles = await response.json();
				    if (browser) {
					    var json = { data: articles, cachetime: Date.now() }
					    localStorage.setItem(`${cacheName}`, JSON.stringify(json));
				    }
				    return articles;
                } else {
                const error = `HTTP Response Code: ${response?.status}`;
                console.error(error)
                throw new Error(error);
			}
        } catch(error) {
            return error;
        }
    }
	},
	{ reloadable: true }
);