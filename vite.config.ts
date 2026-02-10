/// <reference types="vitest/config" />
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { isoImport } from 'vite-plugin-iso-import';
import * as path from 'path';

const config: UserConfig = {
	optimizeDeps: {
        include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
    },
	plugins: [sveltekit(), isoImport()],
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
		watch: {
			ignored: ['**/node_modules/**', '**/build/**', '**/.svelte-kit/**', '**/static/**']
		},
		proxy: {
			'/blog': 'https://msp-vedene.fr',
			'/media/profile_images': 'https://msp-vedene.fr'
			}
		}
};

export default config;
