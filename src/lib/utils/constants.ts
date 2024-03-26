import type { Variables } from '$lib/interfaces/variables.interface';
import { PUBLIC_INPUT_GEOCODER, PUBLIC_INPUT_CATEGORY, PUBLIC_INPUT_COMMUNE, PUBLIC_INPUT_FACILITY, PUBLIC_INPUT_SEARCH, PUBLIC_INPUT_SITUATION } from '$env/static/public';

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

const TIMELINE: boolean = (import.meta.env.VITE_TIMELINE == "true")
	? true
	: false;

const BLOG_URI: string = import.meta.env.VITE_BLOG_URI

const ORGANIZATION_CATEGORY: string = import.meta.env.VITE_ORGANIZATION_CATEGORY

const NOINDEX: boolean = (import.meta.env.VITE_NOINDEX == "true")
	? true
	: false;

const INPUT_GEOCODER: boolean = PUBLIC_INPUT_GEOCODER == "true" ? true : false;

const INPUT_SITUATION: boolean = PUBLIC_INPUT_SITUATION == "true" ? true : false;

const INPUT_COMMUNE: boolean = PUBLIC_INPUT_COMMUNE == "true" ? true : false;

const INPUT_CATEGORY: boolean = PUBLIC_INPUT_CATEGORY == "true" ? true : false;

const INPUT_FACILITY: boolean = PUBLIC_INPUT_FACILITY == "true" ? true : false;

const INPUT_SEARCH: boolean = PUBLIC_INPUT_SEARCH == "true" ? true : false;

export const variables: Variables = {
	BASE_API_URI: BASE_API_URI,
	BASE_CMS_API_URI: BASE_CMS_API_URI,
	BASE_URI: BASE_URI,
	GHOST_API_KEY: GHOST_API_KEY,
	DEFAULT_LANGUAGE: DEFAULT_LANGUAGE,
	TIMELINE: TIMELINE,
	BLOG_URI: BLOG_URI,
	NOINDEX: NOINDEX,
	ORGANIZATION_CATEGORY: ORGANIZATION_CATEGORY,
	INPUT_GEOCODER: INPUT_GEOCODER,
	INPUT_SITUATION: INPUT_SITUATION,
	INPUT_COMMUNE: INPUT_COMMUNE,
	INPUT_CATEGORY: INPUT_CATEGORY,
	INPUT_FACILITY: INPUT_FACILITY,
	INPUT_SEARCH: INPUT_SEARCH
};