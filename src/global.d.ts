interface ImportMetaEnv {
    readonly VITE_BASE_API_URI_PROD: string,
    readonly VITE_BASE_API_URI_DEV: string,
	readonly VITE_BASE_CMS_API_URI_DEV: string,
	readonly VITE_BASE_CMS_API_URI_PROD: string,
	readonly VITE_GHOST_API_KEY: string,
	readonly VITE_TIMELINE: boolean
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare namespace App {
	interface Locals {
		locale: Locales
		LL: TranslationFunctions
	}

	// interface Platform { }

	interface Session {
		locale: Locales
	}

	// interface Stuff { }
}

declare module '@medecinelibre/timelinejs/src/js/timeline/Timeline.mjs';
declare module 'svelte-carousel';