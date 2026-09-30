
import type { Handle, HandleFetch, RequestEvent } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors'
import { variables } from '$lib/utils/constants';
import { detectLocale, i18n, isLocale } from '$i18n/i18n-util'
import { loadAllLocales } from '$i18n/i18n-util.sync'

loadAllLocales()
const L = i18n()


export const handle: Handle = async ({ event, resolve }) => {
	// read language slug
	//const [, lang] = event.url.pathname.split('/')

	// redirect to base locale if no locale slug was found or if locale is not supported
	/*if (!lang || !isLocale(lang)) {
		const locale = getPreferredLocale(event)

		return new Response(null, {
			status: 302,
			headers: { 'Location': `/${locale}` }
		})
	}*/
	const locale = variables.DEFAULT_LANGUAGE as Locales;
    const lang = variables.DEFAULT_LANGUAGE;
	//const locale = lang as Locales
	const LL = L[locale]

	// bind locale and translation functions to current request
	event.locals.locale = locale
	event.locals.LL = LL

	//console.info(LL.log({ fileName: 'hooks.server.ts' }))

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
}

// The API is served from the same host as the site, so SvelteKit would route
// server-side fetches to it through its own router (404). Send them to the
// network instead. During prerender the page origin is http://sveltekit-prerender,
// so also add the CORS header SvelteKit's simulated CORS check expects.
export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (!request.url.startsWith(variables.BASE_API_URI)) {
		return fetch(request);
	}
	const response = await globalThis.fetch(request);
	const headers = new Headers(response.headers);
	headers.set('access-control-allow-origin', event.url.origin);
	// Node's fetch has already decoded the body
	headers.delete('content-encoding');
	headers.delete('content-length');
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}

const getPreferredLocale = ({ request }: RequestEvent) => {
	// detect the preferred language the user has configured in his browser
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request)

	return detectLocale(acceptLanguageDetector)
}