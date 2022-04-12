type Locales = import('$i18n/i18n-types').Locales

interface ImportMetaEnv {
    readonly VITE_BASE_API_URI_PROD: string,
    readonly VITE_BASE_API_URI_DEV: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare namespace App {
	// interface Locals { }

	// interface Platform { }

	interface Session {
		locale: Locales
	}

	// interface Stuff { }
}