import { sveltePreprocess } from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		sveltePreprocess({
			postcss: true,
			scss: { includePaths: ['src', 'node_modules'] },
		})
	],
	kit: {
		adapter: adapter(),
		alias: {
			$i18n: './src/i18n',
			$components: './src/components',
			$modals: './src/modals'
		}
	}
};
export default config;
