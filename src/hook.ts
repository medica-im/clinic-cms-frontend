import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl } from '$prgld/runtime.js';

export const reroute: Reroute = (request) => {
	return deLocalizeUrl(request.url).pathname;
};
