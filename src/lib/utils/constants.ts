import type { Variables } from '$lib/interfaces/variables.interface.ts';


const BASE_API_URI: string = (import.meta.env.VITE_DEV == "true")
	? import.meta.env.VITE_BASE_API_URI_DEV
	: import.meta.env.VITE_BASE_API_URI_PROD;

const BASE_URI: string = (import.meta.env.VITE_DEV == "true")
	? import.meta.env.VITE_BASE_URI_DEV
	: import.meta.env.VITE_BASE_URI_PROD;

const DEFAULT_LANGUAGE = import.meta.env.VITE_DEFAULT_LANGUAGE;

const TIMELINE = import.meta.env.VITE_TIMELINE;

const TIMEZONE = import.meta.env.VITE_TIMEZONE;

const NOINDEX: boolean = (import.meta.env.VITE_NOINDEX == "true")
	? true
	: false;

export const variables: Variables = {
	BASE_API_URI: BASE_API_URI,
	BASE_URI: BASE_URI,
	DEFAULT_LANGUAGE: DEFAULT_LANGUAGE,
	TIMELINE: TIMELINE,
	TIMEZONE: TIMEZONE,
	NOINDEX: NOINDEX
};