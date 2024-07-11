import type { Handle, RequestEvent } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors'
import { variables } from '$lib/utils/constants.ts';
import { detectLocale, i18n, isLocale } from '$i18n/i18n-util.ts'
import { loadAllLocales } from '$i18n/i18n-util.sync.ts'

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
		transformPageChunk: ({ html }) => html.replace('%lang%', locale)
	});
}

const getPreferredLocale = ({ request }: RequestEvent) => {
	// detect the preferred language the user has configured in his browser
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request)

	return detectLocale(acceptLanguageDetector)
}