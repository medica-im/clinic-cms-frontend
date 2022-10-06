import { detectLocale } from './i18n/i18n-util';

import type { Handle, RequestEvent } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors'
import { setLocale, locale } from '$i18n/i18n-svelte';
import { variables } from '$lib/utils/constants';

const defaultLanguage = variables.DEFAULT_LANGUAGE as Locales;

/** @type {import('@sveltejs/kit').Handle} */
export async function handleFirst({ event, resolve }) {
	setLocale(defaultLanguage);
	const response = await resolve(event);   
	return response;
  }

/*export const handleFirst: Handle = async ({ event, resolve }) => {
	const response = await resolve(event)

	// read language slug
	const [, lang] = event.url.pathname.split('/')

	// replace html lang attribute with correct language
	const body = await response.text();
	return new Response(body.replace('<html lang="en">', `<html lang="${lang}">`), response)
}*/

/** @type {import('@sveltejs/kit').Handle} */
export async function handleSecond({ event, resolve }) {
	//event.locals.user = await getUserInformation(event.request.headers.get('cookie'));
   
	const response = await resolve(event);
	//response.headers.set('x-custom-header', 'potato');
   
	return response;
  }

export const handle = sequence(handleFirst);

/*export const getSession: GetSession = (event) => {
	// detect the preferred language the user has configured in his browser
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const headers = getHeaders(event)
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector({ headers })
	const locale = detectLocale(acceptLanguageDetector)

	return {
		locale,
	}
}*/

const getHeaders = (event: RequestEvent) => {
	const headers: Record<string, string> = {}
	event.request.headers.forEach((value, key) => headers[key] = value)
	return headers
}