import { base } from '$app/paths'
import { loadAllLocales } from '$i18n/i18n-util.sync.ts'
import { getPathnameWithoutBase } from './utils.js'
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit'
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors'
import { variables } from '$lib/utils/constants.ts';
import { detectLocale, i18n, isLocale } from '$i18n/i18n-util.ts'

loadAllLocales()
const L = i18n()


export const handle: Handle = async ({ event, resolve }) => {
    	const locale = variables.DEFAULT_LANGUAGE as Locales;
		// if slug is not a locale, use base locale (e.g. api endpoints)
		const LL = L[locale]
		// bind locale and translation functions to current request
		event.locals.locale = locale
		event.locals.LL = LL
		// console.info(LL.log({ fileName: 'hooks.server.ts' }))
		// replace html lang attribute with correct language
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