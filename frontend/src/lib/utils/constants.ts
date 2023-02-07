import type { Variables } from '$lib/interfaces/variables.interface';

const BASE_API_URI: string = (import.meta.env.VITE_DEV == "true")
	? import.meta.env.VITE_BASE_API_URI_DEV
	: import.meta.env.VITE_BASE_API_URI_PROD;

const BASE_CMS_API_URI: string = (import.meta.env.VITE_DEV == "true")
	? import.meta.env.VITE_BASE_CMS_API_URI_DEV
	: import.meta.env.VITE_BASE_CMS_API_URI_PROD;

const BASE_URI: string = (import.meta.env.VITE_DEV == "true")
	? import.meta.env.VITE_BASE_URI_DEV
	: import.meta.env.VITE_BASE_URI_PROD;

const GHOST_API_KEY = import.meta.env.VITE_GHOST_API_KEY;

const DEFAULT_LANGUAGE = import.meta.env.VITE_DEFAULT_LANGUAGE;

const TIMELINE = import.meta.env.VITE_TIMELINE;

export const variables: Variables = {
	BASE_API_URI: BASE_API_URI,
	BASE_CMS_API_URI: BASE_CMS_API_URI,
	BASE_URI: BASE_URI,
	GHOST_API_KEY: GHOST_API_KEY,
	DEFAULT_LANGUAGE: DEFAULT_LANGUAGE,
	TIMELINE: TIMELINE
};