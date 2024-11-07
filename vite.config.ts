import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { isoImport } from 'vite-plugin-iso-import';
import 'vitest/config';
import * as path from 'path';

export default defineConfig({
	optimizeDeps: {
		include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep'],
		exclude: ['clinic-cms']
	},
	plugins: [sveltekit(), isoImport()/*, purgeCss()*/],
	resolve: {
		alias: {
			'$': path.resolve(__dirname, 'src'),
			'$i18n': path.resolve('./src/i18n/'),
			'$components': path.resolve('./src/components/'),
			'$modals': path.resolve('./src/modals/')
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		proxy: {
			'/media/profile_images': 'https://dev.sante-gadagne.fr'
			}
		}
});